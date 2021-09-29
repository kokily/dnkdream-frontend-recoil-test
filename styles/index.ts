import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: inherit;    
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  @-webkit-keyframes mask5Up {
    from {
      transform: translate(0, 5%);
    }
    to {
      transform: translate(0, 0);
    }
  }
  
  @keyframes mask5Up {
    from {
      transform: translate(0, 5%);
    }
    to {
      transform: translate(0, 0);
    }
  }
`;

const mediaQuery = (max_width: number) => `
  @media (max-width: ${max_width}px)
`;

export const media = {
  large: mediaQuery(1200),
  medium: mediaQuery(992),
  small: mediaQuery(768),
  xsmall: mediaQuery(376),
};
