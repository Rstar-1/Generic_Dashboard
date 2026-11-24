import { formatDate } from "./formatDate.js";

/**
 * Generic color palette used across tables, profile avatars, and badges
 */
const AVATAR_PALETTE = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#6366f1", // indigo
];

/**
 * Common status options used across page filter toolbars and form select fields
 */
const STATUS_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

/**
 * 5-Star rating scale options
 */
const RATING_OPTIONS = [
  { label: "★★★★★ (5 Stars - Excellent)", value: 5 },
  { label: "★★★★☆ (4 Stars - Very Good)", value: 4 },
  { label: "★★★☆☆ (3 Stars - Good)", value: 3 },
  { label: "★★☆☆☆ (2 Stars - Average)", value: 2 },
  { label: "★☆☆☆☆ (1 Star - Poor)", value: 1 },
];

/**
 * Generic navigation tabs configuration for MainLayout header
 */
const TABS = [
  { name: "All", value: "all" },
  { name: "Trash", value: "trash" },
];

TABS.default = [
  { name: "All", value: "all" },
  { name: "Trash", value: "trash" },
];

TABS.products = [
  { name: "All Products", value: "all" },
  { name: "Reviews", value: "reviews" },
  { name: "Trash", value: "trash" },
];

TABS.blogs = [
  { name: "All Articles", value: "all" },
  { name: "Reviews", value: "reviews" },
  { name: "Trash", value: "trash" },
];

TABS.productCategories = [
  { name: "All Categories", value: "all" },
  { name: "Trash", value: "trash" },
];

TABS.blogCategories = [
  { name: "All Categories", value: "all" },
  { name: "Trash", value: "trash" },
];

TABS.leads = [
  { name: "All Leads", value: "all" },
  { name: "Trash", value: "trash" },
];

TABS.seo = [
  { name: "All Pages", value: "all" },
  { name: "Trash", value: "trash" },
];

TABS.roles = [
  { name: "All Roles", value: "all" },
  { name: "Trash", value: "trash" },
];

TABS.users = [
  { name: "All Users", value: "all" },
  { name: "Trash", value: "trash" },
];

const menuData = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: "Grid",
    status: true,
    role: ["admin", "vendor", "Manager"],
  },
  {
    name: "Leads",
    route: "/management/leads",
    icon: "Box",
    status: true,
    role: ["admin", "vendor", "Manager"],
  },
  {
    name: "Location",
    route: "/management/location",
    icon: "MapPin",
    status: true,
    role: ["admin", "vendor", "Manager"],
  },
  {
    name: "Category",
    status: true,
    role: ["admin", "vendor", "Manager"],
    category: [
      {
        name: "Products",
        route: "/category/products",
        icon: "Box",
        status: true,
        role: ["admin", "vendor", "Manager"],
      },
      {
        name: "Blogs",
        route: "/category/blogs",
        icon: "Clipboard",
        status: true,
        role: ["admin", "vendor", "Manager"],
      },
    ],
  },
  {
    name: "Overview",
    status: true,
    role: ["admin", "vendor", "Manager"],
    category: [
      {
        name: "Products",
        route: "/overview/products",
        icon: "Box",
        status: true,
        role: ["admin", "vendor", "Manager"],
      },
      {
        name: "Blogs",
        route: "/overview/blogs",
        icon: "Clipboard",
        status: true,
        role: ["admin", "vendor", "Manager"],
      },
      {
        name: "SEO",
        route: "/overview/seo",
        icon: "File",
        status: true,
        role: ["admin", "vendor", "Manager"],
      },
    ],
  },
  // {
  //   name: "Architecture",
  //   route: "/architecture",
  //   icon: "Code",
  //   status: true,
  //   role: ["admin", "vendor", "Manager"],
  // },
  // {
  //   name: "Meta",
  //   route: "/meta",
  //   icon: "Layers",
  //   status: true,
  //   role: ["admin", "vendor", "Manager"],
  // },
  {
    name: "Campaign",
    status: true,
    role: ["admin", "vendor", "Manager"],
    category: [
      {
        name: "Whatsapp",
        route: "/campaign/whatsapp",
        icon: "Layers",
        status: true,
        role: ["admin"],
      },
      {
        name: "Gmail",
        route: "/campaign/gmail",
        icon: "File",
        status: true,
        role: ["admin"],
      },
      {
        name: "SMS",
        route: "/campaign/sms",
        icon: "Shield",
        status: true,
        role: ["admin"],
      },
    ],
  },
  {
    name: "Settings",
    status: true,
    role: ["admin", "vendor", "Manager"],
    category: [
      {
        name: "Domain",
        route: "/settings/domain",
        icon: "Globe",
        status: true,
        role: ["admin"],
      },
      {
        name: "System Users",
        route: "/settings/users",
        icon: "Users",
        status: true,
        role: ["admin"],
      },
      {
        name: "Roles",
        route: "/settings/roles",
        icon: "Shield",
        status: true,
        role: ["admin"],
      },
    ],
  },
];

