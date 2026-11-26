import React from "react";
import Modal from "../../common/Modal";
import FormBuilder from "../FormBuilder";
import { getCurrentUser, getCurrentRole } from "../../../utils";
import { ROLE_ACCESS_CONFIG, getPermissionsForPages } from "../../../utils/apiData";

/**
 * Helper to determine if a user/role has Admin or Dev Admin privileges
 */
export const isAdminOrDevAdmin = (userOrRole) => {
    let r = "";
    if (typeof userOrRole === "string") {
        r = userOrRole;
    } else if (userOrRole && typeof userOrRole === "object") {
        r = userOrRole.role || userOrRole.rolename || userOrRole.name || "";
    }
    if (!r && typeof window !== "undefined") {
        try {
            const stored = JSON.parse(localStorage.getItem("user") || "null");
            r = stored?.role || stored?.rolename || "";
        } catch {
            r = "";
        }
    }
    if (!r) {
        try {
            r = getCurrentRole?.() || getCurrentUser?.()?.role || "";
        } catch {
            r = "";
        }
    }
    if (!r) return false;
    const low = String(r || "").toLowerCase().trim();
    return (
        low === "admin" ||
        low === "dev admin" ||
        low === "dev_admin" ||
        low === "devadmin" ||
        low === "developer" ||
        low === "superadmin" ||
        low.includes("admin") ||
        low.includes("dev")
    );
};

/**
 * Common Published Status switch field generator for Admin & Dev Admin roles only
 */
export const getPublishedStatusField = (editingItem, userRole) => {
    if (!isAdminOrDevAdmin(userRole)) {
        return null;
    }
    return {
        name: "isActive",
        label: "Published Status",
        type: "switch",
        defaultValue: editingItem !== undefined && editingItem !== null && editingItem.isActive !== undefined
            ? Boolean(editingItem.isActive)
            : true,
    };
};

/**
 * Sanitizes form submission data: passes false for non-admin on add, or respects admin switch
 */
export const sanitizeCrudFormData = (formData = {}, { userRole, isEditing = false } = {}) => {
    const data = { ...formData };
    const isAdmin = isAdminOrDevAdmin(userRole);
    if (!isAdmin) {
        data.isActive = isEditing && data.isActive !== undefined ? Boolean(data.isActive) : false;
    } else if (data.isActive !== undefined) {
        data.isActive = Boolean(data.isActive === true || data.isActive === "true");
    } else {
        data.isActive = true;
    }
    return data;
};

/**
 * Generic field generator for Users
 */
export const getUserFormFields = ({ editingUser, roleOptions = [], userRole } = {}) => {
    const statusField = getPublishedStatusField(editingUser, userRole);
    return [
        {
            name: "fullname",
            label: "Full Name",
            type: "text",
            defaultValue: editingUser ? (editingUser.fullname || editingUser.name || "") : "",
            placeholder: "e.g. Raj Shetye",
            validation: { required: true },
        },
        {
            name: "email",
            label: "Email Address",
            type: "email",
            defaultValue: editingUser ? editingUser.email : "",
            placeholder: "e.g. raj@example.com",
            validation: { required: true, email: true },
        },
        {
            name: "mobile",
            label: "Mobile Number",
            type: "tel",
            defaultValue: editingUser ? editingUser.mobile : "",
            placeholder: "e.g. 9876543210",
            validation: { required: true, mobile: true },
        },
        {
            name: "image",
            label: "Profile Image",
            type: "dragfile",
            accept: "image/*",
            multiple: false,
            defaultValue: editingUser ? (editingUser.image || editingUser.avatar || "") : [],
        },
        ...(!editingUser ? [{
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Create password",
            validation: { required: true },
        }] : []),
        {
            name: "role",
            label: "User Role",
            type: "select",
            options: roleOptions,
            defaultValue: editingUser
                ? (editingUser.role || editingUser.rolename || "customer")
                : (roleOptions[0]?.value || "customer"),
            validation: { required: true },
        },
        ...(statusField ? [statusField] : []),
    ];
};

/**
 * Generic field generator for Roles & Permissions
 */
