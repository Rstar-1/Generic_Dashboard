import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";

// Data and table column definitions from apiData.js
import {
    customersSidebarData,
    customersTableColumns,
    customersData as initialCustomersData,
} from "../../utils/apiData";

// Tabs for customer management
const TABS = [
    { name: "All Customers", value: "all" },
    { name: "Active", value: "Active" },
    { name: "Premium Tier", value: "Premium" },
    { name: "Pending", value: "Pending" },
    { name: "Inactive", value: "Inactive" },
];

const SIDEBAR_TO_TAB = {
    "All Customers": "all",
    "Active": "Active",
    "Premium": "Premium",
    "Pending": "Pending",
    "Inactive": "Inactive",
};

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ tierFilter, setTierFilter }) => {
    const tierOptions = useMemo(
        () => [
            { label: "All Account Tiers", value: "all" },
            { label: "Premium Tier", value: "Premium" },
            { label: "Standard Member", value: "Member" },
            { label: "General User", value: "User" },
            { label: "Administrator", value: "Admin" },
        ],
        []
    );

    return (
        <div className="grid-cols-3 gap-12">
            <Fields
                type="select"
                label="Account Tier Filter"
                options={tierOptions}
                value={tierFilter}
                onChange={setTierFilter}
            />
        </div>
    );
});
FilterDrawerContent.displayName = "FilterDrawerContent";

const Customer = () => {
    const [customers, setCustomers] = useState(initialCustomersData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Customers");
    const [searchQuery, setSearchQuery] = useState("");
    const [tierFilter, setTierFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = useMemo(() => {
        return customersSidebarData.items.map((item) => {
            let count = customers.length;
            if (item.status === "Active") {
                count = customers.filter((c) => c.status === "Active").length;
            } else if (item.status === "Premium") {
                count = customers.filter((c) => c.tier === "Premium").length;
            } else if (item.status === "Pending") {
                count = customers.filter((c) => c.status === "Pending").length;
            } else if (item.status === "Inactive") {
                count = customers.filter((c) => c.status === "Inactive").length;
            }
            return { ...item, count, icon: "Users" };
        });
    }, [customers]);

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
        else setSelectedCategory("All Customers");
    }, []);

    const handleSearchChange = useCallback((value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, []);

    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, []);

    const handleClearFilters = useCallback(() => {
        setTierFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Customer filters cleared", "info");
    }, []);

    // Action handlers for rows
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

    // Filter and paginate data
    const filteredCustomers = useMemo(() => {
        return customers.filter((item) => {
            // Tab / Category filter
            const matchesTab =
                activeTab === "all" ||
                (activeTab === "Premium" ? item.tier === "Premium" : item.status === activeTab);

            // Tier filter
            const matchesTier = tierFilter === "all" || item.tier === tierFilter;

            // Search query filter
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                item.name.toLowerCase().includes(q) ||
                item.email.toLowerCase().includes(q) ||
                item.company.toLowerCase().includes(q) ||
                item.phone.toLowerCase().includes(q);

            return matchesTab && matchesTier && matchesSearch;
        });
    }, [customers, activeTab, tierFilter, searchQuery]);

    const paginatedCustomers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredCustomers.slice(start, start + itemsPerPage);
    }, [filteredCustomers, currentPage, itemsPerPage]);

    const hasActiveFilters = useMemo(
        () => tierFilter !== "all" || searchQuery !== "",
        [tierFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => <FilterDrawerContent tierFilter={tierFilter} setTierFilter={setTierFilter} />,
        [tierFilter]
    );

    const quickActionNode = useMemo(
        () => (
            <div className="flex items-center gap-8">
                <Button
                    text="Export CSV"
                    version="v2"
                    bg="white"
                    color="dark"
                    border="tertiary"
                    icon="FileText"
                    onClick={handleExportData}
                    title="Export customer list as JSON/CSV"
                />
                <Button
                    text="Add Customer"
                    version="v2"
                    bg="primary"
                    color="white"
                    icon="Users"
                    onClick={handleAddCustomer}
                    title="Register a new client"
                />
            </div>
        ),
        [handleExportData, handleAddCustomer]
    );

    return (
        <MainLayout
            sidebarTitle={customersSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Box" width="18" height="18" />}
            headerTitle="Customer Management"
            headerSub="Monitor registered clients, account tiers, total order volumes, and lifetime spending"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter customer records by tier, spending thresholds, or registration window"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <div>
                <Table
                    title="Customer Directory"
                    subtitle="Comprehensive list of verified enterprise, partner, and retail clients"
                    data={paginatedCustomers}
                    columns={customersTableColumns}
                    totalItems={filteredCustomers.length}
                    itemsPerPage={itemsPerPage}
                    page={currentPage}
                    onPageChange={handlePageChange}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search by customer name, email, company, or phone..."
                    itemName="customers"
                    collapsible={true}
                    maxVisibleColumns={5}
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
