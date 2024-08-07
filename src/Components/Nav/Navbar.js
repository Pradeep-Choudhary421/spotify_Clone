import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [accountToggle, setAccountToggle] = useState(false);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const handleAccountToggle = () => {
    setAccountToggle(!accountToggle);
  };
  const navigateProfile = () => {
    setAccountToggle(false);
    navigate("/profile");
  };
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className=" bg-[#15181a] py-4 rounded-[6px] rounded-b-none flex justify-end relative z-50">
        {token === null ? (
          <div className="flex justify-center gap-8 px-4">
            <div className="cursor-pointer my-auto font-semibold">
              <Link to="/signUp">Sign up</Link>
            </div>
            <div className=" bg-white text-black py-1 px-2 cursor-pointer rounded-[5px] hover:bg-black hover:text-white duration-500 outline-none">
              <Link to="/login">Login</Link>
            </div>
          </div>
        ) : (
          <div className="px-8">
            <div className={`${accountToggle ? "block" : "hidden"}`}>
              <div className=" absolute text-[0.9rem] bg-[#252a2e] py-4 px-6 rounded-xl top-10 right-14 rounded-tr-none flex flex-col gap-3">
                <h2
                  className=" cursor-pointer hover:text-green-500 duration-300 "
                  onClick={navigateProfile}
                >
                  Profile
                </h2>
                <h2
                  className=" cursor-pointer hover:text-green-500 duration-300 "
                  onClick={handleLogOut}
                >
                  LogOut
                </h2>
              </div>
            </div>
            <div
              className=" text-white text-2xl cursor-pointer hover:text-green-500 duration-500 outline-none overflow-hidden"
              onClick={handleAccountToggle}
            >
              <FaUserCircle />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
