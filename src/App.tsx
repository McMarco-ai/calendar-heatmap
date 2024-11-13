import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeatMapPage from './pages/heatMapPage';
import LinearChartPage from './pages/linearChartPage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f4f6f8;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 24px;
  font-size: 28px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 20px;
  margin: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Select the component you wish to view</Title>
      <ButtonContainer>
        <Button onClick={() => navigate('/linear')}>Go to Linear Chart Page</Button>
        <Button onClick={() => navigate('/heatmap')}>Go to Heat Map Page</Button>
      </ButtonContainer>
    </Container>
  );
};

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/linear" element={<LinearChartPage />} />
      <Route path="/heatmap" element={<HeatMapPage />} />
    </Routes>
  </Router>
);

export default App;
