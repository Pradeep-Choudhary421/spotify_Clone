import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { FaSpotify } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [addPlaylist, setAddPlaylist] = useState(false);
  const token = sessionStorage.getItem("token");

  const navigateHome = () => {
    navigate("/");
  };
  const navigateSearch = () => {
    navigate("/search");
  };
  const navigatePlaylist = () => {
    navigate("/playlist");
    setAddPlaylist(false)
  };
  const navigateLogin = () => {
    navigate("/login");
  };
  const handleAddPlaylist = () => {
    setAddPlaylist(!addPlaylist);
  };

  return (
    <>
      <div className="bg-black fixed h-screen min-w-64 w-64 lg:w-96 text-white flex flex-col gap-0">
        <div className="pt-4 px-4 relative">
          <div className="bg-[#15181a] rounded-[5px] py-4 px-6 flex flex-col gap-3">
            <div
              className="flex gap-1 text-2xl  cursor-pointer"
              onClick={navigateHome}
            >
              <div className="my-auto ">
                <FaSpotify className=" active:scale-90" />
              </div>
              Spotify
            </div>
            <div
              className="flex gap-4 text-2xl  cursor-pointer"
              onClick={navigateHome}
            >
              <div className="my-auto">
                <GoHome className=" active:scale-90" />
              </div>
              Home
            </div>
            <div
              className="flex gap-4 text-2xl  cursor-pointer text-gray-300 hover:text-white"
              onClick={navigateSearch}
            >
              <div className="my-auto">
                <IoSearchSharp className=" active:scale-90" />
              </div>
              Search
            </div>
          </div>
        </div>
        <div className="pt-3 px-4">
          <div className="bg-[#15181a] rounded-[5px] py-4 px-6 flex flex-col gap-3 w-full">
            <div className="grid grid-cols-2 justify-items-between text-xl cursor-pointer">
              <div className="text-gray-300 hover:text-white">Your Library</div>
              <div
                className=" my-auto flex justify-end  cursor-pointer hover:text-2xl duration-100"
                onClick={handleAddPlaylist}
              >
                <FaPlus />
              </div>
            </div>
            {token === null ? (
              <div className={`${addPlaylist ? "block relative" : "hidden"}`}>
                {" "}
                <div className="absolute rounded-tl-none top-0 left-44  lg:left-72  bg-blue-500 p-4 rounded-xl w-full ">
                  <div>
                    <h3 className="text-xl ">Create a playlist</h3>
                    <h5 className="text-[0.9rem]">Login To Create Playlist</h5>
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      className="text-gray-100 hover:text-white "
                      onClick={handleAddPlaylist}
                    >
                      Not now
                    </button>
                    <button className="font  bg-white hover:bg-gray-200 duration-300 py-1 px-2 rounded-xl text-black" onClick={navigateLogin}>
                      Login
                    </button>
                  </div>
                </div>{" "}
              </div>
            ) : (
              <div className={`${addPlaylist ? "block relative" : "hidden"}`}>
                <div className="absolute rounded-tl-none top-0 left-44  lg:left-72  bg-blue-500 p-4 rounded-xl w-full ">
                  <h2 className="cursor-pointer hover:underline" onClick={navigatePlaylist}>Create a new Playlist</h2>
                  
                </div>
              </div>
            )}
            <div className="bg-[#252a2e] rounded-[7px] py-4 px-6 flex flex-col gap-2 justify-start my-2">
              <div className="  text-xl">Create your first playlist</div>
              <div>It's easy, we will help you</div>
              <div
                className=" mt-2 cursor-pointer hover:scale-110 duration-300 bg-white text-black w-fit px-2 py-1 rounded-xl "
                onClick={handleAddPlaylist}
              >
                Create Playlist
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
