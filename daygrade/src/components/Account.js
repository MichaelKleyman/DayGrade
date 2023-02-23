import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { editUser } from '../store';
import { useDispatch } from 'react-redux';
import { useAuth } from '../context/Authcontext';

const Account = ({ userObject }) => {
  const { firstName, lastName, email, age, userName } = userObject;
  const { currentUser, updateEmail } = useAuth();
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    firstName,
    lastName,
    email,
    age,
    userName,
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setEdit(false);
      // if (accountInfo.email !== currentUser.email) {
      //   await updateEmail(accountInfo.email);
      //   dispatch(editUser(userObject.id, accountInfo));
      // }
      dispatch(editUser(userObject.id, accountInfo));
      // console.log(accountInfo);
    } catch (error) {
      console.log('>>>', error);
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
            Email:
          </label>
          <TextField
            inputProps={{ readOnly: !edit }}
            id='outlined-required'
            value={accountInfo.email}
            onChange={handleChange}
            name='email'
          />
        </div>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-6'>
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
        <div className='flex justify-start items-end'>
          {edit ? (
            <Button
              onClick={(e) => {
                handleSave(e);
              }}
            >
              Save
            </Button>
          ) : (
            <Button
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
