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

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    if (!file || typeof file === "string") return resolve(file || "");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
    const raw =
      typeof window !== "undefined" && localStorage.getItem("cachedRoles");
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
    const s = String(item || "")
      .toLowerCase()
      .trim();
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
        "",
    )
      .toLowerCase()
      .trim();

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

    if (
      (Array.isArray(perms) && perms.length > 0) ||
      (Array.isArray(pages) && pages.length > 0)
    ) {
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
      : roleOrUser) || "",
  )
    .toLowerCase()
    .trim();

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
        curUser.role || curUser.rolename || curUser.roleId?.rolename || "",
      )
        .toLowerCase()
        .trim();
      if (curRole === target) {
        const perms = curUser.permissions || curUser.roleId?.permissions;
        const pages = curUser.pages || curUser.roleId?.pages;
        if (
          (Array.isArray(perms) && perms.length > 0) ||
          (Array.isArray(pages) && pages.length > 0)
        ) {
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
          String(r.rolename || r.role || r.name || "")
            .toLowerCase()
            .trim() === target ||
          String(r.id || r._id || "")
            .toLowerCase()
            .trim() === target,
      );
      if (match) {
        return {
          ...match,
          role: target,
          permissions: Array.isArray(match.permissions)
            ? match.permissions
            : [],
          pages: Array.isArray(match.pages) ? match.pages : [],
        };
      }
    }
  } catch {}

  // 5. Check static fallback list
  const roles = Array.isArray(list) ? list : [];
  const found = roles.find(
    (r) =>
      String(r.role || "")
        .toLowerCase()
        .trim() === target ||
      String(r.name || "")
        .toLowerCase()
        .trim() === target ||
      String(r.rolename || "")
        .toLowerCase()
        .trim() === target,
  );
  if (found) return found;

  // 6. Default fallback
  return {
    id: `ROLE-${target}`,
    name: target,
    role: target,
    permissions: [],
    pages: [],
  };
};

const PAGE_ROUTES = {
  "/dashboard": "Dashboard",
  "/profile": "Profile",
  "/settings/profile": "Profile",
  "/settings/users": "System Users",
  "/users": "System Users",
  "/settings/roles": "Roles",
  "/roles": "Roles",
  "/settings/domain": "Domain",
  "/domain": "Domain",
  "/category/products": "Products Category",
  "/category/blogs": "Blogs Category",
  "/overview/products": "Products",
  "/overview/blogs": "Blogs",
  "/overview/seo": "SEO",
  "/architecture": "Architecture",
  "/campaign": "Campaign",
  "/campaign/whatsapp": "Whatsapp Campaign",
  "/campaign/whasapp": "Whatsapp Campaign",
  "/campaign/gmail": "Gmail Campaign",
  "/campaign/sms": "SMS Campaign",
  "/management/location": "Location",
  "/location": "Location",
  "/management/leads": "Leads",
  "/leads": "Leads",
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
    if (low === "seo") return "SEO";
  }

  if (pLow.includes("setting")) {
    if (
      low === "user" ||
      low === "users" ||
      low === "system user" ||
      low === "system users"
    )
      return "System Users";
    if (low === "role" || low === "roles") return "Roles";
    if (low === "domain" || low === "domains" || low === "domian" || low === "domians") return "Domain";
    if (low === "profile") return "Profile";
  }

  if (pLow.includes("campaign")) {
    if (low === "whatsapp" || low === "whasapp") return "Whatsapp Campaign";
    if (low === "gmail") return "Gmail Campaign";
    if (low === "sms") return "SMS Campaign";
    return "Campaign";
  }

  if (pLow.includes("management")) {
    if (low === "location") return "Location";
    if (low === "leads" || low === "lead") return "Leads";
  }

  // Common aliases
  if (low === "user" || low === "users" || low === "system users")
    return "System Users";
  if (low === "role" || low === "roles") return "Roles";
  if (low === "profile") return "Profile";
  if (low === "dashboard") return "Dashboard";
  if (low === "domain" || low === "domains" || low === "domian" || low === "domians") return "Domain";
  if (low === "architecture") return "Architecture";
  if (low === "location") return "Location";
  if (low === "leads" || low === "lead") return "Leads";
  if (low === "campaign") return "Campaign";
  if (low === "seo") return "SEO";
  if (low === "products" || low === "overview products") return "Products";
  if (low === "products category" || low === "category products")
    return "Products Category";
  if (low === "blogs" || low === "overview blogs") return "Blogs";
  if (low === "blogs category" || low === "category blogs")
    return "Blogs Category";
  if (low === "whatsapp" || low === "whatsapp campaign")
    return "Whatsapp Campaign";
  if (low === "gmail" || low === "gmail campaign") return "Gmail Campaign";
  if (low === "sms" || low === "sms campaign") return "SMS Campaign";

  return str;
};

