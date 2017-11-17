import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class NavigationForTests extends Component {
  render() {
    return (
      <header>
        <Link style={{ marginRight: "5px" }} to="/Account">
          Account
        </Link>
      </header>
    );
  }
}

export default NavigationForTests;
