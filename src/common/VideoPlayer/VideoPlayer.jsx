import React from 'react';
import ReactPlayer from 'react-player';
import { VideoWrapper } from './VideoPlayer.style';

const VideoPlayer = ({ url }) => {
  return (
    <VideoWrapper>
      <ReactPlayer
        className="player"
        url={url}
        controls
      />
    </VideoWrapper>
  );
};

export default VideoPlayer;
