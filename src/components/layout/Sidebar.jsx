import React from "react";
import { NavLink } from "react-router-dom";

import Icon from "../common/Icon";
import Fields from "../forms/Fields";

import { menuData } from "../../utils/apiData";
import { resolveImagePath } from "../../utils/imageResolver";
import { getFirstValue, canAccessPage, useCurrentUser, setCurrentUser } from "../../utils";
import { useAuth } from "../../feature/authSlice";
import { getUserProfileApi } from "../../api";

const SidebarLink = React.memo(({ to, label, iconName, shortcut, isCollapsed }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <NavLink
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={isCollapsed ? label : undefined}
      className={({ isActive }) =>
        `flex items-center small-text font-500 mb-2 ${isActive || hovered ? "bg-forth text-primary" : "text-gray"
        }`
      }
      style={{
        height: "40px",
        padding: isCollapsed ? "0" : "0 10px",
        justifyContent: isCollapsed ? "center" : "space-between",
        transition: "background-color 0.15s ease, padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
    >
      <div className="flex items-center" style={{ minWidth: 0, overflow: "hidden" }}>
        {iconName && (
          <div
            className="icon relative flex items-center justify-center flex-shrink-0"
            style={{ width: "20px", height: "20px" }}
          >
            <Icon name={iconName} width="16" height="16" />
          </div>
        )}
        <span
          style={{
            opacity: isCollapsed ? 0 : 1,
            maxWidth: isCollapsed ? 0 : "140px",
            marginLeft: isCollapsed ? 0 : "10px",
            transform: isCollapsed ? "translateX(-8px)" : "translateX(0)",
            transition:
              "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s ease",
            overflow: "hidden",
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
        >
          {label}
        </span>
      </div>

      <div
        style={{
          opacity: isCollapsed ? 0 : 1,
          maxWidth: isCollapsed ? 0 : "32px",
          transform: isCollapsed ? "scale(0.8)" : "scale(1)",
          transition:
            "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease",
          overflow: "hidden",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {shortcut && (
          <p
            className="py-2 px-6 rounded-5 bg-white border-tertiary text-gray small-text font-600"
            style={{ margin: 0, lineHeight: 1.2 }}
          >
            {shortcut}
          </p>
        )}
      </div>
    </NavLink>
  );
});

SidebarLink.displayName = "SidebarLink";

const SidebarHeader = React.memo(({ isCollapsed, displayRole, onToggle }) => (
  <div
    className="flex items-center flex-shrink-0"
    style={{
      padding: isCollapsed ? "16px 8px 12px" : "16px 10px 12px",
      justifyContent: isCollapsed ? "center" : "space-between",
      transition: "padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }}
  >
    <div className="flex items-center" style={{ minWidth: 0, overflow: "hidden" }}>
      <div
        className="bg-secondary rounded-5 cursor-pointer flex items-center justify-center"
        style={{
          height: "46px",
          width: "55px",
        }}
        onClick={onToggle}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <p className="text-white font-400 headpara-text">
          A
        </p>
      </div>

      <div
        style={{
          opacity: isCollapsed ? 0 : 1,
          maxWidth: isCollapsed ? 0 : "135px",
          marginLeft: isCollapsed ? 0 : "10px",
          transform: isCollapsed ? "translateX(-8px)" : "translateX(0)",
          transition:
            "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s ease",
          overflow: "hidden",
          whiteSpace: "nowrap",
          pointerEvents: isCollapsed ? "none" : "auto",
        }}
      >
        <h3
          className="headmini-text text-secondary font-600 uppercase"
          style={{ margin: 0, whiteSpace: "nowrap" }}
        >
          Ashmita Vinyls
        </h3>
        <p className="mini-text text-gray capitalize" style={{ margin: 0, whiteSpace: "nowrap" }}>
          {displayRole}
        </p>
      </div>
    </div>

    <div
      className="text-gray cursor-pointer flex items-center justify-center"
      style={{
        opacity: isCollapsed ? 0 : 1,
        maxWidth: isCollapsed ? 0 : "28px",
        transition:
          "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        flexShrink: 0,
        pointerEvents: isCollapsed ? "none" : "auto",
      }}
      onClick={onToggle}
      title="Collapse sidebar"
    >
      <Icon name="ChevronsUpDown" width="14" height="14" strokeWidth="2.5" />
    </div>
  </div>
));

SidebarHeader.displayName = "SidebarHeader";

const SidebarSearch = React.memo(({ isCollapsed, searchQuery, onSearchChange, onExpand }) => (
  <div
    style={{
      padding: isCollapsed ? "0 8px 12px" : "0 10px 12px",
      transition: "padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }}
  >
    <div className="relative w-full" style={{ height: "42px" }}>
      {/* Expanded search input */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: isCollapsed ? 0 : 1,
          pointerEvents: isCollapsed ? "none" : "auto",
          transform: isCollapsed ? "scaleX(0.9)" : "scaleX(1)",
          transformOrigin: "left center",
          transition: "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s ease",
          overflow: "hidden",
        }}
      >
        <Fields
          type="input"
          placeholder="Search"
          value={searchQuery}
          onChange={onSearchChange}
          icon="Search"
          iconPosition="right"
          outline={false}
          style={{ backgroundColor: "var(--forth)", border: "none", height: "40px" }}
        />
      </div>

      {/* Collapsed compact search button */}
      <div
        className="flex items-center justify-center rounded-5"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: `translateX(-50%) ${isCollapsed ? "scale(1)" : "scale(0.8)"}`,
          opacity: isCollapsed ? 1 : 0,
          pointerEvents: isCollapsed ? "auto" : "none",
          background: isCollapsed ? "var(--forth)" : "none",
          transition: "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s ease",
          width: "55px",
          height: "40px",
        }}
      >
        <div
          className="border-0 cursor-pointer"
          onClick={onExpand}
          title="Search"
        >
          <Icon name="Search" width="16" height="16" stroke="var(--primary)" strokeWidth="2" />
        </div>
      </div>
    </div>
  </div>
));

SidebarSearch.displayName = "SidebarSearch";

const extractImageValue = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val.trim();
  if (Array.isArray(val)) {
    for (const item of val) {
      const res = extractImageValue(item);
      if (res) return res;
    }
    return "";
  }
  if (typeof val === "object") {
    return (
      extractImageValue(val.url) ||
      extractImageValue(val.secure_url) ||
      extractImageValue(val.path) ||
      extractImageValue(val.src) ||
      extractImageValue(val.image) ||
      extractImageValue(val.avatar) ||
      ""
    );
  }
  return "";
};

const SidebarProfile = React.memo(
  ({ isCollapsed, userImage, userName, userMobile, firstLetter, isLoggedIn }) => {
    const [profileHovered, setProfileHovered] = React.useState(false);
    const [imgError, setImgError] = React.useState(false);

    React.useEffect(() => {
      setImgError(false);
    }, [userImage]);

    return (
      <div
        className="bg-white flex-shrink-0"
        style={{
          padding: isCollapsed ? "10px 8px" : "10px 8px",
          transition: "padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "sticky",
          bottom: 0,
          marginTop: "auto",
          zIndex: 10,
          backgroundColor: "#ffffff",
        }}
      >
        <div className="w-full bordh" style={{ paddingTop: "6px" }}>
          <NavLink
            to={isLoggedIn ? "/profile" : "/dashboard"}
            onMouseEnter={() => setProfileHovered(true)}
            onMouseLeave={() => setProfileHovered(false)}
            title={isCollapsed ? userName : undefined}
            className={`flex items-center rounded-8 ${profileHovered ? "bg-forth" : ""}`}
            style={{
              padding: isCollapsed ? "6px 0" : "8px 10px",
              justifyContent: isCollapsed ? "center" : "space-between",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
            }}
          >
            <div className="flex items-center" style={{ minWidth: 0, overflow: "hidden" }}>
              {userImage && !imgError ? (
                <img
                  src={userImage}
                  alt={userName || "User Profile"}
                  className="rounded-full common-img object-cover flex-shrink-0"
                  style={{
                    width: "36px",
                    height: "36px",
                    minWidth: "36px",
                    minHeight: "36px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="rounded-full bg-secondary text-white flex items-center justify-center font-600 uppercase flex-shrink-0"
                  style={{
                    width: "36px",
                    height: "36px",
                    minWidth: "36px",
                    minHeight: "36px",
                    borderRadius: "50%",
                    fontSize: "14px",
                  }}
                >
                  {firstLetter}
                </div>
              )}
              <div
                style={{
                  opacity: isCollapsed ? 0 : 1,
                  maxWidth: isCollapsed ? 0 : "120px",
                  marginLeft: isCollapsed ? 0 : "10px",
                  transform: isCollapsed ? "translateX(-8px)" : "translateX(0)",
                  transition:
                    "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s ease",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                }}
              >
                <h4
                  className="headmini-text text-dark font-600 capitalize truncate"
                  style={{ margin: 0, whiteSpace: "nowrap" }}
                >
                  {userName}
                </h4>
                {userMobile && (
                  <p
                    className="mini-text text-gray truncate"
                    style={{ margin: 0, whiteSpace: "nowrap" }}
                  >
                    {userMobile}
                  </p>
                )}
              </div>
            </div>

            <div
              className="text-gray"
              style={{
                opacity: isCollapsed ? 0 : 1,
                maxWidth: isCollapsed ? 0 : "20px",
                transition: "opacity 0.2s ease, max-width 0.3s ease",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Icon name="ChevronsUpDown" width="14" height="14" strokeWidth="2.5" />
            </div>
          </NavLink>
        </div>
      </div>
    );
  }
);

SidebarProfile.displayName = "SidebarProfile";

const Sidebar = ({ isCollapsed, setIsCollapsed, user: userProp }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user: authUser, role: authRole } = useCurrentUser();
  const { isAuthenticated } = useAuth();

  const [hasToken, setHasToken] = React.useState(() => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("token");
    return Boolean(token && token !== "null" && token !== "undefined");
  });

  React.useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setHasToken(Boolean(token && token !== "null" && token !== "undefined"));
    };
    window.addEventListener("auth-user-changed", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("auth-user-changed", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const isLoggedIn = Boolean((isAuthenticated && hasToken) || hasToken);

  // Auto-sync fresh user profile from backend on mount when logged in
  React.useEffect(() => {
    if (!isLoggedIn) return;
    let isMounted = true;
    getUserProfileApi()
      .then((res) => {
        let payload = res?.data !== undefined ? res.data : res;
        if (payload?.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
          payload = payload.data;
        }
        if (payload?.user && typeof payload.user === "object" && !Array.isArray(payload.user)) {
          payload = payload.user;
        }
        if (payload && isMounted) {
          setCurrentUser((prev) => ({ ...(prev || {}), ...payload }));
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  const user = React.useMemo(() => userProp || authUser, [userProp, authUser]);

  const displayRole = React.useMemo(() => {
    if (!isLoggedIn) return "Guest";
    return (
      user?.rolename ||
      user?.role ||
      user?.roleId?.rolename ||
      user?.roleId?.name ||
      authRole ||
      "Guest"
    );
  }, [user, authRole, isLoggedIn]);

  const handleToggle = React.useCallback(
    () => setIsCollapsed((prev) => !prev),
    [setIsCollapsed]
  );
  const handleCollapse = React.useCallback(() => setIsCollapsed(true), [setIsCollapsed]);
  const handleExpand = React.useCallback(() => setIsCollapsed(false), [setIsCollapsed]);
  const handleSearchChange = React.useCallback((val) => setSearchQuery(val), []);

  React.useEffect(() => {
    if (isCollapsed) setSearchQuery("");
  }, [isCollapsed]);

  const filteredMenu = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // When user is not logged in, only show Dashboard in menu
    if (!isLoggedIn) {
      const dashboardItem = menuData.find(
        (item) => item.name === "Dashboard" || item.route === "/dashboard"
      );
      const fallbackDashboard = dashboardItem || {
        name: "Dashboard",
        route: "/dashboard",
        icon: "Grid",
        status: true,
      };
      if (q && !fallbackDashboard.name.toLowerCase().includes(q)) {
        return [];
      }
      return [fallbackDashboard];
    }

    const userOrRole = user || displayRole;

    return menuData.reduce((acc, item) => {
      if (!item?.status) return acc;

      if (item.category?.length) {
        const allowedSubs = item.category.filter(
          (sub) => sub.status && canAccessPage(userOrRole, sub.name, item.name)
        );
        if (!allowedSubs.length) return acc;

        const matchedSubs = q
          ? allowedSubs.filter((sub) => sub.name.toLowerCase().includes(q))
          : allowedSubs;
        const parentMatches = q && item.name.toLowerCase().includes(q);

        if (!q || parentMatches || matchedSubs.length) {
          acc.push({
            ...item,
            category: parentMatches && !matchedSubs.length ? allowedSubs : matchedSubs,
          });
        }
      } else if (canAccessPage(userOrRole, item.name, item.route)) {
        if (!q || item.name.toLowerCase().includes(q)) {
          acc.push(item);
        }
      }

      return acc;
    }, []);
  }, [searchQuery, user, displayRole, isLoggedIn]);

  const userImage = React.useMemo(() => {
    if (!isLoggedIn || !user) return "";
    const raw =
      extractImageValue(user?.image) ||
      extractImageValue(user?.avatar) ||
      extractImageValue(user?.profileImage) ||
      extractImageValue(user?.photo) ||
      extractImageValue(user?.picture) ||
      extractImageValue(user?.img) ||
      extractImageValue(user?.user?.image) ||
      extractImageValue(user?.data?.image) ||
      extractImageValue(getFirstValue(user, ["image", "avatar", "profileImage", "photo", "picture"]));
    return raw ? resolveImagePath(raw) : "";
  }, [user, isLoggedIn]);

  const userName = isLoggedIn
    ? getFirstValue(user, ["fullname", "name", "username"], "User")
    : "Welcome Guest";
  const userMobile = isLoggedIn
    ? getFirstValue(user, ["mobile", "phone", "email"], "")
    : "Sign in to access";
  const firstLetter = isLoggedIn
    ? (userName?.trim()?.charAt(0) || "U").toUpperCase()
    : "G";

  return (
    <div
      className="bg-white flex flex-column justify-between relative overflow-hidden"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        className="flex flex-column flex-1 overflow-hidden"
        style={{
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          overflow: "hidden",
        }}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          displayRole={displayRole}
          onToggle={handleToggle}
          onCollapse={handleCollapse}
        />

        <SidebarSearch
          isCollapsed={isCollapsed}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onExpand={handleExpand}
        />

        <div
          className="overflow-y-auto overflow-x-hidden flex-1"
          style={{
            padding: isCollapsed ? "0 8px" : "0 10px",
            transition: "padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            scrollbarWidth: "none",
            flex: "1 1 auto",
            minHeight: 0,
          }}
        >
          {filteredMenu.map((item, idx) => {
            if (!item.route && item.category?.length > 0) {
              return (
                <React.Fragment key={idx}>
                  <div
                    className="relative flex items-center overflow-hidden"
                    style={{
                      height: isCollapsed ? '20px' : "30px",
                    }}
                  >
                    <p
                      className="mini-text text-gray font-500 uppercase"
                      style={{
                        opacity: isCollapsed ? 0 : 1,
                        maxWidth: isCollapsed ? 0 : "180px",
                        transform: isCollapsed ? "translateX(-6px)" : "translateX(0)",
                        transition:
                          "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s ease",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        position: "absolute",
                        left: 0,
                      }}
                    >
                      {item.name}
                    </p>
                    <div
                      style={{
                        opacity: isCollapsed ? 1 : 0,
                        width: isCollapsed ? "50px" : 0,
                        margin: "0 auto",
                        height: "1px",
                        backgroundColor: "#e2e8f0",
                        transition: "opacity 0.2s ease, width 0.3s ease",
                      }}
                    />
                  </div>
                  {item.category.map((subItem, subIdx) => (
                    <SidebarLink
                      key={subIdx}
                      to={subItem.route}
                      label={subItem.name}
                      iconName={subItem.icon}
                      isCollapsed={isCollapsed}
                    />
                  ))}
                </React.Fragment>
              );
            }

            return (
              <SidebarLink
                key={idx}
                to={item.route}
                label={item.name}
                iconName={item.icon}
                shortcut={item.name === "Dashboard" ? "⌘" : null}
                isCollapsed={isCollapsed}
              />
            );
          })}
        </div>
      </div>

      <SidebarProfile
        isCollapsed={isCollapsed}
        userImage={userImage}
        userName={userName}
        userMobile={userMobile}
        firstLetter={firstLetter}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default React.memo(Sidebar);