export const ROLE_PAGE_PERMISSIONS_MAP = {
  "Dashboard": ["view_dashboard"],
  "Profile": ["view_profile"],
  "Domain": ["view_domain"],
  "Domian": ["view_domain"],
  "Products Category": ["view_product_categories", "edit_product_categories", "trash_product_categories"],
  "Blogs Category": ["view_blog_categories", "edit_blog_categories", "trash_blog_categories"],
  "Products": ["view_products", "edit_products", "trash_products"],
  "Blogs": ["view_blogs", "edit_blogs", "trash_blogs"],
  "SEO": ["view_seo", "edit_seo", "trash_seo"],
  "Leads": ["view_leads", "edit_leads", "trash_leads"],
  "System Users": ["view_systemuser", "edit_systemuser", "trash_systemuser"],
  "Roles": ["view_roles", "edit_roles", "trash_roles"],
  "Full_Access": ["Full_Access"],
};

export const canAccessPage = (roleOrUser, pageOrRoute, parentGroup = "") => {
  if (!pageOrRoute) return true;
  const config = getRoleConfig(roleOrUser);
  if (isFullAccess(config.pages) || isFullAccess(config.permissions))
    return true;

  const target = normalizePageIdentifier(
    pageOrRoute,
    parentGroup,
  );
  const targetLow = target.toLowerCase();
  const raw = String(pageOrRoute).toLowerCase().trim();
  const cleanTarget = targetLow.replace(/[^a-z0-9]/g, "");
  const cleanRaw = raw.replace(/[^a-z0-9]/g, "");

  // 1. Direct page match in config.pages
  const hasPage = (config.pages || []).some((p) => {
    const pl = String(p || "")
      .toLowerCase()
      .trim();
    if (pl === "full_access" || pl === "*" || pl === "all") return true;
    const cleanP = pl.replace(/[^a-z0-9]/g, "");

    if (
      pl === targetLow ||
      pl === raw ||
      cleanP === cleanTarget ||
      cleanP === cleanRaw ||
      ((cleanTarget === "domain" || cleanTarget === "domian") && (cleanP === "domain" || cleanP === "domian"))
    ) {
      return true;
    }

    // Do not let "Products Category" or "Blogs Category" erroneously grant overview "Products" or "Blogs"
    if (
      (cleanTarget === "products" || cleanTarget === "blogs") &&
      cleanP.includes("category")
    ) {
      return false;
    }

    if (
      (cleanTarget === "productscategory" || cleanTarget === "blogscategory") &&
      !cleanP.includes("category")
    ) {
      return false;
    }

    return false;
  });

  if (hasPage) return true;

  // 2. Permission-based match: check if user has corresponding permissions for this page
  const pagePerms = ROLE_PAGE_PERMISSIONS_MAP[target] || [];
  if (pagePerms.length > 0) {
    const userPerms = (config.permissions || []).map((p) => String(p).toLowerCase().trim());
    if (userPerms.includes("full_access") || userPerms.includes("*")) return true;
    const hasPerm = pagePerms.some((p) => userPerms.includes(p.toLowerCase()));
    if (hasPerm) return true;
  }

  return false;
};

