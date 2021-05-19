import React from "react";

function Select(props) {
  const optionsList = props.optionsList.map((row, index) => <option key={index}>{row}</option>);

  return (
    <select className={props.className} name={props.name} value={props.value} onChange={props.handleChange}>
      {optionsList}
    </select>
  );
}

function SubassemblySelect(props) {
  return (
    <Select
      className={props.className}
      name="subassembly"
      value={props.value}
      handleChange={props.handleChange}
      optionsList={props.subassemblies}
    />
  );
}

function OrderingPrioritySelect(props) {
  const prioritiesList = ["Yesterday", "This Week", "This Month", "This Year", "Completed"];

  return (
    <Select
      className={props.className}
      name="ordering_priority"
      value={props.value}
      handleChange={props.handleChange}
      optionsList={prioritiesList}
    />
  );
}

export {Select as default, SubassemblySelect, OrderingPrioritySelect};
