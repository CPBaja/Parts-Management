# Script to test the MongoDB URL in .env

import os
import pymongo
from dotenv import load_dotenv

load_dotenv()
MONGODB_URL = os.getenv("MONGODB_URL")

client = pymongo.MongoClient(MONGODB_URL)
collection = client.test.url

for i in range(10):
    print(f"Adding {i}")
    collection.insert_one({"id": i})

for item in collection.find():
    print(f"Removing {item['id']}")
    collection.delete_one({"id": item["id"]})
