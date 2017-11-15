import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class NavigationForTests extends Component {
  render() {
    return (
      <header>
        <Nav bsStyle="pills">
          <LinkContainer to="/">
            <NavItem eventKey={0}>InFile</NavItem>
          </LinkContainer>
          <LinkContainer to="/ImageLoading">
            <NavItem eventKey={1}>Load</NavItem>
          </LinkContainer>
          <LinkContainer to="/TestSucceeded">
            <NavItem eventKey={2}>Succ</NavItem>
          </LinkContainer>
          <LinkContainer to="/TestFailed">
            <NavItem eventKey={3}>Fail</NavItem>
          </LinkContainer>
          <LinkContainer to="/TestUndefined">
            <NavItem eventKey={4}>Undefine</NavItem>
          </LinkContainer>
        </Nav>
      </header>
    );
  }
}

export default NavigationForTests;
