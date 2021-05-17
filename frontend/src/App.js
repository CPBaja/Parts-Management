import React, {useState, useEffect} from "react";
import axios from "axios";
import Catalog from "./Catalog";
import Filter from "./Filter";

function App() {
  const [parts, setParts] = useState([]);
  const [subsystems, setSubsystems] = useState([]);

  async function fetchAllParts() {
    try {
      const response = await axios.get("http://localhost:5000/catalog");
      return response.data.parts;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function fetchParts(filters) {
    try {
      const response = await axios.get("http://localhost:5000/catalog", {
        params: filters,
      });
      // TODO: Implement check for status 200
      setParts(response.data.parts);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function fetchSubsystems() {
    try {
      const response = await axios.get("http://localhost:5000/subsystems");
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
    fetchAllParts().then((result) => {
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
      <h1>Bill Of Materials</h1>
      <Filter subsystems={subsystems} handleFilter={fetchParts} />
      <Catalog partsData={parts} subsystems={subsystems} handleSubmit={updatePart} />
    </div>
  );
}

export default App;
