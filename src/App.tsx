import React from 'react';
import Papa from 'papaparse';

import { CurrencyExchange } from './CurrencyExchange';
import { getCurrencyData } from './helpers';
import {
  GlobalStyle,
  AppWrapper,
  TextWrapper,
  StyledH1,
  StyledH3,
} from './StyledComponents';

export const App: React.FC = () => {
  const [currencies, setCurrencies] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const response = await fetch('/currency.csv');
      const text = await response.text();
      const parsed = Papa.parse(text, { header: true });

      //@ts-ignore
      setCurrencies(getCurrencyData(parsed.data));
    }

    getData();
  }, []);

  return (
    <AppWrapper>
      <GlobalStyle />
      <TextWrapper>
        <StyledH1>Currency converter</StyledH1>
        <StyledH3>
          Input the amount and choose the currency values
          <br />A graph showing the historical rates will also appear on the
          screen
        </StyledH3>
      </TextWrapper>

      <CurrencyExchange currencyOptions={currencies} />
    </AppWrapper>
  );
};

export default App;
