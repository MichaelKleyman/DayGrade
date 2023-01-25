import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backgroundpic from '../images/Authpic.png';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Goals from './Goals';
import OtherInfo from './OtherInfo';
import SetPassword from './SetPassword';
import SignupInfo from './SignupInfo';

const Signup = () => {
  const [page, setPage] = useState(0);
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [userNameError, setUserNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [ageError, setAgeError] = useState(null);

  const formTitles = [
    'Lets get to know you!',
    'Thanks {firstName}! Now tell me your goals. Select 4 that resonate most with you.',
    'Third page',
    'Time to set your password.',
  ];

  const saveToDb = async () => {
    const updateDb = async () => {
      const newUser = doc(collection(db, 'Users'));
      await setDoc(
        newUser,
        {
          firstName,
          lastName,
          userName,
          email,
          age,
          created: serverTimestamp(),
        },
        { merge: true }
      );
    };
    await updateDb().catch(console.error);
  };

  const handleBack = () => {
    setPage((currPage) => currPage - 1);
  };

  const handleNext = () => {
    if (!firstName) {
      setFirstNameError('Please enter a first name');
    } else if (firstName) {
      setFirstNameError('');
    }
    if (!lastName) {
      setLastNameError('Please enter a last name');
    } else if (lastName) {
      setLastNameError('');
    }
    if (!userName) {
      setUserNameError('Please enter a username');
    } else if (userName) {
      setUserNameError('');
    }
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email');
    } else if (email.includes('@')) {
      setEmailError('');
    }
    if (isNaN(age) || !age) {
      setAgeError('Please enter an age');
    } else if (age && !isNaN(age)) {
      setAgeError('');
    }
    if (
      firstName &&
      lastName &&
      userName &&
      email.includes('@') &&
      !isNaN(age)
    ) {
      setPage((currPage) => currPage + 1);
    }
  };

  const pageDisplay = () => {
    if (page === 0) {
      return (
        <SignupInfo
          formTitles={formTitles}
          page={page}
          firstNameError={firstNameError}
          lastNameError={lastNameError}
          userNameError={userNameError}
          emailError={emailError}
          ageError={ageError}
          setFirst={setFirst}
          setLast={setLast}
          setUsername={setUsername}
          setEmail={setEmail}
          setAge={setAge}
          firstName={firstName}
          lastName={lastName}
          userName={userName}
          email={email}
          age={age}
        />
      );
    } else if (page === 1) {
      return <Goals firstName={firstName} />;
    } else if (page === 2) {
      return <OtherInfo />;
    } else {
      return <SetPassword />;
    }
  };

  return (
    <div className='grid grid-cols-1 h-screen w-full bg-black/80'>
      <img
        className='absolute w-full h-full object-cover mix-blend-overlay'
        src={Backgroundpic}
        alt='background'
      />
      <div className='flex flex-col justify-center z-[2]'>
        <form className='max-w-[400px] w-full mx-auto bg-white rounded-xl shadow-xl p-5'>
          <div>
            <div>{pageDisplay()}</div>
            <div className='flex justify-center w-full py-7'>
              {page === 0 ? (
                <Link to='/welcome' className='w-full mr-3'>
                  <Button
                    style={{
                      backgroundColor: 'white',
                      color: 'blue',
                      border: 'solid',
                      borderColor: 'blue',
                    }}
                    variant='contained'
                    className='py-3 w-full'
                  >
                    Back
                  </Button>
                </Link>
              ) : (
                <div className='w-full mr-3'>
                  <Button
                    style={{
                      backgroundColor: 'white',
                      color: 'blue',
                      border: 'solid',
                      borderColor: 'blue',
                    }}
                    variant='contained'
                    className='py-3 w-full'
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                </div>
              )}

              <Button
                variant='contained'
                className='py-3 w-full'
                onClick={handleNext}
              >
                {page === formTitles.length - 1 ? 'Sign In' : 'Next'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// {clickedNext && (
//   <div>
//     <h2 className='text-3xl font-bold text-center py-4'>
//       Thanks {firstName}! Now tell me your goals.
//     </h2>
//     <p className='text-center pb-4'>
//       Select 4 that resonate most with you.
//     </p>
//     <div className='grid grid-cols-1 gap-4'>
//       <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
//         <button>Commit fully to a routine</button>
//       </div>
//       <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
//         <button>Develop consistency</button>
//       </div>
//       <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
//         <button>Get more disciplined</button>
//       </div>
//       <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
//         <button>Maintain discipline</button>
//       </div>
//       <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
//         <button>Create a new healthy habit</button>
//       </div>
//       <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
//         <button>Achieve a personal goal</button>
//       </div>
//       <div className='p-3 border-2 border-gray-300 rounded-md flex items-center justify-center duration-300 hover:border-blue-600'>
//         <button>Force self accountability</button>
//       </div>
//     </div>
//   </div>
// )}
