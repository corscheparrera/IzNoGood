import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "./Firebase.jsx";
import Login from "./Login";
import styled from "styled-components";
import ImageTools from "./ResizeImage.js";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";
import Template from "../../icons/picture-front2-instructions.jpg";
import Plus from "../../icons/icons8-plus.svg";

const storageRef = firebase.storage();
const database = firebase.database();

// Styled components

const InstructionPicture = styled.img`
  height: 300px;
  margin-top: 30px;
  margin-bottom: 15px;
`;

const Instructions = styled.h3`
  font-size: 20px;
  font-weight: 200;
  margin-bottom: 10px;
`;

const InputWrapperCentered = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

class SaveMyProduct extends Component {
  constructor() {
    super();
    this.state = {
      uploadImageUrl: ""
    };
  }
  componentDidMount() {
    // check if user has already signed in, if yes skip the login and changed the state accordingly
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.updateLoginState(user);
      }
    });
  }

  getRiskIndice = () => {
    if (this.props.presentChemicals.length === 0) return 0;

    let riskArray = this.props.presentChemicals
      .sort((a, b) => {
        return a.risk - b.risk;
      })
      .reverse();

    return riskArray[0].risk;
  };

  handleProductToSave = event => {
    // check if file exists
    const file = event.target.files[0];
    if (!file) return;

    // Resize Picture
    ImageTools.resize(
      file,
      {
        width: 450, // maximum width
        height: 300 // maximum height
      },
      (blob, didItResize) => {
        // didItResize will be true if it managed to resize it, otherwise false (and will return the original file as 'blob')
        const randomNumber = Math.floor(Math.random() * 10000000);
        storageRef
          .ref()
          .child(`${randomNumber}${file.name}`)
          .put(blob)
          .then(() => {
            storageRef
              .ref()
              .child(`${randomNumber}${file.name}`)
              .getDownloadURL()
              .then(url => this.setState({ uploadImageUrl: url }))
              .then(() => {
                database
                  .ref(
                    `userProducts/${this.props.uidLogged}/${this.props.status}`
                  )
                  .push({
                    ImageUrl: this.state.uploadImageUrl,
                    Risk: this.getRiskIndice()
                  });
              })
              .then(() => this.props.historyPush("/Account"));
          });
      }
    );
  };

  render() {
    if (!this.props.userLogged) {
      return (
        <Login
          updateLoginState={this.props.updateLoginState}
          userLogged={this.props.userLogged}
        />
      );
    } else {
      return (
        <WrapperColumn>
          <InstructionPicture src={Template} />
          <div>
            <label style={{ textAlign: "center" }} for="file-input">
              <Instructions>
                Take a <strong>front</strong> picture of your product to save it
              </Instructions>

              <img src={Plus} />
            </label>
            <input
              style={{ display: "none" }}
              id="file-input"
              type="file"
              onChange={this.handleProductToSave}
            />
          </div>
        </WrapperColumn>
      );
    }
  }
}
export default SaveMyProduct;
