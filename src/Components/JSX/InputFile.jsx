import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { Button, Row, Col, FormGroup, FormControl } from "react-bootstrap";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";
import Plus from "../../icons/icons8-plus.svg";

const Instructions = styled.h3`
  font-size: 20px;
  font-weight: 200;
`;

class InputFile extends Component {
  render() {
    return (
      <BlueWrapper>
        <Row>
          <Col sm={4} smOffset={4} className="text-center">
            <label className="fileUpload">
              {/* <span
                className="glyphicon glyphicon-plus"
                style={{ fontSize: "50px" }}
                aria-hidden="true"
              /> */}
              <Instructions>
                {" "}
                Take a picture of your products ingredients{" "}
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
      </BlueWrapper>
    );
  }
}

export default InputFile;
