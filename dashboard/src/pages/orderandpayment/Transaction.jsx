import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import FilterForm from "../../components/forms/sections/FilterForm";
import { showToast } from "../../components/common/Toast";
import {
    transactionsSidebarData,
    transactionsTableColumns,
    STATUS_OPTIONS,
    TABS,
} from "../../utils/apiData";
import {
    getLeadsApi,
    deleteLeadApi,
    bulkDeleteLeadsApi,
} from "../../api/leadApi";
import { normalizeLead } from "../../feature/leadSlice";

const ITEMS_PER_PAGE = 5;



const Transaction = () => {
    const [transactions, setTransactions] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const [activeTab, setActiveTab] = React.useState("all");
    const [selectedCategory, setSelectedCategory] = React.useState("All Transactions");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedTransactionIds, setSelectedTransactionIds] = React.useState([]);

    // Fetch transactions with backend query parameters (severity: approved)
    const fetchTransactionData = React.useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: ITEMS_PER_PAGE,
                isDeleted: activeTab === "trash",
                severity: "approved",
            };

            const trimmed = searchQuery.trim();
            if (trimmed) params.search = trimmed;

            if (statusFilter !== "all") {
                params.isActive = statusFilter === "Active";
            }

            const res = await getLeadsApi(params);
            const payload = res?.data !== undefined ? res.data : res;
            const items = Array.isArray(payload?.leads)
                ? payload.leads
                : Array.isArray(payload?.data)
                ? payload.data
                : Array.isArray(payload?.data?.leads)
                ? payload.data.leads
                : Array.isArray(payload)
                ? payload
                : [];
            const totalCount = Number(
                payload?.pagination?.total ??
                payload?.total ??
                payload?.data?.pagination?.total ??
                payload?.data?.total ??
                items.length
            ) || 0;

            setTransactions(items.map(normalizeLead));
            setTotal(totalCount);
        } catch (err) {
            showToast(err?.message || "Failed to load transactions", "danger");
            setTransactions([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, [currentPage, activeTab, searchQuery, statusFilter]);

    React.useEffect(() => {
        fetchTransactionData();
    }, [fetchTransactionData]);

    const [statusCounts, setStatusCounts] = React.useState({
        all: 0,
        active: 0,
        inactive: 0,
    });

    const fetchStatusCounts = React.useCallback(async () => {
        try {
            const [allRes, activeRes, inactiveRes] = await Promise.all([
                getLeadsApi({ isDeleted: false, severity: "approved", page: 1, limit: 1 }),
                getLeadsApi({ isDeleted: false, severity: "approved", isActive: true, page: 1, limit: 1 }),
                getLeadsApi({ isDeleted: false, severity: "approved", isActive: false, page: 1, limit: 1 }),
            ]);

            const parseCount = (res) => {
                const p = res?.data !== undefined ? res.data : res;
                return Number(
                    p?.pagination?.total ??
                    p?.total ??
                    p?.data?.pagination?.total ??
                    p?.data?.total ??
                    (Array.isArray(p?.leads) ? p.leads.length : Array.isArray(p) ? p.length : 0)
                ) || 0;
            };

            const allCount = parseCount(allRes);
            const activeCount = parseCount(activeRes);
            const inactiveCount = parseCount(inactiveRes);

            setStatusCounts({
                all: allCount || (activeCount + inactiveCount),
                active: activeCount,
                inactive: inactiveCount,
            });
        } catch {
            // Fallback gracefully
        }
    }, []);

    React.useEffect(() => {
        fetchStatusCounts();
    }, [fetchStatusCounts]);

    const handleSearchChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.target?.value ?? "");
        setSearchQuery(next);
        setCurrentPage(1);
        setSelectedTransactionIds([]);
    }, []);

    const handleStatusFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(next);
        setSelectedCategory(next === "Active" ? "Active" : next === "Inactive" ? "Inactive" : "All Transactions");
        setCurrentPage(1);
        setSelectedTransactionIds([]);
    }, []);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setSearchQuery("");
        setSelectedCategory("All Transactions");
        setCurrentPage(1);
        setSelectedTransactionIds([]);
        showToast("Transaction filters reset", "info");
    }, []);

    // Sidebar navigation
    const handleSidebarItemClick = React.useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        setSelectedTransactionIds([]);
        const item = transactionsSidebarData.items.find((i) => i.name === name);
        const nextStatus = item?.status || "all";
        setStatusFilter(nextStatus);
    }, []);

    const handleTabChange = React.useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        setSelectedTransactionIds([]);
        if (tabValue === "trash") {
            setSelectedCategory("Trash");
            setStatusFilter("all");
        } else {
            setSelectedCategory("All Transactions");
        }
    }, []);

    // Selection handlers for bulk operations
    const isAllSelected = React.useMemo(() => {
        if (!transactions.length) return false;
        return transactions.every((t) => {
            const id = t.id || t._id;
            return selectedTransactionIds.includes(id) || (t._id && selectedTransactionIds.includes(t._id));
        });
    }, [transactions, selectedTransactionIds]);

    const handleSelectAll = React.useCallback((checked) => {
        const next = typeof checked === "boolean" ? checked : !isAllSelected;
        if (next) {
            const allIds = transactions.map((t) => t.id || t._id);
            setSelectedTransactionIds(allIds);
        } else {
            setSelectedTransactionIds([]);
        }
    }, [transactions, isAllSelected]);

    const handleSelectRow = React.useCallback((id, row) => {
        const targetId = row?.id || id;
        setSelectedTransactionIds((prev) => {
            const exists = prev.includes(targetId) || (row?._id && prev.includes(row._id));
            if (exists) {
                return prev.filter((x) => x !== targetId && x !== row?._id);
            }
            return [...prev, targetId];
        });
    }, []);

    // Actions
    const handleViewTransaction = React.useCallback((row) => {
        showToast(
            `Transaction #${row.id || row._id}: ${row.name} (${row.mobile || "No phone"}) • Stage: ${row.severityLabel || row.severity}`,
            "info"
        );
    }, []);

    const handleDeleteTransaction = React.useCallback(async (row) => {
        const id = row.id || row._id;
        const name = row.name || "Transaction";
        const isPermanent = activeTab === "trash";
        try {
            await deleteLeadApi(id, isPermanent);
            if (isPermanent) {
                showToast(`Transaction "${name}" permanently removed!`, "success");
            } else {
                showToast(`Transaction "${name}" moved to trash!`, "success");
            }
            fetchTransactionData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to delete transaction", "danger");
        }
    }, [activeTab, fetchTransactionData, fetchStatusCounts]);

    const handleBulkDelete = React.useCallback(async () => {
        if (!selectedTransactionIds.length) return;
        const isPermanent = activeTab === "trash";
        try {
            await bulkDeleteLeadsApi({ ids: selectedTransactionIds, permanent: isPermanent });
            if (isPermanent) {
                showToast(`${selectedTransactionIds.length} transaction(s) permanently removed!`, "success");
            } else {
                showToast(`${selectedTransactionIds.length} transaction(s) moved to trash!`, "success");
            }
            setSelectedTransactionIds([]);
            fetchTransactionData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to bulk delete transactions", "danger");
        }
    }, [selectedTransactionIds, activeTab, fetchTransactionData, fetchStatusCounts]);

    // Sidebar items with dynamic total counts
    const sidebarItems = React.useMemo(() => {
        const totalAll = activeTab === "trash" ? total : (statusCounts.all || total);
        const totalActive = statusCounts.active;
        const totalInactive = statusCounts.inactive;

        return transactionsSidebarData.items.map((item) => {
            let countVal = 0;
            if (item.status === "all") {
                countVal = totalAll;
            } else if (item.status === "Active") {
                countVal = totalActive;
            } else if (item.status === "Inactive") {
                countVal = totalInactive;
            }

            return {
                ...item,
                icon: "CMS",
                count: countVal,
            };
        });
    }, [statusCounts, total, activeTab]);

    const filterInputsNode = React.useMemo(
        () => (
            <FilterForm
                fields={[
                    {
                        type: "select",
                        label: "Transaction Status",
                        options: STATUS_OPTIONS,
                        value: statusFilter,
                        onChange: handleStatusFilterChange,
                    },
                ]}
            />
        ),
        [statusFilter, handleStatusFilterChange]
    );

    const quickActionNode = React.useMemo(
        () => (
            selectedTransactionIds.length > 0 ? (
                <div className="flex-align gap-8">
                    <Button
                        text={`Delete (${selectedTransactionIds.length})`}
                        version="v2"
                        bg="danger"
                        variant="outline"
                        border="danger"
                        color="white"
                        icon="Trash"
                        onClick={handleBulkDelete}
                    />
                </div>
            ) : null
        ),
        [selectedTransactionIds, handleBulkDelete]
    );

    return (
        <MainLayout
            sidebarTitle={transactionsSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="CMS" width="18" height="18" />}
            headerTitle="Customer Transactions"
            headerSub="Monitor approved settlement accounts, invoice clearing, ledger reconciliation, and payment status"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS.transactions || TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter transactions by settlement status, active state, or keyword search"
            filterInputs={filterInputsNode}
            hasActiveFilters={
                statusFilter !== "all" ||
                Boolean(searchQuery.trim()) ||
                activeTab !== "all"
            }
            onClearAllFilters={handleClearFilters}
        >
            <div className="bg-white p-14 rounded-10">
                <Table
                    title="Transactions Register"
                    subtitle={
                        activeTab === "trash"
                            ? "Archived transactions in trash"
                            : "Approved sales settlements, ledger credit receipts, and client payment records"
                    }
                    data={transactions}
                    columns={transactionsTableColumns}
                    totalItems={total}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={(p) => {
                        setCurrentPage(p);
                        setSelectedTransactionIds([]);
                    }}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search by transaction ID, customer name, email, or mobile..."
                    itemName="transactions"
                    collapsible={true}
                    maxVisibleColumns={8}
                    minWidth="1050px"
                    loading={loading}
                    selectedRows={selectedTransactionIds}
                    onSelectRow={handleSelectRow}
                    onSelectAll={handleSelectAll}
                    onView={handleViewTransaction}
                    onDelete={handleDeleteTransaction}
                    viewTitle="View Transaction Statement"
                    deleteTitle={activeTab === "trash" ? "Permanently Delete Transaction" : "Delete Transaction"}
                />
            </div>
        </MainLayout>
    );
};

export default React.memo(Transaction);
