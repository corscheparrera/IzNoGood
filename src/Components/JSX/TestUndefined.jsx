import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
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
  align-items: center;
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
        <ItemFlex>
          We couldn't scan your picture. Try again with a better focus!
        </ItemFlex>
        <Image src={require("../../icons/surprised.svg")} />
        <Button style={styles.btnCustom} onClick={this.props.reset}>
          Retake picture
        </Button>
      </ContainerFlex>
    );
  }
}

export default TestUndefined;
