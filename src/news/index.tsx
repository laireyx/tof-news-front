import { useCallback, useEffect, useRef, useState } from "react";
import ReactLoading from "react-loading";

import Article from "./Article";
import useRadio from "../common/radio";
import styled from "styled-components";
import { useNews } from "./utils";

const News = styled.div`
  flex-grow: 1;

  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: center;
  gap: 1em;
`;
const LoadingWrapper = styled.div`
  flex-basis: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function TofNews() {
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
      if (entry.isIntersecting && pullable) {
        observer.unobserve(entry.target);
        setPage(page + 1);
        observer.observe(entry.target);
      }
    },
    [page]
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
      <News>
        {newsList.map((news) => (
          <Article key={news.url} news={news} />
        ))}
        <LoadingWrapper ref={loadingRef}>
          <ReactLoading type="bubbles" />
        </LoadingWrapper>
      </News>
    </>
  );
}

export default TofNews;
