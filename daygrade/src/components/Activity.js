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
    navigate(`/previous-streaks/${userId}`);
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
    //usersScores is all the final check-ins of the user, coming from the database, in ascending order by date
    const lastIndex = usersScores.length - 1; //index of the most recent check in, which is the last index
    // const lastCheckinCreatedAt = usersScores[lastIndex]?.createdAt;
    const lastCheckinCreatedAt = new Date(
      usersScores[lastIndex]?.createdAt.seconds * 1000 //converting seconds to milliseconds
    );
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = lastCheckinCreatedAt
      .toLocaleDateString('en-US', options)
      .replace(',', '');

    if (formattedDate === usersScores[lastIndex]?.date.split(', ')[1]) {
      //makes sure the current date matches the date the checkin was created, so the streak is accurate.
      const today = new Date(); //todays date
      let latestDate = usersScores[usersScores.length - 1]?.date; //latest date out of all the users checked in scores which is the lastIndex because firebase sorted it in ascending order.
      latestDate = new Date(latestDate); //set latest date to the same format as todays date
      let differenceInTime = today.getTime() - latestDate.getTime(); //get both those variables in milliseconds and track the difference
      let daysSinceLastCheckin = differenceInTime / (1000 * 3600 * 24); //how many days since the last check in, should be at most one day since the last checkin to maintain a streak
      let differenceInDays = 0;
      if (daysSinceLastCheckin < 2) {
        //This means there is a streak;
        setStreak(Math.floor(daysSinceLastCheckin)); //state keeping track of the streak
        let counter = 0;
        for (let i = usersScores.length - 1; i >= 0; i--) {
          //looping through all the scores, with the last index being the latest check in due to firebase sorting it in ascending order (from oldest to newest)
          latestDate =
            i === lastIndex
              ? usersScores[usersScores.length - 1].date //if the current index is equal to the last index in the array, we look at that date
              : usersScores[i + 1].date; //else look at the date in front of the current date were looking at, so the following index
          let currentScoreDate = usersScores[i].date; //current date in the score obj
          let timeDifference =
            new Date(latestDate).getTime() -
            new Date(currentScoreDate).getTime();
          differenceInDays = timeDifference / (1000 * 3600 * 24); //difference between the the current date and the date before it (reassigning the original differenceInDays variable)
          if (differenceInDays <= 1) {
            //checking if the check-ins were looking at are consecutive, if so this if condition gets hit
            //if that difference is less than or equal to 1, then there is a streak
            counter++;
            setStreak(counter); //sets the state keeping track of the streak
          } else {
            break; //break out of the loop as soon as the difference in days between each checkin is greater than 1
          }
        }
      }
    }
  }, [usersScores]);

  // useEffect(() => {
  //   dispatch(deleteOldTodos(usersTodos));
  // }, [date]);

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
        <button onClick={handlePreviousStreaksRouting} className='p-2 w-[40%] hover:scale-110 duration-300 rounded-lg hover:text-white tracking-widest font-normal text-[12px] cursor-pointer uppercase bg-blue-600 text-white hover:bg-blue-200'>
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

                    <h1 className='p-2 h-[50px] w-[90%] overflow-y-scroll'>
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
