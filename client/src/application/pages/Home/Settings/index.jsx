import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Settings';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;
  const { settingsStore } = homeStore;

  return <Component {...props} store={settingsStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
