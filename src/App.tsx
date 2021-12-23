import React from 'react';
import Papa from 'papaparse';
import { CurrencyExchange } from './CurrencyExchange';
import { getCurrencyData } from './helpers';

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
    <>
      <CurrencyExchange currencyOptions={currencies} />
    </>
  );
};

export default App;
