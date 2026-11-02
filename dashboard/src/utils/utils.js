export const getFirstValue = (sources, keys = [], fallback = "") => {
  if (typeof sources === "string" && sources.trim()) return sources;
  if (!sources) return fallback;
  const list = Array.isArray(sources) ? sources : [sources];
  for (const src of list) {
    if (!src) continue;
    if (typeof src === "string" && src.trim()) return src;
    if (typeof src !== "object") continue;
    for (const key of keys) {
      if (!key) continue;
      const val = src[key];
      if (val !== undefined && val !== null && val !== "") {
        return val;
      }
    }
  }
  return fallback;
};

export const getNestedValue = (obj, path, fallback = undefined) => {
  if (!obj || !path) return fallback;
  if (obj[path] !== undefined) return obj[path];
  const val = String(path)
    .split(".")
    .reduce(
      (curr, p) => (curr && typeof curr === "object" ? curr[p] : undefined),
      obj,
    );
  if (val !== undefined) return val;
  if (path === "meta.title")
    return getFirstValue(obj, ["meta_title", "title"], fallback);
  if (path === "meta.description")
    return getFirstValue(obj, ["meta_description", "description"], fallback);
  if (path === "analytics.seoScore")
    return getFirstValue(obj, ["seoScore", "score"], fallback);
  return fallback;
};

export const isColorCode = (str) =>
  typeof str === "string" && (str.startsWith("#") || str.startsWith("rgb"));

export const checkMobile = (maxWidth = 1024) =>
  typeof window !== "undefined" &&
  (Boolean(window.matchMedia?.("(hover: none), (pointer: coarse)").matches) ||
    window.innerWidth <= maxWidth);

export const isVisible = (val) =>
  val !== false && val !== null && val !== undefined;

export const scrollToTop = (behavior = "smooth") => {
  if (typeof window !== "undefined") {
    const beh = typeof behavior === "string" ? behavior : "smooth";
    window.scrollTo({ top: 0, behavior: beh });
  }
};

export const formatPrice = (price, currency = "₹") => {
  if (price === null || price === undefined || price === "") return "";
  if (typeof price === "number") {
    return `${currency}${price.toLocaleString("en-IN")}`;
  }
  const str = String(price).trim();
  if (
    str.startsWith("₹") ||
    str.startsWith("$") ||
    str.startsWith("€") ||
    str.startsWith("£")
  ) {
    return str;
  }
  return `${currency}${str}`;
};

export const formatCurrency = (amount, currency = "₹") => {
  if (amount === null || amount === undefined || amount === "") return "-";
  const num = Number(String(amount).replace(/[^0-9.-]/g, ""));
  if (isNaN(num)) return String(amount);
  return `${currency}${num.toLocaleString("en-IN")}`;
};

export const paginateData = (items = [], page = 1, perPage = 5) => {
  if (!Array.isArray(items)) return [];
  const start = (Math.max(1, Number(page) || 1) - 1) * perPage;
  return items.slice(start, start + perPage);
};

export const copyToClipboard = async (data) => {
  try {
    const str =
      typeof data === "object"
        ? JSON.stringify(data, null, 2)
        : String(data ?? "");
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(str);
      return true;
    }
  } catch (err) {
    console.warn("Failed to copy to clipboard:", err);
  }
  return false;
};
