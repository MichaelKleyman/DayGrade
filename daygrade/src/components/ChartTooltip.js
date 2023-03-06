import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FcInfo } from 'react-icons/fc';

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
      <div
        className='duration-300 hover:scale-110 animate-bounce cursor-pointer'
        onClick={handleClickOpen}
        role='button'
      >
        <FcInfo className='p-2' size={35} />
      </div>
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
            This line chart is{' '}
            <span className='text-blue-600'>
              visually displaying your daily scores over time.
            </span>
            By default, only three days in a row will be displayed, however{' '}
            <span className='text-blue-600'>by filtering specific dates,</span>{' '}
            you can see your previous scores from any period in time.{' '}
            <span className='text-blue-600'>
              By clicking on a dot on the chart,
            </span>{' '}
            you can see your summary written on that day, which includes the
            reasons for your score, and the notes taken on that day.
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
