import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import Login from "./Login";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const database = firebase.database();
const providerGoogle = new firebase.auth.GoogleAuthProvider();
// const providerFacebook = new firebase.auth.FacebookAuthProvider();

// const productSavedWrapper = styled.styled`text-align: left;`;

class componentName extends Component {
  constructor() {
    super();
    this.state = {
      cleanProducts: [],
      dirtyProducts: []
    };
  }
  componentDidMount() {
    // check if user has already signed in, if yes skip the login and changed the state accordingly
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.updateLoginState(user);
      }
    });

    if (this.props.userLogged) {
      this.updateDatabase();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userLogged !== prevProps.userLogged) {
      this.updateDatabase();
    }
  }

  updateDatabase = () => {
    database
      .ref(`userProducts/${this.props.uidLogged}/CleanProducts`)
      .once("value", result => {
        console.log("cleanProduct", result.val());
        this.setState({ cleanProducts: result.val() });
      })
      .then(this.displayProducts);

    database
      .ref(`userProducts/${this.props.uidLogged}/DirtyProducts`)
      .once("value")
      .then(result => {
        console.log("dirtyProduct", result.val());
        this.setState({ dirtyProducts: result.val() });
      });
  };

  displayProducts = state => {
    if (!state) return;
    const cleanProductsScanned = Object.keys(state);
    console.log("arraykeys", cleanProductsScanned);
    console.log("state", state);

    let htmlProduct = cleanProductsScanned.map(item => {
      console.log("productname", state[item].ProductName);
      return (
        <p>
          <strong> {state[item].ProductName} </strong>:
          {state[item].ProductDescription}
        </p>
      );
    });
    console.log("htmlProduct", htmlProduct);
    return htmlProduct;
    // <li>{`${item.ProductName} : ${item.ProductDescription}`}</li>;
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
            <h3>Welcome {this.props.userLogged}!</h3>
            <h3>Your clean product list</h3>
            <div>{this.displayProducts(this.state.cleanProducts)}</div>
            <h3>Your dirty product list</h3>
            <div>{this.displayProducts(this.state.dirtyProducts)}</div>
          </WrapperColumn>
        </BlueWrapper>
      );
    }
  }
}

export default componentName;
