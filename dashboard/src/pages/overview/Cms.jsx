import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import FilterForm from "../../components/forms/sections/FilterForm";
import Modal from "../../components/common/Modal";
import FormBuilder from "../../components/forms/FormBuilder";
import { getCmsSectionFormFields, getCmsItemFormFields, sanitizeCrudFormData } from "../../components/forms/sections/CrudForm";
import { showToast } from "../../components/common/Toast";
import { useCurrentUser } from "../../utils";
import { cmsSidebarData, cmsTableColumns, STATUS_OPTIONS, TABS } from "../../utils/apiData";
import { useCms } from "../../feature/cmsSlice";
import { getCmsListApi } from "../../api/cmsApi";

const ITEMS_PER_PAGE = 5;

const ITEM_TYPES = [
    { label: "Text Block", value: "text" },
    { label: "Image / Media", value: "image" },
    { label: "Array / Dataset", value: "array" },
];

const Cms = () => {
    const { user: currentUser } = useCurrentUser();
    const {
        sections,
        total,
        loading,
        getCmsList,
        createCms,
        updateCms,
        deleteCms,
        bulkDeleteCms,
        addOrUpdateCmsItem,
        deleteCmsItem,
    } = useCms();

    const [activeTab, setActiveTab] = React.useState("all");
    const [selectedCategory, setSelectedCategory] = React.useState("All Sections");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedCmsIds, setSelectedCmsIds] = React.useState([]);

    // Modal state for Add / Edit CMS Section
    const [isSectionModalOpen, setIsSectionModalOpen] = React.useState(false);
    const [editingSection, setEditingSection] = React.useState(null);

    // Modal state for View / Preview Section Details
    const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
    const [viewingSection, setViewingSection] = React.useState(null);

    // Modal state for Add / Edit Single CMS Data Item inside a section
    const [isItemModalOpen, setIsItemModalOpen] = React.useState(false);
    const [targetSectionForItem, setTargetSectionForItem] = React.useState(null);
    const [editingItem, setEditingItem] = React.useState(null);
    const [selectedItemType, setSelectedItemType] = React.useState("text");

    // Fetch CMS sections from backend service (via gateway 5000 -> cms-service 8087)
    const fetchCmsData = React.useCallback(() => {
        const params = {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            isDeleted: activeTab === "trash",
        };

        if (statusFilter !== "all") {
            params.isActive = statusFilter === "Active";
        }

        const trimmed = searchQuery.trim();
        if (trimmed) {
            params.search = trimmed;
        }

        getCmsList(params);
    }, [currentPage, activeTab, statusFilter, searchQuery, getCmsList]);

    const [statusCounts, setStatusCounts] = React.useState({
        all: 0,
        active: 0,
        inactive: 0,
    });

    const fetchStatusCounts = React.useCallback(async () => {
        try {
            const [allRes, activeRes, inactiveRes] = await Promise.all([
                getCmsListApi({ isDeleted: false, page: 1, limit: 1 }),
                getCmsListApi({ isDeleted: false, isActive: true, page: 1, limit: 1 }),
                getCmsListApi({ isDeleted: false, isActive: false, page: 1, limit: 1 }),
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
        fetchCmsData();
    }, [fetchCmsData]);

    React.useEffect(() => {
        fetchStatusCounts();
    }, [fetchStatusCounts]);

    // Keep viewingSection in sync with Redux state updates
    React.useEffect(() => {
        if (viewingSection) {
            const updated = (sections || []).find(
                (s) => (s.id && s.id === viewingSection.id) || (s._id && s._id === viewingSection._id)
            );
            if (updated) {
                setViewingSection(updated);
            }
        }
    }, [sections, viewingSection]);

    // Dynamic sidebar items with real-time total active & inactive counts
    const sidebarItems = React.useMemo(() => {
        const totalAll = activeTab === "trash" ? total : (statusCounts.all || total);
        const totalActive = statusCounts.active;
        const totalInactive = statusCounts.inactive;

        return (cmsSidebarData.items || []).map((item) => {
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
                icon: "Layers",
                count: countVal,
            };
        });
    }, [statusCounts, total, activeTab]);

    // Handlers for search and filters
    const handleSearchChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.target?.value ?? "");
        setSearchQuery(next);
        setCurrentPage(1);
        setSelectedCmsIds([]);
    }, []);

    const handleStatusFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(next);
        setSelectedCategory(next === "Active" ? "Active" : next === "Inactive" ? "Inactive" : "All Sections");
        setCurrentPage(1);
        setSelectedCmsIds([]);
    }, []);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setSearchQuery("");
        setSelectedCategory("All Sections");
        setCurrentPage(1);
        setSelectedCmsIds([]);
        showToast("CMS filters reset", "info");
    }, []);

    // Sidebar navigation
    const handleSidebarItemClick = React.useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        setSelectedCmsIds([]);
        const item = (cmsSidebarData.items || []).find((i) => i.name === name);
        const nextStatus = item?.status || "all";
        setStatusFilter(nextStatus);
    }, []);

    // Tab navigation (All Sections vs Trash)
    const handleTabChange = React.useCallback((tabValue) => {
        const next = typeof tabValue === "string" ? tabValue : (tabValue?.value || "all");
        setActiveTab(next);
        setCurrentPage(1);
        setSelectedCmsIds([]);
        if (next === "trash") {
            setSelectedCategory("Trash");
            setStatusFilter("all");
        } else {
            setSelectedCategory("All Sections");
        }
    }, []);

    // Checkbox multi-select handlers
    const isAllSelected = React.useMemo(() => {
        if (!sections || !sections.length) return false;
        return sections.every((c) => {
            const id = c.id || c._id;
            return selectedCmsIds.includes(id) || (c._id && selectedCmsIds.includes(c._id));
        });
    }, [sections, selectedCmsIds]);

    const handleSelectAll = React.useCallback((checked) => {
        const next = typeof checked === "boolean" ? checked : !isAllSelected;
        if (next) {
            const allIds = (sections || []).map((c) => c.id || c._id);
            setSelectedCmsIds(allIds);
        } else {
            setSelectedCmsIds([]);
        }
    }, [sections, isAllSelected]);

    const handleSelectRow = React.useCallback((id, row) => {
        const targetId = row?.id || id;
        setSelectedCmsIds((prev) => {
            const exists = prev.includes(targetId) || (row?._id && prev.includes(row._id));
            if (exists) {
                return prev.filter((x) => x !== targetId && x !== row?._id);
            }
            return [...prev, targetId];
        });
    }, []);

    // Action handlers for CMS rows
    const handleViewCms = React.useCallback((row) => {
        setViewingSection(row);
        setIsViewModalOpen(true);
    }, []);

    const handleOpenAddModal = React.useCallback(() => {
        setEditingSection(null);
        setIsSectionModalOpen(true);
    }, []);

    const handleEditCms = React.useCallback((row) => {
        setEditingSection(row);
        setIsSectionModalOpen(true);
    }, []);

    const handleDeleteCms = React.useCallback(
        async (row) => {
            const secId = row.id || row._id;
            const isTrash = activeTab === "trash" || row.isDeleted;
            try {
                await deleteCms(secId, isTrash).unwrap();
                showToast(
                    `CMS section "${row.sectionName || row.title}" ${isTrash ? "permanently removed!" : "moved to trash!"}`,
                    "success"
                );
                setSelectedCmsIds((prev) => prev.filter((x) => x !== secId && x !== row.id && x !== row._id));
                fetchCmsData();
                fetchStatusCounts();
            } catch (err) {
                showToast(err?.message || "Failed to delete CMS section", "danger");
            }
        },
        [activeTab, deleteCms, fetchCmsData, fetchStatusCounts]
    );

    const handleBulkDelete = React.useCallback(async () => {
        if (!selectedCmsIds.length) return;
        const isTrash = activeTab === "trash";
        try {
            await bulkDeleteCms(selectedCmsIds, isTrash).unwrap();
            showToast(
                `${selectedCmsIds.length} CMS section(s) ${isTrash ? "permanently removed!" : "moved to trash!"}`,
                "success"
            );
            setSelectedCmsIds([]);
            fetchCmsData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to delete selected CMS sections", "danger");
        }
    }, [selectedCmsIds, activeTab, bulkDeleteCms, fetchCmsData, fetchStatusCounts]);

    // Add / Edit Section Form submission via generic CrudForm helper
    const sectionFormFields = React.useMemo(
        () => getCmsSectionFormFields({ editingSection, userRole: currentUser }),
        [editingSection, currentUser]
    );

    const handleSaveSection = React.useCallback(
        async (formData) => {
            const payload = {
                sectionName: formData.sectionName.trim(),
                isActive: sanitizeCrudFormData(formData, { userRole: currentUser, isEditing: Boolean(editingSection) }).isActive,
            };

            if (currentUser?.id || currentUser?._id) {
                payload.createdBy = currentUser.id || currentUser._id;
            }

            try {
                if (editingSection) {
                    await updateCms(editingSection.id || editingSection._id, payload).unwrap();
                    showToast(`CMS section "${payload.sectionName}" updated successfully!`, "success");
                } else {
                    await createCms(payload).unwrap();
                    showToast(`CMS section "${payload.sectionName}" created successfully!`, "success");
                }
                setIsSectionModalOpen(false);
                setEditingSection(null);
                fetchCmsData();
                fetchStatusCounts();
            } catch (err) {
                showToast(err?.message || "Failed to save CMS section", "danger");
            }
        },
        [editingSection, currentUser, updateCms, createCms, fetchCmsData, fetchStatusCounts]
    );

    // CMS Item (cmsData) Handlers inside a Section
    const handleOpenAddItem = React.useCallback((section) => {
        setTargetSectionForItem(section);
        setEditingItem(null);
        setSelectedItemType("text");
        setIsItemModalOpen(true);
    }, []);

    const handleOpenEditItem = React.useCallback((section, item) => {
        setTargetSectionForItem(section);
        setEditingItem(item);
        setSelectedItemType(item.type || "text");
        setIsItemModalOpen(true);
    }, []);

    const handleDeleteItem = React.useCallback(
        async (section, cmsId) => {
            if (!section || !cmsId) return;
            const secId = section.id || section._id;
            try {
                const updated = await deleteCmsItem(secId, cmsId).unwrap();
                showToast(`Content item "${cmsId}" removed successfully!`, "success");
                if (updated) {
                    setViewingSection(updated);
                }
                fetchCmsData();
                fetchStatusCounts();
            } catch (err) {
                showToast(err?.message || "Failed to remove content item", "danger");
            }
        },
        [deleteCmsItem, fetchCmsData, fetchStatusCounts]
    );

    const itemFormFields = React.useMemo(
        () => getCmsItemFormFields({
            editingItem,
            selectedItemType,
            onItemTypeChange: (val) => {
                const next = typeof val === "string" ? val : (val?.value || "text");
                setSelectedItemType(next);
            },
            itemTypeOptions: ITEM_TYPES,
        }),
        [editingItem, selectedItemType]
    );

    const handleSaveItem = React.useCallback(
        async (formData) => {
            if (!targetSectionForItem) return;
            const secId = targetSectionForItem.id || targetSectionForItem._id;

            const itemType = formData.type || selectedItemType || "text";
            const payload = {
                cmsId: formData.cmsId.trim(),
                type: itemType,
                label: formData.label ? formData.label.trim() : "",
            };

            if (itemType === "text") {
                payload.text = formData.text || "";
            } else if (itemType === "image") {
                payload.image = {
                    url: formData.imageUrl?.trim() || "",
                    alt: formData.imageAlt?.trim() || "",
                };
            } else if (itemType === "array") {
                try {
                    payload.data = formData.arrayData ? JSON.parse(formData.arrayData) : [];
                } catch {
                    payload.data = formData.arrayData
                        ? formData.arrayData.split("\n").map((s) => s.trim()).filter(Boolean)
                        : [];
                }
            }

            try {
                const updated = await addOrUpdateCmsItem(secId, payload).unwrap();
                showToast(`Content item "${payload.cmsId}" saved successfully!`, "success");
                setIsItemModalOpen(false);
                setEditingItem(null);
                setTargetSectionForItem(null);
                if (updated) {
                    setViewingSection(updated);
                }
                fetchCmsData();
                fetchStatusCounts();
            } catch (err) {
                showToast(err?.message || "Failed to save content item", "danger");
            }
        },
        [targetSectionForItem, selectedItemType, addOrUpdateCmsItem, fetchCmsData, fetchStatusCounts]
    );

    const hasActiveFilters = React.useMemo(
        () => statusFilter !== "all" || Boolean(searchQuery.trim()) || activeTab !== "all",
        [statusFilter, searchQuery, activeTab]
    );

    const filterInputsNode = React.useMemo(
        () => (
            <FilterForm
                fields={[
                    {
                        type: "select",
                        label: "Publish Status",
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
            <div className="flex items-center gap-8">
                {selectedCmsIds.length > 0 && (
                    <Button
                        text={`${activeTab === "trash" ? "Delete Permanently" : "Move to Trash"} (${selectedCmsIds.length})`}
                        version="v2"
                        bg="danger"
                        color="white"
                        icon="Trash"
                        onClick={handleBulkDelete}
                    />
                )}
                <Button
                    text="Add Section"
                    version="v2"
                    bg="primary"
                    variant="outline"
                    border="primary"
                    color="white"
                    icon="Plus"
                    onClick={handleOpenAddModal}
                    title="Create a new website CMS section"
                />
            </div>
        ),
        [selectedCmsIds, activeTab, handleBulkDelete, handleOpenAddModal]
    );

    const tableSubtitle = React.useMemo(() => {
        if (activeTab === "trash") {
            return "Archived website content sections in trash";
        }
        return "Live inventory of website content blocks, promotional banners, and marketing copy";
    }, [activeTab]);

    return (
        <MainLayout
            sidebarTitle={cmsSidebarData.title || "Section Status"}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Layers" width="18" height="18" />}
            headerTitle="Content Management (CMS)"
            headerSub="Manage website promotional banners, dynamic homepage sections, and marketing campaigns"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS.cms || TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter CMS sections by publication status, keywords, or section name"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <div className="bg-white p-14 rounded-10">
                <Table
                    title="Website Content Blocks"
                    subtitle={tableSubtitle}
                    data={sections}
                    columns={cmsTableColumns}
                    totalItems={total}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={(p) => {
                        setCurrentPage(p);
                        setSelectedCmsIds([]);
                    }}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search CMS by section name, ID, or content..."
                    itemName="sections"
                    collapsible={true}
                    maxVisibleColumns={5}
                    minWidth="1050px"
                    loading={loading}
                    selectedRows={selectedCmsIds}
                    onSelectRow={handleSelectRow}
                    onSelectAll={handleSelectAll}
                    onView={handleViewCms}
                    onEdit={handleEditCms}
                    onDelete={handleDeleteCms}
                    viewTitle="View Section Details & Items"
                    editTitle="Edit CMS Section"
                    deleteTitle={activeTab === "trash" ? "Permanently Delete Section" : "Move to Trash"}
                />
            </div>

            {/* Modal: Add / Edit CMS Section */}
            <Modal
                isOpen={isSectionModalOpen}
                onClose={() => {
                    setIsSectionModalOpen(false);
                    setEditingSection(null);
                }}
                title={editingSection ? `Edit Section: ${editingSection.sectionName || editingSection.title}` : "Add New CMS Section"}
                size="sm"
                type="sidebar"
                placement="right"
                footer={null}
            >
                <div className="p-16">
                    <FormBuilder
                        key={editingSection ? (editingSection.id || editingSection._id) : "new-section"}
                        fields={sectionFormFields}
                        submitType="json"
                        onSubmit={handleSaveSection}
                        submitText={editingSection ? "Update Section" : "Create Section"}
                        col="1"
                    />

                    {editingSection && (
                        <div className="mt-20 pt-16 border-t border-ec">
                            <div className="flex items-center justify-between mb-12">
                                <h5 className="font-600 text-dark font-14">Section Content Items</h5>
                                <Button
                                    text="Add Item"
                                    version="v2"
                                    bg="primary"
                                    color="white"
                                    icon="Plus"
                                    size="sm"
                                    onClick={() => handleOpenAddItem(editingSection)}
                                />
                            </div>
                            {(!editingSection.cmsData || editingSection.cmsData.length === 0) ? (
                                <p className="text-gray font-12 italic">No content items in this section yet. Click &quot;Add Item&quot; to attach text, image, or dataset.</p>
                            ) : (
                                <div className="flex flex-col gap-8">
                                    {editingSection.cmsData.map((item, idx) => (
                                        <div
                                            key={item.cmsId || idx}
                                            className="flex items-center justify-between p-8 bg-forth rounded-5 border border-ec font-12"
                                        >
                                            <div>
                                                <span className="font-600 text-dark">{item.cmsId}</span>
                                                <span className="ml-6 px-6 py-2 bg-light-primary text-primary rounded-4 font-10 uppercase">
                                                    {item.type}
                                                </span>
                                                {item.label && <span className="ml-6 text-gray">({item.label})</span>}
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <button
                                                    type="button"
                                                    className="px-6 py-2 text-primary hover:underline"
                                                    onClick={() => handleOpenEditItem(editingSection, item)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="px-6 py-2 text-danger hover:underline"
                                                    onClick={() => handleDeleteItem(editingSection, item.cmsId)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Modal>

            {/* Modal: View Section Details & CMS Data Items */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => {
                    setIsViewModalOpen(false);
                    setViewingSection(null);
                }}
                title={viewingSection ? `Section Preview: ${viewingSection.sectionName || viewingSection.title}` : "CMS Section Preview"}
                size="md"
                type="sidebar"
                placement="right"
                footer={null}
            >
                {viewingSection && (
                    <div className="p-16 flex flex-col gap-16">
                        {/* Section Header Card */}
                        <div className="p-14 bg-forth rounded-8 border border-ec">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="font-600 font-16 text-dark">{viewingSection.sectionName || viewingSection.title}</h4>
                                <span className={`px-8 py-2 rounded-4 font-11 font-600 ${viewingSection.isActive ? "bg-light-success text-success" : "bg-light-danger text-danger"}`}>
                                    {viewingSection.isActive ? "ACTIVE" : "INACTIVE"}
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-12 font-12 text-secondary">
                                <div><strong className="text-dark">CMS ID:</strong> <code className="bg-white px-6 py-2 rounded border border-ec">{viewingSection.id}</code></div>
                                <div><strong className="text-dark">Items:</strong> {viewingSection.itemsCount || viewingSection.cmsData?.length || 0}</div>
                                <div><strong className="text-dark">Created By:</strong> {viewingSection.creatorName || viewingSection.author || "Admin"}</div>
                            </div>
                        </div>

                        {/* Content Items Header */}
                        <div className="flex items-center justify-between">
                            <h5 className="font-600 font-14 text-dark">
                                Configured Content Items ({viewingSection.cmsData?.length || 0})
                            </h5>
                            <Button
                                text="Add Item"
                                version="v2"
                                bg="primary"
                                color="white"
                                icon="Plus"
                                size="sm"
                                onClick={() => handleOpenAddItem(viewingSection)}
                            />
                        </div>

                        {/* Content Items List */}
                        {(!viewingSection.cmsData || viewingSection.cmsData.length === 0) ? (
                            <div className="p-20 text-center border border-dashed border-ec rounded-8">
                                <p className="text-gray font-13 mb-8">No content items configured in this section.</p>
                                <Button
                                    text="Add First Item"
                                    version="v2"
                                    bg="primary"
                                    variant="outline"
                                    border="primary"
                                    color="white"
                                    size="sm"
                                    onClick={() => handleOpenAddItem(viewingSection)}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-12">
                                {viewingSection.cmsData.map((item, idx) => (
                                    <div
                                        key={item.cmsId || idx}
                                        className="p-12 bg-white rounded-8 border border-ec shadow-sm flex flex-col gap-8"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-8">
                                                <code className="bg-forth px-6 py-2 rounded font-12 font-600 text-dark">
                                                    {item.cmsId}
                                                </code>
                                                <span className="px-6 py-2 bg-light-primary text-primary rounded-4 font-10 uppercase font-600">
                                                    {item.type}
                                                </span>
                                                {item.label && (
                                                    <span className="font-12 text-gray font-500">
                                                        {item.label}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <button
                                                    type="button"
                                                    className="px-6 py-2 text-primary hover:underline font-12"
                                                    onClick={() => handleOpenEditItem(viewingSection, item)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="px-6 py-2 text-danger hover:underline font-12"
                                                    onClick={() => handleDeleteItem(viewingSection, item.cmsId)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        {/* Render by Item Type */}
                                        {item.type === "text" && (
                                            <div className="p-8 bg-forth rounded-6 font-13 text-secondary whitespace-pre-wrap">
                                                {item.text || <em className="text-gray">Empty text content</em>}
                                            </div>
                                        )}

                                        {item.type === "image" && (
                                            <div className="flex items-center gap-12 p-8 bg-forth rounded-6">
                                                {item.image?.url ? (
                                                    <img
                                                        src={item.image.url}
                                                        alt={item.image.alt || item.label || "CMS image"}
                                                        className="w-80 h-60 object-cover rounded-6 border border-ec bg-white"
                                                    />
                                                ) : (
                                                    <div className="w-80 h-60 flex items-center justify-center bg-gray-200 rounded-6 text-gray font-10">
                                                        No Image
                                                    </div>
                                                )}
                                                <div className="flex flex-col gap-4 font-12 text-secondary overflow-hidden">
                                                    <span className="truncate"><strong>URL:</strong> {item.image?.url || "—"}</span>
                                                    <span><strong>Alt:</strong> {item.image?.alt || "—"}</span>
                                                </div>
                                            </div>
                                        )}

                                        {item.type === "array" && (
                                            <div className="p-8 bg-forth rounded-6 font-12">
                                                {Array.isArray(item.data) && item.data.length > 0 ? (
                                                    <div className="flex flex-wrap gap-6">
                                                        {item.data.map((arrItem, aIdx) => (
                                                            <span
                                                                key={aIdx}
                                                                className="px-8 py-4 bg-white border border-ec rounded-4 text-dark font-11"
                                                            >
                                                                {typeof arrItem === "object" ? JSON.stringify(arrItem) : String(arrItem)}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <pre className="text-secondary font-11 overflow-x-auto m-0">
                                                        {JSON.stringify(item.data, null, 2)}
                                                    </pre>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </Modal>

            {/* Modal: Add / Edit Single CMS Data Item */}
            <Modal
                isOpen={isItemModalOpen}
                onClose={() => {
                    setIsItemModalOpen(false);
                    setEditingItem(null);
                    setTargetSectionForItem(null);
                }}
                title={
                    editingItem
                        ? `Edit Item: ${editingItem.cmsId} in ${targetSectionForItem?.sectionName || targetSectionForItem?.title || "Section"}`
                        : `Add Content Item to ${targetSectionForItem?.sectionName || targetSectionForItem?.title || "Section"}`
                }
                size="sm"
                type="sidebar"
                placement="right"
                footer={null}
            >
                <div className="p-16">
                    <FormBuilder
                        key={editingItem ? (editingItem.cmsId || "edit-item") : `new-item-${selectedItemType}`}
                        fields={itemFormFields}
                        submitType="json"
                        onSubmit={handleSaveItem}
                        submitText={editingItem ? "Update Item" : "Save Item"}
                        col="1"
                    />
                </div>
            </Modal>
        </MainLayout>
    );
};

export default React.memo(Cms);