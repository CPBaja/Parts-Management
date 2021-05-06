import os
import pymongo
from bson import ObjectId
from dotenv import load_dotenv


def get_mongo_client():
    load_dotenv()
    return pymongo.MongoClient(os.getenv("MONGODB_URL"))


class Model(dict):
    """
    An abstract model that wraps a dict.
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
            self.collection.update_one({"_id": ObjectId(self._id)}, self)
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
