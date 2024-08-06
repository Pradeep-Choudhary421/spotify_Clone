// App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './Main';
import Search from './Pages/Search/Search';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Playlist from './Pages/Playlists/Playlist';
import Profile from './Pages/Profile/Profile';
import ArtistsSong from './Components/ArtistSongs/ArtistsSong';
import AlbumSongs from './Components/AlbumSongs/AlbumSongs';
import ShowAll from './Pages/ShowAll/ShowAll';
import PlaylistSong from './Components/PlaylistsSong/PlaylistSong';
import Provider from './Context/Store';
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <Provider>
      <BrowserRouter>
        <ToastContainer autoClose={2000} position="top-center" />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="search" element={<Search />} />
            <Route path="home" element={<Home />} />
            <Route path="playlist" element={<Playlist />} />
            <Route path="profile" element={<Profile />} />
            <Route path="artistsSong" element={<ArtistsSong />} />
            <Route path="albumSongs" element={<AlbumSongs />} />
            <Route path="showAll" element={<ShowAll />} />
            <Route path="playlistSong" element={<PlaylistSong />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