export const getFirstAllowedRoute = (roleOrUser) => {
  const config = getRoleConfig(roleOrUser);
  if (isFullAccess(config.pages) || isFullAccess(config.permissions)) {
    return "/dashboard";
  }

  const PRIORITY_ROUTES = [
    { page: "Dashboard", route: "/dashboard" },
    { page: "Products", route: "/overview/products" },
    { page: "Blogs", route: "/overview/blogs" },
    { page: "Products Category", route: "/category/products" },
    { page: "Blogs Category", route: "/category/blogs" },
    { page: "SEO", route: "/overview/seo" },
    { page: "Domain", route: "/settings/domain" },
    { page: "Domian", route: "/settings/domain" },
    { page: "System Users", route: "/settings/users" },
    { page: "Roles", route: "/settings/roles" },
    { page: "Profile", route: "/profile" },
  ];

  for (const item of PRIORITY_ROUTES) {
    if (canAccessPage(roleOrUser, item.page)) {
      return item.route;
    }
  }

  return "/dashboard";
};

export const hasPermission = (roleOrUser, permissionKey) => {
  if (!permissionKey) return true;
  const config = getRoleConfig(roleOrUser);
  if (isFullAccess(config.permissions) || isFullAccess(config.pages)) return true;

  const k = String(permissionKey).toLowerCase().trim();
  const cleanK = k.replace(/[^a-z0-9]/g, "");

  const altKey = k.startsWith("delete_")
    ? k.replace("delete_", "trash_")
    : k.startsWith("trash_")
      ? k.replace("trash_", "delete_")
      : k;

  const hasDirect = (config.permissions || []).some((perm) => {
    const p = String(perm || "")
      .toLowerCase()
      .trim();
    if (p === "full_access" || p === "*" || p === "all") return true;
    if (p === k || p === altKey) return true;

    const cleanP = p.replace(/[^a-z0-9]/g, "");
    if (cleanP === cleanK) return true;
    return false;
  });

  if (hasDirect) return true;

  // If role explicitly has a permissions array, do not fall back to page allowance
  if (Array.isArray(config.permissions) && config.permissions.length > 0) {
    return false;
  }

  // View permission fallback from page allowance only when permissions array is not defined
  if (cleanK.startsWith("view")) {
    for (const [pageName, perms] of Object.entries(ROLE_PAGE_PERMISSIONS_MAP)) {
      if (perms.some((p) => p.replace(/[^a-z0-9]/g, "") === cleanK)) {
        if (canAccessPage(roleOrUser, pageName)) return true;
      }
    }
  }

  return false;
};

export const canPerformAction = (roleOrUser, action = "view", entity = "") => {
  const config = getRoleConfig(roleOrUser);
  if (isFullAccess(config.permissions) || isFullAccess(config.pages)) return true;

  const rawEnt = String(
    entity || (typeof window !== "undefined" ? window.location?.pathname : ""),
  ).toLowerCase();
  const ent = rawEnt.replace(/[^a-z0-9]/g, "");
  if (!ent) return true;
  const act = String(action).toLowerCase().trim();

  // Resolve entity aliases to match role permission names
  let baseEnt = ent;
  const currentPath =
    typeof window !== "undefined"
      ? String(window.location?.pathname || "").toLowerCase()
      : "";
  if (
    ent.includes("blogcat") ||
    ent.includes("blog_cat") ||
    (ent.includes("categor") && (currentPath.includes("blog") || ent.includes("blog")))
  )
    baseEnt = "blog_categories";
  else if (
    ent.includes("productcat") ||
    ent.includes("product_cat") ||
    (ent.includes("categor") && (currentPath.includes("product") || ent.includes("product")))
  )
    baseEnt = "product_categories";
  else if (ent.includes("review"))
    baseEnt = currentPath.includes("blog") || ent.includes("blog") ? "blogs" : "products";
  else if (ent.includes("lead")) baseEnt = "leads";
  else if (ent.includes("user")) baseEnt = "systemuser";
  else if (ent.includes("domain") || ent.includes("domian")) baseEnt = "domain";
  else if (ent.includes("role")) baseEnt = "roles";
  else if (ent.includes("article") || ent.includes("blog")) baseEnt = "blogs";
  else if (ent.includes("seo") || ent.includes("page")) baseEnt = "seo";
  else if (ent.includes("product")) baseEnt = "products";
  else if (ent.includes("dashboard")) baseEnt = "dashboard";
  else if (ent.includes("profile")) baseEnt = "profile";

  if (act === "delete" || act === "trash") {
    return (
      hasPermission(config, `trash_${baseEnt}`) ||
      hasPermission(config, `delete_${baseEnt}`)
    );
  }
  if (act === "edit" || act === "update") {
    return hasPermission(config, `edit_${baseEnt}`);
  }
  if (act === "add" || act === "create") {
    return (
      hasPermission(config, `add_${baseEnt}`) ||
      hasPermission(config, `create_${baseEnt}`) ||
      hasPermission(config, `edit_${baseEnt}`)
    );
  }
  if (act === "view" || act === "read") {
    return hasPermission(config, `view_${baseEnt}`);
  }
  if (hasPermission(config, `${act}_${baseEnt}`)) return true;
  return false;
};

