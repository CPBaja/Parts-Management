import React from "react";
import CatalogEntry from "./CatalogEntry";

function Catalog(props) {
  const parts = props.partsData.map((part) => {
    return (
      <CatalogEntry
        key={part._id}
        part={part}
        subassemblies={props.subsystems.find((subsystem) => subsystem.name === part.subsystem).subassemblies}
      />
    );
  });

  return <ul className="catalog-list">{parts}</ul>;
}

export default Catalog;
