import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Row, Col, FormGroup, FormControl } from "react-bootstrap";
import { bootstrapUtils } from "react-bootstrap/lib/utils";
bootstrapUtils.addStyle(Button, "buttonUpload");

class InputFile extends Component {
  render() {
    return (
      <Row>
        <Col sm={4} smOffset={4} className="text-center">
          <label className="fileUpload">
            <span
              className="glyphicon glyphicon-upload"
              style={{ fontSize: "50px" }}
              aria-hidden="true"
            />

            <FormGroup className="displayNone">
              <FormControl type="file" />
            </FormGroup>
            <h3> Upload ingredients</h3>
          </label>
        </Col>
      </Row>
    );
  }
}

export default InputFile;
