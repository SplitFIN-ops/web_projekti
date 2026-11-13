import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PriceChart from "../components/PriceChart";
import { Button } from "@/components/ui/button";
import {
  getCoinDetails,
  getCoinHistory,
} from "../api/coingecko";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../lib/watchlist";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


function Details() {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSaved(
      getWatchlist().includes(id)
    );

    loadCoin();
  }, [id]);

  async function loadCoin() {
  try {
    setLoading(true);
    setError(null);

    const [coinData, historyData] = await Promise.all([
      getCoinDetails(id),
      getCoinHistory(id),
    ]);

    setCoin(coinData);

    const formattedHistory = historyData.prices.map((item) => ({
      day: new Date(item[0]).toLocaleDateString("fi-FI", {
        day: "numeric",
        month: "numeric",
      }),
      price: item[1],
    }));

    setChartData(formattedHistory);
  } catch (error) {
    console.error(error);
    setError("Failed to load cryptocurrency data.");
  } finally {
    setLoading(false);
  }
}

if (error) {
    return <h2>{error}</h2>;
  }

  if (loading) {
  return <h2>Loading...</h2>;
}

if (!coin) {
  return <h2>Coin not found.</h2>;
}

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-4">
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

  <Button
    onClick={() => {
      if (saved) {
        removeFromWatchlist(id);
        setSaved(false);
      } else {
        addToWatchlist(id);
        setSaved(true);
      }
    }}
  >
    {saved
      ? "Remove from Watchlist"
      : "Add to Watchlist"}
  </Button>
</div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Current Price
              </p>
              <p className="text-xl font-bold mt-1">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Market Cap
              </p>
              <p className="text-xl font-bold mt-1">
                ${coin.market_data.market_cap.usd.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Market Rank
              </p>
              <p className="text-xl font-bold mt-1">
                #{coin.market_cap_rank}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                All Time High
              </p>
              <p className="text-xl font-bold mt-1">
                ${coin.market_data.ath.usd.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                24h Change
              </p>
              <p
                className={`text-xl font-bold mt-1 ${
                  coin.market_data.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.market_data
                  .price_change_percentage_24h != null
                  ? `${coin.market_data.price_change_percentage_24h >= 0 ? "+" : ""}${coin.market_data.price_change_percentage_24h.toFixed(
                      2
                    )}%`
                  : "N/A"}
              </p>
            </CardContent>
          </Card>

        </div>
        {chartData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>
                Price History (7 Days)
              </CardTitle>
            </CardHeader>

            <CardContent>
              <PriceChart data={chartData} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Details;