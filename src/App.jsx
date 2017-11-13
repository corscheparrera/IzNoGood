import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase";

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
      <div className="App">
        <input onChange={this.uploadImage} type="file" accept="image/*" />
      </div>
    );
  }
}

export default App;
