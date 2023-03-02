/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLocalDrink, MdLocalDrink } from 'react-icons/md';
import { TbBottle } from 'react-icons/tb';
import { Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import { fetchWaterInfo, fetchNewWaterInfo } from '../store';

const Water = ({ date }) => {
  const waterInfo = useSelector((state) => state.waterReducer);
  //   if (waterInfo) {
  //     console.log(waterInfo);
  //   } else {
  //     console.log('Doesnt exist');
  //   }

  const dispatch = useDispatch();
  const [update, setUpdate] = useState(true);
  //   const [waterInfo, setWaterInfo] = useState({});
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

  let drankArr = waterInfo?.drank || [];

  const [user, loading] = useAuthState(auth);

  const saveWaterCount = async () => {
    if (type === 'Cup') {
      if (!waterInfo) {
        console.log('added');
        await addDoc(collection(db, 'WaterCount'), {
          type,
          drank: [...cupDrankObj],
          userId: user.uid,
          date,
        });
        dispatch(fetchNewWaterInfo(user.uid));
        // dispatch(addWaterInfo(user.uid, cupDrankObj, type, date));
      } else {
        console.log('updated');
        const docRef = doc(db, 'WaterCount', waterInfo.id);
        await updateDoc(docRef, {
          drank: [...cupDrankObj],
        });
        dispatch(fetchNewWaterInfo(user.uid));
        // dispatch(updateWaterInfo(waterInfo.id, cupDrankObj, type));
      }
    } else if (type === 'Bottle') {
      if (!waterInfo) {
        console.log('added');
        let newObj = {
          type,
          drank: [...bottleDrankObj],
          userId: user.uid,
          date: date,
        };
        await addDoc(collection(db, 'WaterCount'), newObj);
        dispatch(fetchNewWaterInfo(user.uid));
        // dispatch(addWaterInfo(user.uid, bottleDrankObj, type, date));
      } else {
        console.log('updated');
        const docRef = doc(db, 'WaterCount', waterInfo.id);
        await updateDoc(docRef, {
          drank: [...bottleDrankObj],
        });
        dispatch(fetchNewWaterInfo(user.uid));
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
    console.log(date);
    setUpdate(true);
    dispatch(fetchWaterInfo(user.uid, date));
    // async function fetchWater() {
    //   try {
    //     const docRef = collection(db, 'WaterCount');
    //     const q = query(
    //       docRef,
    //       where('userId', '==', user.uid),
    //       where('date', '==', date)
    //     );
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       if (doc.data()) {
    //         console.log(doc.id, ' => ', doc.data());
    //         setWaterInfo(doc.data());
    //       } else {
    //         console.log('doesnt exist');
    //       }
    //     });
    //   } catch (error) {
    //     console.log('>>>>', error);
    //   }
    // }
    // fetchWater();
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
            onClick={async () => {
              setUpdate(true);
              await saveWaterCount();
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
