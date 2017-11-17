import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Row, Col, FormGroup, FormControl } from "react-bootstrap";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

class InputFile extends Component {
  render() {
    return (
      <BlueWrapper>
        <Row>
          <Col sm={4} smOffset={4} className="text-center">
            <label className="fileUpload">
              <span
                className="glyphicon glyphicon-upload"
                style={{ fontSize: "50px" }}
                aria-hidden="true"
              />

              <FormGroup className="displayNone">
                <FormControl
                  type="file"
                  onChange={this.props.updateUploadImage}
                />
              </FormGroup>
              <h3> Upload ingredients</h3>
            </label>
          </Col>
        </Row>
      </BlueWrapper>
    );
  }
}

export default InputFile;
