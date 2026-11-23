import React from "react";

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

export const getCachedRoles = () => {
  try {
    const raw = typeof window !== "undefined" && localStorage.getItem("cachedRoles");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

export const setCachedRoles = (roles) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("cachedRoles", JSON.stringify(roles));
    }
  } catch {}
};

export const isFullAccess = (list) => {
  const arr = Array.isArray(list) ? list : [list];
  return arr.some((item) => {
    const s = String(item || "").toLowerCase().trim();
    return s === "full_access" || s === "*" || s === "all";
  });
};

export const getRoleConfig = (roleOrUser, list = []) => {
  // 1. If roleOrUser is an object with direct permissions or pages
  if (roleOrUser && typeof roleOrUser === "object") {
    const roleObj =
      roleOrUser.roleId && typeof roleOrUser.roleId === "object"
        ? roleOrUser.roleId
        : roleOrUser.roleObj || roleOrUser;

    const perms = roleOrUser.permissions || roleObj.permissions;
    const pages = roleOrUser.pages || roleObj.pages;
    const roleName = String(
      roleOrUser.rolename ||
      roleOrUser.role ||
      roleObj.rolename ||
      roleObj.role ||
      roleObj.name ||
      ""
    ).toLowerCase().trim();

    if (roleName === "admin" || roleName.includes("admin")) {
      return {
        id: "ROLE-ADMIN",
        name: "Admin",
        role: "admin",
        rolename: "Admin",
        permissions: ["Full_Access"],
        pages: ["Full_Access"],
      };
    }

    if ((Array.isArray(perms) && perms.length > 0) || (Array.isArray(pages) && pages.length > 0)) {
      return {
        ...roleOrUser,
        role: roleName,
        rolename: roleOrUser.rolename || roleObj.rolename || roleName,
        permissions: Array.isArray(perms) ? perms : [],
        pages: Array.isArray(pages) ? pages : [],
      };
    }
  }

  // 2. Resolve target role string identifier
  const rawTarget = String(
    (typeof roleOrUser === "object"
      ? roleOrUser?.role || roleOrUser?.rolename || roleOrUser?.name
      : roleOrUser) || ""
  ).toLowerCase().trim();

  // If no role specified or guest, limit to guest config (Dashboard only)
  if (!rawTarget || rawTarget === "guest") {
    return {
      id: "ROLE-GUEST",
      name: "Guest",
      role: "guest",
      rolename: "Guest",
      permissions: ["view_dashboard"],
      pages: ["Dashboard", "dashboard", "/dashboard"],
    };
  }

  const target = rawTarget;

  if (target === "admin" || target.includes("admin")) {
    return {
      id: "ROLE-ADMIN",
      name: "Admin",
      role: "admin",
      rolename: "Admin",
      permissions: ["Full_Access"],
      pages: ["Full_Access"],
    };
  }

  // 3. Check current logged-in user if role matches
  try {
    const curUser = getCurrentUser();
    if (curUser) {
      const curRole = String(
        curUser.role || curUser.rolename || curUser.roleId?.rolename || ""
      ).toLowerCase().trim();
      if (curRole === target) {
        const perms = curUser.permissions || curUser.roleId?.permissions;
        const pages = curUser.pages || curUser.roleId?.pages;
        if ((Array.isArray(perms) && perms.length > 0) || (Array.isArray(pages) && pages.length > 0)) {
          return {
            id: curUser.roleId?._id || curUser.id || `ROLE-${target}`,
            name: curUser.rolename || curUser.role || target,
            role: target,
            permissions: Array.isArray(perms) ? perms : [],
            pages: Array.isArray(pages) ? pages : [],
          };
        }
      }
    }
  } catch {}

  // 4. Check cached backend roles from Redux / localStorage
  try {
    const cachedRoles = getCachedRoles();
    if (Array.isArray(cachedRoles) && cachedRoles.length > 0) {
      const match = cachedRoles.find(
        (r) =>
          String(r.rolename || r.role || r.name || "").toLowerCase().trim() === target ||
          String(r.id || r._id || "").toLowerCase().trim() === target
      );
      if (match) {
        return {
          ...match,
          role: target,
          permissions: Array.isArray(match.permissions) ? match.permissions : [],
          pages: Array.isArray(match.pages) ? match.pages : [],
        };
      }
    }
  } catch {}

  // 5. Check static fallback list
  const roles = Array.isArray(list) ? list : [];
  const found = roles.find(
    (r) =>
      String(r.role || "").toLowerCase().trim() === target ||
      String(r.name || "").toLowerCase().trim() === target ||
      String(r.rolename || "").toLowerCase().trim() === target
  );
  if (found) return found;

  // 6. Default fallback
  return { id: `ROLE-${target}`, name: target, role: target, permissions: [], pages: [] };
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
  "/customers": "Customers",
  "/management/leads": "Leads",
  "/leads": "Leads",
  "/management/order": "Orders",
  "/management/orders": "Orders",
  "/orders": "Orders",
  "/management/transactions": "Transactions",
  "/management/transaction": "Transactions",
  "/transactions": "Transactions",
  "/settings/users": "System Users",
  "/users": "System Users",
  "/settings/roles": "Roles",
  "/roles": "Roles",
};

