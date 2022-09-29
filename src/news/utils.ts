import { useEffect, useState } from "react";
import { News } from "./types";

function sanitizeHtml(html: string) {
  const htmlDoc = new DOMParser().parseFromString(html, "text/html");
  return htmlDoc.body.textContent;
}

function dateInfo(timestamp: string | Date): string {
  const date = new Date(timestamp);
  const timeDiff = (Date.now() - date.getTime()) / 1000;
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    dateStyle: "full",
    timeStyle: "short",
    hour12: false,
  });

  if (timeDiff > 86400) {
    return formatter.format(date);
  }
  if (timeDiff < 60) {
    return `${timeDiff}초 전`;
  }
  if (timeDiff < 3600) {
    return `${~~(timeDiff / 60)}분 전`;
  }
  return `${~~(timeDiff / 3600)}시간 전`;
}

function useNews({ source, page }: { source?: string; page: number }) {
  const [pullable, setPullable] = useState(false);
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    setNewsList([]);
  }, [source]);

  useEffect(() => {
    const controller = new AbortController();

    setPullable(false);
    fetch(`https://api.tof.news/news/list?p=${page}&source=${source}`, {
      signal: controller.signal,
    })
      .then((resp) => resp.json())
      .then((json) => {
        setNewsList((currentList) => currentList.concat(json as News[]));
        setPullable(json.length > 0);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      setPullable(true);
      controller.abort();
    };
  }, [page, source]);

  return { newsList, pullable };
}

export { sanitizeHtml, dateInfo, useNews };
