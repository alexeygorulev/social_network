import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { store } = props;
  const { mounted, mount, unmount, logout } = store;

  const rootEl = useRef(null);
  const rootNotificationEl = useRef(null);

  useEffect(() => {
    const onClickNotification = (e) => rootNotificationEl.current.contains(e.target) || setIsNotification(false);
    document.addEventListener('click', onClickNotification);
    return () => {
      document.removeEventListener('click', onClickNotification);
    };
  }, []);

  useEffect(() => {
    const onClick = (e) => rootEl.current.contains(e.target) || setIsLogUot(false);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);
  const [isNotification, setIsNotification] = useState(false);
  const [isLogOut, setIsLogUot] = useState(false);
  if (!mounted) return null;
  const n = require('application/assets/img/defaultPhoto.jpg');
  return (
    <nav>
      <div className="container">
        <div>
          <h2 className="log">watchTogether</h2>
        </div>
        <div className="header__logout">
          <a ref={rootNotificationEl} className="menu-item" id="notifications">
            <span>
              <i onClick={() => setIsNotification(true)} className="uil uil-bell">
                <small className="notifications-count">9+</small>
              </i>
            </span>
            {isNotification && (
              <div className="notifications-popup">
                <div>
                  <div className="profile-photo">
                    <img src="./images/profile-11.jpg" alt="" />
                  </div>
                  <div className="notification-body">
                    <b>keke Benjamin accepted your friend request</b>
                    <small className="text-muted">2 Days ago</small>
                  </div>
                </div>
                <div>
                  <div className="profile-photo">
                    <img src="./images/profile-12.jpg" alt="" />
                  </div>
                  <div className="notification-body">
                    <b>Lol accepted your friend request</b>
                    <small className="text-muted">2 Days ago</small>
                  </div>
                </div>
              </div>
            )}
          </a>
          <div className="header__right" ref={rootEl}>
            <div onClick={() => setIsLogUot(true)} className="profile-photo">
              <img src={n} />
              {isLogOut && (
                <div className="logout-popup">
                    <Link to='/settings' >Настройки</Link>
                    <Link to='/' onClick={logout}>Выйти</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Header);