export const getRoleFormFields = ({
    editingRole,
    permissionOptions,
    pageOptions,
    userRole,
    selectedPages,
    selectedPermissions,
    onPagesChange,
    onPermissionsChange,
} = {}) => {
    const statusField = getPublishedStatusField(editingRole, userRole);
    const resolvedPageOptions = (pageOptions && pageOptions.length > 0)
        ? pageOptions
        : (ROLE_ACCESS_CONFIG || []).map((it) => ({
            label: it.label || it.page,
            value: it.page,
        }));

    // Determine currently selected pages
    let currentPages = selectedPages !== undefined
        ? (Array.isArray(selectedPages) ? selectedPages : [selectedPages].filter(Boolean))
        : (Array.isArray(editingRole?.pages) && editingRole.pages.length ? editingRole.pages : ["Full_Access"]);

    if (!currentPages.length && selectedPages === undefined) {
        currentPages = ["Full_Access"];
    }

    // Dynamic permissions belonging strictly to currentPages
    const allowedPermsForPages = getPermissionsForPages(currentPages);

    // Options for the Permissions field strictly match the selected pages' permissions
    const resolvedPermissionOptions = allowedPermsForPages.map((p) => ({
        label: p,
        value: p,
    }));

    // Calculate current permissions
    let currentPermissions;
    if (selectedPermissions !== undefined && selectedPermissions !== null) {
        currentPermissions = Array.isArray(selectedPermissions)
            ? selectedPermissions.filter((p) => allowedPermsForPages.includes(p))
            : [];
        if (!currentPermissions.length && allowedPermsForPages.length && selectedPages === undefined) {
            currentPermissions = allowedPermsForPages;
        }
    } else if (Array.isArray(editingRole?.permissions) && editingRole.permissions.length) {
        currentPermissions = editingRole.permissions.filter((p) => allowedPermsForPages.includes(p));
        if (!currentPermissions.length && allowedPermsForPages.length) {
            currentPermissions = allowedPermsForPages;
        }
    } else {
        currentPermissions = allowedPermsForPages;
    }

    return [
        {
            name: "rolename",
            label: "Role Name",
            type: "text",
            defaultValue: editingRole ? (editingRole.rolename || editingRole.name || "") : "",
            placeholder: "e.g. Operations Manager",
            validation: { required: true },
        },
        {
            name: "pages",
            label: "Allowed Pages",
            type: "multiselect",
            options: resolvedPageOptions,
            value: currentPages,
            defaultValue: currentPages,
            onChange: onPagesChange,
        },
        {
            name: "permissions",
            label: "Permissions",
            type: "multiselect",
            options: resolvedPermissionOptions,
            value: currentPermissions,
            defaultValue: currentPermissions,
            onChange: onPermissionsChange,
        },
        ...(statusField ? [statusField] : []),
    ];
};

/**
 * Generic field generator for Lead inquiries
 */