export const getCurrentUser = () => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const hasValidToken = Boolean(
      token && token !== "null" && token !== "undefined",
    );
    if (!hasValidToken) return null;

    const raw = typeof window !== "undefined" && localStorage.getItem("user");
    if (raw) {
      const u = JSON.parse(raw);
      // Auto-heal role if roleId points to a known role in cached roles or token
      if (
        u &&
        (u.role === "customer" || !u.role || u.rolename === "customer")
      ) {
        try {
          const rawRoles = localStorage.getItem("cachedRoles");
          if (rawRoles) {
            const list = JSON.parse(rawRoles);
            const rId = String(u.roleId?._id || u.roleId || "").toLowerCase();
            const matched = list.find(
              (r) =>
                String(r._id).toLowerCase() === rId ||
                String(r.id).toLowerCase() === rId,
            );
            if (
              matched &&
              matched.rolename &&
              matched.rolename.toLowerCase() !== "customer"
            ) {
              u.role = matched.rolename.toLowerCase();
              u.rolename = matched.rolename;
              if (
                Array.isArray(matched.permissions) &&
                (!u.permissions || !u.permissions.length)
              ) {
                u.permissions = matched.permissions;
              }
              if (
                Array.isArray(matched.pages) &&
                (!u.pages || !u.pages.length)
              ) {
                u.pages = matched.pages;
              }
            }
          }
        } catch {}

        try {
          const rawToken = localStorage.getItem("token");
          if (rawToken && rawToken.includes(".")) {
            const payload = JSON.parse(
              atob(
                rawToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"),
              ),
            );
            if (payload?.role && payload.role.toLowerCase() !== "customer") {
              u.role = payload.role.toLowerCase();
              u.rolename = payload.role;
              if (
                Array.isArray(payload.permissions) &&
                (!u.permissions || !u.permissions.length)
              ) {
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
    const unwrapped =
      typeof userData === "function" ? userData(prev) : userData;
    let payload = unwrapped;
    if (
      payload?.data &&
      typeof payload.data === "object" &&
      !Array.isArray(payload.data)
    ) {
      payload = payload.data;
    }
    if (
      payload?.user &&
      typeof payload.user === "object" &&
      !Array.isArray(payload.user)
    ) {
      payload = payload.user;
    }
    const next = { ...prev, ...payload };
    localStorage.setItem("user", JSON.stringify(next));
    window.dispatchEvent(new Event("auth-user-changed"));
  } catch {}
};

export const getCurrentRole = () =>
  getCurrentUser()?.role || getCurrentUser()?.rolename || "";

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
  const low = String(r || "")
    .toLowerCase()
    .trim();
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
  const isAdmin = React.useMemo(
    () => Boolean(user && isAdminOrDevAdmin(user || role)),
    [user, role],
  );
  return {
    user,
    role,
    isAdmin,
    isAdminOrDevAdmin: isAdmin,
    canAccessPage: React.useCallback(
      (p, g) => canAccessPage(user || role, p, g),
      [user, role],
    ),
    hasPermission: React.useCallback(
      (k) => hasPermission(user || role, k),
      [user, role],
    ),
    canPerformAction: React.useCallback(
      (a, e) => canPerformAction(user || role, a, e),
      [user, role],
    ),
    setUser: setCurrentUser,
  };
};
