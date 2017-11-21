import React, { Component } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

// CSS not in styled components but in vaigation - for comparing purpose

import "../CSS/Navigation.css";

class Navigation extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.photoUrl !== prevProps.photoUrl) {
    }
  }
  render() {
    if (!this.props.photoUrl) {
      return (
        <Navbar id="navbar" fluid>
          <Navbar.Header>
            <Link to="/">
              <img
                alt=""
                className="logo"
                src={require("../../icons/dna.svg")}
              />
            </Link>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/Account">
                <img
                  alt=""
                  className="logo"
                  src={require("../../icons/account.svg")}
                />
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar id="navbar" collapseOnSelect fluid>
          <Navbar.Header>
            <Link to="/">
              <img
                alt=""
                className="logo"
                src={require("../../icons/dna.svg")}
              />
            </Link>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/Account">
                <img alt="" className="logo" src={this.props.photoUrl} />
              </LinkContainer>
              <LinkContainer to="/Account">
                <NavItem eventKey={1}>{this.props.userName}</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}
export default Navigation;
