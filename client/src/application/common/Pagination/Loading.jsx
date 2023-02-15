import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

function Loading(props) {
  const { store } = props;
  const { mounted, mount, unmount, handleLoad } = store;

  useEffect(() => {
    if (!mounted) mount();

    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  const handleScroll = () => {
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
    const windowHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 200) {
      handleLoad();
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div />;
}

Loading.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default observer(Loading);
