/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../store';
import { useParams } from 'react-router-dom';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FcCalendar } from 'react-icons/fc';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

export default function PreviousAgendas() {
  const [date, setDate] = useState(dayjs());

  const usersTodos = useSelector((state) => state.todosReducer);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeTodos = dispatch(fetchTodos(id));
    return () => {
      unsubscribeTodos();
    };
  }, []);

  const CustomPicker = styled(CalendarPicker)(({ theme }) => ({
    '&.MuiCalendarPicker-root': {
      width: '80%',
      maxHeight: '600px !important',
      height: '470px',
      '@media (min-width: 280px)': {
        height: '390px',
      },
      '@media (min-width: 350px)': {
        height: '250px',
      },
      '@media (min-width: 585px)': {
        height: '420px',
      },
      '@media (min-width: 767px)': {
        height: '415px',
      },
      '@media (min-width: 867px)': {
        height: '415px',
      },
      '@media (min-width: 1020px)': {
        height: '410px',
      },
      '@media (min-width: 1155px)': {
        height: '450px',
      },
      // border: 'solid 1px black', //calendar itself
    },

    '& .MuiDayPicker-slideTransition': {
      minHeight: '350px !important',
      height: 'auto !important',
      // border: 'solid 1px black', //inner calendar
    },

    '& .MuiDayPicker-weekDayLabel': {
      height: '30px !important',
      width: '70px !important',
      color: 'blue !important',
      fontWeight: 'bolder !important',
      // border: 'solid 1px black', //days of the week
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
          width: '70px',
          height: '70px',
          color: 'black',
          fontWeight: 'bolder', //day numbers
        }}
        id='calendar-dates'
      />
    );
  };

  console.log(usersTodos);
  return (
    <div>
      <div className='grid md:grid-cols-2 gap-8 mx-auto py-2 px-4 m-6 md:h-screen'>
        <div
          className='bg-white rounded-xl shadow-lg shadow-gray-400 h-full md:h-[75%]'
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
                  }}
                  renderDay={renderWeekPickerDay}
                  showDaysOutsideCurrentMonth
                  disableFuture
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </div>
        <div className='md:border-l-2 md:border-gray-300 md:h-screen'>
          <div className='p-4'>fwenoiwe</div>
        </div>
      </div>
    </div>
  );
}
