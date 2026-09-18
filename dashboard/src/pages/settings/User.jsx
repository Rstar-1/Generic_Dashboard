import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";

// Data and table column definitions from apiData.js
import {
    usersSidebarData,
    usersTableColumns,
    usersData as initialUsersData,
} from "../../utils/apiData";

// Navigation tabs for User management
const TABS = [
    { name: "All Users", value: "all" }
];

const SIDEBAR_TO_TAB = {
    "All Users": "all",
    "Administrator": "Administrator",
    "Vendor": "Vendor",
    "User": "User",
};

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ statusFilter, setStatusFilter }) => {
    const statusOptions = useMemo(
        () => [
            { label: "All Account Statuses", value: "all" },
            { label: "Active Only", value: "Active" },
            { label: "Inactive Only", value: "Inactive" },
        ],
        []
    );

    return (
        <div className="grid-cols-3 gap-12">
            <Fields
                type="select"
                label="Account Status Filter"
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
            />
        </div>
    );
});
FilterDrawerContent.displayName = "FilterDrawerContent";

const User = () => {
    const [users, setUsers] = useState(initialUsersData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Users");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Sidebar items with dynamic user count calculations
    const sidebarItems = useMemo(() => {
        return usersSidebarData.items.map((item) => {
            let count = users.length;
            if (item.role === "admin") {
                count = users.filter((u) => u.role === "Administrator").length;
            } else if (item.role === "vendor") {
                count = users.filter((u) => u.role === "Vendor").length;
            } else if (item.role === "user") {
                count = users.filter((u) => u.role === "User").length;
            }
            return { ...item, count, icon: "Users" };
        });
    }, [users]);

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
        else setSelectedCategory("All Users");
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

    const handleAddUser = useCallback(() => {
        showToast("Add System User modal triggered!", "success");
    }, []);

    const handleExportUsers = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(users, null, 2));
        showToast("System user directory exported to clipboard!", "success");
    }, [users]);

    // Filter and paginate data
    const filteredUsers = useMemo(() => {
        return users.filter((item) => {
            // Tab / Category filter
            const matchesTab =
                activeTab === "all" ||
                (activeTab === "Active" ? item.status === "Active" : item.role === activeTab);

            // Status filter
            const matchesStatus = statusFilter === "all" || item.status === statusFilter;

            // Search query filter
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                item.name.toLowerCase().includes(q) ||
                item.email.toLowerCase().includes(q) ||
                item.mobile.toLowerCase().includes(q) ||
                item.role.toLowerCase().includes(q);

            return matchesTab && matchesStatus && matchesSearch;
        });
    }, [users, activeTab, statusFilter, searchQuery]);

    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(start, start + itemsPerPage);
    }, [filteredUsers, currentPage, itemsPerPage]);

    const hasActiveFilters = useMemo(
        () => statusFilter !== "all" || searchQuery !== "",
        [statusFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => <FilterDrawerContent statusFilter={statusFilter} setStatusFilter={setStatusFilter} />,
        [statusFilter]
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
            quickAction=''
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
                    itemsPerPage={itemsPerPage}
                    page={currentPage}
                    onPageChange={handlePageChange}
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
