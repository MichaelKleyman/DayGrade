import React from 'react';

const Goals = ({ firstName }) => {
  return (
    <div>
      <h2 className='text-3xl font-bold text-center py-4'>
        Thanks {firstName}! Now tell me your goals.
      </h2>
      <p className='text-center pb-4'>Select 4 that resonate most with you.</p>
      <div className='grid grid-cols-1 gap-4'>
        <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
          <button>Commit fully to a routine</button>
        </div>
        <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
          <button>Develop consistency</button>
        </div>
        <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
          <button>Get more disciplined</button>
        </div>
        <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
          <button>Maintain discipline</button>
        </div>
        <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
          <button>Create a new healthy habit</button>
        </div>
        <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
          <button>Achieve a personal goal</button>
        </div>
        <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
          <button>Force self accountability</button>
        </div>
      </div>
    </div>
  );
};

export default Goals;
