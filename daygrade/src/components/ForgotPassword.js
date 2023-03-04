import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backgroundpic from '../images/Authpic.png';
import { useAuth } from '../context/Authcontext';
import { FaCheck } from 'react-icons/fa';

const ForgotPassword = () => {
  //   const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const { resetPassword, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setEmailError('Please enter a valid email');
        return;
      } else {
        await resetPassword(email);
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
        }, 1500);
      }
    } catch (error) {
      setEmailError('Failed to reset the password');
      console.log('>>>', error);
    }
  };

  return (
    <div className='grid grid-cols-1 h-screen w-full bg-black/80' id='forgot'>
      <img
        className='absolute w-full h-full object-cover mix-blend-overlay'
        src={Backgroundpic}
        alt='background'
      />
      <div className='flex flex-col justify-center z-[2]'>
        <form
          id='forgot-password-form'
          className='max-w-[400px] w-full mx-auto bg-white rounded-xl shadow-xl p-5'
        >
          <h2 id='fp-text' className='text-3xl font-bold text-center py-4'>
            Forgot Password
          </h2>

          <div className='flex flex-col py-4'>
            <TextField
              id='outlined-password-input'
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='current-email'
            />
            {emailError && (
              <div className='w-full text-rose-500 pb-3 flex items-center justify-center'>
                {emailError}
              </div>
            )}
          </div>
          <div className='grid grid-cols-1 gap-5 pt-4 pb-4'>
            {emailSent ? (
              <Button sx={{ color: 'green' }}>
                <FaCheck className='mr-4 p-1' size={35} />
                Check Email
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                variant='contained'
                className='py-3 w-full'
              >
                Reset Password
              </Button>
            )}
            {/* // <Button
            //   onClick={handleSubmit}
            //   variant='contained'
            //   className='py-3 w-full'
            // >
            //   Reset Password
            // </Button> */}
          </div>
        </form>
        <div className='flex justify-center p-4 text-sm text-gray-300'>
          <p>
            Not a member yet?{' '}
            <Link to='/welcome' className='text-blue-400 hover:underline'>
              Sign up now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
