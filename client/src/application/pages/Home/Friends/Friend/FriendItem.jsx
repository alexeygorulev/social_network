import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const FriendItem = ({ friend, isUsers, friendsRequests, createFriendRequest, friends, getProfileFriend }) => {
  const { setting } = friend;
  const n = require('application/assets/img/defaultPhoto.jpg');

  return (
    <>
      <div className="friends__item">
        <div>
          <Link to={'/profile'}>
            <img
              style={{ cursor: 'pointer' }}
              onClick={() => getProfileFriend(friend.id)}
              src={friend.avatarId ? `${process.env.REACT_APP_API_URL}/database-files/${friend.avatarId}` : n}
              alt=""
            />
          </Link>
        </div>
        <div className="friend__info">
          <h4>
            {!setting[0]?.name || !setting[0]?.lastName ? friend.login : `${setting[0].name} ${setting[0].lastName}`}
          </h4>
          {isUsers && friendsRequests.find((item) => item === friend.id) && (
            <span className="text-muted">Заявка уже отправлена</span>
          )}
          {isUsers &&
            !friends.find((item) => item.id === friend.id) &&
            !friendsRequests.find((item) => item === friend.id) && (
              <span style={{ cursor: 'pointer' }} onClick={() => createFriendRequest(friend.id)}>
                Добавить в друзья
              </span>
            )}
          <span>Написать сообщение</span>
        </div>
      </div>
    </>
  );
};

export default observer(FriendItem);
