import React from "react";
import CatalogEntry from "./CatalogEntry";

import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

function Catalog(props) {
  const parts = props.parts.map((part, index) => {
    const partSubsystem = props.subsystems.find(
      (subsystem) => subsystem.name === part.subsystem
    );
    return (
      <CatalogEntry
        key={part._id}
        eventKey={index}
        part={part}
        subassemblies={partSubsystem ? partSubsystem.subassemblies : []}
      />
    );
  });

  return (
    <Card border="dark" className="bg-light">
      <Card.Header as="h4">Catalog</Card.Header>

      <Card.Body>
        <Accordion>{parts}</Accordion>
      </Card.Body>
    </Card>
  );
}

export default Catalog;
