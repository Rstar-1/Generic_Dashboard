import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";

// Data and table column definitions from apiData.js
import {
    transactionsSidebarData,
    transactionsTableColumns,
    transactionsData as initialTransactionsData,
} from "../../utils/apiData";

// Tabs for transaction management
const TABS = [
    { name: "All Transactions", value: "all" },
    { name: "Completed", value: "Active" },
    { name: "Pending", value: "Pending" },
    { name: "Failed / Refunded", value: "Inactive" },
];

const SIDEBAR_TO_TAB = {
    "All Transactions": "all",
    "Completed": "Active",
    "Pending": "Pending",
    "Failed": "Inactive",
    "Failed / Refunded": "Inactive",
};

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ methodFilter, setMethodFilter }) => {
    const methodOptions = useMemo(
        () => [
            { label: "All Payment Methods", value: "all" },
            { label: "Credit Card", value: "Credit Card" },
            { label: "Wire Transfer", value: "Wire Transfer" },
            { label: "UPI / NetBanking", value: "UPI / NetBanking" },
            { label: "Debit Card", value: "Debit Card" },
        ],
        []
    );

    return (
        <div className="grid-cols-3 gap-12">
            <Fields
                type="select"
                label="Payment Method Filter"
                options={methodOptions}
                value={methodFilter}
                onChange={setMethodFilter}
            />
        </div>
    );
});
FilterDrawerContent.displayName = "FilterDrawerContent";

const Transaction = () => {
    const [transactions, setTransactions] = useState(initialTransactionsData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Transactions");
    const [searchQuery, setSearchQuery] = useState("");
    const [methodFilter, setMethodFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Sidebar items with dynamic transaction count calculations
    const sidebarItems = useMemo(() => {
        return transactionsSidebarData.items.map((item) => {
            let count = transactions.length;
            if (item.status !== "all") {
                count = transactions.filter((t) => t.status === item.status).length;
            }
            return { ...item, count, icon: "CMS" };
        });
    }, [transactions]);

    // Handlers wrapped in useCallback
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
        else setSelectedCategory("All Transactions");
    }, []);

    const handleSearchChange = useCallback((value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, []);

    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, []);

    const handleClearFilters = useCallback(() => {
        setMethodFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Transaction filters cleared", "info");
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

    const handleReconcile = useCallback(() => {
        showToast("Ledger reconciliation completed: 100% matched!", "success");
    }, []);

    const handleExportStatement = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(transactions, null, 2));
        showToast("Financial statement exported to clipboard!", "success");
    }, [transactions]);

    // Filter and paginate data
    const filteredTransactions = useMemo(() => {
        return transactions.filter((item) => {
            // Tab / Category filter
            const matchesTab = activeTab === "all" || item.status === activeTab;

            // Method filter
            const matchesMethod = methodFilter === "all" || item.method === methodFilter;

            // Search query filter
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                item.transactionId.toLowerCase().includes(q) ||
                item.amount.toLowerCase().includes(q) ||
                (item.customer?.name && item.customer.name.toLowerCase().includes(q)) ||
                (item.customer?.email && item.customer.email.toLowerCase().includes(q));

            return matchesTab && matchesMethod && matchesSearch;
        });
    }, [transactions, activeTab, methodFilter, searchQuery]);

    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredTransactions.slice(start, start + itemsPerPage);
    }, [filteredTransactions, currentPage, itemsPerPage]);

    const hasActiveFilters = useMemo(
        () => methodFilter !== "all" || searchQuery !== "",
        [methodFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => <FilterDrawerContent methodFilter={methodFilter} setMethodFilter={setMethodFilter} />,
        [methodFilter]
    );

    const quickActionNode = useMemo(
        () => (
            <div className="flex items-center gap-8">
                <Button
                    text="Reconcile Ledger"
                    version="v2"
                    bg="white"
                    color="dark"
                    border="tertiary"
                    icon="Rotate"
                    onClick={handleReconcile}
                    title="Audit and match transaction ledgers"
                />
                <Button
                    text="Export Statement"
                    version="v2"
                    bg="primary"
                    color="white"
                    icon="FileText"
                    onClick={handleExportStatement}
                    title="Download financial ledger statement"
                />
            </div>
        ),
        [handleReconcile, handleExportStatement]
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
            <div>
                <Table
                    title="Payment Ledger & Invoices"
                    subtitle="Chronological transaction records with gateway status and payment method"
                    data={paginatedTransactions}
                    columns={transactionsTableColumns}
                    totalItems={filteredTransactions.length}
                    itemsPerPage={itemsPerPage}
                    page={currentPage}
                    onPageChange={handlePageChange}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search by transaction ID, customer name, or email..."
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
            </div>
        </MainLayout>
    );
};

export default memo(Transaction);
