import React, { useState } from 'react'

const Navbar = () => {
  return (
    <>
      <section className='flex justify-between px-8 py-4 bg-blue-300 border-b-2'>
        <div className='cursor-pointer'>
          <h4 className='font-semibold text-2xl'>Music</h4>
        </div>
        <div className='flex gap-4'>
        <ul className='flex justify-center gap-4 font-semibold'>
          <li><a href="#">Home</a></li>
          <li><a href="#">Artists</a></li>
          <li><a href="#">Home</a></li>
          <li className='underline'><a href="#">Profile</a></li>
        </ul>
        {/* <div><input type="text" className='rounded-[5px] outline-none px-2' placeholder='Search Song' name="" id="" /></div> */}
        </div>
      </section>
    </>
  )
}

export default Navbar
