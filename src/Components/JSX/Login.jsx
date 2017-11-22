import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import { Button, Jumbotron } from "react-bootstrap";
import "../CSS/Account.css";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const providerGoogle = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();

class Login extends Component {
  logIn = provider => {
    firebase.auth().signInWithRedirect(provider);
  };

  componentDidMount() {
    return firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (!result) return;
        // The signed-in user info.
        const user = result.user;
        console.log("resultUser", user);
        return user;
      })
      .then(user => {
        console.log("user is", user);
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
      });
  }

  render() {
    return (
      <Jumbotron>
        <h1>Please sign in</h1>
        <p>You will have access to all functionalities of Dirti.</p>
        <p>
          <Button
            className="loginBtn loginBtn--google"
            onClick={() => this.logIn(providerGoogle)}
          >
            Google
          </Button>
        </p>
      </Jumbotron>
    );
  }
}

export default Login;
