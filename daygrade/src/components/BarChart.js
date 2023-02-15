/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const labels = [
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
// ];

// const BarChart = () => {

//   const [chartData, setData] = useState({
//     labels,
//     datasets: [
//       {
//         label: 'Your Grade',
//         data: [1, 2, 3, 4, 5],
//         backgroundColor: '#8A8AFF',
//       },
//     ],
//     options: {
//       responsive: true,
//       scales: {
//         x: {
//           type: 'time',
//           time: {
//             unit: 'day',
//           },
//         },
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });

//   return (
//     <div>
//       <Bar data={chartData} />
//     </div>
//   );
// };

// export default BarChart;

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
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
  // console.log(Date.parse('2023-02-11'));

  const [chartData, setData] = useState({
    // labels: [
    //   'Sunday',
    //   'Monday',
    //   'Tuesday',
    //   'Wednesday',
    //   'Thursday',
    //   'Friday',
    //   'Saturday',
    // ],
    datasets: [
      {
        label: 'Your Grade',
        // data: gradeData.map((data) => data.grade),
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
    </div>
  );
};

export default BarChart;
