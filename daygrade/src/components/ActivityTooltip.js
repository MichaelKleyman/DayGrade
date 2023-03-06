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
            The streak will be responsible for{' '}
            <span className='text-blue-600'>
              consistently tracking your check-ins.
            </span>{' '}
            If you miss a day, the{' '}
            <span className='text-blue-600'>streak resets to zero</span>.
            <span className='text-blue-600'> The to-do list</span> is a
            scratchpad for any task you need to get done for the day.{' '}
            <span className='text-blue-600'>Once the next day comes</span>,
            everything in the current list gets deleted.
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
