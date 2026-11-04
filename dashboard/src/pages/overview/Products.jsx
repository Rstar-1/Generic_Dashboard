import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import FilterForm from "../../components/forms/sections/FilterForm";
import { showToast } from "../../components/common/Toast";
import {
    productsSidebarData,
    productsTableColumns,
    productsData as initialProductsData,
} from "../../utils/apiData";
import { getFirstValue } from "../../utils";

const ITEMS_PER_PAGE = 5;
const TABS = [
    { name: "All Products", value: "all" },
    { name: "Trash", value: "trash" },
];

const STOCK_OPTIONS = [
    { label: "All Statuses", value: "all" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
];

const CATEGORY_OPTIONS = [
    { label: "All Categories", value: "all" },
    { label: "PVC strip Curtain Rolls", value: "PVC strip Curtain Rolls" },
    { label: "Standard PVC", value: "Standard PVC" },
    { label: "Polar Grade", value: "Polar Grade" },
    { label: "Brackets", value: "Brackets" },
    { label: "Anti-Insect", value: "Anti-Insect" },
    { label: "Magnetic Kit", value: "Magnetic Kit" },
    { label: "Heavy Duty", value: "Heavy Duty" },
    { label: "Welding Screen", value: "Welding Screen" },
];

const OverviewProducts = () => {
    const [products, setProducts] = React.useState(initialProductsData);
    const [activeTab, setActiveTab] = React.useState("all");
    const [selectedCategory, setSelectedCategory] = React.useState("All Products");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [categoryFilter, setCategoryFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);

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

    const handleCategoryFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setCategoryFilter(next);
        setCurrentPage(1);
    }, []);

    const activeNonDeletedProducts = React.useMemo(
        () => products.filter((p) => !p.isDeleted),
        [products]
    );

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = React.useMemo(() => {
        const counts = activeNonDeletedProducts.reduce((acc, p) => {
            const s = p.status?.toLowerCase();
            if (s) acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});

        return productsSidebarData.items.map((item) => ({
            ...item,
            icon: "Box",
            count: item.status === "all" ? activeNonDeletedProducts.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [activeNonDeletedProducts]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = React.useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = productsSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = React.useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        if (tabValue === "trash") {
            setSelectedCategory("Trash");
        } else {
            const item = productsSidebarData.items.find((i) => i.status === tabValue);
            setSelectedCategory(item ? item.name : "All Products");
        }
    }, []);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setCategoryFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Product filters reset", "info");
    }, []);

    // Action handlers for rows
    const handleViewProduct = React.useCallback((row) => {
        const prodName = getFirstValue(row, ["name", "title"], "Product");
        showToast(`Viewing product specifications for ${prodName}`, "info");
    }, []);

    const handleEditProduct = React.useCallback((row) => {
        const prodLabel = getFirstValue(row, ["name", "sku", "id"], "Product");
        showToast(`Editing product ${prodLabel}`, "info");
    }, []);

    const handleDeleteProduct = React.useCallback((row) => {
        const prodLabel = getFirstValue(row, ["name", "sku", "id"], "Product");
        if (activeTab === "trash") {
            setProducts((prev) => prev.filter((p) => p.id !== row.id));
            showToast(`Product ${prodLabel} permanently removed!`, "danger");
        } else {
            setProducts((prev) => prev.map((p) => (p.id === row.id ? { ...p, isDeleted: true } : p)));
            showToast(`Product ${prodLabel} moved to trash!`, "danger");
        }
    }, [activeTab]);

    const handleExportProducts = React.useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(products, null, 2));
        showToast("Products catalog exported to clipboard!", "success");
    }, [products]);

    // Multi-criteria filtering
    const filteredProducts = React.useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetCategory = String(categoryFilter || "all").toLowerCase().trim();

        return products.filter((item) => {
            const isItemDeleted = Boolean(item.isDeleted);
            if (activeTab === "trash") {
                if (!isItemDeleted) return false;
            } else {
                if (isItemDeleted) return false;
            }

            const itemStatus = String(item.status || (item.inStock ? "In Stock" : "Out of Stock")).toLowerCase().trim();
            const itemCategory = String(item.category || "").toLowerCase().trim();

            const matchesTab = targetTab === "all" || targetTab === "trash" || itemStatus === targetTab;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesCategory = targetCategory === "all" || itemCategory === targetCategory;

            const matchesSearch =
                !q ||
                String(getFirstValue(item, ["name", "title"])).toLowerCase().includes(q) ||
                String(getFirstValue(item, ["sku", "subCategory", "type", "vendor", "brand"])).toLowerCase().includes(q) ||
                String(getFirstValue(item, ["priceFormatted", "price"])).toLowerCase().includes(q) ||
                itemCategory.includes(q) ||
                itemStatus.includes(q);

            return matchesTab && matchesStatus && matchesCategory && matchesSearch;
        });
    }, [products, activeTab, statusFilter, categoryFilter, searchQuery]);

    const paginatedProducts = React.useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    const tableSubtitle = React.useMemo(() => {
        if (activeTab === "trash") {
            return "Archived and removed products in trash";
        }
        return "Complete SKU inventory with live pricing, stock availability, and ratings";
    }, [activeTab]);

    const hasActiveFilters = React.useMemo(
        () => statusFilter !== "all" || categoryFilter !== "all" || Boolean(searchQuery.trim()),
        [statusFilter, categoryFilter, searchQuery]
    );

    const filterInputsNode = React.useMemo(
        () => (
            <FilterForm
                fields={[
                    {
                        type: "select",
                        label: "Product Status",
                        options: STOCK_OPTIONS,
                        value: statusFilter,
                        onChange: handleStatusFilterChange,
                    },
                    {
                        type: "select",
                        label: "Product Category",
                        options: CATEGORY_OPTIONS,
                        value: categoryFilter,
                        onChange: handleCategoryFilterChange,
                    },
                ]}
            />
        ),
        [statusFilter, handleStatusFilterChange, categoryFilter, handleCategoryFilterChange]
    );

    const quickActionNode = React.useMemo(
        () => (
            <Button
                text="Add Products"
                version="v2"
                bg="primary"
                variant="outline"
                border="primary"
                color="white"
                icon="File"
                onClick={handleExportProducts}
                title="Download product inventory dataset"
            />
        ),
        [handleExportProducts]
    );

    return (
        <MainLayout
            sidebarTitle={productsSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Box" width="18" height="18" />}
            headerTitle="Products Overview"
            headerSub="Live product master catalog with stock levels, SKUs, pricing tiers, and rating metrics"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter products by inventory status, product category, or search keywords"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <Table
                title="Product Master Catalog"
                subtitle={tableSubtitle}
                data={paginatedProducts}
                columns={productsTableColumns}
                totalItems={filteredProducts.length}
                itemsPerPage={ITEMS_PER_PAGE}
                page={currentPage}
                onPageChange={setCurrentPage}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search by product name, SKU, price, or category..."
                itemName="products"
                collapsible={true}
                maxVisibleColumns={5}
                minWidth="1100px"
                onView={handleViewProduct}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                viewTitle="View Product Details"
                editTitle="Edit Product Info"
                deleteTitle="Remove Product"
            />
        </MainLayout>
    );
};

export default React.memo(OverviewProducts);
