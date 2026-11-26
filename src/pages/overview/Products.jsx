import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import { productsSidebarData, productsTableColumns, TABS } from "../../utils/apiData";
import { useProducts } from "../../feature/productSlice";

const OverviewProducts = () => {
    const {
        products,
        total,
        counts,
        loading,
        getProducts,
        addProduct,
        editProduct,
        removeProduct,
        bulkRemoveProducts,
        addReview,
        removeReview,
    } = useProducts();

    return (
        <MainLayout
            entityName="Product"
            itemName="products"
            headerTitle="Products Overview"
            headerSub="Manage e-commerce inventory, pricing, catalog hierarchy, and customer reviews"
            headerIcon="Package"
            sidebarData={productsSidebarData}
            sidebarCounts={counts || { all: total }}
            tabs={TABS.products || TABS}
            tableTitle="Product Catalog"
            maxVisibleColumns='6'
            formCols='2'
            modalSize='xl'
            columns={productsTableColumns}
            data={products}
            total={total}
            loading={loading}
            onFetch={getProducts}
            onAdd={addProduct}
            onEdit={editProduct}
            onDelete={removeProduct}
            onBulkDelete={bulkRemoveProducts}
            onAddReview={addReview}
            onDeleteReview={removeReview}
        />
    );
};

export default React.memo(OverviewProducts);
