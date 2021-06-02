// React
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

// Local
import Catalog from "./Catalog";
import Filter from "./Filter";
import PartEdit from "./PartEdit";
import { fetchSubsystems } from "./axios_get";

// Bootstrap elements
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function App() {
  /* Page naming convention: ____Page */
  const [subsystems, setSubsystems] = useState([]);

  useEffect(() => {
    fetchSubsystems().then((result) => {
      if (result) setSubsystems(result);
    });
  }, []);

  return (
    <Router>
      <Container>
        <h1>Parts Management</h1>
      </Container>
      <Route exact path="/" component={WelcomePage} />
      <Route
        path="/catalog"
        render={() => <CatalogPage subsystems={subsystems} />}
      />
      <Route
        path="/part"
        render={() => <PartEditPage subsystems={subsystems} />}
      />
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

function CatalogPage(props) {
  const [parts, setParts] = useState([]);

  return (
    <Container>
      <Filter setParts={setParts} subsystems={props.subsystems} />
      <Catalog parts={parts} subsystems={props.subsystems} />
    </Container>
  );
}

function PartEditPage(props) {
  return (
    <Container>
      <PartEdit subsystems={props.subsystems} />
    </Container>
  );
}

export default App;
