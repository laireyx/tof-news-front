import styled from "styled-components";
import { News } from "./types";
import { dateInfo } from "./utils";

const MetaDiv = styled.div`
  margin-bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1em;

  text-align: end;
`;

const ArticleAuthor = styled.span`
  font-weight: bold;
`;

function ArticleMeta({ news }: { news: News }) {
  return (
    <MetaDiv>
      <div>
        <ArticleAuthor>{news.author ?? "?Unknown"}</ArticleAuthor>
        <br />
        <time dateTime={news.timestamp.toString()}>
          {dateInfo(news.timestamp)}
        </time>
      </div>
      {news.authorImg && (
        <img className="ArticleAuthorProfile" src={news.authorImg} />
      )}
    </MetaDiv>
  );
}

export default ArticleMeta;