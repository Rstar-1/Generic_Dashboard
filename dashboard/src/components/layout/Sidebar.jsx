import React from "react";
import { NavLink } from "react-router-dom";

import Container from "../common/Container";
import Icon from "../common/Icon";
import Fields from "../forms/Fields";

import { menuData } from "../../utils/apiData";
import { resolveImagePath } from "../../utils/imageResolver";

const SidebarLink = React.memo(({ to, label, iconName, shortcut, isCollapsed }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <NavLink
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={({ isActive }) =>
        `flex items-center rounded-5 small-text font-500 list-none mb-2 ${isCollapsed ? "justify-center py-8" : "justify-between p-8"
        } ${isActive || hovered ? "bg-forth text-primary" : "text-gray"}`
      }
    >
      <div className="flex items-center gap-2">
        {iconName && (
          <div className="icon relative flex items-center justify-center">
            <Icon name={iconName} width="16" height="16" />
          </div>
        )}
        {!isCollapsed && <span>{label}</span>}
      </div>
      {!isCollapsed && shortcut && (
        <p className="py-2 px-5 rounded-5 bg-white border-tertiary text-gray small-text">
          {shortcut}
        </p>
      )}
    </NavLink>
  );
});

SidebarLink.displayName = "SidebarLink";

const SidebarHeader = React.memo(({ isCollapsed, displayRole, onToggle, onCollapse }) => (
  <div className={`pt-16 pb-10 flex items-center ${isCollapsed ? "justify-center px-8" : "justify-between px-16"}`}>
    <div className="flex items-center gap-8">
      <div
        className="bg-secondary icon-lg rounded-5 cursor-pointer flex items-center justify-center"
        onClick={onToggle}
      >
        <p className="text-white font-500 headpara-text">K</p>
      </div>
      {!isCollapsed && (
        <div>
          <h3 className="headmini-text text-secondary font-600 uppercase">KAIOM</h3>
          <p className="mini-text text-gray capitalize">{displayRole}</p>
        </div>
      )}
    </div>
    {!isCollapsed && (
      <div className="text-gray cursor-pointer" onClick={onCollapse}>
        <Icon name="ChevronsUpDown" width="14" height="14" strokeWidth="2.5" />
      </div>
    )}
  </div>
));

SidebarHeader.displayName = "SidebarHeader";

const SidebarSearch = React.memo(({ isCollapsed, searchQuery, onSearchChange, onExpand }) => (
  <div className={isCollapsed ? "px-8 pb-12 flex justify-center" : "px-16 pb-12"}>
    {isCollapsed ? (
      <div
        className="icon flex items-center justify-center bg-forth rounded-5 cursor-pointer p-6"
        onClick={onExpand}
      >
        <Icon name="Search" width="16" height="16" stroke="var(--primary)" strokeWidth="2.5" />
      </div>
    ) : (
      <Fields
        type="input"
        placeholder="Search"
        value={searchQuery}
        onChange={onSearchChange}
        icon="Search"
        iconPosition="right"
        outline={false}
        style={{ backgroundColor: "var(--forth)", border: "none" }}
      />
    )}
  </div>
));

SidebarSearch.displayName = "SidebarSearch";

const SidebarProfile = React.memo(({ isCollapsed, userImage, userName, userMobile, firstLetter }) => {
  const [profileHovered, setProfileHovered] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [userImage]);

  return (
    <div className={`bg-white mt-5 ${isCollapsed ? "px-8" : "px-16"}`}>
      <hr className="border-0 bg-tertiary" style={{ height: "1px" }} />
      <NavLink
        to="/profile"
        onMouseEnter={() => setProfileHovered(true)}
        onMouseLeave={() => setProfileHovered(false)}
        className={`flex items-center rounded-5 ${profileHovered ? "bg-forth" : ""} ${isCollapsed ? "justify-center p-6" : "justify-between p-10"
          }`}
      >
        <div className="flex items-center gap-8">
          {userImage && !imgError ? (
            <img
              src={userImage}
              alt={userName}
              className="rounded-full common-img object-cover"
              style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0 }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="rounded-full bg-secondary text-white flex items-center justify-center font-600 uppercase"
              style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0, fontSize: "15px" }}
            >
              {firstLetter}
            </div>
          )}
          {!isCollapsed && (
            <div>
              <h4 className="headmini-text text-dark font-600 capitalize">{userName}</h4>
              {userMobile && <p className="mini-text text-gray">{userMobile}</p>}
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="text-gray">
            <Icon name="ChevronsUpDown" width="14" height="14" strokeWidth="2.5" />
          </div>
        )}
      </NavLink>
    </div>
  );
});

