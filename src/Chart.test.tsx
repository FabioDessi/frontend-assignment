import { act, render } from '@testing-library/react';
import { Chart } from './Chart';

const fetchResponseOk = (body: any) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body),
  });

const mockApiResponse = {
  'Meta Data': {
    '1. Information': 'Forex Daily Prices (open, high, low, close)',
    '2. From Symbol': 'EUR',
    '3. To Symbol': 'USD',
    '4. Output Size': 'Compact',
    '5. Last Refreshed': '2021-12-22 22:20:00',
    '6. Time Zone': 'UTC',
  },
  'Time Series FX (Daily)': {
    '2021-12-22': {
      '1. open': '1.12860',
      '2. high': '1.13424',
      '3. low': '1.12620',
      '4. close': '1.13220',
    },
  },
};

describe('Chart', () => {
  let spyFetch: jest.SpyInstance;

  beforeEach(() => {
    spyFetch = jest
      .spyOn(window, 'fetch')
      //@ts-ignore
      .mockReturnValue(fetchResponseOk(mockApiResponse));
  });

  afterEach(() => {
    spyFetch.mockRestore();
  });

  it('does not fetch data when from and to currencies are not defined', () => {
    render(<Chart currencies={{ from: '', to: '' }} />);

    expect(window.fetch).not.toBeCalled();
  });

  it('does not render Linechart when from and to currencies are not defined', () => {
    const { container } = render(<Chart currencies={{ from: '', to: '' }} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('calls fetch when from and to currencies are defined', async () => {
    await act(async () => {
      render(<Chart currencies={{ from: 'EUR', to: 'USD' }} />);
    });

    expect(window.fetch).toHaveBeenCalledWith(
      'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=1R5D4TP5IQQ2N4IV',
      expect.objectContaining({
        method: 'GET',
        credentials: 'same-origin',
      })
    );
  });

  it('after the initial sets, calls fetch every time from or to currencies changes', async () => {
    await act(async () => {
      render(<Chart currencies={{ from: 'EUR', to: 'USD' }} />);
    });

    await act(async () => {
      render(<Chart currencies={{ from: 'USD', to: 'USD' }} />);
    });

    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenLastCalledWith(
      'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=USD&apikey=1R5D4TP5IQQ2N4IV',
      expect.objectContaining({
        method: 'GET',
        credentials: 'same-origin',
      })
    );
  });

  it('renders Linechart when from and to currencies are defined', async () => {
    let container = null;
    await act(async () => {
      ({ container } = render(
        <Chart currencies={{ from: 'EUR', to: 'USD' }} />
      ));
    });

    expect(container).not.toBeEmptyDOMElement();
  });
});
