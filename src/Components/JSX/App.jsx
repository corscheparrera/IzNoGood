import React, { Component } from "react";
import "../CSS/App.css";
import * as firebase from "firebase";
import "bootstrap/dist/css/bootstrap.css";
import { Grid } from "react-bootstrap";
import InputFile from "./InputFile.jsx";
import fire from "./Firebase.jsx";

const storageRef = firebase.storage();
const db = fire.database();
// const databaseRef = firebase.database();

class App extends Component {
  constructor() {
    super();
    this.state = { ingredients: "" };
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
          .then(this.send2GoogleVision)
          .then(res => res.json())
          .then(data =>
            this.storeGoogleVisionRes(
              data.responses["0"].fullTextAnnotation.text
            )
          )
          .then(this.getChemicals)
          .then(this.lookForRisk)
      );
  };

  storeGoogleVisionRes = visionString => {
    // Get a database reference
    var ref = db.ref("userInputs");
    ref
      .set({
        ingredients: visionString
      })
      .then(() =>
        this.setState({ ingredients: visionString.replace("\n", "") })
      );
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
        return;
      }
    });
  };

  render() {
    return (
      <Grid>
        <InputFile updateUploadImage={this.handleInput} />
      </Grid>
    );
  }
}

export default App;
