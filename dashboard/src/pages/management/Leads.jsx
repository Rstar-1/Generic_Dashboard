import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import {
    leadsSidebarData,
    leadsTableColumns,
    leadsData as initialLeadsData,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Leads", value: "all" }];

const STATUS_OPTIONS = [
    { label: "All Pipeline Stages", value: "all" },
    { label: "New", value: "New" },
    { label: "Contacted", value: "Contacted" },
    { label: "Qualified", value: "Qualified" },
    { label: "Lost", value: "Lost" },
];

const SOURCE_OPTIONS = [
    { label: "All Acquisition Sources", value: "all" },
    { label: "Website Enquiry", value: "Website Enquiry" },
    { label: "Direct Call", value: "Direct Call" },
    { label: "Partner Referral", value: "Partner Referral" },
    { label: "Google Ads", value: "Google Ads" },
    { label: "Trade Expo", value: "Trade Expo" },
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ status, onStatusChange, source, onSourceChange }) => (
    <div className="grid-cols-4 gap-12">
        <Fields
            type="select"
            label="Pipeline Status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={onStatusChange}
        />
        <Fields
            type="select"
            label="Lead Source"
            options={SOURCE_OPTIONS}
            value={source}
            onChange={onSourceChange}
        />
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

const Leads = () => {
    const [leads, setLeads] = useState(initialLeadsData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Leads");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sourceFilter, setSourceFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLeads(initialLeadsData);
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

    const handleSourceFilterChange = useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setSourceFilter(next);
        setCurrentPage(1);
    }, []);

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = useMemo(() => {
        const counts = leads.reduce((acc, l) => {
            const s = l.status?.toLowerCase();
            if (s) acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});

        return leadsSidebarData.items.map((item) => ({
            ...item,
            icon: "CMS",
            count: item.status === "all" ? leads.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [leads]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = leadsSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = leadsSidebarData.items.find((i) => i.status === tabValue);
        setSelectedCategory(item ? item.name : "All Leads");
    }, []);

    const handleClearFilters = useCallback(() => {
        setStatusFilter("all");
        setSourceFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Lead filters reset", "info");
    }, []);

    // Action handlers for rows
    const handleViewLead = useCallback((row) => {
        showToast(`Viewing lead file for ${row.name} (${row.company})`, "info");
    }, []);

    const handleEditLead = useCallback((row) => {
        showToast(`Updating pipeline status for ${row.name}`, "info");
    }, []);

    const handleDeleteLead = useCallback((row) => {
        setLeads((prev) => prev.filter((l) => l.id !== row.id));
        showToast(`Lead ${row.name} archived!`, "danger");
    }, []);

    const handleExportLeads = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(leads, null, 2));
        showToast("Sales leads pipeline exported to clipboard!", "success");
    }, [leads]);

    // Multi-criteria filtering
    const filteredLeads = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetSource = String(sourceFilter || "all").toLowerCase().trim();

        return leads.filter((item) => {
            const itemStatus = String(item.status || "").toLowerCase().trim();
            const itemSource = String(item.source || "").toLowerCase().trim();

            const matchesTab = targetTab === "all" || itemStatus === targetTab;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesSource = targetSource === "all" || itemSource === targetSource;

            const matchesSearch =
                !q ||
                String(item.name || "").toLowerCase().includes(q) ||
                String(item.company || "").toLowerCase().includes(q) ||
                String(item.contact || "").toLowerCase().includes(q) ||
                String(item.value || "").toLowerCase().includes(q) ||
                String(item.assignedTo || "").toLowerCase().includes(q) ||
                itemSource.includes(q) ||
                itemStatus.includes(q);

            return matchesTab && matchesStatus && matchesSource && matchesSearch;
        });
    }, [leads, activeTab, statusFilter, sourceFilter, searchQuery]);

    const paginatedLeads = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredLeads.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredLeads, currentPage]);

    const hasActiveFilters = useMemo(
        () => statusFilter !== "all" || sourceFilter !== "all" || Boolean(searchQuery.trim()),
        [statusFilter, sourceFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                status={statusFilter}
                onStatusChange={handleStatusFilterChange}
                source={sourceFilter}
                onSourceChange={handleSourceFilterChange}
            />
        ),
        [statusFilter, handleStatusFilterChange, sourceFilter, handleSourceFilterChange]
    );

    const quickActionNode = useMemo(
        () => (
            <Button
                text="Export Pipeline"
                version="v2"
                bg="primary"
                variant="outline"
                border="primary"
                color="white"
                icon="File"
                onClick={handleExportLeads}
                title="Download leads dataset"
            />
        ),
        [handleExportLeads]
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
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter leads by stage, acquisition source, or customer profile"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <Table
                title="Sales Leads Pipeline"
                subtitle="Commercial client enquiries, expected deal values, and assigned account executives"
                data={paginatedLeads}
                columns={leadsTableColumns}
                totalItems={filteredLeads.length}
                itemsPerPage={ITEMS_PER_PAGE}
                page={currentPage}
                onPageChange={setCurrentPage}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search by lead name, company, phone, or rep..."
                itemName="leads"
                collapsible={true}
                maxVisibleColumns={5}
                minWidth="1050px"
                onView={handleViewLead}
                onEdit={handleEditLead}
                onDelete={handleDeleteLead}
                viewTitle="View Lead Profile"
                editTitle="Edit Deal State"
                deleteTitle="Archive Lead"
            />
        </MainLayout>
    );
};

export default memo(Leads);
