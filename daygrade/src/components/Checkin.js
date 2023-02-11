import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

const Checkin = () => {
  const [value, setValue] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 16]);

  const navigate = useNavigate();

  return (
    <div className='w-full'>
      <div className='grid md:grid-cols-2 gap-8 mx-auto py-2 px-4 m-6'>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              orientation='portrait'
              openTo='day'
              value={value}
              disableFuture
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              renderDay={(day, _value, DayComponentProps) => {
                const isSelected =
                  !DayComponentProps.outsideCurrentMonth &&
                  highlightedDays.indexOf(day.date()) >= 0;

                return (
                  <Badge
                    key={day.toString()}
                    overlap='circular'
                    badgeContent={isSelected ? '🌚' : undefined}
                  >
                    <PickersDay {...DayComponentProps} />
                  </Badge>
                );
              }}
            />
          </LocalizationProvider>
          <div className='flex justify-between p-3'>
            <Button
              onClick={() => navigate('/')}
              variant='outlined'
              startIcon={<DeleteIcon />}
            >
              Cancel
            </Button>
            <Button variant='contained' endIcon={<SendIcon />}>
              Check In
            </Button>
          </div>
        </div>
        <div>
          <h1>Stuff</h1>
        </div>
      </div>
    </div>
  );
};

export default Checkin;