export const getLeadFormFields = ({
    editingLead,
    userRole,
    productOptions = [],
    selectedCategory,
    onCategoryChange,
} = {}) => {
    const statusField = getPublishedStatusField(editingLead, userRole);
    const currentCategory = (selectedCategory || editingLead?.category || "enquiry").toLowerCase();

    const categoryField = {
        name: "category",
        label: "Lead Category",
        type: "select",
        options: [
            { label: "Enquiry", value: "enquiry" },
            { label: "Manual", value: "manual" },
            { label: "Product", value: "product" },
        ],
        defaultValue: currentCategory,
        value: currentCategory,
        onChange: (val) => {
            const nextVal = typeof val === "object" ? (val?.value || val?.target?.value) : val;
            onCategoryChange?.(nextVal);
        },
        validation: { required: true },
    };

    const nameField = {
        name: "name",
        label: "Lead Full Name",
        type: "text",
        defaultValue: editingLead?.name || "",
        placeholder: "e.g. Rahul Sharma",
        validation: currentCategory === "product" ? {} : { required: true },
    };

    const mobileField = {
        name: "mobile",
        label: "Mobile Number",
        type: "tel",
        defaultValue: editingLead?.mobile || "",
        placeholder: "e.g. 9876543210",
        validation: currentCategory === "product" ? { mobile: true } : { required: true, mobile: true },
    };

    const emailField = {
        name: "email",
        label: "Email Address",
        type: "email",
        defaultValue: editingLead?.email || "",
        placeholder: "e.g. rahul@company.com",
        validation: { email: true },
    };

    const locationField = {
        name: "location",
        label: "Location",
        type: "text",
        defaultValue: editingLead?.location || "",
        placeholder: "e.g. Mumbai, Maharashtra",
    };

    const productsDefaultVal = Array.isArray(editingLead?.products)
        ? editingLead.products.map((p) => p?._id || p?.id || p)
        : editingLead?.products ? [editingLead.products] : [];

    const productsField = {
        name: "products",
        label: "Select Products",
        type: "multiselect",
        options: productOptions,
        defaultValue: productsDefaultVal,
        value: productsDefaultVal,
        placeholder: "Select Products...",
        validation: { required: true },
    };

    const severityField = {
        name: "severity",
        label: "Severity",
        type: "select",
        options: [
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
        ],
        defaultValue: editingLead?.severity ? editingLead.severity.toLowerCase() : "low",
    };

    const descriptionField = {
        name: "description",
        label: "Requirement Details & Notes",
        type: "textarea",
        defaultValue: editingLead?.description || editingLead?.notes || "",
        placeholder: "Enter enquiry requirements, projected order volume, commercial terms...",
        style: { width: "95%" },
    };

    let fields = [];
    if (currentCategory === "enquiry") {
        fields = [
            categoryField,
            nameField,
            emailField,
            mobileField,
            severityField,
            descriptionField,
            statusField,
        ];
    } else if (currentCategory === "manual") {
        fields = [
            categoryField,
            nameField,
            emailField,
            mobileField,
            locationField,
            severityField,
            descriptionField,
            statusField,
        ];
    } else if (currentCategory === "product") {
        fields = [
            categoryField,
            productsField,
            nameField,
            emailField,
            mobileField,
            severityField,
            descriptionField,
            statusField,
        ];
    } else {
        fields = [
            categoryField,
            nameField,
            emailField,
            mobileField,
            locationField,
            severityField,
            descriptionField,
            statusField,
        ];
    }

    return fields.filter(Boolean);
};

export const PRODUCT_UNIT_OPTIONS = [
    { label: "Unit", value: "Unit" },
    { label: "Kg", value: "Kg" },
    { label: "Pcs", value: "Pcs" },
    { label: "Rolls", value: "Rolls" },
    { label: "Meters", value: "Meters" },
    { label: "Grams", value: "Grams" },
    { label: "Boxes", value: "Boxes" },
    { label: "Sets", value: "Sets" },
    { label: "Pairs", value: "Pairs" },
    { label: "Packs", value: "Packs" },
    { label: "Liters", value: "Liters" },
];

/**
 * Generic field generator for Catalog Products
 */
