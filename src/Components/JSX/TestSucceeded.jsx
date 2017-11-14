import React, { Component } from "react";

class TestSucceeded extends Component {
  render() {
    return (
      <div>
        <h2>
          Your product seems clean. Your list of ingredients passed our tests
        </h2>
        <img src="flag.jpeg" alt="" height="42" width="42" />
        <button>Want to save your product ? </button>
      </div>
    );
  }
}

export default TestSucceeded;
