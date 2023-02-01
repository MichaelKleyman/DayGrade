import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';

const Checkin = () => {
  const [value, setValue] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 16]);

  return (
    <div>
      <div className='m-5 rounded-xl shadow-lg shadow-gray-500'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            orientation='portrait'
            openTo='day'
            value={value}
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
      </div>
    </div>
  );
};

export default Checkin;
