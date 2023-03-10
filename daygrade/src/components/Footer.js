import { FaGithub } from 'react-icons/fa';
import {
  AiOutlineCopyright,
  AiFillLinkedin,
  AiOutlineMail,
} from 'react-icons/ai';
import React from 'react';

const Footer = () => {
  return (
    <div>
      <div id='footer' className='text-center'>
        <footer id='footer' className='text-center text-gray-500 text-[10px]'>
          Contact me <AiOutlineCopyright className='inline' /> 2023 Daygrade
        </footer>
      </div>
      <div id='links' className='flex items-center justify-center'>
        <a
          target='_blank'
          href='https://github.com/MichaelKleyman'
          className='duration-300 hover:scale-110 hover:text-blue-300'
          rel='noreferrer'
        >
          <FaGithub className='py-3 mb-2' size={50} />
        </a>
        <a
          target='_blank'
          href='https://www.linkedin.com/in/michael-kleyman/'
          className='duration-300 hover:scale-110 hover:text-blue-300'
          rel='noreferrer'
        >
          <AiFillLinkedin className='py-3 mb-2' size={50} />
        </a>
        <a
          target='_blank'
          href='https://michaelkleyman.vercel.app/'
          className='duration-300 hover:scale-110 hover:text-blue-300'
          rel='noreferrer'
        >
          <AiOutlineMail className='py-3 mb-2' size={50} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
