import { observer } from 'mobx-react';
import React from 'react';
import Loader from 'application/common/Loader/Loader';

const VideoItem = (props) => {
  const { toWatchVideo, videos, checkIsLoaded } = props;
  return (
    <>
      {videos.map((item) => (
        <div key={item.id}>
          <div
            onClick={() => toWatchVideo(item.id)}
            style={{ cursor: 'pointer', display: `${item.isLoaded ? 'block' : 'none'}` }}
            className="video__item"
          >
            <div className="video">
              <video
                onLoadedData={() => checkIsLoaded(item.id)}
                src={`${process.env.REACT_APP_API_URL}/videos/${item.filename}`}
              ></video>
            </div>
            <span>{item.videoName ? item.videoName : 'Без названия'}</span>
          </div>
          <div style={{ display: `${item.isLoaded ? 'none' : 'block'}` }}>
            <div style={{ cursor: 'pointer' }} className="video__item">
              <div className="video-poster">
                {/* <img src={defaultPhoto} /> */}
                <Loader key={item.filename} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default observer(VideoItem);
