import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { getHistoricalData, HistoricalData } from './helpers';
import { ChartWrapper } from './StyledComponents';

interface ChartProps {
  currencies: {
    from: string;
    to: string;
  };
}

export const Chart: React.FC<ChartProps> = ({ currencies }: ChartProps) => {
  const [historicalData, setHistoricalData] =
    React.useState<HistoricalData[]>();

  React.useEffect(() => {
    const { from, to } = currencies;
    if (from && to) {
      const fetchHistoricalData = async () => {
        const result = await window.fetch(
          `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${from}&to_symbol=${to}&apikey=1R5D4TP5IQQ2N4IV`,
          {
            method: 'GET',
            credentials: 'same-origin',
          }
        );

        const apiResponse = await result.json();
        setHistoricalData(getHistoricalData(apiResponse));
      };

      fetchHistoricalData();
    }
  }, [currencies]);

  if (historicalData) {
    return (
      <ChartWrapper>
        <ResponsiveContainer width={'100%'} height={600}>
          <LineChart
            data={historicalData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis dataKey='high' />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='high' stroke='#8884d8' />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  } else return null;
};
