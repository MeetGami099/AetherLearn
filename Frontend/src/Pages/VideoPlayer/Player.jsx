import React from 'react'
import Videoplayer from './Videoplayer';
const Player = () => {
    const videoUrl = 'https://aetherlean.s3.ap-south-1.amazonaws.com/testPlay/video1.m3u8';

    return (
      <div>
        <h1>HLS Video Player</h1>
        <Videoplayer videoUrl={videoUrl} />
      </div>
    );
}

export default Player
