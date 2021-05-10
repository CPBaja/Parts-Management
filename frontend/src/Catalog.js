import React from "react";
import CatalogEntry from "./CatalogEntry";

function Catalog(props) {
  const parts = props.partsData.map((part) => {
    const partSubsystem = props.subsystems.find((subsystem) => subsystem.name === part.subsystem);
    return (
      <CatalogEntry
        key={part._id}
        part={part}
        subassemblies={partSubsystem === undefined ? [] : partSubsystem.subassemblies}
      />
    );
  });

  return <ul className="catalog-list">{parts}</ul>;
}

export default Catalog;
