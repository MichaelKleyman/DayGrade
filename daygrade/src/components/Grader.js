/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { CiLogin } from 'react-icons/ci';
import { MdModeEditOutline } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { createLog, deleteLog } from '../store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Grader = ({ date, usersLog }) => {
  const [time, setTime] = useState(dayjs(new Date()));
  const [curLog, setLog] = useState('');
  const [error, setError] = useState(null);
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

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
          user?.uid
        )
      );
    } else {
      setError('Please complete all fields');
    }
  };

  return (
    <div className='w-full'>
      <h1 className='text-lg font-bold'>{date.format('dddd, MMMM D YYYY')}</h1>
      <div className='grid grid-cols-2 gap-8'>
        <div className='py-5 '>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <TimePicker
                label='Time'
                value={time}
                onChange={handleTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div className='py-5'>
          <textarea
            className='p-2 rounded-lg'
            autoFocus
            placeholder='What have you done...'
            rows='4'
            cols='40'
            value={curLog}
            name='log'
            onChange={handleLog}
          />
          <div className='flex justify-end pr-4 pt-2'>
            <div>
              {' '}
              {error ? (
                <div className='text-red-500 text-sm mr-7'>
                  Please complete all fields*
                </div>
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
      <div>
        <div>
          {usersLog.map((usersLogInfo, i) => (
            <div
              key={i}
              className='bg-gradient-to-r from-cyan-200 to-blue-400 shadow-lg shadow-gray-400 rounded-xl'
            >
              <h1 className='font-bold mx-4 my-4 py-4 flex justify-between'>
                {usersLogInfo.log}
                <div className='grid grid-cols-2 gap-2'>
                  <MdModeEditOutline
                    size={25}
                    className='duration-300 hover:scale-110 hover:text-white cursor-pointer'
                  />
                  <AiFillDelete
                    onClick={() => handleDelete(usersLogInfo.id)}
                    size={25}
                    className='duration-300 hover:scale-110 hover:text-white cursor-pointer'
                  />
                </div>
              </h1>
              <h1 className='mx-4 py-2 text-sm text-gray-600'>
                {usersLogInfo.Time}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grader;
