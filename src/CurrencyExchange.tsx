import React from 'react';
import { Chart } from './Chart';

import { getExchangeRateValue } from './helpers';
import {
  CurrencyExchangeWrapper,
  InputWrapper,
  StyledLabel,
  StyledInput,
  StyledSelect,
  ResultContainer,
} from './StyledComponents';

export interface CurrencyExchangeProps {
  currencyOptions: {
    code: string;
    name: string;
  }[];
}

export const CurrencyExchange: React.FC<CurrencyExchangeProps> = ({
  currencyOptions,
}) => {
  const [amount, setAmount] = React.useState('');
  const [result, setResult] = React.useState<number>(0);
  const [exchangeRateValue, setExchangeRateValue] = React.useState<
    number | undefined
  >(undefined);
  const [currencies, setCurrencies] = React.useState({
    from: '',
    to: '',
  });

  const isInitialMount = React.useRef(true);
  React.useEffect(() => {
    const { from, to } = currencies;

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (from && to) {
        const fetchCurrencyExchange = async () => {
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

        fetchCurrencyExchange();
      }
    }
  }, [currencies]);

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

  const handelCurrenciesOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setCurrencies({ ...currencies, [event.target.name]: event.target.value });
  };

  return (
    <>
      <CurrencyExchangeWrapper>
        <InputWrapper>
          <StyledLabel htmlFor='amount'>Amount</StyledLabel>
          <StyledInput
            type='text'
            name='amount'
            id='amount'
            value={amount}
            onChange={handleInputChange}
          />
        </InputWrapper>
        <InputWrapper style={{ marginLeft: 'auto' }}>
          <StyledLabel htmlFor='from'>From</StyledLabel>
          <StyledSelect
            name='from'
            id='from'
            value={currencies.from}
            onChange={handelCurrenciesOptionChange}
          >
            <option />
            {currencyOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </StyledSelect>
        </InputWrapper>
        <InputWrapper>
          <StyledLabel>Result</StyledLabel>
          <ResultContainer>{result}</ResultContainer>
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor='to'>To</StyledLabel>
          <StyledSelect
            name='to'
            id='to'
            value={currencies.to}
            onChange={handelCurrenciesOptionChange}
          >
            <option />
            {currencyOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </StyledSelect>
        </InputWrapper>
      </CurrencyExchangeWrapper>
      <Chart currencies={currencies} />
    </>
  );
};