/* ==========================================
   GENERIC PAGE TABLE COLUMNS DATA
   ========================================== */

const commonTableColumns = [
  {
    header: "Status",
    accessor: "isActive",
    ui: "status",
    style: { minWidth: "80px", maxWidth: "80px" },
  },
  {
    header: "Created Date",
    accessor: "createdAt",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Updated Date",
    accessor: "updatedAt",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Actions",
    accessor: "actions",
    ui: "actions",
    allowAllRoleActions: true,
    canView: true,
    canEdit: true,
    canDelete: true,
    style: { minWidth: "130px" },
  },
];

const rolesTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px", maxWidth: "40px" },
  },
  {
    header: "Role ID",
    accessor: "id",
    ui: "code",
    style: { minWidth: "80px" },
  },
  {
    header: "Role Name",
    accessor: "rolename",
    ui: "badge",
    style: { minWidth: "125px", maxWidth: "125px" },
  },
  {
    header: "Permissions",
    accessor: "permissions",
    ui: "badge-list",
    style: { minWidth: "300px", maxWidth: "300px" },
  },
  {
    header: "Pages",
    accessor: "pages",
    ui: "badge-list",
    style: { minWidth: "300px", maxWidth: "300px" },
  },
  {
    header: "Users Assigned",
    accessor: "usersassigned",
    ui: "code",
    className: "text-center",
    style: { minWidth: "110px", maxWidth: "110px" },
  },
  ...commonTableColumns,
];

const usersTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "User ID",
    accessor: "id",
    ui: "code",
    style: { minWidth: "80px" },
  },
  {
    header: "Name",
    accessor: "name",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "160px" },
  },
  {
    header: "Email",
    accessor: "email",
    ui: "text",
    style: { minWidth: "200px" },
  },
  {
    header: "Role",
    accessor: "role",
    ui: "badge",
    style: { minWidth: "120px" },
  },
  {
    header: "Last Active",
    accessor: "lastActive",
    ui: "date",
    style: { minWidth: "140px" },
  },
  {
    header: "OTP Verified",
    accessor: "isOtpVerified",
    ui: "status",
    style: { minWidth: "90px" },
  },
  ...commonTableColumns,
];

const leadsTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Lead ID",
    accessor: "id",
    ui: "code",
    style: { minWidth: "90px" },
  },
  {
    header: "Created By",
    accessor: "createdby",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "160px" },
  },
  {
    header: "Lead Name",
    accessor: "name",
    ui: "text",
    style: { minWidth: "120px" },
  },
  {
    header: "Mobile",
    accessor: "mobile",
    ui: "text",
    style: { minWidth: "100px" },
  },
  {
    header: "Email",
    accessor: "email",
    ui: "text",
    style: { minWidth: "140px" },
  },
  {
    header: "Location",
    accessor: "location",
    ui: "text",
    style: { minWidth: "100px" },
  },
  {
    header: "Severity",
    accessor: "severity",
    ui: "severity",
    style: { minWidth: "95px" },
  },
  {
    header: "Description",
    accessor: "description",
    ui: "desc",
    style: { minWidth: "160px" },
  },
  ...commonTableColumns,
];

