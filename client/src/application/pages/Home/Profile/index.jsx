import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Profile';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;
  const { profileStore } = homeStore;

  return <Component {...props} store={profileStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
