import React from 'react';

const About = () => {
  return (
    <div id='about' className='w-full md:h-screen flex items-center py-16'>
      <div className='p-8 max-w-[1240px] m-auto md:grid grid-cols-3 gap-8'>
        <div className='col-span-2'>
          <p className='uppercase text-xl tracking-widest text-blue-600'>
            About
          </p>
          <h2 className='py-4'>Who I Am</h2>
          <p className='py-2'>
            I originally come from a healthcare background with a Bachelors
            degree from CUNY Hunter College, pursuing a career in sports
            Physical Therapy. My transition into tech was driven by lack of
            opportunity and drive in my previous field, and making this switch
            allowed me to grow and challenge myself in many ways. I started
            learning Python to grasp core concepts and data structures while
            working on minor projects. Eventually I transitioned into
            Javascript, HTML, and CSS to expand my knowledge on web development.{' '}
          </p>
          <p className='py-2'>
            Being fascinated by the intricacy and power of programming and
            building out projects, I decided to push myself more and enroll into
            an immersive fullstack web development bootcamp with{' '}
            <span className='text-blue-600'>Fullstack Academy. </span>This
            allowed me to dive deep into the frontend side and backend side of
            applications, and most importantly teaching me how to properly learn
            frameworks and programming tools in order to apply them to complex
            projects.{' '}
          </p>
          <p className='py-2 underline cursor-pointer'>
            Check out some of my projects
          </p>
        </div>
        <div className='w-full h-auto m-auto p-4 rounded-2xl shadow-lg shadow-gray-400 flex items-center justify-center ease-in duration-300 hover:scale-110'>
          <img
            src='https://media.licdn.com/dms/image/D4E03AQHm1e4eXLfiKA/profile-displayphoto-shrink_400_400/0/1672656661360?e=1678320000&v=beta&t=82KidYMT4TKH9f2FEAFoqbPCd0xLRQfkJlFtuezhPcM'
            alt='profile'
            className='rounded-xl'
          />
        </div>
      </div>
    </div>
  );
};

export default About;
