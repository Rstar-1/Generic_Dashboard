import { formatDate } from "./formatDate";
import { SECTIONS_DATA } from "../pages/components/data/section";
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
    name: "Components",
    status: true,
    role: ["admin", "vendor", "Manager"],
    category: [
      {
        name: "Fields",
        route: "/components/fields",
        icon: "Layers",
        status: true,
        role: ["admin", "vendor"],
      },
      {
        name: "Sections",
        route: "/components/sections",
        icon: "Layers",
        status: true,
        role: ["admin", "Manager"],
      },
      {
        name: "Templates",
        route: "/components/templates",
        icon: "Layers",
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
        name: "Tasks",
        route: "/management/tasks",
        icon: "Clipboard",
        status: true,
        role: ["admin", "Manager"],
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
    role: ["admin", "vendor"],
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
   TABLE COLUMNS DATA
   ========================================== */

const usersTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Name",
    accessor: "name",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "200px" },
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
    ui: "text",
    style: { minWidth: "120px" },
  },
  {
    header: "Status",
    accessor: "status",
    ui: "status",
    style: { minWidth: "100px" },
  },
  {
    header: "Created",
    accessor: "createdDate",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Updated",
    accessor: "updatedDate",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Actions",
    accessor: "actions",
    ui: "actions",
    style: { minWidth: "100px", textAlign: "right" },
  },
];

const rolesTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Role Name",
    accessor: "name",
    ui: "badge",
    style: { minWidth: "100px" },
  },
  {
    header: "Permissions",
    accessor: "permissions",
    ui: "badge-list",
    style: { minWidth: "160px" },
  },
  {
    header: "Pages",
    accessor: "pages",
    ui: "badge-list",
    style: { minWidth: "160px" },
  },
  {
    header: "Users Assigned",
    accessor: "usersCount",
    ui: "code",
    style: { minWidth: "110px" },
  },
  {
    header: "Status",
    accessor: "status",
    ui: "status",
    style: { minWidth: "100px" },
  },
  {
    header: "Created",
    accessor: "createdDate",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Updated",
    accessor: "updatedDate",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Actions",
    accessor: "actions",
    ui: "actions",
    style: { minWidth: "100px", textAlign: "right" },
  },
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
  {
    header: "Status",
    accessor: "status",
    ui: "status",
    style: { minWidth: "50px" },
  },
  {
    header: "Created",
    accessor: "createdDate",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Updated",
    accessor: "updatedDate",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Actions",
    accessor: "actions",
    ui: "actions",
    style: { minWidth: "110px", textAlign: "right" },
  },
];

const tasksTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Assignee",
    accessor: "assignee",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "200px" },
  },
  {
    header: "Task Title",
    accessor: "title",
    ui: "text",
    style: { maxWidth: "190px" },
  },
  {
    header: "Priority",
    accessor: "priority",
    ui: "badge",
    style: { minWidth: "100px" },
  },
  {
    header: "Status",
    accessor: "status",
    ui: "status",
    style: { minWidth: "100px" },
  },
  {
    header: "Due Date",
    accessor: "dueDate",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Created",
    accessor: "createdDate",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Updated",
    accessor: "updatedDate",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Actions",
    accessor: "actions",
    ui: "actions",
    style: { minWidth: "110px", textAlign: "right" },
  },
];

const transactionsTableColumns = [
  {
    header: "",
    accessor: "checkbox",
    ui: "checkbox",
    style: { minWidth: "40px" },
  },
  {
    header: "Customer",
    accessor: "customer",
    ui: "profile",
    imageKey: "avatar",
    subKey: "mobile",
    style: { minWidth: "200px" },
  },
  {
    header: "Transaction ID",
    accessor: "transactionId",
    ui: "code",
    style: { minWidth: "100px" },
  },
  {
    header: "Amount",
    accessor: "amount",
    ui: "code",
    style: { minWidth: "80px" },
  },
  {
    header: "Payment Method",
    accessor: "method",
    ui: "badge",
    style: { minWidth: "130px" },
  },
  {
    header: "Payment Status",
    accessor: "status",
    ui: "status",
    style: { minWidth: "100px" },
  },
  {
    header: "Created",
    accessor: "createdDate",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Updated",
    accessor: "updatedDate",
    ui: "date",
    style: { minWidth: "120px" },
  },
  {
    header: "Actions",
    accessor: "actions",
    ui: "actions",
    style: { minWidth: "110px", textAlign: "right" },
  },
];

