/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Line, getElementsAtEvent } from 'react-chartjs-2';
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

function PaperComponent(props) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const LineChart = () => {
  const [open, setOpen] = useState(false);
  const [scoreObj, setScoreObj] = useState({});
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chartRef = useRef();

  const handleClick = (e) => {
    if (getElementsAtEvent(chartRef.current, e).length) {
      handleClickOpen();
      const dataPoint = getElementsAtEvent(chartRef.current, e)[0].index;
      const selectedScore = usersScores.filter(
        (obj) =>
          obj.date.split(' ').slice(0, 3).join(' ') === data.labels[dataPoint]
      );
      setScoreObj(selectedScore[0]);
    }
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
    const usersScoreArr = usersScores || [];
    const fetchData = () => {
      let dataSet = [];
      let labels = [];
      for (const obj of usersScoreArr) {
        dataSet.push(obj.score);
        labels.push(obj.date.split(' ').slice(0, 3).join(' '));
      }
      setData({
        labels,
        datasets: [
          {
            data: dataSet,
            backgroundColor: 'transparent',
            borderColor: 'blue',
            pointBorderColor: 'black',
            pointBorderWidth: 4,
            tension: 0.5,
          },
        ],
      });
    };
    fetchData();
  }, [usersScores]);

  return (
    <div className='w-[100%]'>
      <Line
        data={data}
        options={options}
        onClick={handleClick}
        ref={chartRef}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Submitted grade for {scoreObj.date}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Look back and learn from previous grades. See why you gave yourself
            that score, and apply it to today.
          </DialogContentText>
        </DialogContent>
        <div className='m-5 px-[1rem]'>
          <div>
            <div>
              <h1 className='text-lg font-bold'>Reasons</h1>
              <div className='p-4 flex justify-between w-full overflow-x-scroll'>
                {scoreObj.reasons &&
                  scoreObj.reasons.map((obj) => {
                    if (obj.clicked === true) {
                      return (
                        <span
                          key={obj.id}
                          className='rounded-xl shadow-lg shadow-gray-400 text-center w-56 p-3 cursor-pointer mx-3'
                        >
                          {obj.emoji} {obj.reason}
                        </span>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1 className='text-lg font-bold py-2'>Final Grade</h1>
              <div className='p-2 rounded-xl shadow-lg shadow-gray-400 text-center w-[40%] grid grid-cols-3 gap-8 place-items-center'>
                <div className='cursor-pointer'>{scoreObj.emoji}</div>
                <div className='cursor-pointer'>{scoreObj.description}</div>
                <div className='font-extrabold cursor-pointer'>
                  {scoreObj.score}
                </div>
              </div>
            </div>
            <div>
              <h1 className='text-lg font-bold py-3'>Notes</h1>
              <div>
                {scoreObj.finalNotes ? (
                  <p className='border border-blue-600 p-auto rounded-lg p-3'>
                    {scoreObj.finalNotes}
                  </p>
                ) : (
                  <p className='text-blue-600 uppercase tracking-widest text-center'>
                    No notes found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LineChart;
