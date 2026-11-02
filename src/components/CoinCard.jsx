import { Link } from "react-router-dom";

function CoinCard({ coin }) {
  return (
    <Link to={`/coin/${coin.id}`}>
    <div className="coin-card">
      <img
        src={coin.image}
        alt={coin.name}
        width="40"
      />

      <h3>{coin.name}</h3>

      <p>${coin.current_price}</p>

      <p>
        24h: {coin.price_change_percentage_24h?.toFixed(2)}%
      </p>
    </div>
    </Link>
  );
}

export default CoinCard;