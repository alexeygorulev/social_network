import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Music = (props) => {
  const { store } = props;
  const { mounted, mount, unmount, kek, file } = store;
  console.log(file);
  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div>
      <button onClick={kek}>1231323</button>
      <video src={file ? URL.createObjectURL(file) : null}></video>
    </div>
  );
};

Music.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Music);
