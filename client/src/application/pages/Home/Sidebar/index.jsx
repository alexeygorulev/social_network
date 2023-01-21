import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Sidebar';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;
  const { sidebarStore } = homeStore;

  return <Component {...props} store={sidebarStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
