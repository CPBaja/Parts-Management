import React, {useState, useEffect} from "react";
import axios from "axios";
import Catalog from "./Catalog";

function App() {
  const [parts, setParts] = useState([]);

  async function fetchParts() {
    try {
      const response = await axios.get("http://localhost:5000/catalog");
      return response.data.parts_list;
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

  // TODO: Need route to parts.subsystems here
  const subsystems = [];

  return (
    <div className="container">
      <h1>Bill Of Materials</h1>
      <Catalog partsData={parts} subsystems={subsystems} />
    </div>
  );
}

export default App;
