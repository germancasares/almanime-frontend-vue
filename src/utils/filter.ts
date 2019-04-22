import { DateTime } from 'luxon';

export { DateFull };

const DateFull = (date: DateTime) => {
    if (!date) { return ''; }
    return date.toLocaleString(DateTime.DATE_FULL);
};

