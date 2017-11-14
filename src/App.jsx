import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Grid, Row, Col } from "react-bootstrap";

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
      <Grid>
        <Row>
          <div class="col-sm-4 col-sm-offset-4  text-center">
            {/*<Col sm={4} smOffset={4}>*/}
            <Button
              bsStyle="buttonUpload"
              bsSize="large"
              onChange={this.uploadImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.4 489.4">
                <path d="M382.4 422.75H277.4v-106.1h34.7c8.8 0 14-10 8.8-17.2l-67.5-93.4c-4.3-6-13.2-6-17.5 0l-67.5 93.4c-5.2 7.2-.1 17.2 8.8 17.2h34.7v106.1H94.3c-52.5-2.9-94.3-52-94.3-105.2 0-36.7 19.9-68.7 49.4-86-2.7-7.3-4.1-15.1-4.1-23.3 0-37.5 30.3-67.8 67.8-67.8 8.1 0 15.9 1.4 23.2 4.1 21.7-46 68.5-77.9 122.9-77.9 70.4.1 128.4 54 135 122.7 54.1 9.3 95.2 59.4 95.2 116.1 0 60.6-47.2 113.1-107 117.3z" />
              </svg>Upload
            </Button>
          </div>
        </Row>
      </Grid>
    );
  }
}

export default App;
