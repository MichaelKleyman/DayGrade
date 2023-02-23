import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Checkin from './components/Checkin';
import Temp from './components/TempCalendar';
import UsersAccount from './components/UsersAccount';
import Search from './components/Search';
import NotFound from './components/NotFound';
import ForgotPassword from './components/ForgotPassword';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='welcome' element={<Welcome />} />
      <Route path='signup' element={<Signup />} />
      <Route path='checkin' element={<Temp />} />
      <Route path='users/account/:id' element={<UsersAccount />} />
      <Route path='search/logs/:id' element={<Search />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      {/* <Route path='temp' element={<Temp />} /> */}
    </Routes>
  );
};

export default MyRoutes;
