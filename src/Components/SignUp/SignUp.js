import React, { useState } from 'react'
import { FaSpotify } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Userinfo from '../UserInfo/Userinfo';
import axios from 'axios';
import { toast } from 'react-toastify';
const SignUp = () => {
  const [toggleUserForm, setToggleUserForm] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const url = "http://localhost:5555/user/createUser";
  const handleSignUp = (e)=>{
    e.preventDefault();
    axios.post(url,{
      name:name,
      email:email,
      password:password
    }).then((res)=>{
      // console.log(res.data.response.status);
      sessionStorage.setItem("userId",res.data.data[0][0].id)
      toast.success("Sign Up Success")
      handleToggleUserForm();
    }).catch((err)=>{
      if(err.response.status === 400){
        toast.error("User Already Exist")
      }
    })
  }

    const handleToggleUserForm = () =>{
        setToggleUserForm(!toggleUserForm)
    }
  return (
    <>
      <div className='flex justify-center justify-items-center items-center overflow-hidden h-screen'>
      { toggleUserForm ? <Userinfo toggleForm={handleToggleUserForm}  /> : "" }
        <div>
            <div className='flex justify-center py-2 text-4xl'><FaSpotify/></div>
            <div className='text-2xl flex justify-center py-2'>SignUp To Spotify</div>
            <div className='px-4'>
                <form action="" onSubmit={handleSignUp}>
                    <div className='py-2 flex flex-col gap-2'>
                        <div>UserName</div>
                        <input value={name} required onChange={(e)=>setName(e.target.value)}  type="text" className=' bg-transparent border-2 rounded-[3px] py-2 px-8 border-gray-400' />
                    </div>
                    <div className='py-2 flex flex-col gap-2'>
                        <div>Email</div>
                        <input value={email} required onChange={(e)=>setEmail(e.target.value)}  type="email" className=' bg-transparent border-2 rounded-[3px] py-2 px-8 border-gray-400' />
                    </div>
                    <div className='py-2 flex flex-col gap-2'>
                        <div>Password</div>
                        <input value={password} required onChange={(e)=>setPassword(e.target.value)}  type="password" className=' bg-transparent border-2 rounded-[3px] py-2 px-8 border-gray-400' />
                    </div>
                    <div className='flex justify-center bg-green-500 hover:scale-110 duration-300 rounded-xl py-2 text-black mt-6'>
                        <button className='w-full' type='submit' >SignUp</button>
                    </div>
                    <div className='border-t-[1px] mt-8 pt-6'>
                        <h2 className='text-gray-500'>Already have an account ? <span className='text-white hover:text-green-500 underline cursor-pointer'><Link to="/login">Login To Spotify</Link></span></h2>
                    </div>
                </form>
            </div>
        </div>

      </div>
    </>
  )
}

export default SignUp
