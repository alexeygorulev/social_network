import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'react-cookie/cjs/Cookies';

const Music = (props) => {
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
    <div>

    </div>
  );
};

Music.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Music);
