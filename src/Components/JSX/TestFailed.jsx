import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled, { css } from "styled-components";
import { Button, Grid, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.css";

const FontAwesome = require("react-fontawesome");

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
  align: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
          style={{ paddingLeft: "10px" }}
        >{` ${item.chemical} is a ${item.categorie}`}</div>
      </div>
    );
  };

  render() {
    return (
      <Grid fluid style={styles.fontStyle}>
        <Row>
          <Col style={styles.padding}>
            <img
              src={require("../../icons/thinking.png")}
              height="150px"
              alt=""
              className="center-block"
              style={styles.padding}
            />
          </Col>
        </Row>
        <div style={styles.align}>
          <Row>
            <Col style={styles.padding}>
              <div style={{ fontSize: "28px" }}>Suspicious ingredients</div>
              {this.props.presentChemicals.map(this.displayChemicals)}
            </Col>
          </Row>
          <Row>
            <Col style={styles.padding}>
              <div>
                <Link to="/save/DirtyProducts">
                  <Button>Save to history</Button>
                </Link>
              </div>
              <div>
                <Link to="/IngredientList">
                  <Button style={{ marginTop: "10px" }}>Learn more</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Grid>
    );
  }
}

export default TestFailed;
