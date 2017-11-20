import React, { Component } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
// import Undefined from "../../icons/";
import { Button } from "react-bootstrap";
import SadFace from "../../icons/sad.png";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

class TestUndefined extends Component {
  render() {
    return (
      <BlueWrapper>
        <WrapperColumn>
          <h4 style={{ textAlign: "center" }}>
            We couldn't scan your ingredients. Please try to reupload a better
            picture or visit our full list of ingredients to check them
          </h4>
          <img src={SadFace} height="150px" alt="" />
          <Button onClick={this.props.reset}>
            Take a new picture of my product
          </Button>
        </WrapperColumn>
      </BlueWrapper>
    );
  }
}

export default TestUndefined;
