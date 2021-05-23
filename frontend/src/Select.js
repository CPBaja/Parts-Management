import React from "react";

function Select(props) {
  const optionsList = props.optionsList.map((row, index) => <option key={index}>{row}</option>);

  return (
    <select
      className={props.className}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      style={props.style ? props.style : undefined}>
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
  // Option: style
  const priorities = {
    Yesterday: {
      color: "#36393d",
      "background-color": "#ffcccc",
    },
    "This Week": {
      color: "#36393d",
      "background-color": "#ffcc99",
    },
    "This Month": {
      color: "#36393d",
      "background-color": "#ffff88",
    },
    "This Year": {
      color: "#82b366",
      "background-color": "#d5e8d4",
    },
    Completed: {
      color: "#36393d",
      "background-color": "#eeeeee",
    },
  };

  return (
    <Select
      className={props.className}
      name="ordering_priority"
      value={props.value}
      handleChange={props.handleChange}
      optionsList={Object.keys(priorities)}
      style={priorities[props.value]}
    />
  );
}

export {Select as default, SubassemblySelect, OrderingPrioritySelect};
