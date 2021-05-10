import React, {useState} from "react";

function OrderingPrioritySelect(props) {
  /* Class naming convention: block-name__element--modifiers
   * https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/
   */
  return (
    <select
      className="catalog-entry__dropdown--colored"
      name="ordering_priority"
      value={props.orderingPriority}
      onChange={props.handleChange}>
      <option>Yesterday!</option>
      <option>This Week</option>
      <option>This Month</option>
      <option>This Year</option>
      <option>Completed!</option>
    </select>
  );
}

function SubassemblySelect(props) {
  const subassembliesList = props.subassembliesList.map((row, index) => <option key={index}>{row}</option>);

  return (
    <select
      className="catalog-entry__dropdown"
      name="subassembly"
      value={props.part.subassembly}
      onChange={props.handleChange}>
      {subassembliesList}
    </select>
  );
}

function CatalogEntry(props) {
  const [part, setPart] = useState(props.part);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.type === "number" ? parseInt(event.target.value) : event.target.value;
    setPart({...part, [name]: value});
  }

  function submitForm() {
    props.handleSubmit(part);
  }

  return (
    <form>
      <fieldset>
        <legend className="catalog-entry__idn">IDN: {part.idn}</legend>
        <SubassemblySelect part={part} subassembliesList={props.subassemblies} handleChange={handleChange} />

        {/* Note that this must be a self-closing tag due to React rules.
         */}
        <input className="catalog-entry__name" name="name" defaultValue={part.name} onChange={handleChange} />
        <OrderingPrioritySelect orderingPriority={part.ordering_priority} handleChange={handleChange} />
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
              onChange={handleChange}
            />
          </label>
          <label>
            Competition
            <input
              className="catalog-entry__number"
              type="number"
              name="quantity_competition"
              defaultValue={part.quantity_competition}
              onChange={handleChange}
            />
          </label>
          <label>
            Available
            <input
              className="catalog-entry__number catalog-entry__number--available"
              type="number"
              name="quantity_available"
              defaultValue={part.quantity_available}
              onChange={handleChange}
            />
          </label>
        </div>
        <input className="catalog-entry__save" type="button" value="Save Changes" onClick={submitForm} />
      </fieldset>
    </form>
  );
}

export default CatalogEntry;
