import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import Login from "./Login";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";

import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const database = firebase.database();

class SaveMyProduct extends Component {
  clickAddProduct = () => {
    // const userId = this.props.currentUserId;
    const productDescription = this.inputProductDescription.value;
    const ProductName = this.inputProductName.value;

    const productToUpload = {
      ProductDescription: productDescription,
      ProductName: ProductName
    };
    // database
    //   .ref(`userProducts/${this.props.uidLogged}/CleanProduct`)
    //   .once("value", result => {
    //     console.log("result from useRProduct", result.val());
    //     console.log("uid", this.props.uidLogged);
    database
      .ref(`userProducts/${this.props.uidLogged}/DirtyProducts`)
      .push(productToUpload);
  };

  render() {
    if (!this.props.userLogged) {
      return (
        <Login
          updateLoginState={this.props.updateLoginState}
          userLogged={this.props.userLogged}
        />
      );
    } else {
      return (
        <BlueWrapper>
          <WrapperColumn>
            <h1>Save Your product here</h1>
            <Form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Product Name</ControlLabel>
                <FormControl
                  inputRef={r => {
                    this.inputProductName = r;
                  }}
                  type="text"
                  placeholder="Enter text"
                />

                <ControlLabel>Description</ControlLabel>
                <FormControl
                  inputRef={r => {
                    this.inputProductDescription = r;
                  }}
                  type="text"
                  placeholder="Enter text"
                />
              </FormGroup>
            </Form>

            <Button onClick={this.clickAddProduct} bsStyle="primary">
              Save this product
            </Button>
          </WrapperColumn>
        </BlueWrapper>
      );
    }
  }
}
export default SaveMyProduct;
