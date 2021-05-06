import React from 'react'
import axios from 'axios'
import Catalog from './Catalog'

function App() {

  const [parts, setParts] = useState([]);

  async function fetchAll() {
    try {
      // TODO: Route here will probably change
      const response = await axios.get('http://localhost:5000/all');
      return response.parts;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setParts(result);
    });
  }, [] );

  return (
    <div className="container">
      <h1>Bill Of Materials</h1>
      <Catalog partsData={parts} />
    </div>
  );
}

export default App;
