import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const EditLog = ({
  usersLogInfo,
  open,
  handleClickOpen,
  handleClose,
  handleIdCheck,
  id,
}) => {
  const [editedLog, setEditedLog] = useState(usersLogInfo.log);

  const handleChange = (e) => {
    setEditedLog(e.target.value);
  };

  const submitEdit = async (e, logId) => {
    e.preventDefault();
    const docRef = doc(db, 'Logger', logId);
    await updateDoc(docRef, {
      log: editedLog,
    });
    handleClose();
  };

  return (
    <div>
      <div
        className='grid grid-cols-2'
        onClick={(e) => {
          console.log(usersLogInfo);
          handleClickOpen();
          handleIdCheck(e, usersLogInfo.id);
        }}
      >
        <MdModeEditOutline
          size={25}
          color='black'
          className='duration-300 hover:scale-110 hover:text-white cursor-pointer'
        />
      </div>
      <Dialog open={open && id === usersLogInfo.id} onClose={handleClose}>
        <DialogTitle>Need to change up your log?</DialogTitle>
        <DialogContent>
          <DialogContentText className='p-3'>
            Enter your updated log and click submit when finished.
          </DialogContentText>
          <textarea
            className='p-2 rounded-lg'
            autoFocus={true}
            placeholder='What have you done...'
            rows='5'
            cols='47'
            value={editedLog}
            onChange={handleChange}
            variant='outline'
            style={{ border: '1px solid blue', padding: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              submitEdit(e, usersLogInfo.id);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* {open && id === usersLogInfo.id && (
        <form onSubmit={(e) => submitEdit(e, usersLogInfo.id)}>
          <input type='text' value={editedLog} onChange={handleChange} />
          <button type='submit'>Submit</button>
        </form>
      )} */}
    </div>
  );
};

export default EditLog;
