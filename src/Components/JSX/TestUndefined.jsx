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

class TestUndefined extends Component {
  render() {
    return (
      <Grid fluid style={styles.fontStyle}>
        <Row>
          <Col sm={5} smOffset={4} text-center style={styles.padding}>
            <div style={styles.alignHorizontal}>
              We couldn't scan your ingredients. Please try to reupload a better
              picture!
            </div>
            <img
              src={require("../../icons/surprised.svg")}
              height="150px"
              alt=""
              className="center-block"
              style={styles.padding}
            />
          </Col>
        </Row>

        <Row>
          <Col style={{ ...styles.alignHorizontal, ...styles.padding }}>
            <Button onClick={this.props.reset}>
              Take a new picture of my product
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default TestUndefined;
