// Main.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Pages/Home/Home';

const Main = () => {
  return (
    <div className=' bg-black min-h-screen'>
      <Sidebar />
      <div className=''>
        <Outlet /> 
      </div>
    </div>
  );
};

export default Main;
