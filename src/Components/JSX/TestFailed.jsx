import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled, { css } from "styled-components";
import { Button, Grid, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.css";

import Thinking from "../../icons/thinking.png";
import Warning from "../../icons/warning.svg";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

const FontAwesome = require("react-fontawesome");
const FailedText = styled.h4`textalign: center;`;

const styles = {
  fuchsia: {
    color: "#F012BE"
  },
  yellow: {
    color: "#FFDC00"
  },
  red: {
    color: "#FF4136"
  },
  light: {
    fontWeight: "bold"
  },
  padding: {
    paddingTop: "20px"
  },
  flexParent: {
    display: "flex",
    alignItems: "center"
  },
  fontStyle: {
    lineHeight: "1",
    fontSize: "16px",
    fontWeight: 200,
    fontFamily: "Helvetica Neue"
  },
  paddingLeft: {
    paddingLeft: "10px"
  }
};

class TestFailed extends Component {
  displayChemicals = item => {
    return (
      <div
        style={{
          ...styles.flexParent,
          ...styles.fontStyle,
          ...styles.padding
        }}
      >
        <FontAwesome
          name="flask"
          size="1x"
          style={
            item.risk <= 4 ? (
              { color: styles.yellow.color }
            ) : item.risk <= 6 ? (
              { color: styles.red.color }
            ) : (
              { color: styles.fuchsia.color }
            )
          }
        />
        <div
          style={styles.paddingLeft}
        >{` ${item.chemical} is a ${item.categorie}`}</div>
      </div>
    );
  };

  render() {
    return (
      <Grid fluid style={styles.fontStyle}>
        <Row>
          <Col md={11} mdOffset={1} text-center>
            <Row>
              <Col md={3} mdOffset={4} text-center>
                <img
                  src={Thinking}
                  height="150px"
                  alt=""
                  className="center-block"
                  style={styles.padding}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={3} mdOffset={4} text-center style={styles.padding}>
            <div style={{ fontSize: "28px" }}>Suspicious ingredients</div>
            {this.props.presentChemicals.map(this.displayChemicals)}
          </Col>
        </Row>
        <Row>
          <Col md={11} mdOffset={1} text-center style={styles.padding}>
            <Row>
              <Col md={3} mdOffset={4} text-center>
                <Link to="/save/DirtyProducts">
                  <Button>Save to history</Button>
                </Link>
                <Link to="/IngredientList">
                  <Button>Learn more</Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default TestFailed;
