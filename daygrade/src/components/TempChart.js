import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [1, 2, 3, 4, 5],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5',
//     },
//   ],
// };

// const options = {
//   indexAxis: 'x',
//   elements: {
//     bar: {
//       borderWidth: 2,
//     },
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'left',
//     },
//     title: {
//       display: true,
//       text: 'Grade Chart',
//     },
//   },
// };

const TempChart = () => {
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Grade History',
        data: [1, 2, 3, 4, 5, 6, 7],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5',
      },
    ],
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
      },
      title: {
        display: true,
        text: 'Grade Chart',
      },
    },
  });

  return (
    <div className='w-full'>
      <Bar data={data} />
    </div>
  );
};

export default TempChart;
