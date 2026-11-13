import { getCoinColor } from "../lib/chartColors";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WatchlistChart({
  data,
  selectedCoins,
}) {

  return (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <LineChart data={data}>
        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        {selectedCoins.map(
          (coinId, index) => (
            <Line
              key={coinId}
              type="monotone"
              dataKey={coinId}
              stroke={getCoinColor(coinId)}
              dot={false}
            />
          )
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WatchlistChart;