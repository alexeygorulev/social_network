import keyMirrorWithPrefix from 'application/utils/keyMirrorWithPrefix';

export const FIELDS = keyMirrorWithPrefix(
  {
    NAME: null,
    LAST_NAME: null,
    STATUS: null,
    FAMILY_STATUS: null,
    DAY: null,
    MONTH: null,
    YEAR: null,
    CITY: null,
    UNIVERSITY: null,
  },
  'PARAM_TYPES_ITEM_FIELD_',
);

export const LABELS = {
  FIELDS: {
    [FIELDS.NAME]: 'Имя',
    [FIELDS.LAST_NAME]: 'Фамилия',
  },
  FAMILY_STATUS: [
    { id: 1, title: 'Женат' },
    { id: 2, title: 'Холост' },
    { id: 3, title: 'Невеста' },
    { id: 4, title: 'Замужем' },
    { id: 5, title: 'Влюблен' },
  ],
};
