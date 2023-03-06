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
} from '../store';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Activity = ({ usersScores, date, userId }) => {
  const [streak, setStreak] = useState(0);
  const [checked, setChecked] = useState(false);
  const [todo, setTodo] = useState('');
  //   const [id, setId] = useState(0);

  const usersTodos = useSelector((state) => state.todosReducer);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheck = (id, bool) => {
    dispatch(toggleCheck(id, bool));
  };

  const handleDelete = (id) => {
    dispatch(deleteToDo(id));
  };

  const toggle = () => {
    setChecked(true);
    setTimeout(() => {
      setChecked(false);
    }, 400);
  };

  const handleSubmit = () => {
    // console.log(todo);
    const check = false;
    dispatch(addTodo(todo, date, userId, check));
    setTodo('');
  };

  //   const currentStreak = () => {
  //     let index = usersScores.length - 1;
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

  useEffect(() => {
    const unsubscribeTodos = dispatch(fetchTodos(userId));
    return () => {
      unsubscribeTodos();
    };
  }, []);

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

  useEffect(() => {
    dispatch(deleteOldTodos(usersTodos));
  }, [date]);

  return (
    <div
      className='bg-white shadow-xl rounded-lg h-full md:h-full lg:h-full'
      id='activity-div'
    >
      <h1 className='font-bold md:text-xl flex items-center p-3'>Activity</h1>
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
              {usersScores[usersScores.length - 1]?.date}
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
            <div className='mr-6 animate-bounce'>
              <TfiThought size={25} color='blue' />
            </div>
            <TextField
              label='To do list'
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
              {usersTodos.map((obj, i) => (
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

                    <h1>{obj.todo}</h1>
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
              className='flex items-center justify-center mt-[60px] tracking-widest text-gray-500'
            >
              Nothing for today
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
