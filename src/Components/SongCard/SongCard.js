import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./songcard.css";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

const SongCard = ({ data }) => {
  const [toggleAddTo, setToggleAddTo] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const addToUrl = "http://localhost:5555/music/addToPlaylist";
  const getPlayUrl = `http://localhost:5555/music/getAllPlaylist/${userId}`;

  useEffect(() => {
    axios
      .get(getPlayUrl)
      .then((res) => {
        setPlaylistData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddToPlay = (e) => {
    axios
      .post(addToUrl, {
        songId: data.id,
        playlistId: e.id,
      })
      .then((res) => {
        setToggleAddTo(false)
        toast.success(`Song Added To ${e.playlist_name}`)
      }).catch((err) => {
        console.log(err);
      });
  };

  const handleToggleAddTo = () => {
    setToggleAddTo(!toggleAddTo);
  };

  return (
    <>
      {data === null ? (
        <div>
          <h1 className="text-white px-8"></h1>
          <AudioPlayer autoPlay src="" />
        </div>
      ) : (
        <div>
          <div className="flex">
            <h1 className="text-white px-8">{data.songName}</h1>
            <div className="relative">
              <div
                className={
                  toggleAddTo ? "block absolute bottom-8 right-0" : "hidden"
                }
              >
                <div className="p-2">
                  {playlistData.map((item, index) => (
                    <div key={index}>
                      <div>
                        <ul className="flex gap-2 border-b-2 my-1 hover:bg-green-500 py-1 px-2 rounded-xl cursor-pointer justify-between bg-">
                          <li className="">{item.playlist_name}</li>
                          <h2
                            className="text-white hover:text-black  cursor-pointer my-auto text-xl "
                            onClick={() => handleAddToPlay(item)}
                          >
                            <FaPlus />
                          </h2>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <h2
                className={ token ===null ?"hidden" : "text-green-500 border-2 rounded-full border-green-500 cursor-pointer my-auto text-xl "}
                onClick={handleToggleAddTo}
              >
                <FaPlus />
              </h2>
            </div>
          </div>
          <AudioPlayer src={data.songFile} />
        </div>
      )}
    </>
  );
};

export default SongCard;
