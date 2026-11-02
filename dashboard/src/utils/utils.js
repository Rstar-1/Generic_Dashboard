import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { configData as apiConfigData, cmsData } from "./apiData";
import { slugify } from "./slugify";
import { resolveImagePath } from "./imageResolver";
import { formatDate } from "./formatDate";

/* ==========================================
   CONFIG & NAVIGATION UTILITIES
   ========================================== */

export const getStickyTop = (config = apiConfigData) => {
  const headerConfig = Array.isArray(config?.Header)
    ? config.Header[0]
    : config?.Header;
  return headerConfig?.HeaderTopBar && headerConfig?.HeaderBottomBar
    ? "24%"
    : "20%";
};

export const getItemSlug = (item) => {
  if (!item) return "";
  return (
    item.slug || slugify(item.title || item.name || "") || String(item.id || "")
  );
};

export const matchBySlugOrId = (item, target) => {
  if (!item || target === undefined || target === null) return false;
  const strTarget = String(target).trim();
  if (String(item.id) === strTarget) return true;
  if (item.slug && item.slug === strTarget) return true;
  const normalizedTarget = slugify(strTarget);
  return Boolean(
    (item.title && slugify(item.title) === normalizedTarget) ||
    (item.name && slugify(item.name) === normalizedTarget)
  );
};

export const findCategory = (categoriesList = [], target) => {
  if (!target || !Array.isArray(categoriesList)) return null;
  const q = String(
    typeof target === "object"
      ? target.categoryId || target.category || target.id || target.slug || target.name || target.title
      : target
  ).trim().toLowerCase();

  return (
    categoriesList.find(
      (c) =>
        String(c.id).toLowerCase() === q ||
        c.slug?.toLowerCase() === q ||
        c.name?.toLowerCase() === q ||
        c.title?.toLowerCase() === q
    ) || null
  );
};

export const isVisible = (val) => val !== false && val !== null && val !== undefined;

export const openExternalLink = (url) => {
  if (!url) return;
  if (url.startsWith("http")) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = url;
  }
};

