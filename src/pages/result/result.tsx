import dayjs from "dayjs";
import sample from "../../sample/시청 기록.json";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  youtubeHistoryState,
  IStatistics,
  THistoryRecord,
  youtubeHistoryOfSelectedYearArrayState,
  rankOfYoutubeCreatorOfSelectedYearState,
} from "../../store/recoilState";
import Chart from "../../components/Chart";

dayjs.locale("ko");

const enum THUMBNAIL_SIZE {
  NORMAL = "/0.jpg",
  DEFAULT = "/default.jpg",
  MQDEFAULT = "/mqdefault.jpg",
  MAX_SIZE = "/maxresdefault.jpg",
}

const THUMBNAIL_REPLACE_URL = "https://www.youtube.com/watch?v=";

const arrayData = () => {
  return (sample as any[]).reduce(
    (acc, value: Omit<THistoryRecord, "id">, index) => {
      const cur = { id: index, ...value };
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
    },
    {} as IStatistics,
  );
};

const getThumbnailUrl = (
  url: string,
  size: THUMBNAIL_SIZE = THUMBNAIL_SIZE.MAX_SIZE,
) => {
  const youtubeUrl = "https://img.youtube.com/vi/";
  const targetId = url.replace(THUMBNAIL_REPLACE_URL, "");
  return youtubeUrl + targetId + size;
};

const Result = () => {
  const [history, setHistory] = useRecoilState(youtubeHistoryState);
  const [selectedYear] = useState<number>(() => dayjs(Date.now()).year() - 1);
  const lastYear = selectedYear - 1;
  const youtubeHistoryOfSelectedYearArray = useRecoilValue(
    youtubeHistoryOfSelectedYearArrayState(selectedYear),
  );
  const youtubeHistoryOfSelectedLastYearArray = useRecoilValue(
    youtubeHistoryOfSelectedYearArrayState(lastYear),
  );
  const rankData = useRecoilValue(
    rankOfYoutubeCreatorOfSelectedYearState(selectedYear),
  );

  useEffect(() => {
    setHistory(arrayData());
  }, []);

  const rateOfIncrease = () => {
    if (
      !youtubeHistoryOfSelectedYearArray ||
      !youtubeHistoryOfSelectedLastYearArray
    )
      return;
    const currentYearViewCount = youtubeHistoryOfSelectedYearArray.length;

    const lastYearViewCount = youtubeHistoryOfSelectedLastYearArray.length;

    const isIncreased = currentYearViewCount > lastYearViewCount;
    const min = Math.min(currentYearViewCount, lastYearViewCount);
    const max = Math.max(currentYearViewCount, lastYearViewCount);

    return Math.floor((max - min) / min) * 100 * (isIncreased ? 1 : -1);
  };

  if (!history || !rankData) {
    return <div>로딩</div>;
  }

  const firstWatchedVideo = youtubeHistoryOfSelectedYearArray.at(0);
  const lastWatchedVideo = youtubeHistoryOfSelectedYearArray.at(-1);

  return (
    <div>
      <div>{youtubeHistoryOfSelectedYearArray.length} 개의 영상</div>
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
      {firstWatchedVideo && (
        <div>
          <div>--{selectedYear}년 처음본 동영상</div>
          <div>{firstWatchedVideo.title}</div>
          <img src={getThumbnailUrl(firstWatchedVideo.titleUrl)} alt="마지막" />
          <a href={firstWatchedVideo.titleUrl}>{firstWatchedVideo.titleUrl}</a>
        </div>
      )}
      {lastWatchedVideo && (
        <div>
          <div>--{selectedYear}년 마지막에본 동영상</div>
          <div>{lastWatchedVideo.title}</div>
          <img src={getThumbnailUrl(lastWatchedVideo.titleUrl)} alt="마지막" />
          <a href={lastWatchedVideo.titleUrl}>{lastWatchedVideo.titleUrl}</a>
        </div>
      )}
      <div>
        <div>{selectedYear}년도 유튜브 시청 평균 횟수</div>
        <div>
          <Chart selectedYear={selectedYear} />
        </div>
        <div>
          <div>전년대비</div>
          <div>
            {lastYear}년 시청횟수 {youtubeHistoryOfSelectedLastYearArray.length}{" "}
            회
          </div>
          <div>
            {selectedYear}년 시청횟수 {youtubeHistoryOfSelectedYearArray.length}{" "}
            회
          </div>
          <div>전년대비 {rateOfIncrease()}% 시청을 하였습니다.</div>
        </div>
      </div>
    </div>
  );
};

export default Result;
