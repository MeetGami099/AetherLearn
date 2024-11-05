import React from 'react'
import Videoplayer from './Videoplayer';
import s from './player.module.css'

const  Player = () => {

    const videoUrl = 'https://aetherlean.s3.ap-south-1.amazonaws.com/Production/VideoId26/360.m3u8';
    return (
      <div className={s.conatiner}>
        <Videoplayer videoUrl={videoUrl} />
      </div>
    );
}

export default Player
