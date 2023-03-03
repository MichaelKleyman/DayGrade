/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLocalDrink, MdLocalDrink } from 'react-icons/md';
import { TbBottle } from 'react-icons/tb';
import { Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { fetchWaterInfo2 } from '../store/tempWater';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const TempWater = ({ date }) => {
  let waterInfo = useSelector((state) => state.waterReducer2);
  let waterInfoObj = waterInfo[0] || {};

  const [update, setUpdate] = useState(true);
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
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  let drankArr = waterInfoObj.drank || [];
  console.log('>>>', drankArr);

  const saveWaterCount = async () => {
    if (type === 'Cup') {
      if (!drankArr.length) {
        console.log('added');
        await addDoc(collection(db, 'WaterCount'), {
          type,
          drank: [...cupDrankObj],
          userId: user.uid,
          date,
        });
        dispatch(fetchWaterInfo2(user.uid, date));
        // dispatch(addWaterInfo(user.uid, cupDrankObj, type, date));
      } else {
        console.log('updated');
        const docRef = doc(db, 'WaterCount', waterInfoObj.id);
        await updateDoc(docRef, {
          drank: [...cupDrankObj],
          type,
        });
        dispatch(fetchWaterInfo2(user.uid, date));
        // dispatch(updateWaterInfo(waterInfo.id, cupDrankObj, type));
      }
    } else if (type === 'Bottle') {
      if (!drankArr.length) {
        console.log('added');
        let newObj = {
          type,
          drank: [...bottleDrankObj],
          userId: user.uid,
          date: date,
        };
        await addDoc(collection(db, 'WaterCount'), newObj);
        dispatch(fetchWaterInfo2(user.uid, date));
        // dispatch(addWaterInfo(user.uid, bottleDrankObj, type, date));
      } else {
        console.log('updated');
        const docRef = doc(db, 'WaterCount', waterInfoObj.id);
        await updateDoc(docRef, {
          drank: [...bottleDrankObj],
          type,
        });
        dispatch(fetchWaterInfo2(user.uid, date));
        // dispatch(updateWaterInfo(waterInfo.id, bottleDrankObj, type));
      }
    }
  };

  const clickCup = (index) => {
    if (!drankArr.length) {
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
    } else {
      let clickedIndex = index;
      let newDrankObj = waterInfoObj.drank.map((obj, i) => {
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
    }
  };

  const clickBottle = (index) => {
    if (!drankArr.length) {
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
    } else {
      let clickedIndex = index;
      let newDrankObj = waterInfoObj.drank.map((obj, i) => {
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
    }
  };

  useEffect(() => {
    const unSubWater = dispatch(fetchWaterInfo2(user.uid, date));
    return () => {
      unSubWater();
    };
  }, [date]);

  return (
    <div className='mt-5'>
      <div>{date}</div>
      <h1 className='uppercase text-blue-600 tracking-widest'>Water</h1>
      <div className='flex justify-between items-center pb-3'>
        <h1 className='text-sm'>
          <button
            disabled={update}
            onClick={() => {
              setType('Cup');
            }}
            className={`${type === 'Cup' ? 'text-blue-600' : ''}`}
          >
            Cup
          </button>{' '}
          or{' '}
          <button
            disabled={update}
            onClick={() => {
              setType('Bottle');
            }}
            className={`${type === 'Bottle' ? 'text-blue-600' : ''}`}
          >
            Bottle
          </button>
          {/* <button onClick={() => console.log(type)}>LL</button> */}
        </h1>
        {update ? (
          <Button
            className={`${!update ? 'animate-bounce' : ''}`}
            onClick={() => setUpdate(false)}
          >
            Update
          </Button>
        ) : (
          <Button
            className={`${!update ? 'animate-bounce' : ''}`}
            onClick={() => {
              setUpdate(true);
              saveWaterCount();
            }}
          >
            Save
          </Button>
        )}
      </div>
      {!drankArr.length ? (
        <div className='flex justify-between'>
          {type === 'Cup'
            ? cupDrankObj.map((obj, i) =>
                !obj.drank ? (
                  <button key={i}>
                    <MdOutlineLocalDrink
                      className='cursor-pointer duration-300 hover:scale-110'
                      size={30}
                      onClick={() => {
                        if (!update) clickCup(i);
                      }}
                    />
                  </button>
                ) : (
                  <button key={i}>
                    <MdLocalDrink
                      className='cursor-pointer duration-300 hover:scale-110'
                      color='blue'
                      size={30}
                      onClick={() => {
                        if (!update) clickCup(i);
                      }}
                    />
                  </button>
                )
              )
            : bottleDrankObj.map((obj, i) =>
                !obj.drank ? (
                  <button key={i}>
                    <TbBottle
                      className='cursor-pointer duration-300 hover:scale-110'
                      size={30}
                      onClick={() => {
                        if (!update) clickBottle(i);
                      }}
                    />
                  </button>
                ) : (
                  <button key={i}>
                    <TbBottle
                      className='cursor-pointer duration-300 hover:scale-110'
                      color='blue'
                      size={30}
                      onClick={() => {
                        if (!update) clickBottle(i);
                      }}
                    />
                  </button>
                )
              )}
        </div>
      ) : (
        <div className='flex justify-between'>
          {waterInfoObj.type === 'Cup'
            ? drankArr.map((obj, i) =>
                !obj.drank ? (
                  <button key={i}>
                    <MdOutlineLocalDrink
                      className='cursor-pointer duration-300 hover:scale-110'
                      size={30}
                      onClick={() => {
                        if (!update) clickCup(i);
                      }}
                    />
                  </button>
                ) : (
                  <button key={i}>
                    <MdLocalDrink
                      className='cursor-pointer duration-300 hover:scale-110'
                      color='blue'
                      size={30}
                      onClick={() => {
                        if (!update) clickCup(i);
                      }}
                    />
                  </button>
                )
              )
            : drankArr.map((obj, i) =>
                !obj.drank ? (
                  <button key={i}>
                    <TbBottle
                      className='cursor-pointer duration-300 hover:scale-110'
                      size={30}
                      onClick={() => {
                        if (!update) clickBottle(i);
                      }}
                    />
                  </button>
                ) : (
                  <button key={i}>
                    <TbBottle
                      className='cursor-pointer duration-300 hover:scale-110'
                      color='blue'
                      size={30}
                      onClick={() => {
                        if (!update) clickBottle(i);
                      }}
                    />
                  </button>
                )
              )}
        </div>
      )}
    </div>
  );
};

export default TempWater;
