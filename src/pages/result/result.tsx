import dayjs from "dayjs";
import sample from "../../sample/시청 기록.json";
import * as _ from "lodash-es";

import "dayjs/locale/ko";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { dataState } from "../../store/recoilState";
dayjs.locale("ko");

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

const Result = () => {
  const [data, setData] = useState<any>();
  const [state, setState] = useRecoilState(dataState);

  useEffect(() => {
    setState(arrayData());
  }, []);

  useEffect(() => {
    count();
  }, [state]);

  const arrayData = () => {
    return Object.keys(sample)
      .map((item) => sample[item as keyof typeof sample])
      .reduce((acc, cur: TRecord) => {
        const day = dayjs(cur.time);
        return {
          ...acc,
          [day.year()]: acc[day.year()]
            ? {
                ...acc[day.year()],
                [day.month() + 1]: acc[day.year()][day.month() + 1]
                  ? [...acc[day.year()][day.month() + 1], cur]
                  : [cur],
              }
            : { [day.month() + 1]: [cur] },
        };
      }, {} as IStatistics);
  };

  const count = () => {
    if (_.isEmpty(state)) {
      return;
    }
    let result: any = {};
    const currentYear = Object.keys(state["2022"]).map((item) => {
      return state["2022"][Number(item)];
    });

    currentYear.forEach((item) => {
      item.forEach((data) => {
        if (data.subtitles && data.subtitles.length > 0) {
          result[data.subtitles[0].name] = result[data.subtitles[0].name]
            ? (result[data.subtitles[0].name] += 1)
            : 1;
        }
      });
    });

    setData(Object.keys(result).map((item) => result[item]));
    return result;
  };

  if (_.isEmpty(state) || !data) {
    return <div>로딩</div>;
  }

  return (
    <div>
      <div>
        {Object.keys(state["2022"])
          .map((item) => {
            return state["2022"][Number(item)];
          })
          .reduce((acc, cur) => {
            acc += cur.length;
            return acc;
          }, 0)}
        개의 영상
      </div>
      <div>{Object.keys(data).map((item) => data[item]).length}명의 유튜버</div>
    </div>
  );
};

export default Result;
