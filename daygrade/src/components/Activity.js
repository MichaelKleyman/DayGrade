import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DiCodeigniter } from 'react-icons/di';
import { TfiThought } from 'react-icons/tfi';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { addTodo, fetchTodos } from '../store';

const Activity = ({ usersScores, date, userId }) => {
  const [streak, setStreak] = useState(0);
  //   const [latestStreak, setLatestStreak] = useState(0);
  const [todo, setTodo] = useState('');

  const usersTodos = useSelector((state) => state.todosReducer);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = () => {
    // console.log(todo);
    dispatch(addTodo(todo, date, userId));
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

  return (
    <div
      className='bg-white shadow-xl rounded-lg h-full md:h-full lg:h-full'
      id='activity-div'
    >
      <h1 className='font-bold md:text-xl flex items-center p-3'>Activity</h1>
      <div className='mb-2'>
        {/* <button onClick={temp}>click me</button> */}
        {/* <button onClick={() => console.log(streak)}>click me</button> */}
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
            <div className='text-sm p-2 text-gray-500'>
              {usersScores[usersScores.length - 1]?.date}
            </div>
          </div>
        </div>
      </div>
      <div className='px-5 m-4 bg-[#F8F8FF] rounded-lg border border-gray-300 shadow-lg shadow-gray-600 h-[420px]'>
        <div className='sm:ml-3 md:ml-10 grid grid-cols-3 place-items-center pt-4'>
          {/* <div>1</div> */}
          <div className='col-span-2 flex'>
            <div className='mr-6'>
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
                <div key={i} className='pt-2'>
                  <h1>{obj.todo}</h1>
                </div>
              ))}
            </div>
          ) : (
            <div>None</div>
          )}
        </div>
      </div>
      {/* <div className='pt-4 flex items-start justify-between px-5 m-4 bg-[#F8F8FF] rounded-lg border border-gray-300 shadow-lg shadow-gray-600 h-[400px]'>
        <input className='w-[70%] border border-blue-600' autoFocus />
        <TfiThought size={25} color='blue' />
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
          }}
          noValidate
          autoComplete='off'
        >
          <div>
            <TextField
              label='To do list'
              id='outlined-size-small'
              size='small'
            />
          </div>
        </Box>
        <div className='pt-2'>
          <Button>Submit</Button>
        </div>
      </div> */}
    </div>
  );
};

export default Activity;
