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
import { CgProfile } from 'react-icons/cg';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const Navbar = ({ theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState(true);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { currentUser, logout } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate('/');
  };

  const handleClickMenu = (text, anchor) => {
    if (text === 'Home') {
      navigate('/');
      // toggleDrawer(anchor, false);
    } else if (text === 'Profile') {
      navigate(`users/account/${currentUser.uid}`);
    }
  };

  useEffect(() => {
    let curDate = new Date();
    let curHr = curDate.getHours();
    if (curHr < 18) {
      setMode(true);
    } else if (curHr > 16) {
      setMode(false);
    }
  }, []);

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

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      id='navbar-popup'
      sx={{
        height: 920,
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
        paddingTop: '1rem',
        backgroundColor: `${theme === 'dark' ? '#282c35' : 'white'}`,
        color: `${theme === 'dark' ? 'white' : 'black'}`,
      }}
      role='presentation'
      // onKeyDown={toggleDrawer(anchor, false)}
      onClick={toggleDrawer(anchor, false)}
    >
      <Link
        to='/'
        className='m-4 font-[Montserrat] uppercase tracking-widest text-2xl md:text-xl text-blue-600 py-3 w-full'
      >
        D a y g r a d e
      </Link>
      <List>
        {['Home', 'Profile'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleClickMenu(text, anchor);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <SlHome className='p-2' size={35} color={'blue'} />
                ) : (
                  <CgProfile className='p-2' size={35} color={'blue'} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List></List>
      <Divider
        sx={{ backgroundColor: `${theme === 'dark' ? 'white' : 'blue'}` }}
      />
    </Box>
  );

  return (
    <div
      className={`h-15 shadow-xl w-full ${
        theme === 'dark' ? 'shadow-gray-900' : 'shadow-gray-400'
      }`}
      id='navbar'
    >
      <div className='text-black flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 w-full'>
        <Link
          to='/'
          id='daygrade'
          //text-xl sm:text-2xl md:text-3xl
          className='font-[Montserrat] uppercase tracking-widest  text-blue-600 px-3 py-3 w-full ml-10'
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
              <div className='md:hidden duration-300 hover:scale-110'>
                {['left'].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                      <AiOutlineMenu size={35} />
                    </Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
