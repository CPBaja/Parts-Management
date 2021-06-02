// React
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
// import { useHistory } from "react-router-dom";  <== Commented out since useHistory is failing

// Local
import { SubassemblySelect, OrderingPrioritySelect } from "./Select";
import { fetchPart, fetchSubsystems } from "./axios_get";
import { updatePart } from "./axios_put";
import { serializeType } from "./json_type";

// Bootstrap
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function PartEdit() {
  // const history = useHistory();  <== Commented out since useHistory is failing
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
    <Card border="dark">
      <Card.Header as="h4">Part Edit Page</Card.Header>
      <Card.Body>
        <h1 className="display-6">IDN: {part.idn}</h1>
        <Form className="pb-sm-3">
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Subsystem
            </Form.Label>
            <Col sm={3}>
              <p>{part.subsystem}</p>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Subassembly
            </Form.Label>
            <Col sm={3}>
              <SubassemblySelect
                className="full-edit__subassemblies"
                value={part.subassembly}
                subassemblies={
                  partSubsystem === undefined ? [] : partSubsystem.subassemblies
                }
                handleChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Part Name
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                size="sm"
                className="catalog-entry__name"
                name="name"
                defaultValue={part.name}
                onBlur={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Ordering Priority
            </Form.Label>
            <Col sm={3}>
              <OrderingPrioritySelect
                className="full-edit__dropdown--colored"
                value={part.ordering_priority}
                handleChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Quantities
            </Form.Label>
            <Col sm={3}>
              <Row className="catalog-entry__quantities">
                <Col>
                  <Form.Group>
                    <Form.Label>Go/NoGo</Form.Label>
                    <Form.Control
                      className="catalog-entry__number"
                      type="number"
                      name="quantity_gonogo"
                      defaultValue={part.quantity_gonogo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Competition</Form.Label>
                    <Form.Control
                      className="catalog-entry__number"
                      type="number"
                      name="quantity_competition"
                      defaultValue={part.quantity_competition}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Available</Form.Label>
                    <Form.Control
                      className="catalog-entry__number catalog-entry__number--available"
                      type="number"
                      name="quantity_available"
                      defaultValue={part.quantity_available}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Form.Group>
          <Button
            className="full-edit__save"
            onClick={() => {
              console.log(part);
              updatePart(part);
              // TODO: Need to change goBack call so that catalog page refreshes.  It is currently broken.
              //history.goBack();
            }}>
            Save Changes
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PartEdit;
