const colors = [
  "#f97316",
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#e11d48",
  "#06b6d4",
  "#84cc16",
  "#f59e0b",
  "#ec4899",
  "#6366f1",
  "#14b8a6",
  "#ef4444",
];

export function getCoinColor(id) {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash += id.charCodeAt(i);
  }

  return colors[hash % colors.length];
}