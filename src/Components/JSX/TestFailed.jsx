import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import Warning from "../../icons/warning.png";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const FailedText = styled.h4`textalign: center;`;

class TestFailed extends Component {
  displayChemicals = item => {
    return (
      <li>{`${item.chemical} is a ${item.categorie}. ${item.reference}`}</li>
    );
  };

  render() {
    return (
      <BlueWrapper>
        <WrapperColumn style={{ height: "800px" }}>
          <FailedText>
            Your product contains some ingredients that didn't pass the test.
          </FailedText>
          <img src={Warning} height="150px" alt="" />
          <div>
            <ul>{this.props.presentChemicals.map(this.displayChemicals)}</ul>
          </div>
          <Button> Want to save this product to remember ? </Button>
          <Button onClick={this.props.reset}>
            Take a picture of a new product
          </Button>
          <a href="/IngredientList">
            If you want to know more on the ingredients we check
          </a>
        </WrapperColumn>
      </BlueWrapper>
    );
  }
}

export default TestFailed;
