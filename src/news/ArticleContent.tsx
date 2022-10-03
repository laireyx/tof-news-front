import styled from "styled-components";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { useCallback, useMemo } from "react";
import type { ImageMedia, News, VideoMedia } from "./types";
import { sanitizeHtml } from "./utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ArticlePhoto = styled.div`
  & img {
    max-width: 100%;
    height: 15em;
    object-fit: contain;
  }
  .fullscreen & img {
    height: inherit;
    max-height: calc(100vh - 80px);
  }
`;
const ArticleVideo = styled.video`
  max-width: 100%;
  height: 15em;
  object-fit: contain;
`;

const ArticleText = styled.p`
  text-indent: 1em;
`;

function ArticleContent({ news }: { news: News }) {
  const imageMedia = useMemo(
    () =>
      news.media.filter(
        (media): media is ImageMedia =>
          media.type === "photo" || media.type === "animated_gif"
      ),
    [news]
  );

  const videoMedia = useMemo(
    () =>
      news.media.filter((media): media is VideoMedia => media.type === "video"),
    []
  );

  const renderItem = useCallback(
    ({ original }: ReactImageGalleryItem) => (
      <ArticlePhoto key={original}>
        <LazyLoadImage
          alt=""
          src={original}
          referrerPolicy="no-referrer"
          effect="blur"
        />
      </ArticlePhoto>
    ),
    []
  );
  return (
    <ContentWrapper>
      {imageMedia.length > 0 && (
        <ImageGallery
          items={imageMedia.map((media) => ({
            original: media.url ?? media.previewUrl ?? "",
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
        <ArticleVideo key={media.previewUrl} controls poster={media.previewUrl}>
          {[media.url].flat().map((url) => (
            <source key={url} src={url} />
          ))}
        </ArticleVideo>
      ))}
      <ArticleText>
        <a href={news.url}>{sanitizeHtml(news.content)}</a>
      </ArticleText>
    </ContentWrapper>
  );
}
export default ArticleContent;
