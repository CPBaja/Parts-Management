import React from "react";

function OrderingPrioritySelect(props) {
  {
    /* Class naming convention: block-name__element--modifiers
     * https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/
     */
  }
  return (
    <select class="catalog-entry__dropdown--colored" name="ordering_priority">
      <option selected disabled hidden>
        {props.orderingPriority}
      </option>
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
    <select class="catalog-entry__dropdown" name="subassembly">
      <option selected disabled hidden>
        {props.part.subassembly}
      </option>
      {subassembliesList}
    </select>
  );
}

function CatalogEntry(props) {
  const part = props.part;

  return (
    <form>
      <fieldset>
        <legend class="catalog-entry__idn">IDN: {part.idn}</legend>
        <SubassemblySelect part={part} subassembliesList={props.subassemblies} />

        {/* Note that this must be a self-closing tag due to React rules.
         */}
        <input class="catalog-entry__name" name="name" value={part.name} />
        <OrderingPrioritySelect orderingPriority={part.ordering_priority} />
        <div class="catalog-entry__quantities">
          <legend>Quantity</legend>
          <br></br>
          <label>
            Go/NoGo
            <input class="catalog-entry__number" type="number" value={part.quantity_gonogo} />
          </label>
          <label>
            Competition
            <input class="catalog-entry__number" type="number" value={part.quantity_competition} />
          </label>
          <label>
            Available
            <input
              class="catalog-entry__number catalog-entry__number--available"
              type="number"
              value={part.quantity_available}
            />
          </label>
        </div>
        <input class="catalog-entry__save" type="submit" value="Save Changes" />
      </fieldset>
    </form>
  );
}

export default CatalogEntry;
