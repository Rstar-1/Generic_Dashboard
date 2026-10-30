import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import {
    blogCategoriesSidebarData,
    blogCategoriesTableColumns,
    blogCategoriesData as initialBlogCategoriesData,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Blog Categories", value: "all" }];

const STATUS_OPTIONS = [
    { label: "All Statuses", value: "all" },
    { label: "Active", value: "Active" },
    { label: "Archived", value: "Archived" },
];

const TOPIC_OPTIONS = [
    { label: "All Topics", value: "all" },
    { label: "Warehouse", value: "Warehouse" },
    { label: "Green Tech", value: "Green Tech" },
    { label: "Compliance", value: "Compliance" },
    { label: "Tutorials", value: "Tutorials" },
    { label: "Archive", value: "Archive" },
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ status, onStatusChange, topic, onTopicChange }) => (
    <div className="grid-cols-4 gap-12">
        <Fields
            type="select"
            label="Category Status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={onStatusChange}
        />
        <Fields
            type="select"
            label="Topic Tag"
            options={TOPIC_OPTIONS}
            value={topic}
            onChange={onTopicChange}
        />
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

const CategoryBlogs = () => {
    const [categories, setCategories] = useState(initialBlogCategoriesData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [topicFilter, setTopicFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCategories(initialBlogCategoriesData);
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

    const handleTopicFilterChange = useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setTopicFilter(next);
        setCurrentPage(1);
    }, []);

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = useMemo(() => {
        const counts = categories.reduce((acc, c) => {
            const s = c.status?.toLowerCase();
            if (s) acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});

        return blogCategoriesSidebarData.items.map((item) => ({
            ...item,
            icon: "Clipboard",
            count: item.status === "all" ? categories.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [categories]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = blogCategoriesSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = blogCategoriesSidebarData.items.find((i) => i.status === tabValue);
        setSelectedCategory(item ? item.name : "All Categories");
    }, []);

    const handleClearFilters = useCallback(() => {
        setStatusFilter("all");
        setTopicFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Blog category filters reset", "info");
    }, []);

    // Action handlers for rows
    const handleViewCategory = useCallback((row) => {
        showToast(`Viewing blog category ${row.name}`, "info");
    }, []);

    const handleEditCategory = useCallback((row) => {
        showToast(`Editing blog category ${row.name}`, "info");
    }, []);

    const handleDeleteCategory = useCallback((row) => {
        setCategories((prev) => prev.filter((c) => c.id !== row.id));
        showToast(`Blog category ${row.name} deleted!`, "danger");
    }, []);

    const handleExportCategories = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(categories, null, 2));
        showToast("Blog categories exported to clipboard!", "success");
    }, [categories]);

    // Multi-criteria filtering
    const filteredCategories = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetTopic = String(topicFilter || "all").toLowerCase().trim();

        return categories.filter((item) => {
            const itemStatus = String(item.status || "").toLowerCase().trim();
            const itemTopic = String(item.badge || "").toLowerCase().trim();

            const matchesTab = targetTab === "all" || itemStatus === targetTab;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesTopic = targetTopic === "all" || itemTopic === targetTopic;

            const matchesSearch =
                !q ||
                String(item.name || "").toLowerCase().includes(q) ||
                String(item.slug || "").toLowerCase().includes(q) ||
                itemTopic.includes(q) ||
                itemStatus.includes(q);

            return matchesTab && matchesStatus && matchesTopic && matchesSearch;
        });
    }, [categories, activeTab, statusFilter, topicFilter, searchQuery]);

    const paginatedCategories = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCategories.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredCategories, currentPage]);

    const hasActiveFilters = useMemo(
        () => statusFilter !== "all" || topicFilter !== "all" || Boolean(searchQuery.trim()),
        [statusFilter, topicFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                status={statusFilter}
                onStatusChange={handleStatusFilterChange}
                topic={topicFilter}
                onTopicChange={handleTopicFilterChange}
            />
        ),
        [statusFilter, handleStatusFilterChange, topicFilter, handleTopicFilterChange]
    );

    const quickActionNode = useMemo(
        () => (
            <Button
                text="Export Categories"
                version="v2"
                bg="primary"
                variant="outline"
                border="primary"
                color="white"
                icon="File"
                onClick={handleExportCategories}
                title="Download blog taxonomy dataset"
            />
        ),
        [handleExportCategories]
    );

    return (
        <MainLayout
            sidebarTitle={blogCategoriesSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Clipboard" width="18" height="18" />}
            headerTitle="Blog Categories"
            headerSub="Editorial taxonomy, topic tags, and article group collections for SEO content marketing"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter blog categories by publication state, topic tag, or keyword"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <Table
                title="Blog Taxonomies & Topics"
                subtitle="Categorical structures for guides, case studies, and industrial articles"
                data={paginatedCategories}
                columns={blogCategoriesTableColumns}
                totalItems={filteredCategories.length}
                itemsPerPage={ITEMS_PER_PAGE}
                page={currentPage}
                onPageChange={setCurrentPage}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search by category name, tag, or slug..."
                itemName="categories"
                collapsible={true}
                maxVisibleColumns={5}
                minWidth="1050px"
                onView={handleViewCategory}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                viewTitle="View Category Details"
                editTitle="Edit Blog Category"
                deleteTitle="Delete Category"
            />
        </MainLayout>
    );
};

export default memo(CategoryBlogs);
