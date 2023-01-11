import keyMirrorWithPrefix from 'application/utils/keyMirrorWithPrefix';

export const FIELDS = keyMirrorWithPrefix(
  {
    LOGIN: null,
    PASSWORD: null,
    EMAIL: null,
  },
  'PARAM_TYPES_ITEM_FIELD_',
);

export const LABELS = {
  ERRORS_FIELDS: 'Обязательное поле',
  ERROR_BAD_REQUEST: 'Неправильный логин или пароль',
  ERROR_FILL_FIELDS: 'заполните, пожалуйста, все поля',
  ERROR_LOGIN: 'логин должен быть больше 3 символов и меньше 15',
  ERROR_PASSWORD: 'слишком легкий пароль',
  ERROR_PASSWORD_MAX: 'пароль должен содержать до 20 символов',
  ERROR_LOGIN: 'Пользователь с таким логином уже существует',
  ERROR_EMAIL: 'не корректный email',
  ERROR_UNIQUE_EMAIL: 'Пользователь с такой почтой уже существует',
};

export const ERROR_LABELS = {
  ERROR_LOGIN: 'Пользователь с таким логином уже существует',
  ERROR_LOGIN_MIN: 'login must be longer than or equal to 3 characters',
  ERROR_LOGIN_MAX: 'login must be shorter than or equal to 15 characters',
  ERROR_PASSWORD: 'password must be longer than or equal to 3 characters',
  ERROR_PASSWORD_MAX: 'password must be shorter than or equal to 20 characters',
  ERROR_EMAIL: 'не  корректный email',
  ERROR_UNIQUE_EMAIL: 'Пользователь с такой почтой уже существует',
};