export const normalizePageIdentifier = (pageOrRoute = "", parentGroup = "") => {
  const str = String(pageOrRoute || "").trim();
  const low = str.toLowerCase();
  const pLow = String(parentGroup || "").toLowerCase();

  if (PAGE_ROUTES[low]) return PAGE_ROUTES[low];

  // Contextual mapping based on parent menu group
  if (pLow.includes("category")) {
    if (low === "products" || low === "product") return "Products Category";
    if (low === "blogs" || low === "blog") return "Blogs Category";
  }
  if (pLow.includes("overview")) {
    if (low === "products" || low === "product") return "Products";
    if (low === "blogs" || low === "blog") return "Blogs";
    if (low === "cms") return "CMS";
    if (low === "seo") return "SEO";
  }
  if (pLow.includes("setting")) {
    if (low === "user" || low === "users" || low === "system user" || low === "system users") return "System Users";
    if (low === "role" || low === "roles") return "Roles";
  }
  if (pLow.includes("management")) {
    if (low === "customer" || low === "customers") return "Customers";
    if (low === "lead" || low === "leads") return "Leads";
  }
  if (pLow.includes("order") || pLow.includes("payment")) {
    if (low === "order" || low === "orders") return "Orders";
    if (low === "transaction" || low === "transactions") return "Transactions";
  }

  // Common aliases
  if (low === "user" || low === "users") return "System Users";
  if (low === "role") return "Roles";
  if (low === "customer") return "Customers";
  if (low === "lead") return "Leads";
  if (low === "order") return "Orders";
  if (low === "transaction") return "Transactions";
  if (low === "blog") return "Blogs";
  if (low === "product") return "Products";

  return str;
};

export const canAccessPage = (roleOrUser, pageOrRoute, parentGroup = "") => {
  if (!pageOrRoute) return true;
  const config = getRoleConfig(roleOrUser);
  if (isFullAccess(config.pages) || isFullAccess(config.permissions)) return true;

  const target = normalizePageIdentifier(pageOrRoute, parentGroup).toLowerCase();
  const raw = String(pageOrRoute).toLowerCase().trim();
  const cleanTarget = target.replace(/[^a-z0-9]/g, "");
  const cleanRaw = raw.replace(/[^a-z0-9]/g, "");

  return (config.pages || []).some((p) => {
    const pl = String(p || "").toLowerCase().trim();
    if (pl === "full_access" || pl === "*" || pl === "all") return true;
    const cleanP = pl.replace(/[^a-z0-9]/g, "");
    return (
      pl === target ||
      pl === raw ||
      cleanP === cleanTarget ||
      cleanP === cleanRaw ||
      (cleanTarget && cleanP.includes(cleanTarget)) ||
      (cleanRaw && cleanP.includes(cleanRaw))
    );
  });
};

export const hasPermission = (roleOrUser, permissionKey) => {
  if (!permissionKey) return true;
  const config = getRoleConfig(roleOrUser);
  if (isFullAccess(config.permissions)) return true;

  const k = String(permissionKey).toLowerCase().trim();
  const cleanK = k.replace(/[^a-z0-9]/g, "");

  const altKey = k.startsWith("delete_")
    ? k.replace("delete_", "trash_")
    : k.startsWith("trash_")
    ? k.replace("trash_", "delete_")
    : k;

  return (config.permissions || []).some((perm) => {
    const p = String(perm || "").toLowerCase().trim();
    if (p === "full_access" || p === "*" || p === "all") return true;
    if (p === k || p === altKey) return true;

    const cleanP = p.replace(/[^a-z0-9]/g, "");
    if (cleanP === cleanK) return true;

    // Check if permission covers manage action or simple entity
    if (p.startsWith("manage_")) {
      const managed = p.replace("manage_", "").replace(/[^a-z0-9]/g, "");
      if (cleanK.includes(managed)) return true;
    }
    if (k.endsWith(`_${p}`) || cleanK === `view${cleanP}`) return true;

    return false;
  });
};

