import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Message';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;
  const { messageStore } = homeStore;

  return <Component {...props} store={messageStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
