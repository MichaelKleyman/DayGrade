import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import fsaTravelImg from '../public/projects/FSAtravel.jpeg';
import { FaReact, FaNode, FaStripe } from 'react-icons/fa';
import { MdApi } from 'react-icons/md';
import {
  SiJavascript,
  SiExpress,
  SiRedux,
  SiSequelize,
  SiJsonwebtokens,
} from 'react-icons/Si';

const fsatravel = () => {
  const demoLoading = () => {
    window.alert('Demo will be uploaded soon!');
  };

  return (
    <div className='w-full'>
      <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
        <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/50 z-10' />
        <Image
          className='absolute z-1'
          layout='fill'
          objectFit='cover'
          //objectFit maintains the aspect ratio, so it all fits together nicely.
          src={fsaTravelImg}
          alt='image'
        />
        <div className='absolute top-[70%] left-[50%] right-[50%] max-w-[1240px] w-full translate-x-[-50%] translate-y-[-50%] text-white z-10'>
          <h2 className='py-2 tracking-widest'>FSA Travel Booking</h2>
          <h3 className='tracking-widest uppercase text-sm md:text-lg'>
            ReactJS / Redux / PostgreSQL / Express
          </h3>
        </div>
      </div>
      <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4 p-3'>
          <p className='text-blue-600 tracking-widest uppercase text-xl pb-3'>
            Project
          </p>
          <h2 className='pb-4'>Overview</h2>
          <p>
            FSA Travel is a flight booking application, where users can browse
            the prices of one-way flights to any airport within the United
            States, as well as add flights to their cart and purchase them as
            long as they are a logged in user. This application is an e-commerce
            based site, with proper authentication, cart functionality,
            stripe/checkout functionality, admin functionality, pagination, and
            prioritizes the user experience. With the help of a third-party API
            and an airport data CSV file, users can search for any airport in
            the U.S. by city name or the airports IATA code, which then provides
            the list of available flights, allowing users to add flights to cart
            and go ahead to checkout.
          </p>
          <a href='/' target='_blank' rel='noreferrer'>
            <button className='px-8 py-2 mt-4 mr-8' onClick={demoLoading}>
              Demo
            </button>
          </a>
          <a
            href='https://github.com/FSA-Travel-Agency/FSA-TRAVEL'
            target='_blank'
            rel='noreferrer'
          >
            <button className='px-8 py-2 mt-4 mr-8'>Code</button>
          </a>
          <a
            href='https://fsatravel.onrender.com/home'
            target='_blank'
            rel='noreferrer'
          >
            <button className='px-8 py-2 mt-4'>Website</button>
          </a>
        </div>
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4'>
          <div className='p-2'>
            <p className='text-center font-bold pb-2'>Technologies</p>
            <div className='grid grid-cols-3 md:grid-cols-1'>
              <p className='flex items-center py-2'>
                <SiExpress color='blue' className='pr-1' /> ExpressJS
              </p>
              <p className='flex items-center py-2'>
                <SiJavascript color='blue' className='pr-1' /> Javascript
              </p>
              <p className='flex items-center py-2'>
                <FaReact color='blue' className='pr-1' /> React
              </p>
              <p className='flex items-center py-2'>
                <MdApi color='blue' className='pr-1' /> Travel API
              </p>
              <p className='flex items-center py-2'>
                <SiRedux color='blue' className='pr-1' /> Redux
              </p>
              <p className='flex items-center py-2'>
                <SiSequelize color='blue' className='pr-1' /> Sequelize
              </p>
              <p className='flex items-center py-2'>
                <FaNode color='blue' className='pr-1' size={30} /> NodeJS
              </p>
              <p className='flex items-center py-2'>
                <FaStripe color='blue' className='pr-1' size={30} /> Stripe
              </p>
              <p className='flex items-center py-2'>
                <SiJsonwebtokens color='blue' className='pr-1' /> JWT
              </p>
            </div>
          </div>
        </div>
        <Link href='/#projects'>
          <p className='underline cursor-pointer hover:text-blue-600 pb-5'>
            Go back
          </p>
        </Link>
      </div>
    </div>
  );
};

export default fsatravel;
