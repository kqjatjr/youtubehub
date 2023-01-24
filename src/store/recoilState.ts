import { atom } from "recoil";

type TRecord = {
  activityControls: string[];
  header: string;
  products: string[];
  subtitles: { name: string; url: string }[];
  time: string;
  title: string;
  titleUrl: string;
};
type IStatistics = {
  [key: number]: {
    [key: number]: TRecord[];
  };
};

export const dataState = atom({
  key: "dataState",
  default: undefined as IStatistics | undefined,
});
