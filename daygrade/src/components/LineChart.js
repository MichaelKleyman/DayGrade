/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllScores } from '../store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const LineChart = () => {
  const [scores, setScores] = useState([]);
  const [data, setData] = useState({
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        data: [8, 5, 9, 6, 7, 8, 9],
        backgroundColor: 'transparent',
        borderColor: 'blue',
        pointBorderColor: 'white',
        pointBorderWidth: 4,
        tension: 0.5,
      },
    ],
  });

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 2,
        max: 10,
      },
    },
    responsive: true,
  };

  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const usersScores = useSelector((state) => state.scoreReducer);

  useEffect(() => {
    const unsubscribeScores = dispatch(fetchAllScores(user.uid));
    return () => {
      unsubscribeScores();
    };
  }, []);

  useEffect(() => {
    const fetchData = () => {
      let dataSet = [];
      let labels = [];
      const arr = usersScores || [];
      for (const obj of arr) {
        dataSet.push(obj.score);
        labels.push(obj.date);
      }
      setData({
        labels,
        datasets: [
          {
            data: dataSet,
            backgroundColor: 'transparent',
            borderColor: 'blue',
            pointBorderColor: 'white',
            pointBorderWidth: 4,
            tension: 0.5,
          },
        ],
      });
    };
    fetchData();
  }, []);

  return (
    <div className='w-[100%]'>
      <Line data={data} options={options} />
      {/* <button onClick={() => console.log(usersScores)}>click me</button> */}
    </div>
  );
};

export default LineChart;
