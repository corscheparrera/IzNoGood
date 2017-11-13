import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  uploadImage = event => {
    console.log(event.target.files[0]);
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
