import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UploadPopup from '../../../common/Popup/UploadPopup';
import VideoItems from './Item/VideoItem';
import VideoPlayer from './VideoPlayer';
import Loader from 'application/common/Loader/Loader';
import FileUploader from 'application/common/FileUploader';

const Videos = (props) => {
  const { store } = props;
  const {
    mounted,
    mount,
    unmount,
    videoList,
    initialized,
    loading,
    createVideo,
    onClickVideo,
    filename,
    closeVideoFromUrl,
    videoFromUrl,
    checkIsLoaded,
    init,
    addVideoById,
    checkOnAddedVideo,
    isAdded,
    isMyVideos,
  } = store;

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isWatching, setIsWatching] = useState(false);

  const [file, setFile] = useState();
  const [origVideoFile, setOrigVideoFile] = useState('');

  const isOpenVideoPlayer = isWatching || videoFromUrl;

  const toggleUpload = () => {
    setIsOpenPopup(!isOpenPopup);
  };
  document.body.classList.toggle('popup-open', isOpenPopup || isOpenVideoPlayer);

  const toWatchVideo = (id) => {
    onClickVideo(id);
    setIsWatching(true);
  };

  const handleSubmit = async () => {
    setIsOpenPopup(false);
    await init();
  };

  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!initialized) return <Loader />;

  if (!mounted) return null;
  return (
    <div className="videos__page ">
      {isOpenPopup && (
        <FileUploader
          handleSubmit={handleSubmit}
          createVideo={createVideo}
          type="isVideo"
          closeUploader={() => setIsOpenPopup(false)}
        />
      )}
      {isOpenVideoPlayer && (
        <VideoPlayer
          filename={filename}
          setIsWatching={setIsWatching}
          closeVideoFromUrl={closeVideoFromUrl}
          addVideo={addVideoById}
          checkOnAddedVideo={checkOnAddedVideo}
          isAdded={isAdded}
        />
      )}
      <div className="videos__wrapper">
        <div className="video__info">
          <div>
            <span onClick={isMyVideos}>Мои видеозаписи</span> |<span>Все видеозаписи</span>
          </div>
          <div>
            <span onClick={toggleUpload}>Загрузить</span>
          </div>
        </div>
        <div className="video__list">
          <VideoItems
            checkIsLoaded={checkIsLoaded}
            onClick={onClickVideo}
            videos={videoList}
            toWatchVideo={toWatchVideo}
          />
        </div>
        {loading && (
          <div style={{ marginTop: 20 }}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

Videos.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Videos);