SidebarProfile.displayName = "SidebarProfile";

const Sidebar = ({ isCollapsed, setIsCollapsed, user: userProp }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const user = React.useMemo(
    () => userProp || { fullname: "Admin User", role: "admin", email: "admin@example.com", mobile: "9876543210" },
    [userProp]
  );

  const displayRole = React.useMemo(() => user?.role || user?.roleId?.name || "admin", [user]);

  const handleToggle = React.useCallback(() => setIsCollapsed((prev) => !prev), [setIsCollapsed]);
  const handleCollapse = React.useCallback(() => setIsCollapsed(true), [setIsCollapsed]);
  const handleExpand = React.useCallback(() => setIsCollapsed(false), [setIsCollapsed]);
  const handleSearchChange = React.useCallback((val) => setSearchQuery(val), []);

  const isRoleAllowed = React.useCallback(
    (roles) => !roles?.length || roles.some((r) => String(r).toLowerCase() === String(displayRole).toLowerCase()),
    [displayRole]
  );

  React.useEffect(() => {
    if (isCollapsed) setSearchQuery("");
  }, [isCollapsed]);

  const filteredMenu = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return menuData.reduce((acc, item) => {
      if (!item?.status || !isRoleAllowed(item.role)) return acc;

      if (item.category?.length) {
        const allowedSubs = item.category.filter((sub) => sub.status && isRoleAllowed(sub.role));
        if (!allowedSubs.length) return acc;

        const matchedSubs = q ? allowedSubs.filter((sub) => sub.name.toLowerCase().includes(q)) : allowedSubs;
        const parentMatches = q && item.name.toLowerCase().includes(q);

        if (!q || parentMatches || matchedSubs.length) {
          acc.push({
            ...item,
            category: parentMatches && !matchedSubs.length ? allowedSubs : matchedSubs,
          });
        }
      } else if (!q || item.name.toLowerCase().includes(q)) {
        acc.push(item);
      }

      return acc;
    }, []);
  }, [searchQuery, isRoleAllowed]);

  const userImage = React.useMemo(() => resolveImagePath(user?.image || user?.avatar || ""), [user]);
  const userName = user?.fullname || user?.name || user?.username || "User";
  const userMobile = user?.mobile || user?.phone || user?.email || "";
  const firstLetter = (userName?.trim()?.charAt(0) || "U").toUpperCase();

  return (
    <Container version="v0" className="h-100 bg-white overflow-auto">
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

      <div className={`overflow-auto ${isCollapsed ? "px-8" : "px-16"}`}>
        {filteredMenu.map((item, idx) => {
          if (!item.route && item.category?.length > 0) {
            return (
              <React.Fragment key={idx}>
                {!isCollapsed ? (
                  <div className="flex items-center justify-between mt-10 mb-8">
                    <p className="mini-text text-gray font-600">{item.name}</p>
                  </div>
                ) : (
                  <hr className="border-0 bg-tertiary mt-12 mb-10" style={{ height: "1px" }} />
                )}
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

      <SidebarProfile
        isCollapsed={isCollapsed}
        userImage={userImage}
        userName={userName}
        userMobile={userMobile}
        firstLetter={firstLetter}
      />
    </Container>
  );
};

export default React.memo(Sidebar);