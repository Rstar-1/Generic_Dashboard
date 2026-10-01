import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import {
    usersSidebarData,
    usersTableColumns,
    usersData as initialUsersData,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Users", value: "all" }];

const STATUS_OPTIONS = [
    { label: "All Account Statuses", value: "all" },
    { label: "Active Only", value: "Active" },
    { label: "Inactive Only", value: "Inactive" },
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ status, onStatusChange }) => (
    <div className="grid-cols-4 gap-12">
        <Fields
            type="select"
            label="Account Status Filter"
            options={STATUS_OPTIONS}
            value={status}
            onChange={onStatusChange}
        />
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

const User = () => {
    const [users, setUsers] = useState(initialUsersData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Users");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Keep users state synced when mock data updates
    useEffect(() => {
        setUsers(initialUsersData);
    }, [initialUsersData]);

    const handleSearchChange = useCallback((val) => {
        const nextQuery = typeof val === "string" ? val : (val?.target?.value ?? "");
        setSearchQuery(nextQuery);
        setCurrentPage(1);
    }, []);

    const handleStatusFilterChange = useCallback((val) => {
        const nextStatus = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(nextStatus);
        setCurrentPage(1);
    }, []);

    // Sidebar items with dynamic role count in a single O(N) pass
    const sidebarItems = useMemo(() => {
        const counts = users.reduce((acc, u) => {
            const roleKey = u.role?.toLowerCase();
            if (roleKey) acc[roleKey] = (acc[roleKey] || 0) + 1;
            return acc;
        }, {});

        return usersSidebarData.items.map((item) => ({
            ...item,
            icon: "Users",
            count: item.role === "all" ? users.length : (counts[item.role?.toLowerCase()] || 0),
        }));
    }, [users]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = usersSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.role || "all");
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = usersSidebarData.items.find((i) => i.role === tabValue);
        setSelectedCategory(item ? item.name : "All Users");
    }, []);

    const handleClearFilters = useCallback(() => {
        setStatusFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("User filters reset", "info");
    }, []);

    // Action handlers for table rows
    const handleViewUser = useCallback((row) => {
        showToast(`Viewing operator profile: ${row.name} (${row.role})`, "info");
    }, []);

    const handleEditUser = useCallback((row) => {
        showToast(`Editing security credentials for ${row.name}`, "info");
    }, []);

    const handleDeleteUser = useCallback((row) => {
        setUsers((prev) => prev.filter((u) => u.id !== row.id));
        showToast(`User ${row.name} deactivated & removed!`, "danger");
    }, []);

    const handleExportUsers = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(users, null, 2));
        showToast("System user directory exported to clipboard!", "success");
    }, [users]);

    // Multi-criteria filtering with case-insensitive role & status matching
    const filteredUsers = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetRole = String(activeTab || "all").toLowerCase().trim();

        return users.filter((item) => {
            const rawStatus = item.status;
            const itemStatus = (typeof rawStatus === "boolean" ? (rawStatus ? "active" : "inactive") : String(rawStatus || "")).toLowerCase().trim();
            const itemRole = String(item.role || "").toLowerCase().trim();

            const matchesRole = targetRole === "all" || itemRole === targetRole;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesSearch =
                !q ||
                String(item.name || "").toLowerCase().includes(q) ||
                String(item.email || "").toLowerCase().includes(q) ||
                String(item.mobile || "").toLowerCase().includes(q) ||
                itemRole.includes(q);

            return matchesRole && matchesStatus && matchesSearch;
        });
    }, [users, activeTab, statusFilter, searchQuery]);

    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    const hasActiveFilters = statusFilter !== "all" || Boolean(searchQuery);

    const filterInputsNode = useMemo(
        () => <FilterDrawerContent status={statusFilter} onStatusChange={handleStatusFilterChange} />,
        [statusFilter, handleStatusFilterChange]
    );

    const quickActionNode = useMemo(
        () => (
            <div className="flex items-center gap-8">
                <Button
                    text="Export CSV"
                    version="v2"
                    bg="primary"
                    variant="outline"
                    border="primary"
                    color="white"
                    icon="File"
                    onClick={handleExportUsers}
                    title="Export system user directory to clipboard"
                />
            </div>
        ),
        [handleExportUsers]
    );

    return (
        <MainLayout
            sidebarTitle={usersSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Users" width="18" height="18" />}
            headerTitle="System Users"
            headerSub="Manage authorized platform operators, credential assignments, active sessions, and access roles"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter system users by role, active status, or keyword search"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <div className="bg-white p-14 rounded-10">
                <Table
                    title="User Directory"
                    subtitle="Authenticated platform operators, administrators, and vendor partners"
                    data={paginatedUsers}
                    columns={usersTableColumns}
                    totalItems={filteredUsers.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={setCurrentPage}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search users by name, email, role, or phone..."
                    itemName="users"
                    collapsible={true}
                    maxVisibleColumns={5}
                    minWidth="1050px"
                    onView={handleViewUser}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                    viewTitle="View User Profile"
                    editTitle="Edit Credentials"
                    deleteTitle="Deactivate User"
                />
            </div>
        </MainLayout>
    );
};

export default memo(User);
