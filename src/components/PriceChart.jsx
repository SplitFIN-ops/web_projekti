import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function PriceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="day" />

        <YAxis
          domain={["auto", "auto"]}
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="price"
          stroke="#16a34a"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PriceChart;