// React
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

// Local
import { OrderingPrioritySelect, SubassemblySelect } from "./Select";
import { updatePart } from "./axios_put";
import { serializeType } from "./json_type";

// Bootstrap
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

function CatalogEntry(props) {
  const [oldPart, setOldPart] = useState(props.part);
  const [part, setPart] = useState(props.part);
  const history = useHistory();
  const location = useLocation();

  if (props.part !== oldPart) {
    setOldPart(props.part);
    setPart(props.part);
  }

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

  function CatalogEntryToggle({ eventKey, callback }) {
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    // Option: style
    const priorities = {
      YesterdayPriority: {
        color: "#800000",
        backgroundColor: "#ffc0c0",
        name: "Yesterday",
      },
      ThisWeekPriority: {
        color: "#800000",
        backgroundColor: "#ffc080",
        name: "This Week",
      },
      ThisMonthPriority: {
        color: "#404000",
        backgroundColor: "#ffffc0",
        name: "This Month",
      },
      ThisYearPriority: {
        color: "#004000",
        backgroundColor: "#c0ffc0",
        name: "This Year",
      },
      CompletedPriority: {
        color: "#404040",
        backgroundColor: "#c0c0c0",
        name: "Completed",
      },
    };

    return (
      <Card body onClick={decoratedOnClick} border="dark">
        <Card.Title sm={3}>
          <i>IDN: {part.idn}</i>
        </Card.Title>
        <Row>
          <Col sm={2}>
            <p>{part.subassembly}</p>
          </Col>
          <Col sm={3}>
            <p>{part.name}</p>
          </Col>
          <Col sm={1}>
            <Badge pill style={priorities[part.ordering_priority._type]}>
              {priorities[part.ordering_priority._type]["name"]}
            </Badge>
          </Col>
          <Col sm={4} />
          <Col sm={1}>
            <ListGroup horizontal>
              <ListGroup.Item>{part.quantity_gonogo}</ListGroup.Item>
              <ListGroup.Item>{part.quantity_competition}</ListGroup.Item>
              <ListGroup.Item>{part.quantity_available}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card>
    );
  }

  /* Class naming convention: block-name__element--modifiers *
        https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/ 
        
     Secondary class names are related to Bootstrap 
     */
  return (
    <Card border="0">
      <Card.Header className="pb-0 pl-0 pr-0 pt-1">
        <CatalogEntryToggle eventKey={props.eventKey} />
      </Card.Header>
      <Accordion.Collapse eventKey={props.eventKey}>
        <Card body border="dark" className="px-2">
          <Form>
            <Row>
              <Col sm={3} className="align-self-center">
                <Form.Group>
                  <Form.Label>Subassembly</Form.Label>
                  <SubassemblySelect
                    className="catalog-entry__dropdown"
                    value={part.subassembly}
                    subassemblies={props.subassemblies}
                    handleChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={4} className="align-self-center">
                <Form.Group>
                  <Form.Label>Part Name</Form.Label>
                  <Form.Control
                    size="sm"
                    className="catalog-entry__name"
                    name="name"
                    defaultValue={part.name}
                    onBlur={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={2} className="align-self-center">
                <Form.Group>
                  <Form.Label>Ordering Priority</Form.Label>
                  <OrderingPrioritySelect
                    className="catalog-entry__dropdown--colored"
                    value={part.ordering_priority}
                    handleChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <h6 className="text-center">Quantities</h6>
                <Row className="catalog-entry__quantities">
                  <Col>
                    <Form.Group>
                      <Form.Label>Go/NoGo</Form.Label>
                      <Form.Control
                        className="catalog-entry__number"
                        type="number"
                        name="quantity_gonogo"
                        defaultValue={part.quantity_gonogo}
                        onBlur={handleChange}
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
                        onBlur={handleChange}
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
                        onBlur={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Button
              variant="success"
              className="catalog-entry__save"
              onClick={() => updatePart(part)}>
              Save Change
            </Button>{" "}
            <Button
              variant="primary"
              onClick={() =>
                history.push({
                  pathname: "/part/" + part._id,
                  state: { catalog: location.pathname },
                })
              }>
              Edit Part
            </Button>
          </Form>
        </Card>
      </Accordion.Collapse>
    </Card>
  );
}

export default CatalogEntry;
