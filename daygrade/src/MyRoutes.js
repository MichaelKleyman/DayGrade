import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Checkin from './components/Checkin';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='welcome' element={<Welcome />} />
      <Route path='signup' element={<Signup />} />
      <Route path='checkin' element={<Checkin />} />
    </Routes>
  );
};

export default MyRoutes;
