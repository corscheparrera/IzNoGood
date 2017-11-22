import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const styles = {
  btnCustom: {
    width: "120px",
    height: "40px",
    margin: "10px"
  }
};
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
          <Button style={styles.btnCustom}>Save to history</Button>
        </Link>
        <Button style={styles.btnCustom} onClick={this.props.reset}>
          Re-scan
        </Button>
        <Link to="/IngredientList">
          <Button style={styles.btnCustom}>Learn more</Button>
        </Link>
      </ContainerFlex>
    );
  }
}

export default TestSucceeded;
