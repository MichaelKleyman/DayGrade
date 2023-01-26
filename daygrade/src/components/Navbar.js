import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
// import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-white shadow-xl'>
      <div className='text-black flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 w-full'>
        <Link
          to='/home'
          className='font-[Montserrat] uppercase tracking-widest text-xl md:text-4xl sm:text-2xl text-blue-600 px-3 py-3 w-full ml-10'
        >
          D a y g r a d e
        </Link>
        <div className='w-[50%] md:w-[15%] sm:w-[55%] hover:border hover:border-blue-600 hover:rounded-xl flex items-center justify-center'>
          <ul className='flex'>
            <li className='text-2sm sm:text-lg p-4 tracking-widest uppercase hover:text-blue-600 duration-200 hover:scale-110'>
              {currentUser ? (
                <button onClick={handleLogout}>Log Out</button>
              ) : (
                <Link to='/login'>Log in</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
