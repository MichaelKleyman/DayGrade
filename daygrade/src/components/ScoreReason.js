import React from 'react';

const ScoreReason = ({ description }) => {
  return (
    <div>
      <h1 className='text-xl font-bold py-3 px-4'>What made you {description} today?</h1>
    </div>
  );
};

export default ScoreReason;
