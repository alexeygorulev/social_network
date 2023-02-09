import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Music';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;
  const { musicStore } = homeStore;

  return <Component {...props} store={musicStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
