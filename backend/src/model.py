import os
import pymongo
from bson import ObjectId
from dotenv import load_dotenv


def get_mongo_client():
    load_dotenv()
    return pymongo.MongoClient(os.getenv("MONGODB_URL"))


class Model(dict):
    """
    An abstract model. Extends Model.
    Implements a method of saving, reloading, and deleting documents to/in/from
    a Mongo DB.
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    # Calls load_dotenv() (file I/O - slow) only once
    client = get_mongo_client()

    def save(self):
        """
        Insert or update a model into/in the Mongo DB collection.
        If not in the collection, create an _id upon insertion.
        """
        if not self._id:
            self.collection.insert_one(self)
        else:
            self._id = ObjectId(self._id)
            self.collection.update({"_id": self._id}, self)
        self._id = str(self._id)

    def reload(self):
        """
        Update self (if it exists) from the MongoDB collection.
        Returns True if the update is successful, else False.
        """
        if self._id:
            result = self.collection.find_one({"_id": ObjectId(self._id)})
            if result is not None:
                self.update(result)
                self._id = str(self._id)
                return True
        return False

    def delete(self):
        """
        Delete self (if it exists) from the Mongo DB collection.
        Returns a DeleteResult object from the server.
        """
        if self._id:
            resp = self.collection.delete_one({"_id": ObjectId(self._id)})
            if resp.acknowledged:
                self.clear()
            return resp
        return None

    @classmethod
    def get_subclasses(cls):
        subclasses = {}
        for subclass in cls.__subclasses__():
            # Add the subclass to the dict
            subclasses[subclass.__name__] = subclass
            # Add its subclasses to the dict (recursive)
            subclasses.update(subclass.get_subclasses())
        return subclasses

    @classmethod
    def from_json(cls, json):
        # Use "_type" attribute to determine object type
        # Use other attributes as constructor parameters
        args = json.copy()
        args.pop("_type")
        obj = cls.get_subclasses().get(json["_type"], cls)(**args)

        # Replace typed attributes with objects (recursive)
        for attr in obj:
            if type(json[attr]) == dict and "_type" in json[attr]:
                obj[attr] = Model.from_json(json[attr])

        # Replace MongoDB ObjectId (if it exists) with string
        if "_id" in obj:
            obj["_id"] = str(obj["_id"])

        return obj

    @classmethod
    def find_by_id(cls, _id):
        jsons = list(cls.collection.find({"_id": ObjectId(_id)}))
        return cls.from_json(jsons[0]) if len(jsons) > 0 else None
