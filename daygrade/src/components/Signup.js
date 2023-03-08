/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backgroundpic from '../images/Authpic.png';
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/Authcontext';
import { getAuth } from 'firebase/auth';
import Goals from './Goals';
import SetPassword from './SetPassword';
import SignupInfo from './SignupInfo';

const Signup = () => {
  const [page, setPage] = useState(0);
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [goals, setGoals] = useState({
    goalsArr: [
      { goal1: 'Commit fully to a routine', toggled: false },
      { goal2: 'Develop consistency', toggled: false },
      { goal3: 'Get more disciplined', toggled: false },
      { goal4: 'Maintain discipline', toggled: false },
      { goal5: 'Create a new healthy habit', toggled: false },
      { goal6: 'Achieve a personal goal', toggled: false },
      { goal7: 'Force self accountability', toggled: false },
    ],
  });

  const [clicked, setClicked] = useState({
    clicked1: false,
    clicked2: false,
    clicked3: false,
    clicked4: false,
    clicked5: false,
    clicked6: false,
    clicked7: false,
  });
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [userNameError, setUserNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [ageError, setAgeError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmedPasswordError, setConfirmedPasswordError] = useState(null);
  const [goalsError, setGoalsError] = useState(null);

  const { signUp, currentUser } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  const formTitles = [
    'Lets get to know you!',
    'Thanks {firstName}! Now tell me your goals. Select any that resonate most with you.',
    'Time to set your password.',
  ];

  const saveToDb = async () => {
    const updateDb = async () => {
      const user = auth.currentUser;
      await setDoc(
        doc(db, 'Users', user.uid),
        {
          firstName,
          lastName,
          userName,
          email,
          age,
          goals: goals.goalsArr,
          password,
          created: serverTimestamp(),
        },
        { merge: true }
      );
    };
    await updateDb().catch(console.error);
  };

  const handleSignIn = async () => {
    try {
      if (
        password.length >= 6 &&
        password &&
        confirmedPassword &&
        password === confirmedPassword
      ) {
        await signUp(email, password);
        saveToDb();
      }
    } catch (e) {
      setConfirmedPasswordError('Email already in use.');
    }
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

  const handlePassword = () => {
    if (!password) {
      setPasswordError('Please enter a valid password.');
    } else if (password) {
      setPasswordError('');
    }
    if (!confirmedPassword) {
      setConfirmedPasswordError('Please re-enter your password.');
    } else if (confirmedPassword) {
      setConfirmedPasswordError('');
    }
    if (password.length < 6) {
      setPasswordError('Minimum 6 character password required.');
    } else if (password.length >= 6) {
      setPasswordError('');
    }
    if (confirmedPassword !== password) {
      setConfirmedPasswordError('Passwords do not match.');
    } else if (confirmedPassword === password) {
      setConfirmedPasswordError('');
    }
  };

  const handleGoals = () => {
    for (let i = 0; i < goals.goalsArr.length; i++) {
      let curGoal = goals.goalsArr[i];
      if (curGoal.toggled) {
        return true;
      }
    }
    setGoalsError('Choose at least one goal');
  };

  const pageDisplay = () => {
    if (page === 0) {
      return (
        <SignupInfo
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
      return (
        <Goals
          firstName={firstName}
          goals={goals}
          setGoals={setGoals}
          clicked={clicked}
          setClicked={setClicked}
          goalsError={goalsError}
        />
      );
    } else {
      return (
        <SetPassword
          passwordError={passwordError}
          setPasswordError={setPasswordError}
          confirmedPasswordError={confirmedPasswordError}
          setConfirmedPasswordError={setConfirmedPasswordError}
          password={password}
          setPassword={setPassword}
          confirmedPassword={confirmedPassword}
          setConfirmedPassword={setConfirmedPassword}
        />
      );
    }
  };

  return (
    <div className='grid grid-cols-1 h-screen w-full bg-black/80' id='signin'>
      {/* <img
        className='absolute w-full h-full object-cover mix-blend-overlay'
        src={Backgroundpic}
        alt='background'
      /> */}
      <div className='flex flex-col justify-center z-[2]'>
        <form id='signup' className='max-w-[400px] w-full mx-auto bg-white rounded-xl shadow-xl p-5'>
          <div>
            <div id='signin-pages'>{pageDisplay()}</div>
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
              {page !== 2 ? (
                <Button
                  variant='contained'
                  className='py-3 w-full'
                  onClick={() => {
                    page === 1 ? handleGoals() && handleNext() : handleNext();
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant='contained'
                  className='py-3 w-full'
                  onClick={async () => {
                    handlePassword();
                    await handleSignIn();
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
