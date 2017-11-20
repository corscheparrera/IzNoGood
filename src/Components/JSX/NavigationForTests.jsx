import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Account from "../../icons/account.svg";

const IconAccount = styled.img`
  width: 40px;
  border-radius: 50%;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

class NavigationForTests extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.photoUrl !== prevProps.photoUrl) {
    }
  }

  render() {
    if (!this.props.photoUrl) {
      return (
        <NavBar>
          <Link to="/">
            <IconAccount src={Account} alt="" />
          </Link>
          <Link to="/Account">
            <IconAccount src={Account} alt="" />
          </Link>
        </NavBar>
      );
    } else {
      return (
        <NavBar>
          <Link to="/">
            <IconAccount src={Account} alt="" />
          </Link>

          <Link to="/Account">
            <IconAccount src={this.props.photoUrl} alt="" />
          </Link>
        </NavBar>
      );
    }
  }
}

export default NavigationForTests;
