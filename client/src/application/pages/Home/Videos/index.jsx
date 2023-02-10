import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Videos';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;
  const { videoStore } = homeStore;

  return <Component {...props} store={videoStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
