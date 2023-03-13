import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { editUser } from '../store';
import { useDispatch } from 'react-redux';

const Account = ({ userObject }) => {
  const { firstName, lastName, age, userName } = userObject;
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    firstName,
    lastName,
    age,
    userName,
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setEdit(false);
      dispatch(editUser(userObject.id, accountInfo));
    } catch (error) {
      console.log('Edit user error', error);
    }
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleChange = (e) => {
    setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='grid grid-cols-1 gap-3 md:gap-2 place-content-center'>
          <label className={`p-2 font-bold ${edit ? 'text-blue-600' : ''}`}>
            First Name:
          </label>
          <TextField
            inputProps={{ readOnly: !edit }}
            required
            id='outlined-required'
            value={accountInfo.firstName}
            onChange={handleChange}
            name='firstName'
          />
        </div>
        <div className='grid grid-cols-1 gap-3 md:gap-2 place-content-center'>
          <label className={`p-2 font-bold ${edit ? 'text-blue-600' : ''}`}>
            Last Name:
          </label>
          <TextField
            inputProps={{ readOnly: !edit }}
            id='outlined-required'
            value={accountInfo.lastName}
            onChange={handleChange}
            name='lastName'
          />
        </div>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='grid grid-cols-1 gap-3 md:gap-2 place-content-center'>
          <label className={`p-2 font-bold ${edit ? 'text-blue-600' : ''}`}>
            Username:
          </label>
          <TextField
            inputProps={{ readOnly: !edit }}
            id='outlined-required'
            value={accountInfo.userName}
            onChange={handleChange}
            name='userName'
          />
        </div>
        <div className='grid grid-cols-1 gap-3 md:gap-2 place-content-center'>
          <label className={`p-2 font-bold ${edit ? 'text-blue-600' : ''}`}>
            Age:
          </label>
          <TextField
            inputProps={{ readOnly: !edit }}
            id='outlined-required'
            value={accountInfo.age}
            onChange={handleChange}
            name='age'
          />
        </div>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex justify-start items-end p-4'>
          {edit ? (
            <Button
              sx={{ backgroundColor: 'blue', color: 'white' }}
              onClick={(e) => {
                handleSave(e);
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              sx={{ backgroundColor: 'green', color: 'white' }}
              onClick={() => {
                handleEdit();
              }}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
