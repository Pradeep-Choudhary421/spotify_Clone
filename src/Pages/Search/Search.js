import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Nav/Navbar";
import axios from "axios";
import SongCard from "../../Components/SongCard/SongCard";

const Search = () => {
  const [songData, setSongData] = useState([]);
  const [filteredSong, setFilteredSong] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const getSongsUrl = "http://localhost:5555/music/getSong";

  useEffect(() => {
    axios
      .get(getSongsUrl)
      .then((res) => {
        setSongData(res.data.songs[0]); 
        setFilteredSong(res.data.songs[0]); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault(); 
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = songData.filter(
        (song) =>
          song.songName.toLowerCase().includes(lowercasedQuery) ||
          song.artistName.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredSong(filtered);
    } else {
      setFilteredSong(songData); 
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handlePlay = (song) =>{
    setCurrentSong(song);
  }

  return (
    <>
      <div className="flex bg-black min-h-screen pb-24">
        <Sidebar />

        <div className="min-w-full md:min-w-72 bg-black text-white py-4 px-4 w-full ml-60 sm:ml-72 lg:ml-96">
          <Navbar />

          <div className="bg-[#15181a] py-4 px-8 rounded-[6px] h-full rounded-t-none overflow-hidden">
            <div>
              <form className="max-w-md mx-auto" onSubmit={handleSearch}>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="block w-full p-4 ps-10 text-sm text-gray-900 outline-none rounded-lg bg-[#252a2e] dark:placeholder-gray-400 dark:text-white"
                    placeholder="Search Music ..."
                    required
                  />
                  <button
                    type="submit"
                    className="text-black absolute end-2.5 bottom-2.5 bg-white font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 mt-8 justify-items-center">
              <ul className="max-w-2xl w-full px-4 md:px-0">
                {filteredSong.length > 0 ? (
                  filteredSong.map((song, index) => (
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
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {song.artistName}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          Play
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No results found</p>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className=' w-full z-50 bottom-0 fixed '>
        {currentSong ? <SongCard data={currentSong} /> : <SongCard data={null} />}
      </div>
      </div>
    </>
  );
};

export default Search;
