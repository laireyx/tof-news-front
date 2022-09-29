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
    return `${~~timeDiff}초 전`;
  }
  if (timeDiff < 3600) {
    return `${~~(timeDiff / 60)}분 전`;
  }
  return `${~~(timeDiff / 3600)}시간 전`;
}

export { dateInfo };
