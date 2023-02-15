import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UploadPopup from '../../../common/Popup/UploadPopup';
import VideoItems from './Item/VideoItem';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Loader from 'application/common/Loader/Loader';
const Videos = (props) => {
  const { store } = props;
  const { mounted, mount, unmount, videoList, initialized, loading, createVideo } = store;

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [file, setFile] = useState();
  const [origVideoFile, setOrigVideoFile] = useState('');

  const toggleUpload = () => {
    setIsOpenPopup(!isOpenPopup);
  };

  const toWatchVideo = () => {
    setIsWatching(true);
  };
  const handle = (e) => {
    const { files } = e.target;
    if (files && files.length !== 0) {
      setFile(files[0]);
    }
    const imgFile = e.target.files[0];

    setOrigVideoFile(URL.createObjectURL(imgFile));
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData();
    formData.append('video', file);
    await createVideo(formData);
    toggleUpload();
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
    <div className="videos__page">
      {isOpenPopup && (
        <UploadPopup
          handleUpload={handleUpload}
          origVideoFile={origVideoFile}
          handle={handle}
          toggleUpload={toggleUpload}
          isVideo
        />
      )}
      {isWatching && (
        <div className="container-popup">
          <div className="popup__box_video">
            <div style={{ textAlign: 'right' }}>
              <i
                style={{ cursor: 'pointer' }}
                onClick={() => setIsWatching(false)}
                className="uil uil-times-circle"
              ></i>
            </div>
            <div className="video__block">
              <video src="http://localhost:3001/videos/regist.mp4"></video>
            </div>
            <div className="description">
              <span>Название видео</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="videos__wrapper">
        <div className="video__info">
          <div>
            <span>Мои видеозаписи</span>
            <span>Все видеозаписи</span>
          </div>
          <div>
            <span onClick={toggleUpload}>Загрузить</span>
          </div>
        </div>
        <div className="video__list">
          <VideoItems videos={videoList} toWatchVideo={toWatchVideo} />
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
