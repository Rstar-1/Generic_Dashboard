import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import FilterForm from "../../components/forms/sections/FilterForm";
import { showToast } from "../../components/common/Toast";
import {
    productCategoriesSidebarData,
    productCategoriesTableColumns,
    productCategoriesData as initialCategoriesData,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Categories", value: "all" }];

const STATUS_OPTIONS = [
    { label: "All Statuses", value: "all" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
];

const CODE_OPTIONS = [
    { label: "All Category Codes", value: "all" },
    ...initialCategoriesData.map((c) => ({
        label: `${c.categoryCode} - ${c.name}`,
        value: c.categoryCode,
    })),
];

const CategoryProducts = () => {
    const [categories, setCategories] = React.useState(initialCategoriesData);
    const [activeTab, setActiveTab] = React.useState("all");
    const [selectedCategory, setSelectedCategory] = React.useState("All Categories");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [codeFilter, setCodeFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);

    React.useEffect(() => {
        setCategories(initialCategoriesData);
    }, []);

    const handleSearchChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.target?.value ?? "");
        setSearchQuery(next);
        setCurrentPage(1);
    }, []);

    const handleStatusFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(next);
        setCurrentPage(1);
    }, []);

    const handleCodeFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setCodeFilter(next);
        setCurrentPage(1);
    }, []);

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = React.useMemo(() => {
        const counts = categories.reduce((acc, cat) => {
            const s = cat.status?.toLowerCase();
            if (s) acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});

        return productCategoriesSidebarData.items.map((item) => ({
            ...item,
            icon: "Box",
            count: item.status === "all" ? categories.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [categories]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = React.useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = productCategoriesSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = React.useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = productCategoriesSidebarData.items.find((i) => i.status === tabValue);
        setSelectedCategory(item ? item.name : "All Categories");
    }, []);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setCodeFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Category filters reset", "info");
    }, []);

    // Action handlers for rows
    const handleViewCategory = React.useCallback((row) => {
        showToast(`Viewing category details for ${row.name}`, "info");
    }, []);

    const handleEditCategory = React.useCallback((row) => {
        showToast(`Editing category ${row.name}`, "info");
    }, []);

    const handleDeleteCategory = React.useCallback((row) => {
        setCategories((prev) => prev.filter((c) => c.id !== row.id));
        showToast(`Category ${row.name} removed!`, "danger");
    }, []);

    const handleExportCategories = React.useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(categories, null, 2));
        showToast("Product categories exported to clipboard!", "success");
    }, [categories]);

    // Multi-criteria filtering
    const filteredCategories = React.useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetCode = String(codeFilter || "all").toLowerCase().trim();

        return categories.filter((item) => {
            const itemStatus = String(item.status || "").toLowerCase().trim();
            const itemCode = String(item.categoryCode || "").toLowerCase().trim();

            const matchesTab = targetTab === "all" || itemStatus === targetTab;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesCode = targetCode === "all" || itemCode === targetCode;

            const matchesSearch =
                !q ||
                String(item.name || "").toLowerCase().includes(q) ||
                String(item.slug || "").toLowerCase().includes(q) ||
                itemCode.includes(q) ||
                itemStatus.includes(q);

            return matchesTab && matchesStatus && matchesCode && matchesSearch;
        });
    }, [categories, activeTab, statusFilter, codeFilter, searchQuery]);

    const paginatedCategories = React.useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCategories.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredCategories, currentPage]);

    const hasActiveFilters = React.useMemo(
        () => statusFilter !== "all" || codeFilter !== "all" || Boolean(searchQuery.trim()),
        [statusFilter, codeFilter, searchQuery]
    );

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
                    {
                        type: "select",
                        label: "Category Code",
                        options: CODE_OPTIONS,
                        value: codeFilter,
                        onChange: handleCodeFilterChange,
                    },
                ]}
            />
        ),
        [statusFilter, handleStatusFilterChange, codeFilter, handleCodeFilterChange]
    );

    const quickActionNode = React.useMemo(
        () => (
            <Button
                text="Add Category"
                version="v2"
                bg="primary"
                variant="outline"
                border="primary"
                color="white"
                icon="File"
                onClick={handleExportCategories}
                title="Export product category catalog"
            />
        ),
        [handleExportCategories]
    );

    return (
        <MainLayout
            sidebarTitle={productCategoriesSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Box" width="18" height="18" />}
            headerTitle="Product Categories"
            headerSub="Manage ecommerce product category classifications, subcategories, and catalog hierarchies"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter categories by status, category code, or keyword"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <Table
                title="Product Category Hierarchy"
                subtitle="Complete list of product categories with subcategory counts and catalog statuses"
                data={paginatedCategories}
                columns={productCategoriesTableColumns}
                totalItems={filteredCategories.length}
                itemsPerPage={ITEMS_PER_PAGE}
                page={currentPage}
                onPageChange={setCurrentPage}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search by category name, slug, or code..."
                itemName="productcategory"
                collapsible={true}
                maxVisibleColumns={5}
                minWidth="1050px"
                onView={handleViewCategory}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                viewTitle="View Category Details"
                editTitle="Edit Category"
                deleteTitle="Delete Category"
            />
        </MainLayout>
    );
};

export default React.memo(CategoryProducts);
