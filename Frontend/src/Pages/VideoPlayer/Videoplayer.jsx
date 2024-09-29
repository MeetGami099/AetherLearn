import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const Videoplayer = ({videoUrl }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      const video = videoRef.current;
  
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
  
        // Cleanup
        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support
        video.src = videoUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }
    }, [videoUrl]);
  
    return (
      <video
        ref={videoRef}
        controls
        style={{ width: '100%', maxHeight: '500px' }}
      />
    );
}

export default Videoplayer


