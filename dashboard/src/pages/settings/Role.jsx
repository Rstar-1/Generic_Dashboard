import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import { rolesTableColumns, rolesData as initialRolesData } from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;

const TABS = [
    { name: "All Roles", value: "all" },
];

const ROLE_OPTIONS = [
    { label: "All Roles", value: "all" },
    { label: "Customer", value: "customer" },
    { label: "Admin", value: "admin" },
    { label: "Accountant", value: "accountant" },
    { label: "Manager", value: "manager" },
    { label: "Product", value: "product" },
];

const STATUS_OPTIONS = [
    { label: "All Statuses", value: "all" },
    { label: "Active Only", value: "Active" },
    { label: "Inactive Only", value: "Inactive" },
];

const PERMISSION_OPTIONS = [
    { label: "All Permissions", value: "all" },
    { label: "User Management (manage_users)", value: "manage_users" },
    { label: "Role Management (manage_roles)", value: "manage_roles" },
    { label: "Product Management (manage_products)", value: "manage_products" },
    { label: "Analytics Access (view_analytics)", value: "view_analytics" },
    { label: "Reports & Audit (view_reports)", value: "view_reports" },
    { label: "Full System Access (full_access)", value: "full_access" },
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({
    role,
    onRoleChange,
    status,
    onStatusChange,
    permission,
    onPermissionChange
}) => (
    <div className="grid-cols-4 gap-12">
        <Fields
            type="select"
            label="Role Filter"
            options={ROLE_OPTIONS}
            value={role}
            onChange={onRoleChange}
        />
        <Fields
            type="select"
            label="Role Status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={onStatusChange}
        />
        <Fields
            type="select"
            label="Required Permission Capability"
            options={PERMISSION_OPTIONS}
            value={permission}
            onChange={onPermissionChange}
        />
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

const Role = () => {
    const [roles, setRoles] = useState(initialRolesData);
    const [activeTab, setActiveTab] = useState("all");
    const [roleFilter, setRoleFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [permissionFilter, setPermissionFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Keep roles state synchronized when mock data updates
    useEffect(() => {
        setRoles(initialRolesData);
    }, [initialRolesData]);

    const handleTabChange = useCallback((val) => {
        const nextTab = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setActiveTab(nextTab);
        setRoleFilter(nextTab);
        setCurrentPage(1);
    }, []);

    const handleRoleChange = useCallback((val) => {
        const nextRole = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setRoleFilter(nextRole);
        setActiveTab(nextRole);
        setCurrentPage(1);
    }, []);

    const handleStatusChange = useCallback((val) => {
        const nextStatus = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(nextStatus);
        setCurrentPage(1);
    }, []);

    const handlePermissionChange = useCallback((val) => {
        const nextPerm = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setPermissionFilter(nextPerm);
        setCurrentPage(1);
    }, []);

    const handleSearchChange = useCallback((val) => {
        const nextQuery = typeof val === "string" ? val : (val?.target?.value ?? "");
        setSearchQuery(nextQuery);
        setCurrentPage(1);
    }, []);

    const handleClearFilters = useCallback(() => {
        setActiveTab("all");
        setRoleFilter("all");
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

    // Multi-criteria filtering with case-insensitive role, tab, status, and permissions
    const filteredRoles = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetRole = String(roleFilter || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetPermission = String(permissionFilter || "all").trim();

        return roles.filter((item) => {
            const itemRole = String(item.role || item.name || "").toLowerCase().trim();
            const rawStatus = item.status;
            const itemStatus = (typeof rawStatus === "boolean" ? (rawStatus ? "active" : "inactive") : String(rawStatus || "")).toLowerCase().trim();

            const matchesTab = targetTab === "all" || itemRole === targetTab;
            const matchesRole = targetRole === "all" || itemRole === targetRole;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesPermission =
                targetPermission === "all" ||
                (Array.isArray(item.permissions) && item.permissions.includes(targetPermission));

            const matchesSearch =
                !q ||
                String(item.name || "").toLowerCase().includes(q) ||
                String(item.description || "").toLowerCase().includes(q) ||
                itemRole.includes(q) ||
                item.permissions?.some((p) => String(p || "").toLowerCase().includes(q)) ||
                item.pages?.some((p) => String(p || "").toLowerCase().includes(q));

            return matchesTab && matchesRole && matchesStatus && matchesPermission && matchesSearch;
        });
    }, [roles, activeTab, roleFilter, statusFilter, permissionFilter, searchQuery]);

    const paginatedRoles = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredRoles.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredRoles, currentPage]);

    const hasActiveFilters = activeTab !== "all" || roleFilter !== "all" || statusFilter !== "all" || permissionFilter !== "all" || Boolean(searchQuery);

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                role={roleFilter}
                onRoleChange={handleRoleChange}
                status={statusFilter}
                onStatusChange={handleStatusChange}
                permission={permissionFilter}
                onPermissionChange={handlePermissionChange}
            />
        ),
        [roleFilter, handleRoleChange, statusFilter, permissionFilter, handleStatusChange, handlePermissionChange]
    );

    return (
        <MainLayout
            showSidebar={false}
            headerIcon={<Icon name="Shield" width="18" height="18" />}
            headerTitle="Role Permissions & RBAC"
            headerSub="Define security profiles, granular permissions, privilege hierarchies, and user assignments"
            quickAction=""
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter role profiles by customer role, permission privilege, status, or keyword search"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <div className="bg-white p-14 rounded-10">
                <Table
                    title="Access Roles & Policies"
                    subtitle="Role-based access control matrix with permission grants and assigned operators"
                    data={paginatedRoles}
                    columns={rolesTableColumns}
                    totalItems={filteredRoles.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={setCurrentPage}
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
