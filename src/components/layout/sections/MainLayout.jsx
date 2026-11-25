import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "../../common/Container";
import Button from "../../common/Button";
import Tab from "../../common/Tab";
import Icon from "../../common/Icon";
import Table from "../../common/Table";
import Modal from "../../common/Modal";
import FormBuilder from "../../forms/FormBuilder";
import FilterForm from "../../forms/sections/FilterForm";
import { showToast } from "../../common/Toast";
import {
    menuData,
    STATUS_OPTIONS,
    ROLE_ACCESS_CONFIG,
    reviewsTableColumns,
    seoSiteInfo,
} from "../../../utils/apiData";
import { canAccessPage, useCurrentUser, fileToBase64, isAdminOrDevAdmin, canPerformAction, isFullAccess } from "../../../utils";
import {
    sanitizeCrudFormData,
    getRoleFormFields,
    getUserFormFields,
    getProductFormFields,
    getBlogFormFields,
    getSeoFormFields,
    getProductReviewFormFields,
    getBlogReviewFormFields,
} from "../../forms/sections/CrudForm";
import { useRoles } from "../../../feature/roleSlice";
import { useProductCategories } from "../../../feature/productCategorySlice";
import { useBlogCategories } from "../../../feature/blogCategorySlice";
import { normalizeCreator } from "../../../feature/sliceHelper";
import { registerApi } from "../../../api";

export const ITEMS_PER_PAGE = 5;

const GENERIC_PALETTE = [
    "var(--primary)",
    "var(--success)",
    "var(--secondary)",
    "var(--info)",
    "var(--danger)",
    "var(--warning)",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#10b981",
];

const CATEGORY_COLORS = {
    Dashboard: "#1e74db",
    "System Users": "#6366f1",
    Roles: "#10b981",
    Profile: "#f59e0b",
    Active: "#10b981",
    Inactive: "#ef4444",
};

