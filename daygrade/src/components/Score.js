import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Score = ({ scoreArr, handleChange, finalScore, error }) => {
  return (
    <div className=''>
      <DialogContent>
        <DialogContentText>
          Score the day by giving it a grade between 1 and 10. Each number
          grading is directly correlated to your mood/feeling of the day you
          just had.
        </DialogContentText>
      </DialogContent>
      <div className='grid grid-cols-2 gap-4 text-center place-items-center min-h-full'>
        {scoreArr.map((scoreObj) => (
          <div
            key={scoreObj.score}
            onClick={() =>
              handleChange(scoreObj.description, scoreObj.emoji, scoreObj.score)
            }
            className={`w-32 h-24 rounded-lg ${
              !finalScore.clicked && 'shadow-lg shadow-gray-400'
            } pt-2 duration-300 hover:scale-110 cursor-pointer border hover:border-blue-600 ${
              finalScore.clicked && finalScore.id === scoreObj.description
                ? 'border-blue-700 shadow-lg shadow-gray-900 font-bold text-blue-600'
                : 'border-gray-300'
            }`}
          >
            <p className='text-3xl'>{scoreObj.emoji}</p>
            <h1 className='text-sm text-gray-500'>{scoreObj.description}</h1>
            <p className='font-bold'>{scoreObj.score}</p>
          </div>
        ))}
      </div>
      {error && (
        <div className='w-full text-rose-500 flex items-center justify-center pt-3'>
          {error}
        </div>
      )}
    </div>
  );
};

export default Score;
