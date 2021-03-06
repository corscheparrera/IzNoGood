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
// const spin = styled.keyframes
// const Loader = styled.div`
//     border: 16px solid #f3f3f3; /* Light grey */
//     border-top: 16px solid #3498db; /* Blue */
//     border-radius: 50%;
//     width: 120px;
//     height: 120px;
//     animation: ${spin} 2s linear infinite;

//   @keyframes spin {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `;

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
