import "./index.css";
import ImageGallery from "react-image-gallery";
import type { News } from "./NewsType";

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

function ArticleMeta({ news }: { news: News }) {
  return (
    <div className="ArticleMeta">
      <div>
        <span className="ArticleAuthor">{news.author ?? "?Unknown"}</span>
        <br />
        <time dateTime={news.timestamp}>{dateInfo(news.timestamp)}</time>
      </div>
      <div>
        {news.authorImg ? (
          <img className="ArticleAuthorProfile" src={news.authorImg} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function NewsArticle({ news }: { news: News }) {
  return (
    <div className="NewsArticleBox">
      <div className="NewsArticle">
        {news.media.length > 0 ? (
          <ImageGallery
            items={news.media.map((media) => ({
              original: media.url ?? media.previewUrl ?? "",
              renderItem: ({ original }) => (
                <img
                  src={original}
                  className="ArticlePhoto"
                  referrerPolicy="no-referrer"
                />
              ),
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
      <ArticleMeta news={news} />
    </div>
  );
}

export default NewsArticle;
