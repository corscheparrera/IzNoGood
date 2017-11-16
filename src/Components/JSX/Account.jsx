import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import Login from "./Login";
import { Button } from "react-bootstrap";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const providerGoogle = new firebase.auth.GoogleAuthProvider();
// const providerFacebook = new firebase.auth.FacebookAuthProvider();

class componentName extends Component {
  constructor() {
    super();
  }

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
            <h1>My App</h1>
            <p>Welcome! You are now signed-in!{this.props.userLogged}</p>
            <h3>Your clean product list</h3>
            <h3>Your dirty product list</h3>
          </WrapperColumn>
        </BlueWrapper>
      );
    }
  }
}

export default componentName;
