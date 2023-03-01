import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLocalDrink, MdLocalDrink } from 'react-icons/md';
import { TbBottle } from 'react-icons/tb';
import { Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { fetchWaterInfo, updateWaterInfo, addWaterInfo } from '../store';

const Water = ({ date }) => {
  const waterInfo = useSelector((state) => state.waterReducer);
  //   if (waterInfo) {
  //     console.log(waterInfo);
  //   } else {
  //     console.log('Doesnt exist');
  //   }

  let drankArr = waterInfo?.drank || [];

  const dispatch = useDispatch();
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

  const saveWaterCount = async () => {
    if (type === 'Cup') {
      if (!waterInfo) {
        await addDoc(collection(db, 'WaterCount'), {
          type,
          drank: cupDrankObj,
          userId: user.uid,
          date,
        });
        // dispatch(addWaterInfo(user.uid, cupDrankObj, type, date));
      } else {
        const docRef = doc(db, 'WaterCount', waterInfo.id);
        await updateDoc(docRef, {
          drank: cupDrankObj,
        });
        // dispatch(updateWaterInfo(waterInfo.id, cupDrankObj, type));
      }
    } else if (type === 'Bottle') {
      if (!waterInfo) {
        await addDoc(collection(db, 'WaterCount'), {
          type,
          drank: bottleDrankObj,
          userId: user.uid,
          date: date,
        });
        // dispatch(addWaterInfo(user.uid, bottleDrankObj, type, date));
      } else {
        const docRef = doc(db, 'WaterCount', waterInfo.id);
        await updateDoc(docRef, {
          drank: bottleDrankObj,
        });
        // dispatch(updateWaterInfo(waterInfo.id, bottleDrankObj, type));
      }
    }
  };

  const clickCup = (index) => {
    if (!waterInfo) {
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
      let newDrankObj = waterInfo.drank.map((obj, i) => {
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
    if (!waterInfo) {
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
      let newDrankObj = waterInfo.drank.map((obj, i) => {
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
    setUpdate(true);
    const unsubscribeWater = dispatch(fetchWaterInfo(user.uid, date));
    return () => {
      unsubscribeWater();
    };
  }, [date]);

  return (
    <div className='mt-5'>
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
      {!waterInfo ? (
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
          {waterInfo.type === 'Cup'
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

export default Water;
