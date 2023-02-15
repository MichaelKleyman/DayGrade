import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Account = ({ userObject }) => {
  const { firstName, lastName, email, age, userName } = userObject;
  return (
    <div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='grid grid-cols-1 gap-6 md:gap-2 place-content-center'>
          <label className='p-2 font-bold'>First Name:</label>
          <TextField
            inputProps={{ readOnly: true }}
            required
            id='outlined-required'
            value={firstName}
          />
        </div>
        <div className='grid grid-cols-1 gap-6 md:gap-2 place-content-center'>
          <label className='p-2 font-bold'>Last Name:</label>
          <TextField
            inputProps={{ readOnly: true }}
            id='outlined-required'
            value={lastName}
          />
        </div>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='grid grid-cols-1 gap-6 md:gap-2 place-content-center'>
          <label className='p-2 font-bold'>Username:</label>
          <TextField
            inputProps={{ readOnly: true }}
            id='outlined-required'
            value={userName}
          />
        </div>
        <div className='grid grid-cols-1 gap-6 md:gap-2 place-content-center'>
          <label className='p-2 font-bold'>Email:</label>
          <TextField
            inputProps={{ readOnly: true }}
            id='outlined-required'
            value={email}
          />
        </div>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='grid grid-cols-1 gap-6 md:gap-2 place-content-center'>
          <label className='p-2 font-bold'>Age:</label>
          <TextField
            inputProps={{ readOnly: true }}
            id='outlined-required'
            value={age}
          />
        </div>
        <Button>Edit</Button>
      </div>
    </div>
  );
};

export default Account;
