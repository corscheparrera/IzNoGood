import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Account from "../../icons/account.svg";

const IconAccount = styled.img`width: 40px;`;

const LeftCorner = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`;

class NavigationForTests extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.photoUrl !== prevProps.photoUrl) {
    }
  }

  render() {
    if (!this.props.photoUrl) {
      return (
        <header>
          <LeftCorner>
            <Link to="/Account">
              <IconAccount src={Account} alt="" />
            </Link>
          </LeftCorner>
        </header>
      );
    } else {
      return (
        <LeftCorner>
          <Link to="/Account">
            <IconAccount src={this.props.photoUrl} alt="" />
          </Link>
        </LeftCorner>
      );
    }
  }
}

export default NavigationForTests;
