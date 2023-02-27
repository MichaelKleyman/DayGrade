import React from 'react';
import { MdOutlineLocalDrink, MdLocalDrink } from 'react-icons/md';
import { TbBottle } from 'react-icons/tb';
import { Button } from '@mui/material';

const Water = ({
  update,
  type,
  handleType,
  setUpdate,
  usersScoreArr,
  usersScoreObj,
  waterCount,
  drankWater,
  curWaterCount,
  waterCountArr,
  saveWaterCount,
  editCount,
}) => {
  return (
    <div className='mt-9'>
      <h1 className='uppercase tracking-widest pb-2 text-blue-500 font-bold'>
        water
      </h1>
      <h1 className='pb-3 text-sm flex justify-between'>
        {waterCountArr.length > 0 ? (
          <div>
            <button
              disabled={!update}
              onClick={() => handleType('Cup')}
              className={`hover:text-blue-700 duration-300 hover:scale-110 cursor-pointer hover:font-bold ${
                type === 'Cup' ? 'text-blue-600 italic' : ''
              }`}
            >
              Cup
            </button>{' '}
            or{' '}
            <button
              disabled={!update}
              onClick={() => handleType('Bottle')}
              className={`hover:text-blue-700 duration-300 hover:scale-110 cursor-pointer hover:font-bold ${
                type === 'Bottle' ? 'text-blue-600 italic' : ''
              }`}
            >
              Bottle
            </button>
          </div>
        ) : (
          <div>
            <button
              disabled={!update}
              onClick={() => handleType('Cup')}
              className={`hover:text-blue-700 duration-300 hover:scale-110 cursor-pointer hover:font-bold ${
                type === 'Cup' ? 'text-blue-600 italic' : ''
              }`}
            >
              Cup
            </button>{' '}
            or{' '}
            <button
              disabled={!update}
              onClick={() => handleType('Bottle')}
              className={`hover:text-blue-700 duration-300 hover:scale-110 cursor-pointer hover:font-bold ${
                type === 'Bottle' ? 'text-blue-600 italic' : ''
              }`}
            >
              Bottle
            </button>
          </div>
        )}
        <div className={`${!update ? 'animate-bounce' : ''}`}>
          {update ? (
            <Button
              onClick={() => {
                setUpdate(!update);
                saveWaterCount();
              }}
            >
              Save
            </Button>
          ) : (
            <Button onClick={() => setUpdate(!update)}>Update</Button>
          )}
        </div>
      </h1>
      <div>
        {waterCountArr.length ? (
          <div className='flex justify-between'>
            {curWaterCount.drank.map((obj, i) => (
              <div key={i} onClick={() => drankWater(i)}>
                {obj.drank ? (
                  type === 'Cup' ? (
                    <MdLocalDrink
                      color='blue'
                      size={33}
                      className='cursor-pointer duration-300 hover:scale-110'
                    />
                  ) : (
                    <TbBottle
                      color='blue'
                      size={33}
                      className='cursor-pointer duration-300 hover:scale-110'
                    />
                  )
                ) : type === 'Cup' ? (
                  <MdOutlineLocalDrink
                    size={33}
                    className='cursor-pointer duration-300 hover:scale-110'
                  />
                ) : (
                  <TbBottle
                    size={33}
                    className='cursor-pointer duration-300 hover:scale-110'
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='flex justify-between'>
            {waterCount.map((obj, i) => (
              <div key={i} onClick={() => drankWater(i)}>
                {obj.drank ? (
                  type === 'Cup' ? (
                    <MdLocalDrink
                      color='blue'
                      size={33}
                      className='cursor-pointer duration-300 hover:scale-110'
                    />
                  ) : (
                    <TbBottle
                      color='blue'
                      size={33}
                      className='cursor-pointer duration-300 hover:scale-110'
                    />
                  )
                ) : type === 'Cup' ? (
                  <MdOutlineLocalDrink
                    size={33}
                    className='cursor-pointer duration-300 hover:scale-110'
                  />
                ) : (
                  <TbBottle
                    size={33}
                    className='cursor-pointer duration-300 hover:scale-110'
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Water;

// import React from 'react';
// import { MdOutlineLocalDrink, MdLocalDrink } from 'react-icons/md';
// import { TbBottle } from 'react-icons/tb';
// import { Button } from '@mui/material';

// const Water = ({
//   update,
//   type,
//   handleType,
//   setUpdate,
//   usersScoreArr,
//   usersScoreObj,
//   waterCount,
//   drankWater,
// }) => {
//   return (
//     <div className='mt-9'>
//       <h1 className='uppercase tracking-widest pb-2 text-blue-500 font-bold'>
//         water
//       </h1>
//       <h1 className='pb-3 text-sm flex justify-between'>
//         <div>
//           <button
//             disabled={!update}
//             onClick={() => handleType('Cup')}
//             className={`hover:text-blue-700 duration-300 hover:scale-110 cursor-pointer hover:font-bold ${
//               type === 'Cup' ? 'text-blue-600 italic' : ''
//             }`}
//           >
//             Cup
//           </button>{' '}
//           or{' '}
//           <button
//             disabled={!update}
//             onClick={() => handleType('Bottle')}
//             className={`hover:text-blue-700 duration-300 hover:scale-110 cursor-pointer hover:font-bold ${
//               type === 'Bottle' ? 'text-blue-600 italic' : ''
//             }`}
//           >
//             Bottle
//           </button>
//         </div>
//         <div className={`${!update ? 'animate-bounce' : ''}`}>
//           <Button onClick={() => setUpdate(!update)}>
//             {update ? 'Save' : 'Update'}
//           </Button>
//         </div>
//       </h1>
//       <div>
//         {usersScoreArr.length ? (
//           <div className='flex justify-between'>
//             {usersScoreObj.waterCount.map((obj, i) => (
//               <div key={i} onClick={() => drankWater(i)}>
//                 {obj.drank ? (
//                   type === 'Cup' ? (
//                     <MdLocalDrink
//                       color='blue'
//                       size={33}
//                       className='cursor-pointer duration-300 hover:scale-110'
//                     />
//                   ) : (
//                     <TbBottle
//                       color='blue'
//                       size={33}
//                       className='cursor-pointer duration-300 hover:scale-110'
//                     />
//                   )
//                 ) : type === 'Cup' ? (
//                   <MdOutlineLocalDrink
//                     size={33}
//                     className='cursor-pointer duration-300 hover:scale-110'
//                   />
//                 ) : (
//                   <TbBottle
//                     size={33}
//                     className='cursor-pointer duration-300 hover:scale-110'
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className='flex justify-between'>
//             {waterCount.map((obj, i) => (
//               <div key={i} onClick={() => drankWater(i)}>
//                 {obj.drank ? (
//                   type === 'Cup' ? (
//                     <MdLocalDrink
//                       color='blue'
//                       size={33}
//                       className='cursor-pointer duration-300 hover:scale-110'
//                     />
//                   ) : (
//                     <TbBottle
//                       color='blue'
//                       size={33}
//                       className='cursor-pointer duration-300 hover:scale-110'
//                     />
//                   )
//                 ) : type === 'Cup' ? (
//                   <MdOutlineLocalDrink
//                     size={33}
//                     className='cursor-pointer duration-300 hover:scale-110'
//                   />
//                 ) : (
//                   <TbBottle
//                     size={33}
//                     className='cursor-pointer duration-300 hover:scale-110'
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Water;
