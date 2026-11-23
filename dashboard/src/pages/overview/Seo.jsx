import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import FilterForm from "../../components/forms/sections/FilterForm";
import Modal from "../../components/common/Modal";
import FormBuilder from "../../components/forms/FormBuilder";
import { getSeoFormFields, sanitizeCrudFormData } from "../../components/forms/sections/CrudForm";
import { showToast } from "../../components/common/Toast";
import { useCurrentUser } from "../../utils";
import {
    seoSidebarData,
    seoTableColumns,
    seoSiteInfo,
    STATUS_OPTIONS,
    TABS,
} from "../../utils/apiData";
import { useSeo } from "../../feature/seoSlice";
import { getSeoListApi } from "../../api/seoApi";

const ITEMS_PER_PAGE = 5;

const TYPE_OPTIONS = [
    { label: "All Page Types", value: "all" },
    { label: "Website", value: "website" },
    { label: "Article", value: "article" },
    { label: "Product", value: "product" },
    { label: "Business", value: "business" },
];

const SEO_FORM_TYPES = [
    { label: "Website Page", value: "website" },
    { label: "Article / Editorial", value: "article" },
    { label: "Product Page", value: "product" },
    { label: "Business Entity", value: "business" },
];

const Seo = () => {
    const { user: currentUser } = useCurrentUser();
    const {
        seos,
        total,
        loading,
        getSeoList,
        createSeo,
        updateSeo,
        deleteSeo,
        bulkDeleteSeo,
        seedInitialSeo,
    } = useSeo();

    const [activeTab, setActiveTab] = React.useState("all");
    const [selectedCategory, setSelectedCategory] = React.useState("All Pages");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [typeFilter, setTypeFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedSeoIds, setSelectedSeoIds] = React.useState([]);

    // Modal state for Add / Edit SEO Configuration
    const [isSeoModalOpen, setIsSeoModalOpen] = React.useState(false);
    const [editingSeo, setEditingSeo] = React.useState(null);

    // Modal state for Live SEO Audit & SERP Preview
    const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
    const [viewingSeo, setViewingSeo] = React.useState(null);

    // Backend paginated SEO fetch
    const fetchSeoData = React.useCallback(() => {
        const params = {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            isDeleted: activeTab === "trash",
        };

        if (statusFilter !== "all") {
            params.isActive = statusFilter === "Active";
        }

        if (typeFilter !== "all") {
            params.type = typeFilter;
        }

        const trimmed = searchQuery.trim();
        if (trimmed) {
            params.search = trimmed;
        }

        getSeoList(params);
    }, [currentPage, activeTab, statusFilter, typeFilter, searchQuery, getSeoList]);

    const [statusCounts, setStatusCounts] = React.useState({
        all: 0,
        active: 0,
        inactive: 0,
    });

    const fetchStatusCounts = React.useCallback(async () => {
        try {
            const [allRes, activeRes, inactiveRes] = await Promise.all([
                getSeoListApi({ isDeleted: false, page: 1, limit: 1 }),
                getSeoListApi({ isDeleted: false, isActive: true, page: 1, limit: 1 }),
                getSeoListApi({ isDeleted: false, isActive: false, page: 1, limit: 1 }),
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
        fetchSeoData();
    }, [fetchSeoData]);

    React.useEffect(() => {
        fetchStatusCounts();
    }, [fetchStatusCounts]);

    // Keep viewingSeo synced with live Redux state
    React.useEffect(() => {
        if (viewingSeo) {
            const updated = (seos || []).find(
                (s) => (s.id && s.id === viewingSeo.id) || (s._id && s._id === viewingSeo._id)
            );
            if (updated) {
                setViewingSeo(updated);
            }
        }
    }, [seos, viewingSeo]);

    // Dynamic sidebar items with real-time total active & inactive counts
    const sidebarItems = React.useMemo(() => {
        const totalAll = activeTab === "trash" ? total : (statusCounts.all || total);
        const totalActive = statusCounts.active;
        const totalInactive = statusCounts.inactive;

        return (seoSidebarData.items || []).map((item) => {
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
                icon: "Globe",
                count: countVal,
            };
        });
    }, [statusCounts, total, activeTab]);

    // Handlers for search and filters
    const handleSearchChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.target?.value ?? "");
        setSearchQuery(next);
        setCurrentPage(1);
        setSelectedSeoIds([]);
    }, []);

    const handleStatusFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(next);
        setSelectedCategory(next === "Active" ? "Active" : next === "Inactive" ? "Inactive" : "All Pages");
        setCurrentPage(1);
        setSelectedSeoIds([]);
    }, []);

    const handleTypeFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setTypeFilter(next);
        setCurrentPage(1);
        setSelectedSeoIds([]);
    }, []);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setTypeFilter("all");
        setSearchQuery("");
        setSelectedCategory("All Pages");
        setCurrentPage(1);
        setSelectedSeoIds([]);
        showToast("SEO filters reset", "info");
    }, []);

    // Sidebar navigation
    const handleSidebarItemClick = React.useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        setSelectedSeoIds([]);
        const item = (seoSidebarData.items || []).find((i) => i.name === name);
        const nextStatus = item?.status || "all";
        setStatusFilter(nextStatus);
    }, []);

    // Tab navigation (All Pages vs Trash)
    const handleTabChange = React.useCallback((tabValue) => {
        const next = typeof tabValue === "string" ? tabValue : (tabValue?.value || "all");
        setActiveTab(next);
        setCurrentPage(1);
        setSelectedSeoIds([]);
        if (next === "trash") {
            setSelectedCategory("Trash");
            setStatusFilter("all");
        } else {
            setSelectedCategory("All Pages");
        }
    }, []);

    // Checkbox multi-select handlers
    const isAllSelected = React.useMemo(() => {
        if (!seos || !seos.length) return false;
        return seos.every((s) => {
            const id = s.id || s._id;
            return selectedSeoIds.includes(id) || (s._id && selectedSeoIds.includes(s._id));
        });
    }, [seos, selectedSeoIds]);

    const handleSelectAll = React.useCallback((checked) => {
        const next = typeof checked === "boolean" ? checked : !isAllSelected;
        if (next) {
            const allIds = (seos || []).map((s) => s.id || s._id);
            setSelectedSeoIds(allIds);
        } else {
            setSelectedSeoIds([]);
        }
    }, [seos, isAllSelected]);

    const handleSelectRow = React.useCallback((id, row) => {
        const targetId = row?.id || id;
        setSelectedSeoIds((prev) => {
            const exists = prev.includes(targetId) || (row?._id && prev.includes(row._id));
            if (exists) {
                return prev.filter((x) => x !== targetId && x !== row?._id);
            }
            return [...prev, targetId];
        });
    }, []);

    // Row action handlers
    const handleViewSeo = React.useCallback((row) => {
        setViewingSeo(row);
        setIsViewModalOpen(true);
    }, []);

    const handleOpenAddModal = React.useCallback(() => {
        setEditingSeo(null);
        setIsSeoModalOpen(true);
    }, []);

    const handleEditSeo = React.useCallback((row) => {
        setEditingSeo(row);
        setIsSeoModalOpen(true);
    }, []);

    const handleDeleteSeo = React.useCallback(
        async (row) => {
            const seoId = row.id || row._id;
            const isTrash = activeTab === "trash" || row.isDeleted;
            try {
                await deleteSeo(seoId, isTrash).unwrap();
                showToast(
                    `SEO configuration "${row.pageName || row.name}" ${isTrash ? "permanently removed!" : "moved to trash!"}`,
                    "success"
                );
                setSelectedSeoIds((prev) => prev.filter((x) => x !== seoId && x !== row.id && x !== row._id));
                fetchSeoData();
                fetchStatusCounts();
            } catch (err) {
                showToast(err?.message || "Failed to delete SEO configuration", "danger");
            }
        },
        [activeTab, deleteSeo, fetchSeoData, fetchStatusCounts]
    );

    const handleBulkDelete = React.useCallback(async () => {
        if (!selectedSeoIds.length) return;
        const isTrash = activeTab === "trash";
        try {
            await bulkDeleteSeo(selectedSeoIds, isTrash).unwrap();
            showToast(
                `${selectedSeoIds.length} SEO configuration(s) ${isTrash ? "permanently removed!" : "moved to trash!"}`,
                "success"
            );
            setSelectedSeoIds([]);
            fetchSeoData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to delete selected SEO configurations", "danger");
        }
    }, [selectedSeoIds, activeTab, bulkDeleteSeo, fetchSeoData, fetchStatusCounts]);

    const handleSeedInitialData = React.useCallback(async () => {
        try {
            const res = await seedInitialSeo(true).unwrap();
            showToast(res?.message || "Successfully seeded initial SEO configurations!", "success");
            fetchSeoData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to seed SEO data", "danger");
        }
    }, [seedInitialSeo, fetchSeoData, fetchStatusCounts]);

    const handleExportSeo = React.useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(seos, null, 2));
        showToast("SEO configurations & XML Sitemap audit exported to clipboard!", "success");
    }, [seos]);

    // Form fields for Add / Edit SEO Modal via generic CrudForm helper
    const seoFormFields = React.useMemo(
        () => getSeoFormFields({ editingSeo, pageTypes: SEO_FORM_TYPES, userRole: currentUser }),
        [editingSeo, currentUser]
    );

    const handleSaveSeo = React.useCallback(
        async (formData) => {
            let breadcrumbs = [];
            if (formData.breadcrumbs) {
                try {
                    breadcrumbs = JSON.parse(formData.breadcrumbs);
                } catch {
                    breadcrumbs = String(formData.breadcrumbs)
                        .split(">")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .map((label, idx) => ({ label, path: idx === 0 ? "/" : `/${label.toLowerCase().replace(/\s+/g, "-")}` }));
                }
            }

            const payload = {
                name: formData.name?.trim().toLowerCase(),
                page: (formData.page || formData.name).trim(),
                path: formData.path?.trim(),
                title: formData.title?.trim() || "",
                description: formData.description?.trim() || "",
                keywords: formData.keywords?.trim() || "",
                image: formData.image?.trim() || "",
                type: formData.type ? String(formData.type).toLowerCase().trim() : "website",
                noindex: formData.noindex === "true" || formData.noindex === true,
                breadcrumbs: Array.isArray(breadcrumbs) ? breadcrumbs : [],
                isActive: sanitizeCrudFormData(formData, { userRole: currentUser, isEditing: Boolean(editingSeo) }).isActive,
            };

            if (currentUser?.id || currentUser?._id) {
                payload.createdBy = currentUser.id || currentUser._id;
            }

            try {
                if (editingSeo) {
                    await updateSeo(editingSeo.id || editingSeo._id, payload).unwrap();
                    showToast(`SEO configuration "${payload.name}" updated successfully!`, "success");
                } else {
                    await createSeo(payload).unwrap();
                    showToast(`SEO configuration "${payload.name}" created successfully!`, "success");
                }
                setIsSeoModalOpen(false);
                setEditingSeo(null);
                fetchSeoData();
                fetchStatusCounts();
            } catch (err) {
                showToast(err?.message || "Failed to save SEO configuration", "danger");
            }
        },
        [editingSeo, currentUser, updateSeo, createSeo, fetchSeoData, fetchStatusCounts]
    );

    const hasActiveFilters = React.useMemo(
        () => statusFilter !== "all" || typeFilter !== "all" || Boolean(searchQuery.trim()) || activeTab !== "all",
        [statusFilter, typeFilter, searchQuery, activeTab]
    );

    const filterInputsNode = React.useMemo(
        () => (
            <FilterForm
                fields={[
                    {
                        type: "select",
                        label: "Index Status",
                        options: STATUS_OPTIONS,
                        value: statusFilter,
                        onChange: handleStatusFilterChange,
                    },
                    {
                        type: "select",
                        label: "Page Type",
                        options: TYPE_OPTIONS,
                        value: typeFilter,
                        onChange: handleTypeFilterChange,
                    },
                ]}
            />
        ),
        [statusFilter, handleStatusFilterChange, typeFilter, handleTypeFilterChange]
    );

    const quickActionNode = React.useMemo(
        () => (
            <div className="flex items-center gap-8">
                {selectedSeoIds.length > 0 && (
                    <Button
                        text={`${activeTab === "trash" ? "Permanently Delete" : "Move to Trash"} (${selectedSeoIds.length})`}
                        version="v2"
                        bg="danger"
                        color="white"
                        icon="Trash"
                        onClick={handleBulkDelete}
                    />
                )}
                {total === 0 && (
                    <Button
                        text="Seed Default SEO"
                        version="v2"
                        bg="success"
                        color="white"
                        icon="RefreshCw"
                        onClick={handleSeedInitialData}
                        title="Load official default 12 SEO records"
                    />
                )}
                <Button
                    text="Add SEO Page"
                    version="v2"
                    bg="primary"
                    variant="outline"
                    border="primary"
                    color="white"
                    icon="Plus"
                    onClick={handleOpenAddModal}
                    title="Configure SEO metadata for a new page"
                />
            </div>
        ),
        [selectedSeoIds, activeTab, total, handleBulkDelete, handleSeedInitialData, handleOpenAddModal]
    );

    const tableSubtitle = React.useMemo(() => {
        if (activeTab === "trash") {
            return "Archived SEO page metadata entries in trash";
        }
        return "Live status of search engine indexing, target keywords, and on-page metadata";
    }, [activeTab]);

    return (
        <MainLayout
            sidebarTitle={seoSidebarData.title || "SEO Status"}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Globe" width="18" height="18" />}
            headerTitle="SEO Configuration"
            headerSub={`Search engine crawl performance, OpenGraph social cards, canonical URLs, and indexation audit for ${seoSiteInfo?.name || "Ashmita Vinyls"} (${seoSiteInfo?.url || "https://ashmitavinyls.com"})`}
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS.seo || TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter pages by indexation health, crawler status, or keywords"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            {/* Global Site Metadata Summary Banner */}
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
                        <Button
                            text="Copy Sitemap Manifest"
                            version="v2"
                            size="sm"
                            variant="outline"
                            border="primary"
                            bg="primary"
                            color="white"
                            onClick={handleExportSeo}
                        />
                    </div>
                </div>
            )}

            <div className="bg-white p-14 rounded-10">
                <Table
                    title="Page Metadata & Health"
                    subtitle={tableSubtitle}
                    data={seos}
                    columns={seoTableColumns}
                    totalItems={total}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={(p) => {
                        setCurrentPage(p);
                        setSelectedSeoIds([]);
                    }}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search by page name, route, title, or keywords..."
                    itemName="pages"
                    collapsible={true}
                    maxVisibleColumns={5}
                    minWidth="1050px"
                    loading={loading}
                    selectedRows={selectedSeoIds}
                    onSelectRow={handleSelectRow}
                    onSelectAll={handleSelectAll}
                    onView={handleViewSeo}
                    onEdit={handleEditSeo}
                    onDelete={handleDeleteSeo}
                    viewTitle="Run Live SEO Audit & SERP Preview"
                    editTitle="Edit Meta Configuration"
                    deleteTitle={activeTab === "trash" ? "Permanently Delete SEO Entry" : "Move to Trash"}
                />
            </div>

            {/* Modal: Add / Edit SEO Configuration */}
            <Modal
                isOpen={isSeoModalOpen}
                onClose={() => {
                    setIsSeoModalOpen(false);
                    setEditingSeo(null);
                }}
                title={editingSeo ? `Edit SEO: ${editingSeo.pageName || editingSeo.name}` : "Add New SEO Page Configuration"}
                size="md"
                type="sidebar"
                placement="right"
                footer={null}
            >
                <div className="p-16">
                    <FormBuilder
                        key={editingSeo ? (editingSeo.id || editingSeo._id) : "new-seo"}
                        fields={seoFormFields}
                        submitType="json"
                        onSubmit={handleSaveSeo}
                        submitText={editingSeo ? "Update SEO Config" : "Publish SEO Config"}
                        col="1"
                    />
                </div>
            </Modal>

            {/* Modal: Live SEO Audit & SERP Search Snippet Preview */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => {
                    setIsViewModalOpen(false);
                    setViewingSeo(null);
                }}
                title={viewingSeo ? `SEO Audit: ${viewingSeo.pageName || viewingSeo.name}` : "SEO Audit & SERP Preview"}
                size="md"
                type="sidebar"
                placement="right"
                footer={null}
            >
                {viewingSeo && (
                    <div className="p-16 flex flex-col gap-16">
                        {/* Audit Health Summary Header */}
                        <div className="p-14 bg-forth rounded-8 border border-ec flex items-center justify-between">
                            <div>
                                <h4 className="font-600 font-16 text-dark">{viewingSeo.pageName || viewingSeo.name}</h4>
                                <p className="font-mono text-gray font-12 mt-2">{viewingSeo.canonical || viewingSeo.path}</p>
                            </div>
                            <div className="text-right">
                                <span className="inline-block px-10 py-4 bg-light-primary text-primary font-700 rounded-6 font-14">
                                    {viewingSeo.seoScore || "92 / 100"}
                                </span>
                                <div className="font-11 text-gray mt-2">SEO Health Score</div>
                            </div>
                        </div>

                        {/* Google SERP Search Snippet Simulation */}
                        <div>
                            <h5 className="font-600 font-14 text-dark mb-8 flex items-center gap-6">
                                <Icon name="Search" width="14" height="14" />
                                Google SERP Search Snippet Preview
                            </h5>
                            <div className="p-14 bg-white rounded-8 border border-ec shadow-sm font-sans">
                                <div className="flex items-center gap-6 text-gray font-12 mb-4">
                                    <span className="w-18 h-18 rounded-full bg-light-primary flex items-center justify-center font-bold font-10 text-primary">
                                        AV
                                    </span>
                                    <span className="text-secondary font-500">ashmitavinyls.com</span>
                                    <span className="text-gray">&rsaquo;</span>
                                    <span className="text-gray truncate">{viewingSeo.path}</span>
                                </div>
                                <h3 className="font-500 font-16 text-primary hover:underline cursor-pointer mb-6 leading-tight">
                                    {viewingSeo.title || `${viewingSeo.pageName} | Ashmita Vinyls`}
                                </h3>
                                <p className="font-13 text-secondary leading-snug line-clamp2 m-0">
                                    {viewingSeo.description || "Explore industrial PVC vinyl products, strip curtains, and accessories from Ashmita Vinyls across India."}
                                </p>
                            </div>
                        </div>

                        {/* OpenGraph Social Card Preview */}
                        <div>
                            <h5 className="font-600 font-14 text-dark mb-8 flex items-center gap-6">
                                <Icon name="Share2" width="14" height="14" />
                                Social OpenGraph Card Preview
                            </h5>
                            <div className="rounded-8 border border-ec overflow-hidden bg-white shadow-sm">
                                {viewingSeo.image ? (
                                    <img
                                        src={viewingSeo.image}
                                        alt={viewingSeo.title || "OpenGraph Preview"}
                                        className="w-full h-160 object-cover bg-forth border-b border-ec"
                                    />
                                ) : (
                                    <div className="w-full h-100 flex items-center justify-center bg-forth text-gray font-12">
                                        No OpenGraph Image Configured
                                    </div>
                                )}
                                <div className="p-12">
                                    <span className="text-gray uppercase font-10 font-600 tracking-wider">
                                        ASHMITAVINYLS.COM • {String(viewingSeo.type || "WEBSITE").toUpperCase()}
                                    </span>
                                    <h5 className="font-600 font-14 text-dark mt-4 line-clamp1">
                                        {viewingSeo.title || viewingSeo.pageName}
                                    </h5>
                                    <p className="font-12 text-secondary mt-4 line-clamp2 m-0">
                                        {viewingSeo.description || "Social media preview description."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Metadata Details Table */}
                        <div>
                            <h5 className="font-600 font-14 text-dark mb-8">Metadata Specification</h5>
                            <div className="bg-forth rounded-8 border border-ec p-12 flex flex-col gap-8 font-12">
                                <div className="flex justify-between border-b border-ec pb-6">
                                    <span className="text-gray">SEO Page ID</span>
                                    <code className="font-600 text-dark bg-white px-6 py-2 rounded">{viewingSeo.id}</code>
                                </div>
                                <div className="flex justify-between border-b border-ec pb-6">
                                    <span className="text-gray">Schema Type</span>
                                    <span className="font-600 text-dark uppercase">{viewingSeo.type || "website"}</span>
                                </div>
                                <div className="flex justify-between border-b border-ec pb-6">
                                    <span className="text-gray">Robots Directive</span>
                                    <span className={`font-600 ${viewingSeo.noindex ? "text-danger" : "text-success"}`}>
                                        {viewingSeo.noindex ? "NoIndex, NoFollow" : "Index, Follow"}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-ec pb-6">
                                    <span className="text-gray">Canonical URL</span>
                                    <span className="font-mono text-primary font-500 break-all">{viewingSeo.canonical}</span>
                                </div>
                                <div className="flex justify-between border-b border-ec pb-6">
                                    <span className="text-gray">Published Status</span>
                                    <span className={`font-600 ${viewingSeo.isActive ? "text-success" : "text-danger"}`}>
                                        {viewingSeo.isActive ? "Active (In Sitemap)" : "Inactive"}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-ec pb-6">
                                    <span className="text-gray">Created By</span>
                                    <span className="font-500 text-dark">{viewingSeo.creatorName || viewingSeo.createdByName || "Admin"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray">Last Crawled / Audited</span>
                                    <span className="font-500 text-dark">{viewingSeo.lastCrawled || "Recent"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Target Keywords Badges */}
                        {viewingSeo.keywords && (
                            <div>
                                <h5 className="font-600 font-14 text-dark mb-8">Target Keywords</h5>
                                <div className="flex flex-wrap gap-6">
                                    {String(viewingSeo.keywords)
                                        .split(",")
                                        .map((kw, idx) => (
                                            <span
                                                key={idx}
                                                className="px-8 py-4 bg-white border border-ec rounded-4 font-11 font-500 text-secondary"
                                            >
                                                #{kw.trim()}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Breadcrumbs Trail */}
                        {Array.isArray(viewingSeo.breadcrumbs) && viewingSeo.breadcrumbs.length > 0 && (
                            <div>
                                <h5 className="font-600 font-14 text-dark mb-8">Structured Breadcrumbs Trail</h5>
                                <div className="flex items-center gap-6 p-8 bg-forth rounded-6 border border-ec font-12 text-secondary flex-wrap">
                                    {viewingSeo.breadcrumbs.map((b, idx) => (
                                        <React.Fragment key={idx}>
                                            <span className="font-500 text-dark">{b.label}</span>
                                            <span className="font-mono text-gray font-10">({b.path})</span>
                                            {idx < viewingSeo.breadcrumbs.length - 1 && <span className="text-gray">&rsaquo;</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </MainLayout>
    );
};

export default React.memo(Seo);
