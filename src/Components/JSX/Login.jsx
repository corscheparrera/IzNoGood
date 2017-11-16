import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import { Button } from "react-bootstrap";
import "../CSS/Account.css";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const providerGoogle = new firebase.auth.GoogleAuthProvider();

class Login extends Component {
  logIn = provider => {
    firebase.auth().signInWithRedirect(provider);
  };

  componentDidMount() {
    return firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        console.log("hey");
        window.g = result;
        if (!result) return;
        // The signed-in user info.
        const user = result.user;
        console.log("resultUser", user);
        return user;
      })
      .then(user => {
        this.props.updateLoginState(user);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error);
        // ...
      });
  }
  render() {
    return (
      <BlueWrapper>
        <WrapperColumn>
          <h1>Please log in</h1>
          {/* <Button
            className="loginBtn loginBtn--facebook"
            onClick={() => this.logIn(providerFacebook)}
          >
            Facebook
          </Button> */}
          <Button
            className="loginBtn loginBtn--google"
            onClick={() => this.logIn(providerGoogle)}
          >
            Google
          </Button>
        </WrapperColumn>
      </BlueWrapper>
    );
  }
}

export default Login;
