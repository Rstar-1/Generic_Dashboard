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
 * 5-Star rating scale options used in review forms and rating selectors
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
 * Standard 2-tab array fallback + entity-specific tabs accessible via TABS.<entity>
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

TABS.orders = [
  { name: "All Orders", value: "all" },
  { name: "Trash", value: "trash" },
];

TABS.transactions = [
  { name: "All Transactions", value: "all" },
  { name: "Trash", value: "trash" },
];

TABS.cms = [
  { name: "All Sections", value: "all" },
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
    name: "Analytics",
    route: "/analytics",
    icon: "Trending",
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
        role: ["admin", "Manager"],
      },
      {
        name: "Blogs",
        route: "/category/blogs",
        icon: "Clipboard",
        status: true,
        role: ["admin", "Manager"],
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
        role: ["admin", "Manager"],
      },
      {
        name: "Blogs",
        route: "/overview/blogs",
        icon: "Clipboard",
        status: true,
        role: ["admin", "Manager"],
      },
      {
        name: "CMS",
        route: "/overview/cms",
        icon: "Clipboard",
        status: true,
        role: ["admin", "Manager"],
      },
      {
        name: "SEO",
        route: "/overview/seo",
        icon: "Clipboard",
        status: true,
        role: ["admin", "Manager"],
      },
    ],
  },
  {
    name: "Management",
    status: true,
    role: ["admin", "vendor", "Manager"],
    category: [
      {
        name: "Customers",
        route: "/management/customers",
        icon: "Box",
        status: true,
        role: ["admin", "vendor"],
      },
      {
        name: "Leads",
        route: "/management/leads",
        icon: "CMS",
        status: true,
        role: ["admin", "Manager"],
      },
    ],
  },
  {
    name: "Order & Payment",
    status: true,
    role: ["admin", "vendor", "Manager"],
    category: [
      {
        name: "Orders",
        route: "/management/order",
        icon: "Box",
        status: true,
        role: ["admin", "vendor"],
      },
      {
        name: "Transactions",
        route: "/management/transactions",
        icon: "CMS",
        status: true,
        role: ["admin", "Manager"],
      },
    ],
  },
  {
    name: "Users & Roles",
    status: true,
    role: ["admin", "vendor", "Manager"],
    category: [
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
    style: { minWidth: "80px" },
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
    header: "Enquiry Name",
    accessor: "name",
    ui: "text",
    style: { minWidth: "100px" },
  },
  {
    header: "Mobile",
    accessor: "mobile",
    ui: "text",
    style: { minWidth: "80px" },
  },
  {
    header: "Email",
    accessor: "email",
    ui: "text",
    style: { minWidth: "80px" },
  },
  {
    header: "Description",
    accessor: "description",
    ui: "desc",
    style: { minWidth: "150px" },
  },
  {
    header: "Severity",
    accessor: "severity",
    ui: "status",
    style: { minWidth: "90px" },
  },
  {
    header: "Location",
    accessor: "location",
    ui: "text",
    style: { minWidth: "80px" },
  },
  ...commonTableColumns,
];

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

const customersTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Customer",
    accessor: "name",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "230px" },
  },
  {
    header: "Customer ID",
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
    header: "Company",
    accessor: "company",
    ui: "text",
    style: { minWidth: "150px" },
  },
  {
    header: "Orders",
    accessor: "ordersCount",
    ui: "text",
    style: { minWidth: "50px" },
  },
  {
    header: "Total Amount",
    accessor: "totalAmount",
    ui: "code",
    style: { minWidth: "100px" },
  },
  {
    header: "Total Spent",
    accessor: "totalSpent",
    ui: "code",
    style: { minWidth: "100px" },
  },
  {
    header: "Seller Type",
    accessor: "type",
    ui: "badge",
    style: { minWidth: "95px" },
  },
  ...commonTableColumns,
];

const transactionsTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Transaction ID",
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
    style: { minWidth: "150px" },
  },
  {
    header: "Customer Name",
    accessor: "name",
    ui: "text",
    style: { minWidth: "100px" },
  },
  {
    header: "Mobile",
    accessor: "mobile",
    ui: "text",
    style: { minWidth: "80px" },
  },
  {
    header: "Email",
    accessor: "email",
    ui: "text",
    style: { minWidth: "80px" },
  },
  {
    header: "Description",
    accessor: "description",
    ui: "desc",
    style: { minWidth: "150px" },
  },
  {
    header: "Severity",
    accessor: "severity",
    ui: "status",
    style: { minWidth: "90px" },
  },
  {
    header: "Location",
    accessor: "location",
    ui: "text",
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
    style: { minWidth: "110px" },
  },
];

const ordersTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Order ID",
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
    style: { minWidth: "150px" },
  },
  {
    header: "Customer Name",
    accessor: "name",
    ui: "text",
    style: { minWidth: "100px" },
  },
  {
    header: "Mobile",
    accessor: "mobile",
    ui: "text",
    style: { minWidth: "80px" },
  },
  {
    header: "Email",
    accessor: "email",
    ui: "text",
    style: { minWidth: "80px" },
  },
  {
    header: "Description",
    accessor: "description",
    ui: "desc",
    style: { minWidth: "150px" },
  },
  {
    header: "Severity",
    accessor: "severity",
    ui: "status",
    style: { minWidth: "90px" },
  },
  {
    header: "Location",
    accessor: "location",
    ui: "text",
    style: { minWidth: "80px" },
  },
  ...commonTableColumns,
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

const cmsTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Section Name",
    accessor: "sectionName",
    ui: "profile",
    subKey: "itemsCountLabel",
    style: { minWidth: "220px" },
  },
  {
    header: "CMS ID",
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
    style: { minWidth: "180px" },
  },
  {
    header: "Items Count",
    accessor: "itemsCount",
    ui: "code",
    style: { minWidth: "90px" },
  },
  ...commonTableColumns,
];

const analyticsTableColumns = {
  Customers: customersTableColumns,
  Transaction: transactionsTableColumns,
  Users: usersTableColumns,
  Roles: rolesTableColumns,
};

/* ==========================================
   GENERIC PAGE SIDEBAR DATA CONFIGURATION
   ========================================== */

