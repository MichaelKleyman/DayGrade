import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cryptoSearchImg from '../public/projects/cryptocoinsearch.jpeg';
import { FaReact, FaTools, FaBootstrap } from 'react-icons/fa';
import { MdApi } from 'react-icons/md';
import { SiMaterialui, SiJavascript } from 'react-icons/Si';
import { BiBarChartSquare } from 'react-icons/bi';
import { IoLogoPwa } from 'react-icons/io5';

const cryptosearch = () => {
  return (
    <div className='w-full'>
      <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
        <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/30 z-10' />
        <Image
          className='absolute z-1'
          layout='fill'
          objectFit='cover'
          //objectFit maintains the aspect ratio, so it all fits together nicely.
          src={cryptoSearchImg}
          alt='image'
        />
        <div className='absolute top-[70%] left-[50%] right-[50%] max-w-[1240px] w-full translate-x-[-50%] translate-y-[-50%] text-white z-10'>
          <h2 className='py-2 tracking-widest'>Cryptogram</h2>
          <h3 className='tracking-widest uppercase text-sm md:text-lg'>
            ReactJS / Bootstrap / Zustand state management
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
            Cryptogram is a simple cryptocurrency search app, where you can see
            the details of any crypto currency that is on the market today.
            Using a precise API from coin gecko, Crpyotgram is able to fetch
            realtime market data for any coin such as trending coins, the
            current price of those coins, as well as their market cap rank, 24h
            highs and lows, their circulating supply, and more. Cryptogram also
            allows users to search for coins to find information, and provides a
            line chart to display the coin prices for the last 7 days.
            Cryptogram is a Progressive Web Application available on desktop and
            mobile devices like Android and IOS.
          </p>
          <a
            href='https://youtu.be/QaxDCXzGmZU'
            target='_blank'
            rel='noreferrer'
          >
            <button className='px-8 py-2 mt-4 mr-8'>Demo</button>
          </a>
          <a
            href='https://github.com/MichaelKleyman/Crypto-coin-search-/tree/main/stackathon'
            target='_blank'
            rel='noreferrer'
          >
            <button className='px-8 py-2 mt-4 mr-8'>Code</button>
          </a>
          <a
            href='https://cryptocoinsearch.netlify.app/'
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
                <IoLogoPwa color='blue' className='pr-1' /> PWA
              </p>
              <p className='flex items-center py-2'>
                <SiJavascript color='blue' className='pr-1' /> Javascript
              </p>
              <p className='flex items-center py-2'>
                <FaReact color='blue' className='pr-1' /> React
              </p>
              <p className='flex items-center py-2'>
                <MdApi color='blue' className='pr-1' /> Coin Gecko API
              </p>
              <p className='flex items-center py-2'>
                <FaTools color='blue' className='pr-1' /> Zustand SM
              </p>
              <p className='flex items-center py-2'>
                <FaBootstrap color='blue' className='pr-1' /> Bootstrap
              </p>
              <p className='flex items-center py-2'>
                <SiMaterialui color='blue' className='pr-1' /> Material UI
              </p>
              <p className='flex items-center py-2'>
                <BiBarChartSquare color='blue' className='pr-1' /> Recharts
              </p>
            </div>
          </div>
        </div>
        <Link href='/#projects'>
          <p className='underline cursor-pointer hover:text-blue-600'>
            Go back
          </p>
        </Link>
      </div>
    </div>
  );
};

export default cryptosearch;
