import React from "react";
import CatalogEntry from "./CatalogEntry";

function Catalog(props) {
  const parts = props.partsData.map((part) => {
    console.log(props.subsystems);
    console.log(part.subsystem);
    return (
      <CatalogEntry
        key={part._id}
        part={part}
        subassemblies={props.subsystems.find((subsystem) => subsystem.name === part.subsystem).subassemblies}
      />
    );
  });

  return <ul class="catalog-list">{parts}</ul>;
}

export default Catalog;
