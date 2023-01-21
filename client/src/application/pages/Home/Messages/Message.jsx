import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Message = (props) => {
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
      {' '}
      <div className="messages">
        <div className="heading">
          <h4>Messages</h4>
          <i className="uil uil-edit"></i>
        </div>
        {/* <!-- SEARCH BARD --> */}
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input type="search" placeholder="Search messages" id="message-search" />
        </div>

        {/* <!-- MESSAGES CATEGORY --> */}
        <div className="category">
          <h6 className="active">Primary</h6>
          <h6>General</h6>
          <h6 className="message-requests">Requests(7)</h6>
        </div>
        {/* <!-- MESSAGE --> */}
        <div className="message">
          <div className="profile-photo ">
            <img src="./images/profile-10.jpg" alt="" />
            <div className="active"></div>
          </div>
          <div className="message-body">
            <h5>Edem Quist</h5>
            <p className="text-muted"> Just Woke up</p>
          </div>
        </div>
      </div>
    </>
  );
};

Message.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Message);
