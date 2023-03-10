import React, { useState, useEffect } from 'react';
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
import { MdDelete, MdLogout, MdLocalSee } from 'react-icons/md';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

const Settings = ({ userObject }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = userObject.userName || '';
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(null);
  const [user] = useAuthState(auth);
  const [image, setImage] = useState(null);
  const { currentUser, logout, upload } = useAuth();
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    //photoURL is initially null
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser, photoURL]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleClick = () => {
    upload(image, currentUser, setLoading);
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
      <div>
        <label className='uppercase tracking-widest text-lg' id='setting-text'>
          Daygrade settings page
        </label>
        <div id='settings' className='flex'>
          <div className='pt-5 grid grid-cols-3 gap-5'>
            <div>
              <div className='font-bold pb-2 text-3sm flex w-[180px]'>
                Erase Your Account
              </div>
              <Button
                onClick={handleClickOpen}
                sx={{ backgroundColor: 'green', color: 'white' }}
              >
                <MdDelete color='white' className='p-1' size={30} />
                Delete
              </Button>
            </div>
          </div>
          <div className='pt-5 grid grid-cols-3 gap-5'>
            <div>
              <div className='font-bold pb-2 text-3sm flex w-[110px]'>
                Log Out
              </div>
              <Button
                onClick={async () => {
                  await logout();
                  navigate('/');
                }}
                sx={{ backgroundColor: 'green', color: 'white' }}
              >
                <MdLogout color='white' className='p-1' size={30} />
                Logout
              </Button>
            </div>
          </div>
          <div className='pt-5 grid grid-cols-3 gap-5'>
            <div>
              <div className='font-bold pb-2 text-3sm flex w-[120px]'>
                Profile Picture
              </div>
              <div className='flex items-center'>
                {!photoURL.length ? (
                  <Avatar
                    sx={{
                      bgcolor: deepPurple[500],
                      width: 30,
                      height: 30,
                      fontSize: 13,
                      margin: '4px',
                    }}
                  >
                    {userName[0]}
                  </Avatar>
                ) : (
                  <img
                    src={photoURL}
                    alt='Avatar'
                    className='w-[93px] h-[93px] rounded-sm'
                  />
                )}
                <div>
                  <p className='text-[13px] text-gray-500 ml-2'>
                    (File has to be JPEG or PNG)
                  </p>
                  <input
                    type='file'
                    id='avatar'
                    name='avatar'
                    className='pl-2 cursor-pointer'
                    onChange={handleChange}
                  />
                  <Button disabled={loading || !image} onClick={handleClick}>
                    <MdLocalSee color='blue' className='p-1' size={30} />
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
