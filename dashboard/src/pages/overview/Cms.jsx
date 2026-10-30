import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import {
    cmsSidebarData,
    cmsTableColumns,
    cmsData as initialCmsData,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Sections", value: "all" }];

const STATUS_OPTIONS = [
    { label: "All Statuses", value: "all" },
    { label: "Published", value: "Published" },
    { label: "Draft", value: "Draft" },
    { label: "Archived", value: "Archived" },
];

const AREA_OPTIONS = [
    { label: "All Section Areas", value: "all" },
    { label: "Home Hero", value: "Home Hero" },
    { label: "Feature Section", value: "Feature Section" },
    { label: "Footer Bar", value: "Footer Bar" },
    { label: "Promo Topbar", value: "Promo Topbar" },
    { label: "Banner Area", value: "Banner Area" },
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ status, onStatusChange, area, onAreaChange }) => (
    <div className="grid-cols-4 gap-12">
        <Fields
            type="select"
            label="Publish Status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={onStatusChange}
        />
        <Fields
            type="select"
            label="Section Area"
            options={AREA_OPTIONS}
            value={area}
            onChange={onAreaChange}
        />
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

const Cms = () => {
    const [cmsSections, setCmsSections] = useState(initialCmsData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Sections");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [areaFilter, setAreaFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCmsSections(initialCmsData);
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

    const handleAreaFilterChange = useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setAreaFilter(next);
        setCurrentPage(1);
    }, []);

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = useMemo(() => {
        const counts = cmsSections.reduce((acc, c) => {
            const s = c.status?.toLowerCase();
            if (s) acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});

        return cmsSidebarData.items.map((item) => ({
            ...item,
            icon: "Clipboard",
            count: item.status === "all" ? cmsSections.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [cmsSections]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = cmsSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = cmsSidebarData.items.find((i) => i.status === tabValue);
        setSelectedCategory(item ? item.name : "All Sections");
    }, []);

    const handleClearFilters = useCallback(() => {
        setStatusFilter("all");
        setAreaFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("CMS filters reset", "info");
    }, []);

    // Action handlers for rows
    const handleViewCms = useCallback((row) => {
        showToast(`Previewing content block "${row.title}"`, "info");
    }, []);

    const handleEditCms = useCallback((row) => {
        showToast(`Editing content block "${row.title}"`, "info");
    }, []);

    const handleDeleteCms = useCallback((row) => {
        setCmsSections((prev) => prev.filter((c) => c.id !== row.id));
        showToast(`Content block "${row.title}" removed!`, "danger");
    }, []);

    const handleExportCms = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(cmsSections, null, 2));
        showToast("CMS blocks exported to clipboard!", "success");
    }, [cmsSections]);

    // Multi-criteria filtering
    const filteredCms = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetArea = String(areaFilter || "all").toLowerCase().trim();

        return cmsSections.filter((item) => {
            const itemStatus = String(item.status || "").toLowerCase().trim();
            const itemArea = String(item.sectionArea || "").toLowerCase().trim();

            const matchesTab = targetTab === "all" || itemStatus === targetTab;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesArea = targetArea === "all" || itemArea === targetArea;

            const matchesSearch =
                !q ||
                String(item.title || "").toLowerCase().includes(q) ||
                String(item.slug || "").toLowerCase().includes(q) ||
                String(item.author || "").toLowerCase().includes(q) ||
                itemArea.includes(q) ||
                itemStatus.includes(q);

            return matchesTab && matchesStatus && matchesArea && matchesSearch;
        });
    }, [cmsSections, activeTab, statusFilter, areaFilter, searchQuery]);

    const paginatedCms = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCms.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredCms, currentPage]);

    const hasActiveFilters = useMemo(
        () => statusFilter !== "all" || areaFilter !== "all" || Boolean(searchQuery.trim()),
        [statusFilter, areaFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                status={statusFilter}
                onStatusChange={handleStatusFilterChange}
                area={areaFilter}
                onAreaChange={handleAreaFilterChange}
            />
        ),
        [statusFilter, handleStatusFilterChange, areaFilter, handleAreaFilterChange]
    );

    const quickActionNode = useMemo(
        () => (
            <Button
                text="Export CMS Data"
                version="v2"
                bg="primary"
                variant="outline"
                border="primary"
                color="white"
                icon="File"
                onClick={handleExportCms}
                title="Download CMS template manifest"
            />
        ),
        [handleExportCms]
    );

    return (
        <MainLayout
            sidebarTitle={cmsSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Clipboard" width="18" height="18" />}
            headerTitle="Content Management (CMS)"
            headerSub="Manage website promotional banners, dynamic homepage sections, and marketing campaigns"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter CMS blocks by section area, revision, or publication status"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <Table
                title="Website Content Blocks"
                subtitle="Live inventory of landing page sections with revision tracking and author credits"
                data={paginatedCms}
                columns={cmsTableColumns}
                totalItems={filteredCms.length}
                itemsPerPage={ITEMS_PER_PAGE}
                page={currentPage}
                onPageChange={setCurrentPage}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search by section title, area, or author..."
                itemName="sections"
                collapsible={true}
                maxVisibleColumns={5}
                minWidth="1050px"
                onView={handleViewCms}
                onEdit={handleEditCms}
                onDelete={handleDeleteCms}
                viewTitle="Preview Section Block"
                editTitle="Edit Content"
                deleteTitle="Remove Block"
            />
        </MainLayout>
    );
};

export default memo(Cms);
