import { useEffect, useState } from "react";
import "./index.css";
import { NewsList } from "./NewsType";
import NewsArticle from "./NewsArticle";

function useNews(p: number = 0) {
  const [newsList, setNewsList] = useState<NewsList>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.tof.news/news/list?p=${p}`, {
      signal: controller.signal,
    })
      .then((resp) => resp.json())
      .then((json) => {
        setNewsList(json as NewsList);
      });

    return () => controller.abort();
  }, [p]);

  return newsList;
}

function News() {
  const newsList = useNews();
  return (
    <div className="News">
      {newsList.map((news) => (
        <NewsArticle key={news.timestamp.toString()} news={news} />
      ))}
    </div>
  );
}

export default News;
