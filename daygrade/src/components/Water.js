/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLocalDrink, MdLocalDrink } from 'react-icons/md';
import { TbBottle } from 'react-icons/tb';
import { Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { fetchWaterInfo } from '../store/water';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ToolTip from './ToolTip';
import AverageWater from './AverageWater';

const Water = ({ date }) => {
  let waterInfo = useSelector((state) => state.waterReducer);
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
  let waterInfoType = waterInfoObj.type || '';

  const saveWaterCount = async () => {
    if (!waterInfoType.length) {
      if (type === 'Cup') {
        if (!drankArr.length) {
          console.log('added');
          await addDoc(collection(db, 'WaterCount'), {
            type,
            drank: [...cupDrankObj],
            userId: user.uid,
            date,
          });
          setCupDrankObj([
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
          ]);
        } else {
          console.log('updated');
          const docRef = doc(db, 'WaterCount', waterInfoObj.id);
          await updateDoc(docRef, {
            drank: [...cupDrankObj],
          });
          setCupDrankObj([
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
          ]);
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
          setBottleDrankObj([
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
          ]);
        } else {
          console.log('updated');
          const docRef = doc(db, 'WaterCount', waterInfoObj.id);
          await updateDoc(docRef, {
            drank: [...bottleDrankObj],
          });
          setBottleDrankObj([
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
          ]);
        }
      }
    } else {
      if (waterInfoType === 'Cup') {
        if (!drankArr.length) {
          console.log('added');
          await addDoc(collection(db, 'WaterCount'), {
            type,
            drank: [...cupDrankObj],
            userId: user.uid,
            date,
          });
          setCupDrankObj([
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
          ]);
        } else {
          console.log('updated');
          const docRef = doc(db, 'WaterCount', waterInfoObj.id);
          await updateDoc(docRef, {
            drank: [...cupDrankObj],
          });
          setCupDrankObj([
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
          ]);
        }
      } else if (waterInfoType === 'Bottle') {
        if (!drankArr.length) {
          console.log('added');
          let newObj = {
            type,
            drank: [...bottleDrankObj],
            userId: user.uid,
            date: date,
          };
          await addDoc(collection(db, 'WaterCount'), newObj);
          setBottleDrankObj([
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
          ]);
        } else {
          console.log('updated');
          const docRef = doc(db, 'WaterCount', waterInfoObj.id);
          await updateDoc(docRef, {
            drank: [...bottleDrankObj],
          });
          setBottleDrankObj([
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
            { drank: false },
          ]);
        }
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
    setType('Cup');
    const unSubWater = dispatch(fetchWaterInfo(user.uid, date));
    return () => {
      unSubWater();
    };
  }, [date]);

  const handleType = async (newType) => {
    setType(newType);
    const docRef = doc(db, 'WaterCount', waterInfoObj.id);
    await updateDoc(docRef, {
      type: newType,
    });
    dispatch(fetchWaterInfo(user.uid, date));
  };

  return (
    <div className='mt-5'>
      <h1 className='flex items-center uppercase text-blue-600 tracking-widest font-bold'>
        <p>Water</p>
        <ToolTip />
      </h1>
      <AverageWater id={user.uid} />
      <div className='flex justify-between items-center pb-3'>
        <h1 className='text-sm'>
          {!waterInfo.length ? (
            <div>
              <button
                disabled={update}
                onClick={() => {
                  handleType('Cup');
                }}
                className={`${type === 'Cup' ? 'text-blue-600' : ''}`}
              >
                Cup
              </button>{' '}
              or{' '}
              <button
                disabled={update}
                onClick={() => {
                  handleType('Bottle');
                }}
                className={`${type === 'Bottle' ? 'text-blue-800' : ''}`}
              >
                Bottle
              </button>
            </div>
          ) : (
            <div>
              <button
                disabled={update}
                onClick={() => {
                  handleType('Cup');
                }}
                className={`${waterInfoType === 'Cup' ? 'text-blue-600' : ''}`}
              >
                Cup
              </button>{' '}
              or{' '}
              <button
                disabled={update}
                onClick={() => {
                  handleType('Bottle');
                }}
                className={`${
                  waterInfoType === 'Bottle' ? 'text-blue-800' : ''
                }`}
              >
                Bottle
              </button>
            </div>
          )}
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
        <div className='flex justify-between overflow-x-scroll'>
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
        <div className='flex justify-between overflow-x-scroll'>
          {waterInfoType === 'Cup'
            ? drankArr.map((obj, i) =>
                !obj.drank ? (
                  <button key={i}>
                    <MdOutlineLocalDrink
                      className='flex cursor-pointer duration-300 hover:scale-110'
                      size={30}
                      onClick={() => {
                        if (!update) clickCup(i);
                      }}
                    />
                  </button>
                ) : (
                  <button key={i}>
                    <MdLocalDrink
                      className='flex cursor-pointer duration-300 hover:scale-110'
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
                      className='flex cursor-pointer duration-300 hover:scale-110'
                      size={30}
                      onClick={() => {
                        if (!update) clickBottle(i);
                      }}
                    />
                  </button>
                ) : (
                  <button key={i}>
                    <TbBottle
                      className='flex cursor-pointer duration-300 hover:scale-110'
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

export default Water;
