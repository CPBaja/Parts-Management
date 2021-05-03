from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS

@app.route("/")
def main_page():
    return "Main Page"
