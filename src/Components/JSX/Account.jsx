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
import Delete from "react-icons/lib/ti/delete-outline";

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
  },
  iconRisk: {
    transform: "rotate(270deg)",
    margin: "2px"
  },

  delete: {
    margin: "2px",
    width: "30px",
    height: "30px"
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
  deleteProduct = (stateKey, itemId) => {
    console.log(itemId);
    const productRef = stateKey.charAt(0).toUpperCase() + stateKey.substr(1);
    let updatedProducts = { ...this.state[stateKey] }; //Clone this.state.cleanProducts or this.state.dirtyProducts into updatedProducts
    delete updatedProducts[itemId]; //remove the item from updatedProducts
    if (Object.keys(updatedProducts).length === 0) updatedProducts = null;
    database
      .ref(`userProducts/${this.props.uidLogged}/${productRef}/${itemId}`)
      .remove()
      .then(() => this.setState({ [stateKey]: updatedProducts }));
  };
  displayProducts = stateKey => {
    const state = this.state[stateKey];
    if (!state) return;
    const cleanProductsScanned = Object.keys(state);

    let htmlProduct = cleanProductsScanned.map(item => {
      return (
        <ImagePreview
          style={{ backgroundImage: `url(${state[item].ImageUrl})` }}
        >
          <button onClick={() => this.deleteProduct(stateKey, item)}>
            <Delete fontSize="25px" />
          </button>

          <Beaker
            style={styles.iconRisk}
            fontSize="25px"
            style={
              state[item].Risk <= 2 ? (
                {
                  color: styles.green.color,
                  transform: styles.iconRisk.transform
                }
              ) : state[item].Risk <= 4 ? (
                {
                  color: styles.yellow.color,
                  transform: styles.iconRisk.transform
                }
              ) : state[item].Risk <= 6 ? (
                {
                  color: styles.orange.color,
                  transform: styles.iconRisk.transform
                }
              ) : (
                {
                  color: styles.red.color,
                  transform: styles.iconRisk.transform
                }
              )
            }
          />
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
            {this.state.cleanProducts ? (
              this.displayProducts("cleanProducts")
            ) : (
              "No clean product saved yet"
            )}
          </WrapperMultiProduct>
          <SectionProducts>Your suspicious product list </SectionProducts>
          <WrapperMultiProduct>
            {this.state.dirtyProducts ? (
              this.displayProducts("dirtyProducts")
            ) : (
              "No suspicious product saved yet"
            )}
          </WrapperMultiProduct>
        </div>
      );
    }
  }
}
export default componentName;
