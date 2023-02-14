import React from 'react';

const LineChartModal = ({ scoreObj }) => {
  return (
    <div className='m-5 px-[1rem]'>
      <div>
        <div>
          <h1 className='text-lg font-bold'>Reasons</h1>
          <div className='p-4 flex justify-between w-full overflow-x-scroll'>
            {scoreObj.reasons &&
              scoreObj.reasons.map((obj) => {
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
              })}
          </div>
        </div>
      </div>
      <div>
        <div>
          <h1 className='text-lg font-bold py-2'>Final Grade</h1>
          <div className='p-2 rounded-xl shadow-lg shadow-gray-400 text-center w-[40%] grid grid-cols-3 gap-8 place-items-center'>
            <div className='cursor-pointer'>{scoreObj.emoji}</div>
            <div className='cursor-pointer'>{scoreObj.description}</div>
            <div className='font-extrabold cursor-pointer'>
              {scoreObj.score}
            </div>
          </div>
        </div>
        <div>
          <h1 className='text-lg font-bold py-3'>Notes</h1>
          <div>
            {scoreObj.finalNotes ? (
              <p className='border border-blue-600 p-auto rounded-lg p-3'>
                {scoreObj.finalNotes}
              </p>
            ) : (
              <p className='text-blue-600 uppercase tracking-widest text-center'>
                No notes found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChartModal;
