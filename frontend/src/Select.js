import React from "react";
import { parseType } from "./json_type.js";

function Select(props) {
  const optionsList = props.optionsList.map((row, index) => (
    <option key={index}>{row}</option>
  ));

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
  const value = parseType("Priority", props.value._type);

  // Option: style
  const priorities = {
    Yesterday: {
      color: "#800000",
      "background-color": "#ffc0c0",
    },
    "This Week": {
      color: "#800000",
      "background-color": "#ffc080",
    },
    "This Month": {
      color: "#404000",
      "background-color": "#ffffc0",
    },
    "This Year": {
      color: "#004000",
      "background-color": "#c0ffc0",
    },
    Completed: {
      color: "#404040",
      "background-color": "#c0c0c0",
    },
  };

  return (
    <Select
      className={props.className}
      name="ordering_priority"
      value={value}
      handleChange={props.handleChange}
      optionsList={Object.keys(priorities)}
      style={priorities[value]}
    />
  );
}

export { Select as default, SubassemblySelect, OrderingPrioritySelect };
