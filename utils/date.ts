/**
 * Format the date into YYYY-MM-DD
 *
 * Wanted to use native JS to get the date, and grab the current formatted version.
 * I didn't want to use any third party plugins here to help format the date to keep the bundle day small
 * Resource: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
 *
 * @param {Date} date
 * @returns {string}
 */
export const formatDateToString = (date: Date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);

  return date.toISOString().split('T')[0];
};

/**
 * Gets the current date and format it
 *
 * @returns {Date}
 */
export const getCurrentDate = (): Date => {
  return new Date();
};

/**
 * Calculate a date in the past based on how many previous days
 *
 * @param {number} previousDay - The amount of previous days
 * @returns {Date}
 */
export const getPreviousDate = (previousDay: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - previousDay);

  return date;
};
