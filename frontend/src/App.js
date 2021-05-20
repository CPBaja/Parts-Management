import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import axios from "axios";
import Catalog from "./Catalog";
import Filter from "./Filter";

function App() {
  return (
    <Router>
      <h1 className="container">Parts Management</h1>
      <Route exact path="/" component={Welcome} />
      <Route path="/catalog" component={Main} />
    </Router>
  );
}

function Welcome() {
  return (
    <div className="container">
      Welcome! Click <Link to="/catalog">here</Link> to go to the catalog.
    </div>
  );
}

function Main() {
  const [parts, setParts] = useState([]);
  const [subsystems, setSubsystems] = useState([]);

  async function fetchParts(filters) {
    try {
      const response = await axios.get("http://localhost:5000/catalog", {
        params: filters,
      });
      // TODO: Check status code
      setParts(response.data.parts);
      return response.data.parts;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function fetchSubsystems() {
    try {
      const response = await axios.get("http://localhost:5000/subsystems");
      // TODO: Check status code
      // Call setSubsystems() here?
      return response.data.subsystems;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function updatePart(part) {
    try {
      const response = await axios.put("http://localhost:5000/catalog/part/" + part._id, part);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    // Fetch all parts (is this correct?)
    fetchParts({}).then((result) => {
      if (result) setParts(result);
    });
  }, []);

  useEffect(() => {
    fetchSubsystems().then((result) => {
      if (result) setSubsystems(result);
    });
  }, []);

  return (
    <div className="container">
      <Filter subsystems={subsystems} handleFilter={fetchParts} />
      <Catalog partsData={parts} subsystems={subsystems} handleSubmit={updatePart} />
    </div>
  );
}

export default App;
