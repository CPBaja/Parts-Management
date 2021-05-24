import React, {useEffect, useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom"; // For parsing the url and going back to catalog on finish (history.goBack?)
import Select, {SubassemblySelect, OrderingPrioritySelect} from "./Select";
import {fetchPart} from "./axios_get";
import {updatePart} from "./axios_put";

function PartEdit() {
  const history = useHistory();
  const match = useRouteMatch();
  const params = useRouteMatch(match.url + "/:_id?").params;

  const [part, setPart] = useState({});

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.type === "number" ? parseInt(event.target.value) : event.target.value;
    setPart({...part, [name]: value});
  }

  useEffect(() => {
    fetchPart(params._id).then((result) => {
      if (result) setPart(result);
    });
  }, [params._id]);

  return (
    <div className="container">
      <form>
        <fieldset>
          <legend className="catalog-entry__idn">IDN: {part.idn}</legend>
          <SubassemblySelect
            className="catalog-entry__dropdown"
            value={part.subassembly}
            subassemblies={[]} // TODO: Fetch subsystems
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
          <input
            className="catalog-entry__save"
            type="button"
            value="Return to Catalog"
            onClick={() => history.goBack()}
          />
        </fieldset>
      </form>
    </div>
  );
}

export default PartEdit;
