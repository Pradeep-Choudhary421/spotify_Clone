import axios from 'axios'
import React, { useEffect, useState } from 'react'
const Album = () => {
    const [album, setAlbum] = useState([])
    const url = "http://localhost:5555/music/getAlbum";
    const token = sessionStorage.getItem("token")
    useEffect(() =>{
        axios.get(url,{
            headers:{
                "auth-x-token":token}
        }).then((res)=>{
            console.log(res)
        })
      },[])

  return (
    <>
    <section className='bg-blue-300 py-4 px-12'>
        <h2 className='text-2xl font-semibold flex justify-start'>Popular Artists</h2>
        <div className='grid grid-cols-7 pt-4'>
            <div className='cursor-pointer grid grid-cols-1 justify-items-center'>
                <div className='rounded-[50%] overflow-hidden border-2 w-24 md:w-36'><img src="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png" alt="" /></div>
                <h3 className='flex justify-center w-full text-xl font-semibold'>Avatar</h3>
            </div>

        </div>
    </section>
      
    </>
  )
}

export default Album
