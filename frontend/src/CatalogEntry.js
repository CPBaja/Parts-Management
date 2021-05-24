import React, {useState} from "react";
import {OrderingPrioritySelect, SubassemblySelect} from "./Select";
import {updatePart} from "./axios_put";

function CatalogEntry(props) {
  const [part, setPart] = useState(props.part);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.type === "number" ? parseInt(event.target.value) : event.target.value;
    setPart({...part, [name]: value});
  }

  /* Class naming convention: block-name__element--modifiers *
        https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/ */
  return (
    <form>
      <fieldset>
        <legend className="catalog-entry__idn">IDN: {part.idn}</legend>
        <SubassemblySelect
          className="catalog-entry__dropdown"
          value={part.subassembly}
          subassemblies={props.subassemblies}
          handleChange={handleChange}
        />
        {/* Note that this must be a self-closing tag due to React rules.
         */}
        <input className="catalog-entry__name" name="name" defaultValue={part.name} onBlur={handleChange} />
        <OrderingPrioritySelect
          className="catalog-entry__dropdown--colored"
          value={part.ordering_priority}
          handleChange={handleChange}
        />
        <div className="catalog-entry__quantities">
          <legend>Quantity</legend>
          <br></br>
          <label>
            Go/NoGo
            <input
              className="catalog-entry__number"
              type="number"
              name="quantity_gonogo"
              defaultValue={part.quantity_gonogo}
              onBlur={handleChange}
            />
          </label>
          <label>
            Competition
            <input
              className="catalog-entry__number"
              type="number"
              name="quantity_competition"
              defaultValue={part.quantity_competition}
              onBlur={handleChange}
            />
          </label>
          <label>
            Available
            <input
              className="catalog-entry__number catalog-entry__number--available"
              type="number"
              name="quantity_available"
              defaultValue={part.quantity_available}
              onBlur={handleChange}
            />
          </label>
        </div>
        <input className="catalog-entry__save" type="button" value="Save Changes" onClick={() => updatePart(part)} />
      </fieldset>
    </form>
  );
}

export default CatalogEntry;
