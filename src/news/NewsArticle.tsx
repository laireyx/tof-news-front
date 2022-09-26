import "./index.css";
import ImageGallery from "react-image-gallery";
import type { News } from "./NewsType";

function sanitizeHtml(html: string) {
  const htmlDoc = new DOMParser().parseFromString(html, "text/html");
  return htmlDoc.body.textContent;
}

function NewsArticle({ news }: { news: News }) {
  return (
    <div className="NewsArticleBox">
      <div className="NewsArticle">
        {news.media.length > 0 ? (
          <ImageGallery
            items={news.media.map((media) => ({
              original: media.url ?? media.previewUrl ?? "",
              originalClass: "ArticlePhoto",
            }))}
            {...{
              showThumbnails: false,
              useBrowserFullscreen: false,
              showPlayButton: false,
              showNav: false,
              autoPlay: true,
            }}
          />
        ) : (
          <></>
        )}
        <p className="ArticleContent">
          <a href={news.url}>{sanitizeHtml(news.content)}</a>
        </p>
      </div>
      <div className="ArticleMeta">
        <div>
          <span className="ArticleAuthor">{news.author ?? "?Unknown"}</span>
          <br />
          <time dateTime={news.timestamp}>
            {new Date(news.timestamp).toString()}
          </time>
        </div>
        <div>
          {news.authorImg ? (
            <img className="ArticleAuthorProfile" src={news.authorImg} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsArticle;
