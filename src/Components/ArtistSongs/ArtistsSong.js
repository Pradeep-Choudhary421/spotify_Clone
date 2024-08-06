import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Nav/Navbar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SongCard from '../SongCard/SongCard';
import { store } from '../../Context/Store';

const ArtistsSong = () => {
    const location = useLocation();
    const data = location.state?.artistData;

    const songUrlArt = `http://localhost:5555/music/getSongArtist/${data.artistName}`;

    const [artistSong, setArtistiSong] = useState([]);
    const { currentSong, setCurrentSong } = useContext(store);

    useEffect(()=>{
        axios.get(songUrlArt).then((res)=>{
            setArtistiSong(res.data.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[data])

    const handlePlay = (item) =>{
        setCurrentSong(item)
    }

  return (
    <>
      <div className="flex bg-black min-h-screen pb-24">
        <Sidebar />

        <div className="min-w-full md:min-w-72 bg-black text-white py-4 px-4 w-full ml-60 sm:ml-72 lg:ml-96">
          <Navbar />

          <div className="bg-[#15181a] py-4 px-8 rounded-[6px] h-full rounded-t-none overflow-hidden">

            <div>
            <div className="grid grid-cols-1 mt-8 justify-items-center">
            <div className=' flex gap-4 w-full px-44'>
                    <div><img src={data.artistImg} className=' w-16' alt="" /></div>
                    <div className='my-auto text-2xl'>{data.artistName}</div>
                </div>
            <ul className="max-w-2xl w-full px-4 md:px-0 border-t-2 mt-12">
                {artistSong.length > 0 ? (
                  artistSong.map((song, index) => (
                    <li
                      key={index}
                      className="py-3 sm:py-4 hover:bg-gray-500 px-4 opacity-100 rounded-2xl cursor-pointer my-2"
                      onClick={() => handlePlay(song)}
                    >
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={song.song_img}
                            alt="Song cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {song.songName}
                          </p>
                          {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {song.artistName}
                          </p> */}
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          Play
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No Song found for This Artist</p>
                )}
              </ul>
            </div>
            </div>

          </div>
          </div>
          <div className=' w-full z-50 bottom-0 fixed '>
          {currentSong ? <SongCard data={currentSong} /> : <SongCard data={null} />}
      </div>
          </div>
    </>
  )
}

export default ArtistsSong
