import React from 'react';
import HomepageImg from '../images/Daygradepic.png';
import { useAuth } from '../context/Authcontext';
import UserDashboard from './UserDashboard';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {!currentUser ? (
        <div>
          <div className='w-full flex items-center py-16 px-4 h-[760px] md:h-[640px]'>
            <div className='p-8 max-w-[1240px] sm:mt-[5px] md:mt-[30px] mt-[10px] mx-auto md:grid grid-cols-3 gap-8'>
              <div className='md:w-[400px] sm:w-[200px] m-auto p-4 flex items-center justify-center ease-in duration-300 hover:scale-110'>
                <img
                  className='w-[800px] mx-auto my-4'
                  src={HomepageImg}
                  alt='homeimg'
                />
              </div>
              <div className='col-span-2 p-6 sm:ml-5 ml-2' id='home'>
                <h1 className='py-2 font-bold tracking-widest md:text-5xl sm:text-4xl text-3xl md:py-6 sm:w-3/4 md:w-4/5 w-11/12'>
                  Make your day as efficient as possible, everyday
                </h1>
                <p className='font-thin tracking-widest md:text-2xl sm:text-xl text-lg sm:w-3/4 md:w-4/5 w-11/12'>
                  Optimize and evolve overtime by grading your day, and tracking
                  your habits and routine.
                </p>
              </div>
            </div>
          </div>
          <div className='w-full flex items-center justify-center pb-6 sm:mt-[9rem] md:mt-[12rem] mt-[2rem] tracking-widest font-thin' id='credit'>
            <footer>Inspired by Rob Dyrdek</footer>
          </div>
        </div>
      ) : (
        <UserDashboard />
      )}
    </div>
  );
};

export default Home;
