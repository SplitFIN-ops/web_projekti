import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PriceChart from "../components/PriceChart";
import {
  getCoinDetails,
  getCoinHistory,
} from "../api/coingecko";


function Details() {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadCoin();
  }, [id]);

  async function loadCoin() {
  try {
    const [coinData, historyData] = await Promise.all([
  getCoinDetails(id),
  getCoinHistory(id),
]);
    setCoin(coinData);

    const formattedHistory = historyData.prices.map((item) => ({
      day: new Date(item[0]).toLocaleDateString(
        "fi-FI",
        {
          day: "numeric",
          month: "numeric",
        }
      ),
      price: Number(item[1].toFixed(2)),
    }));

    setChartData(formattedHistory);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  if (loading) {
  return <h2>Loading...</h2>;
}

if (!coin) {
  return <h2>Coin not found.</h2>;
}

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={coin.image.large}
          alt={coin.name}
          className="w-16 h-16"
        />

        <div>
          <h1 className="text-4xl font-bold">
            {coin.name}
          </h1>

          <p className="text-muted-foreground">
            {coin.symbol.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <p>
          Current Price: $
          {coin.market_data.current_price.usd.toLocaleString()}
        </p>

        <p>
          Market Cap: $
          {coin.market_data.market_cap.usd.toLocaleString()}
        </p>

        <p>
          Market Rank:
          #{coin.market_cap_rank}
        </p>

        <p>
          All Time High: $
          {coin.market_data.ath.usd.toLocaleString()}
        </p>

        <p>
          24h Change:
          {coin.market_data.price_change_percentage_24h.toFixed(2)}%
        </p>
        {chartData.length > 0 && (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">
      Price History (7 Days)
    </h2>

    <PriceChart data={chartData} />
  </div>
)}
      </div>
    </div>
  );
}

export default Details;