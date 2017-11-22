import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled, { css } from "styled-components";
import "../CSS/ImageLoading.css";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

// css declaration with styled component

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const ImagePreview = styled.div`
  transform: rotate(90deg);
  width: 300px;
  height: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

class ImageLoading extends Component {
  render() {
    return (
      <BlueWrapper>
        <WrapperColumn>
          <h2>image preview</h2>
          <ImagePreview style={{ backgroundImage: `url(${this.props.url})` }} />
          <h4>Image being processed</h4>
          <Wrapper>
            <div className="loader" />
          </Wrapper>
        </WrapperColumn>
      </BlueWrapper>
    );
  }
}

export default ImageLoading;
