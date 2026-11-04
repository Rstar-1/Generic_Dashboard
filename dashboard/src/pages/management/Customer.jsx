import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import FilterForm from "../../components/forms/sections/FilterForm";
import { showToast } from "../../components/common/Toast";
import {
    customersSidebarData,
    customersTableColumns,
    customersData as initialCustomersData,
} from "../../utils/apiData";
import { getFirstValue } from "../../utils";

const ITEMS_PER_PAGE = 5;
const TABS = [
    { name: "All Customers", value: "all" },
    { name: "Trash", value: "trash" },
];

const STATUS_OPTIONS = [
    { label: "All Statuses", value: "all" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
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

const Customer = () => {
    const [customers, setCustomers] = React.useState(initialCustomersData);
    const [activeTab, setActiveTab] = React.useState("all");
    const [selectedCategory, setSelectedCategory] = React.useState("All Type");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [typeFilter, setTypeFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);

    const handleSearchChange = React.useCallback((val) => {
        const nextQuery = typeof val === "string" ? val : (val?.target?.value ?? "");
        setSearchQuery(nextQuery);
        setCurrentPage(1);
    }, []);

    const handleStatusFilterChange = React.useCallback((val) => {
        const nextStatus = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(nextStatus);
        setCurrentPage(1);
    }, []);

    const handleTypeFilterChange = React.useCallback((val) => {
        const nextType = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setTypeFilter(nextType);
        setCurrentPage(1);
    }, []);

    const activeNonDeletedCustomers = React.useMemo(
        () => customers.filter((c) => !c.isDeleted),
        [customers]
    );

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = React.useMemo(() => {
        const counts = activeNonDeletedCustomers.reduce((acc, c) => {
            const typeKey = c.type?.toLowerCase();
            if (typeKey) acc[typeKey] = (acc[typeKey] || 0) + 1;
            return acc;
        }, {});

        return customersSidebarData.items.map((item) => ({
            ...item,
            icon: "Users",
            count: item.status === "all" ? activeNonDeletedCustomers.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [activeNonDeletedCustomers]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = React.useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = customersSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = React.useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        if (tabValue === "trash") {
            setSelectedCategory("Trash");
        } else {
            const item = customersSidebarData.items.find((i) => i.status === tabValue);
            setSelectedCategory(item ? item.name : "All Type");
        }
    }, []);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setTypeFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Customer filters reset", "info");
    }, []);

    // Action handlers for table rows
    const handleViewCustomer = React.useCallback((row) => {
        showToast(`Viewing customer profile: ${row.name} (${row.company})`, "info");
    }, []);

    const handleEditCustomer = React.useCallback((row) => {
        showToast(`Opening editor for ${row.name}`, "info");
    }, []);

    const handleDeleteCustomer = React.useCallback((row) => {
        if (activeTab === "trash") {
            setCustomers((prev) => prev.filter((c) => c.id !== row.id));
            showToast(`Customer ${row.name} permanently removed!`, "danger");
        } else {
            setCustomers((prev) => prev.map((c) => (c.id === row.id ? { ...c, isDeleted: true } : c)));
            showToast(`Customer ${row.name} moved to trash!`, "danger");
        }
    }, [activeTab]);

    const handleAddCustomer = React.useCallback(() => {
        showToast("Add Customer modal trigger activated!", "success");
    }, []);

    const handleExportData = React.useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(customers, null, 2));
        showToast("Customer database exported to clipboard!", "success");
    }, [customers]);

    // Multi-criteria filtering: role/tab, seller type, status, and search
    const filteredCustomers = React.useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetType = String(typeFilter || "all").toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();

        return customers.filter((item) => {
            const isItemDeleted = Boolean(item.isDeleted);
            if (activeTab === "trash") {
                if (!isItemDeleted) return false;
            } else {
                if (isItemDeleted) return false;
            }

            const rawStatus = item.status;
            const itemStatus = (typeof rawStatus === "boolean" ? (rawStatus ? "active" : "inactive") : String(rawStatus || "")).toLowerCase().trim();
            const itemType = String(item.type || "").toLowerCase().trim();

            const matchesTab = targetTab === "all" || targetTab === "trash" || itemType === targetTab;
            const matchesType = targetType === "all" || itemType === targetType;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesSearch =
                !q ||
                String(item.name || "").toLowerCase().includes(q) ||
                String(item.email || "").toLowerCase().includes(q) ||
                String(item.company || "").toLowerCase().includes(q) ||
                String(getFirstValue(item, ["mobile", "phone"])).toLowerCase().includes(q) ||
                itemType.includes(q);

            return matchesTab && matchesType && matchesStatus && matchesSearch;
        });
    }, [customers, activeTab, statusFilter, typeFilter, searchQuery]);

    const paginatedCustomers = React.useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCustomers.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredCustomers, currentPage]);

    const tableSubtitle = React.useMemo(() => {
        if (activeTab === "trash") {
            return "Archived customer accounts in trash";
        }
        return "Comprehensive list of verified enterprise, partner, and retail clients";
    }, [activeTab]);

    const hasActiveFilters = statusFilter !== "all" || typeFilter !== "all" || Boolean(searchQuery);

    const filterInputsNode = React.useMemo(
        () => (
            <FilterForm
                fields={[
                    {
                        type: "select",
                        label: "Account Status Filter",
                        options: STATUS_OPTIONS,
                        value: statusFilter,
                        onChange: handleStatusFilterChange,
                    },
                    {
                        type: "select",
                        label: "Seller Type Filter",
                        options: TYPE_OPTIONS,
                        value: typeFilter,
                        onChange: handleTypeFilterChange,
                    },
                ]}
            />
        ),
        [statusFilter, handleStatusFilterChange, typeFilter, handleTypeFilterChange]
    );

    const quickActionNode = React.useMemo(
        () => (
            <div className="flex items-center gap-8">
                <Button
                    text="Add Customers"
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
                    subtitle={tableSubtitle}
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

export default React.memo(Customer);
