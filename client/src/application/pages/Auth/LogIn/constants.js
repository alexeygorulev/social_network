import keyMirrorWithPrefix from 'application/utils/keyMirrorWithPrefix';

export const FIELDS = keyMirrorWithPrefix(
  {
    LOGIN: null,
    PASSWORD: null,
  },
  'PARAM_TYPES_ITEM_FIELD_',
);

export const LABELS = {
  ERRORS_FIELDS: 'Обязательное поле',
  ERROR_BAD_REQUEST: 'Неправильный логин или пароль',
  ERROR_FILL_FIELDS: 'заполните, пожалуйста, все поля',
};
