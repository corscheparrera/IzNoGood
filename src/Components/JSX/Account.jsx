import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import { Button } from "react-bootstrap";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();

class componentName extends Component {
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
      .then(user => this.props.logUser(user))
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
        <h1>Please log in</h1>
        <Button onClick={() => this.logIn(providerFacebook)}>Facebook</Button>
        <Button onClick={() => this.logIn(providerGoogle)}>Google</Button>
      </BlueWrapper>
    );
  }
}

export default componentName;
