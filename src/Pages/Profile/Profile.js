import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Nav/Navbar";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";


const Profile = () => {
  const [userFormData, setUserFormData] = useState([]);
  // const [nullFormData, setNullFormData] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const getProUrl = `http://localhost:5555/user/getProfileData/${userId}`;
  const deleteUrl = `http://localhost:5555/user/deleteUser/${userId}`;
  const deleteProUrl = `http://localhost:5555/user/deleteProfile/${userId}`;
  const navigate = useNavigate();
  const nullData = [{
    firstName : "--", 
    lastName : "--",
    email : "--",
    gender : "--",
    phoneNo : "--",
    currentAdd : "--",
    permanentAdd : "--",
    dob : "--",
  }]

  useEffect(() => {
    axios
      .get(getProUrl)
      .then((res) => {
        if(res.data.data[0][0] === undefined){
          setUserFormData(nullData[0])
        }
        else{
          setUserFormData(res.data.data[0][0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getProUrl]);

  const handleDelete = () => {
    Loading.dots("Loading...", {
      backgroundColor: "rgba(0,0,0,0.8)",
      svgColor: "#fff",
    });
    axios
      .delete(deleteUrl)
      .then((res) => {
        axios.delete(deleteProUrl).then((res)=>{
            console.log()
        }).catch((err)=>{
            console.log(err)
        })
        sessionStorage.clear();
        Loading.remove(2000)
        toast.success("Account Deleted");
        navigate("/");
      });
  };
  const handleLogOut = ()=>{
    Loading.dots("Loading...", {
      backgroundColor: "rgba(0,0,0,0.8)",
      svgColor: "#fff",
    });
    Loading.remove(2000)
    sessionStorage.clear();
    navigate("/home");
  }

  return (
    <>
        <div className="flex bg-black relative ">

        <div className="min-w-full md:min-w-72 bg-black text-white py-4 px-4 w-full ml-60 sm:ml-72 lg:ml-96">
          {/* nav */}

          <Navbar />
          <div className="bg-[#15181a] py-4 px-8 rounded-[6px] h-full rounded-t-none overflow-hidden  ">
            <div className="bg-[#252a2e] pt-12 pb-4 px-4 md:px-12 flex justify-start gap-2 md:gap-6 rounded-t-lg">
              <div className="">
                <img
                  className="h-16 min-w-12 max-w-16 rounded-[50%]"
                  src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                  alt=""
                />
              </div>
              <div className="my-auto text-2xl">{userName}</div>
            </div>
            <div className="bg-[#252a2e] py-8  rounded-b-lg">
              <div className=" p-3 shadow-sm rounded-sm">
                <div className="text-white ">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">{userFormData.firstName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">{userFormData.lastName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">{userFormData.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{userFormData.phoneNo}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Current Address
                      </div>
                      <div className="px-4 py-2">{userFormData.currentAdd}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Permanant Address
                      </div>
                      <div className="px-4 py-2">
                        {userFormData.permanentAdd}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2 max-w-64 break-words">
                        {userFormData.email}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birth Date</div>
                      <div className="px-4 py-2">{userFormData.dob}</div>
                    </div>
                  </div>
                  <div className="mt-8 ml-4 flex  gap-4">
                    <button
                      className="flex gap-2 rounded-xl py-2 px-3 cursor-pointer bg-white hover:bg-black text-black hover:text-white duration-500 "
                      onClick={handleLogOut}
                    >
                      LogOut <IoIosLogOut className="my-auto" />
                    </button>
                    <button
                      className="flex gap-2 rounded-xl py-2 px-3 cursor-pointer bg-white hover:bg-red-600 text-black hover:text-white duration-500 "
                      onClick={handleDelete}
                    >
                      Delete Account <FaRegTrashAlt className="my-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
