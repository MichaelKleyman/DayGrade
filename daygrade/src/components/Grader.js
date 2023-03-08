/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { CiLogin } from 'react-icons/ci';
import { createLog, deleteLog } from '../store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { AiFillDelete } from 'react-icons/ai';
import EditLog from './EditLog';
// import Water from './Water';
import Water from './Water';

const Grader = ({ date, usersLog }) => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [time, setTime] = useState(dayjs(new Date()));
  const [curLog, setLog] = useState('');
  const [error, setError] = useState(null);
  const [user, loading] = useAuthState(auth);
  const [id, setId] = useState(null);

  const dispatch = useDispatch();

  const handleIdCheck = (e, logId) => {
    e.preventDefault();
    setId(logId);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTime = (newValue) => {
    setTime(newValue);
  };

  const handleLog = (e) => {
    setLog(e.target.value);
  };

  const handleDelete = (logId) => {
    dispatch(deleteLog(logId));
  };

  const submitLog = () => {
    setLog('');
    if (curLog && time) {
      setError('');
      dispatch(
        createLog(
          time.format('h:mm A'),
          date.format('dddd, MMMM D YYYY'),
          curLog,
          user.uid
        )
      );
    } else {
      setError('Please complete all fields*');
    }
  };

  const halfwayPoint = Math.ceil(usersLog.length / 2);
  let arrayFirstHalf = usersLog.slice(0, halfwayPoint);
  let arraySecondHalf = usersLog.slice(halfwayPoint, usersLog.length);

  return (
    <div className='w-full'>
      <h1 className='text-lg font-bold' id='date'>
        {date.format('dddd, MMMM D YYYY')}
      </h1>
      <div className='grid grid-cols-2 gap-8'>
        <div className='py-5' id='time-setter'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <TimePicker
                id='time'
                label='Time'
                value={time}
                onChange={handleTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <Water date={date.format('dddd, MMMM D YYYY')} />
        </div>
        <div className='py-5'>
          <textarea
            className='p-2 rounded-lg w-[100%]'
            autoFocus
            placeholder='What have you done...'
            rows='4'
            cols='40'
            value={curLog}
            onChange={handleLog}
          />
          <div className='flex justify-end pr-4 pt-2'>
            <div>
              {error ? (
                <div className='text-red-500 text-sm mr-7'>{error}</div>
              ) : (
                ''
              )}
            </div>
            <Button
              onClick={submitLog}
              variant='contained'
              endIcon={<CiLogin color='white' />}
            >
              Log
            </Button>
          </div>
        </div>
      </div>
      {usersLog.length ? (
        <div
          className='border border-gray-200 bg-[#F3F0E8] rounded-lg shadow-lg shadow-gray-800 p-3 grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-4 h-[570px] overflow-y-auto'
          id='logs'
        >
          {arrayFirstHalf.map((usersLogInfo, i) => (
            <div
              key={usersLogInfo.id}
              className='w-full shadow-lg shadow-gray-400 rounded-xl h-[210px] overflow-y-auto'
              id='log1'
            >
              <h1 className='font-bold mx-2 my-3 py-2 flex justify-between'>
                <p>{usersLogInfo.log}</p>
                <div className='p-2 m-1'>
                  <EditLog
                    usersLogInfo={usersLogInfo}
                    open={open}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    handleIdCheck={handleIdCheck}
                    id={id}
                  />

                  <div
                    className='grid grid-cols-2'
                    onClick={() => {
                      handleDelete(usersLogInfo.id);
                    }}
                  >
                    <AiFillDelete
                      size={25}
                      className='duration-300 hover:scale-110 hover:text-white cursor-pointer'
                    />
                  </div>
                </div>
              </h1>
              <h1 className='mx-4 py-2 text-sm text-gray-600'>
                {usersLogInfo.Time}
              </h1>
            </div>
          ))}
          {arraySecondHalf.map((usersLogInfo, i) => (
            <div
              key={usersLogInfo.id}
              className=' shadow-lg shadow-gray-400 rounded-xl h-[210px] overflow-y-auto'
              id='log2'
            >
              <h1 className='font-bold mx-4 my-2 py-2 flex justify-between '>
                <p>{usersLogInfo.log}</p>
                <div className='p-2 m-1'>
                  <EditLog
                    usersLogInfo={usersLogInfo}
                    open={open}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    handleIdCheck={handleIdCheck}
                    id={id}
                  />

                  <div
                    className='grid grid-cols-2'
                    onClick={() => {
                      handleDelete(usersLogInfo.id);
                    }}
                  >
                    <AiFillDelete
                      size={25}
                      className='duration-300 hover:scale-110 hover:text-white cursor-pointer'
                    />
                  </div>
                </div>
              </h1>
              <h1 className='mx-4 py-2 text-sm text-gray-600'>
                {usersLogInfo.Time}
              </h1>
            </div>
          ))}
        </div>
      ) : (
        <div
          className='flex items-center justify-center uppercase tracking-widest shadow-lg shadow-gray-400 rounded-xl p-5'
          id='no-logs'
        >
          <h1>No Logs</h1>
        </div>
      )}
    </div>
  );
};

export default Grader;
