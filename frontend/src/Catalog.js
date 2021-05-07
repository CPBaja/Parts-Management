import React from "react";
import CatalogEntry from "./CatalogEntry";

function Catalog(props) {
  const parts = props.partsData.map((part) => {
    return <CatalogEntry />;
  });

  return <ul class="catalog-list">{parts}</ul>;
}

export default Catalog;
