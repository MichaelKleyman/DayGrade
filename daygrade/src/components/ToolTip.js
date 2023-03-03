import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FcInfo } from 'react-icons/fc';
import { GiWaterDrop } from 'react-icons/gi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ToolTip = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className='duration-300 hover:scale-110'
        onClick={handleClickOpen}
      >
        <FcInfo size={20} />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>
          <div className='text-blue-600'>What is this?</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            component={'div'}
            id='alert-dialog-slide-description'
          >
            <div className='flex'>
              <p className='ml-[5rem] flex items-center justify-center'>
                <GiWaterDrop color='blue' size={40} />
              </p>
              <p className='ml-[6rem] '>
                Drinking water daily is crucial for good health. Even mild
                dehydration can cause problems, so it's important to make it a
                habit to stay hydrated.{' '}
                <span className='text-blue-600'>
                  Track your daily water intake everyday
                </span>
                , whether you're drinking cups of water or bottles.
              </p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ToolTip;
