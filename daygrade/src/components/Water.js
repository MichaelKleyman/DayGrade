import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLocalDrink, MdLocalDrink } from 'react-icons/md';
import { TbBottle } from 'react-icons/tb';

const Water = () => {
  const [drankObj, setDrankObj] = useState([
    { drank: false },
    { drank: false },
    { drank: false },
    { drank: false },
    { drank: false },
    { drank: false },
  ]);
  const [type, setType] = useState('Cup');

  const helperFunction = () => {

  }

  const clickWater = (index) => {
    let trueIndex = 0;
    for (let i = 0; i < drankObj.length; i++) {
      if (drankObj[i].drank) {
        if (i >= trueIndex) {
          trueIndex = i;
        }
      }
    }
    let newDrankObj = drankObj.map((obj, i) => {
      if (index >= i && !obj.drank) {
        obj.drank = !obj.drank;
        return obj;
      } else if (index === i && obj.drank) {
        obj.drank = !obj.drank;
        return obj;
      } 
      else if (i < trueIndex && obj.drank) {
        
      }
      else {
        return obj;
      }
    });
    setDrankObj(newDrankObj);
  };

  return (
    <div>
      <h1 className='uppercase text-blue-600 tracking-widest'>Water</h1>
      <h1 className='text-sm'>
        <button
          onClick={() => setType('Cup')}
          className={`${type === 'Cup' ? 'text-blue-600' : ''}`}
        >
          Cup
        </button>{' '}
        or{' '}
        <button
          onClick={() => setType('Bottle')}
          className={`${type === 'Bottle' ? 'text-blue-600' : ''}`}
        >
          Bottle
        </button>
      </h1>
      {/* <button onClick={() => console.log(drankObj)}>click me</button> */}
      <div className='flex justify-between'>
        {drankObj.map((obj, i) =>
          type === 'Cup' ? (
            !obj.drank ? (
              <button key={i}>
                <MdOutlineLocalDrink
                  className='cursor-pointer'
                  size={30}
                  onClick={() => clickWater(i)}
                />
              </button>
            ) : (
              <button key={i}>
                <MdLocalDrink
                  className='cursor-pointer'
                  color='blue'
                  size={30}
                  onClick={() => clickWater(i)}
                />
              </button>
            )
          ) : !obj.drank ? (
            <button key={i}>
              <TbBottle
                className='cursor-pointer'
                size={30}
                onClick={() => clickWater(i)}
              />
            </button>
          ) : (
            <button key={i}>
              <TbBottle
                className='cursor-pointer'
                color='blue'
                size={30}
                onClick={() => clickWater(i)}
              />
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Water;
