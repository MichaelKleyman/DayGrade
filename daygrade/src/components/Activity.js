/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DiCodeigniter } from 'react-icons/di';
import { TfiThought } from 'react-icons/tfi';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import {
  addTodo,
  fetchTodos,
  toggleCheck,
  deleteToDo,
  deleteOldTodos,
  fetchSpecificTodos,
  restoreYesterdaysTodos,
} from '../store';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ActivityTooltip from './ActivityTooltip';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Activity = ({ usersScores, date, userId }) => {
  const [streak, setStreak] = useState(0);
  const [checked, setChecked] = useState(false);
  const [todo, setTodo] = useState('');
  const [restore, setRestore] = useState('');
  const [restoreClicked, setRestoreClicked] = useState(false);
  const navigate = useNavigate();

  const usersTodos = useSelector((state) => state.todosReducer);

  const dispatch = useDispatch();

  const handleRestore = (restoreOption) => {
    console.log(restoreOption);
    if (restoreOption === 'Yes') {
      setRestore(restoreOption);
      setRestoreClicked(true);
      const yesterdaysDate = dayjs().subtract(1, 'day');
      const unsubscribeSpecificTodos = dispatch(
        restoreYesterdaysTodos(
          userId,
          new Date(yesterdaysDate).toString().split(' ').splice(1, 3).join(' '),
          date
        )
      );
      return () => {
        unsubscribeSpecificTodos();
      };
    } else {
      setRestore(restoreOption);
      setRestoreClicked(true);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheck = (id, bool) => {
    dispatch(toggleCheck(id, bool));
  };

  const handleDelete = (id) => {
    dispatch(deleteToDo(id));
  };

  const handlePreviousStreaksRouting = () => {
    navigate(`/previous-streaks/${userId}/${streak}`);
  };

  const handlePreviousAgendaRouting = () => {
    navigate(`/previous-agendas/${userId}`);
  };

  const toggle = () => {
    setChecked(true);
    setTimeout(() => {
      setChecked(false);
    }, 400);
  };

  const handleSubmit = () => {
    const check = false;
    dispatch(addTodo(todo, date, userId, check));
    setTodo('');
  };

  useEffect(() => {
    const unsubscribeSpecificTodos = dispatch(fetchSpecificTodos(userId, date));
    return () => {
      unsubscribeSpecificTodos();
    };
  }, [date]);

  useEffect(() => {
    const specificCheckIns = {};
    usersScores.forEach((scoreObj, i) => {
      const createdAtDate = scoreObj?.createdAt;
      const lastCheckinCreatedAt = new Date(
        createdAtDate?.seconds * 1000 //converting seconds to milliseconds
      );
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = lastCheckinCreatedAt
        .toLocaleDateString('en-US', options)
        .replace(',', '');
      if (formattedDate === scoreObj?.date.split(', ')[1]) {
        specificCheckIns[formattedDate] = 1;
      }
    });
    let streakDates = Object.keys(specificCheckIns);
    let currentStreak = 1;

    const targetDate = new Date(streakDates[streakDates.length - 1]);
    const timeDiff = targetDate.getTime() - new Date().getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(Math.abs(daysDiff));
    if (Math.abs(daysDiff) > 1) {
      currentStreak = 0;
    } else {
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
      }
    }
    setStreak(currentStreak);
  }, [usersScores]);

  return (
    <div
      className='shadow-xl rounded-lg h-full md:h-full lg:h-full'
      id='activity-div'
    >
      <div className='font-bold md:text-xl grid grid-cols-2 place-content-center p-3'>
        <div className='flex'>
          <div>
            <ActivityTooltip />
          </div>
          <p>Activity</p>
        </div>
      </div>
      <div className='flex items-center justify-evenly m-2 gap-2'>
        <button
          onClick={handlePreviousStreaksRouting}
          className='p-2 w-[40%] hover:scale-110 duration-300 rounded-lg hover:text-white tracking-widest font-normal text-[12px] cursor-pointer uppercase bg-blue-600 text-white hover:bg-blue-200'
        >
          Previous Streaks
        </button>
        <button
          onClick={handlePreviousAgendaRouting}
          className='p-2 w-[40%] hover:scale-110 duration-300 rounded-lg hover:text-white tracking-widest font-normal text-[12px] cursor-pointer uppercase  bg-blue-600 text-white hover:bg-blue-200'
        >
          Previous Agendas
        </button>
      </div>
      <div className='mb-2'>
        <div
          id='top-activity'
          className='flex items-center justify-between px-5 m-4 rounded-lg border border-gray-300 shadow-lg shadow-gray-600 '
        >
          <div>
            <DiCodeigniter size={35} color='red' />
          </div>
          <div className='m-4 p-3 font-sans w-full'>
            <h1
              id='current-streak'
              className='uppercase tracking-wide text-gray-500 col-span-2 text-sm'
            >
              Current Streak
            </h1>
            <h1 className='font-bold text-lg'>{streak} days</h1>
          </div>
          <div id='latest' className='bg-gray-200 rounded-xl w-full'>
            <div className='uppercase tracking-wide text-black text-sm p-2'>
              Latest
            </div>
            <div className='text-sm p-2 text-gray-500'>
              {usersScores.length ? (
                usersScores[usersScores.length - 1]?.date
              ) : (
                <div className='text-center relative bottom-3 animate-spin'>
                  <HourglassEmptyIcon />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        id={`${checked ? 'checked-activity' : 'bottom-activity'}`}
        className={`px-5 m-4 rounded-lg border border-gray-300 shadow-lg shadow-gray-600 h-[420px] overflow-y-scroll`}
      >
        <div className='sm:ml-3 md:ml-10 grid grid-cols-3 place-items-center pt-4'>
          {/* <div>1</div> */}
          <div className='col-span-2 flex'>
            <div className='mr-6 animate-pulse'>
              <TfiThought size={25} color='blue' />
            </div>
            <TextField
              label='Todays agenda'
              size='small'
              id='todo-search'
              value={todo}
              onChange={handleChange}
            />
          </div>
          <div className='ml-12'>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
        <div>
          {usersTodos.length ? (
            <div>
              {usersTodos?.map((obj, i) => (
                <div key={i} className='flex items-center justify-between pt-3'>
                  <div className='flex items-center'>
                    {obj.completed ? (
                      <ImCheckboxChecked
                        color='blue'
                        className='p-3 duration-300 hover:scale-110 cursor-pointer'
                        size={45}
                        onClick={() => {
                          handleCheck(obj.id, !obj.completed);
                          toggle();
                        }}
                      />
                    ) : (
                      <ImCheckboxUnchecked
                        className='p-3 duration-300 hover:scale-110 cursor-pointer'
                        size={45}
                        onClick={() => {
                          handleCheck(obj.id, !obj.completed);
                          toggle();
                        }}
                      />
                    )}

                    <h1 className='p-2 h-[50px] w-[90%] overflow-y-scroll text-[15px]'>
                      {obj.todo}
                    </h1>
                  </div>

                  <div className='float-right hover:text-blue-600'>
                    <DeleteOutlineOutlinedIcon
                      className={`duration-300 hover:scale-110`}
                      onClick={() => handleDelete(obj.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              id='empty'
              className='flex items-center justify-center mt-[60px] tracking-widest'
            >
              {!restoreClicked && (
                <div className='text-blue-500'>
                  <p>Restore yesterdays agenda?</p>
                  <div className='flex items-center justify-center'>
                    <button
                      onClick={() => handleRestore('Yes')}
                      className='uppercase tracking-wide px-2 text-sm my-2 bg-gray-200 p-1 mx-2 rounded-sm hover:bg-blue-500 hover:text-white hover:scale-110 duration-300'
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleRestore('No')}
                      className='uppercase tracking-wide px-2 text-sm my-2 bg-gray-200 p-1 mx-2 rounded-sm hover:bg-blue-500 hover:text-white hover:scale-110 duration-300'
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
              {restore === 'Yes' && (
                <div className='text-center'>
                  No agenda found from yesterday. Make an agenda today!
                </div>
              )}
              {restore === 'No' && <div>Nothing for today.</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;

//   const currentStreak = () => {
//     let lastIndex = usersScores.length - 1;
//     let today = new Date();
//     let latestDate = usersScores[usersScores.length - 1].date;
//     latestDate = new Date(latestDate);
//     let differenceInTime = today.getTime() - latestDate.getTime();
//     let daysSinceLastCheckin = differenceInTime / (1000 * 3600 * 24);
//     let differenceInDays = 0;
//     if (daysSinceLastCheckin < 2) {
//       console.log('there is a streak');
//       setStreak(Math.floor(daysSinceLastCheckin));
//       let counter = 0;
//       for (let i = usersScores.length - 1; i >= 0; i--) {
//         latestDate =
//           i === index
//             ? usersScores[usersScores.length - 1].date
//             : usersScores[i + 1].date;
//         let scoreDate = usersScores[i].date; //current date in the score obj
//         let timeDifference =
//           new Date(latestDate).getTime() - new Date(scoreDate).getTime();
//         differenceInDays = timeDifference / (1000 * 3600 * 24); //difference between the the current date and the date before it
//         if (differenceInDays <= 1) {
//           //if that difference is less than or greater than 1, then there is a streak
//           //   console.log(differenceInDays);
//           counter++;
//           setStreak(counter);
//         } else {
//           //   console.log(differenceInDays);
//           //   setStreak(0);
//           break;
//         }
//       }
//     }
//   };
