import React from "react";
import CatalogEntry from "./CatalogEntry";

function Catalog(props) {
  const parts = props.partsData.map((part) => {
    return <CatalogEntry key={part._id} part={part} subassemblies={props.subsystems[part.subsystem]} />;
  });

  return <ul class="catalog-list">{parts}</ul>;
}

export default Catalog;