export const getProductFormFields = ({
    editingProduct,
    categoryOptions = [],
    unitOptions = PRODUCT_UNIT_OPTIONS,
    severityOptions = [
        { label: "Pending Review", value: "pending" },
        { label: "Approved for Store", value: "approved" },
        { label: "Rejected / Revision", value: "rejected" },
    ],
    userRole,
} = {}) => {
    const statusField = getPublishedStatusField(editingProduct, userRole);
    const activeUnit = editingProduct?.unit || "Pcs";
    const matchedOption = unitOptions.find(
        (o) => String(typeof o === "object" ? o.value : o).toLowerCase() === String(activeUnit).toLowerCase()
    );
    const resolvedUnit = matchedOption ? (typeof matchedOption === "object" ? matchedOption.value : matchedOption) : activeUnit;
    const finalUnitOptions = matchedOption
        ? unitOptions
        : [{ label: activeUnit, value: activeUnit }, ...unitOptions];

    return [
        {
            name: "productName",
            label: "Product Name",
            type: "text",
            defaultValue: editingProduct
                ? (editingProduct.productName || editingProduct.title || editingProduct.name || "")
                : "",
            placeholder: "e.g. Standard PVC Strip Curtain",
            validation: { required: true },
        },
        {
            name: "categoryId",
            label: "Product Category",
            type: "select",
            options: categoryOptions,
            defaultValue: editingProduct
                ? String(editingProduct.categoryId?._id || editingProduct.categoryId || "")
                : (categoryOptions[0]?.value || ""),
            validation: { required: true },
        },
        {
            name: "price",
            label: "Price (INR)",
            type: "number",
            defaultValue: editingProduct ? (editingProduct.rawPrice ?? editingProduct.price ?? "") : "",
            placeholder: "e.g. 1499",
            validation: { required: true },
        },
        {
            name: "totalStock",
            label: "Total Stock Inventory",
            type: "number",
            defaultValue: editingProduct ? (editingProduct.totalStock ?? editingProduct.stock ?? 0) : 0,
            placeholder: "e.g. 50",
        },
        {
            name: "unit",
            label: "Unit of Measurement",
            type: "select",
            options: finalUnitOptions,
            defaultValue: resolvedUnit,
            placeholder: "Select unit of measurement",
        },
        {
            name: "severity",
            label: "Catalog Severity / Review Status",
            type: "select",
            options: severityOptions,
            defaultValue: editingProduct?.severity || "pending",
        },
        {
            name: "description",
            label: "Detailed Description",
            type: "textarea",
            defaultValue: editingProduct?.description || "",
            placeholder: "Detailed specifications, features, and warranty details...",
            style: { width: "95%" },
        },
        {
            name: "shortDesc",
            label: "Short Description",
            type: "textarea",
            defaultValue: editingProduct?.shortDesc || "",
            placeholder: "e.g. Durable PVC door strips for temperature control",
            style: { width: "95%" },
        },
        {
            name: "image",
            label: "Featured Cover Image",
            type: "dragfile",
            accept: "image/*",
            multiple: false,
            defaultValue: editingProduct
                ? (Array.isArray(editingProduct.image)
                    ? (editingProduct.image[0] || "")
                    : (editingProduct.image || ""))
                : "",
        },
        {
            name: "images",
            label: "Gallery Images (Max 5)",
            type: "bulk-image",
            cols: 3,
            max: 5,
            accept: "image/*",
            defaultValue: editingProduct && Array.isArray(editingProduct.images) ? editingProduct.images : [],
        },
        {
            name: "badges",
            label: "Product Badges",
            type: "bulk-badge",
            addText: "Add Badge",
            defaultValue: editingProduct && Array.isArray(editingProduct.badges) ? editingProduct.badges : [],
            placeholder: "e.g. Bestseller, Hot Deal, Eco Friendly",
        },
        {
            name: "specifications",
            label: "Product Specifications",
            type: "bulk-inputs",
            firstInputName: "name",
            firstInputLabel: "Specification Name",
            secondInputName: "value",
            secondInputLabel: "Value",
            addText: "Add Specification",
            defaultValue:
                editingProduct && Array.isArray(editingProduct.specifications) && editingProduct.specifications.length > 0
                    ? editingProduct.specifications
                    : [{ name: "", value: "" }],
        },
        {
            name: "isTrending",
            label: "Trending Product Highlight",
            type: "switch",
            defaultValue: editingProduct ? Boolean(editingProduct.isTrending) : false,
        },
        {
            name: "stockStatus",
            label: "In Stock Availability",
            type: "switch",
            defaultValue: editingProduct ? Boolean(editingProduct.stockStatus) : true,
        },
        ...(statusField ? [statusField] : []),
    ];
};

/**
 * Generic field generator for Product Reviews
 */
