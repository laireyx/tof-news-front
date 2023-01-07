import { useEffect, useState } from "react";
import { News } from "./types";

function sanitizeHtml(html: string) {
  const htmlDoc = new DOMParser().parseFromString(html, "text/html");
  return htmlDoc.body.textContent;
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
    fetch(
      `${
        import.meta.env.VITE_API_ENDPOINT
      }/news/list?p=${page}&source=${source}`,
      {
        signal: controller.signal,
      }
    )
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

export { sanitizeHtml, useNews };
