# A short script verifying that the atlas db .env works
import dns
import pymongo
import os
from dotenv import load_dotenv

load_dotenv()
MONGODB_URL = os.environ['MONGODB_URL']

client = pymongo.MongoClient(MONGODB_URL)
db = client.bom
collection = db.test

for i in range(10):
    print(f"Adding {i}")
    collection.insert_one({"id": i})

for item in collection.find():
    print(f"Removing {item['id']}")
    collection.delete_one({"id": item["id"]}) 
