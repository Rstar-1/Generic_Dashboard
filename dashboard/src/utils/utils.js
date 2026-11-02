import React from "react";
import { rolesData } from "./apiData.js";

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

export const isFullAccess = (list) => {
  const arr = Array.isArray(list) ? list : [list];
  return arr.some((item) => {
    const s = String(item || "").toLowerCase().trim();
    return s === "full_access" || s === "*" || s === "all";
  });
};

export const getRoleConfig = (roleOrUser, list = rolesData) => {
  const target = String(
    (typeof roleOrUser === "object" ? (roleOrUser?.role || roleOrUser?.name) : roleOrUser) || "admin"
  ).toLowerCase().trim();
  const roles = Array.isArray(list) ? list : [];
  return (
    roles.find((r) => String(r.role).toLowerCase() === target || String(r.name).toLowerCase() === target) ||
    (target.includes("admin")
      ? { id: "ROLE-002", name: "Admin", role: "admin", permissions: ["Full_Access"], pages: ["Full_Access"] }
      : { id: `ROLE-${target}`, name: target, role: target, permissions: [], pages: [] })
  );
};

const PAGE_ROUTES = {
  "/dashboard": "Dashboard",
  "/analytics": "Analytics",
  "/category/products": "Products Category",
  "/category/blogs": "Blogs Category",
  "/overview/products": "Products",
  "/overview/blogs": "Blogs",
  "/overview/cms": "CMS",
  "/overview/seo": "SEO",
  "/management/customers": "Customers",
  "/management/leads": "Leads",
  "/management/order": "Orders",
  "/management/transactions": "Transactions",
  "/settings/users": "System Users",
  "/settings/roles": "Roles",
};

export const normalizePageIdentifier = (pageOrRoute = "", parentGroup = "") => {
  const str = String(pageOrRoute).trim();
  if (PAGE_ROUTES[str.toLowerCase()]) return PAGE_ROUTES[str.toLowerCase()];
  if (String(parentGroup).toLowerCase().includes("category")) {
    if (str.toLowerCase() === "products") return "Products Category";
    if (str.toLowerCase() === "blogs") return "Blogs Category";
  }
  return str;
};

export const canAccessPage = (roleOrUser, pageOrRoute, parentGroup = "") => {
  if (!pageOrRoute) return true;
  const config = getRoleConfig(roleOrUser);
  if (isFullAccess(config.pages) || isFullAccess(config.permissions)) return true;
  const target = normalizePageIdentifier(pageOrRoute, parentGroup).toLowerCase();
  const raw = String(pageOrRoute).toLowerCase();
  return (config.pages || []).some((p) => {
    const pl = String(p).toLowerCase().trim();
    return pl === target || pl === raw || pl.replace(/\s+/g, "") === target.replace(/\s+/g, "");
  });
};

export const hasPermission = (roleOrUser, permissionKey) => {
  if (!permissionKey) return true;
  const config = getRoleConfig(roleOrUser);
  if (isFullAccess(config.permissions)) return true;
  const k = String(permissionKey).toLowerCase().trim();
  const altKey = k.startsWith("delete_")
    ? k.replace("delete_", "trash_")
    : k.startsWith("trash_")
    ? k.replace("trash_", "delete_")
    : k;
  return (config.permissions || []).some((perm) => {
    const p = String(perm || "").toLowerCase().trim();
    return p === "full_access" || p === k || p === altKey;
  });
};

export const canPerformAction = (roleOrUser, action = "view", entity = "") => {
  const config = getRoleConfig(roleOrUser);
  if (isFullAccess(config.permissions)) return true;
  const rawEnt = String(entity || (typeof window !== "undefined" ? window.location?.pathname : "")).toLowerCase();
  const ent = rawEnt.replace(/[^a-z0-9]/g, "");
  if (!ent) return true;
  const act = String(action).toLowerCase().trim();

  // Resolve entity aliases to match rolesData
  let baseEnt = ent;
  const currentPath = typeof window !== "undefined" ? String(window.location?.pathname || "").toLowerCase() : "";
  if (ent.includes("blogcat") || (ent.includes("categor") && currentPath.includes("blog"))) baseEnt = "blogcategory";
  else if (ent.includes("productcat") || (ent.includes("categor") && currentPath.includes("product"))) baseEnt = "productcategory";
  else if (ent.includes("user")) baseEnt = "systemuser";
  else if (ent.includes("article") || ent.includes("blog")) baseEnt = "blogs";
  else if (ent.includes("section") || ent.includes("cms")) baseEnt = "cms";
  else if (ent.includes("page") || ent.includes("seo")) baseEnt = "seo";
  else if (ent.includes("order")) baseEnt = "orders";
  else if (ent.includes("lead")) baseEnt = "leads";
  else if (ent.includes("customer")) baseEnt = "customers";
  else if (ent.includes("product")) baseEnt = "products";
  else if (ent.includes("transaction")) baseEnt = "transactions";

  if (act === "delete" || act === "trash") {
    return hasPermission(config, `trash_${baseEnt}`) || hasPermission(config, `delete_${baseEnt}`);
  }
  if (hasPermission(config, `${act}_${baseEnt}`)) return true;
  if (act === "view" && (canAccessPage(config, entity) || canAccessPage(config, currentPath))) return true;
  return false;
};

export const getCurrentUser = () => {
  try {
    const raw = typeof window !== "undefined" && localStorage.getItem("user");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { id: "USR-001", fullname: "Admin User", role: "admin", email: "admin@example.com", mobile: "9876543210" };
};

export const setCurrentUser = (userData) => {
  if (typeof window === "undefined") return;
  try {
    const next = typeof userData === "function" ? userData(getCurrentUser()) : { ...getCurrentUser(), ...userData };
    localStorage.setItem("user", JSON.stringify(next));
    window.dispatchEvent(new Event("auth-user-changed"));
  } catch {}
};

export const getCurrentRole = () => getCurrentUser()?.role || "admin";

export const useCurrentUser = () => {
  const [user, setUser] = React.useState(getCurrentUser);
  React.useEffect(() => {
    const update = () => setUser(getCurrentUser());
    window.addEventListener("auth-user-changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("auth-user-changed", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  const role = React.useMemo(() => user?.role || "admin", [user]);
  return {
    user,
    role,
    canAccessPage: React.useCallback((p, g) => canAccessPage(role, p, g), [role]),
    hasPermission: React.useCallback((k) => hasPermission(role, k), [role]),
    canPerformAction: React.useCallback((a, e) => canPerformAction(role, a, e), [role]),
    setUser: setCurrentUser,
  };
};
