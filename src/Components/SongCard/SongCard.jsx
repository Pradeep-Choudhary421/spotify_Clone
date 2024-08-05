import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";
import { FcLike } from "react-icons/fc";
import musicPlayerAnime from "../../assets/musicPlayerAnime.gif";
import musicPlayerPng from "../../assets/musicPlayerPng.png";
import "./songcard.css";
const SongCard = () => {
  const token = sessionStorage.getItem("token");
  const [songs, setSongs] = useState([]);
  const url = "http://localhost:5555/music/getSong";
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "auth-x-token": token,
        },
      })
      .then((res) => {
        setSongs(res.data.songs[0][0]);
        console.log(res.data.songs[0][0]);
      });
  }, []);
  return (
    <>
      <div className="w-72 m-16">
        <div className="w-full relative">
            <div className=" absolute top-2 text-2xl right-4 cursor-pointer"><FcLike/></div>
          <h3 className=" absolute mx-3 text-white">{songs.songName}</h3>
          <img className="w-full" src={songs.song_img} alt="" />
          <img className=" h-12 w-full" src={musicPlayerAnime} alt="" />
        </div>
        <div>
          <AudioPlayer autoPlay src={songs.songFile} />
        </div>
      </div>
    </>
  );
};

export default SongCard;
