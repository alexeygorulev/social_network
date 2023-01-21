import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Sidebar = (props) => {
  const { store } = props;
  const { mounted, mount, unmount } = store;

  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div className="sidebar">
        <a className="menu-item ">
          <span>
            <i className="uil uil-home"></i>
          </span>
          <h3>Home</h3>
        </a>
        <a className="menu-item active">
          <span>
            <i className="uil uil-compass"></i>
          </span>
          <h3>Explore</h3>
        </a>
       
        <a className="menu-item" id="messages-norifications">
          <span>
            <i className="uil uil-envelope">
              <small className="notifications-count">6+</small>
            </i>
          </span>
          <h3>Messages</h3>
        </a>
        <a className="menu-item">
          <span>
            <i className="uil uil-bookmark"></i>
          </span>
          <h3>Bookmarks</h3>
        </a>
        <a className="menu-item">
          <span>
            <i className="uil uil-analytics"></i>
          </span>
          <h3>Analytics</h3>
        </a>
        <a className="menu-item">
          <span>
            <i className="uil uil-palette"></i>
          </span>
          <h3>Theme</h3>
        </a>
        <a className="menu-item">
          <span>
            <i className="uil uil-setting"></i>
          </span>
          <h3>Settings</h3>
        </a>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Sidebar);