const customersSidebarData = {
  title: "Customer Status",
  items: [
    { name: "All Customers", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

const transactionsSidebarData = {
  title: "Transaction Status",
  items: [
    { name: "All Transactions", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

const analyticsSidebarData = {
  title: "Data Models & Entities",
  items: [
    { name: "Customers", icon: "Box", color: "#10b981" },
    { name: "Transaction", icon: "CMS", color: "#3b82f6" },
    { name: "Users", icon: "Users", color: "#6366f1" },
    { name: "Roles", icon: "Shield", color: "#8b5cf6" },
  ],
};

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

const leadsSidebarData = {
  title: "Lead Status",
  items: [
    { name: "All Leads", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

const ordersSidebarData = {
  title: "Order Status",
  items: [
    { name: "All Orders", color: "#1e74db", status: "all" },
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

const cmsSidebarData = {
  title: "Section Status",
  items: [
    { name: "All Sections", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

/* ==========================================
   GENERIC PAGE DATA CONFIGURATION
   ========================================== */

const customersData = [
  {
    id: "CUST-001",
    name: "Ashwini Sawant",
    email: "ashmitavinyls@gmail.com",
    mobile: "8879741021",
    company: "Ashmita Vinyls Pvt Ltd",
    ordersCount: 34,
    totalAmount: "₹15,800",
    totalSpent: "₹1,45,800",
    type: "Trader",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdDate: "2026-02-14",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    createdby: {
      name: "Raj Shetye",
      mobile: "8779030638",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
  },
  {
    id: "CUST-002",
    name: "Mayur Gada",
    email: "mayur@gmail.com",
    mobile: "9867264193",
    company: "Mayur Computer",
    ordersCount: 22,
    totalAmount: "₹15,800",
    totalSpent: "₹98,500",
    type: "Trader",
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdDate: "2026-03-01",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    createdby: {
      name: "Adhiraj",
      mobile: "1234567890",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
  },
  {
    id: "CUST-003",
    name: "Praveen Chamariya",
    email: "kepal@gmail.com",
    mobile: "9987825020",
    company: "Kepal Enterprise",
    ordersCount: 48,
    totalAmount: "₹15,800",
    totalSpent: "₹2,34,000",
    type: "Retailer",
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdDate: "2026-01-20",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    createdby: {
      name: "Kaif Shaikh",
      mobile: "9807654321",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    },
  },
  {
    id: "CUST-004",
    name: "Virendra Desai",
    email: "krishi@gmail.com",
    mobile: "9867611740",
    company: "Jubilant Metal",
    ordersCount: 8,
    totalAmount: "₹15,800",
    totalSpent: "₹28,900",
    type: "Trader",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdDate: "2026-05-18",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    createdby: {
      name: "Nikhil Jaiswal",
      mobile: "8907654321",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    },
  },
  {
    id: "CUST-005",
    name: "Kishore Bhatra",
    email: "krishi@gmail.com",
    mobile: "9324210046",
    company: "Pranav Agro",
    ordersCount: 8,
    totalAmount: "₹15,800",
    totalSpent: "₹28,900",
    type: "Dealer",
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdDate: "2026-05-18",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    createdby: {
      name: "Raj Shetye",
      mobile: "8779030638",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
  },
  {
    id: "CUST-006",
    name: "Dharmesh",
    email: "krishi@gmail.com",
    mobile: "9969748763",
    company: "powermax lube india",
    ordersCount: 8,
    totalAmount: "₹15,800",
    totalSpent: "₹28,900",
    type: "Manufacture",
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdDate: "2026-05-18",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    createdby: {
      name: "Adhiraj",
      mobile: "1234567890",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
  },
  {
    id: "CUST-007",
    name: "Sandeep",
    email: "krishi@gmail.com",
    mobile: "9892772587",
    company: "Divine Enterprises",
    ordersCount: 8,
    totalAmount: "₹15,800",
    totalSpent: "₹28,900",
    type: "Dealer",
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdDate: "2026-05-18",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    createdby: {
      name: "Kaif Shaikh",
      mobile: "9807654321",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    },
  },
  {
    id: "CUST-008",
    name: "Yashawant Sondalkar",
    email: "krishi@gmail.com",
    mobile: "8237740894",
    company: "Shri Hari Enterprise",
    ordersCount: 8,
    totalAmount: "₹15,800",
    totalSpent: "₹28,900",
    type: "Trader",
    status: "Inactive",
    isActive: false,
    isDeleted: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdDate: "2026-05-18",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    createdby: {
      name: "Nikhil Jaiswal",
      mobile: "8907654321",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    },
  },
];

const analyticsData = {
  Customers: {
    name: customersData[0]?.name || "Ashmita Vinyls",
    email: customersData[0]?.email || "ashmitavinyls@gmail.com",
    company: customersData[0]?.company || "Acme Corporation",
    ordersCount: customersData[0]?.ordersCount || 34,
    totalAmount: customersData[0]?.totalAmount || "₹15,800",
    totalSpent: customersData[0]?.totalSpent || "₹1,45,800",
    type: customersData[0]?.type || "Manufacture",
    status: customersData[0]?.status || "Active",
    createdDate: customersData[0]?.createdDate || "2026-02-14",
    updatedDate: customersData[0]?.updatedDate || "2026-09-14",
  },
  Transaction: {
    transactionId: "TXN-982014",
    customer: "Ashmita Vinyls",
    amount: "₹45,800",
    method: "Cash On Delivery",
    status: "Active",
    createdDate: "2026-09-14",
    updatedDate: "2026-09-14",
  },
  Users: {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    lastActive: "2 mins ago",
    status: "Active",
    createdDate: "2026-01-15",
    updatedDate: "2026-08-20",
  },
  Roles: {
    name: "Super Administrator",
    role: "admin",
    usersCount: 1,
    status: "Active",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
  },
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
      name: "Raj Shetye",
      mobile: "8779030638",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
    lastCrawled: "2026-10-25",
  },
  {
    id: "SEO-002",
    pageKey: "about",
    pageName: "About Us",
    path: "/about",
    route: "/about",
    title: "About Us | Ashmita Vinyls - Industrial PVC Solutions",
    metaTitle: "About Us | Ashmita Vinyls - Industrial PVC Solutions",
    description:
      "Learn about Ashmita Vinyls, our manufacturing expertise, stringent quality standards, infrastructure, and nationwide supply of PVC strip curtain solutions.",
    keywords:
      "about Ashmita Vinyls, PVC curtain manufacturer, industrial vinyl solutions, PVC quality assurance, Mumbai PVC supplier",
    targetKeyword: "PVC curtain manufacturer",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "About Us", path: "/about" },
    ],
    breadcrumbsText: "Home / About Us",
    canonical: "https://ashmitavinyls.com/about",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "92 / 100",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Adhiraj",
      mobile: "1234567890",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
    lastCrawled: "2026-10-24",
  },
  {
    id: "SEO-003",
    pageKey: "product",
    pageName: "Products Catalog",
    path: "/product",
    route: "/product",
    title: "PVC Vinyl Products & Catalog | Ashmita Vinyls",
    metaTitle: "PVC Vinyl Products & Catalog | Ashmita Vinyls",
    description:
      "Explore PVC strip curtains, PVC rolls and other industrial vinyl products from Ashmita Vinyls.",
    keywords:
      "PVC products, strip curtains, vinyl rolls, industrial vinyl, Ashmita Vinyls",
    targetKeyword: "PVC products catalog",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
    breadcrumbsText: "Home / Products",
    canonical: "https://ashmitavinyls.com/product",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "96 / 100",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Kaif Shaikh",
      mobile: "9807654321",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    },
    lastCrawled: "2026-10-24",
  },
  {
    id: "SEO-004",
    pageKey: "productDetail",
    pageName: "Product Specifications",
    path: "/product-detail",
    route: "/product-detail",
    title: "PVC Product Specifications | Ashmita Vinyls",
    metaTitle: "PVC Product Specifications | Ashmita Vinyls",
    description:
      "Explore product specifications, features, technical data sheets, and industrial applications.",
    keywords:
      "PVC product specifications, technical details, vinyl curtain dimensions, strip curtain hardware",
    targetKeyword: "PVC product specifications",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Product Details", path: "/product-detail" },
    ],
    breadcrumbsText: "Home / Products / Details",
    canonical: "https://ashmitavinyls.com/product-detail",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "90 / 100",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Nikhil Jaiswal",
      mobile: "8907654321",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    },
    lastCrawled: "2026-10-23",
  },
  {
    id: "SEO-005",
    pageKey: "collection",
    pageName: "Collections Catalog",
    path: "/collection",
    route: "/collection",
    title: "PVC Strip Curtains & Vinyl Rolls Collection | Ashmita Vinyls",
    metaTitle: "PVC Strip Curtains & Vinyl Rolls Collection | Ashmita Vinyls",
    description:
      "Explore our complete collection of industrial PVC strip curtains, polar freezer curtains, ribbed vinyl rolls, anti-insect amber curtains, and SS brackets.",
    keywords:
      "PVC collection, strip curtain catalog, industrial vinyl rolls, ribbed PVC curtains, freezer curtains, mounting brackets collection",
    targetKeyword: "strip curtain catalog",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Collection", path: "/collection" },
    ],
    breadcrumbsText: "Home / Collection",
    canonical: "https://ashmitavinyls.com/collection",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "94 / 100",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Raj Shetye",
      mobile: "8779030638",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
    lastCrawled: "2026-10-22",
  },
  {
    id: "SEO-006",
    pageKey: "blog",
    pageName: "Blog & Guides",
    path: "/blog",
    route: "/blog",
    title: "PVC Industry Blog & Technical Guides | Ashmita Vinyls",
    metaTitle: "PVC Industry Blog & Technical Guides | Ashmita Vinyls",
    description:
      "Read expert articles, installation guides, temperature regulation tips, and industrial insights on PVC strip curtains and vinyl rolls.",
    keywords:
      "PVC products blog, industrial strip curtains guide, cold storage curtains, PVC curtain installation, vinyl news",
    targetKeyword: "PVC products blog",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Blog", path: "/blog" },
    ],
    breadcrumbsText: "Home / Blog",
    canonical: "https://ashmitavinyls.com/blog",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "93 / 100",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Adhiraj",
      mobile: "1234567890",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
    lastCrawled: "2026-10-20",
  },
  {
    id: "SEO-007",
    pageKey: "blogDetail",
    pageName: "Blog Article Detail",
    path: "/blog-detail",
    route: "/blog-detail",
    title: "PVC Industry Article | Ashmita Vinyls",
    metaTitle: "PVC Industry Article | Ashmita Vinyls",
    description:
      "Read detailed articles about PVC products, applications, temperature maintenance, and industry solutions.",
    keywords:
      "PVC article, industrial vinyl guide, curtain installation article",
    targetKeyword: "industrial vinyl guide",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Blog", path: "/blog" },
      { label: "Article", path: "/blog-detail" },
    ],
    breadcrumbsText: "Home / Blog / Article",
    canonical: "https://ashmitavinyls.com/blog-detail",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "78 / 100",
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Kaif Shaikh",
      mobile: "9807654321",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    },
    lastCrawled: "2026-10-18",
  },
  {
    id: "SEO-008",
    pageKey: "supplier",
    pageName: "Suppliers & Stores",
    path: "/supplier",
    route: "/supplier",
    title: "Authorized PVC Suppliers & Store Locations | Ashmita Vinyls",
    metaTitle: "Authorized PVC Suppliers & Store Locations | Ashmita Vinyls",
    description:
      "Locate authorized Ashmita Vinyls dealers, suppliers, and distribution centers for industrial PVC products across India.",
    keywords:
      "PVC suppliers India, find PVC store, authorized vinyl distributor, industrial PVC supplier, Ashmita dealer network",
    targetKeyword: "PVC suppliers India",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Supplier", path: "/supplier" },
    ],
    breadcrumbsText: "Home / Supplier",
    canonical: "https://ashmitavinyls.com/supplier",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "87 / 100",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Nikhil Jaiswal",
      mobile: "8907654321",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    },
    lastCrawled: "2026-10-16",
  },
  {
    id: "SEO-009",
    pageKey: "quality",
    pageName: "Quality & Testing",
    path: "/quality",
    route: "/quality",
    title: "Product Quality & Standards | Ashmita Vinyls",
    metaTitle: "Product Quality & Standards | Ashmita Vinyls",
    description:
      "Learn about our rigorous product quality testing, ISO certifications, and industrial PVC performance standards.",
    keywords:
      "PVC quality, quality standards, industrial grade vinyl, durability, certifications",
    targetKeyword: "PVC quality standards",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Quality", path: "/quality" },
    ],
    breadcrumbsText: "Home / Quality",
    canonical: "https://ashmitavinyls.com/quality",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "89 / 100",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Raj Shetye",
      mobile: "8779030638",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
    lastCrawled: "2026-10-15",
  },
  {
    id: "SEO-010",
    pageKey: "connect",
    pageName: "Connect & Quotation",
    path: "/connect",
    route: "/connect",
    title: "Connect With Us | Ashmita Vinyls Customer Support & Quotes",
    metaTitle: "Connect With Us | Ashmita Vinyls Customer Support & Quotes",
    description:
      "Get in touch with Ashmita Vinyls for custom PVC strip curtain sizes, bulk wholesale inquiries, technical consultations, and instant quotes.",
    keywords:
      "connect with us, contact Ashmita Vinyls, PVC curtain inquiry, bulk order vinyl, customer support, request quotation",
    targetKeyword: "bulk order vinyl quote",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Connect Us", path: "/connect" },
    ],
    breadcrumbsText: "Home / Connect Us",
    canonical: "https://ashmitavinyls.com/connect",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "95 / 100",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Adhiraj",
      mobile: "1234567890",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
    lastCrawled: "2026-10-12",
  },
  {
    id: "SEO-011",
    pageKey: "faq",
    pageName: "Frequently Asked Questions",
    path: "/faq",
    route: "/faq",
    title: "Frequently Asked Questions (FAQ) | Ashmita Vinyls",
    metaTitle: "Frequently Asked Questions (FAQ) | Ashmita Vinyls",
    description:
      "Find answers to frequently asked questions about PVC strip curtains, thickness options, temperature tolerance, hardware installation, and deliveries.",
    keywords:
      "PVC curtain FAQ, strip curtain questions, vinyl roll installation, cold room curtains, maintenance FAQ, Ashmita Vinyls FAQ",
    targetKeyword: "PVC curtain FAQ",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "FAQ", path: "/faq" },
    ],
    breadcrumbsText: "Home / FAQ",
    canonical: "https://ashmitavinyls.com/faq",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "91 / 100",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Kaif Shaikh",
      mobile: "9807654321",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    },
    lastCrawled: "2026-10-10",
  },
  {
    id: "SEO-012",
    pageKey: "privacy",
    pageName: "Privacy Policy",
    path: "/privacy",
    route: "/privacy",
    title: "Privacy Policy | Ashmita Vinyls",
    metaTitle: "Privacy Policy | Ashmita Vinyls",
    description:
      "Learn how Ashmita Vinyls collects, manages, and protects your personal information, corporate details, and inquiry data under our privacy policy.",
    keywords:
      "privacy policy, data protection, security, Ashmita Vinyls policy, user privacy",
    targetKeyword: "data protection privacy",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
    breadcrumbsText: "Home / Privacy Policy",
    canonical: "https://ashmitavinyls.com/privacy",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "N/A",
    status: "Inactive",
    isActive: false,
    isDeleted: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Nikhil Jaiswal",
      mobile: "8907654321",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    },
    lastCrawled: "2026-10-01",
  },
  {
    id: "SEO-013",
    pageKey: "terms",
    pageName: "Terms & Conditions",
    path: "/terms",
    route: "/terms",
    title: "Terms & Conditions | Ashmita Vinyls",
    metaTitle: "Terms & Conditions | Ashmita Vinyls",
    description:
      "Review the commercial terms and conditions, warranty details, cancellation policies, and order fulfillment guidelines of Ashmita Vinyls.",
    keywords:
      "terms and conditions, commercial terms, warranty policy, delivery terms, Ashmita Vinyls legal",
    targetKeyword: "commercial terms warranty",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Terms & Conditions", path: "/terms" },
    ],
    breadcrumbsText: "Home / Terms & Conditions",
    canonical: "https://ashmitavinyls.com/terms",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-25",
    seoScore: "N/A",
    status: "Inactive",
    isActive: false,
    isDeleted: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    createdby: {
      name: "Raj Shetye",
      mobile: "8779030638",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
    lastCrawled: "2026-10-01",
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
  {
    question: "How do I choose the correct strip thickness and width?",
    answer:
      "For pedestrian doors up to 7-8 ft, 2mm x 200mm is recommended. For warehouse fork-lift openings or high wind exposure, 3mm x 300mm or 4mm x 400mm with 50% to 100% overlap is ideal.",
  },
  {
    question:
      "Can Ashmita Vinyls customize curtain sizes and mounting brackets?",
    answer:
      "Yes, we fabricate custom door sizes with pre-punched strips and provide high-grade Stainless Steel 202/304 and Mild Steel powder-coated mounting rails.",
  },
  {
    question: "How do I request a bulk quote or place an order?",
    answer:
      "You can reach out through our Connect Us page, call our sales helpline, or email info@ashmitavinyls.com for prompt quotations and B2B pricing.",
  },
];

const cmsData = [
  {
    id: "CMS-001",
    title: "Hero Commercial Banner",
    slug: "hero-commercial-banner",
    sectionArea: "Home Hero",
    author: "Raj Shetye",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    revision: "v2.4",
    createdDate: "2026-02-10",
    updatedDate: "2026-09-14",
    createdby: {
      name: "Raj Shetye",
      mobile: "8779030638",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
  },
  {
    id: "CMS-002",
    title: "Cold Storage Thermal Advantages",
    slug: "cold-storage-thermal-advantages",
    sectionArea: "Feature Section",
    author: "Pooja Hegde",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    revision: "v1.8",
    createdDate: "2026-02-10",
    updatedDate: "2026-09-10",
    createdby: {
      name: "Adhiraj",
      mobile: "1234567890",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
  },
  {
    id: "CMS-003",
    title: "Customer Trust Badges & Certifications",
    slug: "trust-badges-certifications",
    sectionArea: "Footer Bar",
    author: "Vikram Mehta",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    revision: "v1.2",
    createdDate: "2026-02-10",
    updatedDate: "2026-09-05",
    createdby: {
      name: "Kaif Shaikh",
      mobile: "9807654321",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    },
  },
  {
    id: "CMS-004",
    title: "Upcoming Diwali Festive Bulk Discount Banner",
    slug: "festive-bulk-discount-banner",
    sectionArea: "Promo Topbar",
    author: "Raj Shetye",
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    revision: "v0.9",
    createdDate: "2026-02-10",
    updatedDate: "2026-09-14",
    createdby: {
      name: "Nikhil Jaiswal",
      mobile: "8907654321",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    },
  },
  {
    id: "CMS-005",
    title: "Monsoon Anti-Insect Safety Alert",
    slug: "monsoon-anti-insect-alert",
    sectionArea: "Banner Area",
    author: "Pooja Hegde",
    status: "Inactive",
    isActive: false,
    isDeleted: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-08-05T12:17:38.020Z",
    revision: "v1.0",
    createdDate: "2026-02-10",
    updatedDate: "2026-08-20",
    createdby: {
      name: "Raj Shetye",
      mobile: "8779030638",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
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
  customersTableColumns,
  transactionsTableColumns,
  productCategoriesTableColumns,
  productsTableColumns,
  blogCategoriesTableColumns,
  blogsTableColumns,
  reviewsTableColumns,
  leadsTableColumns,
  ordersTableColumns,
  seoTableColumns,
  cmsTableColumns,
  analyticsTableColumns,
  customersSidebarData,
  transactionsSidebarData,
  analyticsSidebarData,
  productCategoriesSidebarData,
  productsSidebarData,
  blogCategoriesSidebarData,
  blogsSidebarData,
  leadsSidebarData,
  ordersSidebarData,
  seoSidebarData,
  cmsSidebarData,
  customersData,
  seoSiteInfo,
  seoData,
  seoFaqsData,
  cmsData,
  analyticsData,
};
