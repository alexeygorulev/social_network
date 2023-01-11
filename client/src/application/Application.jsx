import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Toastify from './common/Teastify/Toastify';
import Loader from './common/Loader/Loader';

function Application(props) {
  const { store } = props;
  const { mounted, mount, unmount, initialized, newMessage, checkNotification, isToken } = store;
  useEffect(() => {
    if (!mounted) mount();

    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!mounted) return null;

  if (!initialized) return <Loader />;

  if (isToken) {
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

export default observer(Application);
