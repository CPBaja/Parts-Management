# CPBaja Parts Management Flask Backend

Run all commands in the `backend` directory unless specified otherwise.

## Make a virtual environment

To create a virtual environment, run the following command:  
`python3 -m venv venv`

To activate the virtual environment, run the following command:  
`source venv/bin/activate`

## Install dependencies

To install dependencies, run the following command:  
`pip install -r requirements.txt`

## Atlas Database Integration

### MongoDB Compass

To access the database from MongoDB Compass, use the following connection string:
`mongodb+srv://cpbaja:<password>@cpbajabomdev.m1dza.mongodb.net/test`
Replace `<password>` with the CPBaja database password.

### Python PyMongo

To access the database from Python, add a .env file containing the `MONGODB_URL` environment variable to the `backend` directory.
To test it, run the following command:
`python3 tests/test_db_url.py`

## Subsystems

| Subsystem        |
| ---------------- |
| Chassis          |
| Powertrain       |
| Front Suspension |
| Rear Suspension  |
| Steering         |
| Brakes           |
| Ergonomics       |
| Composites       |
| Electronics      |
