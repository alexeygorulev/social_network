import { observer } from 'mobx-react';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { changeQueryParams } from 'api/utils';
import { formatDurationTime } from './utils';
import n from 'application/assets/img/defaultPhoto.jpg';

const VideoPlayer = (props) => {
  const { filename, setIsWatching, closeVideoFromUrl, addVideo, checkOnAddedVideo, isAdded } = props;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isVolume, setIsVolume] = useState(false);
  const [isShowRangeVolume, setIsShowRangeVolume] = useState(false);
  const [progressTime, setProgressTime] = useState(0);
  const [durationTime, setDurationTime] = useState(0);
  const [commentInfo, setCommentInfo] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const checkValue = () => {
    setIsVolume(!isVolume);
    setIsShowRangeVolume(!isShowRangeVolume);
    isVolume ? (videoRef.current.muted = true) : (videoRef.current.muted = false);
  };
  async function init() {
    await checkOnAddedVideo(filename);
  }

  useEffect(() => {
    init();
  }, [filename]);

  useEffect(() => {
    const video = document.querySelector('video');
    video.addEventListener('loadeddata', () => {
      checkTimeLineVideo();
    });
    return () => {};
  }, []);

  const showVolume = () => {
    if (!isVolume) return;
    if (!!volume) setIsShowRangeVolume(true);
  };
  const hiddenValue = () => {
    if (!!volume) setIsShowRangeVolume(false);
  };

  const toggleFullScreenMode = () => {
    const videoBlock = document.querySelector('.video__block');
    if (document.fullscreenElement == null) {
      setIsFullScreen(true);
      videoBlock.requestFullscreen();
    } else {
      setIsFullScreen(false);
      document.exitFullscreen();
    }
  };

  const changeVolume = (event) => {
    setVolume(event.target.value);
    videoRef.current.volume = event.target.value;
  };
  const togglePlay = () => {
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
    videoRef.current.volume = volume;
  };

  const closeVideo = () => {
    setIsWatching(false);
    changeQueryParams([], true);
    closeVideoFromUrl();
  };

  //-------------------------------------------- PIPE
  const canPIP = () => 'pictureInPictureEnabled' in document && document.pictureInPictureEnabled;

  const isInPIP = () => Boolean(document.pictureInPictureElement);

  const supportsOldSafariPIP = () => {
    const video = document.querySelector('video');

    return canPIP() && video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === 'function';
  };

  const supportsModernPIP = () => {
    const video = document.querySelector('video');

    return canPIP() && video.requestPictureInPicture && typeof video.requestPictureInPicture === 'function';
  };

  const openPIP = async (video) => {
    if (isInPIP()) return;

    if (supportsOldSafariPIP()) await video.webkitSetPresentationMode('picture-in-picture');

    if (supportsModernPIP()) await video.requestPictureInPicture();
  };

  const closePIP = async (video) => {
    if (!isInPIP()) return;

    if (supportsOldSafariPIP()) await video.webkitSetPresentationMode('inline');

    if (supportsModernPIP()) {
      await document?.exitPictureInPicture();
      const audio = document.createElement('audio');
      audio.pause();
    }
  };

  const disablePIP = async () => {
    await closePIP(videoRef.current).catch(/*handle error*/);
  };

  const enablePIP = async () => {
    const video = document.querySelector('video');
    const audio = document.createElement('audio');

    video.addEventListener(
      'leavepictureinpicture',
      () => {
        audio.pause();
        video.pause();
      },
      false,
    );
    await openPIP(videoRef.current).catch(/*handle error*/);
  };

  const togglePIP = async () => {
    if (isInPIP()) await disablePIP();
    else await enablePIP();
  };

  //------------------------------------TIME
  const checkTimeLineVideo = () => {
    const timelineContainer = document.querySelector('.timeline-container');

    if (videoRef.current.currentTime === videoRef.current.duration) {
      togglePlay();
    }
    const percent = videoRef.current.currentTime / videoRef.current.duration;
    timelineContainer.style.setProperty('--progress-position', percent);
    setProgressTime(formatDurationTime(videoRef.current.currentTime));
    setDurationTime(formatDurationTime(videoRef.current.duration));
  };

  const addedTime = () => {
    videoRef.current.currentTime += 15;
    setProgressTime(formatDurationTime(videoRef.current.currentTime));
  };
  const reduceTime = () => {
    videoRef.current.currentTime -= 15;
    setProgressTime(formatDurationTime(videoRef.current.currentTime));
  };

  // ------------------------------TIMELINE
  let isScrubbing = false;
  let wasPaused;
  const toggleScrubbing = (e) => {
    const timelineContainer = document.querySelector('.timeline-container');
    const rect = timelineContainer.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.pageX - rect.x), rect.width) / rect.width;
    isScrubbing = (e.buttons & 1) === 1;

    if (isScrubbing) {
      wasPaused = videoRef.current.paused;
      videoRef.current.pause();
    } else {
      videoRef.current.currentTime = percent * videoRef.current.duration;
      if (!wasPaused) videoRef.current.play();
    }
  };
  const handleTimelineUpdate = (e) => {
    const timelineContainer = document.querySelector('.timeline-container');
    const rect = timelineContainer.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.pageX - rect.x), rect.width) / rect.width;
    timelineContainer.style.setProperty('--preview-position', percent);
    if (isScrubbing) {
      e.preventDefault();
      timelineContainer.style.setProperty('--progress-position', percent);
    }
  };
  document.addEventListener('mouseup', (e) => {
    if (isScrubbing) toggleScrubbing(e);
  });
  document.addEventListener('mousemove', (e) => {
    if (isScrubbing) handleTimelineUpdate(e);
  });

  return (
    <>
      <div className="container-popup">
        <div className="popup__box_video">
          <div style={{ textAlign: 'right' }}>
            <i style={{ cursor: 'pointer' }} onClick={closeVideo} className="uil uil-times-circle"></i>
          </div>
          <div className="video__block">
            <div className="video-controls-container">
              <div
                onMouseDown={(e) => toggleScrubbing(e)}
                onMouseMove={(e) => handleTimelineUpdate(e)}
                className="timeline-container"
              >
                <div className="timeline">
                  <div className="thumb-indicator"></div>
                </div>
              </div>
              <div className="controls">
                <div className="controls-start">
                  <div onClick={togglePlay} className="play-pause-btn">
                    {isPlaying ? <i className="uil uil-pause"></i> : <i className="uil uil-play"></i>}
                  </div>
                  <div style={{ display: 'flex' }} onMouseLeave={hiddenValue}>
                    <div onClick={checkValue}>
                      {isVolume ? (
                        <i style={{ opacity: 0.65 }} onMouseEnter={showVolume} className="uil uil-volume"></i>
                      ) : (
                        <i style={{ opacity: 0.65 }} className="uil uil-volume-mute"></i>
                      )}
                    </div>
                    {isShowRangeVolume && (
                      <div>
                        <input onChange={changeVolume} type="range" step="0.1" min="0" max="1" value={volume} />
                      </div>
                    )}
                  </div>
                  <div className="duration-container">
                    <div> {progressTime}</div>/<div>{durationTime}</div>
                  </div>
                  <div className="time-change">
                    <i onClick={reduceTime} className="uil uil-angle-double-left"></i>
                    <i onClick={addedTime} className="uil uil-angle-double-right"></i>
                  </div>
                </div>
                <div className="controls-end">
                  <div>
                    <i onClick={toggleFullScreenMode} className="uil uil-expand-arrows"></i>
                  </div>
                  <div>
                    <i onClick={togglePIP} className="uil uil-comment-alt"></i>
                  </div>
                </div>
              </div>
            </div>
            <video
              style={{ height: isFullScreen ? '100%' : '560px' }}
              onTimeUpdate={checkTimeLineVideo}
              onDoubleClick={toggleFullScreenMode}
              onClick={togglePlay}
              ref={videoRef}
            >
              <source src={`${process.env.REACT_APP_API_URL}/videos/${filename}`} type="video/mp4" />
            </video>
          </div>
          <div className="description">
            <h4>Bullet From My Valintine</h4>
            <div className="detail-info__description">
              <span>23.4 тыс. просмотров</span> <span>11 месяцев назад</span>
            </div>
            <div className="actions_description">
              <div className="actions_item">
                <i className="uil uil-heart"></i>
                <span>123</span>
              </div>
              <div className="actions_item">
                <i className="uil uil-share"></i>
                <span>Поделиться</span>
              </div>
              {isAdded ? (
                <div onClick={() => addVideo(filename)} style={{ cursor: 'pointer' }}>
                  <i className="uil uil-multiply"></i>
                  <span>Убрать из своих</span>
                </div>
              ) : (
                <div onClick={() => addVideo(filename)} style={{ cursor: 'pointer' }}>
                  <i className="uil uil-plus"></i>
                  <span>Добавить к себе</span>
                </div>
              )}
            </div>
            <div className="comments">
              <div className="users-comments">
                <img src={n} alt="" />
                <div className="comment">
                  <span style={{ fontWeight: 'bold' }}>Алексей Горулев</span>
                  <div className="comment-description">
                    <span>asdddddddddddddddddddddddddddddddddddddddzxczxc</span>
                  </div>
                  <div>
                    <span>Сегодня в 11:00</span>
                  </div>
                </div>

                <i className="uil uil-pen"></i>
              </div>
              <div className="users-comments">
                <img src={n} alt="" />
                <div className="comment">
                  <span style={{ fontWeight: 'bold' }}>Алексей Горулев</span>
                  <div className="comment-description">
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam deleniti itaque quae repellat
                      qui fugiat porro exercitationem omnis illum hic asperiores ex nobis molestiae, alias quidem
                      voluptas magni, optio cupiditate!
                    </span>
                  </div>
                  <div>
                    <span>Сегодня в 11:00</span>
                  </div>
                </div>

                <i className="uil uil-pen"></i>
              </div>
              <div className="users-comments">
                <img src={n} alt="" />
                <div className="comment">
                  <span style={{ fontWeight: 'bold' }}>Алексей Горулев</span>
                  <div className="comment-description">
                    <span>asddddddddddddddddddddddddddddddddddddddd</span>
                  </div>
                  <div>
                    <span>Сегодня в 11:00</span>
                  </div>
                </div>

                <i className="uil uil-pen"></i>
              </div>
            </div>
            <div className="create-comment">
              <div className="info-comment">
                <img src={n} alt="" />
                <div className="info-textarea">
                  <textarea
                    placeholder="Написать комментарий..."
                    value={commentInfo}
                    onChange={(e) => setCommentInfo(e.target.value)}
                  />
                </div>
              </div>
              <div className="footer-comment">
                <button>
                  <span>Отправить</span>
                </button>
                <button>
                  <span>Отмена</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(VideoPlayer);
