import { useCallback, useEffect, useRef, useState } from "react";
import ReactLoading from "react-loading";

import "./index.css";
import { NewsList } from "./NewsType";
import NewsArticle from "./NewsArticle";
import useRadio from "../common/radio";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  flex-basis: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function useNews({ source, page }: { source?: string; page: number }) {
  const [pullable, setPullable] = useState(true);
  const [newsList, setNewsList] = useState<NewsList>([]);

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
        setNewsList((currentList) => currentList.concat(json as NewsList));
        setPullable(json.length > 0);
      });

    return () => controller.abort();
  }, [page, source]);

  return { newsList, pullable };
}

function News() {
  const [page, setPage] = useState(0);
  const { Radio, value: source } = useRadio([
    { show: "All", value: "" },
    { show: "Twitter[EN/JP]", value: "Twitter" },
    { show: "Weibo[CN]", value: "Weibo" },
  ]);

  useEffect(() => {
    setPage(0);
  }, [source]);

  const { pullable, newsList } = useNews({ page, source });

  const loadingRef = useRef<HTMLDivElement>(null);

  const checkScroll = useCallback<IntersectionObserverCallback>(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        setPage((currentPage) => currentPage + 1);
        observer.observe(entry.target);
      }
    },
    []
  );

  useEffect(() => {
    if (loadingRef.current && pullable) {
      const observer = new IntersectionObserver(checkScroll, {
        threshold: 0,
      });
      observer.observe(loadingRef.current);
      return () => observer.disconnect();
    }
  }, [loadingRef, pullable]);

  return (
    <>
      {Radio}
      <div className="News">
        {newsList.map((news) => (
          <NewsArticle key={news.timestamp.toString()} news={news} />
        ))}
        <LoadingWrapper ref={loadingRef}>
          <ReactLoading type="bubbles" />
        </LoadingWrapper>
      </div>
    </>
  );
}

export default News;
