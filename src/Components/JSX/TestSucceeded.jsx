import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import GreenFlag from "../../icons/flag.png";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const PassedText = styled.h4`text-align: center;`;

class TestSucceeded extends Component {
  render() {
    return (
      <BlueWrapper>
        <WrapperColumn>
          <PassedText>
            Congratulations, your product seems clean. Your list of ingredients
            passed our tests !
          </PassedText>
          <img src={GreenFlag} height="150px" alt="" />
          <Button> Want to save your product ? </Button>
          <Button onClick={this.props.reset}>
            Take a new picture of my product
          </Button>
          <a href="">If you want to know more on the ingredients we check</a>
        </WrapperColumn>
      </BlueWrapper>
    );
  }
}

export default TestSucceeded;
