import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import { getProductCategoryFormFields } from "../../components/forms/sections/CrudForm";
import { productCategoriesSidebarData, productCategoriesTableColumns, TABS } from "../../utils/apiData";
import { useProductCategories } from "../../feature/productCategorySlice";

const CategoryProducts = () => {
    const {
        categories,
        total,
        counts,
        loading,
        getCategories,
        addCategory,
        editCategory,
        removeCategory,
        bulkRemoveCategories,
    } = useProductCategories();

    return (
        <MainLayout
            entityName="Product Category"
            itemName="productcategory"
            headerTitle="Product Categories"
            headerSub="Manage ecommerce product category classifications, subcategories, and catalog hierarchies"
            headerIcon="Box"
            sidebarData={productCategoriesSidebarData}
            sidebarCounts={counts || { all: total }}
            tabs={TABS.productCategories || TABS}
            tableTitle="Product Category Hierarchy"
            tableSubtitle="Complete list of product categories with subcategory counts and catalog hierarchies"
            columns={productCategoriesTableColumns}
            data={categories}
            total={total}
            loading={loading}
            onFetch={getCategories}
            onAdd={addCategory}
            onEdit={editCategory}
            onDelete={removeCategory}
            onBulkDelete={bulkRemoveCategories}
            getFormFields={getProductCategoryFormFields}
            maxVisibleColumns={5}
        />
    );
};

export default React.memo(CategoryProducts);
