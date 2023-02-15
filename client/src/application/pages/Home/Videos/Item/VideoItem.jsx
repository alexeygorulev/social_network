import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React from 'react';
import { Link } from 'react-router-dom';

const VideoItem = ({ toWatchVideo, videos }) => {
  return (
    <>
      {videos.map((item) => (
        <div key={item.id} className="video__item">
          <div className="video">
            <video onClick={toWatchVideo} src={`${process.env.REACT_APP_API_URL}/videos/${item.filename}`}></video>
          </div>
          <span style={{ cursor: 'pointer' }}>{item.videoName ? item.videoName : 'Без названия'}</span>
        </div>
      ))}
    </>
  );
};

export default observer(VideoItem);
