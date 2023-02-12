/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { gradeData } from './data';
import { Chart as ChartJS } from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllScores } from '../store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const BarChart = () => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const usersScores = useSelector((state) => state.scoreReducer);

  useEffect(() => {
    const unsubscribeScores = dispatch(fetchAllScores(user.uid));
    return () => {
      unsubscribeScores();
    };
  }, []);
  console.log(Date.parse('2023-02-11'));

  const day = [
    { x: new Date('2023-02-11'), y: 8 },
    { x: new Date('2023-02-12'), y: 9 },
    { x: new Date('2023-02-13'), y: 10 },
    { x: new Date('2023-02-14'), y: 6 },
    { x: new Date('2023-02-15'), y: 8 },
    { x: new Date('2023-02-16'), y: 9 },
    { x: new Date('2023-02-17'), y: 9 },
  ];

  const [chartData, setData] = useState({
    // labels: usersScores.length && usersScores.map((data) => data.date),
    datasets: [
      {
        label: 'Your Grade',
        // data: usersScores.length && usersScores.map((data) => data.score),
        data: gradeData,
        backgroundColor: '#8A8AFF',
      },
    ],
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  return (
    <div>
      <Bar data={chartData} />
      <button onClick={() => console.log(usersScores)}>click me</button>
    </div>
  );
};

export default BarChart;
