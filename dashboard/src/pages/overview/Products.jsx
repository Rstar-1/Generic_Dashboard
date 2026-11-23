import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import FilterForm from "../../components/forms/sections/FilterForm";
import Modal from "../../components/common/Modal";
import FormBuilder from "../../components/forms/FormBuilder";
import { getProductFormFields, getProductReviewFormFields, sanitizeCrudFormData } from "../../components/forms/sections/CrudForm";
import { showToast } from "../../components/common/Toast";
import {
    productsSidebarData,
    productsTableColumns,
    reviewsTableColumns,
    STATUS_OPTIONS,
    RATING_OPTIONS,
    TABS,
} from "../../utils/apiData";
import { useCurrentUser } from "../../utils";
import { useProducts } from "../../feature/productSlice";
import { useProductCategories } from "../../feature/productCategorySlice";
import { getProductsApi } from "../../api/productApi";

const ITEMS_PER_PAGE = 5;

const SEVERITY_OPTIONS = [
    { label: "Pending Review", value: "pending" },
    { label: "Approved for Store", value: "approved" },
    { label: "Rejected / Revision", value: "rejected" },
];


const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const OverviewProducts = () => {
    const { user: currentUser } = useCurrentUser();
    const {
        products,
        total,
        loading,
        getProducts,
        addProduct,
        editProduct,
        removeProduct,
        bulkRemoveProducts,
        addReview,
        removeReview,
    } = useProducts();

    const {
        categories,
        getCategories,
    } = useProductCategories();

    // Fetch categories on mount for filter dropdown and modal select
    React.useEffect(() => {
        getCategories({ isDeleted: false, limit: 100 });
    }, [getCategories]);

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
    const [selectedCategory, setSelectedCategory] = React.useState("All Products");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [categoryFilter, setCategoryFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedProductIds, setSelectedProductIds] = React.useState([]);

    // Modals
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState(null);

    const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
    const [reviewTargetProduct, setReviewTargetProduct] = React.useState(null);

    // Fetch products with backend query parameters
    const fetchProductData = React.useCallback(() => {
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

        getProducts(params);
    }, [currentPage, activeTab, searchQuery, statusFilter, categoryFilter, getProducts]);

    React.useEffect(() => {
        fetchProductData();
    }, [fetchProductData]);

    const [statusCounts, setStatusCounts] = React.useState({
        all: 0,
        active: 0,
        inactive: 0,
    });

    const fetchStatusCounts = React.useCallback(async () => {
        try {
            const [allRes, activeRes, inactiveRes] = await Promise.all([
                getProductsApi({ isDeleted: false, page: 1, limit: 1 }),
                getProductsApi({ isDeleted: false, isActive: true, page: 1, limit: 1 }),
                getProductsApi({ isDeleted: false, isActive: false, page: 1, limit: 1 }),
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
        setSelectedProductIds([]);
    }, []);

    const handleStatusFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(next);
        setSelectedCategory(next === "Active" ? "Active" : next === "Inactive" ? "Inactive" : "All Products");
        setCurrentPage(1);
        setSelectedProductIds([]);
    }, []);

    const handleCategoryFilterChange = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setCategoryFilter(next);
        setCurrentPage(1);
        setSelectedProductIds([]);
    }, []);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setCategoryFilter("all");
        setSearchQuery("");
        setSelectedCategory("All Products");
        setCurrentPage(1);
        setSelectedProductIds([]);
        showToast("Product filters reset", "info");
    }, []);

    // Sidebar navigation
    const handleSidebarItemClick = React.useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        setSelectedProductIds([]);
        const item = productsSidebarData.items.find((i) => i.name === name);
        const nextStatus = item?.status || "all";
        setStatusFilter(nextStatus);
    }, []);

    const handleTabChange = React.useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        setSelectedProductIds([]);
        if (tabValue === "trash") {
            setSelectedCategory("Trash");
            setStatusFilter("all");
        } else if (tabValue === "reviews") {
            setSelectedCategory("Reviews");
            setStatusFilter("all");
        } else {
            setSelectedCategory("All Products");
        }
    }, []);

    // Aggregate all reviews across products for the Reviews tab
    const allReviews = React.useMemo(() => {
        const list = [];
        (products || []).forEach((prod) => {
            if (!Array.isArray(prod.reviews)) return;
            prod.reviews.forEach((r, idx) => {
                const globalIndex = list.length + 1;
                const formattedId = `PREW-${String(globalIndex).padStart(3, "0")}`;
                const revId = (r.id && typeof r.id === "string" && r.id.startsWith("PREW-"))
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

                const productImage = prod.image || (Array.isArray(prod.images) ? prod.images[0] : "") || "";

                list.push({
                    _id: revId,
                    id: revId,
                    productId: prod.id || prod._id,
                    productName: prod.productName || prod.title || prod.name || "Product",
                    itemName: prod.productName || prod.title || prod.name || "Product",
                    blogName: prod.productName || prod.title || prod.name || "Product",
                    sku: prod.sku || prod.id,
                    subText: prod.sku || prod.id,
                    image: productImage,
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
                    createdAt: r.createdAt || prod.createdAt || new Date().toISOString(),
                    updatedAt: r.updatedAt || prod.updatedAt || new Date().toISOString(),
                    rawReview: r,
                    product: prod,
                });
            });
        });
        return list;
    }, [products, currentUser]);

    // Filter reviews
    const filteredReviews = React.useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        return allReviews.filter((r) => {
            const matchesStatus =
                statusFilter === "all" || (statusFilter === "Active" ? r.isActive : !r.isActive);
            const matchesCategory =
                categoryFilter === "all" ||
                String(r.product?.categoryId?._id || r.product?.categoryId) === String(categoryFilter);
            const matchesSearch =
                !q ||
                r.productName.toLowerCase().includes(q) ||
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
    const currentTableData = activeTab === "reviews" ? paginatedReviews : products;

    const isAllSelected = React.useMemo(() => {
        if (!currentTableData.length) return false;
        return currentTableData.every((item) => {
            const id = item.id || item._id;
            return selectedProductIds.includes(id) || (item._id && selectedProductIds.includes(item._id));
        });
    }, [currentTableData, selectedProductIds]);

    const handleSelectAll = React.useCallback((checked) => {
        const next = typeof checked === "boolean" ? checked : !isAllSelected;
        if (next) {
            const allIds = currentTableData.map((item) => item.id || item._id);
            setSelectedProductIds(allIds);
        } else {
            setSelectedProductIds([]);
        }
    }, [currentTableData, isAllSelected]);

    const handleSelectRow = React.useCallback((id, row) => {
        const targetId = row?.id || id;
        setSelectedProductIds((prev) => {
            const exists = prev.includes(targetId) || (row?._id && prev.includes(row._id));
            if (exists) {
                return prev.filter((x) => x !== targetId && x !== row?._id);
            }
            return [...prev, targetId];
        });
    }, []);

    // Product actions
    const handleViewProduct = React.useCallback((row) => {
        const prodName = row.name || row.title || row.productName || "Product";
        showToast(
            `Viewing ${prodName} (${row.price}) - Severity: ${row.severity || "pending"} | ${row.stock} in stock`,
            "info"
        );
    }, []);

    const handleEditProduct = React.useCallback((row) => {
        setEditingProduct(row);
        setIsModalOpen(true);
    }, []);

    const handleDeleteProduct = React.useCallback(async (row) => {
        const id = row.id || row._id;
        const prodName = row.name || row.title || row.productName || "Product";
        try {
            await removeProduct(id);
            if (activeTab === "trash") {
                showToast(`Product "${prodName}" permanently removed!`, "success");
            } else {
                showToast(`Product "${prodName}" moved to trash!`, "success");
            }
            fetchProductData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to delete product", "danger");
        }
    }, [activeTab, removeProduct, fetchProductData, fetchStatusCounts]);

    const handleBulkDelete = React.useCallback(async () => {
        if (!selectedProductIds.length) return;
        try {
            await bulkRemoveProducts({
                ids: selectedProductIds,
                permanent: activeTab === "trash",
            });
            if (activeTab === "trash") {
                showToast(`${selectedProductIds.length} product(s) permanently removed!`, "success");
            } else {
                showToast(`${selectedProductIds.length} product(s) moved to trash!`, "success");
            }
            setSelectedProductIds([]);
            fetchProductData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to bulk delete products", "danger");
        }
    }, [selectedProductIds, activeTab, bulkRemoveProducts, fetchProductData, fetchStatusCounts]);

    // Review actions
    const handleViewReview = React.useCallback((row) => {
        showToast(
            `Review for ${row.productName}: "${row.comment}" (${row.rating} Stars by ${row.reviewer})`,
            "info"
        );
    }, []);

    const handleDeleteReview = React.useCallback(async (row) => {
        const targetProduct = (products || []).find(
            (p) => String(p.id) === String(row.productId) || String(p._id) === String(row.productId)
        );
        const prodId = targetProduct?.id || targetProduct?._id || row.productId;
        const reviewId = row.rawReview?.id || row.rawReview?._id || row.id || row._id;

        if (!prodId) {
            showToast("Associated product not found", "warning");
            return;
        }

        try {
            let success = false;
            if (removeReview) {
                const res = await removeReview(prodId, reviewId);
                if (!res?.error) success = true;
            }

            if (!success && editProduct && targetProduct) {
                const updatedReviews = (targetProduct.reviews || []).filter(
                    (r) => String(r.id) !== String(reviewId) && String(r._id) !== String(reviewId)
                );
                await editProduct(prodId, { reviews: updatedReviews });
                success = true;
            }

            showToast(`Review "${reviewId}" removed successfully!`, "success");
            fetchProductData();
        } catch (err) {
            showToast(err?.message || "Failed to remove review", "danger");
        }
    }, [products, removeReview, editProduct, fetchProductData]);

    const handleBulkDeleteReviews = React.useCallback(async () => {
        if (!selectedProductIds.length) return;
        try {
            const idSet = new Set(selectedProductIds.map(String));
            for (const prod of products) {
                const targetRevs = (prod.reviews || []).filter(
                    (r) => idSet.has(String(r.id)) || idSet.has(String(r._id))
                );
                for (const rev of targetRevs) {
                    const rId = rev.id || rev._id;
                    try {
                        if (removeReview) {
                            await removeReview(prod.id || prod._id, rId);
                        } else {
                            throw new Error("No removeReview");
                        }
                    } catch {
                        const remaining = (prod.reviews || []).filter(
                            (r) => !idSet.has(String(r.id)) && !idSet.has(String(r._id))
                        );
                        await editProduct(prod.id || prod._id, { reviews: remaining });
                        break;
                    }
                }
            }
            showToast(`${selectedProductIds.length} review(s) removed successfully!`, "success");
            setSelectedProductIds([]);
            fetchProductData();
        } catch (err) {
            showToast(err?.message || "Failed to remove reviews", "danger");
        }
    }, [selectedProductIds, products, removeReview, editProduct, fetchProductData]);

    // Product Modal Form Fields via generic CrudForm helper
    const productFormFields = React.useMemo(
        () => getProductFormFields({
            editingProduct,
            categoryOptions: dynamicCategoryModalOptions,
            severityOptions: SEVERITY_OPTIONS,
            userRole: currentUser,
        }),
        [editingProduct, dynamicCategoryModalOptions, currentUser]
    );

    const handleProductFormSubmit = React.useCallback(async (formData) => {
        if (!formData.productName?.trim()) {
            showToast("Product name is required", "warning");
            return;
        }

        if (formData.price === undefined || formData.price === null || isNaN(Number(formData.price))) {
            showToast("Valid price is required", "warning");
            return;
        }

        if (!formData.categoryId) {
            showToast("Product category is required", "warning");
            return;
        }

        // Parse single cover image
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
        } else if (editingProduct?.image) {
            imageVal = editingProduct.image;
        }

        // Parse multiple gallery images
        let imagesVal = [];
        const rawImages = formData.images;
        if (Array.isArray(rawImages)) {
            for (const item of rawImages) {
                if (item instanceof File || item instanceof Blob) {
                    try {
                        const b64 = await fileToBase64(item);
                        imagesVal.push(b64);
                    } catch {
                        if (item.name) imagesVal.push(item.name);
                    }
                } else if (typeof item === "string" && item.trim()) {
                    imagesVal.push(item.trim());
                }
            }
        } else if (rawImages instanceof File || rawImages instanceof Blob) {
            try {
                const b64 = await fileToBase64(rawImages);
                imagesVal.push(b64);
            } catch {
                if (rawImages.name) imagesVal.push(rawImages.name);
            }
        } else if (typeof rawImages === "string" && rawImages.trim()) {
            imagesVal = rawImages.split(",").map((s) => s.trim()).filter(Boolean);
        } else if (Array.isArray(editingProduct?.images)) {
            imagesVal = editingProduct.images;
        }

        // Parse badges
        const badgesVal = Array.isArray(formData.badges)
            ? formData.badges
            : typeof formData.badges === "string"
                ? formData.badges.split(",").map((b) => b.trim()).filter(Boolean)
                : [];

        // Parse specifications
        let specsVal = [];
        if (Array.isArray(formData.specifications)) {
            specsVal = formData.specifications.filter((s) => s && (s.name || s.value));
        } else if (typeof formData.specifications === "string") {
            const lines = formData.specifications.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
            specsVal = lines
                .map((line) => {
                    const colonIdx = line.indexOf(":");
                    if (colonIdx !== -1) {
                        return {
                            name: line.slice(0, colonIdx).trim(),
                            value: line.slice(colonIdx + 1).trim(),
                        };
                    }
                    return { name: "Specification", value: line };
                })
                .filter((s) => s.name && s.value);
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
            productName: formData.productName.trim(),
            categoryId: formData.categoryId,
            price: Number(formData.price),
            totalStock: formData.totalStock !== undefined ? Number(formData.totalStock) : 0,
            unit: formData.unit ? formData.unit.trim() : "Pcs",
            severity: formData.severity ? formData.severity.toLowerCase().trim() : "pending",
            shortDesc: formData.shortDesc ? formData.shortDesc.trim() : "",
            description: formData.description ? formData.description.trim() : "",
            image: imageVal,
            images: imagesVal,
            badges: badgesVal,
            specifications: specsVal,
            isTrending: Boolean(formData.isTrending),
            stockStatus: formData.stockStatus !== undefined ? Boolean(formData.stockStatus) : true,
            isActive: sanitizeCrudFormData(formData, { userRole: currentUser, isEditing: Boolean(editingProduct) }).isActive,
            reviews: editingProduct?.reviews || [],
        };

        if (activeCreatorId) {
            payload.createdBy = activeCreatorId;
        }

        try {
            if (editingProduct) {
                const targetId = editingProduct.id || editingProduct._id;
                if (editingProduct.createdBy) {
                    payload.createdBy =
                        typeof editingProduct.createdBy === "object"
                            ? (editingProduct.createdBy._id || editingProduct.createdBy.id || activeCreatorId)
                            : (editingProduct.createdBy || activeCreatorId);
                }
                await editProduct(targetId, payload);
                showToast(`Product "${payload.productName}" updated successfully!`, "success");
            } else {
                await addProduct(payload);
                showToast(`Product "${payload.productName}" created successfully!`, "success");
            }
            setIsModalOpen(false);
            setEditingProduct(null);
            fetchProductData();
            fetchStatusCounts();
        } catch (err) {
            showToast(err?.message || "Failed to save product", "danger");
        }
    }, [editingProduct, editProduct, addProduct, fetchProductData, fetchStatusCounts, currentUser]);

    // Review Modal Form Fields via generic CrudForm helper
    const reviewFormFields = React.useMemo(
        () => getProductReviewFormFields({
            products,
            reviewTargetProduct,
            ratingOptions: RATING_OPTIONS,
            userRole: currentUser,
        }),
        [products, reviewTargetProduct, currentUser]
    );

    const handleReviewFormSubmit = React.useCallback(async (formData) => {
        if (!formData.productId) {
            showToast("Please select a target product for the review", "warning");
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
            await addReview(formData.productId, payload);
            showToast("Customer review added successfully!", "success");
            setIsReviewModalOpen(false);
            setReviewTargetProduct(null);
            fetchProductData();
        } catch (err) {
            showToast(err?.message || "Failed to submit review", "danger");
        }
    }, [addReview, fetchProductData, currentUser]);

    // Sidebar items with dynamic total counts
    const sidebarItems = React.useMemo(() => {
        const totalAll = activeTab === "trash" ? total : (statusCounts.all || total);
        const totalActive = statusCounts.active;
        const totalInactive = statusCounts.inactive;

        return productsSidebarData.items.map((item) => {
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
                icon: "Box",
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
                        label: "Product Status",
                        options: STATUS_OPTIONS,
                        value: statusFilter,
                        onChange: handleStatusFilterChange,
                    },
                    {
                        type: "select",
                        label: "Product Category",
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
                {selectedProductIds.length > 0 && (
                    <Button
                        text={`Delete (${selectedProductIds.length})`}
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
                            setReviewTargetProduct(null);
                            setIsReviewModalOpen(true);
                        }}
                    />)}
                {activeTab !== "reviews" && (
                    <Button
                        text="Add Product"
                        version="v2"
                        bg="primary"
                        variant="outline"
                        border="primary"
                        color="white"
                        icon="Plus"
                        onClick={() => {
                            setEditingProduct(null);
                            setIsModalOpen(true);
                        }}
                    />
                )}
            </div>
        ),
        [selectedProductIds, activeTab, handleBulkDelete, handleBulkDeleteReviews]
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
            tabs={TABS.products || TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter products by inventory status, product category, or search keywords"
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
                            ? "Product Customer Reviews"
                            : "Product Master Catalog"
                    }
                    subtitle={
                        activeTab === "reviews"
                            ? "Customer reviews, feedback comments, and star ratings across catalog products"
                            : activeTab === "trash"
                                ? "Archived and removed products in trash"
                                : "Complete SKU inventory with live pricing, stock availability, and ratings"
                    }
                    data={activeTab === "reviews" ? paginatedReviews : products}
                    columns={activeTab === "reviews" ? reviewsTableColumns : productsTableColumns}
                    totalItems={activeTab === "reviews" ? filteredReviews.length : total}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={(p) => {
                        setCurrentPage(p);
                        setSelectedProductIds([]);
                    }}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder={
                        activeTab === "reviews"
                            ? "Search reviews by product, reviewer, or comment..."
                            : "Search by product name, SKU, price, or description..."
                    }
                    itemName={activeTab === "reviews" ? "review" : "products"}
                    collapsible={true}
                    maxVisibleColumns={activeTab === "reviews" ? 5 : 6}
                    minWidth="1100px"
                    loading={loading}
                    selectedRows={selectedProductIds}
                    onSelectRow={handleSelectRow}
                    onSelectAll={handleSelectAll}
                    onView={activeTab === "reviews" ? handleViewReview : handleViewProduct}
                    onEdit={activeTab === "reviews" ? null : handleEditProduct}
                    onDelete={activeTab === "reviews" ? handleDeleteReview : handleDeleteProduct}
                    viewTitle={activeTab === "reviews" ? "View Review Details" : "View Product Details"}
                    editTitle="Edit Product Info"
                    deleteTitle={
                        activeTab === "reviews"
                            ? "Delete Review"
                            : activeTab === "trash"
                                ? "Permanently Delete Product"
                                : "Delete Product"
                    }
                />
            </div>

            {/* Add / Edit Product Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                }}
                title={
                    editingProduct
                        ? `Edit Product: ${editingProduct.productName || editingProduct.title || editingProduct.name}`
                        : "Add New Product"
                }
                size="md"
                type="sidebar"
                placement="right"
                footer={null}
            >
                <FormBuilder
                    key={editingProduct ? (editingProduct.id || editingProduct._id) : "new-product"}
                    fields={productFormFields}
                    submitType="json"
                    onSubmit={handleProductFormSubmit}
                    submitText={editingProduct ? "Update Product" : "Save Product"}
                    col="1"
                />
            </Modal>

            {/* Add Review Modal */}
            <Modal
                isOpen={isReviewModalOpen}
                onClose={() => {
                    setIsReviewModalOpen(false);
                    setReviewTargetProduct(null);
                }}
                title="Add Product Customer Review"
                size="sm"
                type="sidebar"
                placement="right"
                footer={null}
            >
                <FormBuilder
                    key={reviewTargetProduct ? (reviewTargetProduct.id || reviewTargetProduct._id) : "new-review"}
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

export default React.memo(OverviewProducts);
