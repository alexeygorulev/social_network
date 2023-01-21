import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Home';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;

  return <Component {...props} store={homeStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
