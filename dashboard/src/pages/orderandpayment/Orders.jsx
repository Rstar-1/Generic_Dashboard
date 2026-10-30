import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import {
    ordersSidebarData,
    ordersTableColumns,
    ordersData as initialOrdersData,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Orders", value: "all" }];

const STATUS_OPTIONS = [
    { label: "All Fulfillment Statuses", value: "all" },
    { label: "Pending", value: "Pending" },
    { label: "Processing", value: "Processing" },
    { label: "Shipped", value: "Shipped" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancelled", value: "Cancelled" },
];

const METHOD_OPTIONS = [
    { label: "All Payment Methods", value: "all" },
    { label: "UPI / NetBanking", value: "UPI / NetBanking" },
    { label: "Credit Card", value: "Credit Card" },
    { label: "Wire Transfer", value: "Wire Transfer" },
    { label: "Cash On Delivery", value: "Cash On Delivery" },
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ status, onStatusChange, method, onMethodChange }) => (
    <div className="grid-cols-4 gap-12">
        <Fields
            type="select"
            label="Order Status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={onStatusChange}
        />
        <Fields
            type="select"
            label="Payment Method"
            options={METHOD_OPTIONS}
            value={method}
            onChange={onMethodChange}
        />
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

const Orders = () => {
    const [orders, setOrders] = useState(initialOrdersData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Orders");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setOrders(initialOrdersData);
    }, []);

    const handleSearchChange = useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.target?.value ?? "");
        setSearchQuery(next);
        setCurrentPage(1);
    }, []);

    const handleStatusFilterChange = useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(next);
        setCurrentPage(1);
    }, []);

    const handleMethodFilterChange = useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setMethodFilter(next);
        setCurrentPage(1);
    }, []);

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = useMemo(() => {
        const counts = orders.reduce((acc, o) => {
            const s = o.status?.toLowerCase();
            if (s) acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});

        return ordersSidebarData.items.map((item) => ({
            ...item,
            icon: "Box",
            count: item.status === "all" ? orders.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [orders]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = ordersSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = ordersSidebarData.items.find((i) => i.status === tabValue);
        setSelectedCategory(item ? item.name : "All Orders");
    }, []);

    const handleClearFilters = useCallback(() => {
        setStatusFilter("all");
        setMethodFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Order filters reset", "info");
    }, []);

    // Action handlers for rows
    const handleViewOrder = useCallback((row) => {
        showToast(`Viewing order details for #${row.orderId} (${row.totalAmount})`, "info");
    }, []);

    const handleEditOrder = useCallback((row) => {
        showToast(`Adjusting fulfillment for order #${row.orderId}`, "info");
    }, []);

    const handleDeleteOrder = useCallback((row) => {
        setOrders((prev) => prev.filter((o) => o.id !== row.id));
        showToast(`Order #${row.orderId} cancelled & archived!`, "danger");
    }, []);

    const handleExportOrders = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(orders, null, 2));
        showToast("Orders register exported to clipboard!", "success");
    }, [orders]);

    // Multi-criteria filtering
    const filteredOrders = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetMethod = String(methodFilter || "all").toLowerCase().trim();

        return orders.filter((item) => {
            const itemStatus = String(item.status || "").toLowerCase().trim();
            const itemMethod = String(item.paymentMethod || "").toLowerCase().trim();

            const matchesTab = targetTab === "all" || itemStatus === targetTab;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesMethod = targetMethod === "all" || itemMethod === targetMethod;

            const matchesSearch =
                !q ||
                String(item.orderId || "").toLowerCase().includes(q) ||
                String(item.totalAmount || "").toLowerCase().includes(q) ||
                itemMethod.includes(q) ||
                itemStatus.includes(q) ||
                String(item.customer?.name || "").toLowerCase().includes(q) ||
                String(item.customer?.email || "").toLowerCase().includes(q);

            return matchesTab && matchesStatus && matchesMethod && matchesSearch;
        });
    }, [orders, activeTab, statusFilter, methodFilter, searchQuery]);

    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredOrders, currentPage]);

    const hasActiveFilters = useMemo(
        () => statusFilter !== "all" || methodFilter !== "all" || Boolean(searchQuery.trim()),
        [statusFilter, methodFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                status={statusFilter}
                onStatusChange={handleStatusFilterChange}
                method={methodFilter}
                onMethodChange={handleMethodFilterChange}
            />
        ),
        [statusFilter, handleStatusFilterChange, methodFilter, handleMethodFilterChange]
    );

    const quickActionNode = useMemo(
        () => (
            <Button
                text="Export Orders"
                version="v2"
                bg="primary"
                variant="outline"
                border="primary"
                color="white"
                icon="File"
                onClick={handleExportOrders}
                title="Download complete orders register"
            />
        ),
        [handleExportOrders]
    );

    return (
        <MainLayout
            sidebarTitle={ordersSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Box" width="18" height="18" />}
            headerTitle="Customer Orders"
            headerSub="Monitor checkout purchases, shipping fulfillment, courier dispatches, and delivery confirmations"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter orders by fulfillment status, payment method, or tracking ID"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <Table
                title="Customer Orders Register"
                subtitle="Complete order log with line item quantities, settlements, and shipping states"
                data={paginatedOrders}
                columns={ordersTableColumns}
                totalItems={filteredOrders.length}
                itemsPerPage={ITEMS_PER_PAGE}
                page={currentPage}
                onPageChange={setCurrentPage}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search by order ID, customer name, email, or amount..."
                itemName="orders"
                collapsible={true}
                maxVisibleColumns={5}
                minWidth="1050px"
                onView={handleViewOrder}
                onEdit={handleEditOrder}
                onDelete={handleDeleteOrder}
                viewTitle="View Invoice & Packaging Slip"
                editTitle="Update Fulfillment"
                deleteTitle="Cancel Order"
            />
        </MainLayout>
    );
};

export default memo(Orders);
