/* eslint-disable no-lone-blocks */
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
import { createLog, deleteLog } from '../store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { AiFillDelete } from 'react-icons/ai';
import EditLog from './EditLog';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Grader = ({ date, usersLog }) => {
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

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDots = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDots = () => {
    setAnchorEl(null);
  };

  const halfwayPoint = Math.ceil(usersLog.length / 2);
  let arrayFirstHalf = usersLog.slice(0, halfwayPoint);
  let arraySecondHalf = usersLog.slice(halfwayPoint, usersLog.length);

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
      {/* <div className='grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-4'>
        {arrayFirstHalf.map((usersLogInfo, i) => (
          <div
            key={usersLogInfo.id}
            className='bg-gradient-to-r from-cyan-200 to-blue-400 shadow-lg shadow-gray-400 rounded-xl'
          >
            <h1 className='font-bold mx-2 my-3 py-4 flex justify-between'>
              <p>{usersLogInfo.log}</p>
              <div>
                <IconButton
                  aria-label='more'
                  id='long-button'
                  aria-controls={openDots ? 'long-menu' : undefined}
                  aria-expanded={openDots ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id='long-menu'
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={openDots}
                  onClose={handleCloseDots}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  <MenuItem>
                    <EditLog
                      usersLogInfo={usersLogInfo}
                      open={open}
                      handleClickOpen={handleClickOpen}
                      handleClose={handleClose}
                      handleIdCheck={handleIdCheck}
                      id={id}
                      handleCloseDots={handleCloseDots}
                    />
                  </MenuItem>
                  <MenuItem>
                    <div
                      className='grid grid-cols-2'
                      onClick={() => {
                        handleDelete(usersLogInfo.id);
                        handleCloseDots();
                      }}
                    >
                      <AiFillDelete
                        size={25}
                        className='duration-300 hover:scale-110 hover:text-white cursor-pointer'
                      />
                      <p>Delete</p>
                    </div>
                  </MenuItem>
                </Menu>
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
              <div>
                <IconButton
                  aria-label='more'
                  id='long-button'
                  aria-controls={openDots ? 'long-menu' : undefined}
                  aria-expanded={openDots ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id='long-menu'
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={openDots}
                  onClose={handleCloseDots}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  <MenuItem>
                    <EditLog
                      usersLogInfo={usersLogInfo}
                      open={open}
                      handleClickOpen={handleClickOpen}
                      handleClose={handleClose}
                      handleIdCheck={handleIdCheck}
                      id={id}
                      handleCloseDots={handleCloseDots}
                    />
                  </MenuItem>
                  <MenuItem>
                    <div
                      className='grid grid-cols-2'
                      onClick={() => {
                        handleDelete(usersLogInfo.id);
                        handleCloseDots();
                      }}
                    >
                      <AiFillDelete
                        size={25}
                        className='duration-300 hover:scale-110 hover:text-white cursor-pointer'
                      />
                      <p>Delete</p>
                    </div>
                  </MenuItem>
                </Menu>
              </div>
            </h1>
            <h1 className='mx-4 py-2 text-sm text-gray-600'>
              {usersLogInfo.Time}
            </h1>
          </div>
        ))}
      </div> */}
      <div>
        {usersLog.map((usersLogInfo, i) => (
          <div
            key={usersLogInfo.id}
            className='bg-gradient-to-r from-cyan-200 to-blue-400 shadow-lg shadow-gray-400 rounded-xl'
          >
            <h1 className='font-bold mx-4 my-3 py-4 flex justify-between '>
              <p>{usersLogInfo.log}</p>
              <div>
                <IconButton
                  aria-label='more'
                  id='long-button'
                  aria-controls={openDots ? 'long-menu' : undefined}
                  aria-expanded={openDots ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id='long-menu'
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={openDots}
                  onClose={handleCloseDots}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  <MenuItem>
                    <EditLog
                      usersLogInfo={usersLogInfo}
                      open={open}
                      handleClickOpen={handleClickOpen}
                      handleClose={handleClose}
                      handleIdCheck={handleIdCheck}
                      id={id}
                      handleCloseDots={handleCloseDots}
                    />
                  </MenuItem>
                  <MenuItem>
                    <div
                      className='grid grid-cols-2'
                      onClick={() => {
                        handleDelete(usersLogInfo.id);
                        handleCloseDots();
                      }}
                    >
                      <AiFillDelete
                        size={25}
                        className='duration-300 hover:scale-110 hover:text-white cursor-pointer'
                      />
                      <p>Delete</p>
                    </div>
                  </MenuItem>
                </Menu>
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

{
  /* {arrayFirstHalf.map((usersLogInfo, i) => (
            <div
              key={i}
              className='bg-gradient-to-r from-cyan-200 to-blue-400 shadow-lg shadow-gray-400 rounded-xl'
            >
              <h1 className='font-bold mx-4 my-3 py-4 flex justify-between'>
                {usersLogInfo.log}
                <div className='grid grid-cols-2 gap-2'>
                  <MdModeEditOutline
                    onClick={handleClickOpen}
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
              {open && (
                <EditLog
                  open={open}
                  handleClose={handleClose}
                  currentLog={usersLogInfo.log}
                  logId={usersLogInfo.id}
                />
              )}
            </div>
          ))}
          {arraySecondHalf.map((usersLogInfo, i) => (
            <div
              key={i}
              className='bg-gradient-to-r from-cyan-200 to-blue-400 shadow-lg shadow-gray-400 rounded-xl'
            >
              <h1 className='font-bold mx-4 my-3 py-4 flex justify-between'>
                {usersLogInfo.log}
                <div className='grid grid-cols-2 gap-2'>
                  <MdModeEditOutline
                    onClick={handleClickOpen}
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
              {open && (
                <EditLog
                  open={open}
                  handleClose={handleClose}
                  currentLog={usersLogInfo.log}
                  logId={usersLogInfo.id}
                />
              )}
            </div>
          ))}
        </div>
        {!usersLog.length && (
          <div className='flex items-center justify-center uppercase tracking-widest shadow-lg shadow-gray-400 rounded-xl p-5'>
            <h1>No Logs</h1>
          </div>
        )} */
}
