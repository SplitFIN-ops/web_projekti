import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CoinCard({ coin }) {
  return (
    <Card className="hover:shadow-lg cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">

        <img
        src={coin.image}
        alt={coin.name}
        className="w-10 h-10"
        />

      <div>
        <h3>{coin.symbol.toUpperCase()}</h3>

        <p>
          ${coin.current_price.toLocaleString()}
        </p>
      </div>
    </div>
  </CardContent>
</Card>
  );
}

export default CoinCard;