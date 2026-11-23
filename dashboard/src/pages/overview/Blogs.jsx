import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import FilterForm from "../../components/forms/sections/FilterForm";
import Modal from "../../components/common/Modal";
import FormBuilder from "../../components/forms/FormBuilder";
import { getBlogFormFields, getBlogReviewFormFields, sanitizeCrudFormData } from "../../components/forms/sections/CrudForm";
import { showToast } from "../../components/common/Toast";
import {
    blogsSidebarData,
    blogsTableColumns,
    reviewsTableColumns,
    STATUS_OPTIONS,
    RATING_OPTIONS,
    TABS,
} from "../../utils/apiData";
import { useCurrentUser } from "../../utils";
import { useBlogs } from "../../feature/blogSlice";
import { useBlogCategories } from "../../feature/blogCategorySlice";
import { getBlogsApi } from "../../api/blogApi";

const ITEMS_PER_PAGE = 5;



const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const OverviewBlogs = () => {
    const { user: currentUser } = useCurrentUser();
    const {
        blogs,
        total,
        loading,
        getBlogs,
        addBlog,
        editBlog,
        removeBlog,
        bulkRemoveBlogs,
        addReview,
        deleteReview,
    } = useBlogs();

    const {
        categories,
        getBlogCategories,
    } = useBlogCategories();

    // Fetch categories on mount for filter dropdown and modal select
    React.useEffect(() => {
        getBlogCategories({ isDeleted: false, limit: 100 });
    }, [getBlogCategories]);

    const dynamicCategoryFilterOptions = React.useMemo(() => {
        const opts = [{ label: "All Categories", value: "all" }];
        (categories || []).forEach((c) => {
            if (c.isDeleted) return;
            const catId = c._id || c.id;
            const name = c.categoryName || c.name;
            if (catId && name) {
                opts.push({ label: name, value: String(catId) });
            }
        });
        return opts;
    }, [categories]);

    const dynamicCategoryModalOptions = React.useMemo(() => {
        const opts = [];
        (categories || []).forEach((c) => {
            if (c.isDeleted) return;
            const catId = c._id || c.id;
            const name = c.categoryName || c.name;
            if (catId && name) {
                opts.push({ label: name, value: String(catId) });
            }
        });
        return opts;
    }, [categories]);

    const [activeTab, setActiveTab] = React.useState("all");
    const [selectedCategory, setSelectedCategory] = React.useState("All Articles");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [categoryFilter, setCategoryFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedBlogIds, setSelectedBlogIds] = React.useState([]);

    // Modals
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingBlog, setEditingBlog] = React.useState(null);

    const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
    const [reviewTargetBlog, setReviewTargetBlog] = React.useState(null);

    // Fetch blogs with backend query parameters
    const fetchBlogData = React.useCallback(() => {
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

        if (categoryFilter !== "all") {
            params.categoryId = categoryFilter;
        }

        getBlogs(params);
    }, [currentPage, activeTab, searchQuery, statusFilter, categoryFilter, getBlogs]);

    React.useEffect(() => {
        fetchBlogData();
    }, [fetchBlogData]);

    const [statusCounts, setStatusCounts] = React.useState({
        all: 0,
        active: 0,
        inactive: 0,
    });

    const fetchStatusCounts = React.useCallback(async () => {
        try {
            const [allRes, activeRes, inactiveRes] = await Promise.all([
                getBlogsApi({ isDeleted: false, page: 1, limit: 1 }),
                getBlogsApi({ isDeleted: false, isActive: true, page: 1, limit: 1 }),
                getBlogsApi({ isDeleted: false, isActive: false, page: 1, limit: 1 }),
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
        setSelectedBlogIds([]);
    }, []);

    const handleStatusFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(next);
        setSelectedCategory(next === "Active" ? "Active" : next === "Inactive" ? "Inactive" : "All Articles");
        setCurrentPage(1);
        setSelectedBlogIds([]);
    }, []);

    const handleCategoryFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setCategoryFilter(next);
        setCurrentPage(1);
        setSelectedBlogIds([]);
    }, []);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setCategoryFilter("all");
        setSearchQuery("");
        setSelectedCategory("All Articles");
        setCurrentPage(1);
        setSelectedBlogIds([]);
        showToast("Blog filters reset", "info");
    }, []);

    // Sidebar navigation
    const handleSidebarItemClick = React.useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        setSelectedBlogIds([]);
        const item = blogsSidebarData.items.find((i) => i.name === name);
        const nextStatus = item?.status || "all";
        setStatusFilter(nextStatus);
    }, []);

    const handleTabChange = React.useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        setSelectedBlogIds([]);
        if (tabValue === "trash") {
            setSelectedCategory("Trash");
            setStatusFilter("all");
        } else if (tabValue === "reviews") {
            setSelectedCategory("Reviews");
            setStatusFilter("all");
        } else {
            setSelectedCategory("All Articles");
        }
    }, []);

    // Aggregate all reviews across blogs for Reviews tab
    const allReviews = React.useMemo(() => {
        const list = [];
        (blogs || []).forEach((blog) => {
            if (!Array.isArray(blog.reviews)) return;
            blog.reviews.forEach((r, idx) => {
                const globalIndex = list.length + 1;
                const formattedId = `BREW-${String(globalIndex).padStart(3, "0")}`;
                const revId = (r.id && typeof r.id === "string" && r.id.startsWith("BREW-"))
                    ? r.id
                    : formattedId;

                const ratingNum = Number(r.rating || 5);
                const stars = "★".repeat(Math.max(1, Math.min(5, Math.round(ratingNum))));
                const creatorObj = typeof r.createdBy === "object" && r.createdBy !== null ? r.createdBy : {};
                const reviewerName =
                    creatorObj.fullname ||
                    creatorObj.name ||
                    (typeof r.createdBy === "string" && !r.createdBy.match(/^[0-9a-fA-F]{24}$/) ? r.createdBy : "") ||
                    currentUser?.fullname ||
                    currentUser?.name ||
                    "Raj Shetye";

                const reviewerMobile =
                    creatorObj.mobile ||
                    creatorObj.phone ||
                    currentUser?.mobile ||
                    "8779030638";

                const defaultAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80";
                const reviewerAvatar =
                    creatorObj.avatar ||
                    creatorObj.image ||
                    creatorObj.profileImage ||
                    (currentUser?.name === reviewerName || currentUser?.fullname === reviewerName ? (currentUser?.image || currentUser?.avatar) : "") ||
                    defaultAvatar;

                list.push({
                    _id: revId,
                    id: revId,
                    blogId: blog.id || blog._id,
                    blogName: blog.blogName || blog.title || "Article",
                    itemName: blog.blogName || blog.title || "Article",
                    productName: blog.blogName || blog.title || "Article",
                    author: blog.author || (typeof blog.createdby === "object" ? (blog.createdby?.fullname || blog.createdby?.name) : blog.createdby) || "Editor",
                    subText: blog.author || (typeof blog.createdby === "object" ? (blog.createdby?.fullname || blog.createdby?.name) : blog.createdby) || "Editor",
                    image: blog.image || "",
                    reviewer: reviewerName,
                    avatar: reviewerAvatar,
                    createdby: {
                        name: reviewerName,
                        fullname: reviewerName,
                        avatar: reviewerAvatar,
                        image: reviewerAvatar,
                        mobile: reviewerMobile,
                    },
                    rating: ratingNum,
                    ratingDisplay: `${ratingNum} ${stars}`,
                    comment: r.comment || "No comment provided",
                    isActive: r.isActive !== undefined ? Boolean(r.isActive) : true,
                    isDeleted: Boolean(r.isDeleted),
                    createdAt: r.createdAt || blog.createdAt || new Date().toISOString(),
                    updatedAt: r.updatedAt || blog.updatedAt || new Date().toISOString(),
                    blog,
                });
            });
        });
        return list;
    }, [blogs, currentUser]);

    // Filter reviews
    const filteredReviews = React.useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        return allReviews.filter((r) => {
            const matchesStatus =
                statusFilter === "all" || (statusFilter === "Active" ? r.isActive : !r.isActive);
            const matchesCategory =
                categoryFilter === "all" ||
                String(r.blog?.categoryId?._id || r.blog?.categoryId) === String(categoryFilter);
            const matchesSearch =
                !q ||
                r.blogName.toLowerCase().includes(q) ||
                r.reviewer.toLowerCase().includes(q) ||
                r.comment.toLowerCase().includes(q) ||
                r.id.toLowerCase().includes(q);
            return matchesStatus && matchesCategory && matchesSearch;
        });
    }, [allReviews, searchQuery, statusFilter, categoryFilter]);

    const paginatedReviews = React.useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredReviews.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredReviews, currentPage]);

    // Selection handlers for bulk operations
    const currentTableData = activeTab === "reviews" ? paginatedReviews : blogs;

    const isAllSelected = React.useMemo(() => {
        if (!currentTableData.length) return false;
        return currentTableData.every((item) => {
            const id = item.id || item._id;
            return selectedBlogIds.includes(id) || (item._id && selectedBlogIds.includes(item._id));
        });
    }, [currentTableData, selectedBlogIds]);

    const handleSelectAll = React.useCallback((checked) => {
        const next = typeof checked === "boolean" ? checked : !isAllSelected;
        if (next) {
            const allIds = currentTableData.map((item) => item.id || item._id);
            setSelectedBlogIds(allIds);
        } else {
            setSelectedBlogIds([]);
        }
    }, [currentTableData, isAllSelected]);

    const handleSelectRow = React.useCallback((id, row) => {
        const targetId = row?.id || id;
        setSelectedBlogIds((prev) => {
            const exists = prev.includes(targetId) || (row?._id && prev.includes(row._id));
            if (exists) {
                return prev.filter((x) => x !== targetId && x !== row?._id);
            }
            return [...prev, targetId];
        });
    }, []);

    // Blog actions
    const handleViewBlog = React.useCallback((row) => {
        const title = row.title || row.blogName || "Article";
        showToast(`Article: ${title} (${row.readTime || "Quick read"})`, "info");
    }, []);

    const handleEditBlog = React.useCallback((row) => {
        setEditingBlog(row);
        setIsModalOpen(true);
    }, []);

    const handleDeleteBlog = React.useCallback(async (row) => {
        const id = row.id || row._id;
        const title = row.title || row.blogName || "Article";
        try {
            await removeBlog(id);
            if (activeTab === "trash") {
                showToast(`Article "${title}" permanently removed!`, "success");
            } else {
                showToast(`Article "${title}" moved to trash!`, "success");
            }
            fetchBlogData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to delete article", "danger");
        }
    }, [activeTab, removeBlog, fetchBlogData, fetchStatusCounts]);

    const handleBulkDelete = React.useCallback(async () => {
        if (!selectedBlogIds.length) return;
        try {
            await bulkRemoveBlogs({
                ids: selectedBlogIds,
                permanent: activeTab === "trash",
            });
            if (activeTab === "trash") {
                showToast(`${selectedBlogIds.length} article(s) permanently removed!`, "success");
            } else {
                showToast(`${selectedBlogIds.length} article(s) moved to trash!`, "success");
            }
            setSelectedBlogIds([]);
            fetchBlogData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to bulk delete articles", "danger");
        }
    }, [selectedBlogIds, activeTab, bulkRemoveBlogs, fetchBlogData, fetchStatusCounts]);

    // Review actions
    const handleViewReview = React.useCallback((row) => {
        showToast(
            `Review for ${row.blogName}: "${row.comment}" (${row.rating} Stars by ${row.reviewer})`,
            "info"
        );
    }, []);

    const handleDeleteReview = React.useCallback(async (row) => {
        try {
            await deleteReview(row.blogId, row.id);
            showToast(`Review "${row.id}" removed successfully!`, "success");
            fetchBlogData();
        } catch (err) {
            showToast(err?.message || "Failed to remove review", "danger");
        }
    }, [deleteReview, fetchBlogData]);

    const handleBulkDeleteReviews = React.useCallback(async () => {
        if (!selectedBlogIds.length) return;
        try {
            for (const rev of paginatedReviews) {
                if (selectedBlogIds.includes(rev.id) || selectedBlogIds.includes(rev._id)) {
                    await deleteReview(rev.blogId, rev.id);
                }
            }
            showToast(`${selectedBlogIds.length} review(s) removed successfully!`, "success");
            setSelectedBlogIds([]);
            fetchBlogData();
        } catch (err) {
            showToast(err?.message || "Failed to remove reviews", "danger");
        }
    }, [selectedBlogIds, paginatedReviews, deleteReview, fetchBlogData]);

    // Modal Form Fields for Blog
    // Blog Modal Form Fields via generic CrudForm helper
    const blogFormFields = React.useMemo(
        () => getBlogFormFields({
            editingBlog,
            categoryOptions: dynamicCategoryModalOptions,
            userRole: currentUser,
        }),
        [editingBlog, dynamicCategoryModalOptions, currentUser]
    );

    const handleBlogFormSubmit = React.useCallback(async (formData) => {
        if (!formData.blogName?.trim()) {
            showToast("Article title is required", "warning");
            return;
        }

        if (!formData.description?.trim()) {
            showToast("Article content is required", "warning");
            return;
        }

        if (!formData.categoryId) {
            showToast("Please select a category", "warning");
            return;
        }

        let imageVal = "";
        const rawImg = formData.image;
        if (Array.isArray(rawImg)) {
            if (rawImg.length > 0) {
                const first = rawImg[0];
                if (first instanceof File || first instanceof Blob) {
                    try {
                        imageVal = await fileToBase64(first);
                    } catch {
                        imageVal = first.name || "";
                    }
                } else if (typeof first === "string") {
                    imageVal = first.trim();
                }
            }
        } else if (rawImg instanceof File || rawImg instanceof Blob) {
            try {
                imageVal = await fileToBase64(rawImg);
            } catch {
                imageVal = rawImg.name || "";
            }
        } else if (typeof rawImg === "string") {
            imageVal = rawImg.trim();
        } else if (editingBlog?.image) {
            imageVal = editingBlog.image;
        }

        const badgesVal = Array.isArray(formData.badges)
            ? formData.badges
            : typeof formData.badges === "string"
                ? formData.badges.split(",").map((b) => b.trim()).filter(Boolean)
                : [];

        const specsVal = Array.isArray(formData.specifications)
            ? formData.specifications.filter((s) => s && (s.name || s.value))
            : [];

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
            blogName: formData.blogName.trim(),
            categoryId: formData.categoryId,
            readTime: formData.readTime ? formData.readTime.trim() : "1 min read",
            shortDesc: formData.shortDesc ? formData.shortDesc.trim() : "",
            description: formData.description.trim(),
            quote: formData.quote ? formData.quote.trim() : "",
            image: imageVal,
            badges: badgesVal,
            specifications: specsVal,
            isActive: sanitizeCrudFormData(formData, { userRole: currentUser, isEditing: Boolean(editingBlog) }).isActive,
            reviews: editingBlog?.reviews || [],
        };

        if (activeCreatorId) {
            payload.createdBy = activeCreatorId;
        }

        try {
            if (editingBlog) {
                const targetId = editingBlog.id || editingBlog._id;
                if (editingBlog.createdBy) {
                    payload.createdBy =
                        typeof editingBlog.createdBy === "object"
                            ? (editingBlog.createdBy._id || editingBlog.createdBy.id || activeCreatorId)
                            : (editingBlog.createdBy || activeCreatorId);
                }
                await editBlog(targetId, payload);
                showToast(`Article "${payload.blogName}" updated successfully!`, "success");
            } else {
                await addBlog(payload);
                showToast(`Article "${payload.blogName}" published successfully!`, "success");
            }
            setIsModalOpen(false);
            setEditingBlog(null);
            fetchBlogData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to save article", "danger");
        }
    }, [editingBlog, editBlog, addBlog, fetchBlogData, fetchStatusCounts, currentUser]);

    // Review Modal Form Fields via generic CrudForm helper
    const reviewFormFields = React.useMemo(
        () => getBlogReviewFormFields({
            blogs,
            reviewTargetBlog,
            ratingOptions: RATING_OPTIONS,
            userRole: currentUser,
        }),
        [blogs, reviewTargetBlog, currentUser]
    );

    const handleReviewFormSubmit = React.useCallback(async (formData) => {
        if (!formData.blogId) {
            showToast("Please select an article for the review", "warning");
            return;
        }

        if (!formData.comment?.trim()) {
            showToast("Review comment cannot be empty", "warning");
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
            rating: Number(formData.rating || 5),
            comment: formData.comment.trim(),
            isActive: sanitizeCrudFormData(formData, { userRole: currentUser, isEditing: false }).isActive,
        };

        if (activeCreatorId) {
            payload.createdBy = activeCreatorId;
        }

        try {
            await addReview(formData.blogId, payload);
            showToast("Reader review submitted successfully!", "success");
            setIsReviewModalOpen(false);
            setReviewTargetBlog(null);
            fetchBlogData();
        } catch (err) {
            showToast(err?.message || "Failed to submit review", "danger");
        }
    }, [addReview, fetchBlogData, currentUser]);

    // Sidebar items with dynamic total counts
    const sidebarItems = React.useMemo(() => {
        const totalAll = activeTab === "trash" ? total : (statusCounts.all || total);
        const totalActive = statusCounts.active;
        const totalInactive = statusCounts.inactive;

        return blogsSidebarData.items.map((item) => {
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
                        label: "Article Status",
                        options: STATUS_OPTIONS,
                        value: statusFilter,
                        onChange: handleStatusFilterChange,
                    },
                    {
                        type: "select",
                        label: "Blog Category",
                        options: dynamicCategoryFilterOptions,
                        value: categoryFilter,
                        onChange: handleCategoryFilterChange,
                    },
                ]}
            />
        ),
        [statusFilter, handleStatusFilterChange, dynamicCategoryFilterOptions, categoryFilter, handleCategoryFilterChange]
    );

    const quickActionNode = React.useMemo(
        () => (
            <div className="flex-align gap-8">
                {selectedBlogIds.length > 0 && (
                    <Button
                        text={`Delete (${selectedBlogIds.length})`}
                        version="v2"
                        bg="danger"
                        variant="outline"
                        border="danger"
                        color="white"
                        icon="Trash"
                        onClick={activeTab === "reviews" ? handleBulkDeleteReviews : handleBulkDelete}
                    />
                )}
                {activeTab === "reviews" && (
                    <Button
                        text="Add Review"
                        version="v2"
                        bg="success"
                        variant="outline"
                        border="success"
                        color="white"
                        icon="Star"
                        onClick={() => {
                            setReviewTargetBlog(null);
                            setIsReviewModalOpen(true);
                        }}
                    />)}
                {activeTab !== "reviews" && (
                    <Button
                        text="Add Article"
                        version="v2"
                        bg="primary"
                        variant="outline"
                        border="primary"
                        color="white"
                        icon="Plus"
                        onClick={() => {
                            setEditingBlog(null);
                            setIsModalOpen(true);
                        }}
                    />
                )}
            </div>
        ),
        [selectedBlogIds, activeTab, handleBulkDelete, handleBulkDeleteReviews]
    );

    return (
        <MainLayout
            sidebarTitle={blogsSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Clipboard" width="18" height="18" />}
            headerTitle="Editorial Blogs"
            headerSub="Industry publications, technical guides, thermal barrier innovations, and workplace safety articles"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS.blogs || TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter articles by publication status, blog category, or keyword search"
            filterInputs={filterInputsNode}
            hasActiveFilters={
                statusFilter !== "all" ||
                categoryFilter !== "all" ||
                Boolean(searchQuery.trim()) ||
                activeTab !== "all"
            }
            onClearAllFilters={handleClearFilters}
        >
            <div className="bg-white p-14 rounded-10">
                <Table
                    title={
                        activeTab === "reviews"
                            ? "Article Reader Reviews"
                            : "Editorial Articles Master"
                    }
                    subtitle={
                        activeTab === "reviews"
                            ? "Reader feedback, community comments, and star ratings across articles"
                            : activeTab === "trash"
                                ? "Archived and removed articles in trash"
                                : "Complete publication master with authors, categories, read times, and comments"
                    }
                    data={activeTab === "reviews" ? paginatedReviews : blogs}
                    columns={activeTab === "reviews" ? reviewsTableColumns : blogsTableColumns}
                    totalItems={activeTab === "reviews" ? filteredReviews.length : total}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={(p) => {
                        setCurrentPage(p);
                        setSelectedBlogIds([]);
                    }}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder={
                        activeTab === "reviews"
                            ? "Search reviews by article, reviewer, or comment..."
                            : "Search articles by title, excerpt, author, or ID..."
                    }
                    itemName={activeTab === "reviews" ? "review" : "blogs"}
                    collapsible={true}
                    maxVisibleColumns={activeTab === "reviews" ? 5 : 5}
                    minWidth="1100px"
                    loading={loading}
                    selectedRows={selectedBlogIds}
                    onSelectRow={handleSelectRow}
                    onSelectAll={handleSelectAll}
                    onView={activeTab === "reviews" ? handleViewReview : handleViewBlog}
                    onEdit={activeTab === "reviews" ? null : handleEditBlog}
                    onDelete={activeTab === "reviews" ? handleDeleteReview : handleDeleteBlog}
                    viewTitle={activeTab === "reviews" ? "View Review Details" : "View Article Details"}
                    editTitle="Edit Article Info"
                    deleteTitle={
                        activeTab === "reviews"
                            ? "Delete Review"
                            : activeTab === "trash"
                                ? "Permanently Delete Article"
                                : "Delete Article"
                    }
                />
            </div>

            {/* Add / Edit Article Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingBlog(null);
                }}
                title={
                    editingBlog
                        ? `Edit Article: ${editingBlog.blogName || editingBlog.title}`
                        : "Add New Article"
                }
                size="md"
                type="sidebar"
                placement="right"
                footer={null}
            >
                <FormBuilder
                    key={editingBlog ? (editingBlog.id || editingBlog._id) : "new-blog"}
                    fields={blogFormFields}
                    submitType="json"
                    onSubmit={handleBlogFormSubmit}
                    submitText={editingBlog ? "Update Article" : "Publish Article"}
                    col="1"
                />
            </Modal>

            {/* Add Review Modal */}
            <Modal
                isOpen={isReviewModalOpen}
                onClose={() => {
                    setIsReviewModalOpen(false);
                    setReviewTargetBlog(null);
                }}
                title="Add Article Reader Review"
                size="sm"
                type="sidebar"
                placement="right"
                footer={null}
            >
                <FormBuilder
                    key={reviewTargetBlog ? (reviewTargetBlog.id || reviewTargetBlog._id) : "new-review"}
                    fields={reviewFormFields}
                    submitType="json"
                    onSubmit={handleReviewFormSubmit}
                    submitText="Submit Review"
                    col="1"
                />
            </Modal>
        </MainLayout>
    );
};

export default React.memo(OverviewBlogs);
