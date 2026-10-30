import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import {
    blogsSidebarData,
    blogsTableColumns,
    blogsData as initialBlogsData,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Articles", value: "all" }];

const STATUS_OPTIONS = [
    { label: "All Publication Statuses", value: "all" },
    { label: "Published", value: "Published" },
    { label: "Draft", value: "Draft" },
    { label: "Scheduled", value: "Scheduled" },
];

const CATEGORY_OPTIONS = [
    { label: "All Categories", value: "all" },
    { label: "Buying & Selection Guide", value: "Buying & Selection Guide" },
    { label: "Energy Efficiency", value: "Energy Efficiency" },
    { label: "Installation Guides", value: "Installation Guides" },
    { label: "Workplace Safety", value: "Workplace Safety" },
    { label: "Cold Storage", value: "Cold Storage" },
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ status, onStatusChange, category, onCategoryChange }) => (
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
            label="Category"
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={onCategoryChange}
        />
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

const OverviewBlogs = () => {
    const [blogs, setBlogs] = useState(initialBlogsData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Articles");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setBlogs(initialBlogsData);
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

    const handleCategoryFilterChange = useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setCategoryFilter(next);
        setCurrentPage(1);
    }, []);

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = useMemo(() => {
        const counts = blogs.reduce((acc, b) => {
            const s = b.status?.toLowerCase();
            if (s) acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});

        return blogsSidebarData.items.map((item) => ({
            ...item,
            icon: "Clipboard",
            count: item.status === "all" ? blogs.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [blogs]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = blogsSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = blogsSidebarData.items.find((i) => i.status === tabValue);
        setSelectedCategory(item ? item.name : "All Articles");
    }, []);

    const handleClearFilters = useCallback(() => {
        setStatusFilter("all");
        setCategoryFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Blog article filters reset", "info");
    }, []);

    // Action handlers for rows
    const handleViewBlog = useCallback((row) => {
        showToast(`Viewing article "${row.title}"`, "info");
    }, []);

    const handleEditBlog = useCallback((row) => {
        showToast(`Editing post "${row.title}"`, "info");
    }, []);

    const handleDeleteBlog = useCallback((row) => {
        setBlogs((prev) => prev.filter((b) => b.id !== row.id));
        showToast(`Article "${row.title}" deleted!`, "danger");
    }, []);

    const handleExportBlogs = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(blogs, null, 2));
        showToast("Blog posts exported to clipboard!", "success");
    }, [blogs]);

    // Multi-criteria filtering
    const filteredBlogs = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetCategory = String(categoryFilter || "all").toLowerCase().trim();

        return blogs.filter((item) => {
            const itemStatus = String(item.status || "").toLowerCase().trim();
            const itemCategory = String(item.category || "").toLowerCase().trim();
            const tagsString = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";

            const matchesTab = targetTab === "all" || itemStatus === targetTab;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesCategory = targetCategory === "all" || itemCategory === targetCategory;

            const matchesSearch =
                !q ||
                String(item.title || "").toLowerCase().includes(q) ||
                String(item.author || "").toLowerCase().includes(q) ||
                String(item.excerpt || "").toLowerCase().includes(q) ||
                tagsString.includes(q) ||
                String(item.date || "").toLowerCase().includes(q) ||
                itemCategory.includes(q) ||
                itemStatus.includes(q);

            return matchesTab && matchesStatus && matchesCategory && matchesSearch;
        });
    }, [blogs, activeTab, statusFilter, categoryFilter, searchQuery]);

    const paginatedBlogs = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredBlogs, currentPage]);

    const hasActiveFilters = useMemo(
        () => statusFilter !== "all" || categoryFilter !== "all" || Boolean(searchQuery.trim()),
        [statusFilter, categoryFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                status={statusFilter}
                onStatusChange={handleStatusFilterChange}
                category={categoryFilter}
                onCategoryChange={handleCategoryFilterChange}
            />
        ),
        [statusFilter, handleStatusFilterChange, categoryFilter, handleCategoryFilterChange]
    );

    const quickActionNode = useMemo(
        () => (
            <Button
                text="Export Articles"
                version="v2"
                bg="primary"
                variant="outline"
                border="primary"
                color="white"
                icon="File"
                onClick={handleExportBlogs}
                title="Download blog article index"
            />
        ),
        [handleExportBlogs]
    );

    return (
        <MainLayout
            sidebarTitle={blogsSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Clipboard" width="18" height="18" />}
            headerTitle="Blog Posts Overview"
            headerSub="Editorial content management, published insights, read engagement, and scheduled posts"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter blog posts by status, category, or article keyword"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <Table
                title="Blog Articles & Insights"
                subtitle="Live editorial inventory with publication metrics and view statistics"
                data={paginatedBlogs}
                columns={blogsTableColumns}
                totalItems={filteredBlogs.length}
                itemsPerPage={ITEMS_PER_PAGE}
                page={currentPage}
                onPageChange={setCurrentPage}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search by article title, author, or category..."
                itemName="articles"
                collapsible={true}
                maxVisibleColumns={5}
                minWidth="1050px"
                onView={handleViewBlog}
                onEdit={handleEditBlog}
                onDelete={handleDeleteBlog}
                viewTitle="View Article Preview"
                editTitle="Edit Article"
                deleteTitle="Delete Article"
            />
        </MainLayout>
    );
};

export default memo(OverviewBlogs);
