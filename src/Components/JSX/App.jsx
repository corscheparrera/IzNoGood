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

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCI9p3KGB0UwBoqnYEZzm2tqSo3I12TfhA",
  authDomain: "iznogood-185815.firebaseapp.com",
  databaseURL: "https://iznogood-185815.firebaseio.com",
  projectId: "iznogood-185815",
  storageBucket: "iznogood-185815.appspot.com",
  messagingSenderId: "510010763162"
};

firebase.initializeApp(config);
const storageRef = firebase.storage();
// const databaseRef = firebase.database();

class App extends Component {
  constructor() {
    super();
    this.state = {
      imagePreview:
        "https://firebasestorage.googleapis.com/v0/b/iznogood-185815.appspot.com/o/IMG_5504%202.jpg?alt=media&token=554cc430-9b44-49c4-9512-535797197748"
    };
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
      .then(res => {
        console.log(res);
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
            render={() => (
              <Grid>
                <InputFile updateUploadImage={this.uploadImage} />
              </Grid>
            )}
          />

          <Route
            exact
            path="/ImageLoading"
            render={() => <ImageLoading url={this.state.imagePreview} />}
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