// Category list item
const CategoryItem = React.memo(({ cat, selectedItem, onClick, isCollapsed }) => {
    const sel = String(selectedItem || "").toLowerCase();
    const isActive =
        Boolean(sel) &&
        [cat.name, cat.role, cat.status, cat.label]
            .filter(Boolean)
            .some((val) => String(val).toLowerCase() === sel);

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
                    style={{ backgroundColor: cat.color || CATEGORY_COLORS[cat.name] || CATEGORY_COLORS[cat.status] || "#1e74db", width: 25, height: 25 }}
                >
                    {cat.icon ? (
                        <Icon name={cat.icon} width="14" height="14" stroke="#ffffff" strokeWidth="2.5" />
                    ) : (
                        <p className="small-text text-white font-400">{cat.name?.charAt(0)?.toUpperCase()}</p>
                    )}
                </div>
                {!isCollapsed && <p className="small-text line-clamp1">{cat.name || cat.label}</p>}
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

// Sidebar section
const MainLayoutSidebar = React.memo(({ sidebarTitle, items, selectedItem, isCollapsed, onToggleCollapse, onItemClick }) => (
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
                    key={item.name || item.role || item.status || idx}
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

// Header section
const MainLayoutHeader = React.memo(({
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
        <div className="sticky top-0 left-0 w-full z-99">
            <div className="flex items-center justify-between bg-white px-14 py-9 bordb">
                <div className="flex items-center gap-12">
                    {headerIcon && (
                        <div className="bg-light-primary text-primary rounded-5 icon-lg">
                            {typeof headerIcon === "string" ? <Icon name={headerIcon} width="18" height="18" /> : headerIcon}
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
                                            version="v2"
                                            bg="forth"
                                            color="gray"
                                            onClick={onClearAllFilters}
                                            className="flex items-center gap-4"
                                        >
                                            <Icon name="X" width="12" height="12" strokeWidth="2.5" className="mr-4" />
                                            Clear Filters
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {showFilters && filterInputs && (
                                <div className="p-12 bordt bg-light">{filterInputs}</div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});
MainLayoutHeader.displayName = "MainLayoutHeader";

/**
 * Normalizes sidebar item counts across different API payload structures
 */
export const resolveItemCount = (item, sidebarCounts, activeTab) => {
    if (!item) return undefined;
    if (typeof item.count === "number") return item.count;
    if (!sidebarCounts || typeof sidebarCounts !== "object") return undefined;

    const key = (item.role || item.status || item.name || "").toLowerCase().trim();
    if (!key) return undefined;

    if (sidebarCounts[key] !== undefined && typeof sidebarCounts[key] === "number") {
        return sidebarCounts[key];
    }

    if (activeTab && sidebarCounts[activeTab]?.[key] !== undefined) {
        return sidebarCounts[activeTab][key];
    }

    if (key === "all" && typeof sidebarCounts.total === "number") {
        return sidebarCounts.total;
    }

    return undefined;
};

/**
 * Extracts the active creator ID from the current user object
 */
export const getActiveCreatorId = (currentUser) => {
    if (!currentUser) return undefined;
    return (
        currentUser._id ||
        currentUser.id ||
        currentUser.userId ||
        currentUser.creatorId ||
        currentUser.adminId ||
        undefined
    );
};

/**
 * Generic Table & Filter State Manager Hook
 */
export const useTableState = ({
    initialTab = "all",
    initialCategory = "All",
    sidebarData = null,
} = {}) => {
    const [activeTab, setActiveTab] = React.useState(initialTab);
    const [selectedCategory, setSelectedCategory] = React.useState(() => {
        if (sidebarData?.items?.length) {
            return sidebarData.items[0]?.name || initialCategory;
        }
        return initialCategory;
    });
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedIds, setSelectedIds] = React.useState([]);

    const handleSearchChange = React.useCallback((value) => {
        setSearchQuery(typeof value === "string" ? value : value?.target?.value || "");
        setCurrentPage(1);
    }, []);

    const handlePageChange = React.useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const handleStatusFilterChange = React.useCallback((value) => {
        const next = typeof value === "string" ? value : value?.target?.value || "all";
        setStatusFilter(next);
        setCurrentPage(1);
    }, []);

    const handleSidebarItemClick = React.useCallback((itemOrName) => {
        const name = typeof itemOrName === "string" ? itemOrName : itemOrName?.name || itemOrName?.role || itemOrName?.status || "";
        setSelectedCategory(name);
        setCurrentPage(1);
        setSelectedIds([]);
    }, []);

    const handleTabChange = React.useCallback((tabValue) => {
        const next = typeof tabValue === "string" ? tabValue : tabValue?.value || "all";
        setActiveTab(next);
        setCurrentPage(1);
        setSelectedIds([]);
    }, []);

    React.useEffect(() => {
        if (sidebarData?.items?.length) {
            setSelectedCategory(sidebarData.items[0]?.name || initialCategory);
        } else {
            setSelectedCategory(initialCategory);
        }
    }, [initialCategory]);

    const handleSelectRow = React.useCallback((rowOrId) => {
        const id = typeof rowOrId === "object" ? (rowOrId?.id || rowOrId?._id) : rowOrId;
        if (!id) return;
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    }, []);

    const handleSelectAll = React.useCallback((listOrChecked) => {
        if (Array.isArray(listOrChecked)) {
            const allIds = listOrChecked.map((it) => it.id || it._id).filter(Boolean);
            setSelectedIds((prev) => (prev.length === allIds.length && allIds.length > 0 ? [] : allIds));
        } else if (typeof listOrChecked === "boolean") {
            if (!listOrChecked) setSelectedIds([]);
        }
    }, []);

    const resetSelection = React.useCallback(() => setSelectedIds([]), []);

    const resetFilters = React.useCallback(() => {
        setStatusFilter("all");
        setSearchQuery("");
        setSelectedCategory(initialCategory);
        setCurrentPage(1);
        setSelectedIds([]);
    }, [initialCategory]);

    return {
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        currentPage,
        setCurrentPage,
        selectedIds,
        setSelectedIds,
        handleSearchChange,
        handlePageChange,
        handleStatusFilterChange,
        handleSidebarItemClick,
        handleTabChange,
        handleSelectRow,
        handleSelectAll,
        resetSelection,
        resetFilters,
    };
};

/**
 * Enhanced Generic MainLayout with integrated CRUD, Reviews, Table, Modal & FilterForm
 */
const MainLayout = React.memo(({
    // Sidebar props
    sidebarTitle,
    sidebarData,
    sidebarItems = [],
    sidebarCounts,
    selectedSidebarItem,
    onSidebarItemClick,
    showSidebar,
    userRole,

    // Header props
    headerIcon,
    headerTitle,
    headerSub,
    quickAction,
    quickStyle,
    showTabControls = true,
    tabs = [],
    activeTab: controlledActiveTab,
    onTabChange: controlledOnTabChange,
    filterDescription = "",
    filterInputs,
    hasActiveFilters: controlledHasActiveFilters,
    onClearAllFilters: controlledOnClearAllFilters,
    defaultShowFilters = false,

    // CRUD & Table props
    entityName = "Item",
    itemName,
    data,
    columns,
    total,
    itemsPerPage = ITEMS_PER_PAGE,
    loading = false,
    tableTitle,
    tableSubtitle,
    searchPlaceholder,
    maxVisibleColumns = 5,
    minWidth = "1050px",
    collapsible = true,
    showTable = true,
    emptyAction,

    // Filter controls
    filterFields,
    extraFilters,
    showStatusFilter = true,
    onClearFilters,

    // CRUD Callbacks
    onFetch,
    onAdd,
    onEdit,
    onDelete,
    onBulkDelete,
    onView,
    onAddOpen,
    onEditOpen,
    getFormFields,
    formFields: staticFormFields,
    formSubmitType = "json",
    formCols = "1",
    transformPayload,
    onSubmit,

    // Reviews & SEO Callbacks
    onAddReview,
    onDeleteReview,
    onSeedSeo,

    // Modal controls
    showModal = true,
    modalTitle,
    modalSize = "sm",
    modalType = "sidebar",
    modalPlacement = "right",
    customModal,
    addBtnText,
    showAddButton = true,
    extraQuickActions,

    // Titles
    viewTitle,
    editTitle,
    deleteTitle,

    // Custom layout content
    children,
    childrenPlacement = "beforeTable",

    // Controlled State Overrides (optional)
    currentPage: controlledPage,
    onPageChange: controlledOnPageChange,
    searchQuery: controlledSearch,
    onSearchChange: controlledOnSearchChange,
    selectedRows: controlledSelectedRows,
    onSelectRow: controlledOnSelectRow,
    onSelectAll: controlledOnSelectAll,
    isModalOpen: controlledIsModalOpen,
    onCloseModal: controlledOnCloseModal,
    editingItem: controlledEditingItem,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(true);
    const [showFilters, setShowFilters] = React.useState(defaultShowFilters);

    // Current user and roles context
    const { role: currentRole, user: currentUser, isAdmin } = useCurrentUser();
    const { roles, getRoles, fetchRoles: fetchRolesList } = useRoles();

    // Categories hooks for Products & Blogs
    const { categories: prodCategories, allCategories: allProdCategories, getAllCategories: getAllProdCategories } = useProductCategories();
    const { categories: blogCategories, allCategories: allBlogCategories, getAllBlogCategories } = useBlogCategories();

    // Privileged access detection
    const isPrivilegedUser = React.useMemo(() => {
        const roleStr = String(currentRole || currentUser?.role || currentUser?.rolename || "").toLowerCase().trim();
        return Boolean(
            isAdmin ||
            isAdminOrDevAdmin(currentRole || currentUser) ||
            roleStr === "admin" ||
            roleStr === "dev admin" ||
            roleStr === "devadmin" ||
            roleStr === "dev-admin" ||
            roleStr.includes("admin") ||
            isFullAccess(currentUser?.permissions || currentUser?.pages)
        );
    }, [currentRole, currentUser, isAdmin]);

    const effectiveIsAdmin = Boolean(isPrivilegedUser || (userRole && (String(userRole).toLowerCase().includes("admin") || isFullAccess(userRole))));

    const loggedInUserRoleName = React.useMemo(() => {
        return String(currentUser?.rolename || currentUser?.role || currentUser?.roleId?.rolename || currentRole || "").trim();
    }, [currentUser, currentRole]);

    const loggedInUserRoleKey = React.useMemo(() => loggedInUserRoleName.toLowerCase(), [loggedInUserRoleName]);
    const loggedInUserRoleId = React.useMemo(() => currentUser?.roleId?._id || currentUser?.roleId || null, [currentUser]);
    const loggedInRole = React.useMemo(() => loggedInUserRoleKey || "guest", [loggedInUserRoleKey]);
    const activeRole = userRole && userRole !== "admin" ? userRole : (currentUser || currentRole || loggedInRole);

    // Auto-fetch categories and roles based on entity
    React.useEffect(() => {
        if (entityName === "User" || entityName === "Role") {
            const loader = fetchRolesList || getRoles;
            loader?.({ isDeleted: false, limit: 100 });
        } else if (entityName === "Product") {
            getAllProdCategories?.();
        } else if (entityName === "Blog") {
            getAllBlogCategories?.();
        }
    }, [entityName, fetchRolesList, getRoles, getAllProdCategories, getAllBlogCategories]);

    // Dynamic categories for Product / Blog
    const activeCatalogCategories = React.useMemo(() => {
        if (entityName === "Product") {
            return (allProdCategories && allProdCategories.length > 0) ? allProdCategories : (prodCategories || []);
        }
        if (entityName === "Blog") {
            return (allBlogCategories && allBlogCategories.length > 0) ? allBlogCategories : (blogCategories || []);
        }
        return [];
    }, [entityName, allProdCategories, prodCategories, allBlogCategories, blogCategories]);

    const dynamicCategoryOptions = React.useMemo(() => {
        const opts = [];
        const seen = new Set();
        (activeCatalogCategories || []).forEach((c) => {
            if (c.isDeleted) return;
            const id = String(c._id || c.id || "");
            const name = c.categoryName || c.name;
            if (id && name && !seen.has(id)) {
                seen.add(id);
                opts.push({ label: name, value: id });
            }
        });
        return opts;
    }, [activeCatalogCategories]);

    // Dynamic role options derived purely from backend roles (NO hardcoded defaults)
    const dynamicRoleOptions = React.useMemo(() => {
        if (entityName === "User" && !isPrivilegedUser && loggedInUserRoleKey) {
            const displayName = loggedInUserRoleName.charAt(0).toUpperCase() + loggedInUserRoleName.slice(1);
            return [{ label: displayName, value: loggedInUserRoleKey }];
        }

        const map = new Map();
        (roles || []).forEach((r) => {
            if (r.isDeleted) return;
            const name = String(r.rolename || r.role || r.name || "").trim();
            const val = name.toLowerCase();
            if (val && !map.has(val)) {
                map.set(val, name.charAt(0).toUpperCase() + name.slice(1));
            }
        });
        return Array.from(map.entries()).map(([value, label]) => ({ label, value }));
    }, [roles, entityName, isPrivilegedUser, loggedInUserRoleKey, loggedInUserRoleName]);

    // Dynamic permission & page options derived from ROLE_ACCESS_CONFIG
    const rolePageOptions = React.useMemo(() => {
        return (ROLE_ACCESS_CONFIG || []).map((it) => ({
            label: it.label || it.page,
            value: it.page,
        }));
    }, []);

    const rolePermissionOptions = React.useMemo(() => {
        const list = [];
        (ROLE_ACCESS_CONFIG || []).forEach((item) => {
            (item.permissions || []).forEach((perm) => {
                if (perm && !list.some((o) => o.value === perm)) {
                    list.push({ label: perm, value: perm });
                }
            });
        });
        return list;
    }, []);

    // Dynamic SEO page types derived from data (NO hardcoded TYPE_OPTIONS)
    const dynamicSeoTypeOptions = React.useMemo(() => {
        const types = new Set(["website", "article", "product", "business"]);
        (Array.isArray(data) ? data : []).forEach((s) => {
            if (s.type) types.add(String(s.type).toLowerCase());
        });
        return [
            { label: "All Page Types", value: "all" },
            ...Array.from(types).map((t) => ({
                label: t.charAt(0).toUpperCase() + t.slice(1),
                value: t,
            })),
        ];
    }, [data]);

    // Entity-specific internal filter states
    const [roleFilter, setRoleFilter] = React.useState("all");
    const [permissionFilter, setPermissionFilter] = React.useState("all");
    const [userRoleFilter, setUserRoleFilter] = React.useState(() => (!isPrivilegedUser && loggedInUserRoleKey ? loggedInUserRoleKey : "all"));
    const [userCategory, setUserCategory] = React.useState(() => (!isPrivilegedUser && loggedInUserRoleName ? `${loggedInUserRoleName.charAt(0).toUpperCase() + loggedInUserRoleName.slice(1)} Users` : "All Users"));
    const [categoryFilter, setCategoryFilter] = React.useState("all");
    const [seoTypeFilter, setSeoTypeFilter] = React.useState("all");

    // Review modal & SEO audit modal states
    const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
    const [reviewTargetItem, setReviewTargetItem] = React.useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
    const [viewingSeo, setViewingSeo] = React.useState(null);

    React.useEffect(() => {
        if (entityName === "User" && !isPrivilegedUser && loggedInUserRoleKey) {
            setUserRoleFilter(loggedInUserRoleKey);
            setUserCategory(`${loggedInUserRoleName.charAt(0).toUpperCase() + loggedInUserRoleName.slice(1)} Users`);
        }
    }, [entityName, isPrivilegedUser, loggedInUserRoleKey, loggedInUserRoleName]);

    // Dynamic sidebar for User: derived purely from roles and counts (NO hardcoded defaults)
    const userSidebarItems = React.useMemo(() => {
        if (entityName !== "User") return null;

        if (!isPrivilegedUser && loggedInUserRoleKey) {
            const displayName = loggedInUserRoleName ? (loggedInUserRoleName.charAt(0).toUpperCase() + loggedInUserRoleName.slice(1)) : "User";
            return [
                {
                    name: `${displayName} Users`,
                    role: loggedInUserRoleKey,
                    color: GENERIC_PALETTE[0],
                    icon: "Users",
                    count: total || (Array.isArray(data) ? data.length : 0),
                },
            ];
        }

        const counts = (Array.isArray(data) ? data : []).reduce((acc, u) => {
            const rKey = String(u.role || u.rolename || "").toLowerCase();
            if (rKey) acc[rKey] = (acc[rKey] || 0) + 1;
            return acc;
        }, {});

        const allItem = {
            name: "All Users",
            role: "all",
            color: GENERIC_PALETTE[0],
            icon: "Users",
            count: total || (Array.isArray(data) ? data.length : 0),
        };

        const list = [allItem];
        const seen = new Set();

        (roles || []).forEach((r, idx) => {
            if (r.isDeleted) return;
            const rName = String(r.rolename || r.name || r.role || "").trim();
            const rKey = rName.toLowerCase();
            if (!rKey || seen.has(rKey)) return;
            seen.add(rKey);

            const displayName = rName.charAt(0).toUpperCase() + rName.slice(1);
            const assignedCount = (r.usersassigned !== undefined && r.usersassigned > 0)
                ? r.usersassigned
                : (r.count !== undefined && r.count > 0 ? r.count : (counts[rKey] || 0));

            list.push({
                name: displayName,
                role: rKey,
                color: r.color || GENERIC_PALETTE[(idx + 1) % GENERIC_PALETTE.length],
                icon: "Users",
                count: assignedCount,
            });
        });

        return list;
    }, [entityName, isPrivilegedUser, loggedInUserRoleKey, loggedInUserRoleName, total, data, roles]);

    // Entity configuration dispatcher using switch
    const entityConfig = React.useMemo(() => {
        switch (entityName) {
            case "Role":
                return {
                    showSidebar: showSidebar !== undefined ? showSidebar : false,
                    sidebarTitle: sidebarTitle || "Roles",
                    tableTitle: tableTitle || "Access Roles & Policies",
                    tableSubtitle: tableSubtitle || "Define security profiles, granular permissions, privilege hierarchies, and user assignments",
                    searchPlaceholder: searchPlaceholder || "Search roles by name or key...",
                    addBtnText: addBtnText || "Add Role",
                    headerIcon: headerIcon || "Shield",
                    headerTitle: headerTitle || "Role Permissions & RBAC",
                    headerSub: headerSub || "Define security profiles, granular permissions, privilege hierarchies, and user assignments",
                    formFields: (ctx) => getRoleFormFields({
                        editingRole: ctx.editingRole || ctx.editingItem,
                        pageOptions: rolePageOptions,
                        permissionOptions: rolePermissionOptions,
                        userRole: activeRole,
                    }),
                };
            case "User":
                return {
                    showSidebar: showSidebar !== undefined ? showSidebar : true,
                    sidebarTitle: sidebarTitle || "Roles",
                    tableTitle: tableTitle || "User Directory",
                    tableSubtitle: tableSubtitle || (
                        controlledActiveTab === "trash"
                            ? "Deactivated system users in trash"
                            : (!isPrivilegedUser && loggedInUserRoleName)
                                ? `Authenticated platform operators for ${loggedInUserRoleName} role`
                                : (userRoleFilter && userRoleFilter !== "all")
                                    ? `Authenticated platform operators for ${userCategory || userRoleFilter} role`
                                    : "Authenticated platform operators, administrators, and vendor partners"
                    ),
                    searchPlaceholder: searchPlaceholder || "Search users by name, email, role, or phone...",
                    addBtnText: addBtnText || "Add Users",
                    headerIcon: headerIcon || "Users",
                    headerTitle: headerTitle || "System Users",
                    headerSub: headerSub || "Manage authorized platform operators, credential assignments, active sessions, and access roles",
                    formFields: (ctx) => getUserFormFields({
                        editingUser: ctx.editingUser || ctx.editingItem,
                        roleOptions: dynamicRoleOptions,
                        userRole: activeRole,
                    }),
                };
            case "Product":
                return {
                    showSidebar: showSidebar !== undefined ? showSidebar : true,
                    sidebarTitle: sidebarTitle || sidebarData?.title || "Product Categories",
                    tableTitle: tableTitle || "Product Catalog",
                    tableSubtitle: tableSubtitle || "Manage catalog items, pricing, inventory specifications, and publication visibility",
                    searchPlaceholder: searchPlaceholder || "Search products by name, category, or SKU...",
                    addBtnText: addBtnText || "Add Product",
                    headerIcon: headerIcon || "Package",
                    headerTitle: headerTitle || "Products Overview",
                    headerSub: headerSub || "Manage e-commerce inventory, pricing, catalog hierarchy, and customer reviews",
                    formFields: (ctx) => getProductFormFields({
                        editingProduct: ctx.editingProduct || ctx.editingItem,
                        categoryOptions: dynamicCategoryOptions,
                        userRole: activeRole,
                    }),
                };
            case "Blog":
                return {
                    showSidebar: showSidebar !== undefined ? showSidebar : true,
                    sidebarTitle: sidebarTitle || sidebarData?.title || "Blog Categories",
                    tableTitle: tableTitle || "Editorial Articles",
                    tableSubtitle: tableSubtitle || "Manage article publications, editorial content, and reading materials",
                    searchPlaceholder: searchPlaceholder || "Search articles by title, author, or excerpt...",
                    addBtnText: addBtnText || "Add Blog",
                    headerIcon: headerIcon || "FileText",
                    headerTitle: headerTitle || "Blogs Overview",
                    headerSub: headerSub || "Manage editorial articles, knowledge base insights, and reader comments",
                    formFields: (ctx) => getBlogFormFields({
                        editingBlog: ctx.editingBlog || ctx.editingItem,
                        categoryOptions: dynamicCategoryOptions,
                        userRole: activeRole,
                    }),
                };
            case "SEO":
                return {
                    showSidebar: showSidebar !== undefined ? showSidebar : true,
                    sidebarTitle: sidebarTitle || sidebarData?.title || "Page Types",
                    tableTitle: tableTitle || "Search Engine Index",
                    tableSubtitle: tableSubtitle || "Maintain indexable landing pages, social metadata, and search crawl settings",
                    searchPlaceholder: searchPlaceholder || "Search by page name, canonical path, title, or keywords...",
                    addBtnText: addBtnText || "Add SEO Page",
                    headerIcon: headerIcon || "Globe",
                    headerTitle: headerTitle || "SEO Configuration",
                    headerSub: headerSub || "Manage canonical URLs, meta tags, OpenGraph schemas, and indexing directives",
                    formFields: (ctx) => getSeoFormFields({
                        editingSeo: ctx.editingSeo || ctx.editingItem,
                        userRole: activeRole,
                    }),
                };
            default:
                return {
                    showSidebar: showSidebar !== undefined ? showSidebar : true,
                    sidebarTitle: sidebarTitle || sidebarData?.title || "Categories",
                    tableTitle: tableTitle || `${entityName} List`,
                    tableSubtitle: tableSubtitle || `Manage ${entityName.toLowerCase()} entries, details, and status updates`,
                    searchPlaceholder: searchPlaceholder || `Search ${itemName || entityName.toLowerCase()}...`,
                    addBtnText: addBtnText || `Add ${entityName || "Item"}`,
                    headerIcon,
                    headerTitle,
                    headerSub,
                    formFields: null,
                };
        }
    }, [
        entityName,
        showSidebar,
        sidebarTitle,
        sidebarData,
        tableTitle,
        tableSubtitle,
        searchPlaceholder,
        addBtnText,
        headerIcon,
        headerTitle,
        headerSub,
        controlledActiveTab,
        isPrivilegedUser,
        loggedInUserRoleName,
        userRoleFilter,
        userCategory,
        itemName,
        rolePageOptions,
        rolePermissionOptions,
        dynamicRoleOptions,
        dynamicCategoryOptions,
        activeRole,
    ]);

    // Internal state management via useTableState
    const defaultInitialCategory = selectedSidebarItem || (entityName === "User" ? userCategory : sidebarData?.items?.[0]?.name) || "All";
    const tableState = useTableState({
        initialTab: controlledActiveTab || "all",
        initialCategory: defaultInitialCategory,
        sidebarData,
    });

    const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : tableState.activeTab;
    const activePage = controlledPage !== undefined ? controlledPage : tableState.currentPage;
    const activeSearch = controlledSearch !== undefined ? controlledSearch : tableState.searchQuery;
    const activeStatus = tableState.statusFilter;
    const activeSelectedIds = controlledSelectedRows !== undefined ? controlledSelectedRows : tableState.selectedIds;

    // Filter out trash tab for non-admin roles and auto-reset activeTab
    const sanitizedTabs = React.useMemo(() => {
        if (!Array.isArray(tabs)) return [];
        if (effectiveIsAdmin) return tabs;
        return tabs.filter((t) => (t?.value || "").toLowerCase() !== "trash");
    }, [tabs, effectiveIsAdmin]);

    React.useEffect(() => {
        if (!effectiveIsAdmin && String(activeTab).toLowerCase() === "trash") {
            if (controlledOnTabChange) {
                controlledOnTabChange("all");
            } else {
                tableState.setActiveTab("all");
            }
        }
    }, [effectiveIsAdmin, activeTab, controlledOnTabChange, tableState]);

    const handleToggleSidebar = React.useCallback(() => setIsSidebarCollapsed((prev) => !prev), []);
    const handleToggleFilters = React.useCallback(() => setShowFilters((prev) => !prev), []);

    // Fallback sidebar items from menuData
    const defaultSidebarItems = React.useMemo(() => {
        const items = [];
        menuData.forEach((group) => {
            if (!group.category) return;
            group.category.forEach((sub) => {
                if (sub.status && canAccessPage(activeRole, sub.name, group.name)) {
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
    }, [activeRole]);

    const resolvedTitle = entityConfig.sidebarTitle;
    const rawItems = (sidebarItems && sidebarItems.length > 0)
        ? sidebarItems
        : (userSidebarItems || sidebarData?.items || defaultSidebarItems);

    const isUsingDefault = rawItems === defaultSidebarItems;

    const resolvedItems = React.useMemo(() => {
        return rawItems.map((item) => {
            const count = resolveItemCount(item, sidebarCounts, activeTab);
            return count !== undefined ? { ...item, count } : item;
        });
    }, [rawItems, sidebarCounts, activeTab]);

    const resolvedSelectedItem = React.useMemo(() => {
        if (entityName === "User") return selectedSidebarItem || userCategory || tableState.selectedCategory;
        if (!isUsingDefault) return selectedSidebarItem || tableState.selectedCategory;
        return defaultSidebarItems.find((item) => item.route === location.pathname)?.name || "";
    }, [entityName, selectedSidebarItem, userCategory, isUsingDefault, tableState.selectedCategory, defaultSidebarItems, location.pathname]);

    const handleSidebarClick = React.useCallback((item) => {
        if (isUsingDefault) {
            navigate(item.route);
        } else if (onSidebarItemClick) {
            onSidebarItemClick(item.name || item.role || item.status || item);
        } else if (entityName === "User") {
            if (!isPrivilegedUser) return;
            const targetCategory = item.name || "All Users";
            const targetRole = item.role || (targetCategory.toLowerCase() === "all users" ? "all" : targetCategory.toLowerCase());
            setUserCategory(targetCategory);
            setUserRoleFilter(targetRole);
            tableState.setSelectedCategory(targetCategory);
            tableState.setCurrentPage(1);
        } else {
            tableState.handleSidebarItemClick(item.name || item.role || item.status || item);
        }
    }, [isUsingDefault, navigate, onSidebarItemClick, entityName, isPrivilegedUser, tableState]);

    // Internal Modal state
    const [internalIsModalOpen, setInternalIsModalOpen] = React.useState(false);
    const [internalEditingItem, setInternalEditingItem] = React.useState(null);

    const isModalOpen = controlledIsModalOpen !== undefined ? controlledIsModalOpen : internalIsModalOpen;
    const editingItem = controlledEditingItem !== undefined ? controlledEditingItem : internalEditingItem;

    const lastParamsRef = React.useRef("");
    const onFetchRef = React.useRef(onFetch);
    onFetchRef.current = onFetch;
    const rolesRef = React.useRef(roles);
    rolesRef.current = roles;

    // Fetch data using onFetch callback with entity-specific query enhancements and infinite-loop guard
    const fetchData = React.useCallback((force = false) => {
        if (!onFetchRef.current) return;
        const params = {
            page: activePage,
            limit: itemsPerPage,
            isDeleted: activeTab === "trash",
        };
        const trimmed = typeof activeSearch === "string" ? activeSearch.trim() : "";
        if (trimmed) params.search = trimmed;
        if (activeStatus && activeStatus !== "all") {
            params.isActive = activeStatus === "Active";
        }

        switch (entityName) {
            case "User": {
                const currentRoles = rolesRef.current || [];
                if (!isPrivilegedUser && loggedInUserRoleKey) {
                    const matchedRoleDoc = currentRoles.find(
                        (r) =>
                            String(r.rolename || r.role || r.name || "").toLowerCase().trim() === loggedInUserRoleKey ||
                            String(r._id) === String(loggedInUserRoleId)
                    );
                    if (matchedRoleDoc?._id || loggedInUserRoleId) {
                        params.roleId = matchedRoleDoc?._id || loggedInUserRoleId;
                    }
                    params.role = matchedRoleDoc?.rolename || matchedRoleDoc?.name || loggedInUserRoleName || loggedInUserRoleKey;
                } else if (userRoleFilter && userRoleFilter !== "all") {
                    const target = userRoleFilter.toLowerCase().trim();
                    const matchedRoleDoc = currentRoles.find(
                        (r) => String(r.rolename || r.role || r.name || "").toLowerCase().trim() === target
                    );
                    if (matchedRoleDoc?._id) params.roleId = matchedRoleDoc._id;
                    params.role = matchedRoleDoc?.rolename || matchedRoleDoc?.name || target;
                }
                break;
            }
            case "Role": {
                if (roleFilter && roleFilter !== "all") {
                    params.search = roleFilter;
                }
                break;
            }
            case "Product":
            case "Blog": {
                if (categoryFilter && categoryFilter !== "all") {
                    params.categoryId = categoryFilter;
                }
                break;
            }
            case "SEO": {
                if (seoTypeFilter && seoTypeFilter !== "all") {
                    params.type = seoTypeFilter;
                }
                break;
            }
            default:
                break;
        }

        if (extraFilters && typeof extraFilters === "object") {
            Object.assign(params, extraFilters);
        }

        const paramsKey = `${entityName}:${JSON.stringify(params)}`;
        if (!force && lastParamsRef.current === paramsKey) {
            return;
        }
        lastParamsRef.current = paramsKey;
        onFetchRef.current(params);
    }, [
        activePage,
        itemsPerPage,
        activeTab,
        activeSearch,
        activeStatus,
        entityName,
        isPrivilegedUser,
        loggedInUserRoleKey,
        loggedInUserRoleId,
        loggedInUserRoleName,
        userRoleFilter,
        roleFilter,
        categoryFilter,
        seoTypeFilter,
        JSON.stringify(extraFilters || {}),
    ]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Table pagination & search handlers
    const handleSearchChange = React.useCallback((val) => {
        if (controlledOnSearchChange) {
            controlledOnSearchChange(val);
        } else {
            tableState.handleSearchChange(val);
        }
    }, [controlledOnSearchChange, tableState]);

    const handlePageChange = React.useCallback((page) => {
        if (controlledOnPageChange) {
            controlledOnPageChange(page);
        } else {
            tableState.handlePageChange(page);
        }
    }, [controlledOnPageChange, tableState]);

    const handleTabChange = React.useCallback((tabValue) => {
        const next = typeof tabValue === "string" ? tabValue : (tabValue?.value || "all");
        if (controlledOnTabChange) {
            controlledOnTabChange(next);
        } else {
            tableState.handleTabChange(next);
        }
    }, [controlledOnTabChange, tableState]);

    // Selection handlers
    const handleSelectRow = React.useCallback((idOrRow, row) => {
        if (controlledOnSelectRow) {
            controlledOnSelectRow(idOrRow, row);
        } else {
            tableState.handleSelectRow(row || idOrRow);
        }
    }, [controlledOnSelectRow, tableState]);

    const handleSelectAll = React.useCallback((checked) => {
        if (controlledOnSelectAll) {
            controlledOnSelectAll(checked);
        } else {
            tableState.handleSelectAll(checked ? data : false);
        }
    }, [controlledOnSelectAll, tableState, data]);

    // Modal open / close handlers
    const handleOpenAddModal = React.useCallback(() => {
        if (onAddOpen) onAddOpen();
        setInternalEditingItem(null);
        setInternalIsModalOpen(true);
    }, [onAddOpen]);

    const handleCloseModal = React.useCallback(() => {
        if (controlledOnCloseModal) {
            controlledOnCloseModal();
        } else {
            setInternalIsModalOpen(false);
            setInternalEditingItem(null);
        }
    }, [controlledOnCloseModal]);

    const handleEdit = React.useCallback((row) => {
        if (onEditOpen) onEditOpen(row);
        setInternalEditingItem(row);
        setInternalIsModalOpen(true);
    }, [onEditOpen]);

    const handleView = React.useCallback((row) => {
        if (entityName === "SEO") {
            setViewingSeo(row);
            setIsViewModalOpen(true);
            return;
        }
        if (onView) onView(row);
    }, [entityName, onView]);

    // Delete single item (with auto unwrap and permanent trash deletion)
    const handleDelete = React.useCallback(async (row) => {
        if (!onDelete && !onBulkDelete) return;
        const id = row?.id || row?._id;
        const mongoId = row?._id || row?.id;
        const name = row?.categoryName || row?.productName || row?.blogName || row?.pageName || row?.rolename || row?.fullname || row?.name || row?.title || entityName;
        const isTrash = activeTab === "trash" || Boolean(row?.isDeleted);
        try {
            let res;
            if (isTrash && onBulkDelete) {
                const ids = Array.from(new Set([id, mongoId].filter(Boolean)));
                res = await onBulkDelete({
                    ids,
                    categoryIds: ids,
                    productIds: ids,
                    blogIds: ids,
                    userIds: ids,
                    roleIds: ids,
                    seoIds: ids,
                    permanent: true,
                    force: true,
                });
            } else if (onDelete) {
                res = await onDelete(id, row, { permanent: isTrash, force: isTrash });
            } else if (onBulkDelete) {
                const ids = Array.from(new Set([id, mongoId].filter(Boolean)));
                res = await onBulkDelete({ ids, permanent: isTrash, force: isTrash });
            }
            if (res && typeof res.unwrap === "function") await res.unwrap();
            showToast(`${entityName} "${name}" ${isTrash ? "permanently removed!" : "moved to trash!"}`, "success");
            tableState.setSelectedIds((prev) => prev.filter((i) => i !== id && i !== mongoId));
            fetchData(true);
        } catch (err) {
            showToast(err?.message || `Failed to delete ${entityName.toLowerCase()}`, "danger");
        }
    }, [onDelete, onBulkDelete, entityName, activeTab, tableState, fetchData]);

    // Bulk delete items (with auto unwrap or single-delete loop fallback)
    const handleBulkDelete = React.useCallback(async () => {
        if (!activeSelectedIds.length) return;
        const isTrash = activeTab === "trash";
        const idSet = new Set();
        activeSelectedIds.forEach((sid) => {
            idSet.add(sid);
            const found = (Array.isArray(data) ? data : []).find((item) => item?.id === sid || item?._id === sid);
            if (found) {
                if (found.id) idSet.add(found.id);
                if (found._id) idSet.add(found._id);
            }
        });
        const allIds = Array.from(idSet);

        try {
            if (onBulkDelete) {
                const res = await onBulkDelete({
                    ids: allIds,
                    categoryIds: allIds,
                    productIds: allIds,
                    blogIds: allIds,
                    userIds: allIds,
                    roleIds: allIds,
                    seoIds: allIds,
                    permanent: isTrash,
                    force: isTrash,
                });
                if (res && typeof res.unwrap === "function") await res.unwrap();
            } else if (onDelete) {
                await Promise.all(allIds.map(async (id) => {
                    const res = await onDelete(id, undefined, { permanent: isTrash, force: isTrash });
                    if (res && typeof res.unwrap === "function") await res.unwrap();
                }));
            } else {
                return;
            }
            showToast(`${activeSelectedIds.length} ${entityName.toLowerCase()}(s) ${isTrash ? "permanently removed!" : "moved to trash!"}`, "success");
            if (controlledSelectedRows && controlledOnSelectAll) {
                controlledOnSelectAll(false);
            } else {
                tableState.setSelectedIds([]);
            }
            fetchData(true);
        } catch (err) {
            showToast(err?.message || `Failed to bulk delete ${entityName.toLowerCase()}s`, "danger");
        }
    }, [onBulkDelete, onDelete, activeSelectedIds, activeTab, entityName, data, controlledSelectedRows, controlledOnSelectAll, tableState, fetchData]);

    // Reviews aggregation & pagination for Products / Blogs
    const allReviews = React.useMemo(() => {
        if (entityName !== "Product" && entityName !== "Blog") return [];
        const list = [];
        (Array.isArray(data) ? data : []).forEach((prod) => {
            if (!Array.isArray(prod.reviews)) return;
            prod.reviews.forEach((r, idx) => {
                const globalIndex = list.length + 1;
                const prefix = entityName === "Product" ? "PREW" : "BREW";
                const revId = (r.id && typeof r.id === "string" && r.id.startsWith(`${prefix}-`))
                    ? r.id
                    : `${prefix}-${String(globalIndex).padStart(3, "0")}`;

                const ratingNum = Number(r.rating || 5);
                const stars = "★".repeat(Math.max(1, Math.min(5, Math.round(ratingNum))));
                const normCreator = normalizeCreator(r.createdBy, r.createdby);
                const reviewerName = normCreator.name !== "Admin" ? normCreator.name : (currentUser?.fullname || currentUser?.name || "Customer");
                const reviewerMobile = normCreator.mobile || currentUser?.mobile || "";
                const reviewerAvatar = normCreator.avatar ||
                    (currentUser?.name === reviewerName || currentUser?.fullname === reviewerName ? (currentUser?.image || currentUser?.avatar) : "");
                const itemImage = prod.image || (Array.isArray(prod.images) ? prod.images[0] : "") || "";

                list.push({
                    _id: revId,
                    id: revId,
                    productId: prod.id || prod._id,
                    blogId: prod.id || prod._id,
                    productName: prod.productName || prod.blogName || prod.title || prod.name || entityName,
                    blogName: prod.blogName || prod.productName || prod.title || prod.name || entityName,
                    itemName: prod.productName || prod.blogName || prod.title || prod.name || entityName,
                    sku: prod.sku || prod.id,
                    subText: prod.sku || prod.id,
                    image: itemImage,
                    reviewer: reviewerName,
                    avatar: reviewerAvatar,
                    createdby: {
                        _id: normCreator._id,
                        id: normCreator.id,
                        name: reviewerName,
                        fullname: reviewerName,
                        avatar: reviewerAvatar,
                        image: reviewerAvatar,
                        mobile: reviewerMobile,
                    },
                    rating: ratingNum,
                    ratingDisplay: `${ratingNum} ${stars}`,
                    comment: r.comment || "No comment provided",
                    isActive: r.isActive !== undefined ? Boolean(r.isActive) : true,
                    isDeleted: Boolean(r.isDeleted),
                    createdAt: r.createdAt || prod.createdAt || new Date().toISOString(),
                    updatedAt: r.updatedAt || prod.updatedAt || new Date().toISOString(),
                    rawReview: r,
                    product: prod,
                    blog: prod,
                });
            });
        });
        return list;
    }, [entityName, data, currentUser]);

    const filteredReviews = React.useMemo(() => {
        if (activeTab !== "reviews") return [];
        const q = activeSearch.toLowerCase().trim();
        return allReviews.filter((r) => {
            const matchesStatus =
                activeStatus === "all" || (activeStatus === "Active" ? r.isActive : !r.isActive);
            const matchesCategory =
                categoryFilter === "all" ||
                String(r.product?.categoryId?._id || r.product?.categoryId || r.blog?.categoryId?._id || r.blog?.categoryId) === String(categoryFilter);
            const matchesSearch =
                !q ||
                r.productName.toLowerCase().includes(q) ||
                r.reviewer.toLowerCase().includes(q) ||
                r.comment.toLowerCase().includes(q) ||
                r.id.toLowerCase().includes(q);
            return matchesStatus && matchesCategory && matchesSearch;
        });
    }, [activeTab, allReviews, activeSearch, activeStatus, categoryFilter]);

    const paginatedReviews = React.useMemo(() => {
        if (activeTab !== "reviews") return [];
        const start = (activePage - 1) * itemsPerPage;
        return filteredReviews.slice(start, start + itemsPerPage);
    }, [activeTab, filteredReviews, activePage, itemsPerPage]);

    // Review delete handler
    const handleDeleteReview = React.useCallback(async (row) => {
        const parentId = row.productId || row.blogId || row.product?._id || row.product?.id || row.blog?._id || row.blog?.id;
        const reviewId = row.rawReview?._id || row.rawReview?.id || row._id || row.id;
        try {
            if (onDeleteReview) {
                let res;
                if (onDeleteReview.length >= 2) {
                    res = await onDeleteReview(parentId, reviewId);
                } else {
                    res = await onDeleteReview({ parentId, productId: parentId, blogId: parentId, reviewId, id: parentId, row });
                }
                if (res && typeof res.unwrap === "function") await res.unwrap();
                showToast("Review removed successfully!", "success");
                fetchData();
            } else {
                handleDelete(row);
            }
        } catch (err) {
            showToast(err?.message || "Failed to delete review", "danger");
        }
    }, [onDeleteReview, handleDelete, fetchData]);

    // Review submission handler
    const handleReviewSubmit = React.useCallback(async (formData) => {
        const targetItemId = formData.productId || formData.blogId || (reviewTargetItem ? (reviewTargetItem.id || reviewTargetItem._id) : null);
        if (!targetItemId) {
            showToast(`Please select a ${entityName.toLowerCase()}`, "warning");
            return;
        }
        const reviewData = {
            rating: Number(formData.rating || 5),
            comment: formData.comment?.trim(),
            createdBy: getActiveCreatorId(currentUser),
            isActive: sanitizeCrudFormData(formData, { userRole: activeRole }).isActive,
        };
        try {
            if (onAddReview) {
                let res;
                if (onAddReview.length >= 2) {
                    res = await onAddReview(targetItemId, reviewData);
                } else {
                    res = await onAddReview({ id: targetItemId, productId: targetItemId, blogId: targetItemId, data: reviewData, review: reviewData, ...reviewData });
                }
                if (res && typeof res.unwrap === "function") await res.unwrap();
                showToast("Review submitted successfully!", "success");
            }
            setIsReviewModalOpen(false);
            setReviewTargetItem(null);
            fetchData();
        } catch (err) {
            showToast(err?.message || "Failed to submit review", "danger");
        }
    }, [entityName, reviewTargetItem, currentUser, activeRole, onAddReview, fetchData]);

    // Form submit handler with auto image encoding, user role resolution, and thunk unwrap
    const handleFormSubmit = React.useCallback(async (formData) => {
        if (onSubmit) {
            await onSubmit(formData, { editingItem, handleCloseModal, refreshData: fetchData });
            return;
        }

        let payload = { ...formData };

        // Convert file images to Base64 automatically if needed
        if (formData.image) {
            const rawImg = formData.image;
            let imageVal = "";
            if (Array.isArray(rawImg)) {
                if (rawImg.length > 0) {
                    const first = rawImg[0];
                    if (first instanceof File || first instanceof Blob) {
                        try { imageVal = await fileToBase64(first); } catch { imageVal = first.name || ""; }
                    } else if (typeof first === "string") {
                        imageVal = first.trim();
                    }
                }
            } else if (rawImg instanceof File || rawImg instanceof Blob) {
                try { imageVal = await fileToBase64(rawImg); } catch { imageVal = rawImg.name || ""; }
            } else if (typeof rawImg === "string") {
                imageVal = rawImg.trim();
            } else if (editingItem?.image) {
                imageVal = editingItem.image;
            }
            payload.image = imageVal;
        }

        const activeCreatorId = getActiveCreatorId(currentUser);
        if (activeCreatorId) {
            payload.createdBy = activeCreatorId;
        }

        if (formData.isActive !== undefined) {
            payload.isActive = sanitizeCrudFormData(formData, { userRole: activeRole, isEditing: Boolean(editingItem) }).isActive;
        }

        // Entity specific payload transformations
        if (entityName === "User") {
            const matchedRole = (roles || []).find(
                (r) => String(r.rolename || r.role || r.name).toLowerCase() === String(formData.role).toLowerCase()
            );
            payload.role = matchedRole?.rolename?.toLowerCase() || formData.role || "customer";
            payload.roleId = matchedRole?._id || undefined;
            if (formData.password) {
                payload.password = formData.password;
            }
        } else if (entityName === "Role") {
            const validPermSet = new Set();
            (ROLE_ACCESS_CONFIG || []).forEach((c) => (c.permissions || []).forEach((p) => validPermSet.add(p)));

            let cleanPerms = Array.isArray(payload.permissions)
                ? payload.permissions.filter((p) => validPermSet.has(p))
                : [];

            if (Array.isArray(payload.pages)) {
                if (payload.pages.includes("Full_Access")) {
                    cleanPerms = ["Full_Access"];
                    payload.pages = ["Full_Access"];
                } else if (!cleanPerms.length) {
                    const derived = [];
                    payload.pages.forEach((pg) => {
                        const match = (ROLE_ACCESS_CONFIG || []).find((c) => c.page === pg || c.label === pg);
                        if (match) derived.push(...match.permissions);
                    });
                    cleanPerms = Array.from(new Set(derived));
                }
            }
            payload.permissions = cleanPerms.length ? cleanPerms : ["Full_Access"];
            payload.pages = Array.isArray(payload.pages) && payload.pages.length ? payload.pages : ["Full_Access"];
        }

        if (transformPayload) {
            payload = await transformPayload(formData, { editingItem, currentUser, activeCreatorId, basePayload: payload });
        }

        try {
            if (editingItem) {
                const targetId = editingItem.id || editingItem._id;
                if (editingItem.createdBy) {
                    payload.createdBy = typeof editingItem.createdBy === "object"
                        ? (editingItem.createdBy._id || editingItem.createdBy.id || activeCreatorId)
                        : (editingItem.createdBy || activeCreatorId);
                }
                const res = await onEdit?.(targetId, payload);
                if (res && typeof res.unwrap === "function") await res.unwrap();
                const name = payload.categoryName || payload.productName || payload.blogName || payload.pageName || payload.rolename || payload.fullname || payload.name || payload.title || entityName;
                showToast(`${entityName} "${name}" updated successfully!`, "success");
            } else {
                if (onAdd) {
                    const res = await onAdd(payload);
                    if (res && typeof res.unwrap === "function") await res.unwrap();
                } else if (entityName === "User") {
                    await registerApi({ ...payload, isOtpVerified: true });
                }
                const name = payload.categoryName || payload.productName || payload.blogName || payload.pageName || payload.rolename || payload.fullname || payload.name || payload.title || entityName;
                showToast(`${entityName} "${name}" created successfully!`, "success");
            }
            handleCloseModal();
            fetchData();
        } catch (err) {
            showToast(err?.message || `Failed to save ${entityName.toLowerCase()}`, "danger");
        }
    }, [onSubmit, editingItem, handleCloseModal, fetchData, currentUser, activeRole, entityName, roles, transformPayload, onEdit, onAdd]);

    const isReviewsTab = activeTab === "reviews" && (entityName === "Product" || entityName === "Blog");

    // Quick action toolbar
    const canEditEntity = effectiveIsAdmin || canPerformAction(activeRole, "edit", entityName);
    const canTrashEntity = effectiveIsAdmin || canPerformAction(activeRole, "delete", entityName);

    const resolvedQuickAction = quickAction || (
        <div className="flex items-center gap-8">
            {activeSelectedIds.length > 0 && (onBulkDelete || onDelete) && canTrashEntity && (
                <Button
                    text={`Delete (${activeSelectedIds.length})`}
                    version="v2"
                    bg="danger"
                    variant="outline"
                    border="danger"
                    color="white"
                    icon="Trash"
                    onClick={handleBulkDelete}
                />
            )}
            {onSeedSeo && canEditEntity && (
                <Button
                    text="Seed Defaults"
                    version="v2"
                    bg="secondary"
                    variant="outline"
                    border="secondary"
                    color="secondary"
                    icon="Database"
                    onClick={async () => {
                        try {
                            const res = await onSeedSeo();
                            if (res && typeof res.unwrap === "function") await res.unwrap();
                            showToast("Default SEO pages seeded successfully!", "success");
                            fetchData();
                        } catch (err) {
                            showToast(err?.message || "Failed to seed SEO records", "danger");
                        }
                    }}
                />
            )}
            {extraQuickActions}
            {isReviewsTab ? (
                <Button
                    text="Add Review"
                    version="v2"
                    bg="primary"
                    variant="outline"
                    border="primary"
                    color="white"
                    icon="Plus"
                    onClick={() => {
                        setReviewTargetItem(null);
                        setIsReviewModalOpen(true);
                    }}
                />
            ) : showAddButton && (onAdd || onAddOpen || entityName === "User") && canEditEntity && (
                <Button
                    text={entityConfig.addBtnText}
                    version="v2"
                    bg="primary"
                    variant="outline"
                    border="primary"
                    color="white"
                    icon="Plus"
                    onClick={handleOpenAddModal}
                />
            )}
        </div>
    );

    // Dynamic Filter toolbar nodes per entity
    const defaultCatalogFilterFields = React.useMemo(() => {
        if (entityName !== "Product" && entityName !== "Blog") return null;
        return [
            {
                type: "select",
                label: `${entityName} Category`,
                options: [{ label: "All Categories", value: "all" }, ...dynamicCategoryOptions],
                value: categoryFilter,
                onChange: (val) => {
                    const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
                    setCategoryFilter(next);
                    tableState.setCurrentPage(1);
                },
            },
            {
                type: "select",
                label: `${entityName} Status`,
                options: STATUS_OPTIONS,
                value: activeStatus,
                onChange: tableState.handleStatusFilterChange,
            },
        ];
    }, [entityName, dynamicCategoryOptions, categoryFilter, activeStatus, tableState]);

    const defaultRoleFilterFields = React.useMemo(() => {
        if (entityName !== "Role") return null;
        return [
            {
                type: "select",
                label: "Role Filter",
                options: [{ label: "All Roles", value: "all" }, ...dynamicRoleOptions],
                value: roleFilter,
                onChange: (v) => {
                    const val = typeof v === "string" ? v : v?.value || "all";
                    setRoleFilter(val);
                    tableState.setCurrentPage(1);
                },
            },
            {
                type: "select",
                label: "Role Status",
                options: STATUS_OPTIONS,
                value: activeStatus,
                onChange: tableState.handleStatusFilterChange,
            },
            {
                type: "select",
                label: "Required Permission Capability",
                options: [{ label: "All Permissions", value: "all" }, ...rolePermissionOptions],
                value: permissionFilter,
                onChange: (v) => {
                    const val = typeof v === "string" ? v : v?.value || "all";
                    setPermissionFilter(val);
                    tableState.setCurrentPage(1);
                },
            },
        ];
    }, [entityName, dynamicRoleOptions, roleFilter, activeStatus, rolePermissionOptions, tableState]);

    const defaultSeoFilterFields = React.useMemo(() => {
        if (entityName !== "SEO") return null;
        return [
            {
                type: "select",
                label: "Index Status",
                options: STATUS_OPTIONS,
                value: activeStatus,
                onChange: tableState.handleStatusFilterChange,
            },
            {
                type: "select",
                label: "Page Type",
                options: dynamicSeoTypeOptions,
                value: seoTypeFilter,
                onChange: (val) => {
                    const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
                    setSeoTypeFilter(next);
                    tableState.setCurrentPage(1);
                },
            },
        ];
    }, [entityName, dynamicSeoTypeOptions, seoTypeFilter, activeStatus, tableState]);

    const resolvedFilterInputs = filterInputs || (
        (filterFields && filterFields.length > 0) ? (
            <FilterForm fields={filterFields} />
        ) : defaultRoleFilterFields ? (
            <FilterForm fields={defaultRoleFilterFields} />
        ) : defaultCatalogFilterFields ? (
            <FilterForm fields={defaultCatalogFilterFields} />
        ) : defaultSeoFilterFields ? (
            <FilterForm fields={defaultSeoFilterFields} />
        ) : showStatusFilter ? (
            <FilterForm
                fields={[
                    {
                        type: "select",
                        label: `${entityName || "Category"} Status`,
                        options: STATUS_OPTIONS,
                        value: activeStatus,
                        onChange: tableState.handleStatusFilterChange,
                    },
                ]}
            />
        ) : null
    );

    const hasActiveFilters = controlledHasActiveFilters !== undefined
        ? controlledHasActiveFilters
        : (activeStatus !== "all" || Boolean(activeSearch) || activeTab !== "all" || roleFilter !== "all" || permissionFilter !== "all" || categoryFilter !== "all" || seoTypeFilter !== "all" || (entityName === "User" && isPrivilegedUser && userRoleFilter !== "all"));

    const handleClearAllFilters = React.useCallback(() => {
        if (controlledOnClearAllFilters) {
            controlledOnClearAllFilters();
        } else if (onClearFilters) {
            onClearFilters();
        } else {
            tableState.resetFilters();
            setRoleFilter("all");
            setPermissionFilter("all");
            setCategoryFilter("all");
            setSeoTypeFilter("all");
            if (entityName === "User") {
                if (isPrivilegedUser) {
                    setUserRoleFilter("all");
                    setUserCategory("All Users");
                } else {
                    setUserRoleFilter(loggedInUserRoleKey);
                    setUserCategory(`${loggedInUserRoleName.charAt(0).toUpperCase() + loggedInUserRoleName.slice(1)} Users`);
                }
            }
            showToast(`${entityName} filters reset`, "info");
        }
    }, [controlledOnClearAllFilters, onClearFilters, tableState, entityName, isPrivilegedUser, loggedInUserRoleKey, loggedInUserRoleName]);

    // Modal Form Fields dispatcher
    const resolvedFormFields = React.useMemo(() => {
        if (typeof getFormFields === "function") {
            return getFormFields({
                editingCategory: editingItem,
                editingProduct: editingItem,
                editingBlog: editingItem,
                editingSeo: editingItem,
                editingRole: editingItem,
                editingUser: editingItem,
                editingItem,
                userRole: activeRole,
                currentUser,
                roleOptions: dynamicRoleOptions,
                categoryOptions: dynamicCategoryOptions,
            });
        }
        if (entityConfig.formFields) {
            return entityConfig.formFields({
                editingCategory: editingItem,
                editingProduct: editingItem,
                editingBlog: editingItem,
                editingSeo: editingItem,
                editingRole: editingItem,
                editingUser: editingItem,
                editingItem,
                userRole: activeRole,
                currentUser,
            });
        }
        return staticFormFields || [];
    }, [getFormFields, entityConfig, staticFormFields, editingItem, activeRole, currentUser, dynamicRoleOptions, dynamicCategoryOptions]);

    // Data filtering per entity
    const resolvedData = React.useMemo(() => {
        let list = Array.isArray(data) ? data : [];

        switch (entityName) {
            case "Role": {
                if (permissionFilter !== "all") {
                    list = list.filter((r) => Array.isArray(r.permissions) && r.permissions.includes(permissionFilter));
                }
                if (roleFilter !== "all") {
                    const target = roleFilter.toLowerCase().trim();
                    list = list.filter((r) => {
                        const name = String(r.rolename || r.role || r.name || "").toLowerCase().trim();
                        return name === target;
                    });
                }
                return list;
            }
            case "User": {
                if (!isPrivilegedUser && loggedInUserRoleKey) {
                    const matchedRoleDoc = (roles || []).find(
                        (r) =>
                            String(r.rolename || r.role || r.name || "").toLowerCase().trim() === loggedInUserRoleKey ||
                            String(r._id) === String(loggedInUserRoleId)
                    );
                    const targetId = String(matchedRoleDoc?._id || loggedInUserRoleId || "").trim();

                    return list.filter((u) => {
                        const uRole = String(u.role || u.rolename || u.roleId?.rolename || "").toLowerCase().trim();
                        const uRoleId = String(u.roleId?._id || u.roleId || "").trim();
                        return uRole === loggedInUserRoleKey || (targetId && uRoleId === targetId);
                    });
                }

                if (userRoleFilter && userRoleFilter !== "all") {
                    const target = userRoleFilter.toLowerCase().trim();
                    const matchedRoleDoc = (roles || []).find(
                        (r) => String(r.rolename || r.role || r.name || "").toLowerCase().trim() === target
                    );
                    const targetId = String(matchedRoleDoc?._id || "").trim();
                    const targetCode = String(matchedRoleDoc?.id || "").toLowerCase().trim();

                    return list.filter((u) => {
                        const uRole = String(u.role || u.rolename || "").toLowerCase().trim();
                        const uRoleId = String(u.roleId?._id || u.roleId || "").trim();
                        return (
                            uRole === target ||
                            (targetId && uRoleId === targetId) ||
                            (targetCode && uRole === targetCode)
                        );
                    });
                }
                return list;
            }
            case "Product":
            case "Blog": {
                if (categoryFilter !== "all") {
                    const targetCat = String(categoryFilter);
                    list = list.filter((it) => {
                        const cId = String(it.categoryId?._id || it.categoryId || "");
                        return cId === targetCat;
                    });
                }
                return list;
            }
            case "SEO": {
                if (seoTypeFilter !== "all") {
                    const targetType = seoTypeFilter.toLowerCase();
                    list = list.filter((it) => String(it.type || "").toLowerCase() === targetType);
                }
                return list;
            }
            default:
                return list;
        }
    }, [data, entityName, permissionFilter, roleFilter, isPrivilegedUser, loggedInUserRoleKey, loggedInUserRoleId, userRoleFilter, roles, categoryFilter, seoTypeFilter]);

    const resolvedShowSidebar = entityConfig.showSidebar;

    const currentTableData = isReviewsTab ? paginatedReviews : resolvedData;
    const currentTableColumns = isReviewsTab ? reviewsTableColumns : columns;
    const currentTotalItems = isReviewsTab ? filteredReviews.length : (total !== undefined ? total : resolvedData.length);
    const currentTableTitle = isReviewsTab
        ? (entityName === "Product" ? "Product Reviews & Ratings" : "Reader Feedback & Reviews")
        : entityConfig.tableTitle;
    const currentTableSubtitle = isReviewsTab
        ? "Moderated feedback, ratings, and customer commentary"
        : entityConfig.tableSubtitle;

    return (
        <Container version="v0">
            <div className="flex w-full items-start">
                {resolvedShowSidebar && (
                    <MainLayoutSidebar
                        sidebarTitle={resolvedTitle}
                        items={resolvedItems}
                        selectedItem={resolvedSelectedItem}
                        isCollapsed={isSidebarCollapsed}
                        onToggleCollapse={handleToggleSidebar}
                        onItemClick={handleSidebarClick}
                    />
                )}
                <div
                    className={!resolvedShowSidebar ? "w-full" : isSidebarCollapsed ? "w-95" : "w-80"}
                    style={{ transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)", minWidth: 0 }}
                >
                    <MainLayoutHeader
                        headerIcon={entityConfig.headerIcon}
                        headerTitle={entityConfig.headerTitle}
                        headerSub={entityConfig.headerSub}
                        quickAction={resolvedQuickAction}
                        quickStyle={quickStyle}
                        showTabControls={showTabControls}
                        tabs={sanitizedTabs}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        filterDescription={filterDescription || `Filter ${entityName?.toLowerCase()}s by status or search keywords`}
                        filterInputs={resolvedFilterInputs}
                        hasActiveFilters={hasActiveFilters}
                        onClearAllFilters={handleClearAllFilters}
                        showFilters={showFilters}
                        onToggleFilters={handleToggleFilters}
                    />
                    <div className="p-12 bg-forth">
                        {/* Global Site Metadata Summary Banner for SEO */}
                        {entityName === "SEO" && !children && seoSiteInfo && (
                            <div
                                className="flex items-center justify-between flex-wrap gap-12 mb-16 p-12 rounded-8"
                                style={{
                                    background: "var(--card-bg, #ffffff)",
                                    border: "1px solid var(--border-color, #e2e8f0)",
                                }}
                            >
                                <div className="flex items-center gap-10 flex-wrap">
                                    <span className="font-600 text-dark small-text">{seoSiteInfo.name}</span>
                                    <a
                                        href={seoSiteInfo.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-primary mini-text font-mono underline"
                                    >
                                        {seoSiteInfo.url}
                                    </a>
                                    <span className="text-gray mini-text">
                                        • {seoSiteInfo.address?.addressLocality}, {seoSiteInfo.address?.addressRegion}
                                    </span>
                                </div>
                                <div className="flex items-center gap-12 flex-wrap">
                                    <span className="mini-text text-gray">
                                        Helpline: <strong className="text-dark font-500">{seoSiteInfo.phone}</strong>
                                    </span>
                                    <span className="mini-text text-gray">
                                        • Email: <strong className="text-dark font-500">{seoSiteInfo.email}</strong>
                                    </span>
                                    <Button
                                        text="Copy Sitemap Manifest"
                                        version="v2"
                                        size="sm"
                                        variant="outline"
                                        border="primary"
                                        bg="primary"
                                        color="white"
                                        onClick={() => {
                                            const payload = (Array.isArray(data) ? data : []).map((s) => ({
                                                url: s.canonical || `https://ashmitavinyls.com${s.path}`,
                                                lastModified: s.updatedAt || new Date().toISOString(),
                                                changeFrequency: "weekly",
                                                priority: s.path === "/home" ? 1.0 : 0.8,
                                            }));
                                            navigator.clipboard?.writeText(JSON.stringify(payload, null, 2));
                                            showToast("SEO sitemap manifest copied to clipboard!", "success");
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {childrenPlacement === "beforeTable" && children}

                        {showTable && currentTableColumns && currentTableColumns.length > 0 && (
                            <div className="bg-white p-14 rounded-10">
                                <Table
                                    title={currentTableTitle}
                                    subtitle={currentTableSubtitle}
                                    data={currentTableData}
                                    columns={currentTableColumns}
                                    totalItems={currentTotalItems}
                                    itemsPerPage={itemsPerPage}
                                    page={activePage}
                                    onPageChange={handlePageChange}
                                    searchQuery={activeSearch}
                                    onSearchChange={handleSearchChange}
                                    searchPlaceholder={isReviewsTab ? "Search reviews by user, comment, or product..." : entityConfig.searchPlaceholder}
                                    itemName={isReviewsTab ? "reviews" : (itemName || entityName?.toLowerCase() || "item")}
                                    entity={entityName}
                                    collapsible={collapsible}
                                    maxVisibleColumns={maxVisibleColumns}
                                    minWidth={minWidth}
                                    loading={loading}
                                    showInactive={true}
                                    allowInactive={true}
                                    allowAllRoleActions={effectiveIsAdmin}
                                    showActionsForAllRoles={effectiveIsAdmin}
                                    currentRole={activeRole}
                                    userRole={activeRole}
                                    selectedRows={activeSelectedIds}
                                    onSelectRow={handleSelectRow}
                                    onSelectAll={handleSelectAll}
                                    onView={handleView}
                                    onEdit={isReviewsTab ? undefined : handleEdit}
                                    onDelete={isReviewsTab ? handleDeleteReview : handleDelete}
                                    viewTitle={viewTitle || (entityName === "SEO" ? "Preview Search Snippet & Social OG" : `View ${entityName} Details`)}
                                    editTitle={editTitle || `Edit ${entityName}`}
                                    deleteTitle={
                                        deleteTitle ||
                                        (activeTab === "trash"
                                            ? `Permanently Delete ${entityName}`
                                            : `Delete ${entityName}`)
                                    }
                                    emptyAction={
                                        isReviewsTab ? (
                                            <Button
                                                text="Add Review"
                                                version="v2"
                                                bg="primary"
                                                variant="outline"
                                                border="primary"
                                                color="white"
                                                icon="Plus"
                                                onClick={() => {
                                                    setReviewTargetItem(null);
                                                    setIsReviewModalOpen(true);
                                                }}
                                            />
                                        ) : emptyAction
                                    }
                                />
                            </div>
                        )}

                        {childrenPlacement === "afterTable" && children}

                        {/* Main CRUD Modal */}
                        {showModal && (getFormFields || entityConfig.formFields || (staticFormFields && staticFormFields.length > 0)) && (
                            <Modal
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                title={
                                    modalTitle ||
                                    (editingItem
                                        ? `Edit ${entityName}: ${editingItem.categoryName ||
                                        editingItem.productName ||
                                        editingItem.blogName ||
                                        editingItem.pageName ||
                                        editingItem.rolename ||
                                        editingItem.fullname ||
                                        editingItem.name ||
                                        editingItem.title ||
                                        ""
                                        }`
                                        : `Add New ${entityName}`)
                                }
                                size={modalSize}
                                type={modalType}
                                placement={modalPlacement}
                                footer={null}
                            >
                                <FormBuilder
                                    key={editingItem ? (editingItem.id || editingItem._id) : "new-crud-item"}
                                    fields={resolvedFormFields}
                                    submitType={formSubmitType}
                                    onSubmit={handleFormSubmit}
                                    submitText={
                                        editingItem
                                            ? `Update ${entityName}`
                                            : `Save ${entityName}`
                                    }
                                    col={formCols}
                                />
                            </Modal>
                        )}

                        {/* Generic Reviews Modal for Product / Blog */}
                        {isReviewModalOpen && (
                            <Modal
                                isOpen={isReviewModalOpen}
                                onClose={() => {
                                    setIsReviewModalOpen(false);
                                    setReviewTargetItem(null);
                                }}
                                title={`Add ${entityName} Review`}
                                size="sm"
                                type="sidebar"
                                placement="right"
                                footer={null}
                            >
                                <FormBuilder
                                    fields={
                                        entityName === "Product"
                                            ? getProductReviewFormFields({
                                                products: data || [],
                                                reviewTargetProduct: reviewTargetItem,
                                                userRole: activeRole,
                                            })
                                            : getBlogReviewFormFields({
                                                blogs: data || [],
                                                reviewTargetBlog: reviewTargetItem,
                                                userRole: activeRole,
                                            })
                                    }
                                    submitType="json"
                                    onSubmit={handleReviewSubmit}
                                    submitText="Publish Review"
                                    col="1"
                                />
                            </Modal>
                        )}

                        {/* Generic Live SEO Audit & SERP Preview Modal */}
                        {entityName === "SEO" && viewingSeo && (
                            <Modal
                                isOpen={isViewModalOpen}
                                onClose={() => {
                                    setIsViewModalOpen(false);
                                    setViewingSeo(null);
                                }}
                                title={`Live SEO Audit & SERP Preview: ${viewingSeo.pageName || viewingSeo.name}`}
                                size="md"
                                placement="center"
                                footer={null}
                            >
                                <div className="p-10">
                                    <div className="p-14 bg-forth rounded-8 border border-ec flex items-center justify-between">
                                        <div>
                                            <h4 className="font-600 font-16 text-dark">{viewingSeo.pageName || viewingSeo.name}</h4>
                                            <p className="font-mono text-gray font-12 mt-2">{viewingSeo.canonical || viewingSeo.path}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-block px-10 py-4 bg-light-primary text-primary font-700 rounded-6 font-14">
                                                {viewingSeo.seoScore || "92 / 100"}
                                            </span>
                                            <div className="font-11 text-gray mt-2">SEO Health Score</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="font-600 font-14 text-dark mb-8 flex items-center gap-6">
                                            <Icon name="Search" width="14" height="14" />
                                            Google SERP Search Snippet Preview
                                        </h5>
                                        <div className="p-14 bg-white rounded-8 border border-ec shadow-sm font-sans">
                                            <div className="flex items-center gap-6 text-gray font-12 mb-4">
                                                <span className="w-18 h-18 rounded-full bg-light-primary flex items-center justify-center font-bold font-10 text-primary">
                                                    AV
                                                </span>
                                                <span className="text-secondary font-500">ashmitavinyls.com</span>
                                                <span className="text-gray">&rsaquo;</span>
                                                <span className="text-gray truncate">{viewingSeo.path}</span>
                                            </div>
                                            <h3 className="font-500 font-16 text-primary hover:underline cursor-pointer mb-6 leading-tight">
                                                {viewingSeo.title || `${viewingSeo.pageName} | Ashmita Vinyls`}
                                            </h3>
                                            <p className="font-13 text-secondary leading-snug line-clamp2 m-0">
                                                {viewingSeo.description || "Explore industrial PVC vinyl products, strip curtains, and accessories from Ashmita Vinyls across India."}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="font-600 font-14 text-dark mb-8 flex items-center gap-6">
                                            <Icon name="Share2" width="14" height="14" />
                                            Social OpenGraph Card Preview
                                        </h5>
                                        <div className="rounded-8 border border-ec overflow-hidden bg-white shadow-sm">
                                            {viewingSeo.image ? (
                                                <img
                                                    src={viewingSeo.image}
                                                    alt={viewingSeo.title || "OpenGraph Preview"}
                                                    className="w-full h-160 object-cover bg-forth border-b border-ec"
                                                    referrerPolicy="no-referrer"
                                                    crossOrigin="anonymous"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = "none";
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-100 flex items-center justify-center bg-forth text-gray font-12">
                                                    No OpenGraph Image Configured
                                                </div>
                                            )}
                                            <div className="p-12">
                                                <span className="text-gray uppercase font-10 font-600 tracking-wider">
                                                    ASHMITAVINYLS.COM • {String(viewingSeo.type || "WEBSITE").toUpperCase()}
                                                </span>
                                                <h5 className="font-600 font-14 text-dark mt-4 line-clamp1">
                                                    {viewingSeo.title || viewingSeo.pageName}
                                                </h5>
                                                <p className="font-12 text-secondary mt-4 line-clamp2 m-0">
                                                    {viewingSeo.description || "Social media preview description."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        )}

                        {customModal}
                    </div>
                </div>
            </div>
        </Container>
    );
});

MainLayout.displayName = "MainLayout";
export default MainLayout;
