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
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 28px;
  font-weight: 200;
`;
const ItemFlex = styled.div`text-align: center;`;
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

/*<ContainerFlex>
        <div>Take a picture of your products ingredients</div>
        <Image src={require("../../icons/picture-instructions.jpg")} />

      </ContainerFlex>*/
