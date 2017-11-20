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
import { LinkContainer } from "react-router-bootstrap";

import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const database = firebase.database();

class SaveMyProduct extends Component {
  componentDidMount() {
    // check if user has already signed in, if yes skip the login and changed the state accordingly
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.updateLoginState(user);
      }
    });
  }

  clickAddProduct = () => {
    // const userId = this.props.currentUserId;
    const productDescription = this.inputProductDescription.value;
    const ProductName = this.inputProductName.value;

    const productToUpload = {
      ProductDescription: productDescription,
      ProductName: ProductName,
      ImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/41c-e971xoL._SY355_.jpg"
    };

    database
      .ref(`userProducts/${this.props.uidLogged}/${this.props.status}`)
      .push(productToUpload)
      .then();
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

            <LinkContainer to="/Account">
              <Button onClick={this.clickAddProduct} bsStyle="primary">
                Save this product
              </Button>
            </LinkContainer>
          </WrapperColumn>
        </BlueWrapper>
      );
    }
  }
}
export default SaveMyProduct;