const leadsSidebarData = {
  title: "Lead Statuses",
  items: [
    { name: "All Leads", color: "#1e74db", status: "all" },
    { name: "Active Leads", color: "#10b981", status: "Active" },
    { name: "Inactive Leads", color: "#64748b", status: "Inactive" },
    { name: "High Severity", color: "#ef4444", severity: "high" },
    { name: "Medium Severity", color: "#f59e0b", severity: "medium" },
    { name: "Low Severity", color: "#10b981", severity: "low" },
  ],
};

////////////////////////////////////////////////////////////////////////////////////

const blogCategoriesTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Category ID",
    accessor: "id",
    ui: "code",
    style: { minWidth: "60px" },
  },
  {
    header: "Created By",
    accessor: "createdby",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "80px" },
  },
  {
    header: "Category Name",
    accessor: "categoryName",
    ui: "text",
    style: { minWidth: "340px" },
  },
  {
    header: "Blogs",
    accessor: "count",
    ui: "code",
    style: { minWidth: "50px" },
  },
  ...commonTableColumns,
];

const productCategoriesTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Product ID",
    accessor: "id",
    ui: "code",
    style: { minWidth: "80px" },
  },
  {
    header: "Created By",
    accessor: "createdby",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "140px" },
  },
  {
    header: "Product Category",
    accessor: "categoryName",
    ui: "profile",
    imageKey: "avatar",
    subKey: "description",
    style: { minWidth: "100px" },
  },
  {
    header: "Icon Name",
    accessor: "iconName",
    ui: "code",
    className: "text-center",
    style: { minWidth: "80px" },
  },
  {
    header: "Products",
    accessor: "count",
    ui: "code",
    className: "text-center",
    style: { minWidth: "80px" },
  },
  ...commonTableColumns,
];

const productsTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Product ID",
    accessor: "id",
    ui: "code",
    style: { minWidth: "100px" },
  },
  {
    header: "Created By",
    accessor: "createdby",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "200px" },
  },
  {
    header: "Product",
    accessor: "productName",
    ui: "profile",
    subKey: "description",
    imageKey: "image",
    style: { minWidth: "240px" },
  },
  {
    header: "Category",
    accessor: "category",
    ui: "badge",
    style: { minWidth: "140px" },
  },
  {
    header: "Price",
    accessor: "price",
    ui: "code",
    style: { minWidth: "110px" },
  },
  {
    header: "Stock",
    accessor: "stock",
    ui: "text",
    style: { minWidth: "100px" },
  },
  ...commonTableColumns,
];

const blogsTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Blog ID",
    accessor: "id",
    ui: "code",
    style: { minWidth: "90px" },
  },
  {
    header: "Created By",
    accessor: "createdby",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "140px" },
  },
  {
    header: "Blogs",
    accessor: "blogName",
    ui: "profile",
    subKey: "description",
    imageKey: "image",
    style: { minWidth: "100px" },
  },
  {
    header: "Category",
    accessor: "category",
    ui: "badge",
    style: { minWidth: "240px" },
  },
  {
    header: "Comments",
    accessor: "comments",
    ui: "code",
    className: "text-center",
    style: { minWidth: "60px" },
  },
  // {
  //   header: "Tags",
  //   accessor: "tags",
  //   ui: "arr-badge",
  //   style: { minWidth: "240px" },
  // },
  // {
  //   header: "Read Time",
  //   accessor: "readTime",
  //   ui: "text",
  //   style: { minWidth: "100px" },
  // },
  // {
  //   header: "Short Description",
  //   accessor: "shortDesc",
  //   ui: "desc",
  //   style: { minWidth: "120px" },
  // },
  ...commonTableColumns,
];

const reviewsTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Review ID",
    accessor: "id",
    ui: "code",
    style: { minWidth: "100px" },
  },
  {
    header: "Created By",
    accessor: "createdby",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "150px" },
  },
  {
    header: "Product / Article",
    accessor: "itemName",
    ui: "profile",
    subKey: "subText",
    imageKey: "image",
    style: { minWidth: "180px" },
  },
  {
    header: "Rating",
    accessor: "ratingDisplay",
    ui: "code",
    style: { minWidth: "110px" },
  },
  {
    header: "Comment",
    accessor: "comment",
    ui: "desc",
    style: { minWidth: "260px" },
  },
  {
    header: "Status",
    accessor: "isActive",
    ui: "status",
    style: { minWidth: "80px", maxWidth: "80px" },
  },
  {
    header: "Date",
    accessor: "createdAt",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Actions",
    accessor: "actions",
    ui: "actions",
    allowAllRoleActions: true,
    canView: true,
    canEdit: true,
    canDelete: true,
    style: { minWidth: "110px" },
  },
];

const seoTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Page & Route",
    accessor: "pageName",
    ui: "profile",
    subKey: "path",
    style: { minWidth: "180px" },
  },
  {
    header: "Page ID",
    accessor: "id",
    ui: "code",
    style: { minWidth: "100px" },
  },
  {
    header: "Created By",
    accessor: "createdby",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "200px" },
  },
  {
    header: "Meta Title",
    accessor: "title",
    ui: "text",
    style: { minWidth: "250px" },
  },
  {
    header: "Meta Description",
    accessor: "description",
    ui: "desc",
    style: { minWidth: "280px" },
  },
  {
    header: "Target Keyword",
    accessor: "targetKeyword",
    ui: "badge",
    style: { minWidth: "170px" },
  },
  {
    header: "Breadcrumbs",
    accessor: "breadcrumbsText",
    ui: "text",
    style: { minWidth: "170px" },
  },
  {
    header: "Score",
    accessor: "seoScore",
    ui: "code",
    style: { minWidth: "90px" },
  },
  {
    header: "Index Status",
    accessor: "status",
    ui: "status",
    style: { minWidth: "120px" },
  },
  {
    header: "Canonical URL",
    accessor: "canonical",
    ui: "code",
    style: { minWidth: "220px" },
  },
  {
    header: "Last Crawled",
    accessor: "lastCrawled",
    ui: "date",
    style: { minWidth: "120px" },
  },
  ...commonTableColumns,
];