export const getProductReviewFormFields = ({
    products = [],
    reviewTargetProduct = null,
    ratingOptions = [
        { label: "★★★★★ (5 Stars - Excellent)", value: 5 },
        { label: "★★★★☆ (4 Stars - Very Good)", value: 4 },
        { label: "★★★☆☆ (3 Stars - Good)", value: 3 },
        { label: "★★☆☆☆ (2 Stars - Average)", value: 2 },
        { label: "★☆☆☆☆ (1 Star - Poor)", value: 1 },
    ],
    userRole,
} = {}) => {
    const statusField = getPublishedStatusField(null, userRole);
    return [
        {
            name: "productId",
            label: "Select Target Product",
            type: "select",
            options: (products || []).map((p) => ({
                label: `${p.productName || p.title || p.name} (${p.sku || p.id})`,
                value: String(p._id || p.id),
            })),
            defaultValue: reviewTargetProduct
                ? String(reviewTargetProduct._id || reviewTargetProduct.id)
                : String(products[0]?._id || products[0]?.id || ""),
            validation: { required: true },
        },
        {
            name: "rating",
            label: "Star Rating (1 to 5)",
            type: "select",
            options: ratingOptions,
            defaultValue: 5,
            validation: { required: true },
        },
        {
            name: "comment",
            label: "Feedback Comment",
            type: "textarea",
            placeholder: "Share detailed review and customer feedback...",
            validation: { required: true },
            style: { width: '95%' }
        },
        ...(statusField ? [statusField] : []),
    ];
};

/**
 * Generic field generator for Product Categories
 */
export const getProductCategoryFormFields = ({ editingCategory, userRole } = {}) => {
    const statusField = getPublishedStatusField(editingCategory, userRole);
    return [
        {
            name: "categoryName",
            label: "Category Name",
            type: "text",
            defaultValue: editingCategory ? (editingCategory.categoryName || editingCategory.name || "") : "",
            placeholder: "e.g. PVC strip Curtain Rolls",
            validation: { required: true },
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            defaultValue: editingCategory ? (editingCategory.description || "") : "",
            placeholder: "Provide brief description...",
            style: { width: "95%" },
        },
        {
            name: "image",
            label: "Category Image",
            type: "dragfile",
            accept: "image/*",
            multiple: false,
            defaultValue: editingCategory ? (editingCategory.image || editingCategory.icon || "") : [],
        },
        {
            name: "iconName",
            label: "Icon Identifier (Optional)",
            type: "text",
            defaultValue: editingCategory ? (editingCategory.iconName || "") : "",
            placeholder: "e.g. Box, Layers, Shield",
        },
        ...(statusField ? [statusField] : []),
    ];
};

/**
 * Generic field generator for Blogs / Articles
 */
export const getBlogFormFields = ({ editingBlog, categoryOptions = [], userRole } = {}) => {
    const statusField = getPublishedStatusField(editingBlog, userRole);
    return [
        {
            name: "blogName",
            label: "Article Title",
            type: "text",
            defaultValue: editingBlog ? (editingBlog.blogName || editingBlog.title || "") : "",
            placeholder: "e.g. Complete PVC Curtain Installation & Thermal Guide",
            validation: { required: true },
        },
        {
            name: "categoryId",
            label: "Blog Category",
            type: "select",
            options: categoryOptions,
            defaultValue: editingBlog
                ? String(editingBlog.categoryId?._id || editingBlog.categoryId || "")
                : (categoryOptions[0]?.value || ""),
            validation: { required: true },
        },
        {
            name: "shortDesc",
            label: "Article Summary / Excerpt",
            type: "text",
            defaultValue: editingBlog ? (editingBlog.shortDesc || "") : "",
            placeholder: "Short brief overview of the article...",
        },
        {
            name: "quote",
            label: "Featured Quote",
            type: "text",
            defaultValue: editingBlog ? (editingBlog.quote || "") : "",
            placeholder: "e.g. Featured Quote",
        },
        {
            name: "description",
            label: "Article Full Content",
            type: "textarea",
            defaultValue: editingBlog ? (editingBlog.description || "") : "",
            placeholder: "Write in-depth article content, technical insights, and guidelines...",
            validation: { required: true },
            style: { width: "95%" },
        },
        {
            name: "badges",
            label: "Article Tags",
            type: "bulk-badge",
            addText: "Add Tag",
            defaultValue: editingBlog && Array.isArray(editingBlog.badges) ? editingBlog.badges : [],
            placeholder: "e.g. Warehouse, Compliance, Energy Efficiency",
        },
        {
            name: "image",
            label: "Featured Cover Image",
            type: "dragfile",
            accept: "image/*",
            multiple: false,
            defaultValue: editingBlog ? (editingBlog.image || "") : [],
        },
        {
            name: "specifications",
            label: "Meta Properties (Key: Value)",
            type: "bulk-inputs",
            firstInputName: "name",
            firstInputLabel: "Property Name",
            secondInputName: "value",
            secondInputLabel: "Value",
            addText: "Add Property",
            defaultValue:
                editingBlog && Array.isArray(editingBlog.specifications) && editingBlog.specifications.length > 0
                    ? editingBlog.specifications
                    : [{ name: "", value: "" }],
        },
        ...(statusField ? [statusField] : []),
    ];
};

