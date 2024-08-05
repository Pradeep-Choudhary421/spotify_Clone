import React, { useState } from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import Home from './Pages/Home/Home'
import axios from 'axios'
import SongCard from './Components/SongCard/SongCard'

const Main = () => {

  // const url = "http://localhost:5555/music/addAlbum"
  const url = "http://localhost:5555/music/addArtist"
  // const url = "http://localhost:5555/music/addSong"
  const [songName, setSongName] = useState("")
  const [songFile, setSongFile] = useState("")
  const [songImg, setSongImg] = useState("")
  const [artistName, setArtistName] = useState("")
  const [lyrics, setLyrics] = useState("")
  const [albumName, setAlbumName] = useState("")
  const [albumImg, setAlbumImg] = useState("")
  const [artistImg, setArtistImg] = useState("")



  const handleSongFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    setSongFile(file);
    try {
      const cloudData = new FormData();
      cloudData.append("file", file);
      cloudData.append("upload_preset", "songFile");
      let cloudapi = "https://api.cloudinary.com/v1_1/da0g8xa3n/video/upload";
      let resImg = await fetch(cloudapi, {
        method: "POST",
        body: cloudData,
      });
      const final = await resImg.json();
      setSongFile(final.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSongImg = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSongImg(file);
    try {
      const cloudData = new FormData();
      cloudData.append("file", file);
      cloudData.append("upload_preset", "song_img");
      let cloudapi = "https://api.cloudinary.com/v1_1/da0g8xa3n/image/upload";
      let resImg = await fetch(cloudapi, {
        method: "POST",
        body: cloudData,
      });
      const final = await resImg.json();
      console.log(final);
      setSongImg(final.secure_url);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAlbumImg = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAlbumImg(file);
    try {
      const cloudData = new FormData();
      cloudData.append("file", file);
      cloudData.append("upload_preset", "albums");
      let cloudapi = "https://api.cloudinary.com/v1_1/da0g8xa3n/image/upload";
      let resImg = await fetch(cloudapi, {
        method: "POST",
        body: cloudData,
      });
      const final = await resImg.json();
      console.log(final);
      setAlbumImg(final.secure_url);
    } catch (err) {
      console.log(err);
    }
  };
  const handleArtistImg = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setArtistImg(file);
    try {
      const cloudData = new FormData();
      cloudData.append("file", file);
      cloudData.append("upload_preset", "artistImg");
      let cloudapi = "https://api.cloudinary.com/v1_1/da0g8xa3n/image/upload";
      let resImg = await fetch(cloudapi, {
        method: "POST",
        body: cloudData,
      });
      const final = await resImg.json();
      console.log(final);
      setArtistImg(final.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadArtist = (e)=>{
    e.preventDefault()
    axios.post(url,{
      artistName:artistName,
      artistImg:artistImg,
    }).then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })

  }
  const uploadAlbum = (e)=>{
    e.preventDefault()
    axios.post(url,{
      albumName:albumName,
      albumImg:albumImg,
    }).then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })

  }

  const uploadSong = (e)=>{
    e.preventDefault()
    axios.post(url,{
      songName: songName,
      songFile: songFile,
      song_img: songImg,
      lyrics:lyrics,
      artistName:artistName,
      albumName: albumName,
    }).then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    // <>
    // {/* song */}
    // {/* <div className='grid grid-cols-4 gap-4'>
    //   <input className='text-black bg-white' type="text" placeholder='songName' value={songName} onChange={(e)=>setSongName(e.target.value)} />
    //   <input className='text-black bg-white' type="file" placeholder='songImg' onChange={handleSongFile} />
    //   <input className='text-black bg-white' type="file" placeholder='lyrics'  onChange={handleSongImg} />
    //   <input className='text-black bg-white' type="text" placeholder='lyrics' value={lyrics} onChange={(e)=>setLyrics(e.target.value)} />
    //   <input className='text-black bg-white' type="text" placeholder='artistName' value={artistName} onChange={(e)=>setArtistName(e.target.value)} />
    //   <input className='text-black bg-white' type="text" placeholder='albumName' value={albumName} onChange={(e)=>setAlbumName(e.target.value)} />
    //   <button onClick={uploadSong}>Upload</button>
    // </div> */}

    // {/* album */}
    // {/* <div className='grid grid-cols-4 gap-4'>
    //   <input className='text-black bg-white' type="text" placeholder='songName' value={albumName} onChange={(e)=>setAlbumName(e.target.value)} />
    //   <input className='text-black bg-white' type="file" placeholder='lyrics'  onChange={handleAlbumImg} />
    //   <button onClick={uploadAlbum}>Upload</button>
    // </div> */}

    // {/* artist */}
    // <div className='grid grid-cols-4 gap-4'>
    //   <input className='text-black bg-white' type="text" placeholder='artistName' value={artistName} onChange={(e)=>setArtistName(e.target.value)} />
    //   <input className='text-black bg-white' type="file" placeholder=''  onChange={handleArtistImg} />
    //   <button onClick={uploadArtist}>Upload</button>
    // </div>
    
    // </>
    <div className='flex  bg-black min-h-screen'>
      <Sidebar/>
      <Home/>
      <div className=' w-full z-50 bottom-0 fixed '>
      {/* <SongCard /> */}
      </div>
    </div>
  )
}

export default Main
