import React, { Component } from "react";
import BlueWrapper from "./StyledComponents/BlueWrapper";
import WrapperColumn from "./StyledComponents/WrapperColumn";

class IngredientList extends Component {
  render() {
    return (
      <BlueWrapper>
        <WrapperColumn>
          <h3>
            All the information you need to know about our product screening
            process
          </h3>
          <h4>How does your screening process work ? </h4>
          <p>
            We have gathered a list of ingredients known to be allergen or
            hazardous to health. By scanning the ingredients of your product it
            allow us to check the product ingredients against our list. Please
            note that we do not check the legally forbidden substance as the
            product couldn't be sold otherwise.
          </p>
          <h4>What ingredients do you check and why ? </h4>
          <p>
            {" "}
            The list of igredients we've created is based on several sources.
            Ingredients can be allowed/restricted in Canada but banned in other
            countries. We tend to favor the more restrictive approach. The full
            list of ingredients we check is available here and subject to
            constant evolution.
          </p>
          <h4>What are your sources ?</h4>
          <p>
            We have gathered data from several respected and trusted sources :
            <ul>
              <li> source 1</li>
              <li>source 2</li>
            </ul>
          </p>
          <h4>Can I assume the product which pass the test is 100% safe ?</h4>
          <p>
            We try our best to provide you the most exhaustive test, but the
            effects of some ingredients might still be unknown and we rely on
            the ingredients displayed on the product. Therefore please refer to
            our test more as reliable indication than a 100% proof
          </p>
        </WrapperColumn>
      </BlueWrapper>
    );
  }
}

export default IngredientList;
