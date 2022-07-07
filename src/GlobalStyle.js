import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  input[type="number"] {
    -webkit-appearance: textfield;
      -moz-appearance: textfield;
            appearance: textfield;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
  }

  html, body, #root {
    height: 100%;
    height: -webkit-fill-available;
  }

  html {
    font-family: ${props => props.theme.font.family.default};
  }

  h1 {
    font-size: ${props => props.theme.font.size.large};
    font-weight: 700;
    color: ${props => props.theme.color.red50};
    margin: 0;
  }

  h2 {
    font-size: ${props => props.theme.font.size.large};
    font-weight: 500;
    color: ${props => props.theme.color.red50};
    margin: 0;
  }

  p {
    font-size: ${props => props.theme.font.size.medium};
    font-weight: 400;
    color: ${props => props.theme.color.red50};
  }
  
`;

export default GlobalStyle;
