import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Request';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;
  const { requestStore } = homeStore;

  return <Component {...props} store={requestStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
