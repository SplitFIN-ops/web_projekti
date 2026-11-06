import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CoinCard({ coin }) {
  return (
    <Card className="hover:bg-slate-100 cursor-pointer">
      <CardHeader>
        <CardTitle>{coin.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <p>${coin.current_price}</p>
        <p>{coin.price_change_percentage_24h?.toFixed(2)}%</p>
      </CardContent>
    </Card>
  );
}

export default CoinCard;