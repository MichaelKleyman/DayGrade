import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchUser } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 140,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function Profile({ logout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userObject = useSelector((state) => state.loggedInUser);
  const userName = userObject.userName || '';

  useEffect(() => {
    const unsubscribeUser = dispatch(fetchUser(user.uid));
    return () => {
      unsubscribeUser();
    };
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        style={{ color: 'black', fontSize: '1rem' }}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <CgProfile className='p-2' size={32} color={'blue'} />
        Profile
      </Button>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('users/account');
          }}
        >
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: 24,
              height: 24,
              fontSize: 10,
              margin: '4px',
            }}
          >
            {userName[0]}
          </Avatar>
          My account
        </MenuItem>
        <MenuItem onClick={logout}>
          <FiLogOut className='p-2' size={35} />
          Logout
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
