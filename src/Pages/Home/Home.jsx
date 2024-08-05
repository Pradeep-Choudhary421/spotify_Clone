import React, { useState, useEffect } from "react";
import axios from "axios";
import './home.css'
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import SongCard from "../../Components/SongCard/SongCard";
import Album from "../../Components/Album/Album";
const Home = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(()=>{
    if(token === null){
      navigate("/");
    }
  },[])
  return (
    <>
    <Navbar/>
    <Album/>
    <SongCard/>
    </>
  );
};

export default Home;
