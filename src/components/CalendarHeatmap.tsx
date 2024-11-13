import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import heatmapData from '../json/heatmatpData.json';

type HeatmapDataType = {
  date: string;
  value: number;
  details: string;
  market: number;
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

const CalendarContainer = styled.div`
  background-color: black;
  padding: 20px;
  border-radius: 8px;
  color: #ffffff;
  width: 100%;
  max-width: 800px;

  .react-calendar {
    width: 100%;
    background-color: black;
    border: none;
  }

  .react-calendar__navigation button {
    color: #ffffff;
  }

  .react-calendar__navigation button:disabled {
    background-color: black;
  }

  .react-calendar__tile {
    border: 1px solid #333;
    color: #ffffff;
    position: relative;
    border-radius: 8px;  
    height: 70px; 

    &:hover {
      background-color: #333333;
    }
  }

  .color-scale-1 {
    background-color: #b3e876 !important;
  }

  .color-scale-2 {
    background-color: #7bad42!important;
  }

  .color-scale-3 {
    background-color:#42700c !important;
  }

  .color-scale-4 {
    background-color: #203b02 !important;
  }
`;

const Tooltip = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 100;
  pointer-events: none;
  transform: translate(-50%, -120%);
`;

const CalendarHeatmapComponent: React.FC = () => {
  const [tooltip, setTooltip] = useState<{ content: string; position: { top: number; left: number } } | null>(null);

  const handleMouseOver = (event: React.MouseEvent, date: Date) => {
    const eventDataItem = heatmapData.find((event) => event.date === date.toISOString().split('T')[0]);
    const content = eventDataItem ? eventDataItem.details : 'No data';

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      content,
      position: {
        top: rect.top + window.scrollY + 2,
        left: rect.left + window.scrollX + rect.width / 2,
      },
    });
  };

  const handleMouseOut = () => setTooltip(null);

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const event = heatmapData.find((event) => event.date === date.toISOString().split('T')[0]);
      if (event) {
        if (event.value >= 15) return 'color-scale-4';
        if (event.value >= 10 && event.value < 15) return 'color-scale-3';
        if (event.value >= 5 && event.value < 10) return 'color-scale-2';
        if (event.value > 0 && event.value < 5) return 'color-scale-1';
      }
    }
    return null;
  };

  return (
    <PageContainer>
      <CalendarContainer>
        <Calendar
          locale="en-US"
          tileClassName={tileClassName}
          tileContent={({ date, view }) =>
            view === 'month' ? (
              <div
                onMouseOver={(e) => handleMouseOver(e, date)}
                onMouseOut={handleMouseOut}
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute', 
                    top: 0,
                    left: 0,
                  }}              
              />
            ) : null
          }
          minDetail="month"
          maxDetail='month'
          defaultActiveStartDate={new Date('2024-11-01')}
        />
        {tooltip && (
          <Tooltip style={{ top: tooltip.position.top, left: tooltip.position.left }}>
            {tooltip.content}
          </Tooltip>
        )}
      </CalendarContainer>
    </PageContainer>
  );
};

export default CalendarHeatmapComponent;
