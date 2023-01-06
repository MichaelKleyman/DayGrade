import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineClose, AiOutlineMenu, AiOutlineMail } from 'react-icons/ai';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState('#FAF9F6');
  const [linkColor, setLinkColor] = useState('#1f2937');
  const router = useRouter();
  const myLogo = '<Mike />';

  const openNav = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    if (
      router.asPath === '/cryptosearch' ||
      router.asPath === '/fsatravel' ||
      router.asPath === '/slice'
    ) {
      setNavBg('transparent');
      setLinkColor('#FAF9F6');
    } else {
      setNavBg('#FAF9F6');
      setLinkColor('#1f2937');
    }
  }, [router]);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener('scroll', handleShadow);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${navBg}` }}
      className={
        shadow
          ? 'fixed w-full h-20 shadow-xl z-[100]'
          : 'fixed w-full h-20 z-[100]'
      }
    >
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
        <Link href='/'>
          {/* <Image
            src='/../public/images/Logo.png'
            alt='logo'
            width='105'
            height='50'
            className='pb-9'
          /> */}
          <h1 className='text-blue-600'>{myLogo}</h1>
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className='hidden md:flex'>
            <Link href='/'>
              <li className='ml-10 text-sm uppercase duration-200 hover:scale-110'>
                Home
              </li>
            </Link>
            <Link href='/#about'>
              <li className='ml-10 text-sm uppercase duration-200 hover:scale-110'>
                About
              </li>
            </Link>
            <Link href='/#skills'>
              <li className='ml-10 text-sm uppercase duration-200 hover:scale-110'>
                Skills
              </li>
            </Link>
            <Link href='/#projects'>
              <li className='ml-10 text-sm uppercase duration-200 hover:scale-110'>
                Projects
              </li>
            </Link>
            <Link href='/#contact'>
              <li className='ml-10 text-sm uppercase duration-200 hover:scale-110'>
                Contact
              </li>
            </Link>
          </ul>
          <div className='md:hidden' onClick={openNav}>
            <AiOutlineMenu size={35} />
          </div>
        </div>
      </div>
      <div
        className={
          showNav
            ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70'
            : ''
        }
      >
        <div
          className={
            showNav
              ? 'md:hidden fixed left-0 top-0 w-[75%] sm:w-[65%] md:w-[45%] h-screen bg-[#FAF9F6] p-10 ease-in duration-500'
              : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'
          }
        >
          <div className='flex items-center justify-between'>
            <Link href='/'>
              <Image
                src='/../public/images/Logo.png'
                alt='logo'
                width='87'
                height='65'
              />
            </Link>
            <div
              onClick={openNav}
              className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer'
            >
              <AiOutlineClose />
            </div>
          </div>
          <div className='border-b border-gray-300 my-4'>
            <p className='w-[85%] md:w-[90%] py-4'>Explore my portfolio</p>
          </div>
          <div className='py-4 flex flex-col'>
            <ul className='uppercase'>
              <Link href='/'>
                <li onClick={() => setShowNav(false)} className='py-4 text-sm'>
                  Home
                </li>
              </Link>
              <Link href='/#about'>
                <li onClick={() => setShowNav(false)} className='py-4 text-sm'>
                  About
                </li>
              </Link>
              <Link href='/#skills'>
                <li onClick={() => setShowNav(false)} className='py-4 text-sm'>
                  Skills
                </li>
              </Link>
              <Link href='/#projects'>
                <li onClick={() => setShowNav(false)} className='py-4 text-sm'>
                  Projects
                </li>
              </Link>
              <Link href='/#contact'>
                <li onClick={() => setShowNav(false)} className='py-4 text-sm'>
                  Contact
                </li>
              </Link>
            </ul>
            <div className='pt-40'>
              <p className='uppercase tracking-widest text-[#5651e5]'>
                Lets Connect
              </p>
              <div className='flex items-center justify-between my-4 w-full '>
                <a
                  href='https://www.linkedin.com/in/michael-kleyman/'
                  target='_blank'
                  className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-300'
                >
                  <FaLinkedinIn size={30} />
                </a>
                <a
                  href='https://github.com/MichaelKleyman'
                  target='_blank'
                  className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-300'
                >
                  <FaGithub size={30} />
                </a>
                <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-300'>
                  <AiOutlineMail size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
