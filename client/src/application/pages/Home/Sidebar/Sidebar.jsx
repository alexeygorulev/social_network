import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Item from './Item/Item';

const Sidebar = (props) => {
  const { store } = props;
  const { mounted, mount, unmount, listItems, changeClassOnActive, getProfile } = store;
  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div className="sidebar">
        {listItems.map((item) => (
          <Item key={item.title} item={item} changeClassOnActive={changeClassOnActive} />
        ))}
      </div>
    </>
  );
};

Sidebar.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Sidebar);
