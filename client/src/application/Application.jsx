import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Toastify from './common/Teastify/Toastify';
import Cookies from 'react-cookie/cjs/Cookies';
import withCookies from 'react-cookie/cjs/withCookies';

function Application(props) {
  const { store } = props;
  const { mounted, mount, unmount, initialized, newMessage, checkNotification} = store;
  useEffect(() => {
    if (!mounted) mount();

    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!mounted) return null;

  if (!initialized) return <div>типа лоадер</div>;

  const token = false;
  const cookie = new Cookies()
  console.log(cookie.get('token'));
  if (!!token) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    );
  } else {
    return (
      <>
        {checkNotification && <Toastify message={newMessage} />}
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      </>
    );
  }
}

Application.propTypes = {
  adminApi: PropTypes.shape({
    baseUrl: PropTypes.string.isRequired,
  }).isRequired,
  store: PropTypes.shape().isRequired,
};

Application.defaultProps = {};

export default withCookies(observer(Application));
