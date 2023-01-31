/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/Authcontext';
import { fetchUser } from '../store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  FcTodoList,
  FcCheckmark,
  FcApproval,
  FcTimeline,
  FcComboChart,
} from 'react-icons/fc';
import BarChart from './BarChart';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [user, loading] = useAuthState(auth);
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  const userObject = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    setDate(new Date().toString().split(' ').splice(1, 3).join(' '));
    const unsubscribeUser = dispatch(fetchUser(user?.uid));
    return () => {
      unsubscribeUser();
    };
  }, [date, user, dispatch]);

  const arr = userObject.goals || [];
  const newGoals = arr
    .map((obj, i) => {
      if (obj.toggled) {
        return obj[`goal${i + 1}`];
      }
    })
    .filter((elem) => elem);
  const halfwayPoint = Math.ceil(newGoals.length / 2);
  let arrayFirstHalf = newGoals.slice(0, halfwayPoint);
  let arraySecondHalf = newGoals.slice(halfwayPoint, newGoals.length);

  return (
    <div className='w-full'>
      <div className='m-6 p-6 text-3xl font-bold tracking-widest'>
        {userObject.userName}'s Dashboard
      </div>
      <div className='grid lg:grid-cols-3 gap-8 p-6 items-center'>
        <div className='p-6 shadow-xl rounded-xl bg-white h-[100%] md:h-[80%] lg:h-[90%]'>
          <h1 className='font-extrabold md:text-xl flex items-center'>
            <FcTimeline className='p-2' size={38} />
            My Mood History
          </h1>
        </div>
        <div className='p-6 shadow-xl rounded-xl bg-white grid grid-cols-2 h-[100%] md:h-[80%] lg:h-[90%]'>
          <div className='w-[90%]'>
            <p className='text-sm md:text-sm text-gray-500'>{date}</p>
            <h1 className='font-extrabold md:text-xl flex items-center'>
              <FcCheckmark className='p-2' size={38} />
              Daily Check In
            </h1>
          </div>
          <div className='flex justify-end'>
            <button className='h-9 px-4 m-1 border bg-blue-600 text-white rounded-full uppercase text-sm tracking-widest w-[60%] duration-200 hover:scale-110 ease-in'>
              Start
            </button>
          </div>
        </div>
        <div className='p-6 shadow-xl rounded-xl bg-white h-[100%] md:h-[80%] lg:h-[90%]'>
          <div className='grid grid-cols-2'>
            <h1 className='font-extrabold md:text-xl flex items-center'>
              <FcTodoList className='p-2' size={45} />
              My Goals
            </h1>
            <div className='flex justify-end'>
              <button className='h-9 px-4 m-1 border bg-blue-600 text-white rounded-full uppercase text-sm tracking-widest w-[60%] duration-200 hover:scale-110 ease-in'>
                Edit
              </button>
            </div>
          </div>
          <div className='grid grid-cols-2'>
            <ul>
              {arrayFirstHalf.map((goal) => (
                <li key={goal} className='py-auto flex items-center'>
                  <FcApproval className='p-2' size={35} />
                  {goal}
                </li>
              ))}
            </ul>
            <ul>
              {arraySecondHalf.map((goal) => (
                <li key={goal} className='py-auto flex items-center'>
                  <FcApproval className='p-2' size={35} />
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 items-center'>
        <div className='bg-white shadow-xl rounded-lg col-span-2'>
          <div>
            <h1 className='font-bold md:text-xl flex items-center p-3'>
              <FcComboChart className='p-2' size={39} />
              Grading Progress
            </h1>
            <div className='p-6 sm:w-[90%] md:w-[80%]'>
              <BarChart />
            </div>
          </div>
        </div>
        <div className='bg-white shadow-xl rounded-lg'>
          <div>-</div>
          <div>-</div>
          <div>-</div>
          <div>-</div>
          <div>-</div>
          <div>-</div>
          <div>-</div>
          <div>-</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
