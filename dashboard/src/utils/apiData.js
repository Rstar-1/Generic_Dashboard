const menuData = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: "Dashboard",
    status: true,
    role: ["admin", "vendor", "Manager"],
  },
  {
    name: "Analytics",
    route: "/analytics",
    icon: "TrendingUp",
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
    style: { width: "40px" },
  },
  {
    header: "Name",
    accessor: "name",
    ui: "profile",
    imageKey: "avatar",
    subKey: "email",
    style: { minWidth: "160px" },
  },
  {
    header: "Email",
    accessor: "email",
    ui: "text",
    style: { minWidth: "200px" },
  },
  {
    header: "Mobile",
    accessor: "mobile",
    ui: "text",
    style: { minWidth: "120px" },
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
    style: { width: "40px" },
  },
  {
    header: "Role Name",
    accessor: "name",
    ui: "badge",
    style: { minWidth: "150px" },
  },
  {
    header: "Description",
    accessor: "description",
    ui: "text",
    style: { minWidth: "250px" },
  },
  {
    header: "Permissions",
    accessor: "permissions",
    ui: "badge-list",
    style: { minWidth: "260px" },
  },
  {
    header: "Users Assigned",
    accessor: "usersCount",
    ui: "code",
    style: { minWidth: "110px", textAlign: "center" },
    className: "text-center",
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
    style: { width: "40px" },
  },
  {
    header: "Customer",
    accessor: "name",
    ui: "profile",
    imageKey: "avatar",
    subKey: "email",
    style: { minWidth: "180px" },
  },
  {
    header: "Phone",
    accessor: "phone",
    ui: "text",
    style: { minWidth: "140px" },
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
    ui: "code",
    style: { minWidth: "80px", textAlign: "center" },
    className: "text-center",
  },
  {
    header: "Total Spent",
    accessor: "totalSpent",
    ui: "text",
    style: { minWidth: "120px" },
  },
  {
    header: "Tier",
    accessor: "tier",
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
    header: "Joined Date",
    accessor: "createdDate",
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
    style: { width: "40px" },
  },
  {
    header: "Task Title",
    accessor: "title",
    ui: "text",
    style: { minWidth: "220px", fontWeight: "600" },
  },
  {
    header: "Assignee",
    accessor: "assignee",
    ui: "profile",
    imageKey: "avatar",
    subKey: "role",
    style: { minWidth: "160px" },
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
    header: "Category",
    accessor: "tags",
    ui: "arr-badge",
    style: { minWidth: "160px" },
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
    style: { width: "40px" },
  },
  {
    header: "Transaction ID",
    accessor: "transactionId",
    ui: "code",
    style: { minWidth: "140px" },
  },
  {
    header: "Client / Customer",
    accessor: "customer",
    ui: "profile",
    imageKey: "avatar",
    subKey: "email",
    style: { minWidth: "180px" },
  },
  {
    header: "Amount",
    accessor: "amount",
    ui: "text",
    style: { minWidth: "120px", fontWeight: "600" },
  },
  {
    header: "Payment Method",
    accessor: "method",
    ui: "badge",
    style: { minWidth: "130px" },
  },
  {
    header: "Status",
    accessor: "status",
    ui: "status",
    style: { minWidth: "100px" },
  },
  {
    header: "Type",
    accessor: "type",
    ui: "icon-badge",
    style: { minWidth: "110px" },
  },
  {
    header: "Date",
    accessor: "date",
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

const pageTableColumns = {
  users: usersTableColumns,
  roles: rolesTableColumns,
  customers: customersTableColumns,
  tasks: tasksTableColumns,
  transactions: transactionsTableColumns,
};

/* ==========================================
   GENERIC ADD / EDIT FORM MODAL FIELDS DATA
   ========================================== */

const usersModalFields = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "e.g. John Doe",
  },
  {
    name: "email",
    label: "Email Address",
    type: "text",
    required: true,
    placeholder: "e.g. john@example.com",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: [
      { label: "Administrator", value: "admin" },
      { label: "Vendor", value: "vendor" },
      { label: "User", value: "user" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
];

const rolesModalFields = [
  {
    name: "name",
    type: "text",
    label: "Role Name",
    placeholder: "e.g., manager",
    validation: { required: true },
  },
  {
    name: "permissions",
    type: "bulk-badge",
    label: "Permissions",
    addText: "Permission",
    validation: { required: false },
  },
];

const pageModalFields = {
  users: usersModalFields,
  roles: rolesModalFields,
};

const pageFormFields = pageModalFields;

const formatCreatedBy = (createdBy, usersMap = {}, loggedInUser = null) => {
  let name = "";
  let subText = "";
  let avatar = "";

  if (createdBy && typeof createdBy === "object") {
    name =
      createdBy.fullname ||
      createdBy.name ||
      createdBy.username ||
      createdBy.email ||
      "";
    subText =
      createdBy.mobile ||
      createdBy.phone ||
      createdBy.email ||
      createdBy.role ||
      "";
    avatar = createdBy.image || createdBy.avatar || "";
  } else if (typeof createdBy === "string" && createdBy.trim()) {
    const matchedUser = usersMap[createdBy] || usersMap[createdBy.trim()];
    if (matchedUser) {
      name =
        matchedUser.fullname || matchedUser.name || matchedUser.username || "";
      subText =
        matchedUser.mobile ||
        matchedUser.phone ||
        matchedUser.email ||
        matchedUser.role ||
        "";
      avatar = matchedUser.image || matchedUser.avatar || "";
    } else if (
      loggedInUser &&
      (loggedInUser._id === createdBy || loggedInUser.id === createdBy)
    ) {
      name = loggedInUser.fullname || loggedInUser.name || "";
      subText = loggedInUser.mobile || loggedInUser.email || "";
      avatar = loggedInUser.image || loggedInUser.avatar || "";
    }
  }

  if (!name) {
    name = loggedInUser?.fullname || loggedInUser?.name || "Rakesh";
  }
  if (!subText) {
    subText = loggedInUser?.mobile || loggedInUser?.email || "8779030648";
  }
  if (!avatar) {
    avatar =
      loggedInUser?.image ||
      loggedInUser?.avatar ||
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80";
  }

  return {
    createdByProfile: name,
    createdByName: name,
    createdBySub: subText,
    createdByAvatar: avatar,
  };
};

export {
  menuData,
  usersTableColumns,
  pageTableColumns,
  formatCreatedBy,

  // Add / Edit Modal Form Fields
  usersModalFields,
  rolesModalFields,
  pageModalFields,
  pageFormFields,
};

/* ==========================================
   GENERIC PAGE SIDEBAR DATA CONFIGURATION
   ========================================== */

const usersSidebarData = {
  title: "Roles",
  items: [
    { name: "All Users", color: "#1e74db", role: "all" },
    { name: "Administrator", color: "#10b981", role: "admin" },
    { name: "Vendor", color: "#f59e0b", role: "vendor" },
    { name: "User", color: "#8b5cf6", role: "user" },
  ],
};

const rolesSidebarData = {
  title: "Roles Overview",
  items: [
    { name: "All Roles", color: "#1e74db", role: "all" },
    { name: "Administrator", color: "#10b981", role: "admin" },
    { name: "Vendor Partners", color: "#f59e0b", role: "vendor" },
    { name: "Standard Users", color: "#8b5cf6", role: "user" },
    { name: "Management", color: "#06b6d4", role: "manager" },
  ],
};

const productsSidebarData = {
  title: "Product Categories",
  defaultItems: [{ name: "All Products", color: "#1e74db" }],
};

const leadsSidebarData = {
  title: "Lead Statuses",
  items: [
    { name: "All Leads", color: "#1e74db", status: "all" },
    { name: "Pending", color: "#f59e0b", status: "Pending" },
    { name: "Reviewed", color: "#3b82f6", status: "Reviewed" },
    { name: "Approved", color: "#10b981", status: "Approved" },
  ],
};

const ordersSidebarData = {
  title: "Order Statuses",
  items: [
    { name: "All Orders", color: "#1e74db", status: "all" },
    { name: "Delivered", color: "#10b981", status: "Delivered" },
    { name: "Processing", color: "#3b82f6", status: "Processing" },
    { name: "Pending", color: "#f59e0b", status: "Pending" },
    { name: "Shipped", color: "#8b5cf6", status: "Shipped" },
    { name: "Cancelled", color: "#ef4444", status: "Cancelled" },
  ],
};

const cmsSidebarData = {
  title: "Section Groups",
  items: [
    { name: "All Sections", color: "#1e74db", category: "all" },
    { name: "Homepage", color: "#10b981", category: "Homepage" },
    { name: "Company", color: "#3b82f6", category: "Company" },
    { name: "Portfolio", color: "#8b5cf6", category: "Portfolio" },
    { name: "Support", color: "#f59e0b", category: "Support" },
    { name: "Navigation", color: "#ec4899", category: "Navigation" },
  ],
};

const categoriesSidebarData = {
  title: "Categories",
  items: [
    { name: "All Categories", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

const blogsSidebarData = {
  title: "Categories",
  defaultItems: [{ name: "All Articles", color: "#1e74db" }],
};

const blogCategoriesSidebarData = {
  title: "Blog Navigation",
  items: [
    { name: "All Categories", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

const metaSidebarData = {
  title: "Page Types",
  items: [
    { name: "All Pages", color: "#1e74db", category: "all" },
    { name: "Home", color: "#2563eb", category: "Home" },
    { name: "About Us", color: "#10b981", category: "About Us" },
    { name: "Blog", color: "#f59e0b", category: "Blog" },
    { name: "Product", color: "#8b5cf6", category: "Product" },
    { name: "Other", color: "#ec4899", category: "Other" },
  ],
};

const analyticsSidebarData = {
  title: "Categories",
  items: [
    { name: "Articles", color: "#8b5cf6", icon: "Clipboard" },
    { name: "Product", color: "#1e74db", icon: "Layers" },
    { name: "Order", color: "#10b981", icon: "ShoppingBag" },
    { name: "Payment", color: "#f59e0b", icon: "CreditCard" },
    { name: "Users", color: "#ec4899", icon: "Users" },
    { name: "Google Analytics", color: "#3b82f6", icon: "TrendingUp" },
    { name: "Leads", color: "#f97316", icon: "UserPlus" },
  ],
};

const analyticsDataMap = {
  Articles: {
    metrics: [
      {
        title: "Total Articles",
        value: "34",
        changeText: "8.2%",
        isPositive: true,
        chartColor: "#8b5cf6",
        chartData: [28, 30, 29, 32, 31, 33, 34],
      },
      {
        title: "Total Views",
        value: "12,450",
        changeText: "14.5%",
        isPositive: true,
        chartColor: "#8b5cf6",
        chartData: [9800, 10500, 11000, 11200, 11800, 12100, 12450],
      },
      {
        title: "Avg Read Time",
        value: "4.2m",
        changeText: "2.1%",
        isPositive: false,
        chartColor: "#8b5cf6",
        chartData: [4.5, 4.4, 4.3, 4.4, 4.3, 4.2, 4.2],
      },
      {
        title: "Shares",
        value: "845",
        changeText: "12.0%",
        isPositive: true,
        chartColor: "#8b5cf6",
        chartData: [710, 750, 740, 790, 810, 830, 845],
      },
      {
        title: "Comments",
        value: "112",
        changeText: "5.4%",
        isPositive: true,
        chartColor: "#8b5cf6",
        chartData: [95, 99, 102, 105, 108, 110, 112],
      },
    ],
    chart: {
      title: "Article Performance & Readership",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [
        {
          name: "Article Views",
          data: [
            1200, 1900, 1500, 2800, 3200, 4500, 4100, 5600, 6200, 5800, 7100,
            8450,
          ],
        },
        {
          name: "Shares",
          data: [80, 150, 120, 250, 310, 420, 380, 490, 580, 510, 640, 720],
        },
      ],
    },
  },
  Product: {
    metrics: [
      {
        title: "Total Products",
        value: "1,248",
        changeText: "12.5%",
        isPositive: true,
        chartColor: "#1e74db",
        chartData: [1180, 1200, 1195, 1220, 1210, 1235, 1248],
      },
      {
        title: "Active Products",
        value: "892",
        changeText: "8.3%",
        isPositive: true,
        chartColor: "#8b5cf6",
        chartData: [840, 860, 850, 880, 872, 885, 892],
      },
      {
        title: "Out of Stock",
        value: "256",
        changeText: "5.6%",
        isPositive: true,
        chartColor: "#ef4444",
        chartData: [240, 248, 252, 245, 250, 253, 256],
      },
      {
        title: "Low Stock",
        value: "100",
        changeText: "2.1%",
        isPositive: false,
        chartColor: "#f97316",
        chartData: [110, 105, 108, 104, 102, 101, 100],
      },
      {
        title: "Total Revenue",
        value: "$78,642",
        changeText: "15.2%",
        isPositive: true,
        chartColor: "#22c55e",
        chartData: [68000, 71000, 70000, 74000, 75500, 77000, 78642],
      },
    ],
    chart: {
      title: "Revenue & Sales Trends",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [
        {
          name: "Revenue ($)",
          data: [
            12000, 19000, 15000, 28000, 32000, 45000, 41000, 56000, 62000,
            58000, 71000, 78642,
          ],
        },
        {
          name: "Sales",
          data: [
            450, 720, 610, 890, 1100, 1450, 1320, 1780, 1950, 1820, 2100, 2450,
          ],
        },
      ],
    },
  },
  Order: {
    metrics: [
      {
        title: "Total Orders",
        value: "482",
        changeText: "18.4%",
        isPositive: true,
        chartColor: "#10b981",
        chartData: [410, 425, 430, 445, 460, 472, 482],
      },
      {
        title: "Pending Orders",
        value: "45",
        changeText: "4.2%",
        isPositive: false,
        chartColor: "#f59e0b",
        chartData: [55, 52, 50, 48, 47, 46, 45],
      },
      {
        title: "Processing Orders",
        value: "112",
        changeText: "12.3%",
        isPositive: true,
        chartColor: "#3b82f6",
        chartData: [90, 95, 98, 102, 105, 109, 112],
      },
      {
        title: "Completed Orders",
        value: "325",
        changeText: "22.1%",
        isPositive: true,
        chartColor: "#10b981",
        chartData: [265, 278, 282, 295, 308, 317, 325],
      },
      {
        title: "Avg Order Value",
        value: "$163.15",
        changeText: "5.4%",
        isPositive: true,
        chartColor: "#22c55e",
        chartData: [155, 158, 157, 160, 161, 162, 163],
      },
    ],
    chart: {
      title: "Order Fulfilment & Volume",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [
        {
          name: "Orders Placed",
          data: [110, 180, 140, 290, 310, 420, 390, 520, 590, 530, 680, 742],
        },
        {
          name: "Completed",
          data: [95, 160, 125, 260, 285, 390, 365, 480, 545, 490, 620, 690],
        },
      ],
    },
  },
  Payment: {
    metrics: [
      {
        title: "Total Payments",
        value: "$92,450",
        changeText: "14.2%",
        isPositive: true,
        chartColor: "#f59e0b",
        chartData: [81000, 83000, 84000, 86500, 89000, 91200, 92450],
      },
      {
        title: "Refunded",
        value: "$2,100",
        changeText: "12.5%",
        isPositive: false,
        chartColor: "#ef4444",
        chartData: [2400, 2350, 2300, 2250, 2200, 2150, 2100],
      },
      {
        title: "Failed Payments",
        value: "24",
        changeText: "8.3%",
        isPositive: false,
        chartColor: "#ef4444",
        chartData: [32, 30, 28, 27, 26, 25, 24],
      },
      {
        title: "Successful Trans",
        value: "458",
        changeText: "16.1%",
        isPositive: true,
        chartColor: "#22c55e",
        chartData: [390, 410, 415, 430, 442, 450, 458],
      },
      {
        title: "Conversion Rate",
        value: "98.5%",
        changeText: "0.8%",
        isPositive: true,
        chartColor: "#10b981",
        chartData: [97.5, 97.8, 97.9, 98.1, 98.2, 98.4, 98.5],
      },
    ],
    chart: {
      title: "Payment Gateway Performance",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [
        {
          name: "Success Transactions",
          data: [80, 140, 110, 240, 260, 360, 330, 450, 510, 460, 600, 660],
        },
        {
          name: "Refunds/Chargebacks",
          data: [2, 5, 3, 8, 9, 12, 10, 14, 16, 13, 18, 20],
        },
      ],
    },
  },
  Users: {
    metrics: [
      {
        title: "Total Users",
        value: "4,850",
        changeText: "11.2%",
        isPositive: true,
        chartColor: "#ec4899",
        chartData: [4300, 4400, 4480, 4590, 4680, 4750, 4850],
      },
      {
        title: "New Signups",
        value: "320",
        changeText: "15.4%",
        isPositive: true,
        chartColor: "#ec4899",
        chartData: [260, 270, 280, 295, 305, 312, 320],
      },
      {
        title: "Active Users",
        value: "1,890",
        changeText: "9.2%",
        isPositive: true,
        chartColor: "#ec4899",
        chartData: [1710, 1750, 1780, 1820, 1845, 1860, 1890],
      },
      {
        title: "Churn Rate",
        value: "1.8%",
        changeText: "0.4%",
        isPositive: false,
        chartColor: "#ef4444",
        chartData: [2.2, 2.1, 2.0, 1.9, 1.9, 1.8, 1.8],
      },
      {
        title: "Retention Rate",
        value: "98.2%",
        changeText: "0.4%",
        isPositive: true,
        chartColor: "#10b981",
        chartData: [97.8, 97.9, 98.0, 98.1, 98.1, 98.2, 98.2],
      },
    ],
    chart: {
      title: "User Growth & Engagement",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [
        {
          name: "New Users",
          data: [150, 210, 180, 320, 360, 480, 450, 580, 650, 590, 720, 810],
        },
        {
          name: "Daily Active (x10)",
          data: [80, 110, 95, 150, 170, 220, 205, 260, 290, 270, 315, 350],
        },
      ],
    },
  },
  "Google Analytics": {
    metrics: [
      {
        title: "Page Views",
        value: "85,450",
        changeText: "16.4%",
        isPositive: true,
        chartColor: "#3b82f6",
        chartData: [72000, 75000, 77000, 80000, 82000, 84000, 85450],
      },
      {
        title: "Sessions",
        value: "42,100",
        changeText: "12.2%",
        isPositive: true,
        chartColor: "#3b82f6",
        chartData: [36000, 38000, 39000, 40500, 41200, 41800, 42100],
      },
      {
        title: "Bounce Rate",
        value: "38.5%",
        changeText: "1.2%",
        isPositive: false,
        chartColor: "#10b981",
        chartData: [39.7, 39.4, 39.1, 38.9, 38.8, 38.6, 38.5],
      },
      {
        title: "Avg Session Dur",
        value: "2m 45s",
        changeText: "4.8%",
        isPositive: true,
        chartColor: "#3b82f6",
        chartData: [150, 155, 158, 160, 162, 163, 165],
      },
      {
        title: "Goal Conversion",
        value: "3.2%",
        changeText: "0.5%",
        isPositive: true,
        chartColor: "#22c55e",
        chartData: [2.7, 2.8, 2.9, 3.0, 3.1, 3.1, 3.2],
      },
    ],
    chart: {
      title: "Audience Activity Trends",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [
        {
          name: "Sessions",
          data: [
            4500, 7200, 6100, 8900, 11000, 14500, 13200, 17800, 19500, 18200,
            21000, 24500,
          ],
        },
        {
          name: "Unique Visitors",
          data: [
            3200, 5100, 4400, 6300, 7800, 10200, 9300, 12600, 13800, 12900,
            14900, 17400,
          ],
        },
      ],
    },
  },
  Leads: {
    metrics: [
      {
        title: "Total Leads",
        value: "348",
        changeText: "22.5%",
        isPositive: true,
        chartColor: "#f97316",
        chartData: [280, 290, 305, 315, 328, 335, 348],
      },
      {
        title: "New Leads",
        value: "48",
        changeText: "14.3%",
        isPositive: true,
        chartColor: "#f97316",
        chartData: [35, 38, 40, 42, 44, 46, 48],
      },
      {
        title: "Converted Leads",
        value: "112",
        changeText: "18.2%",
        isPositive: true,
        chartColor: "#10b981",
        chartData: [90, 94, 98, 102, 105, 108, 112],
      },
      {
        title: "Conversion Ratio",
        value: "32.1%",
        changeText: "2.1%",
        isPositive: true,
        chartColor: "#10b981",
        chartData: [30.0, 30.5, 31.0, 31.2, 31.5, 31.8, 32.1],
      },
      {
        title: "Response Time",
        value: "2.4h",
        changeText: "15.0%",
        isPositive: false,
        chartColor: "#22c55e",
        chartData: [2.8, 2.7, 2.6, 2.5, 2.5, 2.4, 2.4],
      },
    ],
    chart: {
      title: "Lead Capture & Conversion Status",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [
        {
          name: "Leads Captured",
          data: [25, 42, 36, 54, 62, 85, 78, 96, 110, 98, 118, 134],
        },
        {
          name: "Converted",
          data: [8, 14, 11, 18, 20, 28, 25, 32, 38, 31, 39, 45],
        },
      ],
    },
  },
};

const customersSidebarData = {
  title: "Customer Status",
  items: [
    { name: "All Customers", color: "#1e74db", status: "all" },
    { name: "Active", color: "#10b981", status: "Active" },
    { name: "Premium", color: "#8b5cf6", status: "Premium" },
    { name: "Pending", color: "#f59e0b", status: "Pending" },
    { name: "Inactive", color: "#ef4444", status: "Inactive" },
  ],
};

const tasksSidebarData = {
  title: "Task Priority",
  items: [
    { name: "All Tasks", color: "#1e74db", priority: "all" },
    { name: "High Priority", color: "#ef4444", priority: "Admin" },
    { name: "Medium Priority", color: "#f59e0b", priority: "User" },
    { name: "Low Priority", color: "#10b981", priority: "Member" },
  ],
};

const transactionsSidebarData = {
  title: "Transaction Status",
  items: [
    { name: "All Transactions", color: "#1e74db", status: "all" },
    { name: "Completed", color: "#10b981", status: "Active" },
    { name: "Pending", color: "#f59e0b", status: "Pending" },
    { name: "Failed", color: "#ef4444", status: "Inactive" },
  ],
};

const customersData = [
  {
    id: "CUST-001",
    name: "Eleanor Vance",
    email: "eleanor.vance@acme.com",
    phone: "+1 (555) 349-2018",
    company: "Acme Corporation",
    ordersCount: 34,
    totalSpent: "₹1,45,800",
    tier: "Premium",
    status: "Active",
    createdDate: "2026-02-14",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
  },
  {
    id: "CUST-002",
    name: "Marcus Aurel",
    email: "marcus.aurel@apexcloud.io",
    phone: "+1 (555) 891-4472",
    company: "Apex Cloud Systems",
    ordersCount: 22,
    totalSpent: "₹98,500",
    tier: "User",
    status: "Active",
    createdDate: "2026-03-01",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  },
  {
    id: "CUST-003",
    name: "Sophia Chen",
    email: "sophia.chen@techsphere.dev",
    phone: "+1 (555) 782-9910",
    company: "TechSphere Dynamics",
    ordersCount: 48,
    totalSpent: "₹2,34,000",
    tier: "Admin",
    status: "Active",
    createdDate: "2026-01-20",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    id: "CUST-004",
    name: "Liam O'Connor",
    email: "liam.oconnor@greenwave.org",
    phone: "+1 (555) 234-1188",
    company: "GreenWave Labs",
    ordersCount: 8,
    totalSpent: "₹28,900",
    tier: "User",
    status: "Pending",
    createdDate: "2026-05-18",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  },
  {
    id: "CUST-005",
    name: "Amina Al-Mansoor",
    email: "amina.mansoor@horizonbi.com",
    phone: "+1 (555) 438-6629",
    company: "Horizon BI Global",
    ordersCount: 65,
    totalSpent: "₹3,82,400",
    tier: "Premium",
    status: "Active",
    createdDate: "2025-11-12",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
  },
  {
    id: "CUST-006",
    name: "Julian Rivera",
    email: "julian.rivera@velocityfin.co",
    phone: "+1 (555) 912-3344",
    company: "Velocity Fintech",
    ordersCount: 15,
    totalSpent: "₹62,300",
    tier: "Member",
    status: "Active",
    createdDate: "2026-04-09",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80",
  },
  {
    id: "CUST-007",
    name: "Chloe Dupont",
    email: "chloe.dupont@luminary.studio",
    phone: "+1 (555) 556-7812",
    company: "Luminary Studio",
    ordersCount: 3,
    totalSpent: "₹12,400",
    tier: "User",
    status: "Inactive",
    createdDate: "2026-06-22",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80",
  },
  {
    id: "CUST-008",
    name: "Devon Vance",
    email: "devon.vance@finmatrix.com",
    phone: "+1 (555) 674-8890",
    company: "FinMatrix Global",
    ordersCount: 41,
    totalSpent: "₹1,89,600",
    tier: "Premium",
    status: "Active",
    createdDate: "2026-02-28",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&q=80",
  },
  {
    id: "CUST-009",
    name: "Rachel Zane",
    email: "rachel.zane@specterlegal.com",
    phone: "+1 (555) 341-9002",
    company: "Specter Legal Partners",
    ordersCount: 19,
    totalSpent: "₹84,200",
    tier: "Admin",
    status: "Active",
    createdDate: "2026-03-15",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
  },
  {
    id: "CUST-010",
    name: "Vikram Malhotra",
    email: "vikram.m@indusventures.in",
    phone: "+91 98201 44820",
    company: "Indus Ventures Capital",
    ordersCount: 52,
    totalSpent: "₹2,78,000",
    tier: "Premium",
    status: "Active",
    createdDate: "2026-01-05",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
  },
  {
    id: "CUST-011",
    name: "Hannah Abbott",
    email: "hannah.abbott@botanica.io",
    phone: "+1 (555) 819-2233",
    company: "Botanica Organics",
    ordersCount: 6,
    totalSpent: "₹18,500",
    tier: "User",
    status: "Pending",
    createdDate: "2026-07-01",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&q=80",
  },
  {
    id: "CUST-012",
    name: "Tariq Edwards",
    email: "tariq.edwards@solarispower.com",
    phone: "+1 (555) 743-1980",
    company: "Solaris Power Solutions",
    ordersCount: 29,
    totalSpent: "₹1,24,000",
    tier: "Member",
    status: "Active",
    createdDate: "2026-04-12",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&q=80",
  },
];

const tasksData = [
  {
    id: "TASK-101",
    title: "Implement Zero-Latency Memoization in MainLayout",
    assignee: {
      name: "Alex Morgan",
      role: "Staff Engineer",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
    },
    priority: "Admin",
    status: "Active",
    dueDate: "2026-09-20",
    tags: ["Frontend", "Performance", "React 19"],
    createdDate: "2026-09-10",
  },
  {
    id: "TASK-102",
    title: "Audit Role Permissions for Customer Management",
    assignee: {
      name: "Priya Sharma",
      role: "SecOps Lead",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
    },
    priority: "User",
    status: "Active",
    dueDate: "2026-09-24",
    tags: ["Security", "RBAC"],
    createdDate: "2026-09-11",
  },
  {
    id: "TASK-103",
    title: "Refactor Table Pagination and Expanded Row Views",
    assignee: {
      name: "Marcus Aurel",
      role: "UI Designer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
    priority: "Member",
    status: "Active",
    dueDate: "2026-09-18",
    tags: ["UI/UX", "Components"],
    createdDate: "2026-09-08",
  },
  {
    id: "TASK-104",
    title: "Stripe Webhook Handler for Refund Telemetry",
    assignee: {
      name: "Julian Rivera",
      role: "Backend Dev",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80",
    },
    priority: "Admin",
    status: "Pending",
    dueDate: "2026-09-28",
    tags: ["Payments", "API", "Stripe"],
    createdDate: "2026-09-12",
  },
  {
    id: "TASK-105",
    title: "Dark Theme Color Token System Validation",
    assignee: {
      name: "Sophia Chen",
      role: "Design Systems",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    },
    priority: "User",
    status: "Active",
    dueDate: "2026-09-22",
    tags: ["CSS", "Theming"],
    createdDate: "2026-09-09",
  },
  {
    id: "TASK-106",
    title: "Database Indexing on Transactions Ledger Table",
    assignee: {
      name: "Vikram Malhotra",
      role: "DBA Architect",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
    },
    priority: "Admin",
    status: "Active",
    dueDate: "2026-09-19",
    tags: ["Database", "PostgreSQL"],
    createdDate: "2026-09-07",
  },
  {
    id: "TASK-107",
    title: "Setup Cypress E2E Tests for Checkout Flow",
    assignee: {
      name: "Liam O'Connor",
      role: "QA Engineer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    },
    priority: "Member",
    status: "Pending",
    dueDate: "2026-09-30",
    tags: ["Testing", "Cypress"],
    createdDate: "2026-09-14",
  },
  {
    id: "TASK-108",
    title: "Kubernetes Node Auto-Scaling Threshold Review",
    assignee: {
      name: "Amina Al-Mansoor",
      role: "DevOps Lead",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
    },
    priority: "Admin",
    status: "Active",
    dueDate: "2026-09-21",
    tags: ["DevOps", "K8s", "Cloud"],
    createdDate: "2026-09-11",
  },
  {
    id: "TASK-109",
    title: "Customer CSV Bulk Import Validation Pipeline",
    assignee: {
      name: "Devon Vance",
      role: "Fullstack Eng",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&q=80",
    },
    priority: "User",
    status: "Active",
    dueDate: "2026-09-25",
    tags: ["CSV", "ETL", "Customers"],
    createdDate: "2026-09-13",
  },
  {
    id: "TASK-110",
    title: "Sanitize XSS in User-Generated Profile Bio",
    assignee: {
      name: "Rachel Zane",
      role: "AppSec Analyst",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
    },
    priority: "Admin",
    status: "Active",
    dueDate: "2026-09-17",
    tags: ["Security", "Vulnerability"],
    createdDate: "2026-09-12",
  },
  {
    id: "TASK-111",
    title: "SEO Canonical Tag Generator for Blog Articles",
    assignee: {
      name: "Chloe Dupont",
      role: "Content Strategist",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80",
    },
    priority: "Member",
    status: "Inactive",
    dueDate: "2026-10-02",
    tags: ["SEO", "CMS"],
    createdDate: "2026-09-05",
  },
  {
    id: "TASK-112",
    title: "ApexCharts Dynamic Palette Switcher",
    assignee: {
      name: "Tariq Edwards",
      role: "Data Visualization",
      avatar:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&q=80",
    },
    priority: "User",
    status: "Active",
    dueDate: "2026-09-23",
    tags: ["Charts", "ApexCharts"],
    createdDate: "2026-09-10",
  },
];

const transactionsData = [
  {
    id: "TXN-901",
    transactionId: "TXN-982014",
    customer: {
      name: "Eleanor Vance",
      email: "eleanor.vance@acme.com",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    },
    amount: "₹45,800",
    method: "Credit Card",
    status: "Active",
    type: "Payment",
    date: "2026-09-14",
  },
  {
    id: "TXN-902",
    transactionId: "TXN-982015",
    customer: {
      name: "Sophia Chen",
      email: "sophia.chen@techsphere.dev",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    },
    amount: "₹1,12,500",
    method: "Wire Transfer",
    status: "Active",
    type: "Invoice",
    date: "2026-09-14",
  },
  {
    id: "TXN-903",
    transactionId: "TXN-982016",
    customer: {
      name: "Marcus Aurel",
      email: "marcus.aurel@apexcloud.io",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    },
    amount: "₹24,900",
    method: "UPI / NetBanking",
    status: "Pending",
    type: "Subscription",
    date: "2026-09-13",
  },
  {
    id: "TXN-904",
    transactionId: "TXN-982017",
    customer: {
      name: "Amina Al-Mansoor",
      email: "amina.mansoor@horizonbi.com",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
    },
    amount: "₹88,000",
    method: "Credit Card",
    status: "Active",
    type: "Payment",
    date: "2026-09-12",
  },
  {
    id: "TXN-905",
    transactionId: "TXN-982018",
    customer: {
      name: "Liam O'Connor",
      email: "liam.oconnor@greenwave.org",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    },
    amount: "₹14,200",
    method: "Debit Card",
    status: "Inactive",
    type: "Refund",
    date: "2026-09-11",
  },
  {
    id: "TXN-906",
    transactionId: "TXN-982019",
    customer: {
      name: "Julian Rivera",
      email: "julian.rivera@velocityfin.co",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80",
    },
    amount: "₹38,500",
    method: "Credit Card",
    status: "Active",
    type: "Payment",
    date: "2026-09-10",
  },
  {
    id: "TXN-907",
    transactionId: "TXN-982020",
    customer: {
      name: "Devon Vance",
      email: "devon.vance@finmatrix.com",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&q=80",
    },
    amount: "₹96,400",
    method: "Wire Transfer",
    status: "Active",
    type: "Invoice",
    date: "2026-09-09",
  },
  {
    id: "TXN-908",
    transactionId: "TXN-982021",
    customer: {
      name: "Rachel Zane",
      email: "rachel.zane@specterlegal.com",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
    },
    amount: "₹52,000",
    method: "UPI / NetBanking",
    status: "Active",
    type: "Subscription",
    date: "2026-09-08",
  },
  {
    id: "TXN-909",
    transactionId: "TXN-982022",
    customer: {
      name: "Vikram Malhotra",
      email: "vikram.m@indusventures.in",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
    },
    amount: "₹1,40,000",
    method: "Wire Transfer",
    status: "Active",
    type: "Payment",
    date: "2026-09-07",
  },
  {
    id: "TXN-910",
    transactionId: "TXN-982023",
    customer: {
      name: "Chloe Dupont",
      email: "chloe.dupont@luminary.studio",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80",
    },
    amount: "₹8,900",
    method: "Debit Card",
    status: "Inactive",
    type: "Refund",
    date: "2026-09-06",
  },
  {
    id: "TXN-911",
    transactionId: "TXN-982024",
    customer: {
      name: "Hannah Abbott",
      email: "hannah.abbott@botanica.io",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&q=80",
    },
    amount: "₹16,800",
    method: "Credit Card",
    status: "Pending",
    type: "Subscription",
    date: "2026-09-05",
  },
  {
    id: "TXN-912",
    transactionId: "TXN-982025",
    customer: {
      name: "Tariq Edwards",
      email: "tariq.edwards@solarispower.com",
      avatar:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&q=80",
    },
    amount: "₹74,500",
    method: "UPI / NetBanking",
    status: "Active",
    type: "Payment",
    date: "2026-09-04",
  },
];

const usersData = [
  {
    id: "USR-001",
    name: "Alexander Pierce",
    email: "alexander.pierce@company.com",
    mobile: "+1 (555) 019-2834",
    role: "Administrator",
    lastActive: "Just now",
    status: "Active",
    createdDate: "2026-01-10",
    updatedDate: "2026-09-15",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
  },
  {
    id: "USR-002",
    name: "Sarah Connor",
    email: "sarah.connor@cyberdyne.io",
    mobile: "+1 (555) 438-9012",
    role: "Vendor",
    lastActive: "2 hrs ago",
    status: "Active",
    createdDate: "2026-02-14",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    id: "USR-003",
    name: "Michael Chang",
    email: "michael.chang@pacificcorp.com",
    mobile: "+1 (555) 781-3456",
    role: "User",
    lastActive: "1 day ago",
    status: "Active",
    createdDate: "2026-03-01",
    updatedDate: "2026-09-10",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  },
  {
    id: "USR-004",
    name: "Elena Rostova",
    email: "elena.rostova@aurorafin.dev",
    mobile: "+1 (555) 629-8741",
    role: "Administrator",
    lastActive: "3 days ago",
    status: "Active",
    createdDate: "2026-01-25",
    updatedDate: "2026-09-12",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
  },
  {
    id: "USR-005",
    name: "David Kim",
    email: "david.kim@seoultech.kr",
    mobile: "+1 (555) 912-6543",
    role: "Vendor",
    lastActive: "5 days ago",
    status: "Inactive",
    createdDate: "2026-04-18",
    updatedDate: "2026-08-20",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  },
  {
    id: "USR-006",
    name: "Zoe Saldana",
    email: "zoe.saldana@mediaworks.org",
    mobile: "+1 (555) 341-7890",
    role: "User",
    lastActive: "Yesterday",
    status: "Active",
    createdDate: "2026-05-20",
    updatedDate: "2026-09-13",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80",
  },
  {
    id: "USR-007",
    name: "Arthur Pendelton",
    email: "arthur.p@camelot.uk",
    mobile: "+44 20 7946 0912",
    role: "Vendor",
    lastActive: "1 hr ago",
    status: "Active",
    createdDate: "2026-02-28",
    updatedDate: "2026-09-15",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80",
  },
  {
    id: "USR-008",
    name: "Fatima Zahra",
    email: "fatima.zahra@casablanca.ma",
    mobile: "+1 (555) 882-1940",
    role: "User",
    lastActive: "4 hrs ago",
    status: "Active",
    createdDate: "2026-06-11",
    updatedDate: "2026-09-14",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
  },
  {
    id: "USR-009",
    name: "Lucas Moretti",
    email: "lucas.moretti@roma.it",
    mobile: "+1 (555) 456-1123",
    role: "Administrator",
    lastActive: "Just now",
    status: "Active",
    createdDate: "2026-01-05",
    updatedDate: "2026-09-15",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
  },
  {
    id: "USR-010",
    name: "Kavita Patel",
    email: "kavita.patel@mumbai.in",
    mobile: "+91 98200 12345",
    role: "User",
    lastActive: "2 days ago",
    status: "Inactive",
    createdDate: "2026-03-19",
    updatedDate: "2026-08-15",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
  },
];

const rolesData = [
  {
    id: "ROLE-001",
    name: "Administrator",
    role: "admin",
    description:
      "Unrestricted root access to all system settings, databases, user management, and billing.",
    permissions: [
      "manage_users",
      "manage_roles",
      "manage_billing",
      "view_analytics",
      "edit_system_config",
      "full_access",
    ],
    usersCount: 3,
    status: "Active",
    createdDate: "2025-12-01",
    updatedDate: "2026-09-15",
  },
  {
    id: "ROLE-002",
    name: "Vendor",
    role: "vendor",
    description:
      "Catalog management, order fulfillment, product pricing updates, and inventory tracking.",
    permissions: [
      "manage_products",
      "view_orders",
      "process_shipments",
      "view_vendor_analytics",
    ],
    usersCount: 3,
    status: "Active",
    createdDate: "2026-01-15",
    updatedDate: "2026-09-10",
  },
  {
    id: "ROLE-003",
    name: "User",
    role: "user",
    description:
      "Standard end-user portal access for customer self-service, ticket submission, and profile updates.",
    permissions: [
      "view_profile",
      "edit_own_profile",
      "submit_tickets",
      "view_invoices",
    ],
    usersCount: 4,
    status: "Active",
    createdDate: "2026-01-20",
    updatedDate: "2026-09-08",
  },
  {
    id: "ROLE-004",
    name: "Manager",
    role: "manager",
    description:
      "Team supervisor access to review tasks, approve refund requests, and audit transaction logs.",
    permissions: [
      "view_reports",
      "approve_requests",
      "assign_tasks",
      "manage_customers",
    ],
    usersCount: 2,
    status: "Active",
    createdDate: "2026-02-10",
    updatedDate: "2026-09-12",
  },
  {
    id: "ROLE-005",
    name: "Compliance Auditor",
    role: "auditor",
    description:
      "Read-only access across all transaction ledgers, security event feeds, and audit trail logs.",
    permissions: [
      "view_audit_logs",
      "export_compliance_reports",
      "read_only_access",
    ],
    usersCount: 1,
    status: "Inactive",
    createdDate: "2026-04-05",
    updatedDate: "2026-08-30",
  },
];

const seoSidebarData = metaSidebarData;
const blogCategorySidebarData = blogCategoriesSidebarData;

const pageSidebarData = {
  users: usersSidebarData,
  roles: rolesSidebarData,
  customers: customersSidebarData,
  tasks: tasksSidebarData,
  transactions: transactionsSidebarData,
  products: productsSidebarData,
  leads: leadsSidebarData,
  orders: ordersSidebarData,
  cms: cmsSidebarData,
  categories: categoriesSidebarData,
  blogs: blogsSidebarData,
  blogCategories: blogCategoriesSidebarData,
  blogCategory: blogCategorySidebarData,
  meta: metaSidebarData,
  seo: seoSidebarData,
  analytics: analyticsSidebarData,
};

export const formatDate = (val) => {
  if (!val) return "-";
  if (typeof val === "object" && val !== null) {
    if (val.$date) val = val.$date;
  }
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(trimmed)) {
      return trimmed;
    }
  }
  const d = new Date(val);
  if (isNaN(d.getTime())) return String(val);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export {
  usersSidebarData,
  rolesSidebarData,
  customersSidebarData,
  tasksSidebarData,
  transactionsSidebarData,
  rolesTableColumns,
  customersTableColumns,
  tasksTableColumns,
  transactionsTableColumns,
  customersData,
  tasksData,
  transactionsData,
  usersData,
  rolesData,
  productsSidebarData,
  leadsSidebarData,
  ordersSidebarData,
  cmsSidebarData,
  categoriesSidebarData,
  blogsSidebarData,
  blogCategoriesSidebarData,
  blogCategorySidebarData,
  metaSidebarData,
  seoSidebarData,
  pageSidebarData,
  analyticsSidebarData,
  analyticsDataMap,
};
