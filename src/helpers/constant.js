export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/";
export const ORDER_STEPS = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
];
export const STATUS_STYLES = {
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-600",
  cancelled: "bg-red-100 text-red-700",
  packed: "bg-purple-100 text-purple-700",
  confirmed: "bg-emerald-100 text-emerald-700",
};
