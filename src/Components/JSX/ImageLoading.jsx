import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled, { css } from "styled-components";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

// css declaration with styled component
const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 28px;
  font-weight: 200;
  line-height: 1;
`;
const Wrapper = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 200px;
  @keyframes bottom-top {
    0% {
      height: 0;
      opacity: 0;
    }
    50% {
      height: 30px;
      opacity: 1;
    }
    100% {
      height: 0;
      opacity: 0;
    }
  }
`;

const ImagePreview = styled.div`
  transform: rotate(90deg);
  width: 300px;
  height: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const Progress = styled.div`
  height: 30px;
  width: 90px;
  position: relative;
`;
const ProgressChilds = styled.div`
  background: #000000;
  height: 0;
  position: absolute;
  bottom: 0;
  width: 10px;
  border-radius: 2px;
`;
const Child1 = ProgressChilds.extend`
  left: -15px;
  -webkit-animation: bottom-top 2s infinite ease-in-out 0s;
  animation: bottom-top 2s infinite ease-in-out 0s;
`;
const Child2 = ProgressChilds.extend`
  left: 0px;
  -webkit-animation: bottom-top 2s infinite ease-in-out 0.2s;
  animation: bottom-top 2s infinite ease-in-out 0.2s;
`;

const Child3 = ProgressChilds.extend`
  left: 15px;
  -webkit-animation: bottom-top 2s infinite ease-in-out 0.4s;
  animation: bottom-top 2s infinite ease-in-out 0.4s;
`;
const Child4 = ProgressChilds.extend`
  left: 30px;
  -webkit-animation: bottom-top 2s infinite ease-in-out 0.6s;
  animation: bottom-top 2s infinite ease-in-out 0.6s;
`;
const Child5 = ProgressChilds.extend`
  left: 45px;
  -webkit-animation: bottom-top 2s infinite ease-in-out 0.8s;
  animation: bottom-top 2s infinite ease-in-out 0.8s;
`;
const Child6 = ProgressChilds.extend`
  left: 60px;
  -webkit-animation: bottom-top 2s infinite ease-in-out 1s;
  animation: bottom-top 2s infinite ease-in-out 1s;
`;
const Child7 = ProgressChilds.extend`
  left: 75px;
  -webkit-animation: bottom-top 2s infinite ease-in-out 1.2s;
  animation: bottom-top 2s infinite ease-in-out 1.2s;
`;

class ImageLoading extends Component {
  render() {
    return (
      <ContainerFlex>
        <div style={{ paddingTop: "20vh" }}>Image being processed...</div>
        <Wrapper>
          <Progress>
            <Child1 />
            <Child2 />
            <Child3 />
            <Child4 />
            <Child5 />
            <Child6 />
          </Progress>
        </Wrapper>
      </ContainerFlex>
    );
  }
}

export default ImageLoading;
// <ImagePreview style={{ backgroundImage: `url(${this.props.url})` }} />
// <h2>image preview</h2>
// <h4>Image being processed</h4>
