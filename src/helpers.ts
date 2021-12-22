export interface HistoricalData {
  name: string;
  high: number;
}

const convertStringToNumber = (string: string): number => {
  return parseFloat(string);
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleString('default', {
    month: 'short',
    day: 'numeric',
  });
};

const getHistoricalData = (apiReturn: any): HistoricalData[] => {
  const historicalData: HistoricalData[] = [];

  if (apiReturn) {
    Object.entries(apiReturn['Time Series FX (Daily)']).forEach(
      ([key, val]: any) => {
        historicalData.push({
          name: formatDate(key),
          high: convertStringToNumber(val['2. high']),
        });
      }
    );
  }
  return historicalData.slice(0, 30);
};

const getExchangeRateValue = (apiReturn: any): number => {
  if (apiReturn) {
    return apiReturn['Realtime Currency Exchange Rate']['5. Exchange Rate'];
  }

  return 0;
};

export { getHistoricalData, getExchangeRateValue };
