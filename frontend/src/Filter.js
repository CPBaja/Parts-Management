import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Select, { SubassemblySelect, OrderingPrioritySelect } from "./Select";
import { fetchParts } from "./axios_get";
import { serializeType } from "./json_type";

function Filter(props) {
  const history = useHistory();
  const match = useRouteMatch();
  const params = useRouteMatch(match.url + "/:subsystem?").params;

  const [filters, setFilters] = useState(params);
  const [subassembly, setSubassembly] = useState();
  const [orderingPriority, setOrderingPriority] = useState({
    _type: "CompletedPriority",
  });

  const subsystem = props.subsystems.find((_) => _.name === params.subsystem);
  const subsystems = ["", ...props.subsystems.map((_) => _.name)];

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;
    switch (name) {
      case "subsystem":
        history.push(match.url + "/" + value);
        break;
      case "subassembly":
        setSubassembly(value);
        break;
      case "ordering_priority":
        value = serializeType("Priority", value);
        setOrderingPriority(value);
        break;
      case "name":
        break;
      default:
        break;
    }

    // If a form field is blank, remove the filter
    if (value === "") {
      const { [name]: value, ...without } = filters;
      setFilters(without);
    } else {
      setFilters({ ...filters, [name]: value });
    }
  }

  useEffect(
    () => {
      fetchParts(filters).then((result) => {
        if (result) props.setParts(result);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.subsystems, filters]
  );

  return (
    <div className="container">
      <form>
        <fieldset>
          <h4>Filter</h4>
          <label>
            Subsystem
            <Select
              className="filter__dropdown"
              name="subsystem"
              value={subsystem ? subsystem.name : ""}
              handleChange={handleChange}
              optionsList={subsystems}
            />
          </label>
          <label>
            Subassembly
            <SubassemblySelect
              className="filter__dropdown"
              value={subsystem ? subassembly : ""}
              subassemblies={subsystem ? ["", ...subsystem.subassemblies] : []}
              handleChange={handleChange}
            />
          </label>
          <label>
            Part Name
            <input
              className="filter__name"
              name="name"
              defaultValue=""
              onChange={handleChange}
            />
          </label>
          <label>
            Ordering Priority
            <OrderingPrioritySelect
              className="filter__dropdown--colored"
              value={orderingPriority}
              handleChange={handleChange}
            />
          </label>
        </fieldset>
      </form>
    </div>
  );
}

export default Filter;
