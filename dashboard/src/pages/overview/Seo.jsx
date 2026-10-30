import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import {
    seoSidebarData,
    seoTableColumns,
    seoData as initialSeoData,
    seoSiteInfo,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Pages", value: "all" }];

const STATUS_OPTIONS = [
    { label: "All Index Statuses", value: "all" },
    { label: "Indexed", value: "Indexed" },
    { label: "Needs Attention", value: "Needs Attention" },
    { label: "NoIndex", value: "NoIndex" },
];

const SCORE_OPTIONS = [
    { label: "All SEO Scores", value: "all" },
    { label: "High Score (90+)", value: "high" },
    { label: "Average Score (70-89)", value: "avg" },
    { label: "Needs Audit (<70)", value: "low" },
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ status, onStatusChange, score, onScoreChange }) => (
    <div className="grid-cols-4 gap-12">
        <Fields
            type="select"
            label="Index Status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={onStatusChange}
        />
        <Fields
            type="select"
            label="SEO Score Tier"
            options={SCORE_OPTIONS}
            value={score}
            onChange={onScoreChange}
        />
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

const Seo = () => {
    const [seoPages, setSeoPages] = useState(initialSeoData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Pages");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [scoreFilter, setScoreFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setSeoPages(initialSeoData);
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

    const handleScoreFilterChange = useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setScoreFilter(next);
        setCurrentPage(1);
    }, []);

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = useMemo(() => {
        const counts = seoPages.reduce((acc, p) => {
            const s = p.status?.toLowerCase();
            if (s) acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});

        return seoSidebarData.items.map((item) => ({
            ...item,
            icon: "Clipboard",
            count: item.status === "all" ? seoPages.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [seoPages]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = seoSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = seoSidebarData.items.find((i) => i.status === tabValue);
        setSelectedCategory(item ? item.name : "All Pages");
    }, []);

    const handleClearFilters = useCallback(() => {
        setStatusFilter("all");
        setScoreFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("SEO filters reset", "info");
    }, []);

    // Action handlers for rows
    const handleViewSeo = useCallback((row) => {
        showToast(`Auditing meta tags for ${row.pageName} (${row.route})`, "info");
    }, []);

    const handleEditSeo = useCallback((row) => {
        showToast(`Editing meta configuration for ${row.pageName}`, "info");
    }, []);

    const handleDeleteSeo = useCallback((row) => {
        setSeoPages((prev) => prev.filter((p) => p.id !== row.id));
        showToast(`SEO entry for ${row.pageName} purged!`, "danger");
    }, []);

    const handleExportSeo = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(seoPages, null, 2));
        showToast("XML Sitemap & SEO audit exported to clipboard!", "success");
    }, [seoPages]);

    // Multi-criteria filtering
    const filteredSeoPages = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();

        return seoPages.filter((item) => {
            const itemStatus = String(item.status || "").toLowerCase().trim();
            const rawScore = parseInt(item.seoScore, 10) || 0;

            const matchesTab = targetTab === "all" || itemStatus === targetTab;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;

            let matchesScore = true;
            if (scoreFilter === "high") matchesScore = rawScore >= 90;
            else if (scoreFilter === "avg") matchesScore = rawScore >= 70 && rawScore < 90;
            else if (scoreFilter === "low") matchesScore = rawScore > 0 && rawScore < 70;

            const matchesSearch =
                !q ||
                String(item.pageName || "").toLowerCase().includes(q) ||
                String(item.path || "").toLowerCase().includes(q) ||
                String(item.route || "").toLowerCase().includes(q) ||
                String(item.title || "").toLowerCase().includes(q) ||
                String(item.metaTitle || "").toLowerCase().includes(q) ||
                String(item.description || "").toLowerCase().includes(q) ||
                String(item.keywords || "").toLowerCase().includes(q) ||
                String(item.targetKeyword || "").toLowerCase().includes(q) ||
                String(item.canonical || "").toLowerCase().includes(q) ||
                String(item.breadcrumbsText || "").toLowerCase().includes(q) ||
                itemStatus.includes(q);

            return matchesTab && matchesStatus && matchesScore && matchesSearch;
        });
    }, [seoPages, activeTab, statusFilter, scoreFilter, searchQuery]);

    const paginatedSeoPages = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredSeoPages.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredSeoPages, currentPage]);

    const hasActiveFilters = useMemo(
        () => statusFilter !== "all" || scoreFilter !== "all" || Boolean(searchQuery.trim()),
        [statusFilter, scoreFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                status={statusFilter}
                onStatusChange={handleStatusFilterChange}
                score={scoreFilter}
                onScoreChange={handleScoreFilterChange}
            />
        ),
        [statusFilter, handleStatusFilterChange, scoreFilter, handleScoreFilterChange]
    );

    const quickActionNode = useMemo(
        () => (
            <Button
                text="Export SEO Audit"
                version="v2"
                bg="primary"
                variant="outline"
                border="primary"
                color="white"
                icon="File"
                onClick={handleExportSeo}
                title="Download full sitemap and metadata report"
            />
        ),
        [handleExportSeo]
    );

    return (
        <MainLayout
            sidebarTitle={seoSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Clipboard" width="18" height="18" />}
            headerTitle="SEO Configuration"
            headerSub={`Search engine crawl performance, OpenGraph social cards, canonical URLs, and indexation audit for ${seoSiteInfo?.name || "Ashmita Vinyls"} (${seoSiteInfo?.url || "https://ashmitavinyls.com"})`}
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter pages by indexation health, crawler status, or keywords"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            {seoSiteInfo && (
                <div
                    className="flex items-center justify-between flex-wrap gap-12 mb-16 p-12 rounded-8"
                    style={{
                        background: "var(--card-bg, #ffffff)",
                        border: "1px solid var(--border-color, #e2e8f0)",
                    }}
                >
                    <div className="flex items-center gap-10 flex-wrap">
                        <span className="font-600 text-dark small-text">{seoSiteInfo.name}</span>
                        <a
                            href={seoSiteInfo.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary mini-text font-mono underline"
                        >
                            {seoSiteInfo.url}
                        </a>
                        <span className="text-gray mini-text">
                            • {seoSiteInfo.address?.addressLocality}, {seoSiteInfo.address?.addressRegion}
                        </span>
                    </div>
                    <div className="flex items-center gap-12 flex-wrap">
                        <span className="mini-text text-gray">
                            Helpline: <strong className="text-dark font-500">{seoSiteInfo.phone}</strong>
                        </span>
                        <span className="mini-text text-gray">
                            • Email: <strong className="text-dark font-500">{seoSiteInfo.email}</strong>
                        </span>
                    </div>
                </div>
            )}
            <Table
                title="Page Metadata & Health"
                subtitle="Live status of search engine indexing, target keywords, and on-page metadata"
                data={paginatedSeoPages}
                columns={seoTableColumns}
                totalItems={filteredSeoPages.length}
                itemsPerPage={ITEMS_PER_PAGE}
                page={currentPage}
                onPageChange={setCurrentPage}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search by page name, route, or keyword..."
                itemName="pages"
                collapsible={true}
                maxVisibleColumns={5}
                minWidth="1050px"
                onView={handleViewSeo}
                onEdit={handleEditSeo}
                onDelete={handleDeleteSeo}
                viewTitle="Run Live SEO Audit"
                editTitle="Edit Meta Tags"
                deleteTitle="Remove Page"
            />
        </MainLayout>
    );
};

export default memo(Seo);
