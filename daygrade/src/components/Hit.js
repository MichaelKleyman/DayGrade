import React from 'react';
import { FcOk } from 'react-icons/fc';
import { Button } from '@mui/material';
import { Highlight } from 'react-instantsearch-dom';

const Hit = ({ hit, onClick, currentUser }) => {
  // console.log(hit);

  if (currentUser.uid === hit.userId) {
    return (
      <div className='shadow-lg shadow-gray-400 p-2 m-3 rounded-lg bg-white h-[90%] w-[85%] '>
        <header>
          {/* <div className='text-lg font-bold p-2'>{hit.log}</div> */}
          <Highlight
            className='text-lg font-bold p-2'
            attribute='log'
            hit={hit}
            tagName='mark'
          />
        </header>
        <div className='text-sm text-gray-500 p-2 flex items-center'>
          <FcOk size={35} className='p-2' />
          {hit.Date}
        </div>
        <div className='flex justify-end'>
          <Button
            variant='contained'
            color='success'
            sx={{ padding: '3px', fontSize: '12px' }}
            onClick={() => onClick(hit)}
          >
            View
          </Button>
        </div>
      </div>
    );
  }
};

export default Hit;

// <div>
//   {currentUser.uid === hit.userId && (
//     <div className='shadow-lg shadow-gray-400 p-2 m-3 rounded-lg bg-white h-[90%] w-[85%] '>
//       <header>
//         {/* <div className='text-lg font-bold p-2'>{hit.log}</div> */}
//         <Highlight
//           className='text-lg font-bold p-2'
//           attribute='log'
//           hit={hit}
//           tagName='mark'
//         />
//       </header>
//       <div className='text-sm text-gray-500 p-2 flex items-center'>
//         <FcOk size={35} className='p-2' />
//         {hit.Date}
//       </div>
//       <div className='flex justify-end'>
//         <Button
//           variant='contained'
//           color='success'
//           sx={{ padding: '3px', fontSize: '12px' }}
//           onClick={() => onClick(hit)}
//         >
//           View
//         </Button>
//       </div>
//     </div>
//   )}
// </div>
