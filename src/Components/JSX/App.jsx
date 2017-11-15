import * as firebase from "firebase";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../CSS/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Grid } from "react-bootstrap";
import InputFile from "./InputFile.jsx";
import NavigationForTests from "./NavigationForTests";
import ImageLoading from "./ImageLoading";
import TestSucceeded from "./TestSucceeded";
import TestFailed from "./TestFailed";
import TestUndefined from "./TestUndefined";
import fire from "./Firebase.jsx";
import Barcode from "./Barcode.jsx";

const storageRef = firebase.storage();
const db = fire.database();
// const databaseRef = firebase.database();

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      ingredients: "",
      uploadImageUrl: "",
      presentChemicals: [],
      undefinedView: false
    };
  }

  handleInput = event => {
    const file = event.target.files[0];
    if (!file) return;
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
          .then(() => this.setState({ isLoading: true }))
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
    // Get a database reference
    var ref = db.ref("userInputs");
    ref
      .set({
        ingredients: visionString
      })
      .then(() => this.setState({ ingredients: visionString }));
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

    chemicals.map(chem => {
      if (chem.includes(this.state.ingredients)) {
        console.log("HEY DUDE, WATCH OUT, " + chem + " IS GONNA KILL U!");
        this.setState({
          presentChemicals: this.state.presentChemicals.concat({
            chemical: chem,
            categorie: data[chem].categorie,
            reference: data[chem].reference
          })
        });
      }
    });
  };

  clearState = () => {
    this.setState({
      isLoading: false,
      ingredients: "",
      uploadImageUrl: "",
      presentChemicals: [],
      undefinedView: false
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavigationForTests />
          <Route
            exact
            path="/"
            render={() => {
              if (this.state.isLoading) {
                return <ImageLoading url={this.state.uploadImageUrl} />;
              } else if (this.state.undefinedView) {
                return <TestUndefined reset={this.clearState} />;
              } else if (this.state.presentChemicals.length >= 1) {
                return <TestFailed />;
              } else if (
                this.state.uploadImageUrl &&
                !this.state.presentChemicals.length
              ) {
                return <TestSucceeded />;
              } else {
                return (
                  <Grid>
                    <InputFile updateUploadImage={this.handleInput} />
                  </Grid>
                );
              }
            }}
          />

          <Route exact path="/TestSucceeded" component={TestSucceeded} />
          <Route exact path="/TestFailed" component={TestFailed} />
          <Route exact path="/TestUndefined" component={TestUndefined} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
