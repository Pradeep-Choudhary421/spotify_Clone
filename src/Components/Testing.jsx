import React, { useState } from "react";
import axios from "axios";
const Testing = () => {
  const [songName, setSongName] = useState("");
  const [songFile, setSongFile] = useState("");
  const [artist, setArtist] = useState("");
  const [song_img, setSongImg] = useState("");
  const [lyrics, setLyrics] = useState("");
  const url = "http://localhost:5555/music/addSong";

  const uploadSong = async (e) => {
    const token = sessionStorage.getItem("token");
    console.log(token)
    e.preventDefault();
    try {
      axios
        .post(
          url,
          {
            songName: songName,
            songFile: songFile,
            artist: artist,
            song_img: song_img,
            lyrics: lyrics
          },
          {
            headers: {
              "auth-x-token": token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
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
  return (
    <>
      <form action="" onSubmit={uploadSong}>
        <input
          type="text"
          name=""
          id=""
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          placeholder="SongName"
        />
        <input type="file" onChange={handleSongFile} name="" id="" />
        {/* <input type="text" onChange={(e) => setSongFile(e.target.value)} name="" id="" /> */}
        <input
          type="text"
          name=""
          id=""
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist"
        />
        <input type="file" onChange={handleSongImg} name="" id="" />
        <input type="file" onChange={(e) => setLyrics(e.target.value)} name="" id="" />
        <button type="submit">upload</button>
      </form>
    </>
  );
};

export default Testing;