export const shareContent = ({ platform, url, title = "", text = "" }) => {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || (typeof document !== "undefined" ? document.title : "");
  const combinedText = text || `${shareTitle} - ${shareUrl}`;

  switch (platform?.toLowerCase()) {
    case "facebook":
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
      break;
    case "whatsapp":
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(combinedText)}`, "_blank", "noopener,noreferrer");
      break;
    case "twitter":
    case "x":
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, "_blank", "noopener,noreferrer");
      break;
    case "linkedin":
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
      break;
    case "instagram":
      if (typeof navigator !== "undefined" && navigator.share) {
        navigator.share({ title: shareTitle, url: shareUrl }).catch(() => {});
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
        }).catch(() => {
          window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
        });
      } else {
        window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
      }
      break;
    default:
      if (typeof navigator !== "undefined" && navigator.share) {
        navigator.share({ title: shareTitle, url: shareUrl }).catch(() => {});
      }
      break;
  }
};

export const navigateToCategory = (navigate, cat) => {
  if (!navigate || !cat) return;
  const query = typeof cat === "object" ? (cat.categoryParam || cat.name || cat.title || cat.slug || cat.id) : cat;
  const catId = typeof cat === "object" ? cat.id : undefined;
  navigate(`/product?category=${encodeURIComponent(query)}`, {
    state: { categoryId: catId ? String(catId) : undefined, categoryName: query },
  });
};

export const navigateToProduct = (navigate, item) => {
  if (!navigate || !item) return;
  const slug = typeof item === "object" ? (getItemSlug(item) || item.id) : item;
  navigate(`/product/${slug}`, typeof item === "object" ? { state: { product: item } } : undefined);
};

export const scrollToTop = (behavior = "smooth") => {
  if (typeof window !== "undefined") {
    const beh = typeof behavior === "string" ? behavior : "smooth";
    window.scrollTo({ top: 0, behavior: beh });
  }
};

export const getSocialLinks = () => {
  const env = import.meta.env;
  return [
    { id: "instagram", icon: "Instagram", bg: "insta", url: env?.VITE_SOCIAL_INSTAGRAM },
    { id: "youtube", icon: "YouTube", bg: "danger", url: env?.VITE_SOCIAL_YOUTUBE },
    { id: "facebook", icon: "Facebook", bg: "info", url: env?.VITE_SOCIAL_FACEBOOK },
    { id: "whatsapp", icon: "WhatsApp", bg: "success", url: env?.VITE_SOCIAL_WHATSAPP },
    { id: "linkedin", icon: "LinkedIn", bg: "info", url: env?.VITE_SOCIAL_LINKEDIN },
    { id: "twitter", icon: "Twitter", bg: "dark", url: env?.VITE_SOCIAL_TWITTER },
  ].filter((item) => item.url?.trim());
};

/* ==========================================
   FORMATTING & NUMBER UTILITIES
   ========================================== */

export const formatPrice = (price, currency = "₹") => {
  if (price === null || price === undefined || price === "") return "";
  if (typeof price === "number") {
    return `${currency}${price.toLocaleString("en-IN")}`;
  }
  const str = String(price).trim();
  if (str.startsWith("₹") || str.startsWith("$") || str.startsWith("€") || str.startsWith("£")) {
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

export const formatCompactNumber = (num) => {
  const n = Number(num);
  if (isNaN(n) || n === 0) return String(num || 0);
  if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
  if (Math.abs(n) >= 1e3) return `${(n / 1e3).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
};

export const clampText = (text, maxLength = 100, suffix = "...") => {
  if (!text || typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + suffix;
};

export const extractFieldValue = (val, fallback = "") => {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string") return val;
  if (val?.target && typeof val.target.value !== "undefined") return val.target.value;
  if (typeof val?.value !== "undefined") return val.value;
  return String(val);
};

export const getNestedValue = (obj, path, fallback = undefined) => {
  if (!obj || !path) return fallback;
  if (obj[path] !== undefined) return obj[path];
  const val = String(path).split(".").reduce((curr, p) => (curr && typeof curr === "object" ? curr[p] : undefined), obj);
  return val !== undefined ? val : fallback;
};

/* ==========================================
   DATA MANIPULATION & SIDEBAR HELPERS
   ========================================== */

export const calculateSidebarCounts = (sidebarConfig, dataList = [], statusKey = "status") => {
  if (!sidebarConfig?.items || !Array.isArray(dataList)) return sidebarConfig?.items || [];
  
  const counts = dataList.reduce((acc, item) => {
    const rawVal = item[statusKey] || (item.inStock !== undefined ? (item.inStock ? "In Stock" : "Out of Stock") : "") || item.type || item.role;
    const key = String(rawVal || "").toLowerCase().trim();
    if (key) acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return sidebarConfig.items.map((item) => {
    const itemStatus = String(item.status || "").toLowerCase().trim();
    const count = itemStatus === "all" ? dataList.length : (counts[itemStatus] || 0);
    return {
      ...item,
      count,
    };
  });
};

export const paginateData = (items = [], page = 1, perPage = 5) => {
  if (!Array.isArray(items)) return [];
  const start = (Math.max(1, page) - 1) * perPage;
  return items.slice(start, start + perPage);
};

export const filterByQuery = (items = [], query = "", searchKeys = []) => {
  if (!Array.isArray(items)) return [];
  const q = String(query || "").toLowerCase().trim();
  if (!q) return items;

  return items.filter((item) => {
    if (!item) return false;
    if (searchKeys.length > 0) {
      return searchKeys.some((k) => String(getNestedValue(item, k, "")).toLowerCase().includes(q));
    }
    return Object.values(item).some((v) => {
      if (typeof v === "string" || typeof v === "number") {
        return String(v).toLowerCase().includes(q);
      }
      return false;
    });
  });
};

export const copyToClipboard = async (data) => {
  try {
    const str = typeof data === "object" ? JSON.stringify(data, null, 2) : String(data ?? "");
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(str);
      return true;
    }
  } catch (err) {
    console.warn("Failed to copy data:", err);
  }
  return false;
};

export const exportToJsonFile = (data, filename = "dataset.json") => {
  if (typeof window === "undefined" || !data) return;
  const jsonStr = typeof data === "object" ? JSON.stringify(data, null, 2) : String(data);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const uniqueBy = (array = [], key = "id") => {
  if (!Array.isArray(array)) return [];
  const seen = new Set();
  return array.filter((item) => {
    const val = typeof key === "function" ? key(item) : item?.[key];
    if (val === undefined || seen.has(val)) return false;
    seen.add(val);
    return true;
  });
};

export const sortBy = (array = [], key, order = "asc") => {
  if (!Array.isArray(array)) return [];
  const sorted = [...array];
  return sorted.sort((a, b) => {
    const valA = getNestedValue(a, key);
    const valB = getNestedValue(b, key);
    if (valA === valB) return 0;
    if (valA === undefined || valA === null) return 1;
    if (valB === undefined || valB === null) return -1;
    const comparison = typeof valA === "string" ? valA.localeCompare(String(valB)) : valA > valB ? 1 : -1;
    return order === "desc" ? -comparison : comparison;
  });
};

/* ==========================================
   REACT HOOKS (using useState, memo, etc.)
   ========================================== */

export const useToggle = (initialState = false) => {
  const [value, setValue] = useState(Boolean(initialState));
  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, toggle, setValue, setTrue, setFalse];
};

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const usePagination = (items = [], itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((items?.length || 0) / itemsPerPage) || 1;

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return (items || []).slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  }, []);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    totalItems: items?.length || 0,
  };
};

