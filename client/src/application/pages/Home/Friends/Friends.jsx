import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from 'application/common/Loader/Loader';
import FriendItem from './Friend/FriendItem';

const Friends = (props) => {
  const { store } = props;
  const {
    mounted,
    mount,
    unmount,
    initialized,
    users,
    visibility,
    stepFriendsList,
    stepUsersList,
    counterFriends,
    isUsers,
    friendsRequests,
    createFriendRequest,
    friends,
  } = store;

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
      <div className="friends__container">
        <div className="friends__count">
          <span onClick={stepFriendsList}>Все друзья {counterFriends}</span>
          <span>Друзья онлайн</span>
          <span onClick={stepUsersList}>Все пользователи</span>
        </div>
        <div className="friends__search-bar">
          <input className="input-search" type="search" placeholder="Search messages" id="message-search" />
          <i className="uil uil-search"></i>
        </div>
        {visibility.friendsList && (
          <div className="friends__list">
            {friends && friends.map((item) => <FriendItem key={item.id} friend={item} isUsers={isUsers} />)}
          </div>
        )}
        {visibility.allUsers && (
          <div className="friends__list">
            {users &&
              users.map((item) => (
                <FriendItem
                  key={item.id}
                  friend={item}
                  friends={friends}
                  isUsers={isUsers}
                  friendsRequests={friendsRequests}
                  createFriendRequest={createFriendRequest}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

Friends.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Friends);
