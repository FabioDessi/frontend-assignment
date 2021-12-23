import React from 'react';
import { act, render } from '@testing-library/react';

import App from './App';
import * as CurrencyExchangeExports from './CurrencyExchange';

const fetchResponseOk = (body: any) =>
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve(body),
  });

const mockApiResponse = `currency code,currency name
AED,United Arab Emirates Dirham
AFN,Afghan Afghani
ALL,Albanian Lek`;

const mockCurrencyOptions = [
  { code: 'AED', name: 'United Arab Emirates Dirham' },
  {
    code: 'AFN',
    name: 'Afghan Afghani',
  },
  {
    code: 'ALL',
    name: 'Albanian Lek',
  },
];

describe('App', () => {
  let spyFetch: jest.SpyInstance;
  let spyCurrencyExchange: jest.SpyInstance;

  beforeEach(() => {
    spyFetch = jest
      .spyOn(window, 'fetch')
      //@ts-ignore
      .mockReturnValue(fetchResponseOk(mockApiResponse));
    spyCurrencyExchange = jest
      //@ts-ignore
      .spyOn(CurrencyExchangeExports, 'CurrencyExchange')
      //@ts-ignore
      .mockReturnValue(null);
  });

  afterEach(() => {
    spyFetch.mockRestore();
    spyCurrencyExchange.mockRestore();
  });

  it('fetches data when component is mounted', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(window.fetch).toHaveBeenCalledWith('/currency.csv');
  });

  it('initially passes no data to CurrencyExchange', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(spyCurrencyExchange).toHaveBeenCalledWith(
      { currencyOptions: [] },
      expect.anything()
    );
  });

  it('displays currencies fetched on mount', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(spyCurrencyExchange).toHaveBeenLastCalledWith(
      { currencyOptions: mockCurrencyOptions },
      expect.anything()
    );
  });

  it('passes props through to children', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(spyCurrencyExchange).toHaveBeenLastCalledWith(
      { currencyOptions: mockCurrencyOptions },
      expect.anything()
    );

    expect(spyCurrencyExchange).toHaveBeenCalledWith(
      expect.objectContaining({ currencyOptions: mockCurrencyOptions }),
      expect.anything()
    );
  });
});
