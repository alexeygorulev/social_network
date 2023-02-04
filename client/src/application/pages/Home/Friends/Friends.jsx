import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Friends = (props) => {
  const { store } = props;
  const { mounted, mount, unmount } = store;

  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!mounted) return null;
  const n = require('application/assets/img/defaultPhoto.jpg');
  return (
    <>
      <div className="friends__container">
        <div className="friends__count">
          <span>Все друзья 312</span>
          <span>Друзья онлайн</span>
        </div>
        <div className="friends__search-bar">
          <input className="input-search" type="search" placeholder="Search messages" id="message-search" />
          <i className="uil uil-search"></i>
        </div>
        <div className="friends__list">
          <div className="friends__item">
            <div>
              <img src={n} alt="" />
            </div>
            <div className="friend__info">
              <h4>Алексей Горулев</h4>
              <span>Написать сообщение</span>
            </div>
          </div>
          <div className="friends__item">
            <div>
              <img src={n} alt="" />
            </div>
            <div className="friend__info">
              <h4>Алексей Горулев</h4>
              <span>Написать сообщение</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Friends.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Friends);
