import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './songcard.css';

const SongCard = ({data}) => {


  return (
    <>
    {
      data === null ?  <div>
      <h1 className='text-white px-8'></h1>
      <AudioPlayer autoPlay src=""/>
    </div> : <div>
    <h1 className='text-white px-8'>{data.songName}</h1>
    <AudioPlayer autoPlay src={data.songFile} />
  </div>
    }
    </>
    
  );
};

export default SongCard;