export const canPerformAction = (roleOrUser, action = "view", entity = "") => {
  const config = getRoleConfig(roleOrUser);
  if (isFullAccess(config.permissions)) return true;

  const rawEnt = String(entity || (typeof window !== "undefined" ? window.location?.pathname : "")).toLowerCase();
  const ent = rawEnt.replace(/[^a-z0-9]/g, "");
  if (!ent) return true;
  const act = String(action).toLowerCase().trim();

  // View actions are permitted for anyone viewing the page/data
  if (act === "view") return true;

  // Resolve entity aliases to match role permission names
  let baseEnt = ent;
  const currentPath = typeof window !== "undefined" ? String(window.location?.pathname || "").toLowerCase() : "";
  if (ent.includes("blogcat") || (ent.includes("categor") && currentPath.includes("blog"))) baseEnt = "blogcategory";
  else if (ent.includes("productcat") || (ent.includes("categor") && currentPath.includes("product"))) baseEnt = "productcategory";
  else if (ent.includes("user")) baseEnt = "systemuser";
  else if (ent.includes("role")) baseEnt = "roles";
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
  if (hasPermission(config, `manage_${baseEnt}`)) return true;
  return false;
};

export const getCurrentUser = () => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const hasValidToken = Boolean(token && token !== "null" && token !== "undefined");
    if (!hasValidToken) return null;

    const raw = typeof window !== "undefined" && localStorage.getItem("user");
    if (raw) {
      const u = JSON.parse(raw);
      // Auto-heal role if roleId points to a known role in cached roles or token
      if (u && (u.role === "customer" || !u.role || u.rolename === "customer")) {
        try {
          const rawRoles = localStorage.getItem("cachedRoles");
          if (rawRoles) {
            const list = JSON.parse(rawRoles);
            const rId = String(u.roleId?._id || u.roleId || "").toLowerCase();
            const matched = list.find((r) => String(r._id).toLowerCase() === rId || String(r.id).toLowerCase() === rId);
            if (matched && matched.rolename && matched.rolename.toLowerCase() !== "customer") {
              u.role = matched.rolename.toLowerCase();
              u.rolename = matched.rolename;
              if (Array.isArray(matched.permissions) && (!u.permissions || !u.permissions.length)) {
                u.permissions = matched.permissions;
              }
              if (Array.isArray(matched.pages) && (!u.pages || !u.pages.length)) {
                u.pages = matched.pages;
              }
            }
          }
        } catch {}

        try {
          const rawToken = localStorage.getItem("token");
          if (rawToken && rawToken.includes(".")) {
            const payload = JSON.parse(atob(rawToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
            if (payload?.role && payload.role.toLowerCase() !== "customer") {
              u.role = payload.role.toLowerCase();
              u.rolename = payload.role;
              if (Array.isArray(payload.permissions) && (!u.permissions || !u.permissions.length)) {
                u.permissions = payload.permissions;
              }
            }
          }
        } catch {}
      }
      return u;
    }
  } catch {}
  return null;
};

export const setCurrentUser = (userData) => {
  if (typeof window === "undefined") return;
  try {
    const prev = getCurrentUser() || {};
    const next = typeof userData === "function" ? userData(prev) : { ...prev, ...userData };
    localStorage.setItem("user", JSON.stringify(next));
    window.dispatchEvent(new Event("auth-user-changed"));
  } catch {}
};

export const getCurrentRole = () => getCurrentUser()?.role || getCurrentUser()?.rolename || "";

export const isAdminOrDevAdmin = (roleOrUser) => {
  let r = "";
  if (typeof roleOrUser === "string") {
    r = roleOrUser;
  } else if (roleOrUser && typeof roleOrUser === "object") {
    r = roleOrUser.role || roleOrUser.rolename || roleOrUser.name || "";
  }
  if (!r && typeof window !== "undefined") {
    try {
      const stored = JSON.parse(localStorage.getItem("user") || "null");
      r = stored?.role || stored?.rolename || "";
    } catch {}
  }
  if (!r) {
    try {
      r = getCurrentRole?.() || getCurrentUser?.()?.role;
    } catch {}
  }
  if (!r) return false;
  const low = String(r || "").toLowerCase().trim();
  return (
    low === "admin" ||
    low === "dev admin" ||
    low === "dev_admin" ||
    low === "devadmin" ||
    low === "developer" ||
    low === "superadmin" ||
    low.includes("admin") ||
    low.includes("dev")
  );
};

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
  const role = React.useMemo(() => user?.role || user?.rolename || "", [user]);
  const isAdmin = React.useMemo(() => Boolean(user && isAdminOrDevAdmin(user || role)), [user, role]);
  return {
    user,
    role,
    isAdmin,
    isAdminOrDevAdmin: isAdmin,
    canAccessPage: React.useCallback((p, g) => canAccessPage(user || role, p, g), [user, role]),
    hasPermission: React.useCallback((k) => hasPermission(user || role, k), [user, role]),
    canPerformAction: React.useCallback((a, e) => canPerformAction(user || role, a, e), [user, role]),
    setUser: setCurrentUser,
  };
};
