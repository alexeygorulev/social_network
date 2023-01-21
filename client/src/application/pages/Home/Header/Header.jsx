import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

// application/assets/img/defaultPhoto.jpg
const Header = (props) => {
  const { store } = props;
  const { mounted, mount, unmount } = store;

  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!mounted) return null;
  const n = require('../../../assets/img/defaultPhoto.jpg');
  return (
    <nav>
      <div className="container">
        <div>
          <h2 className="log">watchTogether</h2>
        </div>
        <div className='header__logout'>
          <a className="menu-item" id="notifications">
            <span>
              <i className="uil uil-bell">
                <small className="notifications-count">9+</small>
              </i>
            </span>
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
          </a>

          <div className="profile-photo">
            <img src={n} />
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