export const useFilterState = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return [filters, setFilter, resetFilters, setFilters];
};

export const useCopyToClipboard = (duration = 2000) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text) => {
    if (!text) return false;
    const res = await copyToClipboard(text);
    if (res) {
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
    }
    return res;
  }, [duration]);

  return [copied, copy];
};

/* ==========================================
   REACT MEMO COMPONENTS
   ========================================== */

export const SectionFallback = memo(({ minHeight = "100px", className = "w-full" }) =>
  React.createElement("div", { className, style: { minHeight } })
);
SectionFallback.displayName = "SectionFallback";
export const Fallback = SectionFallback;

export const RenderIf = memo(({ isTrue, children, fallback = null }) => {
  return isTrue ? children : fallback;
});
RenderIf.displayName = "RenderIf";

export const AsyncContent = memo(({ loading, fallback, children }) => {
  const [isLoading, setIsLoading] = useState(Boolean(loading));

  useEffect(() => {
    setIsLoading(Boolean(loading));
  }, [loading]);

  if (isLoading) {
    return fallback || React.createElement(SectionFallback, null);
  }

  return children;
});
AsyncContent.displayName = "AsyncContent";

export const HighlightText = memo(({ text = "", query = "" }) => {
  if (!query || typeof text !== "string") return text;
  const parts = text.split(new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi"));
  return React.createElement(
    React.Fragment,
    null,
    parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? React.createElement("mark", { key: i, className: "bg-warning-light text-dark px-2 rounded" }, part)
        : part
    )
  );
});
HighlightText.displayName = "HighlightText";

/* ==========================================
   CMS DATA RESOLVER WITH CACHING
   ========================================== */

const cmsCache = new Map();

export const getCmsData = (sectionName, data = cmsData) => {
  if (data && typeof data.getText === "function") return data;

  const cacheKey = !data || data === cmsData ? sectionName : null;
  if (cacheKey && cmsCache.has(cacheKey)) {
    return cmsCache.get(cacheKey);
  }

  let section = null;
  if (data && Array.isArray(data.cms)) {
    section = data;
  } else {
    const list = Array.isArray(data) ? data : Object.values(data || {});
    section = list.find((item) =>
      item?.section?.toLowerCase() === sectionName?.toLowerCase() ||
      item?._id?.toLowerCase() === sectionName?.toLowerCase()
    ) || null;
  }
  const items = section?.cms || [];

  const getText = (idOrLabel, fallback = "") =>
    items.find((i) => i.cmsId === idOrLabel || i.label?.toLowerCase() === String(idOrLabel).toLowerCase())?.text ?? fallback;

  const getImage = (idOrLabel, fallback = null) => {
    const item = items.find((i) => i.cmsId === idOrLabel || i.label?.toLowerCase() === String(idOrLabel).toLowerCase());
    return item?.image ?? (typeof item?.url === "string" ? item : fallback);
  };

  const getArray = (idOrLabel, fallback = []) =>
    items.find((i) => i.cmsId === idOrLabel || i.label?.toLowerCase() === String(idOrLabel).toLowerCase())?.data ?? fallback;

  const getButton = (idOrLabel = "Buttons", fallbackText = "", fallbackLink = "") => {
    const btn = items.find((i) => i.cmsId === idOrLabel || i.label?.toLowerCase().includes("button"));
    const arr = btn?.data || [];
    const text = arr.find((b) => b.label?.toLowerCase().includes("text") || b.cmsId?.toLowerCase().includes("001"))?.text || btn?.text || fallbackText;
    const link = arr.find((b) => b.label?.toLowerCase().includes("link") || b.cmsId?.toLowerCase().includes("002"))?.text || btn?.link || fallbackLink || "/product";
    return { text, link };
  };

  const dataMap = {};
  items.forEach((i) => {
    if (!i.cmsId) return;
    if (i.type === "text") {
      dataMap[i.cmsId] = i.text ?? "";
    } else if (i.type === "image") {
      dataMap[i.cmsId] = i.image ?? (typeof i.url === "string" ? i : null);
    } else if (i.type === "array") {
      const isBtn = i.label?.toLowerCase().includes("button") || i.cmsId?.toLowerCase().includes("btn") || i.cmsId?.toLowerCase().includes("005");
      dataMap[i.cmsId] = isBtn ? getButton(i.cmsId) : i.data;
    }
  });

  const result = { section, items, getText, getImage, getArray, getButton, ...dataMap };
  if (cacheKey) {
    cmsCache.set(cacheKey, result);
  }
  return result;
};
