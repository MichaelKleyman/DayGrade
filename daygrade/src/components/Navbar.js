import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Profile from './Profile';
import Button from '@mui/material/Button';
import { SlHome } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { reactSwitch } from '../App';
import { BsSun, BsFillMoonFill } from 'react-icons/bs';

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState(true);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate('/');
  };

  useEffect(() => {
    let curDate = new Date();
    let curHr = curDate.getHours();
    if (curHr < 18) {
      setMode(true);
    } else if (curHr > 18) {
      setMode(false);
    }
  }, []);

  const { currentUser, logout } = useAuth();

  const showNav = () => {
    setOpenNav(!openNav);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const switchMode = () => {
    setMode(!mode);
  };

  return (
    <div className=' bg-white shadow-xl w-full' id='navbar'>
      <div className='text-black flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 w-full'>
        <Link
          to='/'
          className='font-[Montserrat] uppercase tracking-widest text-xl md:text-4xl sm:text-2xl text-blue-600 px-3 py-3 w-full ml-10'
        >
          D a y g r a d e
        </Link>
        {!currentUser ? (
          <div className='w-[50%] md:w-[15%] sm:w-[55%] hover:border hover:border-blue-600 hover:rounded-xl flex items-center justify-center'>
            <ul className='flex'>
              <li className='text-2sm sm:text-lg p-4 tracking-widest uppercase hover:text-blue-600 duration-200 hover:scale-110'>
                <Link to='/login'>Log in</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <div className='flex items-center'>
              <ul className='hidden md:flex'>
                <li className='ml-10 uppercase duration-200 hover:scale-110 cursor-pointer text-2sm'>
                  {/* Home */}
                  <Button
                    style={{ color: 'black', fontSize: '1rem' }}
                    id='fade-button'
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <SlHome className='p-2' size={32} color={'blue'} />
                    Home
                  </Button>
                </li>
                <li className='ml-10 uppercase duration-200 hover:scale-110 cursor-pointer text-2sm'>
                  <Profile logout={handleLogout} />
                </li>
              </ul>
              <div className='md:hidden' onClick={showNav}>
                <AiOutlineMenu size={35} />
              </div>
              <div onClick={switchMode} className='flex items-center pl-6'>
                {reactSwitch()}
              </div>
              {mode ? (
                <div>
                  <BsSun size={45} className='p-3' />
                </div>
              ) : (
                <div>
                  <BsFillMoonFill size={45} className='p-3' />
                </div>
              )}
            </div>
            <div
              className={
                openNav
                  ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70'
                  : ''
              }
            >
              <div
                className={
                  openNav
                    ? 'md:hidden fixed left-0 top-0 w-[55%] sm:w-[55%] md:w-[45%] h-screen bg-[#FAF9F6] p-10 ease-in duration-500'
                    : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'
                }
              >
                {/*Opening and closing of the nav bar on mobile screen */}
                <div className='flex'>
                  <Link
                    to='/home'
                    className='font-[Montserrat] uppercase tracking-widest md:text-xl text-blue-600 py-3 w-full'
                  >
                    D a y g r a d e
                  </Link>
                  <div
                    className='cursor-pointer rounded-full shadow-lg shadow-gray-400 p-3 pb-0'
                    onClick={showNav}
                  >
                    <AiOutlineClose size={20} color='black' />
                  </div>
                </div>
                <div className='my-4 uppercase'>
                  <p>Menu</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
