import { observer } from 'mobx-react';
import s from './Loader.module.scss'
const Loader = () => {
  return (
    <div className={s.wrapperCenter}>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <div className={s.check_icon}></div>
      </label>
    </div>
  );
};

export default observer(Loader);
