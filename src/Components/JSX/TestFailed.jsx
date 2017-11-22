import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled, { css } from "styled-components";
import { Button, Grid, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.css";

const FontAwesome = require("react-fontawesome");

const styles = {
  orange: {
    color: "#FFA500"
  },
  yellow: {
    color: "#FFDC00"
  },
  red: {
    color: "#FF4136"
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

  max-width: 80%;
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
        <FontAwesome
          name="flask"
          size="1x"
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
          {` ${item.chemical} is an ${item.categorie}`}
        </div>
      </FlexRow>
    );
  };

  render() {
    return (
      <ContainerFlex>
        <Image src={require("../../icons/thinking.svg")} />
        <div>Suspicious ingredients</div>
        <div> {this.props.presentChemicals.map(this.displayChemicals)}</div>

        <Link to="/save/DirtyProducts">
          <Button>Save to history</Button>
        </Link>
        <Link to="/IngredientList">
          <Button style={{ marginTop: "10px", marginBottom: "20px" }}>
            Learn more
          </Button>
        </Link>
      </ContainerFlex>
    );
  }
}

export default TestFailed;
