import { useEffect, useState } from "react";
import { getTopCoins } from "../api/coingecko";
import CoinCard from "../components/CoinCard";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCoins();
  }, []);

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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Crypto Dashboard</h1>

      {coins.map((coin) => (
        <CoinCard
          key={coin.id}
          coin={coin}
        />
      ))}
    </div>
  );
}

export default Dashboard;