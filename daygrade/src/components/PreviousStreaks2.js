/* eslint-disable react-hooks/exhaustive-deps */
import '../styles.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllScores } from '../store';
import Tooltip from '@mui/material/Tooltip';

export default function PreviousStreaks2() {
  const [heatMapValues, setHeatMap] = useState({});
  const [allCheckInValues, setAllCheckIn] = useState({});
  const [longestStreak, setLongestStreak] = useState(0);
  const [hover] = useState(true);
  const { id, streak } = useParams();
  const dispatch = useDispatch();
  const usersScores = useSelector((state) => state.scoreReducer);

  useEffect(() => {
    const unsubscribeUserScores = dispatch(fetchAllScores(id));
    return () => {
      unsubscribeUserScores();
    };
  }, []);

  useEffect(() => {
    const specificCheckIns = {};
    const allCheckIns = {};
    usersScores.forEach((scoreObj, i) => {
      const createdAtDate = scoreObj?.createdAt;
      const lastCheckinCreatedAt = new Date(
        createdAtDate.seconds * 1000 //converting seconds to milliseconds
      );
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = lastCheckinCreatedAt
        .toLocaleDateString('en-US', options)
        .replace(',', '');
      allCheckIns[scoreObj?.date.split(', ')[1]] = 2;
      if (formattedDate === scoreObj?.date.split(', ')[1]) {
        specificCheckIns[formattedDate] = 1;
      }
    });

    const startYear = 2023;
    const startDate = new Date(startYear, 0, 1); // January 1st of the start year
    const result1 = {};
    const result2 = {};

    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(startDate.getFullYear(), 0, i + 1);
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      const formattedDate = currentDate
        .toLocaleDateString('en-US', options)
        .replace(',', '');
      let streakDates = Object.keys(specificCheckIns);
      let checkInDates = Object.keys(allCheckIns);
      // console.log(checkInDates.length);
      if (streakDates.includes(formattedDate)) {
        result1[formattedDate] = 1;
      } else {
        let todaysDate = new Date();
        let otherDate = new Date(formattedDate);
        if (otherDate > todaysDate) {
          result1[formattedDate] = -1;
        } else {
          result1[formattedDate] = 0;
        }
      }

      if (checkInDates.includes(formattedDate)) {
        result2[formattedDate] = 2;
      } else {
        let todaysDate = new Date();
        let otherDate = new Date(formattedDate);
        if (otherDate > todaysDate) {
          result2[formattedDate] = -1;
        } else {
          result2[formattedDate] = 0;
        }
      }

      let currentStreak = 1;
      let longestStreak = 1;

      for (let i = 1; i < streakDates.length; i++) {
        const currentDate = new Date(streakDates[i]);
        const previousDate = new Date(streakDates[i - 1]);

        const timeDifference = currentDate.getTime() - previousDate.getTime();
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

        if (timeDifference === oneDay) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }

        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      }

      setLongestStreak(longestStreak);
    }

    setHeatMap(result1);
    setAllCheckIn(result2);
  }, []);

  return (
    <div>
      <h1
        className='m-10 text-[2rem] text-blue-600 tracking-widest'
        id='streak-title'
      >
        Check-in Streak History
      </h1>
      <div className='flex items-start gap-7 ml-11'>
        <div
          id='current-streak-box'
          className='flex items-center justify-between text-white tracking-wide text-[15px] bg-gray-300 p-2 rounded-lg'
        >
          <p>Current streak: </p>
          <p className='text-blue-600 text-xl ml-2'> {streak} days</p>
        </div>
        <div
          id='longest-streak-box'
          className='flex items-center justify-between text-white tracking-wide text-[15px] bg-gray-300 p-2 rounded-lg'
        >
          <p>Longest streak: </p>
          <span className='text-blue-600 text-xl ml-2'>
            {longestStreak} days
          </span>
        </div>
      </div>
      <div className='shadow-lg shadow-gray-400 rounded-lg m-4'>
        <h1 className='p-5 tracking-wide text-xl text-blue-600'>
          Active Streak Heatmap
        </h1>
        <div className='graph'>
          <ul className='months'>
            <li>Jan</li>
            <li>Feb</li>
            <li>Mar</li>
            <li>Apr</li>
            <li>May</li>
            <li>Jun</li>
            <li>Jul</li>
            <li>Aug</li>
            <li>Sep</li>
            <li>Oct</li>
            <li>Nov</li>
            <li>Dec</li>
          </ul>
          <ul className='days'>
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul className='squares'>
            {Object.keys(heatMapValues).map((elem, i) => (
              <Tooltip title={`${hover ? elem : ''}`} key={i}>
                <li
                  data-level={`${heatMapValues[elem]}`}
                  className='cursor-pointer hover:scale-110 duration-300'
                ></li>
              </Tooltip>
            ))}
          </ul>
        </div>
      </div>

      <div className='shadow-lg shadow-gray-400 rounded-lg m-4'>
        <h1 className='p-5 tracking-wide text-xl text-blue-600'>
          Final Grade Heatmap
        </h1>
        <div className='graph'>
          <ul className='months'>
            <li>Jan</li>
            <li>Feb</li>
            <li>Mar</li>
            <li>Apr</li>
            <li>May</li>
            <li>Jun</li>
            <li>Jul</li>
            <li>Aug</li>
            <li>Sep</li>
            <li>Oct</li>
            <li>Nov</li>
            <li>Dec</li>
          </ul>
          <ul className='days'>
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul className='squares'>
            {Object.keys(allCheckInValues).map((elem, i) => (
              <Tooltip title={`${hover ? elem : ''}`} key={i}>
                <li
                  data-level={`${allCheckInValues[elem]}`}
                  className='cursor-pointer hover:scale-110 duration-300'
                ></li>
              </Tooltip>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
