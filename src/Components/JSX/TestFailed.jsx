import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import Warning from "../../icons/warning.png";

const FailedText = styled.h4`text-align: center;`;

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
        <FailedText>
          Your product contains some ingredients that didn't pass the test.
        </FailedText>
        <img src={Warning} height="150px" alt="" />
        <div>
          <ul>
            <li>Benzyne of Methylene is an allergen</li>
            <li>Glycerinol is an endocrinian perturbator - banned in UE</li>
          </ul>
        </div>
        <Button> Want to save this product to remember ? </Button>
        <a href="">If you want to know more on the ingredients we check</a>
      </WrapperColumn>
    );
  }
}

export default TestSucceeded;
