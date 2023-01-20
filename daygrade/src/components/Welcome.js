import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backgroundpic from '../images/Authpic.png';

const Welcome = () => {
  return (
    <div className='grid grid-cols-1 h-screen w-full bg-black/80'>
      <img
        className='absolute w-full h-full object-cover mix-blend-overlay'
        src={Backgroundpic}
        alt='background'
      />
      <div className='flex flex-col justify-center z-[2]'>
        <div className='max-w-[400px] w-full mx-auto bg-white rounded-xl shadow-xl p-5 h-[60%] flex flex-col items-center justify-center'>
          <h2 className='text-3xl font-bold text-center py-4'>
            Welcome! Lets get you signed up.
          </h2>

          <Link to='/signup' className='flex justify-center py-7 w-full'>
            <Button variant='contained' className='py-3 w-full'>
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
