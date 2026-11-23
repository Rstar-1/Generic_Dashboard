import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import FilterForm from "../../components/forms/sections/FilterForm";
import Modal from "../../components/common/Modal";
import FormBuilder from "../../components/forms/FormBuilder";
import { getLeadFormFields, sanitizeCrudFormData } from "../../components/forms/sections/CrudForm";
import { showToast } from "../../components/common/Toast";
import {
    leadsSidebarData,
    leadsTableColumns,
    STATUS_OPTIONS,
    TABS,
} from "../../utils/apiData";
import { useCurrentUser } from "../../utils";
import { useLeads } from "../../feature/leadSlice";
import { getLeadsApi } from "../../api/leadApi";

const ITEMS_PER_PAGE = 5;

const SEVERITY_OPTIONS = [
    { label: "All Pipeline Stages", value: "all" },
    { label: "Pending Review", value: "pending" },
    { label: "Approved (Qualified)", value: "approved" },
    { label: "Rejected (Lost)", value: "rejected" },
];

const Leads = () => {
    const { user: currentUser } = useCurrentUser();
    const {
        leads,
        total,
        loading,
        getLeads,
        addLead,
        editLead,
        removeLead,
        bulkRemoveLeads,
    } = useLeads();

    const [activeTab, setActiveTab] = React.useState("all");
    const [selectedCategory, setSelectedCategory] = React.useState("All Leads");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [severityFilter, setSeverityFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedLeadIds, setSelectedLeadIds] = React.useState([]);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingLead, setEditingLead] = React.useState(null);

    // Fetch leads with backend query parameters (filtered by pending severity)
    const fetchLeadData = React.useCallback(() => {
        const params = {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            isDeleted: activeTab === "trash",
            severity: "pending",
        };

        const trimmed = searchQuery.trim();
        if (trimmed) params.search = trimmed;

        if (statusFilter !== "all") {
            params.isActive = statusFilter === "Active";
        }

        getLeads(params);
    }, [currentPage, activeTab, searchQuery, statusFilter, getLeads]);

    React.useEffect(() => {
        fetchLeadData();
    }, [fetchLeadData]);

    const [statusCounts, setStatusCounts] = React.useState({
        all: 0,
        active: 0,
        inactive: 0,
    });

    const fetchStatusCounts = React.useCallback(async () => {
        try {
            const [allRes, activeRes, inactiveRes] = await Promise.all([
                getLeadsApi({ isDeleted: false, severity: "pending", page: 1, limit: 1 }),
                getLeadsApi({ isDeleted: false, severity: "pending", isActive: true, page: 1, limit: 1 }),
                getLeadsApi({ isDeleted: false, severity: "pending", isActive: false, page: 1, limit: 1 }),
            ]);

            const parseCount = (res) => {
                const p = res?.data !== undefined ? res.data : res;
                return Number(p?.pagination?.total ?? p?.total ?? (Array.isArray(p) ? p.length : 0)) || 0;
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
        setSelectedLeadIds([]);
    }, []);

    const handleStatusFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(next);
        setSelectedCategory(next === "Active" ? "Active" : next === "Inactive" ? "Inactive" : "All Leads");
        setCurrentPage(1);
        setSelectedLeadIds([]);
    }, []);

    const handleSeverityFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setSeverityFilter(next);
        setCurrentPage(1);
        setSelectedLeadIds([]);
    }, []);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setSearchQuery("");
        setSelectedCategory("All Leads");
        setCurrentPage(1);
        setSelectedLeadIds([]);
        showToast("Lead filters reset", "info");
    }, []);

    // Sidebar navigation
    const handleSidebarItemClick = React.useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        setSelectedLeadIds([]);
        const item = leadsSidebarData.items.find((i) => i.name === name);
        const nextStatus = item?.status || "all";
        setStatusFilter(nextStatus);
    }, []);

    const handleTabChange = React.useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        setSelectedLeadIds([]);
        if (tabValue === "trash") {
            setSelectedCategory("Trash");
            setStatusFilter("all");
        } else {
            setSelectedCategory("All Leads");
        }
    }, []);

    // Selection handlers for bulk operations
    const isAllSelected = React.useMemo(() => {
        if (!leads.length) return false;
        return leads.every((l) => {
            const id = l.id || l._id;
            return selectedLeadIds.includes(id) || (l._id && selectedLeadIds.includes(l._id));
        });
    }, [leads, selectedLeadIds]);

    const handleSelectAll = React.useCallback((checked) => {
        const next = typeof checked === "boolean" ? checked : !isAllSelected;
        if (next) {
            const allIds = leads.map((l) => l.id || l._id);
            setSelectedLeadIds(allIds);
        } else {
            setSelectedLeadIds([]);
        }
    }, [leads, isAllSelected]);

    const handleSelectRow = React.useCallback((id, row) => {
        const targetId = row?.id || id;
        setSelectedLeadIds((prev) => {
            const exists = prev.includes(targetId) || (row?._id && prev.includes(row._id));
            if (exists) {
                return prev.filter((x) => x !== targetId && x !== row?._id);
            }
            return [...prev, targetId];
        });
    }, []);

    // Actions
    const handleViewLead = React.useCallback((row) => {
        showToast(
            `Lead: ${row.name} (${row.mobile || "No phone"}) • ${row.location || "Direct"} • Stage: ${row.severityLabel || row.severity}`,
            "info"
        );
    }, []);

    const handleEditLead = React.useCallback((row) => {
        setEditingLead(row);
        setIsModalOpen(true);
    }, []);

    const handleDeleteLead = React.useCallback(async (row) => {
        const id = row.id || row._id;
        const name = row.name || "Lead";
        const isPermanent = activeTab === "trash";
        try {
            await removeLead(id, isPermanent);
            if (isPermanent) {
                showToast(`Lead "${name}" permanently removed!`, "success");
            } else {
                showToast(`Lead "${name}" moved to trash!`, "success");
            }
            fetchLeadData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to delete lead", "danger");
        }
    }, [activeTab, removeLead, fetchLeadData, fetchStatusCounts]);

    const handleBulkDelete = React.useCallback(async () => {
        if (!selectedLeadIds.length) return;
        const isPermanent = activeTab === "trash";
        try {
            await bulkRemoveLeads(selectedLeadIds, isPermanent);
            if (isPermanent) {
                showToast(`${selectedLeadIds.length} lead(s) permanently removed!`, "success");
            } else {
                showToast(`${selectedLeadIds.length} lead(s) moved to trash!`, "success");
            }
            setSelectedLeadIds([]);
            fetchLeadData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to bulk delete leads", "danger");
        }
    }, [selectedLeadIds, activeTab, bulkRemoveLeads, fetchLeadData, fetchStatusCounts]);

    // Modal Form Fields via generic CrudForm helper
    const formFields = React.useMemo(() => getLeadFormFields({ editingLead, userRole: currentUser }), [editingLead, currentUser]);

    const handleFormSubmit = React.useCallback(async (formData) => {
        if (!formData.name?.trim()) {
            showToast("Lead name is required", "warning");
            return;
        }

        if (!formData.mobile?.trim()) {
            showToast("Mobile number is required", "warning");
            return;
        }

        let activeCreatorId =
            currentUser?._id ||
            currentUser?.id ||
            currentUser?.userId ||
            currentUser?.email;

        if (!activeCreatorId) {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
                activeCreatorId =
                    storedUser?._id ||
                    storedUser?.id ||
                    storedUser?.userId ||
                    storedUser?.email;
            } catch { }
        }

        const payload = {
            name: formData.name.trim(),
            mobile: formData.mobile.trim(),
            email: formData.email ? formData.email.trim().toLowerCase() : "",
            location: formData.location ? formData.location.trim() : "",
            description: formData.description ? formData.description.trim() : "",
            severity: formData.severity ? formData.severity.toLowerCase().trim() : "pending",
            isActive: sanitizeCrudFormData(formData, { userRole: currentUser, isEditing: Boolean(editingLead) }).isActive,
        };

        if (activeCreatorId) {
            payload.createdBy = activeCreatorId;
        }

        try {
            if (editingLead) {
                const targetId = editingLead.id || editingLead._id;
                if (editingLead.createdBy) {
                    payload.createdBy =
                        typeof editingLead.createdBy === "object"
                            ? (editingLead.createdBy._id || editingLead.createdBy.id || activeCreatorId)
                            : (editingLead.createdBy || activeCreatorId);
                }
                await editLead(targetId, payload);
                if (payload.severity === "processing") {
                    showToast(`Lead "${payload.name}" marked Processing and moved to Orders!`, "success");
                } else {
                    showToast(`Lead "${payload.name}" updated successfully!`, "success");
                }
            } else {
                await addLead(payload);
                showToast(`Lead "${payload.name}" created successfully!`, "success");
            }
            setIsModalOpen(false);
            setEditingLead(null);
            fetchLeadData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to save lead", "danger");
        }
    }, [editingLead, editLead, addLead, fetchLeadData, fetchStatusCounts, currentUser]);

    // Sidebar items with dynamic total counts
    const sidebarItems = React.useMemo(() => {
        const totalAll = activeTab === "trash" ? total : (statusCounts.all || total);
        const totalActive = statusCounts.active;
        const totalInactive = statusCounts.inactive;

        return leadsSidebarData.items.map((item) => {
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
                        label: "Lead Status",
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
            <div className="flex-align gap-8">
                {selectedLeadIds.length > 0 && (
                    <Button
                        text={`Delete (${selectedLeadIds.length})`}
                        version="v2"
                        bg="danger"
                        variant="outline"
                        border="danger"
                        color="white"
                        icon="Trash"
                        onClick={handleBulkDelete}
                    />
                )}
                <Button
                    text="Add Lead"
                    version="v2"
                    bg="primary"
                    variant="outline"
                    border="primary"
                    color="white"
                    icon="Plus"
                    onClick={() => {
                        setEditingLead(null);
                        setIsModalOpen(true);
                    }}
                />
            </div>
        ),
        [selectedLeadIds, handleBulkDelete]
    );

    return (
        <MainLayout
            sidebarTitle={leadsSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="CMS" width="18" height="18" />}
            headerTitle="Customer Leads"
            headerSub="Track prospective clients, estimated deal values, acquisition channels, and sales pipeline progress"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS.leads || TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter leads by stage, active status, or keyword search"
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
                    title="Sales Leads Pipeline"
                    subtitle={
                        activeTab === "trash"
                            ? "Archived sales leads in trash"
                            : "Commercial client enquiries, expected deal values, and assigned account executives"
                    }
                    data={leads}
                    columns={leadsTableColumns}
                    totalItems={total}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={(p) => {
                        setCurrentPage(p);
                        setSelectedLeadIds([]);
                    }}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search by lead name, phone, email, or location..."
                    itemName="leads"
                    collapsible={true}
                    maxVisibleColumns={8}
                    minWidth="1050px"
                    loading={loading}
                    selectedRows={selectedLeadIds}
                    onSelectRow={handleSelectRow}
                    onSelectAll={handleSelectAll}
                    onView={handleViewLead}
                    onEdit={handleEditLead}
                    onDelete={handleDeleteLead}
                    viewTitle="View Lead Profile"
                    editTitle="Edit Deal State"
                    deleteTitle={activeTab === "trash" ? "Permanently Delete Lead" : "Delete Lead"}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingLead(null);
                }}
                title={editingLead ? `Edit Lead: ${editingLead.name}` : "Add New Lead"}
                size="sm"
                type="sidebar"
                placement="right"
                footer={null}
            >
                <FormBuilder
                    key={editingLead ? (editingLead.id || editingLead._id) : "new-lead"}
                    fields={formFields}
                    submitType="json"
                    onSubmit={handleFormSubmit}
                    submitText={editingLead ? "Update Lead" : "Save Lead"}
                    col="1"
                />
            </Modal>
        </MainLayout>
    );
};

export default React.memo(Leads);
