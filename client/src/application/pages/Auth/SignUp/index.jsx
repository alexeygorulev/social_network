import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './SignUp';

function Module(props) {
  const { store } = props;
  const { authContent } = store;
  const { signUpStore } = authContent;

  return <Component {...props} store={signUpStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
