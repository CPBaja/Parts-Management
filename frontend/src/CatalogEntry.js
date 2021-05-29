import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OrderingPrioritySelect, SubassemblySelect } from "./Select";
import { updatePart } from "./axios_put";
import { serializeType } from "./json_type";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function CatalogEntry(props) {
  const [part, setPart] = useState(props.part);

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    if (name === "ordering_priority") {
      value = serializeType("Priority", value);
    }

    if (event.target.type === "number") {
      value = parseInt(event.target.value);
    }

    setPart({ ...part, [name]: value });
  }

  /* Class naming convention: block-name__element--modifiers *
        https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/ */
  return (
    <Card body border="dark" className="mb-1">
      <Card.Title>IDN: {part.idn}</Card.Title>
      <Form>
        <Row>
          <Col sm={3}>
            <SubassemblySelect
              className="catalog-entry__dropdown"
              value={part.subassembly}
              subassemblies={props.subassemblies}
              handleChange={handleChange}
            />
          </Col>
          <Col sm={4}>
            <Form.Control
              size="sm"
              className="catalog-entry__name"
              name="name"
              defaultValue={part.name}
              onBlur={handleChange}
            />
          </Col>
          <Col sm={2}>
            <OrderingPrioritySelect
              className="catalog-entry__dropdown--colored"
              value={part.ordering_priority}
              handleChange={handleChange}
            />
          </Col>
        </Row>
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
        <input
          className="catalog-entry__save"
          type="button"
          value="Save Changes"
          onClick={() => updatePart(part)}
        />
        <Link to={"/part/" + part._id}>
          <button type="button">Edit Part</button>
        </Link>
      </Form>
    </Card>
  );
}

export default CatalogEntry;
