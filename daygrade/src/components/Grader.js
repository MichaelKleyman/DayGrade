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
import { MdOutlineLocalDrink, MdLocalDrink } from 'react-icons/md';
import { TbBottle } from 'react-icons/tb';

const Grader = ({
  date,
  usersLog,
  setWaterCount,
  waterCount,
  usersScoreObj,
  usersScoreArr,
  type,
  setType,
}) => {
  const [open, setOpen] = useState(false);
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

  const handleType = (clickedType) => {
    setType(clickedType);
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

  // useEffect(() => {
  //   setType('Cup');
  // }, [date]);

  const drankWater = (i) => {
    if (usersScoreArr.length) {
      let clickedCups = usersScoreObj.waterCount.map((cup, index) => {
        if (i === index) {
          cup.drank = !cup.drank;
          return cup;
        } else {
          return cup;
        }
      });
      setWaterCount(clickedCups);
    } else {
      let clickedCups = waterCount.map((cup, index) => {
        if (i === index) {
          cup.drank = !cup.drank;
          return cup;
        } else {
          return cup;
        }
      });
      setWaterCount(clickedCups);
    }
  };

  const halfwayPoint = Math.ceil(usersLog.length / 2);
  let arrayFirstHalf = usersLog.slice(0, halfwayPoint);
  let arraySecondHalf = usersLog.slice(halfwayPoint, usersLog.length);

  return (
    <div className='w-full'>
      <h1 className='text-lg font-bold'>{date.format('dddd, MMMM D YYYY')}</h1>
      <div className='grid grid-cols-2 gap-8'>
        <div className='py-5'>
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
          <div className='mt-9'>
            <h1 className='uppercase tracking-widest pb-2 text-blue-500 font-bold'>
              water
            </h1>
            <h1 className='pb-3 text-sm'>
              <span
                onClick={() => handleType('Cup')}
                className={`hover:text-blue-700 duration-300 hover:scale-110 cursor-pointer hover:font-bold ${
                  type === 'Cup' ? 'text-blue-600 italic' : ''
                }`}
              >
                Cup
              </span>{' '}
              or{' '}
              <span
                onClick={() => handleType('Bottle')}
                className={`hover:text-blue-700 duration-300 hover:scale-110 cursor-pointer hover:font-bold ${
                  type === 'Bottle' ? 'text-blue-600 italic' : ''
                }`}
              >
                Bottle
              </span>
            </h1>
            <div>
              {usersScoreArr.length ? (
                <div className='flex justify-between'>
                  {usersScoreObj.waterCount.map((obj, i) => (
                    <div key={i} onClick={() => drankWater(i)}>
                      {obj.drank ? (
                        type === 'Cup' ? (
                          <MdLocalDrink
                            color='blue'
                            size={33}
                            className='cursor-pointer duration-300 hover:scale-110'
                          />
                        ) : (
                          <TbBottle
                            color='blue'
                            size={33}
                            className='cursor-pointer duration-300 hover:scale-110'
                          />
                        )
                      ) : type === 'Cup' ? (
                        <MdOutlineLocalDrink
                          size={33}
                          className='cursor-pointer duration-300 hover:scale-110'
                        />
                      ) : (
                        <TbBottle
                          size={33}
                          className='cursor-pointer duration-300 hover:scale-110'
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className='flex justify-between'>
                  {waterCount.map((obj, i) => (
                    <div key={i} onClick={() => drankWater(i)}>
                      {obj.drank ? (
                        type === 'Cup' ? (
                          <MdLocalDrink
                            color='blue'
                            size={33}
                            className='cursor-pointer duration-300 hover:scale-110'
                          />
                        ) : (
                          <TbBottle
                            color='blue'
                            size={33}
                            className='cursor-pointer duration-300 hover:scale-110'
                          />
                        )
                      ) : type === 'Cup' ? (
                        <MdOutlineLocalDrink
                          size={33}
                          className='cursor-pointer duration-300 hover:scale-110'
                        />
                      ) : (
                        <TbBottle
                          size={33}
                          className='cursor-pointer duration-300 hover:scale-110'
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='py-5'>
          <textarea
            className='p-2 rounded-lg'
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
      <div className='grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-4'>
        {arrayFirstHalf.map((usersLogInfo, i) => (
          <div
            key={usersLogInfo.id}
            className='w-full bg-gradient-to-r from-cyan-200 to-blue-400 shadow-lg shadow-gray-400 rounded-xl'
          >
            <h1 className='font-bold mx-2 my-3 py-4 flex justify-between'>
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
            className='bg-gradient-to-r from-cyan-200 to-blue-400 shadow-lg shadow-gray-400 rounded-xl'
          >
            <h1 className='font-bold mx-4 my-3 py-4 flex justify-between '>
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
      {!usersLog.length && (
        <div className='flex items-center justify-center uppercase tracking-widest shadow-lg shadow-gray-400 rounded-xl p-5'>
          <h1>No Logs</h1>
        </div>
      )}
    </div>
  );
};

export default Grader;
