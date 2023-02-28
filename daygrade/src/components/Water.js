import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLocalDrink, MdLocalDrink } from 'react-icons/md';
import { TbBottle } from 'react-icons/tb';

const Water = () => {
  //   const [drankObj, setDrankObj] = useState([
  //     { drank: false },
  //     { drank: false },
  //     { drank: false },
  //     { drank: false },
  //     { drank: false },
  //     { drank: false },
  //   ]);
  const [bottleDrankObj, setBottleDrankObj] = useState([
    { drank: false },
    { drank: false },
    { drank: false },
    { drank: false },
    { drank: false },
    { drank: false },
  ]);
  const [cupDrankObj, setCupDrankObj] = useState([
    { drank: false },
    { drank: false },
    { drank: false },
    { drank: false },
    { drank: false },
    { drank: false },
  ]);
  const [type, setType] = useState('Cup');

  const clickCup = (index) => {
    let clickedIndex = index;
    let newDrankObj = cupDrankObj.map((obj, i) => {
      if (index >= i && !obj.drank) {
        obj.drank = !obj.drank;
        return obj;
      } else if (i >= clickedIndex && obj.drank) {
        obj.drank = !obj.drank;
        return obj;
      } else {
        return obj;
      }
    });
    setCupDrankObj(newDrankObj);
  };

  const clickBottle = (index) => {
    let clickedIndex = index;
    let newDrankObj = bottleDrankObj.map((obj, i) => {
      if (index >= i && !obj.drank) {
        obj.drank = !obj.drank;
        return obj;
      } else if (i >= clickedIndex && obj.drank) {
        obj.drank = !obj.drank;
        return obj;
      } else {
        return obj;
      }
    });
    setBottleDrankObj(newDrankObj);
  };

  return (
    <div className='mt-5'>
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
        {type === 'Cup'
          ? cupDrankObj.map((obj, i) =>
              !obj.drank ? (
                <button key={i}>
                  <MdOutlineLocalDrink
                    className='cursor-pointer'
                    size={30}
                    onClick={() => clickCup(i)}
                  />
                </button>
              ) : (
                <button key={i}>
                  <MdLocalDrink
                    className='cursor-pointer'
                    color='blue'
                    size={30}
                    onClick={() => clickCup(i)}
                  />
                </button>
              )
            )
          : bottleDrankObj.map((obj, i) =>
              !obj.drank ? (
                <button key={i}>
                  <TbBottle
                    className='cursor-pointer'
                    size={30}
                    onClick={() => clickBottle(i)}
                  />
                </button>
              ) : (
                <button key={i}>
                  <TbBottle
                    className='cursor-pointer'
                    color='blue'
                    size={30}
                    onClick={() => clickBottle(i)}
                  />
                </button>
              )
            )}
      </div>
      {/* <div className='flex justify-between'>
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
      </div> */}
    </div>
  );
};

export default Water;
