import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: 200;
`;

const Image = styled.img`
  height: 150px;
  margin: 40px;
`;
class TestSucceeded extends Component {
  render() {
    return (
      <ContainerFlex>
        <div>Your product is fine!</div>
        <Image src={require("../../icons/happy.svg")} />
        <Link to="/save/CleanProducts">
          <Button>Save to history</Button>
        </Link>
        <Link to="/IngredientList">
          <Button>Learn more</Button>
        </Link>
      </ContainerFlex>
    );
  }
}

export default TestSucceeded;
