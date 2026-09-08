export function buildLoginUrl(currentPath) {
  if (!currentPath || currentPath === "/login") return "/login";
  return `/login?redirect=${encodeURIComponent(currentPath)}`;
}

export function getSafeRedirect(searchParams, fallback = "/") {
  const raw = searchParams.get("redirect");
  if (!raw || raw === "null" || raw === "undefined") return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//")) return fallback;
  return raw;
}
