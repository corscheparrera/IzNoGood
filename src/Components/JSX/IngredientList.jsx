import React, { Component } from "react";
import styled from "styled-components";

const WrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
  text-align: justify;
`;

class IngredientList extends Component {
  render() {
    return (
      <WrapperColumn>
        <h3>
          All the information you need to know about our product screening
          process
        </h3>
        <h4>How does your screening process work ? </h4>
        <p>
          We have gathered a list of ingredients known to be allergen or
          hazardous to health. By scanning the ingredients of your product it
          allows us to check the product ingredients against our list. Please
          note that we do not check the legally forbidden substances as the
          product couldn't be sold otherwise.
        </p>
        <h4>What ingredients do you check and why ? </h4>
        <p>
          The list of igredients we've created is based on several trusted
          sources. Ingredients can be allowed/restricted in Canada but banned in
          other countries. We tend to favor the more restrictive approaches.
        </p>
        <h4>What are your sources ?</h4>
        <p>
          We have gathered data from several respected and trusted sources :
          <ul>
            <li>
              <a href="https://www.ewg.org/">
                Environmental Working Group Database
              </a>
            </li>
            <li>
              <a href="http://ec.europa.eu/health/scientific_committees/opinions_layman/perfume-allergies/en/figtableboxes/table-13-1.htm">
                European Scientific Committee on Consumer Safety
              </a>
            </li>
            <li>
              <a href="https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/cosmetic-ingredient-hotlist-prohibited-restricted-ingredients.html">
                Canada - Prohibited and Restricted Cosmetics Ingredients
              </a>
            </li>
          </ul>
        </p>
        <h4>Can I assume the product which pass the test is 100% safe ?</h4>
        <p>
          We try our best to provide you the most exhaustive test, but the
          effects of some ingredients might still be unknown. We rely on the
          ingredients displayed on the product by the brand and our
          interpretation through our algorithm. Dirti should still give you a
          solid direction on wether a product is made of clean ingredients or
          suspicious ones.
        </p>
      </WrapperColumn>
    );
  }
}

export default IngredientList;
