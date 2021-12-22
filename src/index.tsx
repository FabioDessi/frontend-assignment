import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import CurrencyExchange from './CurrencyExchange';

ReactDOM.render(
  <React.StrictMode>
    <CurrencyExchange
      currencyOptions={[
        {
          code: 'eur',
          name: 'eur',
        },
        {
          code: 'usd',
          name: 'usd',
        },
      ]}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
