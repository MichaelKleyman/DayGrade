import React, { useState } from 'react';

const ScoreReason = ({ description, setReasons, reasonsError, reasons }) => {

  const newReasonsArr = (newReason) => {
    let newReasonsArr = [];
    for (let i = 0; i < reasons.length; i++) {
      let curReason = reasons[i];
      if (curReason.id === newReason.id) {
        curReason.clicked = !curReason.clicked;
        newReasonsArr.push(curReason);
      } else {
        newReasonsArr.push(curReason);
      }
    }
    setReasons(newReasonsArr);
  };

  return (
    <div className='m-3 px-[3rem]'>
      <h1 className='text-xl font-bold py-3 px-4 m-3'>
        What made you <span className='text-blue-500'>{description}</span>{' '}
        today?
        <p className='text-sm font-normal text-gray-400 p-2'>
          Select any of the following
        </p>
      </h1>
      <div className='grid grid-cols-2 gap-4 place-items-center min-h-full'>
        {reasons.map((reasonObj) => (
          <div
            key={reasonObj.id}
            onClick={() => {
              newReasonsArr(reasonObj);
            }}
            className={`shadow-lg shadow-gray-300 rounded-lg w-56 p-5 cursor-pointer duration-300 hover:scale-110 mx-3 ${
              reasonObj.clicked === true ? 'bg-blue-500 text-white' : ''
            }`}
          >
            <span className='p-2'>{reasonObj.emoji}</span>
            {reasonObj.reason}
          </div>
        ))}
      </div>
      {reasonsError && (
        <div className='w-full text-rose-500 flex items-center justify-center pt-3'>
          {reasonsError}
        </div>
      )}
    </div>
  );
};

export default ScoreReason;
