import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";

// Data and table column definitions from apiData.js
import {
    rolesSidebarData,
    rolesTableColumns,
    rolesData as initialRolesData,
} from "../../utils/apiData";

// Navigation tabs for Role management
const TABS = [
    { name: "All Roles", value: "all" },
    { name: "System Admin", value: "admin" },
    { name: "Vendor Partners", value: "vendor" },
    { name: "Standard Users", value: "user" },
    { name: "Management", value: "manager" },
    { name: "Active Only", value: "Active" },
];

const SIDEBAR_TO_TAB = {
    "All Roles": "all",
    "Administrator": "admin",
    "Vendor Partners": "vendor",
    "Standard Users": "user",
    "Management": "manager",
};

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ statusFilter, setStatusFilter, permissionFilter, setPermissionFilter }) => {
    const statusOptions = useMemo(
        () => [
            { label: "All Statuses", value: "all" },
            { label: "Active Only", value: "Active" },
            { label: "Inactive Only", value: "Inactive" },
        ],
        []
    );

    const permissionOptions = useMemo(
        () => [
            { label: "All Permissions", value: "all" },
            { label: "User Management (manage_users)", value: "manage_users" },
            { label: "Role Management (manage_roles)", value: "manage_roles" },
            { label: "Product Management (manage_products)", value: "manage_products" },
            { label: "Analytics Access (view_analytics)", value: "view_analytics" },
            { label: "Reports & Audit (view_reports)", value: "view_reports" },
            { label: "Full System Access (full_access)", value: "full_access" },
        ],
        []
    );

    return (
        <div className="grid-cols-2 gap-16">
            <Fields
                type="select"
                label="Role Status"
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
            />
            <Fields
                type="select"
                label="Required Permission Capability"
                options={permissionOptions}
                value={permissionFilter}
                onChange={setPermissionFilter}
            />
        </div>
    );
});
FilterDrawerContent.displayName = "FilterDrawerContent";

const Role = () => {
    const [roles, setRoles] = useState(initialRolesData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Roles");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [permissionFilter, setPermissionFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Sidebar items with dynamic role count calculations
    const sidebarItems = useMemo(() => {
        return rolesSidebarData.items.map((item) => {
            let count = roles.length;
            if (item.role !== "all") {
                count = roles.filter((r) => r.role === item.role).length;
            }
            return { ...item, count, icon: "Shield" };
        });
    }, [roles]);

    // Handlers wrapped in useCallback for zero unnecessary re-renders
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const mappedTab = SIDEBAR_TO_TAB[name] || "all";
        setActiveTab(mappedTab);
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const foundEntry = Object.entries(SIDEBAR_TO_TAB).find(([, val]) => val === tabValue);
        if (foundEntry) setSelectedCategory(foundEntry[0]);
        else setSelectedCategory("All Roles");
    }, []);

    const handleSearchChange = useCallback((value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, []);

    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, []);

    const handleClearFilters = useCallback(() => {
        setStatusFilter("all");
        setPermissionFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Role filters reset", "info");
    }, []);

    // Action handlers for table rows
    const handleViewRole = useCallback((row) => {
        const perms = Array.isArray(row.permissions) ? row.permissions.join(", ") : "None";
        showToast(`Role: ${row.name} | Permissions: ${perms}`, "info");
    }, []);

    const handleEditRole = useCallback((row) => {
        showToast(`Editing security policy for ${row.name}`, "info");
    }, []);

    const handleDeleteRole = useCallback((row) => {
        setRoles((prev) => prev.filter((r) => r.id !== row.id));
        showToast(`Role "${row.name}" revoked & archived!`, "danger");
    }, []);

    const handleAddRole = useCallback(() => {
        showToast("Create Security Role modal triggered!", "success");
    }, []);

    const handleExportRoles = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(roles, null, 2));
        showToast("RBAC policy matrix copied to clipboard!", "success");
    }, [roles]);

    // Filter and paginate data
    const filteredRoles = useMemo(() => {
        return roles.filter((item) => {
            // Tab / Category filter
            const matchesTab =
                activeTab === "all" ||
                (activeTab === "Active" ? item.status === "Active" : item.role === activeTab);

            // Status filter
            const matchesStatus = statusFilter === "all" || item.status === statusFilter;

            // Permission filter
            const matchesPermission =
                permissionFilter === "all" ||
                (Array.isArray(item.permissions) && item.permissions.includes(permissionFilter));

            // Search query filter
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                item.name.toLowerCase().includes(q) ||
                (item.description && item.description.toLowerCase().includes(q)) ||
                item.role.toLowerCase().includes(q) ||
                (Array.isArray(item.permissions) &&
                    item.permissions.some((p) => p.toLowerCase().includes(q)));

            return matchesTab && matchesStatus && matchesPermission && matchesSearch;
        });
    }, [roles, activeTab, statusFilter, permissionFilter, searchQuery]);

    const paginatedRoles = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredRoles.slice(start, start + itemsPerPage);
    }, [filteredRoles, currentPage, itemsPerPage]);

    const hasActiveFilters = useMemo(
        () => statusFilter !== "all" || permissionFilter !== "all" || searchQuery !== "",
        [statusFilter, permissionFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                permissionFilter={permissionFilter}
                setPermissionFilter={setPermissionFilter}
            />
        ),
        [statusFilter, permissionFilter]
    );

    const quickActionNode = useMemo(
        () => (
            <div className="flex items-center gap-8">
                <Button
                    text="Export Matrix"
                    version="v2"
                    bg="white"
                    color="dark"
                    border="tertiary"
                    icon="FileText"
                    onClick={handleExportRoles}
                    title="Export RBAC matrix as JSON"
                />
                <Button
                    text="Create Role"
                    version="v2"
                    bg="primary"
                    color="white"
                    icon="Plus"
                    onClick={handleAddRole}
                    title="Define a new security role"
                />
            </div>
        ),
        [handleExportRoles, handleAddRole]
    );

    return (
        <MainLayout
            sidebarTitle={rolesSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Shield" width="18" height="18" />}
            headerTitle="Role Permissions & RBAC"
            headerSub="Define security profiles, granular permissions, privilege hierarchies, and user assignments"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter role profiles by permission privilege, status, or keyword search"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <div className="bg-white rounded-8 bord p-20 shadow-sm">
                <Table
                    title="Access Roles & Policies"
                    subtitle="Role-based access control matrix with permission grants and assigned operators"
                    data={paginatedRoles}
                    columns={rolesTableColumns}
                    totalItems={filteredRoles.length}
                    itemsPerPage={itemsPerPage}
                    page={currentPage}
                    onPageChange={handlePageChange}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search roles by title, description, or permissions..."
                    itemName="roles"
                    collapsible={true}
                    maxVisibleColumns={5}
                    minWidth="1050px"
                    onView={handleViewRole}
                    onEdit={handleEditRole}
                    onDelete={handleDeleteRole}
                    viewTitle="Inspect Policy"
                    editTitle="Edit Permissions"
                    deleteTitle="Delete Role"
                />
            </div>
        </MainLayout>
    );
};

export default memo(Role);
