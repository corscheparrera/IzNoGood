import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";

const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Helvetica Neue";
  font-size: 28px;
  font-weight: 200;
`;
const ItemFlex = styled.div`
  width: 300px;
  max-width: 80%;
`;
const Image = styled.img`
  height: 150px;
  margin: 40px;
`;
class TestUndefined extends Component {
  render() {
    return (
      <ContainerFlex>
        <ItemFlex>Please try to reupload a better picture!</ItemFlex>
        <Image src={require("../../icons/surprised.svg")} />
        <Button onClick={this.props.reset}>Retake picture</Button>
      </ContainerFlex>
    );
  }
}

export default TestUndefined;
