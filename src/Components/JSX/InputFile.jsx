import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { Button, Row, Col, FormGroup, FormControl } from "react-bootstrap";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";
import Plus from "../../icons/icons8-plus.svg";
import Template from "../../icons/picture-instructions.jpg";

const Instructions = styled.h3`
  font-size: 20px;
  font-weight: 200;
`;

const InstructionPicture = styled.img`
  height: 300px;
  margin-top: 30px;
`;

class InputFile extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col sm={4} smOffset={4} className="text-center">
            <InstructionPicture src={Template} alt="" />
            <label className="fileUpload">
              <Instructions>
                Take a picture of your products ingredients
              </Instructions>

              <img src={Plus} alt="" />

              <FormGroup className="displayNone">
                <FormControl
                  type="file"
                  onChange={this.props.updateUploadImage}
                />
              </FormGroup>
            </label>
          </Col>
        </Row>
      </div>
    );
  }
}

export default InputFile;
