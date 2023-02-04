import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Feed from '../Feeds/Feed/Feed';
import { Link } from 'react-router-dom';
import Loader from 'application/common/Loader/Loader';
import { LABELS } from './constants';

const Profile = (props) => {
  const { store } = props;
  const { mounted, mount, unmount, initialized, profileData, defaultName } = store;
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!initialized) return <Loader />;

  if (!mounted) return null;

  const n = require('application/assets/img/defaultPhoto.jpg');
  return (
    <>
      <div className="container__profile">
        <div className="detail__wrapper">
          <div className="photo__wrapper">
            <div className="photo-profile">
              <div className={`menu ${isActive ? 'active' : ''}`}>
                <div onClick={() => setIsActive(!isActive)} className={`toggle `}>
                  <img className="photo" src={n} alt="" />
                  <span className="time-ago">12 min ago</span>
                </div>
                <li style={{ '--igs': 1 }}>
                  <Link to="/settings">
                    <i className="uil uil-setting"></i>
                  </Link>
                </li>
                <li style={{ '--igs': 2 }}>
                  <Link to="/music">
                    <i className="uil uil-music"></i>
                  </Link>
                </li>
                <li style={{ '--igs': 3 }}>
                  <Link to="/videos">
                    <i className="uil uil-video"></i>
                  </Link>
                </li>
                <li style={{ '--igs': 4 }}>
                  <Link to="/upload">
                    <i className="uil uil-import"></i>
                  </Link>
                </li>
              </div>
            </div>
          </div>
          <div className="info__wrapper">
            <div className="name-profile">
              {!profileData?.name || !profileData?.lastName
                ? defaultName
                : `${profileData.name} ${profileData.lastName}`}
            </div>
            <div className="information-profile">
              <ul>
                <li>Ваш статус: {!profileData?.status ? LABELS.DEFAULT_TEXT : profileData?.status}</li>
                <li>Город: {!profileData?.place ? LABELS.DEFAULT_TEXT : profileData.place}</li>
                <li>Дата рождения: {!profileData?.dateBirthday ? LABELS.DEFAULT_TEXT : profileData.dateBirthday}</li>
                <li>Подробнее</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FRIENDS */}

        <div className="friends__container">
          <p>Друзья</p>
          <div className="friends">
            <div className="friend">
              <img src={n} alt="" />
              <span className="text-muted">Леха</span>
            </div>
            <div className="friend">
              <img src={n} alt="" />
              <span className="text-muted">Некит</span>
            </div>
          </div>
        </div>
        {/* MUSIC */}
        <div className="music__container">
          <div className="show-all">
            <p>Ваша музыка</p>
            <p>Показать все</p>
          </div>
          <div className="songs">
            <div className="song">
              <i className="uil uil-play"></i>
              <span className="text-muted">Wildways: Эхо</span>
            </div>
          </div>
        </div>
        {/* VIDEOS */}
        <div className="video__container">
          <div className="show-all">
            <p>Ваши видеозаписи</p>
            <p>Показать все</p>
          </div>
          <div className="videos">
            <div className="video">тут видео</div>
          </div>
        </div>
        <div className="post__container">
          <Feed />
        </div>
      </div>
    </>
  );
};

Profile.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Profile);