const sectionsTableColumns = [
  {
    header: "Section Title",
    accessor: "title",
    ui: "text",
    style: { minWidth: "180px" },
  },
  {
    header: "Subtitle / Description",
    accessor: "subtitle",
    ui: "text",
    style: { minWidth: "220px" },
  },
  {
    header: "Section Type",
    accessor: "type",
    ui: "badge",
    style: { minWidth: "120px" },
  },
  {
    header: "Variant Badge",
    accessor: "badge",
    ui: "badge",
    style: { minWidth: "100px" },
  },
  {
    header: "Thumbnail Key",
    accessor: "image",
    ui: "text",
    style: { minWidth: "120px" },
  },
  {
    header: "Component Code",
    accessor: "code",
    ui: "text",
    style: { minWidth: "220px" },
  },
  {
    header: "Active Status",
    accessor: "status",
    ui: "status",
    style: { minWidth: "100px" },
  },
];

const analyticsTableColumns = {
  Customers: customersTableColumns,
  Tasks: tasksTableColumns,
  Transaction: transactionsTableColumns,
  Users: usersTableColumns,
  Roles: rolesTableColumns,
  Sections: sectionsTableColumns,
};

/* ==========================================
   GENERIC PAGE SIDEBAR DATA CONFIGURATION
   ========================================== */

const usersSidebarData = {
  title: "Roles",
  items: [
    { name: "All Users", color: "var(--primary)", role: "all" },
    { name: "Customer", color: "var(--warning)", role: "customer" },
    { name: "Admin", color: "var(--success)", role: "admin" },
    { name: "Accountant", color: "var(--secondary)", role: "accountant" },
    { name: "Manger", color: "var(--info)", role: "manager" },
    { name: "Product", color: "var(--danger)", role: "product" },
  ],
};

const customersSidebarData = {
  title: "Customer Status",
  items: [
    { name: "All Type", color: "var(--primary)", status: "all" },
    { name: "manufacture", color: "var(--success)", status: "Manufacture" },
    { name: "trader", color: "var(--secondary)", status: "Trader" },
    { name: "retailer", color: "var(--warning)", status: "Retailer" },
    { name: "wholeseller", color: "var(--danger)", status: "Wholeseller" },
    { name: "stockist", color: "var(--info)", status: "Stockist" },
    { name: "vendor", color: "var(--secondary)", status: "Vendor" },
  ],
};

const tasksSidebarData = {
  title: "Task Priority",
  items: [
    { name: "All Tasks", color: "#1e74db", priority: "all" },
    { name: "High Priority", color: "#ef4444", priority: "High" },
    { name: "Medium Priority", color: "#f59e0b", priority: "Medium" },
    { name: "Low Priority", color: "#10b981", priority: "Low" },
  ],
};

const transactionsSidebarData = {
  title: "Transaction Status",
  items: [
    { name: "All Transactions", color: "#1e74db", status: "all" },
    { name: "Completed", color: "#10b981", status: "Completed" },
    { name: "Pending", color: "#f59e0b", status: "Pending" },
    { name: "Failed", color: "#ef4444", status: "Failed" },
  ],
};

const analyticsSidebarData = {
  title: "Data Models & Entities",
  items: [
    { name: "Customers", icon: "Box", color: "#10b981" },
    { name: "Tasks", icon: "Clipboard", color: "#f59e0b" },
    { name: "Transaction", icon: "CMS", color: "#3b82f6" },
    { name: "Users", icon: "Users", color: "#6366f1" },
    { name: "Roles", icon: "Shield", color: "#8b5cf6" },
    { name: "Sections", icon: "Layers", color: "#ec4899" },
  ],
};

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
    createdDate: "2026-02-14",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
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
    createdDate: "2026-03-01",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
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
    createdDate: "2026-01-20",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
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
    createdDate: "2026-05-18",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
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
    createdDate: "2026-05-18",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
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
    createdDate: "2026-05-18",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
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
    createdDate: "2026-05-18",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
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
    createdDate: "2026-05-18",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  },
];

