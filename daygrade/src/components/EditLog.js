import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { editLog } from '../store';
import { useDispatch } from 'react-redux';
import { MdModeEditOutline } from 'react-icons/md';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EditLog = ({ open, handleClose, usersLogInfo, handleClickOpen }) => {
  const [editedLog, setEditedLog] = useState(usersLogInfo);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const fieldName = e.target.getAttribute('name');
    const newUsersLogInfo = { ...editedLog };
    newUsersLogInfo[fieldName] = e.target.value;
    setEditedLog(newUsersLogInfo);
  };

  const handleEdit = async (logId, newLog) => {
    // dispatch(editLog(usersLogInfo.id, editedLog));
    const docRef = doc(db, 'Logger', logId);
    await updateDoc(docRef, {
      log: newLog,
    });
    // console.log(usersLogInfo);
  };

  return (
    <div>
      <MdModeEditOutline
        onClick={handleClickOpen}
        size={25}
        className='duration-300 hover:scale-110 hover:text-white cursor-pointer'
      />
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
            value={editedLog.log}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              handleEdit(usersLogInfo.id, editedLog.log);
              //   console.log(usersLogInfo);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditLog;
