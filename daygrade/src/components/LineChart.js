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
import { fetchAllScores, fetchSpecificScores } from '../store';
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
import dayjs from 'dayjs';
import LineChartModal from './LineChartModal';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
  const [showAll, setShowAll] = useState(true);
  const [scoreObj, setScoreObj] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
  const specificScores = useSelector((state) => state.specificScoreReducer);

  useEffect(() => {
    const unsubscribeScores = dispatch(fetchAllScores(user.uid));
    return () => {
      unsubscribeScores();
    };
  }, []);

  useEffect(() => {
    // const usersScoreArr = usersScores || [];
    // const usersScoreArr = specificScores || [];
    const usersScoreArr = showAll ? usersScores || [] : specificScores || [];
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
  }, [specificScores, usersScores, showAll]);

  const filterData = (startDate, endDate) => {
    // const startDate = dayjs(document.getElementById('startDate').value).format(
    //   'dddd, MMMM D YYYY'
    // );
    // const endDate = dayjs(document.getElementById('endDate').value).format(
    //   'dddd, MMMM D YYYY'
    // );
    setShowAll(false);
    const unsubscribeSpecificScores = dispatch(
      fetchSpecificScores(startDate, endDate, user.uid)
    );
    return () => {
      unsubscribeSpecificScores();
    };
  };
  const handleStart = (newVal) => {
    let d = dayjs(newVal.$d);
    setStartDate(d.format('dddd, MMMM D YYYY'));
  };

  const handleEnd = (newVal) => {
    let d = dayjs(newVal.$d);
    setEndDate(d.format('dddd, MMMM D YYYY'));
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div className='w-[100%]'>
      <div className='grid grid-cols-4 gap-4'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id='startDate'
            label='Start Date'
            value={startDate}
            onChange={(newDate) => {
              handleStart(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id='endDate'
            label='End Date'
            value={endDate}
            onChange={(newDate) => {
              handleEnd(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button onClick={() => filterData(startDate, endDate)}>Search</Button>
        <Button onClick={handleShowAll}>Show all</Button>
      </div>
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
        <LineChartModal scoreObj={scoreObj} />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LineChart;
