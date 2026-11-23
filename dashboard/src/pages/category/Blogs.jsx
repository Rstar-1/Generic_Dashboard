import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import FilterForm from "../../components/forms/sections/FilterForm";
import Modal from "../../components/common/Modal";
import FormBuilder from "../../components/forms/FormBuilder";
import { getBlogCategoryFormFields, sanitizeCrudFormData } from "../../components/forms/sections/CrudForm";
import { showToast } from "../../components/common/Toast";
import {
    blogCategoriesSidebarData,
    blogCategoriesTableColumns,
    STATUS_OPTIONS,
    TABS,
} from "../../utils/apiData";
import { useCurrentUser } from "../../utils";
import { useBlogCategories } from "../../feature/blogCategorySlice";
import { getBlogCategoriesApi } from "../../api/blogCategoryApi";

const ITEMS_PER_PAGE = 5;

const CategoryBlogs = () => {
    const { user: currentUser } = useCurrentUser();
    const {
        categories,
        total,
        loading,
        getBlogCategories,
        addBlogCategory,
        editBlogCategory,
        removeBlogCategory,
        bulkRemoveBlogCategories,
    } = useBlogCategories();

    const [activeTab, setActiveTab] = React.useState("all");
    const [selectedCategory, setSelectedCategory] = React.useState("All Categories");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedCategoryIds, setSelectedCategoryIds] = React.useState([]);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingCategory, setEditingCategory] = React.useState(null);

    // Fetch categories with backend query parameters
    const fetchCategoryData = React.useCallback(() => {
        const params = {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            isDeleted: activeTab === "trash",
        };

        const trimmed = searchQuery.trim();
        if (trimmed) params.search = trimmed;

        if (statusFilter !== "all") {
            params.isActive = statusFilter === "Active";
        }

        getBlogCategories(params);
    }, [currentPage, activeTab, searchQuery, statusFilter, getBlogCategories]);

    React.useEffect(() => {
        fetchCategoryData();
    }, [fetchCategoryData]);

    const [statusCounts, setStatusCounts] = React.useState({
        all: 0,
        active: 0,
        inactive: 0,
    });

    const fetchStatusCounts = React.useCallback(async () => {
        try {
            const [allRes, activeRes, inactiveRes] = await Promise.all([
                getBlogCategoriesApi({ isDeleted: false, page: 1, limit: 1 }),
                getBlogCategoriesApi({ isDeleted: false, isActive: true, page: 1, limit: 1 }),
                getBlogCategoriesApi({ isDeleted: false, isActive: false, page: 1, limit: 1 }),
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
        setSelectedCategoryIds([]);
    }, []);

    const handleStatusFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(next);
        setSelectedCategory(next === "Active" ? "Active" : next === "Inactive" ? "Inactive" : "All Categories");
        setCurrentPage(1);
        setSelectedCategoryIds([]);
    }, []);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setSearchQuery("");
        setSelectedCategory("All Categories");
        setCurrentPage(1);
        setSelectedCategoryIds([]);
        showToast("Category filters reset", "info");
    }, []);

    // Sidebar navigation
    const handleSidebarItemClick = React.useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        setSelectedCategoryIds([]);
        const item = blogCategoriesSidebarData.items.find((i) => i.name === name);
        const nextStatus = item?.status || "all";
        setStatusFilter(nextStatus);
    }, []);

    const handleTabChange = React.useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        setSelectedCategoryIds([]);
        if (tabValue === "trash") {
            setSelectedCategory("Trash");
            setStatusFilter("all");
        } else {
            setSelectedCategory("All Categories");
        }
    }, []);

    // Selection handlers for bulk operations
    const isAllSelected = React.useMemo(() => {
        if (!categories.length) return false;
        return categories.every((c) => {
            const id = c.id || c._id;
            return selectedCategoryIds.includes(id) || (c._id && selectedCategoryIds.includes(c._id));
        });
    }, [categories, selectedCategoryIds]);

    const handleSelectAll = React.useCallback((checked) => {
        const next = typeof checked === "boolean" ? checked : !isAllSelected;
        if (next) {
            const allIds = categories.map((c) => c.id || c._id);
            setSelectedCategoryIds(allIds);
        } else {
            setSelectedCategoryIds([]);
        }
    }, [categories, isAllSelected]);

    const handleSelectRow = React.useCallback((id, row) => {
        const targetId = row?.id || id;
        setSelectedCategoryIds((prev) => {
            const exists = prev.includes(targetId) || (row?._id && prev.includes(row._id));
            if (exists) {
                return prev.filter((x) => x !== targetId && x !== row?._id);
            }
            return [...prev, targetId];
        });
    }, []);

    // Actions
    const handleViewCategory = React.useCallback((row) => {
        const name = row.name || row.categoryName || "Category";
        showToast(`Category: ${name} (${row.id || "N/A"}) - ${row.articlesCount ?? row.count ?? 0} articles`, "info");
    }, []);

    const handleEditCategory = React.useCallback((row) => {
        setEditingCategory(row);
        setIsModalOpen(true);
    }, []);

    const handleDeleteCategory = React.useCallback(async (row) => {
        const id = row.id || row._id;
        const catName = row.name || row.categoryName || "Category";
        try {
            await removeBlogCategory(id);
            if (activeTab === "trash") {
                showToast(`Category "${catName}" permanently removed!`, "success");
            } else {
                showToast(`Category "${catName}" moved to trash!`, "success");
            }
            fetchCategoryData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to delete blog category", "danger");
        }
    }, [activeTab, removeBlogCategory, fetchCategoryData, fetchStatusCounts]);

    const handleBulkDelete = React.useCallback(async () => {
        if (!selectedCategoryIds.length) return;
        try {
            await bulkRemoveBlogCategories({
                ids: selectedCategoryIds,
                permanent: activeTab === "trash",
            });
            if (activeTab === "trash") {
                showToast(`${selectedCategoryIds.length} category(s) permanently removed!`, "success");
            } else {
                showToast(`${selectedCategoryIds.length} category(s) moved to trash!`, "success");
            }
            setSelectedCategoryIds([]);
            fetchCategoryData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to bulk delete categories", "danger");
        }
    }, [selectedCategoryIds, activeTab, bulkRemoveBlogCategories, fetchCategoryData, fetchStatusCounts]);

    // Modal Form Fields via generic CrudForm helper
    const formFields = React.useMemo(() => getBlogCategoryFormFields({ editingCategory, userRole: currentUser }), [editingCategory, currentUser]);

    const handleFormSubmit = React.useCallback(async (formData) => {
        if (!formData.categoryName?.trim()) {
            showToast("Category name is required", "warning");
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
            categoryName: formData.categoryName.trim(),
            isActive: sanitizeCrudFormData(formData, { userRole: currentUser, isEditing: Boolean(editingCategory) }).isActive,
        };

        if (activeCreatorId) {
            payload.createdBy = activeCreatorId;
        }

        try {
            if (editingCategory) {
                const targetId = editingCategory.id || editingCategory._id;
                if (editingCategory.createdBy) {
                    payload.createdBy =
                        typeof editingCategory.createdBy === "object"
                            ? (editingCategory.createdBy._id || editingCategory.createdBy.id || activeCreatorId)
                            : (editingCategory.createdBy || activeCreatorId);
                }
                await editBlogCategory(targetId, payload);
                showToast(`Category "${payload.categoryName}" updated successfully!`, "success");
            } else {
                await addBlogCategory(payload);
                showToast(`Category "${payload.categoryName}" created successfully!`, "success");
            }
            setIsModalOpen(false);
            setEditingCategory(null);
            fetchCategoryData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to save category", "danger");
        }
    }, [editingCategory, editBlogCategory, addBlogCategory, fetchCategoryData, fetchStatusCounts, currentUser]);

    // Sidebar items with dynamic total counts
    const sidebarItems = React.useMemo(() => {
        const totalAll = activeTab === "trash" ? total : (statusCounts.all || total);
        const totalActive = statusCounts.active;
        const totalInactive = statusCounts.inactive;

        return blogCategoriesSidebarData.items.map((item) => {
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
                icon: "Clipboard",
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
                        label: "Category Status",
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
                {selectedCategoryIds.length > 0 && (
                    <Button
                        text={`Delete (${selectedCategoryIds.length})`}
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
                    text="Add Category"
                    version="v2"
                    bg="primary"
                    variant="outline"
                    border="primary"
                    color="white"
                    icon="Plus"
                    onClick={() => {
                        setEditingCategory(null);
                        setIsModalOpen(true);
                    }}
                />
            </div>
        ),
        [selectedCategoryIds, handleBulkDelete]
    );

    return (
        <MainLayout
            sidebarTitle={blogCategoriesSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Clipboard" width="18" height="18" />}
            headerTitle="Blog Categories"
            headerSub="Manage content categories, editorial tags, and article group classifications"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS.blogCategories || TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter categories by status, category code, or keyword search"
            filterInputs={filterInputsNode}
            hasActiveFilters={statusFilter !== "all" || Boolean(searchQuery.trim()) || activeTab !== "all"}
            onClearAllFilters={handleClearFilters}
        >
            <div className="bg-white p-14 rounded-10">
                <Table
                    title="Blog Category Hierarchy"
                    subtitle={
                        activeTab === "trash"
                            ? "Archived blog categories in trash"
                            : "Complete list of blog categories with article counts and publication statuses"
                    }
                    data={categories}
                    columns={blogCategoriesTableColumns}
                    totalItems={total}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={(p) => {
                        setCurrentPage(p);
                        setSelectedCategoryIds([]);
                    }}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search by category name or ID..."
                    itemName="blogcategory"
                    collapsible={true}
                    maxVisibleColumns={4}
                    minWidth="1050px"
                    loading={loading}
                    selectedRows={selectedCategoryIds}
                    onSelectRow={handleSelectRow}
                    onSelectAll={handleSelectAll}
                    onView={handleViewCategory}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                    viewTitle="View Category Details"
                    editTitle="Edit Category"
                    deleteTitle={activeTab === "trash" ? "Permanently Delete Category" : "Delete Category"}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                }}
                title={
                    editingCategory
                        ? `Edit Blog Category: ${editingCategory.categoryName || editingCategory.name}`
                        : "Add New Blog Category"
                }
                size="sm"
                type="sidebar"
                placement="right"
                footer={null}
            >
                <FormBuilder
                    key={editingCategory ? (editingCategory.id || editingCategory._id) : "new-category"}
                    fields={formFields}
                    submitType="json"
                    onSubmit={handleFormSubmit}
                    submitText={editingCategory ? "Update Category" : "Save Category"}
                    col="1"
                />
            </Modal>
        </MainLayout>
    );
};

export default React.memo(CategoryBlogs);
