import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';
import Story from './Stories';
import Feeds from './Feeds';
import Stories from './Stories';
import Messages from './Messages';
import Requests from './Requests';

const Home = (props) => {
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
    <div>
      <Header />
      <main>
        <div className="container">
          <div className="left">
            <a className="profile">
              <div className="profile-photo">
                <img src={n} />
              </div>
              <div className="handle">
                <h4>Diana</h4>
                <p className="text-muted">@dayi</p>
              </div>
            </a>
            <Sidebar />
          </div>
          <div className="middle">
            <Stories />
            <form className="create-post">
              <div className="profile-photo">
                <img src="./images//profile-1.jpg" alt="" />
              </div>
              <input type="text" placeholder="whats on yout mind" />
              <input type="submit" value="Post" className="btn btn-primary" />
            </form>
            <div className="feeds">
              <Feeds />
            </div>
          </div>
          <div className="right">
            <Messages />
            <Requests />
          </div>
        </div>
      </main>
    </div>
  );
};

Home.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Home);
