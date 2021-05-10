from flask import Flask
from flask import jsonify
from flask import redirect
from flask import request
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
        parts = list(Part.collection.find())
        for part in parts:
            part["_id"] = str(part["_id"])
        return {"parts": parts}


@app.route("/catalog/<subsystem>/", methods=["GET"])
def catalog_subsystem(subsystem):
    if request.method == "GET":
        parts = list(Part.collection.find({"subsystem": subsystem}))
        for part in parts:
            part["_id"] = str(part["_id"])
        return parts


@app.route("/subsystems/", methods=["GET"])
def subsystems():
    if request.method == "GET":
        # Ideally should not do it like this
        subsystems = list(Model.client.parts.subsystems.find())
        for subsystem in subsystems:
            subsystem["_id"] = str(subsystem["_id"])
        return {"subsystems": subsystems}
