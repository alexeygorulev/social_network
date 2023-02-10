import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UploadPopup from '../Profile/Popup/UploadPopup';

const Videos = (props) => {
  const { store } = props;
  const { mounted, mount, unmount } = store;
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const toggleUpload = () => {
    setIsOpenPopup(!isOpenPopup);
  };
  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!mounted) return null;
  const isVideo = true;
  return (
    <div>
      {isOpenPopup && <UploadPopup toggleUpload={toggleUpload} isVideo={isVideo} />}
      {/* {isWatchVideo && } */}
      <div className="videos__wrapper">
        <div className="video__info">
          <div>
            <span>Мои видеозаписи</span>
            <span>Все видеозаписи</span>
          </div>
          <div>
            <span  onClick={toggleUpload}>Загрузить</span>
          </div>
        </div>
        <div className="video__list">
          <div className="video__item">
            <div className="video">
              <video src="http://localhost:3001/videos/regist.mp4"></video>
            </div>
            <span style={{ cursor: 'pointer' }}>ржака смотреть до кинца</span>
          </div>
          <div className="video__item">
            <div className="video">
              <video src="http://localhost:3001/videos/regist.mp4"></video>
            </div>
            <span>Жеское видео</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Videos.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Videos);
