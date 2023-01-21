import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Feed = (props) => {
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
      <div className="feed">
        <div className="head">
          <div className="user">
            <div className="profile-photo">
              <img src="./images/profile-11.jpg" alt="" />
            </div>
            <div className="ingo">
              <h3>Lana Rose</h3>
              <small>Dubai, 15 min ago</small>
            </div>
          </div>
          <span className="edit">
            <i className="uil uil-ellipsis-h"></i>
          </span>
        </div>
        <div className="photo">
          <img src="./images/feed-3.jpg" alt="" />
        </div>

        <div className="action-buttons">
          <div className="interaction-buttons">
            <span>
              <i className="uil uil-heart"></i>
            </span>
            <span>
              <i className="uil uil-comment-dots"></i>
            </span>
            <span>
              <i className="uil uil-share"></i>
            </span>
          </div>
          <div className="bookmark">
            <span>
              <i className="uil uil-bookmark-full"></i>
            </span>
          </div>
        </div>
        <div className="liked-by">
          <span>
            <img src="./images/profile-12.jpg" alt="" />
          </span>
          <p>
            Liked by <b>Ernest Archiver</b> and <b>other</b>{' '}
          </p>
        </div>
        <div className="caption">
          <p>
            <b>lore Roser</b> text <span className="harsh-tag">#lifestyle</span>
          </p>
        </div>
        <div className="comments text-muted">View all 227 comments</div>
      </div>
    </>
  );
};

Feed.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Feed);
