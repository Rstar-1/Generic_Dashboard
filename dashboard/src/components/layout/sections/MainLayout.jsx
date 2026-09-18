import React, { useState, useMemo, useCallback, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "../../common/Container";
import Button from "../../common/Button";
import Tab from "../../common/Tab";
import Icon from "../../common/Icon";
import { menuData } from "../../../utils/apiData";

// Category color mapping
const CATEGORY_COLORS = {
    Products: "#1e74db",
    CMS: "#10b981",
    Leads: "#f59e0b",
    "SEO Metadata": "#8b5cf6",
    "System Users": "#6366f1",
};

// Memoized Category list item
const CategoryItem = memo(({ cat, selectedItem, onClick, isCollapsed }) => {
    const isActive = selectedItem === cat.name;
    return (
        <div
            onClick={onClick}
            className={`flex items-center rounded-5 cursor-pointer ${isCollapsed ? "justify-center py-12" : "justify-between p-10"
                } ${isActive ? "bg-forth text-dark font-600" : "text-gray font-500"}`}
            title={isCollapsed ? cat.name : ""}
        >
            <div className="flex items-center gap-8">
                <div
                    className="flex items-center justify-center rounded-5 flex-shrink-0"
                    style={{ backgroundColor: cat.color || CATEGORY_COLORS[cat.name] || "#1e74db", width: 25, height: 25 }}
                >
                    {cat.icon ? (
                        <Icon name={cat.icon} width="14" height="14" stroke="#ffffff" strokeWidth="2.5" />
                    ) : (
                        <p className="small-text text-white font-400">{cat.name?.charAt(0)?.toUpperCase()}</p>
                    )}
                </div>
                {!isCollapsed && <p className="small-text line-clamp1">{cat.name}</p>}
            </div>
            {!isCollapsed && typeof cat.count === "number" && (
                <p className={`mini-text ${isActive ? "text-secondary font-500" : "text-gray"}`}>
                    {cat.count.toLocaleString()}
                </p>
            )}
        </div>
    );
});

CategoryItem.displayName = "CategoryItem";

// Memoized Sidebar section
const MainLayoutSidebar = memo(({
    sidebarTitle,
    items,
    selectedItem,
    isCollapsed,
    onToggleCollapse,
    onItemClick,
}) => (
    <aside
        className={`${isCollapsed ? "w-5" : "w-20"} bg-white p-10 bordr sticky top-0 h-page overflow-hidden`}
        style={{
            transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            flexShrink: 0,
            minWidth: isCollapsed ? 60 : 240,
        }}
    >
        <div className={`flex items-center mt-6 mb-12 ${isCollapsed ? "justify-center" : "justify-between"}`}>
            {!isCollapsed && <p className="small-text text-dark font-500 uppercase">{sidebarTitle}</p>}
            <Button
                onClick={onToggleCollapse}
                bg="forth"
                color="gray"
                colorHover="dark"
                version="icon"
                icon={isCollapsed ? "ChevronRight" : "ChevronLeft"}
                title={`${isCollapsed ? "Expand" : "Collapse"} ${sidebarTitle}`}
            />
        </div>

        <div className="grid-cols-1 gap-4">
            {items.map((item, idx) => (
                <CategoryItem
                    key={item.name || idx}
                    cat={item}
                    selectedItem={selectedItem}
                    onClick={() => onItemClick(item)}
                    isCollapsed={isCollapsed}
                />
            ))}
        </div>
    </aside>
));

MainLayoutSidebar.displayName = "MainLayoutSidebar";

// Memoized Header & Tab Section
const MainLayoutHeader = memo(({
    headerIcon,
    headerTitle,
    headerSub,
    quickAction,
    quickStyle,
    showTabControls,
    tabs,
    activeTab,
    onTabChange,
    filterDescription,
    filterInputs,
    hasActiveFilters,
    onClearAllFilters,
    showFilters,
    onToggleFilters,
}) => {
    const showFilterControls = showTabControls && activeTab !== "Analytic" && (filterDescription || filterInputs || hasActiveFilters);

    return (
        <div className="sticky top-0 left-0 w-full z-50">
            <div className="flex items-center justify-between bg-white px-14 py-9 bordb">
                <div className="flex items-center gap-12">
                    {headerIcon && (
                        <div className="bg-light-primary text-primary rounded-5 icon-lg">
                            {headerIcon}
                        </div>
                    )}
                    <div>
                        <h2 className="headmini-text text-dark font-500">{headerTitle}</h2>
                        {headerSub && <p className="mini-text text-gray">{headerSub}</p>}
                    </div>
                </div>
                {quickAction && <div className="text-right" style={quickStyle}>{quickAction}</div>}
            </div>

            {showTabControls && (
                <div className="bg-white bordb">
                    {tabs?.length > 0 && <Tab tabs={tabs} activeTab={activeTab} onChange={onTabChange} />}

                    {showFilterControls && (
                        <div>
                            <div className="flex items-center justify-between py-12 px-12 bg-white">
                                <p className="small-text text-gray">{filterDescription}</p>
                                <div className="flex items-center gap-8">
                                    {filterInputs && (
                                        <Button
                                            version="v2"
                                            bg={showFilters ? "secondary" : "white"}
                                            color={showFilters ? "white" : "secondary"}
                                            border="secondary"
                                            onClick={onToggleFilters}
                                            className="flex items-center gap-4"
                                        >
                                            <Icon name="Filter" width="12" height="12" strokeWidth="2.5" className="mr-4" />
                                            {showFilters ? "Hide Filters" : "Filters"}
                                        </Button>
                                    )}
                                    {hasActiveFilters && (
                                        <Button
                                            text="Clear All"
                                            version="v2"
                                            bg="white"
                                            color="danger"
                                            border="danger"
                                            onClick={onClearAllFilters}
                                        />
                                    )}
                                </div>
                            </div>

                            {showFilters && filterInputs && (
                                <div className="bg-forth border-t border-b p-16 gap-16" style={{ transition: "all 0.3s ease" }}>
                                    {filterInputs}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});

MainLayoutHeader.displayName = "MainLayoutHeader";

// Main Layout Component
const MainLayout = memo(({
    sidebarTitle = "Categories",
    sidebarItems = [],
    selectedSidebarItem = "",
    onSidebarItemClick = () => { },
    headerIcon,
    headerTitle,
    headerSub,
    quickAction,
    showTabControls = true,
    tabs = [],
    activeTab = "",
    onTabChange = () => { },
    filterDescription = "",
    hasActiveFilters = false,
    onClearAllFilters = () => { },
    filterInputs = null,
    defaultShowFilters = false,
    showSidebar = true,
    quickStyle,
    children,
    userRole = "admin",
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [showFilters, setShowFilters] = useState(defaultShowFilters);

    // Toggle handlers wrapped in useCallback
    const handleToggleSidebar = useCallback(() => {
        setIsSidebarCollapsed((prev) => !prev);
    }, []);

    const handleToggleFilters = useCallback(() => {
        setShowFilters((prev) => !prev);
    }, []);

    // Compute default sidebar items from menuData
    const defaultSidebarItems = useMemo(() => {
        const items = [];
        const roleLower = String(userRole).toLowerCase();

        menuData.forEach((group) => {
            const isGroupAllowed = !group.role || group.role.some((r) => String(r).toLowerCase() === roleLower);
            if (!isGroupAllowed || !group.category) return;

            group.category.forEach((sub) => {
                if (!sub.status) return;
                const isSubAllowed = !sub.role || sub.role.some((r) => String(r).toLowerCase() === roleLower);
                if (isSubAllowed) {
                    items.push({
                        name: sub.name,
                        route: sub.route,
                        icon: sub.icon,
                        color: CATEGORY_COLORS[sub.name] || "#1e74db",
                    });
                }
            });
        });

        return items;
    }, [userRole]);

    const isUsingDefault = !sidebarItems || sidebarItems.length === 0;
    const resolvedItems = isUsingDefault ? defaultSidebarItems : sidebarItems;

    const resolvedSelectedItem = useMemo(() => {
        if (!isUsingDefault) return selectedSidebarItem;
        return defaultSidebarItems.find((item) => item.route === location.pathname)?.name || "";
    }, [isUsingDefault, selectedSidebarItem, defaultSidebarItems, location.pathname]);

    const handleItemClick = useCallback((item) => {
        if (isUsingDefault) {
            navigate(item.route);
        } else {
            onSidebarItemClick(item.name);
        }
    }, [isUsingDefault, navigate, onSidebarItemClick]);

    return (
        <Container version="v0">
            <div className="flex w-full items-start">
                {/* Memoized Sidebar */}
                {showSidebar && (
                    <MainLayoutSidebar
                        sidebarTitle={sidebarTitle}
                        items={resolvedItems}
                        selectedItem={resolvedSelectedItem}
                        isCollapsed={isSidebarCollapsed}
                        onToggleCollapse={handleToggleSidebar}
                        onItemClick={handleItemClick}
                    />
                )}

                {/* Main Content Area */}
                <div
                    className={!showSidebar ? "w-full" : isSidebarCollapsed ? "w-95" : "w-80"}
                    style={{ transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)", minWidth: 0 }}
                >
                    {/* Memoized Header & Tabs */}
                    <MainLayoutHeader
                        headerIcon={headerIcon}
                        headerTitle={headerTitle}
                        headerSub={headerSub}
                        quickAction={quickAction}
                        quickStyle={quickStyle}
                        showTabControls={showTabControls}
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={onTabChange}
                        filterDescription={filterDescription}
                        filterInputs={filterInputs}
                        hasActiveFilters={hasActiveFilters}
                        onClearAllFilters={onClearAllFilters}
                        showFilters={showFilters}
                        onToggleFilters={handleToggleFilters}
                    />

                    {/* Children Content Area */}
                    <div className="p-12 bg-forth">{children}</div>
                </div>
            </div>
        </Container>
    );
});

MainLayout.displayName = "MainLayout";

export default MainLayout;