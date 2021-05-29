import React from "react";
import CatalogEntry from "./CatalogEntry";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function Catalog(props) {
  const parts = props.parts.map((part) => {
    const partSubsystem = props.subsystems.find(
      (subsystem) => subsystem.name === part.subsystem
    );
    return (
      <CatalogEntry
        key={part._id}
        part={part}
        subassemblies={
          partSubsystem === undefined ? [] : partSubsystem.subassemblies
        }
      />
    );
  });

  return (
    <Card border="dark" className="bg-light">
      <Card.Header as="h4">Catalog (temporary header)</Card.Header>

      <Card.Body>
        <ul>{parts}</ul>
      </Card.Body>
    </Card>
  );
}

export default Catalog;
