import { useEffect, useState } from "react";
import { getCoinColor } from "../lib/chartColors";
import CoinCard from "../components/CoinCard";
import WatchlistChart from "../components/WatchlistChart";
import {
  getCoinDetails,
  getCoinHistory,
} from "../api/coingecko";

import { getWatchlist } from "../lib/watchlist";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

function Watchlist() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [days, setDays] = useState(7);

  useEffect(() => {
    async function loadWatchlist() {
      setLoading(true);
      try {
        const watchlist = getWatchlist();

        setSelectedCoins(watchlist);

        const coinData = await Promise.all(
          watchlist.map((id) =>
            getCoinDetails(id)
          )
        );

        setCoins(coinData);

        const historyData = await Promise.all(
          watchlist.map(async (id) => {
            const history = await getCoinHistory(id, days);

            return {
              id,
              history,
            };
          })
        );

        const mergedData = [];

        if (historyData.length > 0) {
          const points =
            historyData[0].history.prices.length;

          for (let i = 0; i < points; i++) {
            const row = {
              day: new Date(
                historyData[0].history.prices[i][0]
              ).toLocaleDateString("fi-FI", {
                day: "numeric",
                month: "numeric",
              }),
            };

            historyData.forEach((coin) => {
              row[coin.id] = Number(
                coin.history.prices[i][1].toFixed(2)
              );
            });

            mergedData.push(row);
          }
        }

        setChartData(mergedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWatchlist();
  }, [days]);

  function toggleCoin(id) {
    setSelectedCoins((prev) =>
      prev.includes(id)
        ? prev.filter(
            (coinId) => coinId !== id
          )
        : [...prev, id]
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <h2>Loading watchlist...</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">
        Watchlist
      </h1>

      <div className="mb-6">
  <Tabs
    value={days.toString()}
    onValueChange={(value) =>
      setDays(Number(value))
    }
  >
    <TabsList>
      <TabsTrigger value="1">
        24H
      </TabsTrigger>

      <TabsTrigger value="7">
        7D
      </TabsTrigger>

      <TabsTrigger value="30">
        30D
      </TabsTrigger>
    </TabsList>
  </Tabs>
</div>

      {coins.length === 0 ? (
        <p>
          No cryptocurrencies in your watchlist.
        </p>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
            {coins.map((coin) => (
              <Badge
                key={coin.id}
                onClick={() => toggleCoin(coin.id)}
                className="cursor-pointer"
                style={{
                  borderColor: getCoinColor(coin.id),
                  backgroundColor: selectedCoins.includes(
                    coin.id
                  )
                    ? getCoinColor(coin.id)
                    : "transparent",
                  color: selectedCoins.includes(coin.id)
                    ? "white"
                    : getCoinColor(coin.id),
                }}
              >
                {coin.symbol.toUpperCase()}
              </Badge>
            ))}
          </div>

          <div className="mb-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Watchlist Performance</CardTitle>
              </CardHeader>

              <CardContent>
                <WatchlistChart
                  data={chartData}
                  selectedCoins={selectedCoins}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={{
                  id: coin.id,
                  image: coin.image.small,
                  symbol: coin.symbol,
                  current_price:
                    coin.market_data.current_price
                      .usd,
                  price_change_percentage_24h:
                    coin.market_data
                      .price_change_percentage_24h,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Watchlist;