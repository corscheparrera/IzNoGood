import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import GreenFlag from "../../icons/flag.png";

const PassedText = styled.h4`text-align: center;`;

const WrapperColumn = styled.div`
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

class TestSucceeded extends Component {
  render() {
    return (
      <WrapperColumn>
        <PassedText>
          Congratulations, your product seems clean. Your list of ingredients
          passed our tests !
        </PassedText>
        <img src={GreenFlag} height="150px" alt="" />
        <Button> Want to save your product ? </Button>
        <a href="">If you want to know more on the ingredients we check</a>
      </WrapperColumn>
    );
  }
}

export default TestSucceeded;
