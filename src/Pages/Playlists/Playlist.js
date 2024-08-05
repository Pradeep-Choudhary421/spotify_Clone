import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Nav/Navbar'

const Playlist = () => {
  return (
    <>
    <div className="flex  bg-black min-h-screen">
        <Sidebar />

        <div className="min-w-full md:min-w-72 bg-black text-white py-4 px-4 w-full ml-60 sm:ml-72 lg:ml-96">
            <Navbar/>

        </div>
        </div>
    </>
  )
}

export default Playlist
