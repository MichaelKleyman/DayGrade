import React from 'react';
import { FcOk } from 'react-icons/fc';
import { Button } from '@mui/material';

const Hit = ({ hit }) => {
  return (
    <div className='shadow-lg shadow-gray-400 p-2 m-3 rounded-lg bg-white h-[90%] w-[85%] '>
      <header>
        <div className='text-lg font-bold p-2'>{hit.log}</div>
      </header>
      <div className='text-sm text-gray-500 p-2 flex items-center'>
        <FcOk size={35} className='p-2' />
        {hit.Date}
      </div>
      <div className='flex justify-end'>
        <Button
          variant='contained'
          color='success'
          sx={{ padding: '3px', fontSize: '12px' }}
          onClick={() => console.log(hit)}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default Hit;
