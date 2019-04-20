import { DateTime } from 'luxon';

export { DateFull };

const DateFull = (date: DateTime) => {
    if (!date) return '';
    // console.log(typeof date);
    return date.toLocaleString(DateTime.DATE_FULL);
};

