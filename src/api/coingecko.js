const API_URL = "https://api.coingecko.com/api/v3";

const cache = {};

/**
 * Fetch the top coins
 */
export async function getTopCoins() {
  const cacheKey = "top-coins";

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const response = await fetch(
    `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coins");
  }

  const data = await response.json();

  cache[cacheKey] = data;

  return data;
}

/**
 * Fetch the details of a specific coin
 */
export async function getCoinDetails(id) {
  const cacheKey = `coin-${id}`;

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const response = await fetch(
    `${API_URL}/coins/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coin details");
  }

  const data = await response.json();

  cache[cacheKey] = data;

  return data;
}

/**
 * Fetch the historical data of a specific coin
 */

export async function getCoinHistory(id) {
  const cacheKey = `history-${id}`;

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const response = await fetch(
    `${API_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }

  const data = await response.json();

  cache[cacheKey] = data;

  return data;
}