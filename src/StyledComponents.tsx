import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    font-weight: 300;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  h1 {
    font-weight: 500;
  }
`;

export const AppWrapper = styled('div')`
  margin: 0 auto;
  max-width: 1140px;
`;

export const StyledH1 = styled('h1')`
  margin-bottom: 0.5em;
  font-size: 1.5em;
`;

export const StyledH3 = styled('h3')`
  font-size: 1.2em;
`;

export const TextWrapper = styled('div')`
  margin: 4em auto 0 auto;
  text-align: center;
  max-width: 600px;
`;

export const CurrencyExchangeWrapper = styled('div')`
  padding: 3em;
  margin: 4em 0 0 0;
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(35 55 80 / 30%) 0px 6px 12px;
  align-content: space-between;
`;

export const InputWrapper = styled('div')`
  & label {
    display: block;
  }

  flex: 0 0 50%;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export const StyledLabel = styled('label')`
  font-weight: 500;
  font-size: 1.2em;
  margin: 0 0 0.5em;
`;

export const StyledInput = styled('input')`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 6px;
  box-shadow: rgb(0 17 51 / 5%) 0px 3px 15px;
  padding: 1em;
  margin: 0 1em 0 0;
  color: rgb(20, 30, 55);
  background: none;
`;

export const StyledSelect = styled('select')`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 6px;
  box-shadow: rgb(0 17 51 / 5%) 0px 3px 15px;
  padding: 1em;
  margin: 0 1em 0 0;
  color: rgb(20, 30, 55);
  background: none;
`;

export const ResultContainer = styled('div')`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 6px;
  box-shadow: rgb(0 17 51 / 5%) 0px 3px 15px;
  padding: 1em;
  margin: 0 1em 0 0;
  color: rgb(20, 30, 55);
  background: none;
`;

export const ChartWrapper = styled('div')`
  padding: 3em;
  margin: 4em 0 0 0;
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(35 55 80 / 30%) 0px 6px 12px;
  align-content: space-between;
`;
