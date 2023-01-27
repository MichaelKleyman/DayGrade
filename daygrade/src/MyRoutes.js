import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Signup from './components/Signup';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='welcome' element={<Welcome />} />
      <Route path='signup' element={<Signup />} />
    </Routes>
  );
};

export default MyRoutes;
