import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';
import Feeds from './Feeds';
import Messages from './Messages';
import Requests from './Requests';
import { Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import Settings from './Settings';
import Friends from './Friends';
import Loader from 'application/common/Loader/Loader';

const Home = (props) => {
  const { store } = props;
  const { mounted, mount, unmount, initialized } = store;

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
            <Routes>
              <Route path="/" element={<Feeds />} />
              <Route path="/feeds" element={<Feeds />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/friends" element={<Friends />} />
            </Routes>
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
