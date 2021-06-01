import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { SubassemblySelect, OrderingPrioritySelect } from "./Select";
import { fetchPart, fetchSubsystems } from "./axios_get";
import { updatePart } from "./axios_put";
import { serializeType } from "./json_type";

function PartEdit() {
  const history = useHistory();
  const match = useRouteMatch();
  const params = useRouteMatch(match.url + "/:_id?").params;

  const [part, setPart] = useState({});
  const [subsystems, setSubsystems] = useState([]);

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    if (name === "ordering_priority") {
      value = serializeType("Priority", value);
    }

    if (event.target.type === "number") {
      console.log("made it here");
      value = parseInt(event.target.value);
    }

    setPart({ ...part, [name]: value });
  }

  useEffect(() => {
    fetchPart(params._id).then((result) => {
      if (result) setPart(result);
    });
  }, [params._id]);

  useEffect(() => {
    fetchSubsystems().then((result) => {
      if (result) setSubsystems(result);
    });
  }, []);

  const partSubsystem = subsystems.find(
    (subsystem) => subsystem.name === part.subsystem
  );

  return (
    <form>
      <fieldset>
        <legend className="full-edit__idn">IDN: {part.idn}</legend>
        <label>Subsystem</label>
        <p>{part.subsystem}</p>
        <label>Subassembly</label>
        <SubassemblySelect
          className="full-edit__subassemblies"
          value={part.subassembly}
          subassemblies={
            partSubsystem === undefined ? [] : partSubsystem.subassemblies
          }
          handleChange={handleChange}
        />
        <label>Part Name</label>
        <input
          className="full-edit__name"
          name="name"
          defaultValue={part.name}
          onBlur={handleChange}
        />
        <label>Ordering Priority</label>
        <OrderingPrioritySelect
          className="full-edit__dropdown--colored"
          value={part.ordering_priority}
          handleChange={handleChange}
        />
        <div className="full-edit__quantities">
          <label>Quantity</label>
          <br></br>
          <label>
            Go/NoGo
            <input
              className="full-edit__number"
              type="number"
              name="quantity_gonogo"
              defaultValue={part.quantity_gonogo}
              onChange={handleChange}
            />
          </label>
          <label>
            Competition
            <input
              className="full-edit__number"
              type="number"
              name="quantity_competition"
              defaultValue={part.quantity_competition}
              onChange={handleChange}
            />
          </label>
          <label>
            Available
            <input
              className="full-edit__number--available"
              type="number"
              name="quantity_available"
              defaultValue={part.quantity_available}
              onChange={handleChange}
            />
          </label>
        </div>
        <input
          className="full-edit__save"
          type="button"
          value="Save Changes"
          onClick={() => {
            updatePart(part);
            history.goBack();
          }}
        />
        {/* Need to change goBack call so that catalog page refreshes */}
      </fieldset>
    </form>
  );
}

export default PartEdit;
