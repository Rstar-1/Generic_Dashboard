import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import {
    transactionsSidebarData,
    transactionsTableColumns,
    transactionsData as initialTransactionsData,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Transactions", value: "all" }];

const STATUS_OPTIONS = [
    { label: "All Statuses", value: "all" },
    { label: "Completed", value: "Completed" },
    { label: "Pending", value: "Pending" },
    { label: "Failed", value: "Failed" },
];

const METHOD_OPTIONS = [
    { label: "All Payment Methods", value: "all" },
    { label: "Cash On Delivery", value: "Cash On Delivery" },
    { label: "Credit Card", value: "Credit Card" },
    { label: "Wire Transfer", value: "Wire Transfer" },
    { label: "UPI / NetBanking", value: "UPI / NetBanking" },
    { label: "Debit Card", value: "Debit Card" },
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ status, onStatusChange, method, onMethodChange }) => (
    <div className="grid-cols-4 gap-12">
        <Fields
            type="select"
            label="Transaction Status"
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

const Transaction = () => {
    const [transactions, setTransactions] = useState(initialTransactionsData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Transactions");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Synchronize state when mock dataset updates
    useEffect(() => {
        setTransactions(initialTransactionsData);
    }, [initialTransactionsData]);

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
        const counts = transactions.reduce((acc, t) => {
            const s = t.status?.toLowerCase();
            if (s) acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});

        return transactionsSidebarData.items.map((item) => ({
            ...item,
            icon: "CMS",
            count: item.status === "all" ? transactions.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [transactions]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = transactionsSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = transactionsSidebarData.items.find((i) => i.status === tabValue);
        setSelectedCategory(item ? item.name : "All Transactions");
    }, []);

    const handleClearFilters = useCallback(() => {
        setStatusFilter("all");
        setMethodFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Transaction filters reset", "info");
    }, []);

    // Action handlers for rows
    const handleViewTransaction = useCallback((row) => {
        showToast(`Viewing receipt for ${row.transactionId} (${row.amount})`, "info");
    }, []);

    const handleEditTransaction = useCallback((row) => {
        showToast(`Adjusting transaction entry ${row.transactionId}`, "info");
    }, []);

    const handleDeleteTransaction = useCallback((row) => {
        setTransactions((prev) => prev.filter((t) => t.id !== row.id));
        showToast(`Transaction ${row.transactionId} cancelled & archived!`, "danger");
    }, []);

    const handleExportStatement = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(transactions, null, 2));
        showToast("Financial statement exported to clipboard!", "success");
    }, [transactions]);

    // Multi-criteria filtering: sidebar status, drawer status, payment method & search
    const filteredTransactions = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetMethod = String(methodFilter || "all").toLowerCase().trim();

        return transactions.filter((item) => {
            const itemStatus = String(item.status || "").toLowerCase().trim();
            const itemMethod = String(item.method || "").toLowerCase().trim();

            const matchesTab = targetTab === "all" || itemStatus === targetTab;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesMethod = targetMethod === "all" || itemMethod === targetMethod;

            const matchesSearch =
                !q ||
                String(item.transactionId || "").toLowerCase().includes(q) ||
                String(item.amount || "").toLowerCase().includes(q) ||
                itemMethod.includes(q) ||
                itemStatus.includes(q) ||
                String(item.customer?.name || "").toLowerCase().includes(q) ||
                String(item.customer?.email || "").toLowerCase().includes(q) ||
                String(item.customer?.mobile || "").toLowerCase().includes(q);

            return matchesTab && matchesStatus && matchesMethod && matchesSearch;
        });
    }, [transactions, activeTab, statusFilter, methodFilter, searchQuery]);

    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredTransactions.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredTransactions, currentPage]);

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
                text="Export Statement"
                version="v2"
                bg="primary"
                variant="outline"
                border="primary"
                color="white"
                icon="File"
                onClick={handleExportStatement}
                title="Download financial ledger statement"
            />
        ),
        [handleExportStatement]
    );

    return (
        <MainLayout
            sidebarTitle={transactionsSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="CMS" width="18" height="18" />}
            headerTitle="Transactions & Settlements"
            headerSub="Audit payment gateways, multi-channel checkout orders, refunds, and financial ledger events"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter transaction logs by payment method, settlement status, or client ID"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <Table
                title="Payment Ledger & Invoices"
                subtitle="Chronological transaction records with gateway status and payment method"
                data={paginatedTransactions}
                columns={transactionsTableColumns}
                totalItems={filteredTransactions.length}
                itemsPerPage={ITEMS_PER_PAGE}
                page={currentPage}
                onPageChange={setCurrentPage}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search by transaction ID, customer name, or phone..."
                itemName="transactions"
                collapsible={true}
                maxVisibleColumns={5}
                minWidth="1050px"
                onView={handleViewTransaction}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
                viewTitle="View Invoice Receipt"
                editTitle="Adjust Entry"
                deleteTitle="Cancel Transaction"
            />
        </MainLayout>
    );
};

export default memo(Transaction);
