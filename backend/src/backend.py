from flask import Flask, json, jsonify, request
from flask_cors import CORS

from model import Model
from part import Part


app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home_page():
    return {}


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
        if "ordering_priority" in query:
            priorities = ["YesterdayPriority",
                          "ThisWeekPriority",
                          "ThisMonthPriority",
                          "ThisYearPriority",
                          "CompletedPriority"]
            query.update({"$or":
                          [{"ordering_priority": {"_type": priorities[i]}}
                           for i in range(priorities.index(json.loads(query["ordering_priority"])["_type"]) + 1)]})
            del query["ordering_priority"]

        # print(query)  # DEBUG
        # TODO: Handle unsuccessful from_json()
        parts = [Part.from_json(part) for part in Part.collection.find(query)]
        return {"parts": parts}


@ app.route("/part/<_id>", methods=["GET", "PUT"])
def part(_id):
    part = Part.find_by_id(_id)
    if part is None:
        # TODO: Add 404 status code
        return jsonify(success=False)

    if request.method == "GET":
        return part

    if request.method == "PUT":
        # TODO: Verify json _id matches url _id
        # TODO: Handle unsuccessful from_json()
        part = Part.from_json(request.get_json())
        part.save()
        return part


@ app.route("/subsystems/", methods=["GET"])
def subsystems():
    if request.method == "GET":
        # TODO Create subsystem class and call from_json()
        subsystems = list(Model.client.parts.subsystems.find())
        for subsystem in subsystems:
            subsystem["_id"] = str(subsystem["_id"])
        return {"subsystems": subsystems}
