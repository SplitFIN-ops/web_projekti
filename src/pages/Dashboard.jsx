import { useEffect, useMemo, useState } from "react";
import { getTopCoins } from "../api/coingecko";
import CoinCard from "../components/CoinCard";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
  async function loadCoins() {
    try {
      const data = await getTopCoins();
      setCoins(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  loadCoins();
}, []);

  const filteredCoins = useMemo(() => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [coins, search]);

  const sortedByPerformance = useMemo(() => {
  return [...coins].sort(
    (a, b) =>
      b.price_change_percentage_24h -
      a.price_change_percentage_24h
  );
}, [coins]);

const topGainer = sortedByPerformance[0];

const topMovers = sortedByPerformance.slice(0, 5);

const topLoser = sortedByPerformance.at(-1);

  if (loading) {
    return (
      <div className="p-8">
        <h2>Loading cryptocurrencies...</h2>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">
          Crypto Dashboard
        </h1>
      </div>

     {/* STATS */}

<div className="grid grid-cols-2 pb-8 border-b">
  <Card>
    <CardContent className="p-4">
      <p className="text-sm text-muted-foreground">
        Top Gainer
      </p>

      <p className="mt-2 font-semibold text-lg">
        {topGainer?.name}
      </p>

      <p className="text-green-500 text-2xl font-bold">
        +{topGainer?.price_change_percentage_24h?.toFixed(2)}%
      </p>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4">
      <p className="text-sm text-muted-foreground">
        Top Loser
      </p>

      <p className="mt-2 font-semibold text-lg">
        {topLoser?.name}
      </p>

      <p className="text-red-500 text-2xl font-bold">
        {topLoser?.price_change_percentage_24h?.toFixed(2)}%
      </p>
    </CardContent>
  </Card>
</div>

      <div className="h-2"/>
      {/* MARKET MOVERS */}
      <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Today's Top Movers</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {topMovers.map((coin) => (
            <div
              key={coin.id}
              className="flex justify-between border-b pb-2"
            >
              <span className="font-medium">
                {coin.name}
              </span>

              <span className="text-green-500 font-semibold">
                +
                {coin.price_change_percentage_24h?.toFixed(
                  2
                )}
                %
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
      </div>

      {/* COIN GRID */}

<div>
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-semibold">
      Top Cryptocurrencies
    </h2>

    <Input
      className="max-w-xs"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {filteredCoins.slice(0, 6).map((coin) => (
      <CoinCard
        key={coin.id}
        coin={coin}
      />
    ))}
  </div>
</div>
    </div>
  );
}

export default Dashboard;