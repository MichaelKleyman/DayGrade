import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { editLog } from '../store';
import { useDispatch } from 'react-redux';

const EditLog = ({ open, handleClose, currentLog, logId }) => {
  const [editedLog, setEditedLog] = useState(currentLog);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEditedLog(e.target.value);
  };

  const handleEdit = () => {
    dispatch(editLog(logId, editedLog));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Need to change up your log?</DialogTitle>
        <DialogContent>
          <DialogContentText className='p-3'>
            Enter your updated log and click submit when finished.
          </DialogContentText>
          <textarea
            style={{ border: 'solid 1px blue' }}
            className='p-2 rounded-lg'
            autoFocus
            placeholder='What have you done...'
            rows='5'
            cols='47'
            name='log'
            // value={editedLog}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              handleEdit();
            }}
          >
            Submit
          </Button>
          {/* <button
            onClick={() => {
              console.log(logId);
            }}
          >
            Click me
          </button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditLog;
