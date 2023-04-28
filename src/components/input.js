import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

function Input() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (eventKey) => {
    if (!selectedOptions.includes(eventKey)) {
      setSelectedOptions([...selectedOptions, eventKey]);
    }
  };

  const handleDelete = (option) => {
    setSelectedOptions(selectedOptions.filter((o) => o !== option));
  };

  return (
    <div className="mainContainer container">
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <div className="d-flex">
          <Form.Group>
            <Form.Label>Options</Form.Label>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Select Options
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="حبة">حبة</Dropdown.Item>
                <Dropdown.Item eventKey="علبة">علبة</Dropdown.Item>
                <Dropdown.Item eventKey="كرتونة">كرتونة</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <div className="d-flex">
              {selectedOptions.map((option) => (
                <Form.Group key={option} className="selected-option m-3">
                  <span key={option} className="badge bg-secondary m-1">
                    {option}
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => handleDelete(option)}
                    ></button>
                  </span>
                  <Form.Group className="d-flex"> 
                  <button
                      type="button"
                      className="btn btn-info"
                      aria-label=""
                    >+</button>
                  <Form.Control
                    type="text"
                    placeholder="Barcode"
                    className="itemInput"
                  />
                  </Form.Group>
                </Form.Group>
              ))}

            </div>
          </Form.Group>
        </div>
      </Form>
    </div>
  );
}

export default Input;

