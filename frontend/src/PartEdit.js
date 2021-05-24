import React, {useEffect, useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import Select, {SubassemblySelect, OrderingPrioritySelect} from "./Select";
import {fetchPart, fetchSubsystems} from "./axios_get";
import {updatePart} from "./axios_put";

function PartEdit() {
  const history = useHistory();
  const match = useRouteMatch();
  const params = useRouteMatch(match.url + "/:_id?").params;

  const [part, setPart] = useState({});
  const [subsystems, setSubsystems] = useState([]);

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

  useEffect(() => {
    fetchSubsystems().then((result) => {
      if (result) setSubsystems(result);
    });
  }, []);

  const partSubsystem = subsystems.find((subsystem) => subsystem.name === part.subsystem);

  return (
    <div className="container">
      <form>
        <fieldset>
          <legend className="full-edit__idn">IDN: {part.idn}</legend>
          <legend>Subsystem</legend>
          <Select
            className="full-edit__subsystems"
            name="subsystem"
            value={part.subsystem}
            handleChange={handleChange}
            optionsList={subsystems.map((subsytem) => subsytem.name)}
          />
          {/* Note that this must be a self-closing tag due to React rules.
           */}
          <legend>Subassembly</legend>
          <SubassemblySelect
            className="full-edit__subassemblies"
            value={part.subassembly}
            subassemblies={partSubsystem === undefined ? [] : partSubsystem.subassemblies}
            handleChange={handleChange}
          />
          <legend>Part Name</legend>
          <input className="full-edit__name" name="name" defaultValue={part.name} onBlur={handleChange} />
          <legend>Ordering Priority</legend>
          <OrderingPrioritySelect
            className="full-edit__dropdown--colored"
            value={part.ordering_priority}
            handleChange={handleChange}
          />
          <div className="full-edit__quantities">
            <legend>Quantity</legend>
            <br></br>
            <label>
              Go/NoGo
              <input
                className="full-edit__number"
                type="number"
                name="quantity_gonogo"
                defaultValue={part.quantity_gonogo}
                onBlur={handleChange}
              />
            </label>
            <label>
              Competition
              <input
                className="full-edit__number"
                type="number"
                name="quantity_competition"
                defaultValue={part.quantity_competition}
                onBlur={handleChange}
              />
            </label>
            <label>
              Available
              <input
                className="full-edit__number--available"
                type="number"
                name="quantity_available"
                defaultValue={part.quantity_available}
                onBlur={handleChange}
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
    </div>
  );
}

export default PartEdit;
