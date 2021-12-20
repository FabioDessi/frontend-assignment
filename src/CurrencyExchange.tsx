import React from 'react';

export interface CurrencyExchangeProps {
  currencyOptions: {
    code: string;
    name: string;
  }[];
}

const getExchangeRateValue = (apiReturn: any): number => {
  if (apiReturn) {
    return apiReturn['Realtime Currency Exchange Rate']['5. Exchange Rate'];
  }

  return 0;
};

const CurrencyExchange: React.FC<CurrencyExchangeProps> = ({
  currencyOptions,
}) => {
  const [amount, setAmount] = React.useState('');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [exchangeRateValue, setExchangeRateValue] = React.useState<
    number | undefined
  >(undefined);
  const [result, setResult] = React.useState<number | undefined>(undefined);

  const isInitialMount = React.useRef(true);
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (from && to) {
        const fetchResult = async () => {
          const result = await window.fetch(
            `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=1R5D4TP5IQQ2N4IV`,
            {
              method: 'GET',
              credentials: 'same-origin',
            }
          );

          const apiResponse = await result.json();
          setExchangeRateValue(getExchangeRateValue(apiResponse));
        };

        fetchResult();
      }
    }
  }, [from, to]);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (amount && exchangeRateValue)
        setResult(parseInt(amount) * exchangeRateValue);
    }
  }, [exchangeRateValue, amount]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAmount(event.target.value.replace(/[^0-9]/g, ''));
  };

  const handleFromOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFrom(event.target.value);
  };

  const handleToOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setTo(event.target.value);
  };

  return (
    <>
      <>
        <label htmlFor='amount'>Amount</label>
        <input
          type='text'
          name='amount'
          id='amount'
          value={amount}
          onChange={handleInputChange}
        />
      </>
      <>
        <label htmlFor='from'>From</label>
        <select
          name='from'
          id='from'
          value={from}
          onChange={handleFromOptionChange}
        >
          <option />
          {currencyOptions.map((option) => (
            <option key={option.name} value={option.code}>
              {option.name}
            </option>
          ))}
        </select>
      </>
      <>
        <label htmlFor='to'>To</label>
        <select name='to' id='to' value={to} onChange={handleToOptionChange}>
          <option />
          {currencyOptions.map((option) => (
            <option key={option.name} value={option.code}>
              {option.name}
            </option>
          ))}
        </select>
      </>

      {result && <p>{result}</p>}
    </>
  );
};

export default CurrencyExchange;
