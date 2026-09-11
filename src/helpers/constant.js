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
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  packed: "bg-purple-100 text-purple-800 border-purple-200",
  shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  paid: "bg-green-100 text-green-800",
  unpaid: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
};
