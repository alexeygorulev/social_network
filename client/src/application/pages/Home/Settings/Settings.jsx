import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import InputSelect from 'application/common/Fields/InputSelect';
import InputBasic from 'application/common/Fields/InputBasic';
import { FIELDS, LABELS } from './contants';

const Settings = (props) => {
  const { store } = props;
  const { mounted, mount, unmount, values, labels, onChange, day, month, year } = store;
  const items = [
    { id: 1, title: 'Женат' },
    { id: 2, title: 'Не женат' },
  ];

  console.log(year);
  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!mounted) return null;
  return (
    <div className="settings__container">
        <h2>Настройки профиля</h2>
      <div className="settings__item">
        <div className="setting__info">Укажите ваше имя:</div>
        <InputBasic value={values[FIELDS.NAME]} id={FIELDS.NAME} onChange={onChange} placeholder={'Имя'} />
      </div>
      <div className="settings__item">
        <div className="setting__info">Укажите вашу фамилию:</div>
        <InputBasic
          value={values[FIELDS.LAST_NAME]}
          id={FIELDS.LAST_NAME}
          onChange={onChange}
          placeholder={'Фамилия'}
        />
      </div>
      <div className="settings__item">
        <div className="setting__info">Укажите ваш статус:</div>
        <InputBasic value={values[FIELDS.STATUS]} id={FIELDS.STATUS} onChange={onChange} placeholder={'Ваш статус'} />
      </div>
      <div className="settings__item">
        <div className="setting__info">
          <p>Семейное положение:</p>
        </div>
        <InputSelect
          value={values[FIELDS.FAMILY_STATUS]}
          id={FIELDS.FAMILY_STATUS}
          onChange={onChange}
          width={243}
          items={LABELS.FAMILY_STATUS}
          placeholder={'Не выбрано'}
        />
      </div>
      <div className="settings__item">
        <div className="setting__info">Дата рождения:</div>
        <InputSelect
          value={values[FIELDS.DAY]}
          id={FIELDS.DAY}
          onChange={onChange}
          width={80}
          items={day}
          placeholder={'День'}
        />
        <InputSelect
          value={values[FIELDS.MONTH]}
          id={FIELDS.MONTH}
          onChange={onChange}
          width={90}
          items={month}
          placeholder={'Месяц'}
        />
        <InputSelect
          value={values[FIELDS.YEAR]}
          id={FIELDS.YEAR}
          onChange={onChange}
          width={80}
          items={year}
          placeholder={'Год'}
        />
      </div>
      <div className="settings__item">
        <div className="setting__info">Место проживания</div>
        <InputBasic
          value={values[FIELDS.CITY]}
          id={FIELDS.CITY}
          onChange={onChange}
          placeholder={'Ваше место проживания'}
        />
      </div>
      <div className="settings__item">
        <div className="setting__info">Университет</div>
        <InputBasic
          value={values[FIELDS.UNIVERSITY]}
          id={FIELDS.UNIVERSITY}
          onChange={onChange}
          placeholder={'Ваш Университет'}
        />
      </div>

      <div className='sittings__button'>
        <button className='btn btn-primary'>Сохранить</button>
      </div>
    </div>
  );
};

Settings.propTypes = {
  store: PropTypes.shape().isRequired,
};
export default observer(Settings);
