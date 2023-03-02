import React, { useState } from 'react';
import { Button } from '@mui/material';
import { deleteUserAccount } from '../store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/Authcontext';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, deleteUser } from 'firebase/auth';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Settings = ({ userObject }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(null);
  const [user, loading] = useAuthState(auth);
  const Auth = getAuth();
  const User = auth.currentUser;
  const { logout } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAccount = async () => {
    if (check) {
      await logout();
      dispatch(deleteUserAccount(user.uid, userObject.id));
      await deleteUser(user)
        .then(() => {
          console.log('User deleted');
        })
        .catch((error) => {
          console.error(error);
        });
      navigate('/');
    } else {
      setError('*Check the box to erase your account');
    }
  };

  return (
    <div className='m-2'>
      <label className='uppercase tracking-widest text-lg' id='setting-text'>
        Daygrade settings page
      </label>
      <div className='pt-5 grid grid-cols-3 gap-5'>
        <div>
          <div className='font-bold pb-2'>Erase Your Account</div>
          <Button
            onClick={handleClickOpen}
            sx={{ backgroundColor: 'green', color: 'white' }}
          >
            Delete
          </Button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        id='settings'
      >
        <DialogTitle id='alert-dialog-title'>
          Are you sure you want to erase your account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            By agreeing to erase your account,{' '}
            <span className='text-red-500'>
              all information will be deleted
            </span>
            , including all logs, final scores/checkins, progress and goals. By{' '}
            <span className='text-red-500'>checking the box</span> and{' '}
            <span className='text-red-500'>clicking confirm</span>,{' '}
            <span className='text-red-500'>you're agreeing to this action</span>{' '}
            and permanently losing all the data.
          </DialogContentText>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={check ? true : false} />}
              label='I want to erase my account.'
              onClick={() => {
                setCheck(!check);
                setError(null);
              }}
            />
          </FormGroup>
          {error && (
            <div className='text-sm w-full text-rose-500 pb-3 flex items-center'>
              {error}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'red' }}>
            Cancel
          </Button>
          <Button onClick={deleteAccount} autoFocus sx={{ color: 'red' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
