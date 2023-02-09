import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Feed from '../Feeds/Feed/Feed';
import { Link } from 'react-router-dom';
import Loader from 'application/common/Loader/Loader';
import { LABELS } from './constants';
import Friend from './Item/Friend';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import UploadPopup from './Popup/UploadPopup';

const Profile = (props) => {
  const { store } = props;
  const {
    mounted,
    mount,
    unmount,
    initialized,
    profileData,
    defaultName,
    friends,
    getFriendProfile,
    getListFriend,
    isUploadPhoto,
    createAvatar,
    avatarId,
    toggleUpload,
    isMyProfile,
  } = store;
  const [isActive, setIsActive] = useState(false);
  const [origimg, setOrigimg] = useState('');
  const [file, setFile] = useState();
  const [origimgFile, setOrigimgFile] = useState('');

  useEffect(() => {
    if (!isMyProfile) setIsActive(false);
    return () => {
      if (!isMyProfile) setIsActive(false);
    };
  }, [isMyProfile]);

  useEffect(() => {
    if (!mounted) mount();

    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!initialized) return <Loader />;

  if (!mounted) return null;
  const openPopup = () => {
    setIsActive(!isActive);
    toggleUpload();
  };
  const handle = (e) => {
    const { files } = e.target;
    if (files && files.length !== 0) {
      setFile(files[0]);
    }
    const imgFile = e.target.files[0];
    setOrigimg(imgFile);

    setOrigimgFile(URL.createObjectURL(imgFile));
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData();
    formData.append('file', file);
    await createAvatar(formData);
    toggleUpload();
  };
  const checkMyProfile = () => {
    if (!isMyProfile) return setIsActive(false);
    setIsActive(!isActive);
  };
  const n = require('application/assets/img/defaultPhoto.jpg');
  return (
    <>
      <div className="container__profile">
        {isUploadPhoto && (
          <UploadPopup toggleUpload={toggleUpload} handleUpload={handleUpload} handle={handle} origimgFile={origimgFile} avatarId={avatarId} />
        )}
        <div className="detail__wrapper">
          <div className="photo__wrapper">
            <div className="photo-profile">
              <div className={`menu ${isActive ? 'active' : ''}`}>
                <div
                  onClick={() => checkMyProfile()}
                  style={{ cursor: `${isMyProfile ? 'pointer' : 'default'}` }}
                  className={`toggle`}
                >
                  <img
                    className="photo"
                    src={avatarId ? `${process.env.REACT_APP_API_URL}/database-files/${avatarId}` : n}
                    alt=""
                  />
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
                <li onClick={openPopup} style={{ '--igs': 4 }}>
                  <Link>
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
          <p>
            <Link onClick={getListFriend} className="text-muted" to={'/friends'}>
              Друзья
            </Link>
          </p>
          <div className="friends">
            <Friend avatarId={avatarId} friends={friends} getFriendProfile={getFriendProfile} />
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
