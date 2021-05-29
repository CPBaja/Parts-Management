import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Select, { SubassemblySelect, OrderingPrioritySelect } from "./Select";
import { fetchParts } from "./axios_get";
import { serializeType } from "./json_type";

// Bootstrap Elements
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";

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
    <Card border="dark">
      <Card.Header as="h4">Filter</Card.Header>
      <Card.Body>
        <Form className="pb-sm-3">
          <Form.Group as={Row}>
            <Col>
              <Form.Label>Subsystem</Form.Label>
              <Select
                className="filter__dropdown"
                name="subsystem"
                value={subsystem ? subsystem.name : ""}
                handleChange={handleChange}
                optionsList={subsystems}
              />
            </Col>
            <Col>
              <Form.Label>Subassembly</Form.Label>
              <SubassemblySelect
                className="filter__dropdown"
                value={subsystem ? subassembly : ""}
                subassemblies={
                  subsystem ? ["", ...subsystem.subassemblies] : []
                }
                handleChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={6} className="pt-sm-3 pb-sm-3">
              <FloatingLabel label="Part Name">
                <Form.Control
                  placeholder=""
                  className="filter__name"
                  name="name"
                  defaultValue=""
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={4}>
              <Form.Label>Priority</Form.Label>
              <OrderingPrioritySelect
                className="filter__dropdown--colored"
                value={orderingPriority}
                handleChange={handleChange}
              />
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Filter;
