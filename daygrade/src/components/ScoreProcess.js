import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Button } from '@mui/material';
import Score from './Score';
import FinalNotes from './FinalNotes';
import ScoreReason from './ScoreReason';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

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

const ScoreProcess = ({ open, handleClose }) => {
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [reasonsError, setReasonsError] = useState(null);
  const [finalScore, setFinalScore] = useState({
    clicked: false,
    id: '',
    emoji: '',
    score: '',
  });
  const [reasons, setReasons] = useState([
    { reason: 'Work', id: 1, emoji: '💻', clicked: false },
    { reason: 'Family', id: 2, emoji: '🏡', clicked: false },
    { reason: 'Friends', id: 3, emoji: '🤙🏽', clicked: false },
    { reason: 'Relationship', id: 4, emoji: '❤️', clicked: false },
    { reason: 'Sports', id: 5, emoji: '⛹🏼‍♂️', clicked: false },
    { reason: 'Food', id: 6, emoji: '🍽', clicked: false },
    { reason: 'Traveling', id: 7, emoji: '🛩', clicked: false },
    { reason: 'Health', id: 8, emoji: '🩺', clicked: false },
    { reason: 'Sleep', id: 9, emoji: '💤', clicked: false },
    { reason: 'Hobby', id: 10, emoji: '🗣', clicked: false },
    { reason: 'Learning', id: 11, emoji: '📓', clicked: false },
    { reason: 'Gym', id: 12, emoji: '🏋🏽', clicked: false },
  ]);
  const [user, loading] = useAuthState(auth);

  const handleScoreChange = (description, emoji, score) => {
    setFinalScore({
      clicked: !finalScore.clicked,
      id: description,
      emoji,
      score,
    });
  };

  const submitFinalScore = async () => {
    try {
      await addDoc(collection(db, 'finalScore'), {
        userId: user.uid,
        score: finalScore.score,
        description: finalScore.description,
        emoji: finalScore.emoji,
        reasons,
        finalNotes: '',
      });
    } catch (e) {
      console.error('Error when submitting score: ', e);
    }
  };

  const scoreArr = [
    { emoji: '🤯', description: 'Crazy', score: 1 },
    { emoji: '😫', description: 'Frustrated', score: 2 },
    { emoji: '😡', description: 'Angry', score: 3 },
    { emoji: '🫠', description: 'Annoyed', score: 4 },
    { emoji: '😥', description: 'Sad', score: 5 },
    { emoji: '🥱', description: 'Disappointed', score: 6 },
    { emoji: '😵‍💫', description: 'Uneasy', score: 7 },
    { emoji: '😌', description: 'Content', score: 8 },
    { emoji: '😄', description: 'Satisfied', score: 9 },
    { emoji: '🤩', description: 'Fulfilled', score: 10 },
  ];

  const pageDisplay = () => {
    if (page === 0) {
      return (
        <Score
          scoreArr={scoreArr}
          handleScoreChange={handleScoreChange}
          finalScore={finalScore}
          error={error}
        />
      );
    } else if (page === 1) {
      return (
        <ScoreReason
          description={finalScore.id}
          setReasons={setReasons}
          reasonsError={reasonsError}
          reasons={reasons}
        />
      );
    } else {
      return (
        <FinalNotes
          reasons={reasons.filter((obj) => obj.clicked === true)}
          finalScore={finalScore}
        />
      );
    }
  };

  const handleNext = () => {
    if (!finalScore.clicked) {
      setError('Please give yourself a score*');
    }
    if (finalScore.clicked) {
      setError('');
      setPage((currPage) => currPage + 1);
    }
  };

  const handleReasons = () => {
    for (let i = 0; i < reasons.length; i++) {
      let curReason = reasons[i];
      if (curReason.clicked) {
        return true;
      }
    }
    setReasonsError('Select a reason*');
  };

  const handleBack = () => {
    setError('');
    setReasonsError('');
    setPage((currPage) => currPage - 1);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Log your final grade for the day
        </DialogTitle>
        <div>{pageDisplay()}</div>
        <DialogActions>
          {page === 0 ? (
            <Button
              autoFocus
              onClick={() => {
                setError('');
                handleClose();
              }}
            >
              Cancel
            </Button>
          ) : (
            <Button autoFocus onClick={handleBack}>
              Back
            </Button>
          )}
          {page !== 2 ? (
            <Button
              onClick={() => {
                page === 1 ? handleReasons() && handleNext() : handleNext();
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => {
                submitFinalScore();
              }}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScoreProcess;
