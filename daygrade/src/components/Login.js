import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backgroundpic from '../images/Authpic.png';
import { useAuth } from '../context/Authcontext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggingIn, setLoggingIn] = useState(true);

  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (!password) {
      setPasswordError('Please enter a valid password');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Minimum 6 character password required');
      return;
    }
    if (isLoggingIn) {
      try {
        await login(email, password);
      } catch (error) {
        setError('Incorrect email or password');
      }
    }
  };

  return (
    <div className='grid grid-cols-1 h-screen w-full bg-black/80' id='login'>
      <img
        className='absolute w-full h-full object-cover mix-blend-overlay'
        src={Backgroundpic}
        alt='background'
      />
      <div className='flex flex-col justify-center z-[2]'>
        <form id='login-form' className='max-w-[400px] w-full mx-auto bg-white rounded-xl shadow-xl p-5'>
          <h2 className='text-3xl font-bold text-center py-4'>User Login</h2>

          <div className='flex flex-col py-4'>
            <TextField
              id='outlined-email-input'
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

          <div className='flex flex-col py-4'>
            <TextField
              id='outlined-password-input'
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
            />
            {passwordError && (
              <div className='w-full text-rose-500 pb-3 flex items-center justify-center'>
                {passwordError}
              </div>
            )}
          </div>
          <div className='grid grid-cols-1 gap-5 pt-4'>
            <Button
              onClick={handleSubmit}
              variant='contained'
              className='py-3 w-full'
            >
              Log In
            </Button>
            <Link
              to='/forgot-password'
              className='text-center text-sm text-blue-400 hover:underline cursor-pointer'
            >
              Forgot Password?
            </Link>
          </div>
          {error && (
            <div className='w-full text-rose-500 pb-3 flex items-center justify-center'>
              {error}
            </div>
          )}
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

export default Login;
