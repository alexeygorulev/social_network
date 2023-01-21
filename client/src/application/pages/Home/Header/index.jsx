import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Header';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;
  const { headerStore } = homeStore;

  return <Component {...props} store={headerStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
