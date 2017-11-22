import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

const styles = {
  displayNone: {
    display: "none"
  }
};
const Input = styled.label`focus: none !important;`;
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
  height: 280px;
  margin: 20px;
`;
class InputFile extends Component {
  render() {
    return (
      <ContainerFlex>
        <ItemFlex>Take a picture of your product ingredients</ItemFlex>
        <Image src={require("../../icons/picture-instructions.jpg")} />
        <Input>
          <img src={require("../../icons/icons8-plus.svg")} />
          <FormGroup style={styles.displayNone}>
            <FormControl type="file" onChange={this.props.updateUploadImage} />
          </FormGroup>
        </Input>
      </ContainerFlex>
    );
  }
}

export default InputFile;
