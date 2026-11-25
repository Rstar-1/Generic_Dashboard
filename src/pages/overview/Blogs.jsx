import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import { blogsSidebarData, blogsTableColumns, TABS } from "../../utils/apiData";
import { useBlogs } from "../../feature/blogSlice";

const OverviewBlogs = () => {
    const {
        blogs,
        total,
        counts,
        loading,
        getBlogs,
        addBlog,
        editBlog,
        removeBlog,
        bulkRemoveBlogs,
        addReview,
        deleteReview,
    } = useBlogs();

    return (
        <MainLayout
            entityName="Blog"
            itemName="blogs"
            headerTitle="Blogs Overview"
            headerSub="Manage editorial articles, knowledge base insights, and reader comments"
            headerIcon="FileText"
            sidebarData={blogsSidebarData}
            sidebarCounts={counts || { all: total }}
            tabs={TABS.blogs || TABS}
            tableTitle="Editorial Articles"
            formCols='2'
            modalSize='lg'
            columns={blogsTableColumns}
            data={blogs}
            total={total}
            loading={loading}
            onFetch={getBlogs}
            onAdd={addBlog}
            onEdit={editBlog}
            onDelete={removeBlog}
            onBulkDelete={bulkRemoveBlogs}
            onAddReview={addReview}
            onDeleteReview={deleteReview}
        />
    );
};

export default React.memo(OverviewBlogs);
