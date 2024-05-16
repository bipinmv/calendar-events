import { DateTime } from "luxon";

export const getddMMyyyyFormat = date => {
  return DateTime.fromJSDate(date, "dd/M/yy").toFormat("dd/MM/yyyy");
};
