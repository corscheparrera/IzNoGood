import React, { Component } from "react";
import "../CSS/App.css";
import * as firebase from "firebase";
import "bootstrap/dist/css/bootstrap.css";
import { Grid } from "react-bootstrap";
import InputFile from "./InputFile.jsx";
import fire from "./Firebase.jsx";

const storageRef = firebase.storage();
// const databaseRef = firebase.database();

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  uploadImage = event => {
    const file = event.target.files[0];
    return storageRef
      .ref()
      .child(`${file.name}`)
      .put(file)
      .then(() =>
        storageRef
          .ref()
          .child(`${file.name}`)
          .getDownloadURL()
          .then(url => this.updateState(url))
          .then(() => this.send2GoogleVision())
      );
  };
  storeGoogleVisionRes = visionString => {
    // Get a database reference
    var db = fire.database();
    var ref = db.ref("ingredients");

    ref.push(visionString);
  };

  updateState = url => {
    this.setState({ uploadImageUrl: url });
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
    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestObj)
    })
      .then(res => res.json())
      .then(data =>
        this.storeGoogleVisionRes(data.responses["0"].fullTextAnnotation.text)
      );
  };

  render() {
    return (
      <Grid>
        <InputFile updateUploadImage={this.uploadImage} />
      </Grid>
    );
  }
}

export default App;
