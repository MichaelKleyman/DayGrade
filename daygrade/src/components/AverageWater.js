/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { fetchAverageWater } from '../store';
import { useDispatch, useSelector } from 'react-redux';

export default function AverageWater({ id }) {
  const [averageWaterInfo, setAverageWater] = useState('');
  const [averageContainerType, setAverageContainerType] = useState('');

  const dispatch = useDispatch();
  let averageWater = useSelector((state) => state.averageWaterReducer);

  useEffect(() => {
    const unsubscribeAllWaterInfo = dispatch(fetchAverageWater(id));
    return () => {
      unsubscribeAllWaterInfo();
    };
  }, []);

  useEffect(() => {
    let totalTrueCount = 0;

    if (averageWater.length > 0) {
      averageWater.forEach((obj) => {
        const trueCount = obj.drank.filter(
          (innerObj) => innerObj.drank === true
        ).length;
        totalTrueCount += trueCount;
      });

      const average = totalTrueCount / averageWater.length;
      console.log(average);
      setAverageWater(Math.round(average));

      const counts = {
        Bottle: 0,
        Cup: 0,
      };

      averageWater.forEach((obj) => {
        if (obj.hasOwnProperty('type')) {
          const type = obj.type;
          if (type === 'Bottle' || type === 'Cup') {
            counts[type]++;
          }
        }
      });
      const total = counts.Bottle + counts.Cup;
      const averageBottle = counts.Bottle / total;
      const averageCup = counts.Cup / total;

      const averageContainerType =
        averageBottle > averageCup ? 'Bottle' : 'Cup';
      setAverageContainerType(averageContainerType);
    }
  }, [averageWater]);

  return (
    <div className='mt-2 mb-2 w-full'>
      <p className='text-[13px] uppercase text-blue-600 tracking-widest'>
        Average Water Intake:{' '}
        {averageWaterInfo ? (
          <span className='text-black font-bold'>{averageWaterInfo}</span>
        ) : (
          <span className='text-black font-bold'>0</span>
        )}
      </p>
      <p className='text-[13px] uppercase text-blue-600 tracking-widest'>
        Average Container Type:{' '}
        {averageContainerType.length ? (
          <span className='text-black font-bold'>{averageContainerType}</span>
        ) : (
          <span className='text-black font-bold'>No Type</span>
        )}
      </p>
    </div>
  );
}
