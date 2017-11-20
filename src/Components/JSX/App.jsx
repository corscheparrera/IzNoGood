import * as firebase from "firebase";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import Barcode from "./Barcode.jsx";
import stringSimilarity from "string-similarity";
const storageRef = firebase.storage();
const db = fire.database();
// const databaseRef = firebase.database();

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
    console.log("log User updated");
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
    console.log(visionString);
    var ingredients = visionString
      .toLowerCase()
      .replace(/\./g, ",")
      .replace(/\//g, ",")
      .replace("", ",")
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
    var chemicals = Object.keys(data);
    // var chemi = chemicals.map(chem =>
    //   chem.replace(/-/g, "").replace(/\s+/g, "")
    // );
    console.log(chemicals);
    chemicals.map(chem => {
      this.state.ingredients.map(ingr => {
        if (stringSimilarity.compareTwoStrings(ingr, chem) > 0.8) {
          console.log("HEY DUDE, WATCH OUT, " + chem + " IS GONNA KILL U!");

          this.setState({
            presentChemicals: this.state.presentChemicals.concat({
              chemical: chem,
              categorie: data[chem].categorie,
              reference: data[chem].reference,
              similarity: stringSimilarity.compareTwoStrings(ingr, chem)
            })
          });
        }
      });
    });
  };

  clearState = () => {
    console.log("clearstate");
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
      <BrowserRouter>
        <div>
          <NavigationForTests photoUrl={this.state.photoUrl} />

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
                return (
                  <Grid>
                    {/*<Barcode handleBarcode={this.handleBarcode} />*/}
                    <InputFile updateUploadImage={this.handleInput} />
                  </Grid>
                );
              }
            }}
          />
          <Route exact path="/IngredientList" component={IngredientList} />
          <Route
            exact
            path="/Account"
            render={() => (
              <Account
                userLogged={this.state.user}
                updateLoginState={this.logUser}
                uidLogged={this.state.uid}
              />
            )}
          />
          <Route
            exact
            path="/save/:status"
            render={routeProps => (
              <SaveMyProduct
                userLogged={this.state.user}
                uidLogged={this.state.uid}
                updateLoginState={this.logUser}
                status={routeProps.match.params.status}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
