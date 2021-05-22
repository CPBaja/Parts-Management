import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import axios from "axios";
import Catalog from "./Catalog";
import Filter from "./Filter";
import {fetchSubsystems} from "./axiosget";

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
    fetchSubsystems().then((result) => {
      if (result) setSubsystems(result);
    });
  }, []);

  return (
    <div className="container">
      <Filter setParts={setParts} subsystems={subsystems} />
      <Catalog partsData={parts} subsystems={subsystems} handleSubmit={updatePart} />
    </div>
  );
}

export default App;
