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
  const [rankData, setRankData] = useState<[string, number][]>();
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
    if (!state) {
      return;
    }
    let result: any = {};
    const currentYear = Object.keys(state["2022"]).map((item) => {
      return state["2022"][Number(item)];
    });
    console.log(currentYear);

    currentYear.forEach((item) => {
      item.forEach((data) => {
        if (data.subtitles && data.subtitles.length > 0) {
          result[data.subtitles[0].name] = result[data.subtitles[0].name]
            ? (result[data.subtitles[0].name] += 1)
            : 1;
        }
      });
    });
    const changeArray: [string, number][] = Object.entries(result);
    setRankData(changeArray.sort((a, b) => b[1] - a[1]));
    return result;
  };

  if (!state || !rankData) {
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
      <div>{rankData.length}명의 유튜버</div>
      <div>
        제일 많이본 유튜버 : {rankData[0][0]}님을 {rankData[0][1]}번
        시청하셨습니다.
      </div>
      <div>
        <div>당신의 올해를 만들어준 유튜버는</div>
        <ul>
          {rankData.slice(0, 10).map((item, idx) => {
            return (
              <li key={idx}>
                {item[0]} : {item[1]}회 시청
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Result;
