import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Checkin from './components/Checkin';
import Temp from './components/TempCalendar';
import UsersAccount from './components/UsersAccount';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='welcome' element={<Welcome />} />
      <Route path='signup' element={<Signup />} />
      <Route path='checkin' element={<Temp />} />
      <Route path='users/account' element={<UsersAccount />} />
      {/* <Route path='temp' element={<Temp />} /> */}
    </Routes>
  );
};

export default MyRoutes;
