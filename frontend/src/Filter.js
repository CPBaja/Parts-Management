import React, {useState, useEffect} from "react";
import Select, {SubassemblySelect, OrderingPrioritySelect} from "./Select";

function Filter(props) {
  const [subsystem, setSubsystem] = useState();
  const [subassembly, setSubassembly] = useState();
  const [filters, setFilters] = useState({});
  const [orderingPriority, setOrderingPriority] = useState("Completed");
  const subsystems = props.subsystems.map((item) => item.name);
  subsystems.unshift("");

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "subsystem":
        setSubsystem(props.subsystems.find((item) => item.name === value));
        break;
      case "subassembly":
        setSubassembly(value);
        break;
      case "ordering_priority":
        setOrderingPriority(value);
        break;
      case "name":
        break;
      default:
        break;
    }
    // If a form field is blank, deactivate the filter and refresh
    if (value === "") {
      const {[name]: value, ...without} = filters;
      setFilters(without);
      props.handleFilter(without);
    } else {
      setFilters({...filters, [name]: value});
      props.handleFilter({...filters, [name]: value});
    }
  }

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
              subassemblies={subsystem ? [""].concat(subsystem.subassemblies) : []}
              handleChange={handleChange}
            />
          </label>
          <label>
            Part Name
            <input className="filter__name" name="name" defaultValue="" onChange={handleChange} />
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
