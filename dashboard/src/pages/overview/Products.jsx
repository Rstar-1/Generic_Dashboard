import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import {
    productsSidebarData,
    productsTableColumns,
    productsData as initialProductsData,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Products", value: "all" }];

const STOCK_OPTIONS = [
    { label: "All Inventory Statuses", value: "all" },
    { label: "In Stock", value: "In Stock" },
    { label: "Low Stock", value: "Low Stock" },
    { label: "Out of Stock", value: "Out of Stock" },
];

const CATEGORY_OPTIONS = [
    { label: "All Categories", value: "all" },
    { label: "Standard PVC", value: "Standard PVC" },
    { label: "Polar Grade", value: "Polar Grade" },
    { label: "Brackets", value: "Brackets" },
    { label: "Anti-Insect", value: "Anti-Insect" },
    { label: "Magnetic Kit", value: "Magnetic Kit" },
    { label: "Heavy Duty", value: "Heavy Duty" },
    { label: "Welding Screen", value: "Welding Screen" },
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ status, onStatusChange, category, onCategoryChange }) => (
    <div className="grid-cols-4 gap-12">
        <Fields
            type="select"
            label="Inventory Status"
            options={STOCK_OPTIONS}
            value={status}
            onChange={onStatusChange}
        />
        <Fields
            type="select"
            label="Product Category"
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={onCategoryChange}
        />
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

const OverviewProducts = () => {
    const [products, setProducts] = useState(initialProductsData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setProducts(initialProductsData);
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
        const counts = products.reduce((acc, p) => {
            const s = p.status?.toLowerCase();
            if (s) acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});

        return productsSidebarData.items.map((item) => ({
            ...item,
            icon: "Box",
            count: item.status === "all" ? products.length : (counts[item.status?.toLowerCase()] || 0),
        }));
    }, [products]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = productsSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.status || "all");
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = productsSidebarData.items.find((i) => i.status === tabValue);
        setSelectedCategory(item ? item.name : "All Products");
    }, []);

    const handleClearFilters = useCallback(() => {
        setStatusFilter("all");
        setCategoryFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Product filters reset", "info");
    }, []);

    // Action handlers for rows
    const handleViewProduct = useCallback((row) => {
        showToast(`Viewing product specifications for ${row.title}`, "info");
    }, []);

    const handleEditProduct = useCallback((row) => {
        showToast(`Editing product ${row.sku}`, "info");
    }, []);

    const handleDeleteProduct = useCallback((row) => {
        setProducts((prev) => prev.filter((p) => p.id !== row.id));
        showToast(`Product ${row.sku} removed from catalog!`, "danger");
    }, []);

    const handleExportProducts = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(products, null, 2));
        showToast("Products catalog exported to clipboard!", "success");
    }, [products]);

    // Multi-criteria filtering
    const filteredProducts = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();
        const targetCategory = String(categoryFilter || "all").toLowerCase().trim();

        return products.filter((item) => {
            const itemStatus = String(item.status || "").toLowerCase().trim();
            const itemCategory = String(item.category || "").toLowerCase().trim();

            const matchesTab = targetTab === "all" || itemStatus === targetTab;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;
            const matchesCategory = targetCategory === "all" || itemCategory === targetCategory;

            const matchesSearch =
                !q ||
                String(item.title || "").toLowerCase().includes(q) ||
                String(item.sku || "").toLowerCase().includes(q) ||
                String(item.price || "").toLowerCase().includes(q) ||
                itemCategory.includes(q) ||
                itemStatus.includes(q);

            return matchesTab && matchesStatus && matchesCategory && matchesSearch;
        });
    }, [products, activeTab, statusFilter, categoryFilter, searchQuery]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

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
                text="Export Catalog"
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
                subtitle="Complete SKU inventory with live pricing, stock availability, and ratings"
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

export default memo(OverviewProducts);
