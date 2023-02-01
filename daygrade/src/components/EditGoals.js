import React, { useState, forwardRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const EditGoals = ({ handleClose, open, userGoals }) => {
  const [user, loading] = useAuthState(auth);
  const [curGoals, setCurGoals] = useState([]);
  console.log('>>>', user);

  const updateGoals = async () => {
    const docRef = doc(db, 'Users', user.uid);
    await updateDoc(docRef, {
      goals: curGoals,
    });
  };

  function toggleGoal(goalNum) {
    let arrayCopy = [...userGoals];
    for (let i = 0; i < arrayCopy.length; i++) {
      for (let key in arrayCopy[i]) {
        if (key === goalNum) {
          if (arrayCopy[i].toggled) {
            arrayCopy[i].toggled = false;
            // arrayCopy[i][key] = goal;
          } else {
            arrayCopy[i].toggled = true;
            // arrayCopy[i][key] = goal;
          }
        }
      }
    }
    setCurGoals(arrayCopy);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
        maxWidth='md'
        fullWidth={true}
      >
        <DialogTitle>{'Edit your goals'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Take a look here and update your goals.
          </DialogContentText>
          <div>
            <p className='text-center pb-4 text-gray-400'>
              Select any that resonate most with you.
            </p>
            {userGoals.map((goalObj, i) => (
              <div
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  toggleGoal(`goal${i + 1}`);
                }}
                className={`p-3 border-2 ${
                  goalObj.toggled === true
                    ? 'border-blue-600 font-bold text-blue-600'
                    : 'border-gray-300'
                } rounded-md flex items-center justify-center duration-300 ${
                  goalObj.toggled === false
                    ? 'hover:border-blue-300 font-normal'
                    : ''
                }`}
              >
                <button>{goalObj[`goal${i + 1}`]}</button>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updateGoals();
              handleClose();
            }}
          >
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditGoals;

// eslint-disable-next-line no-lone-blocks
{
  /* <div>
  <p className='text-center pb-4 text-gray-400'>
    Select any that resonate most with you.
  </p>
  <div className='grid grid-cols-1 gap-4'>
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      className={`p-3 border-2 ${'border-gray-300'} rounded-md flex items-center justify-center duration-300 ${'hover:border-blue-300 font-normal'}`}
    >
      <button>Commit fully to a routine</button>
    </div>
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      className={`p-3 border-2 ${'border-gray-300'} rounded-md flex items-center justify-center duration-300 ${'hover:border-blue-300 font-normal'}`}
    >
      <button>Develop consistency</button>
    </div>
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      className={`p-3 border-2 ${'border-gray-300'} rounded-md flex items-center justify-center duration-300 ${'hover:border-blue-300 font-normal'}`}
    >
      <button>Get more disciplined</button>
    </div>
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      className={`p-3 border-2 ${'border-gray-300'} rounded-md flex items-center justify-center duration-300 ${'hover:border-blue-300 font-normal'}`}
    >
      <button>Maintain discipline</button>
    </div>
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      className={`p-3 border-2 ${'border-gray-300'} rounded-md flex items-center justify-center duration-300 ${'hover:border-blue-300 font-normal'}`}
    >
      <button>Create a new healthy habit</button>
    </div>
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      className={`p-3 border-2 ${'border-gray-300'} rounded-md flex items-center justify-center duration-300 ${'hover:border-blue-300 font-normal'}`}
    >
      <button>Achieve a personal goal</button>
    </div>
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      className={`p-3 border-2 ${'border-gray-300'} rounded-md flex items-center justify-center duration-300 ${'hover:border-blue-300 font-normal'}`}
    >
      <button>Force self accountability</button>
    </div>
  </div>
</div>; */
}
