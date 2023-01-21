import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Story = (props) => {
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
      <div className="stories">
        <div className="story">
          <div className="profile-photo">
            <img src={n} alt="" />
          </div>
          <p className="name">Your story</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src={n} alt="" />
          </div>
          <p className="name">Your story</p>
        </div>
      </div>
    </>
  );
};

Story.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Story);
