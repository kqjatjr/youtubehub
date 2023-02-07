import { atom, selectorFamily } from "recoil";
import { mapYearToArray } from "../util/mapHistoryData";

export type THistoryRecord = {
  id: string;
  activityControls: string[];
  header: string;
  products: string[];
  subtitles: { name: string; url: string }[];
  time: string;
  title: string;
  titleUrl: string;
};

export type TMonthHistories = THistoryRecord[];
export type TYearHistories = {
  [key: number]: THistoryRecord[];
};
export type IStatistics = Record<number, TYearHistories>;

export const youtubeHistoryState = atom({
  key: "youtubeHistoryState",
  default: undefined as IStatistics | undefined,
});

export const youtubeHistoryOfSelectedYearState = selectorFamily({
  key: "youtubeHistoryOfSelectedYearState",
  get:
    (year: number) =>
    ({ get }) => {
      const list = get(youtubeHistoryState);
      return Object.values(list?.[year] || {});
    },
});

export const youtubeHistoryOfSelectedYearArrayState = selectorFamily({
  key: "youtubeHistoryOfSelectedYearArrayState",
  get:
    (year: number) =>
    ({ get }) => {
      const list = get(youtubeHistoryOfSelectedYearState(year));
      return mapYearToArray(list);
    },
});

export const rankOfYoutubeCreatorOfSelectedYearState = selectorFamily({
  key: "rankOfYoutubeCreatorOfSelectedYearState",
  get:
    (year: number) =>
    ({ get }) => {
      const list = get(youtubeHistoryOfSelectedYearArrayState(year));
      const result = list.reduce((acc, data) => {
        const [subtitle] = data.subtitles ?? [];
        if (subtitle) {
          acc[subtitle.name] = (acc[subtitle.name] ?? 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(result).sort((a, b) => b[1] - a[1]);
    },
});
