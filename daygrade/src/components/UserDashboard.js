/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser, fetchAllScores } from '../store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/Authcontext';
import { useDispatch, useSelector } from 'react-redux';
import {
  FcTodoList,
  FcCheckmark,
  FcApproval,
  FcTimeline,
  FcComboChart,
  FcAdvance,
} from 'react-icons/fc';
import EditGoals from './EditGoals';
import LineChart from './LineChart';
import Activity from './Activity';
import ChartTooltip from './ChartTooltip';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Footer from './Footer';

const UserDashboard = () => {
  const [user, loading] = useAuthState(auth);
  const { currentUser, logout } = useAuth();
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userObject = useSelector((state) => state.loggedInUser);
  const usersScores = useSelector((state) => state.scoreReducer);
  const userName = userObject.userName || '';

  useEffect(() => {
    //photoURL is initially null
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  useEffect(() => {
    setDate(new Date().toString().split(' ').splice(1, 3).join(' '));
    const unsubscribeUser = dispatch(fetchUser(user?.uid));
    const unsubscribeUserScores = dispatch(fetchAllScores(user?.uid));
    return () => {
      unsubscribeUser();
      unsubscribeUserScores();
    };
  }, [date, user, dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const lastScore = usersScores[usersScores.length - 1] || '';
  const curDate = new Date();
  const lastCheckinDate = new Date(lastScore.date);
  const Difference_In_Time = curDate.getTime() - lastCheckinDate.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return (
    <div className='w-full' id='dash'>
      <div
        className='p-7 text-3xl font-bold tracking-widest flex items-center'
        id='dashboard-greeting'
      >
        {!photoURL.length ? (
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: 34,
              height: 34,
              fontSize: 20,
              margin: '4px',
            }}
          >
            {userName[0]}
          </Avatar>
        ) : (
          <img
            src={photoURL}
            alt='Avatar'
            className='w-[62px] h-[62px] rounded-lg'
          />
        )}
        <div className='ml-4'>{userObject.userName}'s Dashboard</div>
      </div>
      <div className='grid lg:grid-cols-3 gap-8 p-4 items-center'>
        <div
          className='p-6 shadow-xl rounded-xl h-[100%] md:h-[80%] lg:h-[90%] grid grid-cols-1 gap-8'
          id='search-div'
        >
          <h1 className='font-extrabold md:text-xl flex items-center justify-between'>
            <div className='flex text-center'>
              <FcTimeline className='p-2' size={38} />
              Search Logs
            </div>
            <button
              onClick={() => navigate(`search/logs/${currentUser.uid}`)}
              className='font-normal h-9 ml-10 border bg-blue-600 hover:bg-blue-300 text-white rounded-lg uppercase text-sm tracking-widest w-[40%] duration-200 hover:scale-110 ease-in'
            >
              Search
            </button>
          </h1>
          <h1 className='text-blue-400 text-sm mb-2'>
            Take a look at your previous logs by searching a key word.
          </h1>
        </div>
        <div
          className='p-6 shadow-xl rounded-xl  grid grid-cols-2 h-[100%] md:h-[80%] lg:h-[90%]'
          id='log-div'
        >
          <div className='w-[90%]'>
            <p className='text-sm md:text-sm text-gray-500'>{date}</p>
            <h1 className='font-extrabold md:text-xl flex items-center'>
              <FcCheckmark className='p-2' size={38} />
              Daily Check In
            </h1>
          </div>
          <div className='flex justify-end'>
            <button
              onClick={() => navigate('/checkin')}
              className='h-9 px-4 m-1 border bg-blue-600 hover:bg-blue-300 text-white rounded-lg uppercase text-sm tracking-widest w-[60%] duration-200 hover:scale-110 ease-in'
            >
              Start
            </button>
          </div>
          <div
            id='last-checkin'
            className='grid grid-cols-3 gap-4 place-items-center text-blue-400'
          >
            <p className='text-sm'>Last check in</p>
            <div className='ml-6'>
              <FcAdvance className='p-2 mx-2' size={38} />
            </div>
            <div>
              <div className='text-sm'>
                {usersScores.length !== 0 ? (
                  <div>
                    {Math.floor(Difference_In_Days) >= 1 &&
                      Math.floor(Difference_In_Days)}
                    {Math.floor(Difference_In_Days) > 1
                      ? ' days ago'
                      : `${
                          Math.floor(Difference_In_Days) === 0
                            ? ' Today'
                            : ' day ago'
                        }`}
                  </div>
                ) : (
                  'None yet'
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className='p-6 shadow-xl rounded-xl  h-[100%] md:h-[80%] lg:h-[90%]'
          id='goal-div'
        >
          <div className='grid grid-cols-2'>
            <h1 className='font-extrabold md:text-xl flex items-center'>
              <FcTodoList className='p-2' size={45} />
              My Goals
            </h1>
            <div className='flex justify-end'>
              <button
                onClick={handleClickOpen}
                className='h-9 px-4 m-1 border bg-blue-600 hover:bg-blue-300 text-white rounded-lg uppercase text-sm tracking-widest w-[60%] duration-200 hover:scale-110 ease-in'
              >
                Edit
              </button>
              <EditGoals
                handleClose={handleClose}
                open={open}
                userGoals={arr}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 text-blue-400'>
            <ul>
              {arrayFirstHalf.map((goal) => (
                <li key={goal} className='py-auto flex items-center text-sm'>
                  <FcApproval className='p-2' size={35} />
                  {goal}
                </li>
              ))}
            </ul>
            <ul>
              {arraySecondHalf.map((goal) => (
                <li key={goal} className='py-auto flex items-center text-sm'>
                  <FcApproval className='p-2' size={35} />
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 items-center'>
        <div className='shadow-xl rounded-lg col-span-2 h-full' id='chart-div'>
          <div>
            <div>
              <h1 className='font-bold md:text-xl flex items-center p-2'>
                <FcComboChart className='p-2' size={39} />
                Grading Progress
                <ChartTooltip />
              </h1>
            </div>
            <div className='p-6 sm:w-[90%] md:w-[100%]'>
              {/* <BarChart /> */}
              {/* {<TempChart />} */}
              <LineChart />
            </div>
          </div>
        </div>
        <Activity usersScores={usersScores} date={date} userId={user?.uid} />
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
