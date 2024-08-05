import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Nav/Navbar";
import axios from "axios";
import ArtistsSong from "../../Components/ArtistSongs/ArtistsSong";
import { useNavigate } from "react-router-dom";
import SongCard from "../../Components/SongCard/SongCard";

const Home = () => {
  const getAlbumUrl = "http://localhost:5555/music/getAlbum";
  const getArtistUrl = "http://localhost:5555/music/getArtist";

  const [album, setAlbum] = useState([]);
  const [artist, setArtist] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(getAlbumUrl)
      .then((res) => {
        setAlbum(res.data.albumData);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(getArtistUrl)
      .then((res) => {
        setArtist(res.data.artists[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleArtist = (item) => {
    navigate("/artistsSong", { state: { artistData: item } });
  };
  const handleAlbum = (item) =>{
    navigate("/albumSongs", { state: { albumData: item } });
  }
  const seeAllArtistSong = () =>{
    navigate("/showAll", {state:{showData:"artist"}})
  }
  const seeAllAlbumSong = () =>{
    navigate("/showAll",{state:{showData:"album"}})
  }

  return (
    <>
      <div className="min-w-full md:min-w-72 bg-black text-white py-4 px-4 w-full ml-60 sm:ml-72 lg:ml-96">
        {/* nav */}
        <Navbar />

        <div className="bg-[#15181a] py-4 rounded-[6px] rounded-t-none overflow-hidden">
          {/* popular Artist */}
          <div className="px-6 pt-8">
            <div className="flex justify-between px-4 md-px-0">
              <div className="font-semibold text-2xl">Popular Artists</div>{" "}
              <div className="my-auto cursor-pointer hover:underline " onClick={seeAllArtistSong}>
                Show all
              </div>
            </div>
            <div className="px-6 py-6 min-w-[30vw]  w-full flex ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {artist.map((item, index) => (
                  <div
                    key={index}
                    className="group hover:bg-[#23282b] px-4 flex flex-col justify-center duration-700 rounded-2xl py-4 cursor-pointer"
                  >
                    <div
                      className=" relative"
                      onClick={() => handleArtist(item)}
                    >
                      <div className=" absolute bottom-4 right-3 text-black bg-green-500 p-3 rounded-[50%] hidden group-hover:block ">
                        <FaPlay />
                      </div>
                      <img
                        className="h-44 w-44 max-w-full rounded-[50%]"
                        src={item.artistImg}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-start pt-2 font-semibold text-xl">
                      {item.artistName}
                    </div>
                    <div className="flex justify-start font-semibold text-gray-400">
                      Artist
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* popular album */}
          <div className="px-6 pt-8">
            <div className="flex justify-between px-4 md-px-0">
              <div className="font-semibold text-2xl">Popular Albums</div>{" "}
              <div className="my-auto cursor-pointer hover:underline " onClick={seeAllAlbumSong}>
                Show all
              </div>
            </div>
            <div className="px-6 py-6 min-w-[38vw] w-full flex ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {album.map((item, index) => (
                  <div
                    key={index}
                    className="group hover:bg-[#23282b] px-4 flex flex-col justify-center duration-700 rounded-2xl py-4 cursor-pointer"
                  >
                    <div className=" relative " onClick={()=>handleAlbum(item)}>
                      <div className=" absolute bottom-4 right-3 bg-green-500 p-3 rounded-[50%] hidden group-hover:block transition- duration-700">
                        <FaPlay />
                      </div>
                      <img
                        className="h-auto w-44 max-w-full rounded-lg"
                        src={item.albumImg}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-start pt-2 font-semibold text-xl">
                      {item.albumName}
                    </div>
                    <div className="flex justify-start font-semibold text-gray-400">
                      Artist
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* footer */}
          <Footer />
        </div>
      </div>
        <div className=' w-full z-50 bottom-0 fixed '>
          {<SongCard data={null} />}
      </div>
    </>
  );
};

export default Home;
