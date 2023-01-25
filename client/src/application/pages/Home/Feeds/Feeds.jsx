import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Stories from '../Stories';
import Feed from './Feed/Feed';

const Feeds = (props) => {
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
      <Stories />
      <form className="create-post">
        <div className="profile-photo">
          <img src="./images//profile-1.jpg" alt="" />
        </div>
        <input type="text" placeholder="whats on yout mind" />
        <input type="submit" value="Post" className="btn btn-primary" />
      </form>
      <div className="feeds">
        <Feed />
      </div>
    </>
  );
};

Feeds.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Feeds);
