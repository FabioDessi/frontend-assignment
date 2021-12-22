import { render, fireEvent, act } from '@testing-library/react';

import CurrencyExchange from './CurrencyExchange';
import * as ChartExports from './Chart';

const fetchResponseOk = (body: any) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body),
  });

const mockProps = {
  currencyOptions: [
    { code: 'code1', name: 'name1' },
    { code: 'code2', name: 'name2' },
  ],
};

const mockApiResponse = {
  'Realtime Currency Exchange Rate': {
    '5. Exchange Rate': '1.5',
  },
};

describe('CurrencyExchange', () => {
  let spyFetch: jest.SpyInstance;
  let spyChart: jest.SpyInstance;

  beforeEach(() => {
    spyFetch = jest
      .spyOn(window, 'fetch')
      //@ts-ignore
      .mockReturnValue(fetchResponseOk(mockApiResponse));
    //@ts-ignore
    spyChart = jest.spyOn(ChartExports, 'Chart').mockReturnValue(null);
  });

  afterEach(() => {
    spyFetch.mockRestore();
    spyChart.mockRestore();
  });

  it('does not fetch data when component mount', () => {
    render(<CurrencyExchange {...mockProps} />);

    expect(window.fetch).not.toBeCalled();
  });

  it('calls fetch only when the from and to currencies are set', async () => {
    const { getByLabelText } = render(<CurrencyExchange {...mockProps} />);
    const fromSelect = getByLabelText('From') as HTMLSelectElement;
    const toSelect = getByLabelText('To') as HTMLSelectElement;

    fireEvent.change(fromSelect, { target: { value: 'code1' } });
    expect(window.fetch).not.toBeCalled();
    await act(async () => {
      fireEvent.change(toSelect, { target: { value: 'code2' } });
    });
    expect(window.fetch).toHaveBeenCalledWith(
      'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=code1&to_currency=code2&apikey=1R5D4TP5IQQ2N4IV',
      expect.objectContaining({
        method: 'GET',
        credentials: 'same-origin',
      })
    );
  });

  it('after the initial sets, calls fetch every time an input changes', async () => {
    const { getByLabelText } = render(<CurrencyExchange {...mockProps} />);
    const fromSelect = getByLabelText('From') as HTMLSelectElement;
    const toSelect = getByLabelText('To') as HTMLSelectElement;

    fireEvent.change(fromSelect, { target: { value: 'code1' } });
    await act(async () => {
      fireEvent.change(toSelect, { target: { value: 'code2' } });
    });
    await act(async () => {
      fireEvent.change(toSelect, { target: { value: 'code1' } });
    });
    expect(window.fetch).toHaveBeenLastCalledWith(
      'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=code1&to_currency=code1&apikey=1R5D4TP5IQQ2N4IV',
      expect.objectContaining({
        method: 'GET',
        credentials: 'same-origin',
      })
    );
  });

  it('calculates and render the result when amount and exchangeRateValue are set', async () => {
    const { getByLabelText, queryByText } = render(
      <CurrencyExchange {...mockProps} />
    );
    const input = getByLabelText('Amount') as HTMLInputElement;
    const fromSelect = getByLabelText('From') as HTMLSelectElement;
    const toSelect = getByLabelText('To') as HTMLSelectElement;
    const result = 100 * 1.5;

    expect(queryByText(result)).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.change(fromSelect, { target: { value: 'code1' } });
    await act(async () => {
      fireEvent.change(toSelect, { target: { value: 'code2' } });
    });

    expect(window.fetch).toHaveBeenCalledWith(
      'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=code1&to_currency=code2&apikey=1R5D4TP5IQQ2N4IV',
      expect.objectContaining({
        method: 'GET',
        credentials: 'same-origin',
      })
    );
    expect(queryByText(result)).toBeInTheDocument();
  });

  it('initially passes empty from and to currencies to Chart', () => {
    render(<CurrencyExchange {...mockProps} />);

    expect(spyChart).toHaveBeenCalledWith(
      { currencies: { from: '', to: '' } },
      expect.anything()
    );
  });

  it('passes from and to state when changed', async () => {
    const { getByLabelText } = render(<CurrencyExchange {...mockProps} />);
    const fromSelect = getByLabelText('From') as HTMLSelectElement;
    const toSelect = getByLabelText('To') as HTMLSelectElement;

    fireEvent.change(fromSelect, { target: { value: 'code1' } });
    expect(window.fetch).not.toBeCalled();
    await act(async () => {
      fireEvent.change(toSelect, { target: { value: 'code2' } });
    });
    expect(spyChart).toHaveBeenLastCalledWith(
      { currencies: { from: 'code1', to: 'code2' } },
      expect.anything()
    );
  });

  describe('amount field', () => {
    it('renders a text box', () => {
      const { getByLabelText } = render(<CurrencyExchange {...mockProps} />);
      const input = getByLabelText('Amount') as HTMLInputElement;

      expect(input).not.toBeNull();
      expect(input.tagName).toEqual('INPUT');
      expect(input.type).toEqual('text');
    });

    it('renders a label', () => {
      const { getByText } = render(<CurrencyExchange {...mockProps} />);
      const label = getByText('Amount');

      expect(label).not.toBeNull();
    });

    it('has an id that matches the label htmlFor attribute', () => {
      const { getByLabelText, getByText } = render(
        <CurrencyExchange {...mockProps} />
      );
      const input = getByLabelText('Amount') as HTMLInputElement;
      const label = getByText('Amount') as HTMLLabelElement;

      expect(input.id).toEqual(label.htmlFor);
    });

    it('starts with an empty string value', () => {
      const { getByLabelText } = render(<CurrencyExchange {...mockProps} />);
      const input = getByLabelText('Amount') as HTMLInputElement;

      expect(input.value).toEqual('');
    });

    it('allows only numbers as input', () => {
      const { getByLabelText } = render(<CurrencyExchange {...mockProps} />);
      const input = getByLabelText('Amount') as HTMLInputElement;

      expect(input.value).toEqual('');
      fireEvent.change(input, { target: { value: 'newValue' } });
      expect(input.value).toEqual('');
      fireEvent.change(input, { target: { value: '123' } });
      expect(input.value).toEqual('123');
    });
  });

  const itRendersAsASelectBox = (labelText: string): void => {
    it('renders as a select box', () => {
      const { getByLabelText } = render(<CurrencyExchange {...mockProps} />);
      const selectField = getByLabelText(labelText) as HTMLSelectElement;

      expect(selectField).not.toBeNull();
      expect(selectField.tagName).toEqual('SELECT');
    });
  };

  const itRendersALabel = (labelText: string): void => {
    it('renders a label', () => {
      const { getByText } = render(<CurrencyExchange {...mockProps} />);
      const label = getByText(labelText);

      expect(label).not.toBeNull();
    });
  };

  const itHasAnIdThatMatchesTheLabelHtmlForAttribute = (
    labelText: string
  ): void => {
    it('has an id that matches the label htmlFor attribute', () => {
      const { getByLabelText, getByText } = render(
        <CurrencyExchange {...mockProps} />
      );
      const selectField = getByLabelText(labelText) as HTMLSelectElement;
      const label = getByText(labelText) as HTMLLabelElement;

      expect(selectField.id).toEqual(label.htmlFor);
    });
  };

  const initiallyHasABlankValueChosen = (labelText: string): void => {
    it('initially has a blank value chosen', () => {
      const { getByLabelText } = render(<CurrencyExchange {...mockProps} />);
      const selectField = getByLabelText(labelText) as HTMLSelectElement;
      const firstNode = selectField.childNodes[0] as HTMLOptionElement;

      expect(selectField.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    });
  };

  const itListsAllCurrencyOptions = (labelText: string): void => {
    it('lists all currency options', () => {
      const { getByLabelText } = render(<CurrencyExchange {...mockProps} />);
      const selectField = getByLabelText(labelText) as HTMLSelectElement;

      const renderedCurrencies = Array.from(selectField.childNodes).map(
        (node) => node.textContent
      );
      const availableCurrencies = Array.from(mockProps.currencyOptions).map(
        (option) => option.name
      );

      expect(renderedCurrencies).toEqual(
        expect.arrayContaining(availableCurrencies)
      );
    });
  };

  const itUpdatesTheValueAfterOnChange = (labelText: string): void => {
    it('updates the value after onChange', () => {
      const { getByLabelText } = render(<CurrencyExchange {...mockProps} />);
      const selectField = getByLabelText(labelText) as HTMLSelectElement;
      const firstNode = selectField.childNodes[0] as HTMLOptionElement;
      const secondNode = selectField.childNodes[1] as HTMLOptionElement;

      expect(selectField.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
      fireEvent.change(selectField, { target: { value: 'code1' } });
      expect(selectField.value).toEqual('code1');
      expect(secondNode.selected).toBeTruthy();
    });
  };

  describe('from currency select', () => {
    itRendersAsASelectBox('From');
    itRendersALabel('From');
    itHasAnIdThatMatchesTheLabelHtmlForAttribute('From');
    initiallyHasABlankValueChosen('From');
    itListsAllCurrencyOptions('From');
    itUpdatesTheValueAfterOnChange('From');
  });

  describe('to currency select', () => {
    itRendersAsASelectBox('To');
    itRendersALabel('To');
    itHasAnIdThatMatchesTheLabelHtmlForAttribute('To');
    initiallyHasABlankValueChosen('To');
    itListsAllCurrencyOptions('To');
    itUpdatesTheValueAfterOnChange('To');
  });
});
