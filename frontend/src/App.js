import React, {useState, useEffect} from "react";
import axios from "axios";
import Catalog from "./Catalog";

function App() {
  const [parts, setParts] = useState([]);
  const [subsystems, setSubsystems] = useState([]);

  async function fetchParts() {
    try {
      const response = await axios.get("http://localhost:5000/catalog");
      return response.data.parts;
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
      console.log(part);
      //if (response.status === 201)
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchParts().then((result) => {
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
      <Catalog partsData={parts} subsystems={subsystems} handleSubmit={updatePart} />
    </div>
  );
}

export default App;
