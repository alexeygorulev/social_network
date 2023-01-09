import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './LogIn';

function Module(props) {
  const { store } = props;
  const { authContent } = store;
  const { loginStore } = authContent;

  return <Component {...props} store={loginStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