const productCategoriesSidebarData = {
  title: "Category Status",
  items: [
    { name: "All Categories", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

const productsSidebarData = {
  title: "Product Status",
  items: [
    { name: "All Products", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

const blogCategoriesSidebarData = {
  title: "Category Status",
  items: [
    { name: "All Categories", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

const blogsSidebarData = {
  title: "Article Status",
  items: [
    { name: "All Articles", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

const seoSidebarData = {
  title: "SEO Status",
  items: [
    { name: "All Pages", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

const seoSiteInfo = {
  name: "Ashmita Vinyls",
  description:
    "Ashmita Vinyls supplies premium PVC vinyl products, strip curtains, and industrial vinyl solutions across India.",
  url: "https://ashmitavinyls.com",
  image: "/products/spaces/hospital_ward.jpg",
  phone: "+91 9873198731",
  email: "info@ashmitavinyls.com",
  address: {
    streetAddress:
      "C 304, 3rd Floor, Eastern Business District, L.B.S Marg Road, Bhandup West",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400078",
    addressCountry: "IN",
    fullAddress:
      "Ashmita Enterprises, C 304, 3rd Floor, Eastern Business District, Bhandup West, Mumbai, Maharashtra 400078, India",
  },
  geo: {
    latitude: 19.1485,
    longitude: 72.9367,
  },
};

const seoData = [
  {
    id: "SEO-001",
    pageKey: "home",
    pageName: "Home Page",
    path: "/home",
    route: "/home",
    title: "PVC Vinyl Products Supplier in India | Ashmita Vinyls",
    metaTitle: "PVC Vinyl Products Supplier in India | Ashmita Vinyls",
    description:
      "Explore high-grade PVC strip curtains, industrial vinyl rolls, polar freezer curtains, and mounting accessories from Ashmita Vinyls across India.",
    keywords:
      "PVC vinyl products, PVC strip curtains, industrial vinyl rolls, polar freezer curtains, Ashmita Vinyls, Mumbai vinyl supplier",
    targetKeyword: "PVC vinyl products",
    breadcrumbs: [{ label: "Home", path: "/home" }],
    breadcrumbsText: "Home",
    canonical: "https://ashmitavinyls.com/home",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "98 / 100",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Admin",
      mobile: "",
      avatar: "",
    },
  },
];

const seoFaqsData = [
  {
    question: "What is Ashmita Vinyls?",
    answer:
      "Ashmita Vinyls is a premier manufacturer and supplier of commercial and industrial PVC vinyl products, strip curtains, and hanging systems across India.",
  },
  {
    question: "What types of PVC strip curtains are available?",
    answer:
      "We offer standard transparent, ribbed double-rib, polar freezer grade (-40°C), anti-static, anti-insect amber yellow, and welding screen PVC curtains.",
  },
];

const configData = {
  Header: [
    {
      HeaderTopBar: true,
      HeaderBottomBar: true,
    },
  ],
};

export const ROLE_ACCESS_CONFIG = [
  {
    page: "Full_Access",
    label: "Full Access",
    permissions: ["Full_Access"],
  },
  {
    page: "Dashboard",
    label: "Dashboard",
    permissions: ["view_dashboard"],
  },
  {
    page: "Profile",
    label: "Profile",
    permissions: ["view_profile"],
  },
  {
    page: "Products Category",
    label: "Products Category",
    permissions: [
      "view_product_categories",
      "edit_product_categories",
      "trash_product_categories",
    ],
  },
  {
    page: "Blogs Category",
    label: "Blogs Category",
    permissions: [
      "view_blog_categories",
      "edit_blog_categories",
      "trash_blog_categories",
    ],
  },
  {
    page: "Products",
    label: "Products",
    permissions: [
      "view_products",
      "edit_products",
      "trash_products",
    ],
  },
  {
    page: "Blogs",
    label: "Blogs",
    permissions: [
      "view_blogs",
      "edit_blogs",
      "trash_blogs",
    ],
  },
  {
    page: "SEO",
    label: "SEO",
    permissions: [
      "view_seo",
      "edit_seo",
      "trash_seo",
    ],
  },
  {
    page: "System Users",
    label: "System Users",
    permissions: [
      "view_systemuser",
      "edit_systemuser",
      "trash_systemuser",
    ],
  },
  {
    page: "Roles",
    label: "Roles",
    permissions: [
      "view_roles",
      "edit_roles",
      "trash_roles",
    ],
  },
];

export {
  AVATAR_PALETTE,
  RATING_OPTIONS,
  STATUS_OPTIONS,
  TABS,
  commonTableColumns,
  configData,
  formatDate,
  menuData,
  usersTableColumns,
  rolesTableColumns,
  leadsTableColumns,
  leadsSidebarData,
  productCategoriesTableColumns,
  productCategoriesSidebarData,
  productsTableColumns,
  productsSidebarData,
  blogCategoriesTableColumns,
  blogCategoriesSidebarData,
  blogsTableColumns,
  blogsSidebarData,
  reviewsTableColumns,
  seoTableColumns,
  seoSidebarData,
  seoSiteInfo,
  seoData,
  seoFaqsData,
};
