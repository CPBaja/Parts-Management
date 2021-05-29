import React from "react";
import { parseType } from "./json_type.js";
import Form from "react-bootstrap/Form";

function Select(props) {
  const optionsList = props.optionsList.map((row, index) => (
    <option key={index}>{row}</option>
  ));

  return (
    <Form.Select
      size={props.size ? props.size : undefined}
      bsPrefix={"form-select"}
      className={props.className}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      style={props.style ? props.style : undefined}>
      {optionsList}
    </Form.Select>
  );
}

function SubassemblySelect(props) {
  return (
    <Select
      className={props.className}
      size="sm"
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
      backgroundColor: "#ffc0c0",
    },
    "This Week": {
      color: "#800000",
      backgroundColor: "#ffc080",
    },
    "This Month": {
      color: "#404000",
      backgroundColor: "#ffffc0",
    },
    "This Year": {
      color: "#004000",
      backgroundColor: "#c0ffc0",
    },
    Completed: {
      color: "#404040",
      backgroundColor: "#c0c0c0",
    },
  };

  // TODO: turn this into a pill :O
  return (
    <Select
      size="sm"
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
