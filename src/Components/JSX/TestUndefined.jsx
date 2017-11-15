import React, { Component } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import Undefined from "../../icons/";
import { Button } from "react-bootstrap";

class TestUndefined extends Component {
  render() {
    return (
      <div>
        <h4>
          We couldn't scan your ingredients. Please try to reupload a better
          picture or visit our full list of ingredients to check them
        </h4>
        <button onClick={this.props.reset}>Reset</button>
      </div>
    );
  }
}

export default TestUndefined;
