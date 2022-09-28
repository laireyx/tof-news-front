import "./index.css";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import type { News } from "./types";
import { sanitizeHtml } from "./utils";
import styled from "styled-components";
import { useCallback, useMemo } from "react";
import ArticleMeta from "./ArticleMeta";

const ArticleBox = styled.div`
  border-radius: 8px;
  background-color: #eeeeeedd;
  padding: 1em;
  flex-basis: calc(50% - 2em - 8px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ArticlePhoto = styled.img`
  max-width: 100%;
  max-height: 15em;
  object-fit: contain;
  .fullscreen & {
    max-height: calc(100vh - 80px);
  }
`;

const ArticleVideo = styled.video`
  max-width: 100%;
  max-height: 15em;
  object-fit: contain;
`;

function Article({ news }: { news: News }) {
  const imageMedia = useMemo(
    () =>
      news.media.filter(
        (media) => media.type === "photo" || media.type === "animated_gif"
      ),
    [news]
  );

  const videoMedia = useMemo(
    () => news.media.filter((media) => media.type === "video"),
    []
  );

  const renderItem = useCallback(
    ({ original }: ReactImageGalleryItem) => (
      <ArticlePhoto
        key={original}
        src={original}
        referrerPolicy="no-referrer"
      />
    ),
    []
  );

  return (
    <ArticleBox>
      <div className="NewsArticle">
        {imageMedia.length > 0 && (
          <ImageGallery
            items={imageMedia.map((media) => ({
              original: (media.url as string) ?? media.previewUrl ?? "",
              renderItem,
            }))}
            {...{
              showThumbnails: false,
              useBrowserFullscreen: false,
              showPlayButton: false,
              showNav: false,
              autoPlay: true,
            }}
          />
        )}
        {videoMedia.map((media) => (
          <ArticleVideo key={media.url} controls poster={media.previewUrl}>
            {[media.url].flat().map((url) => (
              <source key={url} src={url} />
            ))}
          </ArticleVideo>
        ))}
        <p className="ArticleContent">
          <a href={news.url}>{sanitizeHtml(news.content)}</a>
        </p>
      </div>
      <ArticleMeta news={news} />
    </ArticleBox>
  );
}

export default Article;
