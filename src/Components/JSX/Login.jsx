import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import GoogleButton from "react-google-button";
import styled, { css } from "styled-components";
const providerGoogle = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();

const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  font-size: 28px;
  font-weight: 200;
  text-align: center;
  height: 60vh;
`;
const FlexItem = styled.div`width: 300px;`;
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
      <ContainerFlex>
        <FlexItem>
          <h1>Please sign in</h1>
          <p>to access all functionalities of Dirti.</p>
          <p />
        </FlexItem>
        <GoogleButton onClick={() => this.logIn(providerGoogle)} />
      </ContainerFlex>
    );
  }
}

export default Login;
