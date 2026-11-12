export function getWatchlist() {
  return JSON.parse(
    localStorage.getItem("watchlist") || "[]"
  );
}

export function addToWatchlist(id) {
  const watchlist = getWatchlist();

  if (!watchlist.includes(id)) {
    watchlist.push(id);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    );
  }
}

export function removeFromWatchlist(id) {
  const watchlist = getWatchlist().filter(
    (coinId) => coinId !== id
  );

  localStorage.setItem(
    "watchlist",
    JSON.stringify(watchlist)
  );
}