/**
 * Generic field generator for Blog Reviews
 */
export const getBlogReviewFormFields = ({
    blogs = [],
    reviewTargetBlog = null,
    ratingOptions = [
        { label: "★★★★★ (5 Stars - Excellent)", value: 5 },
        { label: "★★★★☆ (4 Stars - Very Good)", value: 4 },
        { label: "★★★☆☆ (3 Stars - Good)", value: 3 },
        { label: "★★☆☆☆ (2 Stars - Average)", value: 2 },
        { label: "★☆☆☆☆ (1 Star - Poor)", value: 1 },
    ],
    userRole,
} = {}) => {
    const statusField = getPublishedStatusField(null, userRole);
    return [
        {
            name: "blogId",
            label: "Select Article",
            type: "select",
            options: (blogs || []).map((b) => ({
                label: b.blogName || b.title || b.name,
                value: String(b._id || b.id),
            })),
            defaultValue: reviewTargetBlog
                ? String(reviewTargetBlog._id || reviewTargetBlog.id)
                : String(blogs[0]?._id || blogs[0]?.id || ""),
            validation: { required: true },
        },
        {
            name: "rating",
            label: "Reader Rating",
            type: "select",
            options: ratingOptions,
            defaultValue: 5,
            validation: { required: true },
        },
        {
            name: "comment",
            label: "Reader Review / Feedback",
            type: "textarea",
            placeholder: "Share your thoughts or feedback about this article...",
            validation: { required: true },
            style: { width: '95%' }
        },
        ...(statusField ? [statusField] : []),
    ];
};

/**
 * Generic field generator for Blog Categories
 */
export const getBlogCategoryFormFields = ({ editingCategory, userRole } = {}) => {
    const statusField = getPublishedStatusField(editingCategory, userRole);
    return [
        {
            name: "categoryName",
            label: "Category Name",
            type: "text",
            defaultValue: editingCategory ? (editingCategory.categoryName || editingCategory.name || "") : "",
            placeholder: "e.g. Warehouse & Cold Storage",
            validation: { required: true },
        },
        ...(statusField ? [statusField] : []),
    ];
};
/**
 * Generic field generator for SEO configurations
 */
