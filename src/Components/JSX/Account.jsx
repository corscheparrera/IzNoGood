import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import Login from "./Login";
import { Button } from "react-bootstrap";
import "../CSS/Account.css";
import styled from "styled-components";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";
import Beaker from "react-icons/lib/fa/flask";

const database = firebase.database();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

const ImagePreview = styled.div`
  transform: rotate(90deg);
  width: 150px;
  height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const WrapperMultiProduct = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const SectionProducts = styled.h4`
  padding: 10px 0px;
  margin-top: 40px;
  text-align: center;
  font-size: 15px;
  background-color: #edeeef;
`;

const AddButton = styled.button`
  width: 150px;
  height: 150px;
  border: dashed 1px black;
  margin: 1px;
  background-color: transparent;
`;
const AddButtonDirty = AddButton.extend`background-color: transparent;`;

const styles = {
  orange: {
    color: "#FFA500"
  },
  green: {
    color: "#009900"
  },
  yellow: {
    color: "#FFDC00"
  },
  red: {
    color: "#FF4136"
  },
  btnCustom: {
    width: "120px",
    height: "40px",
    margin: "10px"
  }
};

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
        this.setState({ cleanProducts: result.val() });
      })
      .then(this.displayProducts);

    database
      .ref(`userProducts/${this.props.uidLogged}/DirtyProducts`)
      .once("value")
      .then(result => {
        this.setState({ dirtyProducts: result.val() });
      })
      .then(this.displayProducts);
  };

  displayProducts = state => {
    if (!state) return;
    const cleanProductsScanned = Object.keys(state);

    let htmlProduct = cleanProductsScanned.map(item => {
      return (
        <ImagePreview
          style={{ backgroundImage: `url(${state[item].ImageUrl})` }}
        >
          <div className="overlayflask">
            <Beaker
              className="iconRisk"
              fontSize="25px"
              style={
                state[item].Risk <= 2
                  ? {
                      color: styles.green.color
                    }
                  : state[item].Risk <= 4
                    ? { color: styles.yellow.color }
                    : state[item].Risk <= 6
                      ? { color: styles.orange.color }
                      : { color: styles.red.color }
              }
            />
          </div>
        </ImagePreview>
      );
    });
    return htmlProduct;
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
        <div>
          <SectionProducts>Your clean product list </SectionProducts>
          <WrapperMultiProduct>
            {this.state.cleanProducts
              ? this.displayProducts(this.state.cleanProducts)
              : "No clean product saved yet"}
          </WrapperMultiProduct>
          <SectionProducts>Your suspicious product list </SectionProducts>
          <WrapperMultiProduct>
            {this.state.dirtyProducts
              ? this.displayProducts(this.state.dirtyProducts)
              : "No suspicious product saved yet"}
          </WrapperMultiProduct>
        </div>
      );
    }
  }
}
export default componentName;
