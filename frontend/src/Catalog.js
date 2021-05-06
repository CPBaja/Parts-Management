import React from 'react'
import Part from './Part'

function Catalog(props) {
  const parts = props.partsData.map((part) => {
    return (
      <Part />
    )
  });

  return (
    <ul class="catalog-list">
        {parts}
    </ul>
  );  
}

export default Catalog;
