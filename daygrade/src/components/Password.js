import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Password = () => {
  return (
    <div>
      <label className='p-2 font-bold'>Reset Password</label>
      <div className='grid sm:grid-cols-1 md:grid-cols-1 gap-2 w-full md:w-[45%]'>
        <div className='grid grid-cols-1 gap-3 md:gap-0 place-content-center p-6'>
          {/* <label className='p-2 font-bold'>Old password:</label> */}
          <TextField id='outlined-required' label='Old password' />
        </div>
        <div className='grid grid-cols-1 gap-3 md:gap-0 place-content-center p-6'>
          {/* <label className='p-2 font-bold'>New password:</label> */}
          <TextField id='outlined-required' label='New password' />
        </div>
      </div>
    </div>
  );
};

export default Password;
