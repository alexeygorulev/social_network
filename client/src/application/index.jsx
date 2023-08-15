import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Provider, inject } from 'mobx-react';

import { configureApiInstance as configureAdminApiInstance } from '../api/network';

import Application from './Application';
import { create as createApplicationStore } from './store';

const store = createApplicationStore();
const ApplicationWithStore = inject('store')(Application);
function App(props) {
  const { adminApi, ...restProps } = props;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }

    return () => {
      if (mounted) setMounted(false);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <Provider store={store}>
      <ApplicationWithStore adminApi={adminApi} {...restProps} />
    </Provider>
  );
}

App.propTypes = {
  adminApi: PropTypes.shape({
    baseUrl: PropTypes.string.isRequired,
    authorizationToken: PropTypes.string,
  }).isRequired,
};

export default App;
