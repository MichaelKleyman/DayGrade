import React from 'react';

const Goals = ({
  firstName,
  goals,
  setGoals,
  clicked,
  setClicked,
  goalsError,
}) => {
  function toggleGoal(goal, goalNum) {
    let arrayCopy = [...goals.goalsArr];
    for (let i = 0; i < arrayCopy.length; i++) {
      for (let key in arrayCopy[i]) {
        if (key === goalNum) {
          if (arrayCopy[i].toggled) {
            arrayCopy[i].toggled = false;
            // arrayCopy[i][key] = goal;
          } else {
            arrayCopy[i].toggled = true;
            // arrayCopy[i][key] = goal;
          }
        }
      }
    }
    setGoals({ goalsArr: arrayCopy });
  }

  return (
    <div>
      <h2 id='signup-goals' className='text-3xl font-bold text-center py-4'>
        Thanks {firstName}! Now tell me your goals.
      </h2>
      <p className='text-center pb-4 text-gray-400'>
        Select any that resonate most with you.
      </p>
      <div className='grid grid-cols-1 gap-4'>
        <div
          onClick={(e) => {
            e.preventDefault();
            toggleGoal('Commit fully to a routine', 'goal1');
            setClicked({ ...clicked, clicked1: !clicked.clicked1 });
          }}
          className={`p-3 border-2 ${
            clicked.clicked1 === true
              ? 'border-blue-600 font-bold text-blue-600'
              : 'border-gray-300'
          } rounded-md flex items-center justify-center duration-300 ${
            clicked.clicked1 === false
              ? 'hover:border-blue-300 font-normal'
              : ''
          }`}
        >
          <button className='goal'>Commit fully to a routine</button>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            toggleGoal('Develop consistency', 'goal2');
            setClicked({ ...clicked, clicked2: !clicked.clicked2 });
          }}
          className={`p-3 border-2 ${
            clicked.clicked2 === true
              ? 'border-blue-600 font-bold text-blue-600'
              : 'border-gray-300'
          } rounded-md flex items-center justify-center duration-300 ${
            clicked.clicked2 === false
              ? 'hover:border-blue-300 font-normal'
              : ''
          }`}
        >
          <button className='goal'>Develop consistency</button>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            toggleGoal('Get more disciplined', 'goal3');
            setClicked({ ...clicked, clicked3: !clicked.clicked3 });
          }}
          className={`p-3 border-2 ${
            clicked.clicked3 === true
              ? 'border-blue-600 font-bold text-blue-600'
              : 'border-gray-300'
          } rounded-md flex items-center justify-center duration-300 ${
            clicked.clicked3 === false
              ? 'hover:border-blue-300 font-normal'
              : ''
          }`}
        >
          <button className='goal'>Get more disciplined</button>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            toggleGoal('Maintain discipline', 'goal4');
            setClicked({ ...clicked, clicked4: !clicked.clicked4 });
          }}
          className={`p-3 border-2 ${
            clicked.clicked4 === true
              ? 'border-blue-600 font-bold text-blue-600'
              : 'border-gray-300'
          } rounded-md flex items-center justify-center duration-300 ${
            clicked.clicked4 === false
              ? 'hover:border-blue-300 font-normal'
              : ''
          }`}
        >
          <button className='goal'>Maintain discipline</button>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            toggleGoal('Create a new healthy habit', 'goal5');
            setClicked({ ...clicked, clicked5: !clicked.clicked5 });
          }}
          className={`p-3 border-2 ${
            clicked.clicked5 === true
              ? 'border-blue-600 font-bold text-blue-600'
              : 'border-gray-300'
          } rounded-md flex items-center justify-center duration-300 ${
            clicked.clicked5 === false
              ? 'hover:border-blue-300 font-normal'
              : ''
          }`}
        >
          <button className='goal'>Create a new healthy habit</button>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            toggleGoal('Achieve a personal goal', 'goal6');
            setClicked({ ...clicked, clicked6: !clicked.clicked6 });
          }}
          className={`p-3 border-2 ${
            clicked.clicked6 === true
              ? 'border-blue-600 font-bold text-blue-600'
              : 'border-gray-300'
          } rounded-md flex items-center justify-center duration-300 ${
            clicked.clicked6 === false
              ? 'hover:border-blue-300 font-normal'
              : ''
          }`}
        >
          <button className='goal'>Achieve a personal goal</button>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            toggleGoal('Force self accountability', 'goal7');
            setClicked({ ...clicked, clicked7: !clicked.clicked7 });
          }}
          className={`p-3 border-2 ${
            clicked.clicked7 === true
              ? 'border-blue-600 font-bold text-blue-600'
              : 'border-gray-300'
          } rounded-md flex items-center justify-center duration-300 ${
            clicked.clicked7 === false
              ? 'hover:border-blue-300 font-normal'
              : ''
          }`}
        >
          <button className='goal'>Force self accountability</button>
        </div>
        {goalsError && (
          <div className='w-full text-rose-500 flex items-center justify-center'>
            {goalsError}
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
