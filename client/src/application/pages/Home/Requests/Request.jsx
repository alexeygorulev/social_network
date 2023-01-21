import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Request = (props) => {
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
      <div className="friend-requests">
        <h4>Requests</h4>
        <div className="request">
          <div className="info">
            <div className="profile-photo">
              <img src="./images/profile-1.jpg" alt="" />
            </div>
            <div>
              <h5>HAJIA</h5>
              <p className="text-muted">9 mutual</p>
            </div>
          </div>
          <div className="action">
            <button className="btn btn-primary">Accept</button>
            <button className="btn">Decline</button>
          </div>
        </div>
      </div>
    </>
  );
};

Request.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Request);
