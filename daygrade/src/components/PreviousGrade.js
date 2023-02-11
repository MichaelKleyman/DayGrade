/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { deleteCheckIn } from '../store';
import { useDispatch } from 'react-redux';

function PaperComponent(props) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const PreviousGrade = ({ usersScoreArr, usersScoreObj }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteScore = (id) => {
    dispatch(deleteCheckIn(id));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleClickOpen}
        className='cursor-pointer duration-300 hover:scale-110 hover:bg-blue-500 hover:text-white bg-white rounded-lg m-4 p-4 shadow-lg shadow-gray-600 text-black font-bold uppercase tracking-wide text-center'
      >
        Grade
        {usersScoreArr.length ? (
          <div className='font-bold text-lg text-blue-600 text-center'>
            {usersScoreObj.score}
          </div>
        ) : (
          <Box className='text-center'>
            <CircularProgress size={25} />
          </Box>
        )}
      </div>
      {usersScoreArr.length !== 0 && (
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby='draggable-dialog-title'
        >
          <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
            Observe your submitted grade
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Look back and learn from previous grades. See why you gave
              yourself that score, and apply it to today.
            </DialogContentText>
          </DialogContent>
          <div className='m-5 px-[1rem]'>
            <div>
              <h1 className='text-lg font-bold'>Reasons</h1>
              <div className='p-4 flex justify-between w-full overflow-x-scroll'>
                {usersScoreObj !== undefined
                  ? usersScoreObj.reasons.map((obj) => {
                      if (obj.clicked === true) {
                        return (
                          <span
                            key={obj.id}
                            className='rounded-xl shadow-lg shadow-gray-400 text-center w-56 p-3 cursor-pointer mx-3'
                          >
                            {obj.emoji} {obj.reason}
                          </span>
                        );
                      }
                    })
                  : ''}
              </div>
            </div>
            {usersScoreObj !== undefined && (
              <div>
                <div>
                  <h1 className='text-lg font-bold py-2'>Final Grade</h1>
                  <div className='p-2 rounded-xl shadow-lg shadow-gray-400 text-center w-[40%] grid grid-cols-3 gap-8 place-items-center'>
                    <div className='cursor-pointer'>{usersScoreObj.emoji}</div>
                    <div className='cursor-pointer'>
                      {usersScoreObj.description}
                    </div>
                    <div className='font-extrabold cursor-pointer'>
                      {usersScoreObj.score}
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className='text-lg font-bold py-3'>Notes</h1>
                  <div>
                    {usersScoreObj.finalNotes ? (
                      <p className='border border-blue-600 p-auto rounded-lg p-3'>
                        {usersScoreObj.finalNotes}
                      </p>
                    ) : (
                      <p className='text-blue-600 uppercase tracking-widest text-center'>
                        No notes found
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogActions>
            <Button
              onClick={() => {
                deleteScore(usersScoreObj.id);
                handleClose();
              }}
            >
              Grade again
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default PreviousGrade;
