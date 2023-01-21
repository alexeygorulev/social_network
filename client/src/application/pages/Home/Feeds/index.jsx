import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Component from './Feed';

function Module(props) {
  const { store } = props;
  const { homeStore } = store;
  const { feedStore } = homeStore;

  return <Component {...props} store={feedStore} />;
}

Module.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default inject('store')(Module);
