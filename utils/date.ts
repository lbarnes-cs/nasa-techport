/**
 * Gets the current date and format it into YYYY-MM-DD
 *
 * Wanted to use native JS to get the date, and grab the current formatted version.
 * I didn't want to use any third party plugins here to help format the date to keep the bundle day small
 *
 * Resource: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
 * @returns string
 */
export const getCurrentDate = (): string => {
  let date = new Date();
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);

  return date.toISOString().split("T")[0];
};
