import React from "react";
import CatalogEntry from "./CatalogEntry";

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
    <div className="container">
      <h4>Catalog (temporary header)</h4>
      <ul className="catalog-list">{parts}</ul>
    </div>
  );
}

export default Catalog;
