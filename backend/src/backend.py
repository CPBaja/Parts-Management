from flask import Flask
from flask import jsonify
from flask import redirect
from flask import request
from flask_cors import CORS

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
            part["_id"] = str(user["_id"])
        return parts


@app.route("/catalog/<subsystem>/", methods=["GET"])
def catalog_subsystem(subsystem):
    if request.method == "GET":
        parts = list(Part.collection.find({"subsystem": subsystem}))
        for part in parts:
            part["_id"] = str(user["_id"])
        return parts
