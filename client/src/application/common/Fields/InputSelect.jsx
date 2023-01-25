import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import s from './Fields.module.scss';
import React from 'react';

const InputSelect = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState('');
  const rootEl = useRef(null);
  const { items, placeholder, width, id, value, onChange } = props;
  const handleChange = (id, values) => {
    onChange({id, values})
  }
  useEffect(() => {
    const onClick = (e) => rootEl.current.contains(e.target) || setIsOpen(false);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);
  // const { values } = props;
  // useEffect(() => {
  //   if (values == null) setValueInput('');
  //   return () => {};
  // }, [values]);
  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   const { id, onChange } = props;
  //   setValueInput(value);
  //   onChange({ id, value });
  // };
  // const handleBlur = () => {
  //   const { id, onBlur } = props;
  //   setIsValid(!!isValid);
  //   onBlur({ id, isValid });
  // };
  // const { placeholder, type } = props;
  return (
    <div
      ref={rootEl}
      className="input-select"
      style={{ width: width ? width : 300 }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <p>{value ? value : placeholder}</p>
      <i className="uil uil-angle-up"></i>
      {isOpen && (
        <div className="basic-select__items">
          {items.map((item) => (
            <p key={item.id} onClick={() => handleChange(id, item.title) } className="basic-select__item">
              {item.title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(InputSelect);
