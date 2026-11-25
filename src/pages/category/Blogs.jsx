import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import { getBlogCategoryFormFields } from "../../components/forms/sections/CrudForm";
import { blogCategoriesSidebarData, blogCategoriesTableColumns, TABS } from "../../utils/apiData";
import { useBlogCategories } from "../../feature/blogCategorySlice";

const CategoryBlogs = () => {
    const {
        categories,
        total,
        counts,
        loading,
        getBlogCategories,
        addBlogCategory,
        editBlogCategory,
        removeBlogCategory,
        bulkRemoveBlogCategories,
    } = useBlogCategories();

    return (
        <MainLayout
            entityName="Blog Category"
            itemName="blogcategory"
            headerTitle="Blog Categories"
            headerSub="Manage content categories, editorial tags, and article group classifications"
            headerIcon="Clipboard"
            sidebarData={blogCategoriesSidebarData}
            sidebarCounts={counts || { all: total }}
            tabs={TABS.blogCategories || TABS}
            tableTitle="Blog Category Hierarchy"
            tableSubtitle="Complete list of blog categories with article counts and publication statuses"
            columns={blogCategoriesTableColumns}
            data={categories}
            total={total}
            loading={loading}
            onFetch={getBlogCategories}
            onAdd={addBlogCategory}
            onEdit={editBlogCategory}
            onDelete={removeBlogCategory}
            onBulkDelete={bulkRemoveBlogCategories}
            getFormFields={getBlogCategoryFormFields}
            maxVisibleColumns={4}
        />
    );
};

export default React.memo(CategoryBlogs);
