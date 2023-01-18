import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiOutlineClose, AiOutlineMenu, AiOutlineMail } from 'react-icons/ai';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Link } from 'react-scroll/modules';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState('#FAF9F6');
  const [linkColor, setLinkColor] = useState('#1f2937');
  const router = useRouter();

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
        <Link
          to='home'
          activeClass='active'
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          <Image
            src={'/../public/images/Logo.png'}
            alt='logo'
            width='105'
            height='50'
            className='pt-2'
          />
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className='hidden md:flex'>
            <Link
              to='home'
              activeClass='active'
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <li className='ml-10 text-sm uppercase duration-200 hover:scale-110'>
                Home
              </li>
            </Link>
            <Link
              to='about'
              activeClass='active'
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <li className='ml-10 text-sm uppercase duration-200 hover:scale-110'>
                About
              </li>
            </Link>
            <Link
              to='skills'
              activeClass='active'
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <li className='ml-10 text-sm uppercase duration-200 hover:scale-110'>
                Skills
              </li>
            </Link>
            <Link
              to='projects'
              activeClass='active'
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <li className='ml-10 text-sm uppercase duration-200 hover:scale-110'>
                Projects
              </li>
            </Link>
            <Link
              to='contact'
              activeClass='active'
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <li className='ml-10 text-sm uppercase duration-200 hover:scale-110'>
                Contact
              </li>
            </Link>
            <li>Example</li>
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
            <Link
              to='home'
              activeClass='active'
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
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
              <Link
                to='home'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                <li onClick={() => setShowNav(false)} className='py-4 text-sm'>
                  Home
                </li>
              </Link>
              <Link
                to='about'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                <li onClick={() => setShowNav(false)} className='py-4 text-sm'>
                  About
                </li>
              </Link>
              <Link
                to='skills'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                <li onClick={() => setShowNav(false)} className='py-4 text-sm'>
                  Skills
                </li>
              </Link>
              <Link
                to='projects'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                <li onClick={() => setShowNav(false)} className='py-4 text-sm'>
                  Projects
                </li>
              </Link>
              <Link
                to='contact'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
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
                  rel='noreferrer'
                  className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-300'
                >
                  <FaLinkedinIn size={30} />
                </a>
                <a
                  href='https://github.com/MichaelKleyman'
                  target='_blank'
                  rel='noreferrer'
                  className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-300'
                >
                  <FaGithub size={30} />
                </a>
                <Link
                  className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-300'
                  to='contact'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                >
                  <AiOutlineMail size={30} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
