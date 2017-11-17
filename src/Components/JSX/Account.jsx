import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import Login from "./Login";
import { Button } from "react-bootstrap";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const database = firebase.database();
const providerGoogle = new firebase.auth.GoogleAuthProvider();
// const providerFacebook = new firebase.auth.FacebookAuthProvider();

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
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userLogged !== prevProps.userLogged) {
      database
        .ref(`userProducts/${this.props.uidLogged}/CleanProduct`)
        .once("value", result => {
          console.log("uid", this.props.uidLogged);
          console.log("cleanProduct", result.val());
          this.setState(st => {
            st.cleanProducts.concat([result.val()]);
          });
        });
      database
        .ref(`userProducts/${this.props.uidLogged}/DirtyProducts`)
        .once("value")
        .then(result => {
          console.log("dirtyProduct", result.val());
          this.setState({ dirtyProducts: result.val() });
        });
    }
  }

  displayProducts = item => {
    <li>{`${item.ProductName} : ${item.ProductDescription}`}</li>;
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
            {/* <ul>{this.state.cleanProducts.map(this.displayProducts)}</ul> */}
            <h3>Your dirty product list</h3>
          </WrapperColumn>
        </BlueWrapper>
      );
    }
  }
}

export default componentName;
