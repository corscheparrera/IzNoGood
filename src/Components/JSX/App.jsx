import * as firebase from "firebase";
import React, { Component } from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import "../CSS/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Grid } from "react-bootstrap";
import NavigationForTests from "./NavigationForTests";
import SaveMyProduct from "./SaveMyProduct";
import Account from "./Account";
import IngredientList from "./IngredientList";
import InputFile from "./InputFile.jsx";
import ImageLoading from "./ImageLoading";
import TestSucceeded from "./TestSucceeded";
import TestFailed from "./TestFailed";
import TestUndefined from "./TestUndefined";
import fire from "./Firebase.jsx";
import styled, { css } from "styled-components";
import stringSimilarity from "string-similarity";
const storageRef = firebase.storage();
const db = fire.database();

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      ingredients: [],
      uploadImageUrl: "",
      presentChemicals: [],
      undefinedView: false,
      user: "",
      uid: "",
      photoUrl: "",
      productInputName: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.logUser(user);
      }
    });
  }

  logUser = user => {
    this.setState({
      user: user.displayName,
      uid: user.uid,
      photoUrl: user.photoURL
    });
  };

  handleBarcode = productName => {
    this.setState({ productInputName: productName });
  };

  handleInput = event => {
    const file = event.target.files[0];
    if (!file) return;
    this.setState({ isLoading: true });
    storageRef
      .ref()
      .child(`${file.name}`)
      .put(file)
      .then(() =>
        storageRef
          .ref()
          .child(`${file.name}`)
          .getDownloadURL()
          .then(url => this.setState({ uploadImageUrl: url }))
          .then(this.send2GoogleVision)
          .then(res => res.json())
          .then(data => {
            if (
              Object.keys(data.responses["0"]).length === 0 &&
              data.responses["0"].constructor === Object
            ) {
              this.setState({ undefinedView: true });
            } else {
              this.storeGoogleVisionRes(
                data.responses["0"].fullTextAnnotation.text.replace("\n", "")
              );
            }
          })
          .then(this.getChemicals)
          .then(this.lookForRisk)
          .then(() => this.setState({ isLoading: false }))
      );
  };

  storeGoogleVisionRes = visionString => {
    var ingredients = visionString
      .toLowerCase()
      .replace(/:|\.|""/g, ",")
      .replace(/\//g, ",")
      .replace(/\n/g, " ")
      .replace(/\s/g, "")
      .split(",");

    // Get a database reference
    var ref = db.ref("userInputs");
    ref
      .set({
        ingredients: ingredients
      })
      .then(() => this.setState({ ingredients: ingredients }));
  };

  send2GoogleVision = () => {
    const url = `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCAzY_-ph4ukwBkvEbEcmKmTDXMZUIjw5k`;
    const requestObj = {
      requests: [
        {
          image: {
            source: {
              imageUri: this.state.uploadImageUrl
            }
          },
          features: [
            {
              type: "TEXT_DETECTION",
              maxResults: 1
            }
          ]
        }
      ]
    };
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(requestObj)
    });
  };

  getChemicals = () => {
    var chemicalsRef = db.ref("chemicals");
    return chemicalsRef.once("value").then(x => x.val());
  };
  lookForRisk = data => {
    //création d'un object itérable pour pouvoir utiliser 'for of' sur data
    const iterableObj = {
      *[Symbol.iterator]() {
        yield* Object.entries(data);
      }
    };
    // itération sur l'object contentant les produits chimiques
    for (const [key, val] of iterableObj) {
      this.state.ingredients.map(ingr => {
        if (stringSimilarity.compareTwoStrings(ingr, val.shortened) > 0.8) {
          this.setState({
            presentChemicals: this.state.presentChemicals.concat({
              chemical: key,
              categorie: val.categorie,
              risk: val.score,
              link: val.link,
              similarity: stringSimilarity.compareTwoStrings(
                ingr,
                val.shortened
              )
            })
          });
        }
      });
    }
  };

  clearState = () => {
    this.setState({
      isLoading: false,
      ingredients: [],
      uploadImageUrl: "",
      presentChemicals: [],
      undefinedView: false
    });
  };

  render() {
    return (
      <HashRouter>
        <div>
          <NavigationForTests
            userName={this.state.user}
            photoUrl={this.state.photoUrl}
            reset={this.clearState}
          />

          <Route
            exact
            path="/"
            render={() => {
              if (this.state.isLoading) {
                return <ImageLoading url={this.state.uploadImageUrl} />;
              } else if (this.state.undefinedView) {
                return <TestUndefined reset={this.clearState} />;
              } else if (this.state.presentChemicals.length >= 1) {
                return (
                  <TestFailed
                    presentChemicals={this.state.presentChemicals}
                    reset={this.clearState}
                  />
                );
              } else if (
                this.state.uploadImageUrl &&
                !this.state.presentChemicals.length
              ) {
                return <TestSucceeded reset={this.clearState} />;
              } else {
                return <InputFile updateUploadImage={this.handleInput} />;
              }
            }}
          />
          <Route exact path="/IngredientList" component={IngredientList} />
          <Route
            exact
            path="/Account"
            render={routeProps => (
              <Account
                presentChemicals={this.state.presentChemicals}
                userLogged={this.state.user}
                updateLoginState={this.logUser}
                uidLogged={this.state.uid}
                historyPush={routeProps.history.push}
              />
            )}
          />
          <Route
            exact
            path="/save/:status"
            render={routeProps => (
              <SaveMyProduct
                presentChemicals={this.state.presentChemicals}
                userLogged={this.state.user}
                uidLogged={this.state.uid}
                updateLoginState={this.logUser}
                status={routeProps.match.params.status}
                historyPush={routeProps.history.push}
              />
            )}
          />
        </div>
      </HashRouter>
    );
  }
}

export default App;