const tasksData = [
  {
    id: "TASK-101",
    title: "Implement Zero-Latency Memoization in MainLayout",
    assignee: {
      name: "Ashmita Vinyls",
      mobile: "9087654321",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
    },
    priority: "High",
    status: "Active",
    dueDate: "2026-09-20",
    createdDate: "2026-09-10",
    updatedDate: "2026-09-14",
  },
  {
    id: "TASK-102",
    title: "Audit Role Permissions for Customer Management",
    assignee: {
      name: "Mayur Computer",
      mobile: "9087654321",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
    },
    priority: "Medium",
    status: "Active",
    dueDate: "2026-09-24",
    createdDate: "2026-09-11",
    updatedDate: "2026-09-14",
  },
  {
    id: "TASK-103",
    title: "Refactor Table Pagination and Expanded Row Views",
    assignee: {
      name: "Kepal Enterprise",
      mobile: "9087654321",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
    priority: "Medium",
    status: "Failed",
    dueDate: "2026-09-18",
    createdDate: "2026-09-08",
    updatedDate: "2026-09-14",
  },
  {
    id: "TASK-104",
    title: "Stripe Webhook Handler for Refund Telemetry",
    assignee: {
      name: "Krishi Engineering",
      mobile: "9087654321",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80",
    },
    priority: "Low",
    status: "Pending",
    dueDate: "2026-09-28",
    createdDate: "2026-09-12",
    updatedDate: "2026-09-14",
  },
];

const transactionsData = [
  {
    id: "TXN-901",
    transactionId: "TXN-982014",
    customer: {
      name: "Ashmita Vinyls",
      mobile: "9087654321",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    },
    amount: "₹45,800",
    method: "Cash On Delivery",
    status: "Completed",
    date: "2026-09-14",
  },
  {
    id: "TXN-902",
    transactionId: "TXN-982015",
    customer: {
      name: "Mayur Computer",
      mobile: "9087654321",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    },
    amount: "₹1,12,500",
    method: "Cash On Delivery",
    status: "Completed",
    date: "2026-09-14",
  },
  {
    id: "TXN-903",
    transactionId: "TXN-982016",
    customer: {
      name: "Kepal Enterprise",
      mobile: "9087654321",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
    amount: "₹24,900",
    method: "UPI / NetBanking",
    status: "Pending",
    date: "2026-09-13",
  },
  {
    id: "TXN-904",
    transactionId: "TXN-982017",
    customer: {
      name: "Krishi Engineering",
      mobile: "9087654321",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
    },
    amount: "₹88,000",
    method: "Credit Card",
    status: "Failed",
    date: "2026-09-12",
  },
];

const usersData = [
  {
    id: "USR-001",
    name: "Raj Shetye",
    email: "rajshetye.5855@gmail.com",
    mobile: "8779030638",
    role: "Admin",
    lastActive: "Just now",
    status: "Active",
    createdDate: "2026-01-10",
    updatedDate: "2026-09-15",
    avatar: "",
  },
  {
    id: "USR-003",
    name: "Adhiraj",
    email: "adhiraj@gmail.com",
    mobile: "1234567890",
    role: "Manager",
    lastActive: "1 day ago",
    status: "Active",
    createdDate: "2026-03-01",
    updatedDate: "2026-09-10",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  },
  {
    id: "USR-004",
    name: "Kaif Shaikh",
    email: "kaif@gmail.com",
    mobile: "9807654321",
    role: "Accountant",
    lastActive: "3 days ago",
    status: "Active",
    createdDate: "2026-01-25",
    updatedDate: "2026-09-12",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
  },
  {
    id: "USR-005",
    name: "Nikhil Jaiswal",
    email: "nikhil@gmail.com",
    mobile: "8907654321",
    role: "Product",
    lastActive: "5 days ago",
    status: "Active",
    createdDate: "2026-04-18",
    updatedDate: "2026-08-20",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  },
  {
    id: "USR-002",
    name: "Ashmita Vinyls",
    email: "ashmitavinyls@gmail.com",
    mobile: "9087654321",
    role: "Customer",
    lastActive: "2 hrs ago",
    status: "Active",
    createdDate: "2026-02-14",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    id: "USR-006",
    name: "Mayur Computer",
    email: "mayur@gmail.com",
    mobile: "9087654321",
    role: "Customer",
    lastActive: "2 hrs ago",
    status: "Active",
    createdDate: "2026-02-14",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    id: "USR-008",
    name: "Kepal Enterprise",
    email: "kepal@gmail.com",
    mobile: "9087654321",
    role: "Customer",
    lastActive: "2 hrs ago",
    status: "Active",
    createdDate: "2026-02-14",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    id: "USR-009",
    name: "Krishi Engineering",
    email: "krishi@gmail.com",
    mobile: "9087654321",
    role: "Customer",
    lastActive: "2 hrs ago",
    status: "Inactive",
    createdDate: "2026-02-14",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
];

const rolesData = [
  {
    id: "ROLE-001",
    name: "Customer",
    role: "customer",
    permissions: [
      "manage_products",
      "view_orders",
      "process_shipments",
      "view_vendor_analytics",
    ],
    pages: ["Dashboard", "Analytics", "Users", "Roles", "Settings"],
    usersCount: 3,
    status: "active",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-10",
  },
  {
    id: "ROLE-002",
    name: "Admin",
    role: "admin",
    permissions: [
      "manage_users",
      "manage_roles",
      "manage_billing",
      "view_analytics",
      "edit_system_config",
      "full_access",
    ],
    pages: ["Dashboard", "Analytics", "Users", "Roles", "Settings"],
    usersCount: 3,
    status: "active",
    createdDate: "2025-12-01",
    updatedDate: "2026-09-15",
  },
  {
    id: "ROLE-003",
    name: "Accountant",
    role: "accountant",
    permissions: [
      "view_profile",
      "edit_own_profile",
      "submit_tickets",
      "view_invoices",
    ],
    pages: ["Dashboard", "Analytics", "Users", "Roles", "Settings"],
    usersCount: 4,
    status: "active",
    createdDate: "2026-01-20",
    updatedDate: "2026-09-08",
  },
  {
    id: "ROLE-004",
    name: "Manager",
    role: "manager",
    permissions: [
      "view_reports",
      "approve_requests",
      "assign_tasks",
      "manage_customers",
    ],
    pages: ["Dashboard", "Analytics", "Users", "Roles", "Settings"],
    usersCount: 2,
    status: "active",
    createdDate: "2026-02-10",
    updatedDate: "2026-09-12",
  },
  {
    id: "ROLE-005",
    name: "Product",
    role: "product",
    permissions: [
      "view_audit_logs",
      "export_compliance_reports",
      "read_only_access",
    ],
    pages: ["Dashboard", "Analytics", "Users", "Roles", "Settings"],
    usersCount: 1,
    status: "Active",
    createdDate: "2026-04-05",
    updatedDate: "2026-08-30",
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
  Tasks: {
    title: tasksData[0]?.title || "Implement Zero-Latency Memoization",
    assignee: tasksData[0]?.assignee?.name || "Ashmita Vinyls",
    priority: tasksData[0]?.priority || "High",
    status: tasksData[0]?.status || "Active",
    dueDate: tasksData[0]?.dueDate || "2026-09-20",
    createdDate: tasksData[0]?.createdDate || "2026-09-10",
    updatedDate: tasksData[0]?.updatedDate || "2026-09-14",
  },
  Transaction: {
    transactionId: transactionsData[0]?.transactionId || "TXN-982014",
    customer: transactionsData[0]?.customer?.name || "Ashmita Vinyls",
    amount: transactionsData[0]?.amount || "₹45,800",
    method: transactionsData[0]?.method || "Cash On Delivery",
    status: transactionsData[0]?.status || "Completed",
    createdDate: transactionsData[0]?.date || "2026-09-14",
    updatedDate: "2026-09-14",
  },
  Users: {
    name: usersData[0]?.name || "John Doe",
    email: usersData[0]?.email || "john.doe@example.com",
    role: usersData[0]?.role || "admin",
    lastActive: usersData[0]?.lastActive || "2 mins ago",
    status: usersData[0]?.status || "Active",
    createdDate: usersData[0]?.createdDate || "2026-01-15",
    updatedDate: usersData[0]?.updatedDate || "2026-08-20",
  },
  Roles: {
    name: rolesData[0]?.name || "Super Administrator",
    role: rolesData[0]?.role || "admin",
    usersCount: rolesData[0]?.usersCount || 1,
    status: rolesData[0]?.status || "Active",
    createdDate: rolesData[0]?.createdDate || "2026-01-10",
    updatedDate: rolesData[0]?.updatedDate || "2026-08-15",
  },
  Sections: SECTIONS_DATA,
};

export {
  formatDate,
  menuData,
  usersTableColumns,
  rolesTableColumns,
  customersTableColumns,
  tasksTableColumns,
  transactionsTableColumns,
  sectionsTableColumns,
  analyticsTableColumns,
  usersSidebarData,
  customersSidebarData,
  tasksSidebarData,
  transactionsSidebarData,
  analyticsSidebarData,
  customersData,
  tasksData,
  transactionsData,
  usersData,
  rolesData,
  analyticsData,
};
