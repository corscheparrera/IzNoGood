import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import Login from "./Login";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import GreenFlag from "../../icons/flag.png";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const database = firebase.database();
const providerGoogle = new firebase.auth.GoogleAuthProvider();
// const providerFacebook = new firebase.auth.FacebookAuthProvider();

const ImagePreview = styled.div`
  transform: rotate(90deg);
  width: 150px;
  height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 1px;
`;

// const ProductImage = styled.img`
//   transform: rotate(90deg);
//   height: 120px;
//   width: 160px;
//   border: solid 1px darkgrey;
//   margin: 2px;
// `;

const WrapperMultiProduct = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

// const WrapperSingleProduct = styled.div`
//   margin-left: 15px;
//   margin-bottom: 15px;
//   display: flex;
//   justify-content: flex-start;
//   padding: 8px;
//   border-width: thin;
//   border-bottom: 1px solid lightgrey;
// `;
// const WrapperSingleProductText = styled.div`
//   display: flex;
//   margin-left: 5px;
//   flex-direction: column;
//   font-size: 12px;
// `;

const SectionProducts = styled.h4`
  padding: 10px 0px;
  margin-top: 40px;
  text-align: center;
  font-size: 15px;
  background-color: #edeeef;
`;

// const ProductTitle = styled.span`
// font-weight: bold;
// text-transform: uppercase;
// font-syze:12px;
// }`;

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

    let htmlProduct = cleanProductsScanned.map(item => {
      return (
        // <WrapperSingleProduct>
        //   <ProductImage src={state[item].ImageUrl} alt="" />
        //   <WrapperSingleProductText>
        //     <ProductTitle> {state[item].ProductName} </ProductTitle>
        //     {state[item].ProductDescription}
        //   </WrapperSingleProductText>
        // </WrapperSingleProduct>
        <ImagePreview
          style={{ backgroundImage: `url(${state[item].ImageUrl})` }}
        />
        // <ProductImage src={state[item].ImageUrl} alt="" />
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
        <div>
          <SectionProducts>Your clean product list </SectionProducts>
          <WrapperMultiProduct>
            {this.displayProducts(this.state.cleanProducts)}
          </WrapperMultiProduct>
          <SectionProducts>Your dirty product list </SectionProducts>
          <WrapperMultiProduct>
            {this.displayProducts(this.state.dirtyProducts)}
          </WrapperMultiProduct>
        </div>
      );
    }
  }
}
export default componentName;
