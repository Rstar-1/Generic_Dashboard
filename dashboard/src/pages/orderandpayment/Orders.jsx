import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import FilterForm from "../../components/forms/sections/FilterForm";
import Modal from "../../components/common/Modal";
import FormBuilder from "../../components/forms/FormBuilder";
import { showToast } from "../../components/common/Toast";
import {
    ordersSidebarData,
    ordersTableColumns,
    STATUS_OPTIONS,
    TABS,
} from "../../utils/apiData";
import { useCurrentUser } from "../../utils";
import {
    getLeadsApi,
    updateLeadApi,
    deleteLeadApi,
    bulkDeleteLeadsApi,
} from "../../api/leadApi";
import { normalizeLead } from "../../feature/leadSlice";

const ITEMS_PER_PAGE = 5;



const ORDER_STAGE_OPTIONS = [
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
];

const Orders = () => {
    const { user: currentUser } = useCurrentUser();
    const [orders, setOrders] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const [activeTab, setActiveTab] = React.useState("all");
    const [selectedCategory, setSelectedCategory] = React.useState("All Orders");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedOrderIds, setSelectedOrderIds] = React.useState([]);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingOrder, setEditingOrder] = React.useState(null);

    // Fetch orders with backend query parameters (severity: processing)
    const fetchOrdersData = React.useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: ITEMS_PER_PAGE,
                isDeleted: activeTab === "trash",
                severity: "processing",
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

            setOrders(items.map(normalizeLead));
            setTotal(totalCount);
        } catch (err) {
            showToast(err?.message || "Failed to load orders", "danger");
            setOrders([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, [currentPage, activeTab, searchQuery, statusFilter]);

    React.useEffect(() => {
        fetchOrdersData();
    }, [fetchOrdersData]);

    const [statusCounts, setStatusCounts] = React.useState({
        all: 0,
        active: 0,
        inactive: 0,
    });

    const fetchStatusCounts = React.useCallback(async () => {
        try {
            const [allRes, activeRes, inactiveRes] = await Promise.all([
                getLeadsApi({ isDeleted: false, severity: "processing", page: 1, limit: 1 }),
                getLeadsApi({ isDeleted: false, severity: "processing", isActive: true, page: 1, limit: 1 }),
                getLeadsApi({ isDeleted: false, severity: "processing", isActive: false, page: 1, limit: 1 }),
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
        setSelectedOrderIds([]);
    }, []);

    const handleStatusFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(next);
        setSelectedCategory(next === "Active" ? "Active" : next === "Inactive" ? "Inactive" : "All Orders");
        setCurrentPage(1);
        setSelectedOrderIds([]);
    }, []);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setSearchQuery("");
        setSelectedCategory("All Orders");
        setCurrentPage(1);
        setSelectedOrderIds([]);
        showToast("Order filters reset", "info");
    }, []);

    // Sidebar navigation
    const handleSidebarItemClick = React.useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        setSelectedOrderIds([]);
        const item = ordersSidebarData.items.find((i) => i.name === name);
        const nextStatus = item?.status || "all";
        setStatusFilter(nextStatus);
    }, []);

    const handleTabChange = React.useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        setSelectedOrderIds([]);
        if (tabValue === "trash") {
            setSelectedCategory("Trash");
            setStatusFilter("all");
        } else {
            setSelectedCategory("All Orders");
        }
    }, []);

    // Selection handlers for bulk operations
    const isAllSelected = React.useMemo(() => {
        if (!orders.length) return false;
        return orders.every((o) => {
            const id = o.id || o._id;
            return selectedOrderIds.includes(id) || (o._id && selectedOrderIds.includes(o._id));
        });
    }, [orders, selectedOrderIds]);

    const handleSelectAll = React.useCallback((checked) => {
        const next = typeof checked === "boolean" ? checked : !isAllSelected;
        if (next) {
            const allIds = orders.map((o) => o.id || o._id);
            setSelectedOrderIds(allIds);
        } else {
            setSelectedOrderIds([]);
        }
    }, [orders, isAllSelected]);

    const handleSelectRow = React.useCallback((id, row) => {
        const targetId = row?.id || id;
        setSelectedOrderIds((prev) => {
            const exists = prev.includes(targetId) || (row?._id && prev.includes(row._id));
            if (exists) {
                return prev.filter((x) => x !== targetId && x !== row?._id);
            }
            return [...prev, targetId];
        });
    }, []);

    // Actions
    const handleViewOrder = React.useCallback((row) => {
        showToast(
            `Order #${row.id || row._id}: ${row.name} (${row.mobile || "No phone"}) • Stage: ${row.severityLabel || row.severity}`,
            "info"
        );
    }, []);

    const handleEditOrder = React.useCallback((row) => {
        setEditingOrder(row);
        setIsModalOpen(true);
    }, []);

    const handleDeleteOrder = React.useCallback(async (row) => {
        const id = row.id || row._id;
        const name = row.name || "Order";
        const isPermanent = activeTab === "trash";
        try {
            await deleteLeadApi(id, isPermanent);
            if (isPermanent) {
                showToast(`Order "${name}" permanently removed!`, "success");
            } else {
                showToast(`Order "${name}" moved to trash!`, "success");
            }
            fetchOrdersData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to delete order", "danger");
        }
    }, [activeTab, fetchOrdersData, fetchStatusCounts]);

    const handleBulkDelete = React.useCallback(async () => {
        if (!selectedOrderIds.length) return;
        const isPermanent = activeTab === "trash";
        try {
            await bulkDeleteLeadsApi({ ids: selectedOrderIds, permanent: isPermanent });
            if (isPermanent) {
                showToast(`${selectedOrderIds.length} order(s) permanently removed!`, "success");
            } else {
                showToast(`${selectedOrderIds.length} order(s) moved to trash!`, "success");
            }
            setSelectedOrderIds([]);
            fetchOrdersData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to bulk delete orders", "danger");
        }
    }, [selectedOrderIds, activeTab, fetchOrdersData, fetchStatusCounts]);

    // Modal Form Fields - Only Pipeline Stage / Qualification for editing orders
    const formFields = React.useMemo(() => [
        {
            name: "severity",
            label: "Pipeline Stage / Qualification",
            type: "select",
            options: ORDER_STAGE_OPTIONS,
            defaultValue: editingOrder?.severity === "rejected" ? "rejected" : "approved",
            validation: { required: true },
        },
    ], [editingOrder]);

    const handleFormSubmit = React.useCallback(async (formData) => {
        if (!editingOrder) return;

        const targetId = editingOrder.id || editingOrder._id;
        const newSeverity = formData.severity ? formData.severity.toLowerCase().trim() : "approved";

        try {
            await updateLeadApi(targetId, {
                name: editingOrder.name,
                mobile: editingOrder.mobile,
                email: editingOrder.email || "",
                location: editingOrder.location || "",
                description: editingOrder.description || "",
                isActive: editingOrder.isActive !== undefined ? Boolean(editingOrder.isActive) : true,
                severity: newSeverity,
            });

            if (newSeverity === "approved") {
                showToast(`Order marked Approved and moved to Transactions!`, "success");
            } else if (newSeverity === "rejected") {
                showToast(`Order marked Rejected!`, "success");
            } else {
                showToast(`Order stage updated successfully!`, "success");
            }

            setIsModalOpen(false);
            setEditingOrder(null);
            fetchOrdersData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to update order stage", "danger");
        }
    }, [editingOrder, fetchOrdersData, fetchStatusCounts]);

    // Sidebar items with dynamic total counts
    const sidebarItems = React.useMemo(() => {
        const totalAll = activeTab === "trash" ? total : (statusCounts.all || total);
        const totalActive = statusCounts.active;
        const totalInactive = statusCounts.inactive;

        return ordersSidebarData.items.map((item) => {
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
                icon: "Box",
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
                        label: "Order Status",
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
            selectedOrderIds.length > 0 ? (
                <div className="flex-align gap-8">
                    <Button
                        text={`Delete (${selectedOrderIds.length})`}
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
        [selectedOrderIds, handleBulkDelete]
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
            tabs={TABS.orders || TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter orders by fulfillment status, active state, or keyword search"
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
                    title="Customer Orders Register"
                    subtitle={
                        activeTab === "trash"
                            ? "Archived customer orders in trash"
                            : "Live processing customer orders, fulfillment pipelines, and dispatch logs"
                    }
                    data={orders}
                    columns={ordersTableColumns}
                    totalItems={total}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={(p) => {
                        setCurrentPage(p);
                        setSelectedOrderIds([]);
                    }}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search by order ID, customer name, email, or mobile..."
                    itemName="orders"
                    collapsible={true}
                    maxVisibleColumns={8}
                    minWidth="1050px"
                    loading={loading}
                    selectedRows={selectedOrderIds}
                    onSelectRow={handleSelectRow}
                    onSelectAll={handleSelectAll}
                    onView={handleViewOrder}
                    onEdit={handleEditOrder}
                    onDelete={handleDeleteOrder}
                    viewTitle="View Order Details"
                    editTitle="Update Fulfillment & Stage"
                    deleteTitle={activeTab === "trash" ? "Permanently Delete Order" : "Cancel Order"}
                />
            </div>

            <Modal
                isOpen={isModalOpen && Boolean(editingOrder)}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingOrder(null);
                }}
                title={editingOrder ? `Update Order Stage: #${editingOrder.id || editingOrder._id}` : "Update Order Stage"}
                size="sm"
                type="sidebar"
                placement="right"
                footer={null}
            >
                <FormBuilder
                    key={editingOrder ? (editingOrder.id || editingOrder._id) : "edit-order"}
                    fields={formFields}
                    submitType="json"
                    onSubmit={handleFormSubmit}
                    submitText="Update Stage"
                    col="1"
                />
            </Modal>
        </MainLayout>
    );
};

export default React.memo(Orders);
