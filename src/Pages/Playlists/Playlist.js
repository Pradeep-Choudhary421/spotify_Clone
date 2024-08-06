import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Nav/Navbar";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import SongCard from "../../Components/SongCard/SongCard";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { store } from "../../Context/Store";

const Playlist = () => {

  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId")
  const createUrl = "http://localhost:5555/music/createPlaylist";
  const getPlayUrl = `http://localhost:5555/music/getAllPlaylist/${userId}`;
  const [playlistName, setPlaylistName] = useState("")
  const [playlistData, setPlaylistData] = useState([]);
  const [togglecreate, setToggleCreate] = useState(false);
  const { currentSong, setCurrentSong } = useContext(store);


  useEffect(()=>{
    axios.get(getPlayUrl).then((res)=>{
      setPlaylistData(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[playlistName])

  const handleToggleCreate = ()=>{
    setToggleCreate(!togglecreate)
  }

  const handlePlaylistSong = (item) =>{
    navigate("/playlistSong", { state: { playlistData: item } });
  }

  const createPlaylist = async(e)=>{
    e.preventDefault();
    axios.post(createUrl,{
      userId:userId,
      playlist_name:playlistName
    }).then((res)=>{
      setPlaylistName("")
      setToggleCreate(false)
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className="flex bg-black min-h-screen pb-24">
        <Sidebar />
      <div className="min-w-full md:min-w-72 bg-black text-white py-4 px-4 w-full ml-60 sm:ml-72 lg:ml-96">
        {/* nav */}
        <Navbar />

        <div className="bg-[#15181a] py-4 rounded-[6px] rounded-t-none overflow-hidden">
          {/* popular Artist */}
          <div className="px-6 pt-8">
            <div className="flex justify-between gap-16 px-4 md-px-0 relative">
            <div className={togglecreate ? " absolute block rounded-xl rounded-tr-none bg-blue-500 z-30 right-16 top-10":"hidden"}>
              <div className="p-4 grid grid-cols-1 ">
                <form action="" onSubmit={createPlaylist}>
                  <div>
              <input type="text" required name="" id="" className="rounded-lg text-black p-1 outline-none" value={playlistName} onChange={(e)=>setPlaylistName(e.target.value)} />
                  </div>
                  <div>
              <button type="submit" className="hover:text-black mt-4">Create</button>
                  </div>
                </form>
              </div>
            </div>
              <div className="font-semibold text-2xl">Playlists</div>
              <div className="my-auto cursor-pointer hover:underline text-blue-500 " onClick={handleToggleCreate} >
                Create New
              </div>
            </div>
            <div className="px-6 py-6 min-w-[30vw]  w-full flex ">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                
                {playlistData.map((item, index) => (
                  <div
                  onClick={()=>handlePlaylistSong(item)}
                    key={index}
                    className="group hover:bg-[#23282b] px-4 flex flex-col justify-center duration-700 rounded-2xl py-4 cursor-pointer"
                  >
                    <div
                      className=" relative"
                    >
                      <div className=" absolute bottom-4 right-3 text-black bg-green-500 p-3 rounded-[50%] hidden group-hover:block ">
                        <FaPlay />
                      </div>
                      <img
                        className="h-auto w-44 max-w-full rounded-lg"
                        src="https://m.media-amazon.com/images/I/31JSk-BC-3L._AC_UF894,1000_QL80_.jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-start pt-2 font-semibold text-xl">
                      {item.playlist_name}
                    </div>
                    <div className="flex justify-start font-semibold text-gray-400">
                      Playlist
                    </div>
                  </div>
                ))} 
                </div>
                
              </div>
            </div>
          </div>

          

          {/* footer */}
          <Footer />
        </div>
        <div className=' w-full z-50 bottom-0 fixed '>
          {<SongCard data={currentSong} />}
      </div>
        </div>
  );
};

export default Playlist;
