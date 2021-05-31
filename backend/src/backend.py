from flask import Flask, jsonify, redirect, request
from flask_cors import CORS

from model import Model
from part import Part


app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home_page():
    return redirect("http://localhost:3000/catalog")


@app.route("/catalog/", methods=["GET"])
def catalog():
    if request.method == "GET":
        query = request.args.to_dict()

        # Check if names contain the search entry (case insensitive)
        if "name" in query:
            query["name"] = \
                {"$regex": ".*" + query["name"] + ".*", "$options": "i"}

        # TODO: This should be handled by the Priority class(es)
        # Check if priority is sooner than or equal to value
        if "ordering_priority" in query and query["ordering_priority"] != "Yesterday":
            priorities = ["Yesterday",
                          "This Week",
                          "This Month",
                          "This Year",
                          "Completed"]
            query.update({"$or":
                          [{"ordering_priority": priorities[i]}
                           for i in range(priorities.index(query["ordering_priority"]) + 1)]})
            del query["ordering_priority"]

        # print(query) #DEBUG
        parts = [Part.from_json(part) for part in Part.collection.find(query)]
        return {"parts": parts}


@ app.route("/part/<_id>", methods=["GET", "PUT"])
def catalog_part(_id):
    part = Part.find_by_id(_id)
    if part is None:
        # TODO: Add 404 status code
        return jsonify(success=False)

    if request.method == "GET":
        return part

    if request.method == "PUT":
        # TODO: Verify json _id matches url _id
        part = Part.from_json(request.get_json())
        part.save()
        return part


@ app.route("/subsystems/", methods=["GET"])
def subsystems():
    if request.method == "GET":
        # TODO Ideally should not do it like this
        subsystems = list(Model.client.parts.subsystems.find())
        for subsystem in subsystems:
            subsystem["_id"] = str(subsystem["_id"])
        return {"subsystems": subsystems}
