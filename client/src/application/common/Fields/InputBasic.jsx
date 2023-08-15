import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import s from './Fields.module.scss';
import React from 'react';

const InputBasic = (props) => {
  const { items, placeholder, width, id, onChange, value } = props;
  const [values, setValues] = useState('');
  useEffect(() => {
    setValues(value);
    return () => {
      setValues(value);
    };
  }, [value]);
  const handleChange = (id, e) => {
    setValues(e.target.value);
    onChange({ id, values: e.target.value });
  };
  return (
    <div className="setting__input">
      <input
        value={values}
        onChange={(e) => handleChange(id, e)}
        className="basic-input-text"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default observer(InputBasic);
