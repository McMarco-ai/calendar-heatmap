import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import heatmapData from '../json/heatmatpData.json';
import styled from 'styled-components';

const ChartContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  width: 400px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const PriceText = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-right: 8px;
`;

const ChangeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #c6f6d5;
  color: #38a169;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
`;

const Legend = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 16px;
  gap: 16px;
  font-size: 14px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-weight: bold;

`;

const ColorDot = styled.span<{ color: string; }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 8px;
  background-color: ${({ color }) => color};
  border-radius: 50%;  
`;
type HeatmapDataType = {
  date: string;
  value: number;
  details: string;
  market: number;
};


const LineChartComponent: React.FC = () => {

  const [avgTicketPrice, setAvgTicketPrice] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [formattedData, setFormattedData] = useState<HeatmapDataType[]>([]);

  useEffect(() => {
    if (heatmapData && heatmapData.length > 0) {
      let totalValue = 0;
      for (let i = 0; i < heatmapData.length; i++) {
        totalValue += heatmapData[i].value;
      }
      const avgPrice = totalValue / heatmapData.length;
      setAvgTicketPrice(parseFloat(avgPrice.toFixed(0)));

      const firstValue = heatmapData[0].value;
      const lastValue = heatmapData[heatmapData.length - 1].value;
      const percentChange = ((lastValue - firstValue) / firstValue) * 100;
      setPercentageChange(parseFloat(percentChange.toFixed(0)));
    }

    const dataWithMonthNames = heatmapData.map((entry) => ({
      ...entry,
      date: formatMonth(entry.date),
    }));
    setFormattedData(dataWithMonthNames);
  }, []);


  const formatMonth = (dateStr: string): string => {
    const date = new Date(dateStr);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[date.getMonth()];
  };


  return (
    <ChartContainer>
      <Title>Avg. ticket price</Title>

      <Header>
        <PriceText>${avgTicketPrice}</PriceText>
        <ChangeBadge>
          {percentageChange >= 0 ? '↗' : '↘'} {Math.abs(percentageChange)}%
        </ChangeBadge>
      </Header>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={formattedData}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis hide />
          <Tooltip />
          <Line type="linear" dataKey="value" stroke="#4A4A4A" strokeWidth={2}  />
          <Line type="linear" dataKey="market" stroke="#BEBEBE" strokeWidth={2}  strokeDasharray="4 4" />
        </LineChart>
      </ResponsiveContainer>

      <Legend>
        <LegendItem>
          <ColorDot color="#4A4A4A" /> You
        </LegendItem>
        <LegendItem>
          <ColorDot color="#BEBEBE" /> Market
        </LegendItem>
      </Legend>
    </ChartContainer>
  );
};

export default LineChartComponent;