export const getSeoFormFields = ({
    editingSeo,
    pageTypes = [
        { label: "Website Page", value: "website" },
        { label: "Article / Editorial", value: "article" },
        { label: "Product Page", value: "product" },
        { label: "Business Entity", value: "business" },
    ],
    userRole,
} = {}) => {
    let breadcrumbsDefaultJson = "";
    if (editingSeo?.breadcrumbs && editingSeo.breadcrumbs.length) {
        breadcrumbsDefaultJson = JSON.stringify(editingSeo.breadcrumbs, null, 2);
    }
    const statusField = getPublishedStatusField(editingSeo, userRole);

    return [
        {
            name: "name",
            label: "Identifier Key (Internal Name)",
            type: "text",
            defaultValue: editingSeo ? (editingSeo.name || "") : "",
            placeholder: "e.g. home, about, products, blog, contact",
            validation: { required: true },
        },
        {
            name: "page",
            label: "Display Page Name",
            type: "text",
            defaultValue: editingSeo ? (editingSeo.page || editingSeo.name || "") : "",
            placeholder: "e.g. Home Page, About Us, Industrial Solutions",
        },
        {
            name: "path",
            label: "Canonical URL Path",
            type: "text",
            defaultValue: editingSeo ? (editingSeo.path || "") : "",
            placeholder: "e.g. /, /about, /products, /contact-us",
            validation: { required: true },
        },
        {
            name: "type",
            label: "Schema / OpenGraph Page Type",
            type: "select",
            options: pageTypes,
            defaultValue: editingSeo?.type ? String(editingSeo.type).toLowerCase() : "website",
            validation: { required: true },
        },
        {
            name: "title",
            label: "Meta Title Tag (50-65 characters)",
            type: "text",
            defaultValue: editingSeo ? (editingSeo.title || "") : "",
            placeholder: "e.g. PVC Vinyl Products Supplier in India | Ashmita Vinyls",
            validation: { required: true },
        },
        {
            name: "noindex",
            label: "Robots Indexing Status",
            type: "select",
            options: [
                { label: "Index, Follow (Allow in Search Engines)", value: "false" },
                { label: "NoIndex, NoFollow (Block Crawlers)", value: "true" },
            ],
            defaultValue: editingSeo ? String(Boolean(editingSeo.noindex)) : "false",
            validation: { required: true },
        },
        {
            name: "description",
            label: "Meta Description Tag (120-160 characters)",
            type: "textarea",
            defaultValue: editingSeo ? (editingSeo.description || "") : "",
            placeholder: "Provide concise on-page search engine description with high-converting keywords...",
            validation: { required: true },
            style: { width: '95%' }
        },
        {
            name: "breadcrumbs",
            label: "Breadcrumbs Trail (JSON array format)",
            type: "textarea",
            defaultValue:
                breadcrumbsDefaultJson ||
                '[\n  { "label": "Home", "path": "/" }\n]',
            placeholder: '[{ "label": "Home", "path": "/" }]',
            style: { width: '95%' }
        },
        {
            name: "keywords",
            label: "Target Keywords (Comma Separated)",
            type: "text",
            defaultValue: editingSeo ? (editingSeo.keywords || "") : "",
            placeholder: "e.g. PVC strip curtains, industrial vinyl rolls, polar freezer curtains",
        },
        {
            name: "image",
            label: "Social OpenGraph Image URL",
            type: "text",
            defaultValue: editingSeo ? (editingSeo.image || "") : "",
            placeholder: "https://example.com/assets/og-image.jpg",
        },
        ...(statusField ? [statusField] : []),
    ];
};

/**
 * Centralized schema dispatcher for forms
 */
export const getCrudFormFields = (entity, config = {}) => {
    switch (entity) {
        case "user":
        case "users":
            return getUserFormFields(config);
        case "role":
        case "roles":
            return getRoleFormFields(config);
        case "lead":
        case "leads":
            return getLeadFormFields(config);
        case "product":
        case "products":
            return getProductFormFields(config);
        case "productReview":
        case "productReviews":
            return getProductReviewFormFields(config);
        case "productCategory":
        case "productCategories":
            return getProductCategoryFormFields(config);
        case "blog":
        case "blogs":
            return getBlogFormFields(config);
        case "blogReview":
        case "blogReviews":
            return getBlogReviewFormFields(config);
        case "blogCategory":
        case "blogCategories":
            return getBlogCategoryFormFields(config);
        case "seo":
            return getSeoFormFields(config);
        default:
            return [];
    }
};

/**
 * Reusable generic CRUD Modal with FormBuilder integration
 */
export const CrudModal = React.memo(({
    isOpen,
    onClose,
    title,
    description,
    fields = [],
    onSubmit,
    submitText = "Save",
    loading = false,
    size = "medium",
    columns = 1,
    children,
    userRole,
    isEditing = false,
}) => {
    if (!isOpen) return null;

    const handleFormSubmit = (formData) => {
        const sanitized = sanitizeCrudFormData(formData, { userRole, isEditing });
        onSubmit?.(sanitized);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} description={description} size={size}>
            {children}
            <FormBuilder
                fields={fields}
                onSubmit={handleFormSubmit}
                submitText={submitText}
                loading={loading}
                columns={columns}
            />
        </Modal>
    );
});
CrudModal.displayName = "CrudModal";

export default CrudModal;
