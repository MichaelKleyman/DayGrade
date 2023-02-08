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
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

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
  const [finalScore, setFinalScore] = useState({
    clicked: false,
    id: '',
    emoji: '',
    score: '',
  });

  const handleChange = (description, emoji, score) => {
    setFinalScore({
      clicked: !finalScore.clicked,
      id: description,
      emoji,
      score,
    });
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
          handleChange={handleChange}
          finalScore={finalScore}
          error={error}
        />
      );
    } else if (page === 1) {
      return <ScoreReason description={finalScore.id} />;
    } else {
      return <FinalNotes />;
    }
  };

  const handleNext = () => {
    if (!finalScore.clicked) {
      setError('Please give yourself a score*');
    } else {
      setError('');
      setPage((currPage) => currPage + 1);
    }
  };

  const handleBack = () => {
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
          <Button
            onClick={() => {
              handleNext();
            }}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScoreProcess;
