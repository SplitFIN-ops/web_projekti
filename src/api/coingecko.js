const API_URL = "https://api.coingecko.com/api/v3";

/**
 * Fetch the top coins
 */
export async function getTopCoins() {
  const response = await fetch(
    `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coins");
  }

  return await response.json();
}

/**
 * Fetches the details of a specific coin
 */
export async function getCoinDetails(id) {
  const response = await fetch(
    `${API_URL}/coins/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coin details");
  }

  return await response.json();
}