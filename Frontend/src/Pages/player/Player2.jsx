
import Player from './Player'
import { useRef } from 'react'

function Player2() {
  const playerRef = useRef(null)
  const videoLink = "http://localhost:8080/Output/video1.m3u8"

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL"
      }
    ]
  }
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  return (
    <>
      <div>
        <h1>Video player</h1>
      </div>
      <Player
      options={videoPlayerOptions}
      onReady={handlePlayerReady}
      />
    </>
  )
}

export default Player2;