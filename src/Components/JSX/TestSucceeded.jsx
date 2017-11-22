import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Button, Grid, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.css";

const styles = {
  padding: {
    paddingTop: "50px"
  },
  fontStyle: {
    lineHeight: "1",
    fontSize: "28px",
    fontWeight: 200,
    fontFamily: "Helvetica Neue"
  },
  alignHorizontal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  alignVertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

class TestSucceeded extends Component {
  render() {
    return (
      <Grid fluid style={styles.fontStyle}>
        <Row>
          <Col style={styles.padding}>
            <div style={styles.alignHorizontal}>Your product is fine!</div>
            <img
              src={require("../../icons/happy.svg")}
              height="150px"
              alt=""
              className="center-block"
              style={styles.padding}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ ...styles.alignVertical, ...styles.padding }}>
            <Link to="/save/CleanProducts">
              <Button>Save to history</Button>
            </Link>
            <Link to="/IngredientList">
              <Button style={{ marginTop: "10px" }}>Learn more</Button>
            </Link>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default TestSucceeded;
