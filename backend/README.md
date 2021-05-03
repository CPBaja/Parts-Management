# CP BAJA BOM flask backend

## Make a virtual environment
Create the virtual environment:
`python3 -m venv venv`

Activate the virtual environment:
`source venv/bin/activate`

## Install dependencies
`pip install -r requirements.txt`

## Atlas DB Integration

### MongoDB Compass
Replace `<password>` with the cpbaja db password in the string below.
Use the modified connection string to access the db from Compass.
`mongodb+srv://cpbaja:<password>@cpbajabomdev.m1dza.mongodb.net/test`

### PyMongo Integration
Ask Ian for the required .env file and add it to 'Parts-Management/backend'.
To test if it works, run the following in the same directory:
`python3 test_db_url.py`
