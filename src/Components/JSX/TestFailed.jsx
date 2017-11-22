import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled, { css } from "styled-components";
import { Button, Grid, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Beaker from "react-icons/lib/fa/flask";

const styles = {
  orange: {
    color: "#FFA500"
  },
  yellow: {
    color: "#FFDC00"
  },
  red: {
    color: "#FF4136"
  },
  btnCustom: {
    width: "120px",
    height: "40px",
    margin: "10px"
  }
};
const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 28px;
  font-weight: 200;
  line-height: 1;
`;
const FlexRow = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  margin: 15px;
  font-weight: 200;
  line-height: 1;
  padding-left: 30px;
`;
const Item = styled.div`
  width: 300px;
  max-width: 70%;
`;
const Image = styled.img`
  height: 150px;
  margin: 40px;
`;
class TestFailed extends Component {
  displayChemicals = item => {
    return (
      <FlexRow>
        <Beaker
          icon="ios-flask-outlinfontSize="
          size="16px"
          style={
            item.risk <= 4 ? (
              { color: styles.yellow.color }
            ) : item.risk <= 6 ? (
              { color: styles.orange.color }
            ) : (
              { color: styles.red.color }
            )
          }
        />
        <div style={{ paddingLeft: "10px" }}>
          {` ${item.chemical}  (${item.categorie})`}
        </div>
      </FlexRow>
    );
  };

  render() {
    return (
      <ContainerFlex>
        <Image src={require("../../icons/thinking.svg")} />
        <div>Suspicious ingredients</div>
        <div>
          {this.props.presentChemicals
            .sort((a, b) => {
              return a.risk - b.risk;
            })
            .reverse()
            .map(this.displayChemicals)}
        </div>
        <FlexRow style={{ paddingLeft: "0px" }}>
          <div style={{ paddingRight: "10px" }}>Toxicity: </div>
          <Beaker
            icon="flask"
            fontSize="16px"
            style={{ color: styles.yellow.color }}
          />
          <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>Low</div>

          <Beaker
            icon="flask"
            fontSize="16px"
            style={{ color: styles.orange.color }}
          />
          <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            Medium
          </div>

          <Beaker
            icon="flask"
            fontSize="16px"
            style={{ color: styles.red.color }}
          />
          <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>High</div>
        </FlexRow>
        <Link to="/save/DirtyProducts">
          <Button style={styles.btnCustom}>Save to history</Button>
        </Link>
        <Button style={styles.btnCustom} onClick={this.props.reset}>
          Re-scan
        </Button>
        <Link to="/IngredientList">
          <Button style={styles.btnCustom}>Learn more</Button>
        </Link>
        <div />
      </ContainerFlex>
    );
  }
}

export default TestFailed;
