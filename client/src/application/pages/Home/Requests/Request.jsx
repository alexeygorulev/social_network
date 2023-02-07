import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from 'application/common/Loader/Loader';

const Request = (props) => {
  const { store } = props;
  const { mounted, mount, unmount, users, acceptFriend, initialized, declineRequestFriend } = store;

  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);
  if (!initialized) return <Loader />;

  if (!mounted) return null;

  return (
    <>
      <h4>Requests</h4>
      {users.map((item, key) => (
        <div key={item.id} className="friend-requests">
          <div className="request">
            <div className="info">
              <div className="profile-photo">
                <img src="./images/profile-1.jpg" alt="" />
              </div>
              <div>
                <h5>
                  {!item?.setting?.name || !item?.setting?.lastName
                    ? item.login
                    : `${item.setting.name} ${item.setting.lastName}`}
                </h5>
                <p className="text-muted">9 mutual</p>
              </div>
            </div>
            <div className="action">
              <button onClick={() => acceptFriend(item.id)} className="btn btn-primary">
                Accept
              </button>
              <button onClick={() => declineRequestFriend(item.id)} className="btn">
                Decline
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

Request.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Request);
