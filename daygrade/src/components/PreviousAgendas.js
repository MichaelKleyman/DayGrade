/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, fetchSpecificTodos } from '../store';
import { useParams } from 'react-router-dom';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FcCalendar } from 'react-icons/fc';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import Select from 'react-select';
import Percentage from './Percentage';
import NothingFoundImg from '../images/nothingHere.png';

const filterOptions = [
  { value: 'Today', label: 'Today' },
  { value: 'Yesterday', label: 'Yesterday' },
  // { value: 'This Week', label: 'This Week' },
  // { value: 'This Month', label: 'This Month' },
];

export default function PreviousAgendas() {
  const [date, setDate] = useState(dayjs());
  const [filterOption, setFilterOption] = useState('');
  const usersTodos = useSelector((state) => state.todosReducer);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSelectChange = (option) => {
    console.log(option.value);
    setFilterOption(option.value);
  };

  useEffect(() => {
    if (filterOption === 'Today') {
      setDate(dayjs());
    } else if (filterOption === 'Yesterday') {
      const yesterdaysDate = dayjs().subtract(1, 'day');
      setDate(yesterdaysDate);
    }
    // console.log(new Date(date).toString().split(' ').splice(1, 3).join(' '));
    const unsubscribeSpecificTodos = dispatch(
      fetchSpecificTodos(
        id,
        new Date(date).toString().split(' ').splice(1, 3).join(' ')
      )
    );
    return () => {
      unsubscribeSpecificTodos();
    };
  }, [filterOption]);

  useEffect(() => {
    const unsubscribeSpecificTodos = dispatch(
      fetchSpecificTodos(
        id,
        new Date(date).toString().split(' ').splice(1, 3).join(' ')
      )
    );
    return () => {
      unsubscribeSpecificTodos();
    };
  }, [date]);

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

  return (
    <div id='previous-agendas'>
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
        <div className='md:border-l-2 md:border-gray-300 md:h-full'>
          <p className='pl-4 text-lg font-bold' id='date'>
            {date.format('dddd, MMMM D YYYY')}
          </p>
          <div className='p-4 grid grid-cols-2 gap-5'>
            <Select
              options={filterOptions}
              onChange={handleSelectChange}
              defaultValue={filterOptions[0]}
              className='w-[80%]'
            />
            <div className='flex items-center justify-center'>
              <Percentage todos={usersTodos} />
            </div>
          </div>
          <h1
            className='text-2xl pl-4 uppercase tracking-widest'
            id='agenda-header'
          >
            Previous Agendas
          </h1>
          <div className='sm:w-[20%] md:w-[60%]'>
            <div className='pl-4 flex justify-between'>
              <span className='text-[13px] text-gray-400'>Completed</span>
              <span className='text-[13px] text-gray-400'>Not Completed</span>
            </div>
            <div className='pl-4 flex'>
              <div className='w-[70%] bg-yellow-300 p-2'></div>
              <div className='w-[70%] bg-green-900 p-2'></div>
            </div>
          </div>
          <div className='p-4 grid md:grid-cols-2' id='specific-todos'>
            {usersTodos.length > 0 ? (
              usersTodos.map((obj, i) => (
                <div
                  key={i}
                  className='p-5 flex items-center shadow-lg shadow-gray-400 m-2 rounded-lg'
                >
                  <div
                    className={`${
                      obj.completed ? 'bg-yellow-300' : 'bg-green-900'
                    } w-[10px] h-[10px] rounded-sm`}
                  ></div>
                  <h1 className='ml-2'>{obj.todo}</h1>
                </div>
              ))
            ) : (
              <div className='grid grid-cols-1 place-items-center'>
                <p className='p-8 uppercase tracking-widest'>No Agendas</p>
                <img
                  src={NothingFoundImg}
                  alt='img'
                  width={400}
                  height={400}
                  className='shadow-lg shadow-gray-400 rounded-lg'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
