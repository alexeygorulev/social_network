import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import s from './Fields.module.scss';
import React from 'react';

const InputText = (props) => {
  const [isValid, setIsValid] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const { values } = props;
  useEffect(() => {
    if (values == null) setValueInput('');
    return () => {
    };
  }, [values]);
  const handleChange = (e) => {
    const { value } = e.target;
    const { id, onChange } = props;
    setValueInput(value);
    onChange({ id, value });
  };
  const handleBlur = () => {
    const { id, onBlur } = props;
    setIsValid(!!isValid);
    onBlur({ id, isValid });
  };
  const { placeholder, type } = props;
  return (
    <>
      <input
        type={type}
        className={s.form__style}
        onChange={handleChange}
        value={valueInput}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
    </>
  );
};

export default observer(InputText);
