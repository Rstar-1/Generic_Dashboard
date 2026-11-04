import React from "react";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import FormBuilder from "../../components/forms/FormBuilder";
import Icon from "../../components/common/Icon";
import { showToast } from "../../components/common/Toast";
import { copyToClipboard } from "../../utils";
import {
    rolesData,
    usersData,
    leadsData,
    customersData,
    productsData,
    productCategoriesData,
    blogsData,
    blogCategoriesData,
    cmsData,
    seoData,
    ordersData,
    transactionsData,
} from "../../utils/apiData";

// Single unique permissions extracted from rolesData in apiData.js
const ROLE_PERMISSIONS_OPTIONS = Array.from(
    new Set(
        rolesData.flatMap((r) =>
            Array.isArray(r.permissions) ? r.permissions : [r.permissions]
        ).filter(Boolean)
    )
)
    .sort((a, b) => (a === "Full_Access" ? -1 : b === "Full_Access" ? 1 : a.localeCompare(b)))
    .map((perm) => ({
        label: perm,
        value: perm,
    }));

// Single unique pages extracted from rolesData in apiData.js
const ROLE_PAGES_OPTIONS = Array.from(
    new Set(
        rolesData.flatMap((r) =>
            Array.isArray(r.pages) ? r.pages : [r.pages]
        ).filter(Boolean)
    )
)
    .sort((a, b) => (a === "Full_Access" ? -1 : b === "Full_Access" ? 1 : a.localeCompare(b)))
    .map((page) => ({
        label: page,
        value: page,
    }));

