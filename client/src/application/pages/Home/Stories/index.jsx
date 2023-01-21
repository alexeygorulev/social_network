import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Story';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;
  const { storyStore } = homeStore;

  return <Component {...props} store={storyStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
