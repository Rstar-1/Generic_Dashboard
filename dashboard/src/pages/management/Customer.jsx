import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import {
    customersSidebarData,
    customersTableColumns,
    customersData as initialCustomersData,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Customers", value: "all" }];

const STATUS_OPTIONS = [
    { label: "All Account Statuses", value: "all" },
    { label: "Active Only", value: "Active" },
    { label: "Inactive Only", value: "Inactive" },
];

const TYPE_OPTIONS = [
    { label: "All Seller Types", value: "all" },
    ...customersSidebarData.items
        .filter((item) => item.status !== "all")
        .map((item) => ({
            label: item.status,
            value: item.status,
        })),
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ status, onStatusChange, type, onTypeChange }) => (
    <div className="grid-cols-4 gap-12">
        <Fields
            type="select"
            label="Account Status Filter"
            options={STATUS_OPTIONS}
            value={status}
            onChange={onStatusChange}
        />
        <Fields
            type="select"
            label="Seller Type Filter"
            options={TYPE_OPTIONS}
            value={type}
            onChange={onTypeChange}
        />
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

const Customer = () => {
    const [customers, setCustomers] = useState(initialCustomersData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Type");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Keep customers state synchronized when initial data updates
    useEffect(() => {
        setCustomers(initialCustomersData);
    }, [initialCustomersData]);

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

    const handleTypeFilterChange = useCallback((val) => {
        const nextType = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setTypeFilter(nextType);
        setCurrentPage(1);
    }, []);

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = useMemo(() => {
        const counts = customers.reduce((acc, c) => {
            const typeKey = c.type?.toLowerCase();
            if (typeKey) acc[typeKey] = (acc[typeKey] || 0) + 1;
            return acc;
        }, {});

        return customersSidebarData.items.map((item) => ({
            ...item,
            icon: "Users",
            count: item.status === "all" ? customers.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [customers]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = customersSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = customersSidebarData.items.find((i) => i.status === tabValue);
        setSelectedCategory(item ? item.name : "All Type");
    }, []);

    const handleClearFilters = useCallback(() => {
        setStatusFilter("all");
        setTypeFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Customer filters reset", "info");
    }, []);

    // Action handlers for table rows
    const handleViewCustomer = useCallback((row) => {
        showToast(`Viewing customer profile: ${row.name} (${row.company})`, "info");
    }, []);

    const handleEditCustomer = useCallback((row) => {
        showToast(`Opening editor for ${row.name}`, "info");
    }, []);

    const handleDeleteCustomer = useCallback((row) => {
        setCustomers((prev) => prev.filter((c) => c.id !== row.id));
        showToast(`Customer ${row.name} removed successfully!`, "danger");
    }, []);

    const handleAddCustomer = useCallback(() => {
        showToast("Add Customer modal trigger activated!", "success");
    }, []);

    const handleExportData = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(customers, null, 2));
        showToast("Customer database exported to clipboard!", "success");
    }, [customers]);

    // Multi-criteria filtering: role/tab, seller type, status, and search
    const filteredCustomers = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetType = String(typeFilter || "all").toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();

        return customers.filter((item) => {
            const rawStatus = item.status;
            const itemStatus = (typeof rawStatus === "boolean" ? (rawStatus ? "active" : "inactive") : String(rawStatus || "")).toLowerCase().trim();
            const itemType = String(item.type || "").toLowerCase().trim();

            const matchesTab = targetTab === "all" || itemType === targetTab;
            const matchesType = targetType === "all" || itemType === targetType;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesSearch =
                !q ||
                String(item.name || "").toLowerCase().includes(q) ||
                String(item.email || "").toLowerCase().includes(q) ||
                String(item.company || "").toLowerCase().includes(q) ||
                String(item.mobile || item.phone || "").toLowerCase().includes(q) ||
                itemType.includes(q);

            return matchesTab && matchesType && matchesStatus && matchesSearch;
        });
    }, [customers, activeTab, statusFilter, typeFilter, searchQuery]);

    const paginatedCustomers = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCustomers.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredCustomers, currentPage]);

    const hasActiveFilters = statusFilter !== "all" || typeFilter !== "all" || Boolean(searchQuery);

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                status={statusFilter}
                onStatusChange={handleStatusFilterChange}
                type={typeFilter}
                onTypeChange={handleTypeFilterChange}
            />
        ),
        [statusFilter, handleStatusFilterChange, typeFilter, handleTypeFilterChange]
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
                    onClick={handleExportData}
                    title="Export customer list as JSON/CSV"
                />
            </div>
        ),
        [handleExportData]
    );

    return (
        <MainLayout
            sidebarTitle={customersSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Box" width="18" height="18" />}
            headerTitle="Customer Management"
            headerSub="Monitor registered clients, seller types, total order volumes, and lifetime spending"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter customer records by status, seller type, or keyword search"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <div className="bg-white p-14 rounded-10">
                <Table
                    title="Customer Directory"
                    subtitle="Comprehensive list of verified enterprise, partner, and retail clients"
                    data={paginatedCustomers}
                    columns={customersTableColumns}
                    totalItems={filteredCustomers.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={setCurrentPage}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search by customer name, email, company, or phone..."
                    itemName="customers"
                    collapsible={true}
                    maxVisibleColumns={7}
                    minWidth="1050px"
                    onView={handleViewCustomer}
                    onEdit={handleEditCustomer}
                    onDelete={handleDeleteCustomer}
                    viewTitle="View Customer Profile"
                    editTitle="Edit Customer"
                    deleteTitle="Delete Customer"
                />
            </div>
        </MainLayout>
    );
};

export default memo(Customer);
