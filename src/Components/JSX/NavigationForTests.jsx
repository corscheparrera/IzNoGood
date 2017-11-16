import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class NavigationForTests extends Component {
  render() {
    return (
      <header>
        <Nav bsStyle="pills">
          <LinkContainer to="/Account">
            <NavItem eventKey={1}>Load</NavItem>
          </LinkContainer>
        </Nav>
      </header>
    );
  }
}

export default NavigationForTests;
