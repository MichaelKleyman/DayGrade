/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { FcCalendar, FcAbout } from 'react-icons/fc';
import Grader from './Grader';
import ScoreProcess from './ScoreProcess';
import { fetchScoreInfo, fetchLog } from '../store';
import PreviousGrade from './PreviousGrade';

export default function Temp() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dayjs());

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const tileSize = '70px';

  let usersLog = useSelector((state) => state.logReducer);
  let usersScoreArr = useSelector((state) => state.scoreReducer);
  let usersScoreObj = usersScoreArr[0];

  const changeDate = (curDate) => {
    return dispatch(fetchLog(user?.uid, curDate));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const unsubscribeLogger = dispatch(
      fetchLog(user.uid, date.format('dddd, MMMM D YYYY'))
    );
    const unsubscribeScore = dispatch(
      fetchScoreInfo(user.uid, date.format('dddd, MMMM D YYYY'))
    );
    return () => {
      unsubscribeLogger();
      unsubscribeScore();
    };
  }, [date]);

  const CustomPicker = styled(CalendarPicker)(({ theme }) => ({
    '&.MuiCalendarPicker-root': {
      width: '80%',
      maxHeight: '500px',
      height: '470px',
    },
    '& .MuiCalendarPicker-viewTransitionContainer': {
      '& .css-sf5t6v-PrivatePickersSlideTransition-root-MuiDayPicker-slideTransition':
        {
          minHeight: '350px',
          height: 'auto',
        },
      '& .css-qklzlb-MuiDayPicker-header': {
        '& .css-raiqh1-MuiTypography-root-MuiDayPicker-weekDayLabel': {
          height: '70px',
          width: tileSize,
          color: '#000',
        },
      },
    },
  }));

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!date) {
      return <PickersDay {...pickersDayProps} />;
    }

    return (
      <PickersDay
        {...pickersDayProps}
        disableMargin
        disableRipple
        sx={{
          width: tileSize,
          height: tileSize,
        }}
        id='calendar-dates'
      />
    );
  };

  return (
    <div className='w-full'>
      <div className='py-2 px-4 text-blue-500 tracking-wide flex justify-between'>
        <h1 className='flex items-center'>
          <FcAbout className='p-1' size={38} />
          Log throughout your day, and record the time. At the end of the day,
          click the check in button to submit your final grade for the day.
        </h1>
        <PreviousGrade
          usersScoreArr={usersScoreArr}
          usersScoreObj={usersScoreObj}
        />
      </div>
      <div className='grid md:grid-cols-2 gap-8 mx-auto py-2 px-4 m-6'>
        <div
          className='bg-white rounded-xl shadow-lg shadow-gray-400 h-full md:h-[70%]'
          id='calendar-background'
        >
          <Box textAlign='center'>
            <Box>
              <h1 className='text-4xl p-3 flex items-center justify-center'>
                <FcCalendar className='p-2' size={52} color={'blue'} />
                Calendar
              </h1>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomPicker
                  date={date}
                  onChange={(newDate) => {
                    setDate(newDate);
                    // changeDate(newDate.format('dddd, MMMM D YYYY'));
                    // changeWaterCount(newDate.format('dddd, MMMM D YYYY'));
                  }}
                  renderDay={renderWeekPickerDay}
                  showDaysOutsideCurrentMonth
                  disableFuture
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <div className='flex justify-between p-3'>
            <Button
              onClick={() => navigate('/')}
              variant='outlined'
              startIcon={<DeleteIcon />}
            >
              Cancel
            </Button>
            <Button
              disabled={usersScoreArr.length !== 0}
              variant='contained'
              onClick={handleClickOpen}
              endIcon={<SendIcon />}
            >
              Check In
            </Button>
          </div>
          <ScoreProcess
            open={open}
            handleClose={handleClose}
            date={date.format('dddd, MMMM D YYYY')}
          />
        </div>
        <div className='h-screen'>
          <Grader date={date} usersLog={usersLog} />
        </div>
      </div>
    </div>
  );
}
