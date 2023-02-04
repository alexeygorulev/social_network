import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Friends';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;
  const { friendsStore } = homeStore;

  return <Component {...props} store={friendsStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
