import React, { useState, useEffect } from 'react';
import { DiCodeigniter } from 'react-icons/di';

const Activity = ({ usersScores }) => {
  const [streak, setStreak] = useState(0);
  const [latestStreak, setLatestStreak] = useState(0);

  const currentStreak = () => {
    let index = usersScores.length - 1;
    let today = new Date();
    let latestDate = usersScores[usersScores.length - 1].date;
    latestDate = new Date(latestDate);
    let differenceInTime = today.getTime() - latestDate.getTime();
    let daysSinceLastCheckin = differenceInTime / (1000 * 3600 * 24);
    let differenceInDays = 0;
    if (daysSinceLastCheckin < 2) {
      console.log('there is a streak');
      setStreak(Math.floor(daysSinceLastCheckin));
      let counter = 0;
      for (let i = usersScores.length - 1; i >= 0; i--) {
        latestDate =
          i === index
            ? usersScores[usersScores.length - 1].date
            : usersScores[i + 1].date;
        let scoreDate = usersScores[i].date; //current date in the score obj
        let timeDifference =
          new Date(latestDate).getTime() - new Date(scoreDate).getTime();
        differenceInDays = timeDifference / (1000 * 3600 * 24); //difference between the the current date and the date before it
        if (differenceInDays <= 1) {
          //if that difference is less than or greater than 1, then there is a streak
          //   console.log(differenceInDays);
          counter++;
          setStreak(counter);
        } else {
          //   console.log(differenceInDays);
          //   setStreak(0);
          break;
        }
      }
    }
  };

  useEffect(() => {
    let index = usersScores.length - 1;
    let today = new Date();
    let latestDate = usersScores[usersScores.length - 1]?.date;
    latestDate = new Date(latestDate);
    let differenceInTime = today.getTime() - latestDate.getTime();
    let daysSinceLastCheckin = differenceInTime / (1000 * 3600 * 24);
    let differenceInDays = 0;
    if (daysSinceLastCheckin < 2) {
      //   console.log('there is a streak');
      setStreak(Math.floor(daysSinceLastCheckin));
      let counter = 0;
      for (let i = usersScores.length - 1; i >= 0; i--) {
        latestDate =
          i === index
            ? usersScores[usersScores.length - 1].date
            : usersScores[i + 1].date;
        let scoreDate = usersScores[i].date; //current date in the score obj
        let timeDifference =
          new Date(latestDate).getTime() - new Date(scoreDate).getTime();
        differenceInDays = timeDifference / (1000 * 3600 * 24); //difference between the the current date and the date before it
        if (differenceInDays <= 1) {
          //if that difference is less than or greater than 1, then there is a streak
          //   console.log(differenceInDays);
          counter++;
          setStreak(counter);
        } else {
          //   console.log(differenceInDays);
          //   setStreak(0);
          break;
        }
      }
    }
  }, [usersScores]);

  return (
    <div
      className='bg-white shadow-xl rounded-lg h-full md:h-full lg:h-full'
      id='activity-div'
    >
      <h1 className='font-bold md:text-xl flex items-center p-3'>Activity</h1>
      <div>
        {/* <button onClick={currentStreak}>click me</button>
        <button onClick={() => console.log(streak)}>click me</button> */}
        <div className='flex items-center justify-between px-5 m-4 bg-[#F8F8FF] rounded-lg border border-gray-300 shadow-lg shadow-gray-600 '>
          <div>
            <DiCodeigniter size={35} color='red' />
          </div>
          <div className='m-4 p-3 font-sans'>
            <h1 className='uppercase tracking-wide text-gray-500 col-span-2'>
              Current Streak
            </h1>
            <h1 className='font-bold text-lg'>{streak} days</h1>
          </div>
          <div className='bg-gray-200 rounded-xl'>
            <div className='uppercase tracking-wide text-black text-sm p-2'>
              Latest
            </div>
            <div className='text-sm p-2'>
              {usersScores[usersScores.length - 1]?.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
