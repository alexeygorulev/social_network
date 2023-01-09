import { observer } from 'mobx-react';
import React from 'react';
import s from './Toastify.module.scss';

const Toastify = (props) => {
  const { message } = props;
  return (
    <div className={s.wrapper}>
      <p style={{fontSize: 16, fontWight: 700}}>{message}</p>
    </div>
  );
};

export default observer(Toastify);
