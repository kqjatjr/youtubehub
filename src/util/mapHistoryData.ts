import { TYearHistories } from "../store/recoilState";

const MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const mapYearToArray = (year: TYearHistories) => {
  return MONTH.flatMap((month) => year[month] ?? []);
};
