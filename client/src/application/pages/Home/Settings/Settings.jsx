import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Settings = (props) => {
  const { store } = props;
  const { mounted, mount, unmount } = store;

  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="settings__container">
      <div className="settings__item">
        <div className="setting__info"></div>
        <div className="setting__input"><input type="text" /></div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Settings);
