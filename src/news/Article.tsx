import "react-image-gallery/styles/css/image-gallery.css";

import type { News } from "./types";
import styled from "styled-components";
import ArticleMeta from "./ArticleMeta";
import ArticleContent from "./ArticleContent";

const ArticleBox = styled.div`
  border-radius: 8px;
  background-color: #eeeeeedd;
  padding: 1em;
  flex-basis: calc(50% - 2em - 8px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex: 1 1 content;
  }
`;

function Article({ news }: { news: News }) {
  return (
    <ArticleBox>
      <ArticleContent news={news} />
      <ArticleMeta news={news} />
    </ArticleBox>
  );
}

export default Article;
