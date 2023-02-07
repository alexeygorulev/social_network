import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';

const FriendItem = ({ friend, isUsers, friendsRequests, createFriendRequest, friends }) => {
  const { setting } = friend;
  return (
    <>
      <div className="friends__item">
        <div>
          <img src="/" alt="" />
        </div>
        <div className="friend__info">
          <h4>{!setting?.name || !setting?.lastName ? friend.login : `${setting.name} ${setting.lastName}`}</h4>
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
