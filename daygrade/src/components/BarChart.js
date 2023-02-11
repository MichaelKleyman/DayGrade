import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { gradeData } from './data';
import { Chart as ChartJS } from 'chart.js/auto';
import { useSelector } from 'react-redux';

const BarChart = () => {
  const [chartData, setData] = useState({
    labels: gradeData.map((data) => data.day),
    datasets: [
      {
        label: 'Your Grade',
        data: gradeData.map((data) => data.grade),
        backgroundColor: '#8A8AFF',
      },
    ],
  });

  return <Bar data={chartData} />;
};

export default BarChart;
