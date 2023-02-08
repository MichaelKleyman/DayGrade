import React from 'react';

const FinalNotes = ({ reasons, finalScore }) => {
  return (
    <div className='m-5 px-[1rem]'>
      <div>
        <h1 className='text-lg font-bold'>Reasons</h1>
        <div className='p-4 flex justify-between w-full overflow-x-scroll'>
          {reasons.map((obj) => (
            <span
              key={obj.id}
              className='rounded-xl shadow-lg shadow-gray-400 text-center w-56 p-3 cursor-pointer mx-3'
            >
              {obj.emoji} {obj.reason}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h1 className='text-lg font-bold py-2'>Final Grade</h1>
        <div className='p-2 rounded-xl shadow-lg shadow-gray-400 text-center w-[30%] grid grid-cols-3 gap-2 place-items-center'>
          <div className='cursor-pointer'>{finalScore.emoji}</div>
          <div className='cursor-pointer'>{finalScore.id}</div>
          <div className='font-extrabold cursor-pointer'>
            {finalScore.score}
          </div>
        </div>
      </div>
      <div>
        <h1 className='text-lg font-bold py-3'>Notes</h1>
        <textarea
          autoFocus={true}
          placeholder='Add some notes...'
          rows='5'
          cols='47'
          style={{
            border: '1px solid blue',
            padding: '10px',
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  );
};

export default FinalNotes;
