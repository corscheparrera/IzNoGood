import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import Login from "./Login";
import styled from "styled-components";
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
import Template from "../../icons/picture-front-instructions.jpg";
import Plus from "../../icons/icons8-plus.svg";

const storageRef = firebase.storage();
const database = firebase.database();

// Styled components

const InstructionPicture = styled.img`
  height: 300px;
  margin-top: 30px;
`;

const Instructions = styled.h3`
  font-size: 20px;
  font-weight: 200;
`;

const InputWrapperCentered = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

class SaveMyProduct extends Component {
  constructor() {
    super();
    this.state = {
      uploadImageUrl: ""
    };
  }
  componentDidMount() {
    // check if user has already signed in, if yes skip the login and changed the state accordingly
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.updateLoginState(user);
      }
    });
  }

  // clickAddProduct = () => {
  //   // const userId = this.props.currentUserId;
  //   const productDescription = this.inputProductDescription.value;
  //   const ProductName = this.inputProductName.value;

  //   const productToUpload = {
  //     ProductDescription: productDescription,
  //     ProductName: ProductName,
  //     ImageUrl:
  //       "https://images-na.ssl-images-amazon.com/images/I/41c-e971xoL._SY355_.jpg"
  //   };

  //   database
  //     .ref(`userProducts/${this.props.uidLogged}/${this.props.status}`)
  //     .push(productToUpload);
  // };

  handleProductToSave = event => {
    // check if file exists
    const file = event.target.files[0];
    if (!file) return;
    // this.setState({ isLoading: true });
    console.log("fiestetp", file);
    storageRef
      .ref()
      .child(`${file.name}`)
      .put(file)
      .then(() => {
        console.log("Upload file in Firestorage");
        storageRef
          .ref()
          .child(`${file.name}`)
          .getDownloadURL()
          .then(url => this.setState({ uploadImageUrl: url }))
          .then(() => {
            console.log("Upload file in DB + state", this.state.uploadImageUrl);
            database
              .ref(`userProducts/${this.props.uidLogged}/${this.props.status}`)
              .push({ ImageUrl: this.state.uploadImageUrl });
          })
          .then(() => this.handleSearch());
      });
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
        <WrapperColumn>
          <InstructionPicture src={Template} />
          <div>
            <label for="file-input">
              <Instructions>
                Take a picture of your product to save it
              </Instructions>

              <img src={Plus} />
            </label>
            <input
              style={{ display: "none" }}
              id="file-input"
              type="file"
              onChange={this.handleProductToSave}
            />
          </div>
        </WrapperColumn>
      );
    }
  }
}
export default SaveMyProduct;
