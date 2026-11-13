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

  const stored = localStorage.getItem(
    cacheKey
  );

  if (stored) {
    const parsed = JSON.parse(stored);

    const age =
      Date.now() - parsed.timestamp;

    const maxAge =
      5 * 60 * 1000;

    if (age < maxAge) {
      cache[cacheKey] = parsed.data;
      return parsed.data;
    }
  }

  const response = await fetch(
    `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`
  );

  if (response.status === 429) {
    throw new Error(
      "CoinGecko API rate limit reached. Please try again in a few minutes."
    );
  }

  if (!response.ok) {
    throw new Error("Failed to fetch coin details");
  }

  const data = await response.json();

  cache[cacheKey] = data;

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      timestamp: Date.now(),
      data,
    })
  );

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

  const stored = localStorage.getItem(
    cacheKey
  );

  if (stored) {
    const parsed = JSON.parse(stored);

    const age =
      Date.now() - parsed.timestamp;

    const maxAge =
      5 * 60 * 1000;

    if (age < maxAge) {
      cache[cacheKey] = parsed.data;
      return parsed.data;
    }
  }

  const response = await fetch(
    `${API_URL}/coins/${id}`
  );

  if (response.status === 429) {
    throw new Error(
      "CoinGecko API rate limit reached. Please try again in a few minutes."
    );
  }

  if (!response.ok) {
    throw new Error("Failed to fetch coin details");
  }

  const data = await response.json();

  cache[cacheKey] = data;

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      timestamp: Date.now(),
      data,
    })
  );

  return data;
}

/**
 * Fetch the historical data of a specific coin
 */

export async function getCoinHistory(
  id,
  days = 7
) {
  const cacheKey = `history-${id}-${days}`;

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const stored = localStorage.getItem(
    cacheKey
  );

  if (stored) {
    const parsed = JSON.parse(stored);

    const age =
      Date.now() - parsed.timestamp;

    const maxAge =
      5 * 60 * 1000;

    if (age < maxAge) {
      cache[cacheKey] = parsed.data;
      return parsed.data;
    }
  }

  const response = await fetch(
    `${API_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );

  if (response.status === 429) {
    throw new Error(
    "CoinGecko API rate limit reached. Please try again in a few minutes."
    );
    }
    if (!response.ok) {
    throw new Error("Failed to fetch history");
    }

  const data = await response.json();

  cache[cacheKey] = data;

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      timestamp: Date.now(),
      data,
    })
  );

  return data;
}