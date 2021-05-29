import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Catalog from "./Catalog";
import Filter from "./Filter";
import PartEdit from "./PartEdit";
import { fetchSubsystems } from "./axios_get";

// Bootstrap elements
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function App() {
  /* Page naming convention: ____Page */
  return (
    <Router>
      <Container>
        <h1>Parts Management</h1>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/catalog" component={CatalogPage} />
        <Route path="/part" component={PartEditPage} />
      </Container>
    </Router>
  );
}

function WelcomePage() {
  return (
    <Container fluid className="text-sm-center p-5 bg-light">
      <p class="lead">
        Welcome! Click <Link to="/catalog">here</Link> to go to the catalog.
      </p>
      <Button>Login</Button>
    </Container>
  );
}

function CatalogPage() {
  const [parts, setParts] = useState([]);
  const [subsystems, setSubsystems] = useState([]);

  useEffect(() => {
    fetchSubsystems().then((result) => {
      if (result) setSubsystems(result);
    });
  }, []);

  return (
    <Container>
      <Filter setParts={setParts} subsystems={subsystems} />
      <Catalog parts={parts} subsystems={subsystems} />
    </Container>
  );
}

function PartEditPage() {
  return (
    <div className="container">
      <PartEdit />
    </div>
  );
}

export default App;
