import React, {useState, useEffect} from "react";
import axios from "axios";
import Catalog from "./Catalog";

function App() {
  const [parts, setParts] = useState([]);
  // Unsure if we want subsystems to have state like parts or not
  const [subsystems, setSubsystems] = useState([]);

  async function fetchParts() {
    try {
      const response = await axios.get("http://localhost:5000/catalog");
      return response.data.parts_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function fetchSubsystems() {
    try {
      // TODO: Need route to parts.subsystems here
      const response = await axios.get("http://localhost:5000/subsystems");
      return response.data.subsystems_list;
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
      <Catalog partsData={parts} subsystems={subsystems} />
    </div>
  );
}

export default App;