// Entity Form Field Configurations for all Dashboard Pages according to apiData.js
const ENTITY_CONFIGS = [
    {
        key: "roles",
        title: "Role",
        buttonText: "Add Roles",
        fields: [
            {
                name: "id",
                label: "Role ID",
                type: "text",
                defaultValue: `ROLE-00${rolesData.length + 1}`,
                placeholder: "e.g. ROLE-006",
            },
            {
                name: "name",
                label: "Role Name",
                type: "text",
                placeholder: "e.g. Operations Manager",
                validation: { required: true },
            },
            {
                name: "role",
                label: "Role Identifier",
                type: "select",
                options: [
                    { label: "Admin", value: "admin" },
                    { label: "Manager", value: "manager" },
                    { label: "Accountant", value: "accountant" },
                    { label: "Product", value: "product" },
                    { label: "Customer", value: "customer" },
                ],
                defaultValue: "manager",
            },
            {
                name: "permissions",
                label: "Permissions",
                type: "multiselect",
                options: ROLE_PERMISSIONS_OPTIONS,
                defaultValue: ["Full_Access"],
            },
            {
                name: "pages",
                label: "Allowed Pages",
                type: "multiselect",
                options: ROLE_PAGES_OPTIONS,
                defaultValue: ["Full_Access"],
            },
            {
                name: "usersassigned",
                label: "Users Assigned",
                type: "number",
                defaultValue: 1,
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
    {
        key: "users",
        title: "System User",
        buttonText: "Add Users",
        fields: [
            {
                name: "id",
                label: "User ID",
                type: "text",
                defaultValue: `USR-00${usersData.length + 1}`,
                placeholder: "e.g. USR-007",
            },
            {
                name: "name",
                label: "Full Name",
                type: "text",
                placeholder: "e.g. Rohit Sharma",
                validation: { required: true },
            },
            {
                name: "email",
                label: "Email Address",
                type: "email",
                placeholder: "e.g. rohit@example.com",
                validation: { required: true, email: true },
            },
            {
                name: "mobile",
                label: "Mobile Number",
                type: "tel",
                placeholder: "e.g. 9876543210",
                validation: { mobile: true },
            },
            {
                name: "role",
                label: "User Role",
                type: "select",
                options: [
                    { label: "Admin", value: "Admin" },
                    { label: "Manager", value: "Manager" },
                    { label: "Accountant", value: "Accountant" },
                    { label: "Product", value: "Product" },
                    { label: "Customer", value: "Customer" },
                ],
                defaultValue: "Admin",
            },
            {
                name: "lastActive",
                label: "Last Active",
                type: "text",
                defaultValue: "Just now",
                placeholder: "e.g. Just now",
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
    {
        key: "leads",
        title: "Lead",
        buttonText: "Add Leads",
        fields: [
            {
                name: "id",
                label: "Lead ID",
                type: "text",
                defaultValue: `LEAD-00${leadsData.length + 1}`,
                placeholder: "e.g. LEAD-007",
            },
            {
                name: "name",
                label: "Lead / Prospect Name",
                type: "text",
                placeholder: "e.g. Sunil Deshmukh",
                validation: { required: true },
            },
            {
                name: "company",
                label: "Company Name",
                type: "text",
                placeholder: "e.g. Reliance Retail Cold Chains",
            },
            {
                name: "contact",
                label: "Contact Number",
                type: "tel",
                placeholder: "e.g. +91 98201 44512",
            },
            {
                name: "value",
                label: "Est. Deal Value",
                type: "text",
                placeholder: "e.g. ₹2,45,000",
            },
            {
                name: "source",
                label: "Acquisition Source",
                type: "select",
                options: [
                    { label: "Website Enquiry", value: "Website Enquiry" },
                    { label: "Direct Call", value: "Direct Call" },
                    { label: "Partner Referral", value: "Partner Referral" },
                    { label: "Google Ads", value: "Google Ads" },
                    { label: "Trade Expo", value: "Trade Expo" },
                ],
                defaultValue: "Website Enquiry",
            },
            {
                name: "assignedTo",
                label: "Assigned Rep",
                type: "select",
                options: [
                    { label: "Raj Shetye", value: "Raj Shetye" },
                    { label: "Pooja Hegde", value: "Pooja Hegde" },
                    { label: "Vikram Mehta", value: "Vikram Mehta" },
                    { label: "Unassigned", value: "Unassigned" },
                ],
                defaultValue: "Raj Shetye",
            },
            {
                name: "createdByName",
                label: "Created By",
                type: "text",
                defaultValue: "Raj Shetye",
                placeholder: "e.g. Raj Shetye",
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
    {
        key: "customers",
        title: "Customer",
        buttonText: "Add Customers",
        fields: [
            {
                name: "id",
                label: "Customer ID",
                type: "text",
                defaultValue: `CUST-00${customersData.length + 1}`,
                placeholder: "e.g. CUST-007",
            },
            {
                name: "name",
                label: "Customer Name",
                type: "text",
                placeholder: "e.g. Ashmita Vinyls",
                validation: { required: true },
            },
            {
                name: "company",
                label: "Company Name",
                type: "text",
                placeholder: "e.g. Ashmita Vinyls Pvt Ltd",
            },
            {
                name: "email",
                label: "Email Address",
                type: "email",
                placeholder: "e.g. ashmitavinyls@gmail.com",
            },
            {
                name: "mobile",
                label: "Mobile Number",
                type: "tel",
                placeholder: "e.g. 8879741021",
            },
            {
                name: "type",
                label: "Seller Type",
                type: "select",
                options: [
                    { label: "Trader", value: "Trader" },
                    { label: "Retailer", value: "Retailer" },
                    { label: "Dealer", value: "Dealer" },
                    { label: "Manufacture", value: "Manufacture" },
                ],
                defaultValue: "Trader",
            },
            {
                name: "ordersCount",
                label: "Orders Count",
                type: "number",
                defaultValue: 1,
            },
            {
                name: "totalAmount",
                label: "Total Amount",
                type: "text",
                placeholder: "e.g. ₹15,800",
            },
            {
                name: "totalSpent",
                label: "Total Spent",
                type: "text",
                placeholder: "e.g. ₹1,45,800",
            },
            {
                name: "createdByName",
                label: "Created By",
                type: "text",
                defaultValue: "Raj Shetye",
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
    {
        key: "products",
        title: "Product",
        buttonText: "Add Products",
        fields: [
            {
                name: "id",
                label: "Product ID",
                type: "text",
                defaultValue: `PRD-00${productsData.length + 1}`,
                placeholder: "e.g. PRD-007",
            },
            {
                name: "title",
                label: "Product Title",
                type: "text",
                placeholder: "e.g. Clear Standard PVC Strip Roll (2mm x 200mm x 50m)",
                validation: { required: true },
            },
            {
                name: "sku",
                label: "SKU Identifier",
                type: "text",
                placeholder: "e.g. SKU-PVC-CLR-200",
            },
            {
                name: "category",
                label: "Product Category",
                type: "select",
                options: [
                    { label: "Standard PVC", value: "Standard PVC" },
                    { label: "Polar Grade", value: "Polar Grade" },
                    { label: "Brackets", value: "Brackets" },
                    { label: "Anti-Insect", value: "Anti-Insect" },
                    { label: "Magnetic Kit", value: "Magnetic Kit" },
                    { label: "Heavy Duty", value: "Heavy Duty" },
                    { label: "Welding Screen", value: "Welding Screen" },
                ],
                defaultValue: "Standard PVC",
            },
            {
                name: "price",
                label: "Unit Price",
                type: "text",
                placeholder: "e.g. ₹4,850",
                validation: { required: true },
            },
            {
                name: "stock",
                label: "Stock Quantity",
                type: "text",
                placeholder: "e.g. 142 rolls",
            },
            {
                name: "rating",
                label: "Product Rating",
                type: "text",
                placeholder: "e.g. 4.9 ★",
                defaultValue: "5.0 ★",
            },
            {
                name: "image",
                label: "Product Image Path",
                type: "text",
                placeholder: "e.g. product/Product4.jpg",
                defaultValue: "product/Product4.jpg",
            },
            {
                name: "createdByName",
                label: "Created By",
                type: "text",
                defaultValue: "Raj Shetye",
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
    {
        key: "productCategories",
        title: "Product Category",
        buttonText: "Add Products Category",
        fields: [
            {
                name: "id",
                label: "Category ID",
                type: "text",
                defaultValue: `CAT-00${productCategoriesData.length + 1}`,
                placeholder: "e.g. CAT-007",
            },
            {
                name: "name",
                label: "Category Name",
                type: "text",
                placeholder: "e.g. PVC Magnetic Strip Curtain Rolls",
                validation: { required: true },
            },
            {
                name: "slug",
                label: "URL Slug",
                type: "text",
                placeholder: "e.g. pvc-magnetic-strip-curtain-rolls",
            },
            {
                name: "categoryCode",
                label: "Category Code",
                type: "text",
                placeholder: "e.g. CAT-PVC-01",
                validation: { required: true },
            },
            {
                name: "subCategoriesCount",
                label: "Subcategories Count",
                type: "number",
                defaultValue: 2,
            },
            {
                name: "productsCount",
                label: "Products Count",
                type: "number",
                defaultValue: 12,
            },
            {
                name: "icon",
                label: "Category Icon / Image",
                type: "text",
                defaultValue: "product/Product4.jpg",
            },
            {
                name: "createdByName",
                label: "Created By",
                type: "text",
                defaultValue: "Raj Shetye",
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
    {
        key: "blogs",
        title: "Blog Article",
        buttonText: "Add Blogs",
        fields: [
            {
                name: "id",
                label: "Blog ID",
                type: "text",
                defaultValue: `BLG-00${blogsData.length + 1}`,
                placeholder: "e.g. BLG-007",
            },
            {
                name: "title",
                label: "Article Title",
                type: "text",
                placeholder: "e.g. PVC Curtain Rolls: Complete 2026 Buying Guide",
                validation: { required: true },
            },
            {
                name: "category",
                label: "Blog Category",
                type: "select",
                options: [
                    { label: "Buying & Selection Guide", value: "Buying & Selection Guide" },
                    { label: "Energy Efficiency", value: "Energy Efficiency" },
                    { label: "Installation Guides", value: "Installation Guides" },
                    { label: "Workplace Safety", value: "Workplace Safety" },
                    { label: "Cold Storage", value: "Cold Storage" },
                ],
                defaultValue: "Buying & Selection Guide",
            },
            {
                name: "author",
                label: "Author Name",
                type: "text",
                defaultValue: "Technical Specialist",
            },
            {
                name: "readTime",
                label: "Read Duration",
                type: "text",
                defaultValue: "6 min read",
            },
            {
                name: "comments",
                label: "Comments",
                type: "text",
                defaultValue: "10 Comments",
            },
            {
                name: "views",
                label: "Total Views",
                type: "text",
                defaultValue: "12,500",
            },
            {
                name: "tags",
                label: "Article Tags (Comma separated)",
                type: "text",
                placeholder: "Trends, Buying Guide, Industrial, PVC Rolls",
                defaultValue: "Trends, Buying Guide, Industrial, PVC Rolls",
            },
            {
                name: "excerpt",
                label: "Excerpt / Summary",
                type: "textarea",
                placeholder: "Brief summary of the article...",
            },
            {
                name: "image",
                label: "Blog Image Path",
                type: "text",
                defaultValue: "blog/Blog1.jpg",
            },
            {
                name: "createdByName",
                label: "Created By",
                type: "text",
                defaultValue: "Raj Shetye",
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
    {
        key: "blogCategories",
        title: "Blog Category",
        buttonText: "Add Blogs Category",
        fields: [
            {
                name: "id",
                label: "Category ID",
                type: "text",
                defaultValue: `BCAT-00${blogCategoriesData.length + 1}`,
                placeholder: "e.g. BCAT-007",
            },
            {
                name: "name",
                label: "Category Name",
                type: "text",
                placeholder: "e.g. Buying & Selection Guide",
                validation: { required: true },
            },
            {
                name: "slug",
                label: "Slug",
                type: "text",
                placeholder: "e.g. buying-selection-guide",
            },
            {
                name: "badge",
                label: "Badge Tag",
                type: "text",
                placeholder: "e.g. Buying Guide",
                defaultValue: "Buying Guide",
            },
            {
                name: "articlesCount",
                label: "Articles Count",
                type: "number",
                defaultValue: 8,
            },
            {
                name: "views",
                label: "Total Views",
                type: "text",
                defaultValue: "25.4k",
            },
            {
                name: "icon",
                label: "Icon Path",
                type: "text",
                defaultValue: "SPLEDO.png",
            },
            {
                name: "createdByName",
                label: "Created By",
                type: "text",
                defaultValue: "Raj Shetye",
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
    {
        key: "cms",
        title: "CMS Section",
        buttonText: "Add CMS",
        fields: [
            {
                name: "id",
                label: "CMS ID",
                type: "text",
                defaultValue: `CMS-00${cmsData.length + 1}`,
                placeholder: "e.g. CMS-007",
            },
            {
                name: "title",
                label: "Content Block Title",
                type: "text",
                placeholder: "e.g. Hero Commercial Banner",
                validation: { required: true },
            },
            {
                name: "slug",
                label: "Slug Identifier",
                type: "text",
                placeholder: "e.g. hero-commercial-banner",
            },
            {
                name: "sectionArea",
                label: "Section Location Area",
                type: "select",
                options: [
                    { label: "Home Hero", value: "Home Hero" },
                    { label: "Feature Section", value: "Feature Section" },
                    { label: "Footer Bar", value: "Footer Bar" },
                    { label: "Promo Topbar", value: "Promo Topbar" },
                    { label: "Banner Area", value: "Banner Area" },
                ],
                defaultValue: "Home Hero",
            },
            {
                name: "author",
                label: "Author / Editor",
                type: "text",
                defaultValue: "Raj Shetye",
            },
            {
                name: "revision",
                label: "Revision Tag",
                type: "text",
                defaultValue: "v1.0",
                placeholder: "e.g. v2.4",
            },
            {
                name: "createdByName",
                label: "Created By",
                type: "text",
                defaultValue: "Raj Shetye",
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
    {
        key: "seo",
        title: "SEO Metadata",
        buttonText: "Add SEO",
        fields: [
            {
                name: "id",
                label: "Page ID",
                type: "text",
                defaultValue: `SEO-00${seoData.length + 1}`,
                placeholder: "e.g. SEO-007",
            },
            {
                name: "pageName",
                label: "Page Name & Route",
                type: "text",
                placeholder: "e.g. Home Page (/home)",
                validation: { required: true },
            },
            {
                name: "title",
                label: "Meta Title",
                type: "text",
                placeholder: "e.g. PVC Vinyl Products Supplier in India | Ashmita Vinyls",
                validation: { required: true },
            },
            {
                name: "description",
                label: "Meta Description",
                type: "textarea",
                placeholder: "Explore high-grade PVC strip curtains, industrial vinyl rolls...",
            },
            {
                name: "targetKeyword",
                label: "Target Focus Keyword",
                type: "text",
                placeholder: "e.g. PVC vinyl products",
            },
            {
                name: "breadcrumbsText",
                label: "Breadcrumbs",
                type: "text",
                placeholder: "e.g. Home > Products",
                defaultValue: "Home",
            },
            {
                name: "canonical",
                label: "Canonical URL",
                type: "text",
                placeholder: "e.g. https://ashmitavinyls.com/home",
            },
            {
                name: "seoScore",
                label: "SEO Score",
                type: "text",
                defaultValue: "95 / 100",
            },
            {
                name: "lastCrawled",
                label: "Last Crawled Date",
                type: "text",
                defaultValue: "2026-10-25",
            },
            {
                name: "createdByName",
                label: "Created By",
                type: "text",
                defaultValue: "Raj Shetye",
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
    {
        key: "orders",
        title: "Order",
        buttonText: "Add Orders",
        fields: [
            {
                name: "id",
                label: "Internal ID",
                type: "text",
                defaultValue: `ORD-00${ordersData.length + 1}`,
                placeholder: "e.g. ORD-007",
            },
            {
                name: "orderId",
                label: "Order Reference ID",
                type: "text",
                placeholder: "e.g. ORD-99220",
                defaultValue: `ORD-992${ordersData.length + 20}`,
                validation: { required: true },
            },
            {
                name: "customerName",
                label: "Customer Name",
                type: "text",
                placeholder: "e.g. Ashwini Sawant",
                validation: { required: true },
            },
            {
                name: "customerEmail",
                label: "Customer Email",
                type: "email",
                placeholder: "e.g. ashmitavinyls@gmail.com",
            },
            {
                name: "itemsCount",
                label: "Items Count",
                type: "number",
                defaultValue: 6,
            },
            {
                name: "totalAmount",
                label: "Total Amount",
                type: "text",
                placeholder: "e.g. ₹34,800",
                validation: { required: true },
            },
            {
                name: "paymentMethod",
                label: "Payment Method",
                type: "select",
                options: [
                    { label: "UPI / NetBanking", value: "UPI / NetBanking" },
                    { label: "Credit Card", value: "Credit Card" },
                    { label: "Wire Transfer", value: "Wire Transfer" },
                    { label: "Cash On Delivery", value: "Cash On Delivery" },
                ],
                defaultValue: "UPI / NetBanking",
            },
            {
                name: "createdByName",
                label: "Created By",
                type: "text",
                defaultValue: "Raj Shetye",
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
    {
        key: "transactions",
        title: "Transaction",
        buttonText: "Add Transactions",
        fields: [
            {
                name: "id",
                label: "Internal ID",
                type: "text",
                defaultValue: `TXN-90${transactionsData.length + 1}`,
                placeholder: "e.g. TXN-907",
            },
            {
                name: "transactionId",
                label: "Transaction ID",
                type: "text",
                placeholder: "e.g. TXN-982025",
                defaultValue: `TXN-9820${transactionsData.length + 20}`,
                validation: { required: true },
            },
            {
                name: "customerName",
                label: "Customer / Client Name",
                type: "text",
                placeholder: "e.g. Ashmita Vinyls",
                validation: { required: true },
            },
            {
                name: "customerMobile",
                label: "Customer Mobile",
                type: "tel",
                placeholder: "e.g. 9087654321",
            },
            {
                name: "amount",
                label: "Payment Amount",
                type: "text",
                placeholder: "e.g. ₹45,800",
                validation: { required: true },
            },
            {
                name: "method",
                label: "Payment Mode",
                type: "select",
                options: [
                    { label: "Cash On Delivery", value: "Cash On Delivery" },
                    { label: "UPI / NetBanking", value: "UPI / NetBanking" },
                    { label: "Credit Card", value: "Credit Card" },
                ],
                defaultValue: "Cash On Delivery",
            },
            {
                name: "createdByName",
                label: "Created By",
                type: "text",
                defaultValue: "Raj Shetye",
            },
            {
                name: "isActive",
                label: "Status",
                type: "switch",
                defaultValue: true,
            },
            {
                name: "isDeleted",
                label: "Deleted",
                type: "switch",
                defaultValue: false,
            },
        ],
    },
];

// Initial default payload matching the real rolesData[0] structure from apiData.js
const DEFAULT_SAMPLE_PAYLOAD = {
    message: "Click any 'Add [Page]' button above to open the FormBuilder modal. When submitted, the exact payload will appear here in real-time JSON format matching apiData.js schema.",
    samplePayload: rolesData[0] || {
        id: "ROLE-001",
        name: "Customer",
        role: "customer",
        rolename: "Customer",
        permissions: ["dashboard"],
        pages: ["Dashboard"],
        usersCount: 3,
        usersassigned: 3,
        status: "Active",
        isActive: true,
        isDeleted: false,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-08-05T12:17:38.020Z",
    },
};

const Analytics = () => {
    const [activeModalKey, setActiveModalKey] = React.useState(null);
    const [submittedPayload, setSubmittedPayload] = React.useState(DEFAULT_SAMPLE_PAYLOAD);
    const [lastEntityName, setLastEntityName] = React.useState(null);
    const [timestamp, setTimestamp] = React.useState(null);

    const activeConfig = React.useMemo(
        () => ENTITY_CONFIGS.find((c) => c.key === activeModalKey),
        [activeModalKey]
    );

    const handleOpenModal = React.useCallback((key) => {
        setActiveModalKey(key);
    }, []);

    const handleCloseModal = React.useCallback(() => {
        setActiveModalKey(null);
    }, []);

    const handleSubmitPayload = React.useCallback(
        (data) => {
            const now = new Date().toISOString();
            const todayDate = now.split("T")[0];

            // Format createdby matching apiData.js standard
            const createdby = data.createdby && typeof data.createdby === "object"
                ? data.createdby
                : {
                    name: data.createdByName || "Raj Shetye",
                    mobile: data.createdByMobile || "8779030638",
                    avatar: data.createdByAvatar || "",
                };

            // Format nested customer profile object for Orders & Transactions
            let customerObj = data.customer;
            if (activeModalKey === "orders") {
                customerObj = (data.customer && typeof data.customer === "object") ? data.customer : {
                    name: data.customerName || data.customer || "Ashwini Sawant",
                    email: data.customerEmail || "ashmitavinyls@gmail.com",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
                };
            } else if (activeModalKey === "transactions") {
                customerObj = (data.customer && typeof data.customer === "object") ? data.customer : {
                    name: data.customerName || data.customer || "Ashmita Vinyls",
                    mobile: data.customerMobile || "9087654321",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
                };
            }

            // Permissions array resolution for roles according to rolesData in apiData.js
            let permissionsArr = data.permissions;
            if (activeModalKey === "roles") {
                const matchedRole = rolesData.find(
                    (r) => r.role === data.role || r.name?.toLowerCase() === data.name?.toLowerCase()
                );
                if (typeof permissionsArr === "string") {
                    permissionsArr = permissionsArr.includes(",")
                        ? permissionsArr.split(",").map((s) => s.trim())
                        : [permissionsArr];
                } else if (!Array.isArray(permissionsArr) && matchedRole) {
                    permissionsArr = matchedRole.permissions;
                } else if (!Array.isArray(permissionsArr)) {
                    permissionsArr = ["Full_Access"];
                }
            }

            // Pages array resolution for roles according to rolesData in apiData.js
            let pagesArr = data.pages;
            if (activeModalKey === "roles") {
                const matchedRole = rolesData.find(
                    (r) => r.role === data.role || r.name?.toLowerCase() === data.name?.toLowerCase()
                );
                if (typeof pagesArr === "string") {
                    pagesArr = pagesArr.includes(",")
                        ? pagesArr.split(",").map((s) => s.trim())
                        : [pagesArr];
                } else if (!Array.isArray(pagesArr) && matchedRole) {
                    pagesArr = matchedRole.pages;
                } else if (!Array.isArray(pagesArr)) {
                    pagesArr = ["Full_Access"];
                }
            }

            // Tags array resolution for blogs
            let tagsArr = data.tags;
            if (activeModalKey === "blogs") {
                if (typeof tagsArr === "string") {
                    tagsArr = tagsArr.split(",").map((s) => s.trim());
                } else if (!Array.isArray(tagsArr)) {
                    tagsArr = ["Trends", "Buying Guide", "Industrial", "PVC Rolls"];
                }
            }

            // Build clean object matching apiData.js keys
            const cleaned = { ...data };
            delete cleaned.createdByName;
            delete cleaned.createdByMobile;
            delete cleaned.createdByAvatar;
            if (activeModalKey === "orders") {
                delete cleaned.customerName;
                delete cleaned.customerEmail;
            }
            if (activeModalKey === "transactions") {
                delete cleaned.customerName;
                delete cleaned.customerMobile;
            }

            const finalPayload = {
                ...cleaned,
                ...(customerObj ? { customer: customerObj } : {}),
                ...(activeModalKey === "roles" ? { rolename: data.name || data.rolename || "Role", permissions: permissionsArr, pages: pagesArr } : {}),
                ...(activeModalKey === "blogs" ? { tags: tagsArr } : {}),
                ...(activeModalKey !== "roles" && activeModalKey !== "users" ? { createdby } : {}),
                status: data.isActive ? "Active" : "Inactive",
                isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
                isDeleted: Boolean(data.isDeleted),
                createdAt: data.createdAt || "2026-01-01T00:00:00.000Z",
                updatedAt: now,
            };

            setSubmittedPayload(finalPayload);
            setLastEntityName(activeConfig?.title || "Entity");
            setTimestamp(new Date().toLocaleTimeString());

            showToast(`${activeConfig?.title || "Form"} payload generated matching apiData.js!`, "success");
            setActiveModalKey(null);
        },
        [activeConfig, activeModalKey]
    );

    const handleCopyJson = React.useCallback(async () => {
        const text = JSON.stringify(submittedPayload, null, 2);
        const ok = await copyToClipboard(text);
        if (ok) {
            showToast("JSON payload copied to clipboard!", "success");
        } else {
            showToast("Failed to copy JSON", "danger");
        }
    }, [submittedPayload]);

    const handleResetPayload = React.useCallback(() => {
        setSubmittedPayload(DEFAULT_SAMPLE_PAYLOAD);
        setLastEntityName(null);
        setTimestamp(null);
        showToast("JSON preview reset to default apiData.js sample", "info");
    }, []);

    return (
        <div className="p-20">
            {/* Grid of Action Buttons matching user page cards */}
            <div className="grid-cols-4 sm-grid-cols-2 gap-12">
                {ENTITY_CONFIGS.map((item) => (
                    <div
                        key={item.key}
                        className="bg-forth flex items-center justify-center py-40 rounded-5 transition-all hover:bg-light"
                        style={{ border: "1px solid #ececec" }}
                    >
                        <Button
                            version="v2"
                            bg="primary"
                            color="white"
                            text={item.buttonText}
                            onClick={() => handleOpenModal(item.key)}
                        />
                    </div>
                ))}
            </div>

            {/* Real-time JSON Payload Viewer */}
            <div className="mt-24 bg-white rounded-5 p-16 b-shadow border-ec">
                <div className="flex items-center justify-between bordb pb-12 mb-12">
                    <div className="flex items-center gap-10">
                        <div
                            className="bg-light-primary center-div rounded-5"
                            style={{ width: "36px", height: "36px" }}
                        >
                            <Icon name="CMS" width="18" height="18" stroke="var(--primary)" />
                        </div>
                        <div>
                            <div className="flex items-center gap-8">
                                <h3 className="headmini-text font-600 text-dark">
                                    Submitted Payload (JSON View)
                                </h3>
                                {lastEntityName && (
                                    <span className="mini-text font-600 bg-light-success text-success px-8 py-2 rounded-4">
                                        {lastEntityName} Submitted
                                    </span>
                                )}
                            </div>
                            <p className="mini-text text-gray mt-2">
                                {timestamp
                                    ? `Last submission received at ${timestamp}`
                                    : "Fill any form modal using FormBuilder to inspect the submitted payload matching apiData.js in real time"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <Button
                            version="v0"
                            bg="primary"
                            color="white"
                            icon="Copy"
                            text="Copy JSON"
                            onClick={handleCopyJson}
                        />
                        <Button
                            version="v0"
                            bg="tertiary"
                            color="dark"
                            icon="Refresh"
                            text="Reset"
                            onClick={handleResetPayload}
                        />
                    </div>
                </div>

                <div className="relative rounded-5 overflow-hidden">
                    <pre
                        spellCheck={false}
                        className="w-full small-text font-mono p-16 overflow-auto"
                        style={{
                            backgroundColor: "#0f172a",
                            color: "#38bdf8",
                            minHeight: "300px",
                            maxHeight: "520px",
                            margin: 0,
                            borderRadius: "5px",
                            lineHeight: "1.6",
                            fontSize: "12.5px",
                        }}
                    >
                        {JSON.stringify(submittedPayload, null, 2)}
                    </pre>
                </div>
            </div>

            {/* Dynamic Modal using FormBuilder according to selected page */}
            <Modal
                isOpen={Boolean(activeModalKey)}
                onClose={handleCloseModal}
                title={activeConfig ? `Add New ${activeConfig.title}` : "Add Item"}
                size="md"
                footer={null}
            >
                {activeConfig && (
                    <FormBuilder
                        key={activeModalKey}
                        fields={activeConfig.fields}
                        submitType="json"
                        onSubmit={handleSubmitPayload}
                        submitText={`Submit & Generate ${activeConfig.title} Payload`}
                        col="2"
                    />
                )}
            </Modal>
        </div>
    );
};

export default React.memo(Analytics);
