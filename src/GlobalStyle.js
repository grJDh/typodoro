import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html, body, #root {
    height: 100%;
    height: -webkit-fill-available;
  }

  html { 
    background-color: #0D0404;
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
