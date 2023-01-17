import React from 'react';
import { Link } from 'react-scroll/modules';
import Image from 'next/image';

const About = () => {
  return (
    <div id='about' className='w-full md:h-screen flex items-center py-16'>
      <div className='p-8 max-w-[1240px] m-auto md:grid grid-cols-3 gap-8'>
        <div className='col-span-2'>
          <p className='uppercase text-xl tracking-widest text-blue-600'>
            About
          </p>
          <h2 className='py-4'>Who Am I</h2>
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
          <Link
            to='projects'
            activeClass='active'
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className='py-2 underline cursor-pointer hover:text-blue-600 italic'
          >
            Check out some of my projects
          </Link>
        </div>
        <div className='w-full h-auto m-auto p-4 rounded-2xl shadow-lg shadow-gray-400 flex items-center justify-center ease-in duration-300 hover:scale-110'>
          <Image
            src='/../public/images/Profilepic.png'
            alt='profile'
            width='387'
            height='65'
            className='rounded-xl'
          />
        </div>
      </div>
    </div>
  );
};

export default About;
