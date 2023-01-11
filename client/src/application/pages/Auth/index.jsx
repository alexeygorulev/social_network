import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Auth';

function Module(props) {
  const { store } = props;
  const { authContent } = store;

  return <Component {...props} store={authContent} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
