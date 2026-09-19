import {
  resolveImagePath,
  dashImg,
  soboLogo,
  hero as heroImg,
} from "../../../utils/imageResolver";

import { MODAL_WIDTHS } from "../../../components/common/Modal";
import {
  SKELETON_VARIANTS,
  SKELETON_THEMES,
  SKELETON_ANIMATIONS,
} from "../../../components/common/Skeleton";
import { TYPES } from "../../../components/common/Toast";
import {
  TOOLTIP_POSITIONS,
  TOOLTIP_THEMES,
} from "../../../components/common/Tooltip";
import { ALL_ICONS } from "../../../components/common/Icon";

export const SIDEBAR_ITEMS = [
  { name: "All Components", icon: "Grid", count: 17, color: "#1e74db" },
  { name: "Text", icon: "File", count: 1, color: "#6366f1" },
  { name: "Buttons & Actions", icon: "Edit", count: 1, color: "#10b981" },
  { name: "Navigation & Tabs", icon: "Layers", count: 4, color: "#3b82f6" },
  { name: "Feedback & Overlays", icon: "Check", count: 5, color: "#f59e0b" },
  { name: "Data Display", icon: "Users", count: 4, color: "#8b5cf6" },
  { name: "Data Tables", icon: "Grid", count: 1, color: "#ec4899" },
  {
    name: "Icon Library",
    icon: "Sparkles",
    count: (ALL_ICONS || []).length,
    color: "#06b6d4",
  },
];

export const TABS = [{ name: "All Components", value: "all" }];

export const SIDEBAR_TO_TAB = {
  "All Components": "all",
  Text: "text",
  "Buttons & Actions": "actions",
  "Navigation & Tabs": "navigation",
  "Feedback & Overlays": "overlays",
  "Data Display": "display",
  "Data Tables": "tables",
  "Icon Library": "icons",
};

// Typography Options
export const HEAD_FONTSIZE_OPTIONS = [
  { label: ".largehead-text (130px / 42px)", value: "largehead-text" },
  { label: ".largemid-text (80px / 42px)", value: "largemid-text" },
  { label: ".large-text (52px / 36px)", value: "large-text" },
  { label: ".head-text (40px / 24px)", value: "head-text" },
  { label: ".title-text (24px / 20px)", value: "title-text" },
  { label: ".mid-text (18px)", value: "mid-text" },
  { label: ".headmini-text (14px)", value: "headmini-text" },
];

export const TYPOGRAPHY_TAG_OPTIONS = [
  { label: "h2", value: "h2" },
  { label: "p", value: "p" },
];

export const HEAD_TAG_OPTIONS = TYPOGRAPHY_TAG_OPTIONS;

export const PARA_FONTSIZE_OPTIONS = [
  { label: ".largepara-text (24px / 20px)", value: "largepara-text" },
  { label: ".headpara-text (20px / 20px)", value: "headpara-text" },
  { label: ".midpara-text (18px / 15px)", value: "midpara-text" },
  { label: ".para-text (16px)", value: "para-text" },
  { label: ".small-text (13px)", value: "small-text" },
  { label: ".mini-text (11.5px)", value: "mini-text" },
];

export const TYPOGRAPHY_WEIGHT_OPTIONS = [
  { label: "400 (Regular)", value: "font-400" },
  { label: "500 (Medium)", value: "font-500" },
  { label: "600 (Semibold)", value: "font-600" },
  { label: "700 (Bold)", value: "font-700" },
  { label: "800 (Extra Bold)", value: "font-800" },
];

export const TYPOGRAPHY_COLOR_OPTIONS = [
  { label: "Dark (#1a1a1a)", value: "text-dark" },
  { label: "Gray (#666666)", value: "text-gray" },
  { label: "Primary Blue", value: "text-primary" },
  { label: "Secondary Green", value: "text-secondary" },
  { label: "Danger Red", value: "text-danger" },
  { label: "White", value: "text-white" },
];

// Common Options
export const BUTTON_VERSION_OPTIONS = [
  { label: "v0 (Mini)", value: "v0" },
  { label: "v1 (Default)", value: "v1" },
  { label: "v2 (Compact/Pill)", value: "v2" },
  { label: "v3 (Full Width)", value: "v3" },
  { label: "icon (Icon)", value: "icon" },
  { label: "none (Unstyled)", value: "none" },
];

export const BUTTON_BG_OPTIONS = [
  { label: "Primary", value: "primary" },
  { label: "Secondary", value: "secondary" },
  { label: "Success", value: "success" },
  { label: "Danger", value: "danger" },
  { label: "Warning", value: "warning" },
  { label: "Info", value: "info" },
  { label: "Dark", value: "dark" },
  { label: "Forth", value: "forth" },
  { label: "Light Primary", value: "light-primary" },
];

export const BUTTON_COLOR_OPTIONS = [
  { label: "White", value: "white" },
  { label: "Dark", value: "dark" },
  { label: "Gray", value: "gray" },
  { label: "Primary", value: "primary" },
  { label: "Secondary", value: "secondary" },
];

export const BUTTON_BORDER_OPTIONS = [
  { label: "None", value: "" },
  { label: "Primary", value: "primary" },
  { label: "Secondary", value: "secondary" },
  { label: "Tertiary", value: "tertiary" },
  { label: "Dark", value: "dark" },
];

export const BUTTON_ICON_OPTIONS = [
  { label: "None", value: "" },
  { label: "Plus", value: "Plus" },
  { label: "Check", value: "Check" },
  { label: "Trash", value: "Trash" },
  { label: "Download", value: "Download" },
  { label: "Settings", value: "Settings" },
  { label: "Copy", value: "Copy" },
  { label: "Refresh", value: "Refresh" },
  { label: "Heart", value: "Heart" },
  { label: "Edit", value: "Edit" },
];

export const BOOLEAN_OPTIONS = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];

export const TOAST_TYPE_OPTIONS = Object.keys(TYPES || {}).map((key) => ({
  label: TYPES[key].title,
  value: key,
}));

export const STEPS_VERSION_OPTIONS = [
  { label: "Version 1", value: "v1" },
  { label: "Version 2", value: "v2" },
];

export const MODAL_SIZE_OPTIONS = Object.keys(MODAL_WIDTHS || {}).map(
  (key) => ({
    label: `${key.toUpperCase()} (${MODAL_WIDTHS[key]})`,
    value: key,
  }),
);

export const DROPDOWN_ALIGN_OPTIONS = [
  { label: "Left Aligned", value: "left" },
  { label: "Right Aligned", value: "right" },
  { label: "Centered", value: "center" },
  { label: "Full Width", value: "full" },
];

export const DROPDOWN_WIDTH_OPTIONS = [
  { label: "180px", value: "180px" },
  { label: "210px (Default)", value: "210px" },
  { label: "250px", value: "250px" },
  { label: "300px", value: "300px" },
];

export const MAGNIFY_POSITION_OPTIONS = [
  { label: "Right Flyout (Default)", value: "right" },
  { label: "Left Flyout", value: "left" },
  { label: "Inside Lens", value: "inside" },
];

export const MAGNIFY_SCALE_OPTIONS = [
  { label: "2.0x Zoom", value: "2" },
  { label: "2.5x Zoom (Default)", value: "2.5" },
  { label: "3.0x Zoom", value: "3" },
  { label: "4.0x Zoom", value: "4" },
];

export const MAGNIFY_SIZE_OPTIONS = [
  { label: "260px (Compact)", value: "260" },
  { label: "300px (Medium)", value: "300" },
  { label: "360px (Large)", value: "360" },
];

export const MAGNIFY_IMG_OPTIONS = [
  { label: "Dashboard Graphic", value: "dash" },
  { label: "Hero Graphic", value: "hero" },
  { label: "Sobo Logo", value: "sobo" },
];

export const ICON_SIZE_OPTIONS = [
  { label: "16px (Mini)", value: "16" },
  { label: "20px (Compact)", value: "20" },
  { label: "24px (Standard - Default)", value: "24" },
  { label: "28px (Medium)", value: "28" },
  { label: "32px (Large)", value: "32" },
  { label: "40px (Hero)", value: "40" },
];

export const ICON_STROKE_OPTIONS = [
  { label: "1.5 (Light)", value: "1.5" },
  { label: "2.0 (Standard - Default)", value: "2" },
  { label: "2.5 (Medium)", value: "2.5" },
  { label: "3.0 (Bold)", value: "3" },
];

export const ICON_COLOR_OPTIONS = [
  { label: "Primary Blue (#1e74db)", value: "#1e74db" },
  { label: "Dark Slate (#0f1623)", value: "#0f1623" },
  { label: "Success Green (#10b981)", value: "#10b981" },
  { label: "Danger Red (#ef4444)", value: "#ef4444" },
  { label: "Warning Amber (#f59e0b)", value: "#f59e0b" },
  { label: "Indigo Purple (#6366f1)", value: "#6366f1" },
  { label: "Rose Pink (#ec4899)", value: "#ec4899" },
  { label: "Slate Gray (#64748b)", value: "#64748b" },
];

export const BADGE_VARIANT_OPTIONS = [
  { label: "Filled (Pill / Tag)", value: "filled" },
  { label: "Outline", value: "outline" },
  { label: "Status Dot", value: "status" },
];

export const BADGE_COLOR_OPTIONS = [
  { label: "Primary (Blue)", value: "primary" },
  { label: "Success (Green / Active)", value: "success" },
  { label: "Warning (Amber / Pending)", value: "warning" },
  { label: "Danger (Red / Admin)", value: "danger" },
  { label: "Info (Cyan / Staff)", value: "info" },
  { label: "Purple (Vendor / Partner)", value: "purple" },
  { label: "Secondary (Slate Gray)", value: "secondary" },
  { label: "Dark", value: "dark" },
  { label: "Forth", value: "forth" },
];

export const BADGE_SHAPE_OPTIONS = [
  { label: "Pill (rounded-20)", value: "pill" },
  { label: "Rounded Tag (rounded-5)", value: "rounded" },
  { label: "Square (rounded-0)", value: "square" },
  { label: "Circle (rounded-full)", value: "circle" },
];

export const BADGE_SIZE_OPTIONS = [
  { label: "Small (sm)", value: "sm" },
  { label: "Medium (md - Default)", value: "md" },
  { label: "Large (lg)", value: "lg" },
];

export const BADGE_ICON_OPTIONS = [
  { label: "None", value: "" },
  { label: "Check", value: "Check" },
  { label: "Sparkles", value: "Sparkles" },
  { label: "Star", value: "Star" },
  { label: "Lock", value: "Lock" },
  { label: "Users", value: "Users" },
  { label: "Clock", value: "Clock" },
  { label: "Trash", value: "Trash" },
  { label: "Edit", value: "Edit" },
];

export const BADGE_MODE_OPTIONS = [
  { label: "Single Badge", value: "single" },
  { label: "Badge List / Tags", value: "list" },
];

// Sample static data for components
export const STEP_LABELS = [
  "Define Project",
  "Configure Theme",
  "Import Components",
  "Final Launch",
];

export const BREADCRUMB_ITEMS = [
  { label: "Workspace", path: "/dashboard", icon: "Home" },
  { label: "Component Library", path: "/components/fields", icon: "Layers" },
  { label: "Common Showcase", icon: "Grid" },
];

export const ACCORDION_ITEMS = [
  {
    title: "How does generic dashboard state management work?",
    content:
      "State is decoupled using localized React hooks with React.memo, useCallback, and useMemo guards to prevent unnecessary tree re-renders across high-frequency interactions.",
  },
  {
    title: "Can Accordion items allow multiple simultaneous expansions?",
    content:
      "Yes! By passing the allowMultiple={true} prop to Accordion, users can open as many collapse panels as needed simultaneously.",
  },
];

export const SAMPLE_COLUMNS = [
  { accessor: "checkbox", style: { width: "45px" } },
  {
    header: "User / Member",
    accessor: "name",
    ui: "profile",
    imageKey: "avatar",
    subKey: "email",
    style: { minWidth: "220px" },
  },
  {
    header: "Role",
    accessor: "role",
    ui: "badge",
    style: { minWidth: "120px" },
  },
  {
    header: "Skills / Tags",
    accessor: "tags",
    ui: "badge-list",
    style: { minWidth: "210px" },
  },
  {
    header: "Status",
    accessor: "status",
    ui: "status",
    style: { minWidth: "110px" },
  },
  {
    header: "Performance",
    accessor: "score",
    ui: "score-pill",
    style: { minWidth: "110px" },
  },
  {
    header: "Joined Date",
    accessor: "createdAt",
    ui: "date",
    style: { minWidth: "130px" },
  },
  {
    header: "Actions",
    accessor: "actions",
    ui: "actions",
    style: { minWidth: "110px", textAlign: "right" },
  },
  // Collapsed columns for expand/collapse row details
  { header: "Department", accessor: "department", collapsed: true },
  { header: "Contact Phone", accessor: "phone", collapsed: true },
  { header: "Office Location", accessor: "location", collapsed: true },
  { header: "Notes & Bio", accessor: "notes", collapsed: true },
];

export const SAMPLE_DATA = [
  {
    id: "USR-001",
    name: "Sarah Connor",
    email: "sarah.connor@cyberdyne.io",
    avatar: soboLogo,
    role: "Admin",
    category: "Leadership",
    tags: ["Architecture", "Kubernetes", "Security"],
    status: "Active",
    score: 98,
    createdAt: "2026-01-15",
    department: "Core Platform",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    notes:
      "Principal architect driving multi-region Kubernetes migration and zero-trust security.",
  },
  {
    id: "USR-002",
    name: "Alex Morgan",
    email: "alex.morgan@company.com",
    avatar: dashImg,
    role: "Engineer",
    category: "Development",
    tags: ["React", "TypeScript", "Vite"],
    status: "Active",
    score: 92,
    createdAt: "2026-02-10",
    department: "Frontend Eng",
    phone: "+1 (555) 432-8765",
    location: "Seattle, WA",
    notes:
      "Lead frontend engineer maintaining design system components and accessibility standards.",
  },
  {
    id: "USR-003",
    name: "Elena Rostova",
    email: "elena.r@fintech.dev",
    avatar: heroImg,
    role: "Designer",
    category: "Product Design",
    tags: ["Figma", "Design System", "UX Research"],
    status: "Active",
    score: 95,
    createdAt: "2026-02-18",
    department: "UX / UI",
    phone: "+44 20 7946 0912",
    location: "London, UK",
    notes:
      "Design lead shaping user experience paradigms, responsive typography, and design tokens.",
  },
  {
    id: "USR-004",
    name: "Marcus Vance",
    email: "marcus.v@enterprisecorp.com",
    avatar: soboLogo,
    role: "Manager",
    category: "Management",
    tags: ["Strategy", "Budgeting", "Scrum"],
    status: "Active",
    score: 88,
    createdAt: "2026-03-05",
    department: "Operations",
    phone: "+1 (555) 890-1234",
    location: "New York, NY",
    notes:
      "Operations manager orchestrating quarterly roadmaps and cross-functional engineering sprints.",
  },
  {
    id: "USR-005",
    name: "Kenji Sato",
    email: "kenji.sato@tokyotech.jp",
    avatar: dashImg,
    role: "Engineer",
    category: "Development",
    tags: ["Go", "Microservices", "gRPC"],
    status: "Active",
    score: 94,
    createdAt: "2026-03-22",
    department: "Backend Eng",
    phone: "+81 3 5555 0143",
    location: "Tokyo, JP",
    notes:
      "Senior backend developer optimizing distributed high-throughput messaging pipelines.",
  },
  {
    id: "USR-006",
    name: "Amina Al-Mansoor",
    email: "amina.m@gulfdata.ae",
    avatar: heroImg,
    role: "Admin",
    category: "Leadership",
    tags: ["Governance", "Cloud Ops", "FinOps"],
    status: "Active",
    score: 96,
    createdAt: "2026-04-02",
    department: "Security & Cloud",
    phone: "+971 4 321 8765",
    location: "Dubai, UAE",
    notes:
      "Head of cloud infrastructure driving FinOps initiatives and ISO/IEC 27001 compliance.",
  },
  {
    id: "USR-007",
    name: "Lucas Silva",
    email: "lucas.silva@saopaulo.br",
    avatar: soboLogo,
    role: "Designer",
    category: "Product Design",
    tags: ["Motion Design", "CSS", "Storybook"],
    status: "Inactive",
    score: 79,
    createdAt: "2026-04-14",
    department: "UX / UI",
    phone: "+55 11 98765 4321",
    location: "São Paulo, BR",
    notes:
      "UI motion specialist designing micro-interactions and interactive component libraries.",
  },
  {
    id: "USR-008",
    name: "Chloe Dupont",
    email: "chloe.d@paristech.fr",
    avatar: dashImg,
    role: "Engineer",
    category: "Development",
    tags: ["Next.js", "GraphQL", "Tailwind"],
    status: "Active",
    score: 91,
    createdAt: "2026-04-29",
    department: "Frontend Eng",
    phone: "+33 1 42 68 55 00",
    location: "Paris, FR",
    notes:
      "Frontend engineer building SSR analytics dashboards and internationalization tooling.",
  },
  {
    id: "USR-009",
    name: "Liam O'Connor",
    email: "liam.oc@dublindev.ie",
    avatar: heroImg,
    role: "Support",
    category: "Customer Success",
    tags: ["Zendesk", "API Integration", "Debugging"],
    status: "Active",
    score: 87,
    createdAt: "2026-05-11",
    department: "Support",
    phone: "+353 1 496 0123",
    location: "Dublin, IE",
    notes:
      "Tier-3 technical support specialist troubleshooting enterprise customer integrations.",
  },
  {
    id: "USR-010",
    name: "Priya Sharma",
    email: "priya.sharma@bengaluru.in",
    avatar: soboLogo,
    role: "Admin",
    category: "Leadership",
    tags: ["Data Architecture", "Python", "Spark"],
    status: "Active",
    score: 97,
    createdAt: "2026-05-25",
    department: "Data Platform",
    phone: "+91 80 2345 6789",
    location: "Bengaluru, IN",
    notes:
      "Principal data architect designing real-time telemetry streaming and analytical data warehouses.",
  },
  {
    id: "USR-011",
    name: "Oliver Hansen",
    email: "oliver.h@nordiccloud.dk",
    avatar: dashImg,
    role: "Engineer",
    category: "Development",
    tags: ["Rust", "WASM", "High Performance"],
    status: "Active",
    score: 93,
    createdAt: "2026-06-08",
    department: "Core Platform",
    phone: "+45 32 45 67 89",
    location: "Copenhagen, DK",
    notes:
      "Systems programmer compiling WebAssembly modules for browser-side spreadsheet calculation.",
  },
  {
    id: "USR-012",
    name: "Sophia Chen",
    email: "sophia.c@singapore.sg",
    avatar: heroImg,
    role: "Manager",
    category: "Management",
    tags: ["Roadmap", "Agile", "Stakeholders"],
    status: "Active",
    score: 90,
    createdAt: "2026-06-19",
    department: "Product Management",
    phone: "+65 6789 0123",
    location: "Singapore, SG",
    notes:
      "Product manager steering enterprise admin suites, authorization workflows, and compliance.",
  },
  {
    id: "USR-013",
    name: "Mateo Hernandez",
    email: "mateo.h@mexicocity.mx",
    avatar: soboLogo,
    role: "Designer",
    category: "Product Design",
    tags: ["Prototyping", "Design Systems", "Figma"],
    status: "Inactive",
    score: 76,
    createdAt: "2026-07-01",
    department: "UX / UI",
    phone: "+52 55 1234 5678",
    location: "Mexico City, MX",
    notes:
      "Design systems designer building accessible WCAG 2.1 AAA color schemes and icon sets.",
  },
  {
    id: "USR-014",
    name: "Zoe Kravitz",
    email: "zoe.k@berlinhub.de",
    avatar: dashImg,
    role: "Engineer",
    category: "Development",
    tags: ["Node.js", "Docker", "PostgreSQL"],
    status: "Active",
    score: 89,
    createdAt: "2026-07-14",
    department: "Backend Eng",
    phone: "+49 30 9876 5432",
    location: "Berlin, DE",
    notes:
      "Backend specialist implementing multi-tenant tenant isolation and query performance indexing.",
  },
  {
    id: "USR-015",
    name: "David Kim",
    email: "david.kim@seoulcode.kr",
    avatar: heroImg,
    role: "Support",
    category: "Customer Success",
    tags: ["Client Success", "Documentation", "QA"],
    status: "Active",
    score: 85,
    createdAt: "2026-07-28",
    department: "Support",
    phone: "+82 2 3456 7890",
    location: "Seoul, KR",
    notes:
      "Customer success engineer driving self-serve developer onboarding documentation and code examples.",
  },
  {
    id: "USR-016",
    name: "Fatima Zahra",
    email: "fatima.z@casablanca.ma",
    avatar: soboLogo,
    role: "Engineer",
    category: "Development",
    tags: ["Vue.js", "Pinia", "Vite"],
    status: "Active",
    score: 91,
    createdAt: "2026-08-05",
    department: "Frontend Eng",
    phone: "+212 522 34 56 78",
    location: "Casablanca, MA",
    notes:
      "Frontend engineer building high-density data tables and real-time WebSocket chart viewers.",
  },
  {
    id: "USR-017",
    name: "Noah van Dijk",
    email: "noah.v@amsterdamit.nl",
    avatar: dashImg,
    role: "Admin",
    category: "Leadership",
    tags: ["SRE", "Terraform", "Prometheus"],
    status: "Active",
    score: 95,
    createdAt: "2026-08-16",
    department: "Core Platform",
    phone: "+31 20 890 1234",
    location: "Amsterdam, NL",
    notes:
      "Lead SRE managing multi-cloud Terraform pipelines, disaster recovery, and 99.99% uptime SLAs.",
  },
  {
    id: "USR-018",
    name: "Isabella Rossi",
    email: "isabella.r@milandev.it",
    avatar: heroImg,
    role: "Designer",
    category: "Product Design",
    tags: ["Visual Design", "Branding", "UI Kits"],
    status: "Inactive",
    score: 72,
    createdAt: "2026-08-24",
    department: "UX / UI",
    phone: "+39 02 7654 3210",
    location: "Milan, IT",
    notes:
      "Visual designer crafting brand design tokens, icon asset packages, and dark mode skins.",
  },
  {
    id: "USR-019",
    name: "Ethan Wright",
    email: "ethan.w@sydneyhub.au",
    avatar: soboLogo,
    role: "Engineer",
    category: "Development",
    tags: ["Next.js", "Tailwind", "REST"],
    status: "Active",
    score: 88,
    createdAt: "2026-09-02",
    department: "Frontend Eng",
    phone: "+61 3 9876 5432",
    location: "Melbourne, AU",
    notes:
      "Full-stack developer implementing client portals and responsive table views.",
  },
  {
    id: "USR-020",
    name: "Hanna Kowalska",
    email: "hanna.k@warsawit.pl",
    avatar: dashImg,
    role: "Manager",
    category: "Management",
    tags: ["Jira", "Sprint", "Delivery"],
    status: "Active",
    score: 92,
    createdAt: "2026-09-10",
    department: "Operations",
    phone: "+48 22 123 4567",
    location: "Warsaw, PL",
    notes:
      "Technical program manager delivering multi-tenant cloud dashboard infrastructure.",
  },
  {
    id: "USR-021",
    name: "Gabriel Santos",
    email: "gabriel.s@saopaulocode.br",
    avatar: heroImg,
    role: "Support",
    category: "Customer Success",
    tags: ["HelpDesk", "Troubleshooting", "SQL"],
    status: "Active",
    score: 83,
    createdAt: "2026-09-14",
    department: "Support",
    phone: "+55 11 98765 4321",
    location: "São Paulo, BR",
    notes:
      "Customer support specialist resolving integration questions and database queries.",
  },
];

/**
 * Master List / Map Array of Component Showcase Specifications
 * Accepts live preview render callbacks from TemplateSection.jsx
 */
export const getTemplateComponentsData = (previews = {}) => [
  // 0. Typography Component (h2 & p tags)
  {
    id: "head-text",
    category: "text",
    title: "Typography Component",
    subtitle:
      "Interactive typography scale with h2 heading and p paragraph font size options",
    icon: "File",
    defaultValues: {
      tag: "h2",
      fontSizeClass: "head-text",
      fontWeight: "font-600",
      color: "text-dark",
      text: "Empowering Modern Digital Dashboards",
    },
    getFields: (values = {}) => {
      const isPara = values.tag === "p";
      return [
        {
          name: "tag",
          label: "HTML Tag",
          type: "select",
          options: TYPOGRAPHY_TAG_OPTIONS,
        },
        {
          name: "fontSizeClass",
          label: isPara ? "Paragraph Font Size" : "Heading Font Size",
          type: "select",
          options: isPara ? PARA_FONTSIZE_OPTIONS : HEAD_FONTSIZE_OPTIONS,
        },
        {
          name: "fontWeight",
          label: "Font Weight",
          type: "select",
          options: TYPOGRAPHY_WEIGHT_OPTIONS,
        },
        {
          name: "color",
          label: "Text Color",
          type: "select",
          options: TYPOGRAPHY_COLOR_OPTIONS,
        },
        {
          name: "text",
          label: isPara ? "Sample Paragraph Text" : "Sample Heading Text",
          type: "text",
          placeholder: "Enter text",
        },
      ];
    },
    fields: [
      {
        name: "tag",
        label: "HTML Tag",
        type: "select",
        options: TYPOGRAPHY_TAG_OPTIONS,
      },
      {
        name: "fontSizeClass",
        label: "Heading Font Size",
        type: "select",
        options: HEAD_FONTSIZE_OPTIONS,
      },
      {
        name: "fontWeight",
        label: "Font Weight",
        type: "select",
        options: TYPOGRAPHY_WEIGHT_OPTIONS,
      },
      {
        name: "color",
        label: "Text Color",
        type: "select",
        options: TYPOGRAPHY_COLOR_OPTIONS,
      },
      {
        name: "text",
        label: "Sample Heading Text",
        type: "text",
        placeholder: "Enter heading text",
      },
    ],
    renderPreview: (values, helpers) =>
      previews["head-text"]?.(values, helpers),
    getCode: (values) => {
      const tag = values.tag || "h2";
      const isPara = tag === "p";
      const defaultSize = isPara ? "para-text" : "head-text";
      const defaultWeight = isPara ? "font-400" : "font-600";
      const defaultText = isPara
        ? "A versatile dashboard built with clean architecture, modular components, and accessible design systems."
        : "Empowering Modern Digital Dashboards";
      const cls = [
        values.fontSizeClass || defaultSize,
        values.fontWeight || defaultWeight,
        values.color || "text-dark",
      ]
        .filter(Boolean)
        .join(" ");
      return `<${tag} className="${cls}">\n  ${values.text || defaultText}\n</${tag}>`;
    },
  },

  // 1. Button
  {
    id: "button",
    category: "actions",
    title: "Button Component",
    subtitle:
      "Extensible interactive buttons with semantic colors, outline styles, and icon prefixes",
    icon: "Edit",
    defaultValues: {
      text: "Interactive Action",
      version: "v2",
      variant: "filled",
      bg: "primary",
      color: "white",
      border: "",
      icon: "Plus",
      disabled: false,
    },
    fields: [
      {
        name: "text",
        label: "Label",
        type: "text",
        placeholder: "Enter label",
      },
      {
        name: "version",
        label: "Version",
        type: "select",
        options: BUTTON_VERSION_OPTIONS,
      },
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: [
          { label: "Filled", value: "filled" },
          { label: "Outline", value: "outline" },
        ],
      },
      {
        name: "bg",
        label: "Background",
        type: "select",
        options: BUTTON_BG_OPTIONS,
      },
      {
        name: "color",
        label: "Color",
        type: "select",
        options: BUTTON_COLOR_OPTIONS,
      },
      {
        name: "border",
        label: "Border",
        type: "select",
        options: BUTTON_BORDER_OPTIONS,
      },
      {
        name: "icon",
        label: "Icon",
        type: "select",
        options: BUTTON_ICON_OPTIONS,
      },
      {
        name: "disabled",
        label: "Disabled",
        type: "select",
        options: [
          { label: "Active", value: "false" },
          { label: "Disabled", value: "true" },
        ],
      },
    ],
    renderPreview: (values, helpers) => previews.button?.(values, helpers),
    getCode: (values) => {
      const props = [];
      if (values.text) props.push(`text="${values.text}"`);
      if (values.version) props.push(`version="${values.version}"`);
      if (values.variant && values.variant !== "filled")
        props.push(`variant="${values.variant}"`);
      if (values.bg) props.push(`bg="${values.bg}"`);
      if (values.color) props.push(`color="${values.color}"`);
      if (values.border) props.push(`border="${values.border}"`);
      if (values.disabled === true || values.disabled === "true")
        props.push(`disabled={true}`);
      if (values.icon)
        props.push(
          `icon="${values.icon}"\n  iconWidth="14"\n  iconHeight="14"`,
        );
      props.push(`onClick={() => console.log("clicked")}`);
      return `<Button\n  ${props.join("\n  ")}\n/>`;
    },
  },

  // 2. Tab
  {
    id: "tab",
    category: "navigation",
    title: "Tab Component",
    subtitle:
      "Segmented switchers with underline (v1), pill (v2), and minimal (v3) styling",
    icon: "Layers",
    defaultValues: {
      version: "v1",
      activeTab: "all",
      showCount: true,
      showIcon: true,
    },
    fields: [
      {
        name: "version",
        label: "Tab Version",
        type: "select",
        options: [
          { label: "v1 (Underline)", value: "v1" },
          { label: "v2 (Pill)", value: "v2" },
          { label: "v3 (Minimal)", value: "v3" },
        ],
      },
      {
        name: "activeTab",
        label: "Active Tab",
        type: "select",
        options: [
          { label: "Active Modules", value: "all" },
          { label: "Pending Review", value: "pending" },
          { label: "Archived", value: "archived" },
        ],
      },
      {
        name: "showCount",
        label: "Show Count Badge",
        type: "select",
        options: BOOLEAN_OPTIONS,
      },
      {
        name: "showIcon",
        label: "Show Tab Icon",
        type: "select",
        options: BOOLEAN_OPTIONS,
      },
    ],
    renderPreview: (values, helpers) => previews.tab?.(values, helpers),
    getCode: (values) => {
      const count = values.showCount === true || values.showCount === "true";
      const icon = values.showIcon === true || values.showIcon === "true";
      return `const TABS = [\n  { name: "Active Modules", value: "all"${count ? ", count: 18" : ""}${icon ? ', icon: "Layers"' : ""} },\n  { name: "Pending Review", value: "pending"${count ? ", count: 5" : ""}${icon ? ', icon: "Clock"' : ""} },\n  { name: "Archived", value: "archived"${count ? ", count: 0" : ""}${icon ? ', icon: "Box"' : ""} }\n];\n\n<Tab\n  tabs={TABS}\n  activeTab="${values.activeTab}"\n  version="${values.version || "v1"}"\n  onChange={(tab) => setActiveTab(tab)}\n/>`;
    },
  },

  // 3. Steps
  {
    id: "steps",
    category: "navigation",
    title: "Steps Component",
    subtitle: "Workflow phase indicators with step numbering and progress line",
    icon: "Check",
    defaultValues: {
      version: "v2",
      currentStep: "2",
    },
    fields: [
      {
        name: "version",
        label: "Version",
        type: "select",
        options: STEPS_VERSION_OPTIONS,
      },
      {
        name: "currentStep",
        label: "Current Step Number",
        type: "select",
        options: [
          { label: "Step 1 (Define)", value: "1" },
          { label: "Step 2 (Configure)", value: "2" },
          { label: "Step 3 (Import)", value: "3" },
          { label: "Step 4 (Launch)", value: "4" },
        ],
      },
    ],
    renderPreview: (values, helpers) => previews.steps?.(values, helpers),
    getCode: (values) =>
      `<Steps\n  version="${values.version}"\n  currentStep={${values.currentStep}}\n  steps={["Define Project", "Configure Theme", "Import Components", "Final Launch"]}\n  onChange={(step) => setCurrentStep(step)}\n/>`,
  },

  // 4. Breadcrumb
  {
    id: "breadcrumb",
    category: "navigation",
    title: "Breadcrumb Component",
    subtitle:
      "Hierarchical wayfinding trail supporting path navigation, custom icons, and route syncing",
    icon: "Layers",
    defaultValues: {
      showIcon: true,
      separator: "ChevronRight",
      theme: "dark",
    },
    fields: [
      {
        name: "showIcon",
        label: "Show Item Icons",
        type: "select",
        options: BOOLEAN_OPTIONS,
      },
      {
        name: "separator",
        label: "Separator Type",
        type: "select",
        options: [
          { label: "Chevron Right (Icon)", value: "ChevronRight" },
          { label: "Arrow Right (Icon)", value: "ArrowRight" },
          { label: "Slash (/)", value: "/" },
          { label: "Greater Than (>)", value: ">" },
        ],
      },
      {
        name: "theme",
        label: "Container Theme",
        type: "select",
        options: [
          { label: "Dark Background", value: "dark" },
          { label: "Card Forth", value: "forth" },
        ],
      },
    ],
    renderPreview: (values, helpers) => previews.breadcrumb?.(values, helpers),
    getCode: (values) => {
      const showIcon = values.showIcon === true || values.showIcon === "true";
      return `<Breadcrumb\n  separator="${values.separator || "ChevronRight"}"\n  showIcon={${showIcon}}\n  color="${values.theme === "dark" ? "white" : "dark"}"\n  items={[\n    { label: "Workspace", path: "/dashboard"${showIcon ? ', icon: "Home"' : ""} },\n    { label: "Component Library", path: "/components/fields"${showIcon ? ', icon: "Layers"' : ""} },\n    { label: "Common Showcase"${showIcon ? ', icon: "Grid"' : ""} }\n  ]}\n/>`;
    },
  },

  // 5. Pagination
  {
    id: "pagination",
    category: "navigation",
    title: "Pagination Component",
    subtitle:
      "Accessible page navigator with range calculation, jump links, and total item indicators",
    icon: "Grid",
    defaultValues: {
      page: 1,
      totalItems: "95",
      itemsPerPage: "10",
      itemName: "modules",
    },
    fields: [
      {
        name: "itemsPerPage",
        label: "Items Per Page",
        type: "select",
        options: [
          { label: "5 Items", value: "5" },
          { label: "10 Items", value: "10" },
          { label: "20 Items", value: "20" },
        ],
      },
      {
        name: "totalItems",
        label: "Total Items Count",
        type: "select",
        options: [
          { label: "25 Items", value: "25" },
          { label: "50 Items", value: "50" },
          { label: "95 Items", value: "95" },
        ],
      },
      {
        name: "itemName",
        label: "Item Unit Label",
        type: "text",
        placeholder: "e.g. modules",
      },
    ],
    renderPreview: (values, helpers) => previews.pagination?.(values, helpers),
    getCode: (values) =>
      `import Pagination from "src/components/common/Pagination";\n\n<Pagination\n  page={${values.page || 1}}\n  totalItems={${values.totalItems}}\n  itemsPerPage={${values.itemsPerPage}}\n  onPageChange={(page) => setPage(page)}\n  itemName="${values.itemName || "items"}"\n/>`,
  },

  // 6. Modal
  {
    id: "modal",
    category: "overlays",
    title: "Modal Component",
    subtitle:
      "Modal dialogs, CrudModal with form fields, and DeleteModal confirmation with drawer placement",
    icon: "Shield",
    defaultValues: {
      title: "Interactive Modal Dialog",
      size: "md",
      type: "modal",
      placement: "right",
    },
    fields: [
      {
        name: "title",
        label: "Modal Title",
        type: "text",
        placeholder: "Enter title",
      },
      {
        name: "size",
        label: "Dialog Size",
        type: "select",
        options: MODAL_SIZE_OPTIONS,
      },
      {
        name: "type",
        label: "Dialog Type",
        type: "select",
        options: [
          { label: "Modal (Centered)", value: "modal" },
          { label: "Sidebar (Drawer)", value: "sidebar" },
        ],
      },
      {
        name: "placement",
        label: "Drawer Placement",
        type: "select",
        options: [
          { label: "Right Drawer", value: "right" },
          { label: "Left Drawer", value: "left" },
        ],
      },
    ],
    renderPreview: (values, helpers) => previews.modal?.(values, helpers),
    getCode: (values) =>
      `import Modal, { CrudModal, DeleteModal } from "src/components/common/Modal";\n\n// 1. Standard Modal Dialog:\n<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="${values.title}"\n  size="${values.size}"\n  type="${values.type}"\n  placement="${values.placement}"\n  footer={\n    <div className="flex items-center justify-end gap-8">\n      <Button text="Cancel" version="v2" bg="tertiary" color="dark" onClick={() => setIsOpen(false)} />\n      <Button text="Confirm" version="v2" bg="primary" color="white" onClick={handleConfirm} />\n    </div>\n  }\n>\n  <p>Modal body content.</p>\n</Modal>\n\n// 2. Form CrudModal:\n<CrudModal\n  isOpen={isCrudOpen}\n  onClose={() => setIsCrudOpen(false)}\n  title="Create / Edit Record"\n  fields={formFields}\n  onSubmit={(data) => handleSave(data)}\n  size="${values.size}"\n/>\n\n// 3. Delete Confirmation Modal:\n<DeleteModal\n  isOpen={isDeleteOpen}\n  onClose={() => setIsDeleteOpen(false)}\n  onDelete={async () => handleDelete()}\n  title="Delete Confirmation"\n  message="Are you sure you want to delete this item?"\n/>`,
  },

  // 7. Toast
  {
    id: "toast",
    category: "overlays",
    title: "Toast Component",
    subtitle:
      "Visual notification cards with left accent borders, colored circular icons, and floating trigger",
    icon: "Bell",
    defaultValues: {
      type: "success",
      title: "Success",
      message: "Your changes are saved successfully",
    },
    fields: [
      {
        name: "type",
        label: "Toast Alert Type",
        type: "select",
        options: TOAST_TYPE_OPTIONS,
      },
      {
        name: "title",
        label: "Toast Title",
        type: "text",
        placeholder: "e.g. Success",
      },
      {
        name: "message",
        label: "Toast Message",
        type: "text",
        placeholder: "Enter notification message",
      },
    ],
    renderPreview: (values, helpers) => previews.toast?.(values, helpers),
    getCode: (values) =>
      `import Toast, { showToast } from "src/components/common/Toast";\n\n// 1. Inlined React Component:\n<Toast\n  type="${values.type}"\n  title="${values.title || TYPES[values.type]?.title || "Success"}"\n  message="${values.message}"\n  onClose={() => handleClose()}\n/>\n\n// 2. Imperative Floating Notification:\nshowToast({\n  title: "${values.title || TYPES[values.type]?.title || "Success"}",\n  message: "${values.message}",\n  type: "${values.type}",\n});`,
  },

  // 8. Skeleton
  {
    id: "skeleton",
    category: "overlays",
    title: "Skeleton Component",
    subtitle:
      "Placeholder loading states supporting 21 UI layout variants with shimmer and pulse animations",
    icon: "Box",
    defaultValues: {
      variant: "hero",
      theme: "dark",
      animation: "shimmer",
      count: 4,
      height: "500px",
      borderRadius: "6px",
    },
    fields: [
      {
        name: "variant",
        label: "Skeleton Variant",
        type: "select",
        options: SKELETON_VARIANTS,
      },
      {
        name: "theme",
        label: "Skeleton Theme",
        type: "select",
        options: SKELETON_THEMES,
      },
      {
        name: "animation",
        label: "Animation Style",
        type: "select",
        options: SKELETON_ANIMATIONS,
      },
      {
        name: "count",
        label: "Item / Line Count",
        type: "select",
        options: [
          { label: "1 Item", value: 1 },
          { label: "2 Items", value: 2 },
          { label: "3 Items", value: 3 },
          { label: "4 Items", value: 4 },
        ],
      },
    ],
    renderPreview: (values, helpers) => previews.skeleton?.(values, helpers),
    getCode: (values) => {
      const extraProps = [];
      if (
        ["text", "card", "card-grid", "reviews", "hero"].includes(
          values.variant,
        )
      ) {
        extraProps.push(`count={${values.count || 4}}`);
      }
      if (values.variant === "circle") {
        extraProps.push('width="54px"');
        extraProps.push('height="54px"');
      }
      if (values.variant === "rect") {
        extraProps.push(`height="${values.height || "60px"}"`);
        extraProps.push(`borderRadius="${values.borderRadius || "6px"}"`);
      }
      const extraStr = extraProps.length
        ? `\n  ${extraProps.join("\n  ")}`
        : "";
      return `import Skeleton from "src/components/common/Skeleton";\n\n<Skeleton\n  variant="${values.variant}"\n  theme="${values.theme}"\n  animation="${values.animation}"${extraStr}\n  className="w-full"\n/>`;
    },
  },

  // 9. Dropdown
  {
    id: "dropdown",
    category: "overlays",
    title: "Dropdown Component",
    subtitle:
      "Contextual popup menus with alignment, click-outside detection, keyboard shortcuts, and action items",
    icon: "ChevronDown",
    defaultValues: {
      align: "right",
      minWidth: "200px",
      isLoggedIn: "true",
    },
    fields: [
      {
        name: "align",
        label: "Menu Alignment",
        type: "select",
        options: DROPDOWN_ALIGN_OPTIONS,
      },
      {
        name: "minWidth",
        label: "Minimum Width",
        type: "select",
        options: DROPDOWN_WIDTH_OPTIONS,
      },
      {
        name: "isLoggedIn",
        label: "User Session State",
        type: "select",
        options: [
          { label: "Logged In (Admin)", value: "true" },
          { label: "Guest Mode", value: "false" },
        ],
      },
    ],
    renderPreview: (values, helpers) => previews.dropdown?.(values, helpers),
    getCode: (values) =>
      `import Dropdown from "src/components/common/Dropdown";\n\nconst [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);\n\n<div\n  className="relative"\n  onMouseEnter={() => setIsUserDropdownOpen(true)}\n  onMouseLeave={() => setIsUserDropdownOpen(false)}\n>\n  <div\n    className="border-tertiary rounded-5 bg-white p-8 flex items-center justify-center cursor-pointer text-gray hover-text-dark"\n    onClick={() => setIsUserDropdownOpen((prev) => !prev)}\n  >\n    <Icon name="Users" width="14" height="14" stroke="${values.isLoggedIn === "true" ? "#f25c2b" : "currentColor"}" strokeWidth="2.5" />\n  </div>\n\n  {isUserDropdownOpen && (\n    <Dropdown\n      isOpen={isUserDropdownOpen}\n      onClose={() => setIsUserDropdownOpen(false)}\n      align="${values.align || "right"}"\n      minWidth="${values.minWidth || "200px"}"\n      className="b-shadow rounded-5"\n    >\n      <div className="p-12 bordb flex items-center gap-12">\n        <div\n          className="rounded-full bg-light-primary text-primary flex items-center justify-center font-600"\n          style={{ width: 32, height: 32, backgroundColor: "#eff6ff" }}\n        >\n          A\n        </div>\n        <div>\n          <h4 className="font-600 text-dark headmini-text capitalize">Admin User</h4>\n          <p className="text-gray mini-text">admin@example.com</p>\n        </div>\n      </div>\n\n      <div className="p-4">\n        <p className="drop-item rounded-5 mini-text cursor-pointer p-10 flex items-center gap-8 hover-bg-light" onClick={() => navigate("/profile")}>\n          <Icon name="Users" width="14" height="14" />\n          <span>My Profile</span>\n        </p>\n        <p className="drop-item rounded-5 mini-text cursor-pointer p-10 flex items-center gap-8 hover-bg-light text-danger" onClick={handleLogout}>\n          <Icon name="Logout" width="14" height="14" />\n          <span>Logout</span>\n        </p>\n      </div>\n    </Dropdown>\n  )}\n</div>`,
  },

  // 10. Tooltip
  {
    id: "tooltip",
    category: "overlays",
    title: "Tooltip Component",
    subtitle:
      "Hover tooltips supporting 4 directional positions, theme styling, and instant accessibility",
    icon: "Info",
    defaultValues: {
      position: "top",
      theme: "dark",
      text: "Helpful contextual tooltip message",
    },
    fields: [
      {
        name: "position",
        label: "Tooltip Position",
        type: "select",
        options: TOOLTIP_POSITIONS,
      },
      {
        name: "theme",
        label: "Color Theme",
        type: "select",
        options: TOOLTIP_THEMES,
      },
      {
        name: "text",
        label: "Tooltip Text",
        type: "text",
        placeholder: "Helpful contextual tooltip message",
      },
    ],
    renderPreview: (values, helpers) => previews.tooltip?.(values, helpers),
    getCode: (values) =>
      `import Tooltip from "src/components/common/Tooltip";\n\n<Tooltip\n  text="${values.text || "Helpful contextual tooltip message"}"\n  position="${values.position || "top"}"\n  theme="${values.theme || "dark"}"\n>\n  <Button text="Hover Me" icon="Info" />\n</Tooltip>`,
  },

  // 11. Avatar
  {
    id: "avatar",
    category: "display",
    title: "Avatar Component",
    subtitle:
      "Circular profile images with initials fallback, status indicators, custom borders, and avatar group stacks",
    icon: "Users",
    defaultValues: {
      mode: "single",
      size: "48",
      shape: "circle",
      status: "online",
      borderWidth: "2",
      borderColor: "#1e74db",
      badgeText: "+5",
      imgSrc: "sobo",
      alt: "John Doe",
    },
    fields: [
      {
        name: "mode",
        label: "Display Mode",
        type: "select",
        options: [
          { label: "Single Avatar", value: "single" },
          { label: "Avatar Group Stack", value: "group" },
        ],
      },
      {
        name: "size",
        label: "Avatar Size",
        type: "select",
        options: [
          { label: "32px (Mini)", value: "32" },
          { label: "42px (Small)", value: "42" },
          { label: "48px (Medium)", value: "48" },
          { label: "56px (Large)", value: "56" },
          { label: "64px (X-Large)", value: "64" },
        ],
      },
      {
        name: "shape",
        label: "Avatar Shape",
        type: "select",
        options: [
          { label: "Circle", value: "circle" },
          { label: "Rounded", value: "rounded" },
          { label: "Square", value: "square" },
        ],
      },
      {
        name: "status",
        label: "Status Dot",
        type: "select",
        options: [
          { label: "Online (Green)", value: "online" },
          { label: "Busy (Red)", value: "busy" },
          { label: "Away (Amber)", value: "away" },
          { label: "Offline (Gray)", value: "offline" },
          { label: "None", value: "none" },
        ],
      },
      {
        name: "borderWidth",
        label: "Border Width",
        type: "select",
        options: [
          { label: "0px (None)", value: "0" },
          { label: "1px", value: "1" },
          { label: "2px", value: "2" },
          { label: "3px", value: "3" },
          { label: "4px", value: "4" },
        ],
      },
      {
        name: "borderColor",
        label: "Border Color",
        type: "select",
        options: [
          { label: "Primary Blue (#1e74db)", value: "#1e74db" },
          { label: "Success Green (#10b981)", value: "#10b981" },
          { label: "Warning Amber (#f59e0b)", value: "#f59e0b" },
          { label: "Dark Slate (#0f1623)", value: "#0f1623" },
          { label: "Pink (#ec4899)", value: "#ec4899" },
        ],
      },
      {
        name: "badgeText",
        label: "Group Badge Text",
        type: "select",
        options: [
          { label: "+3", value: "+3" },
          { label: "+5", value: "+5" },
          { label: "+12", value: "+12" },
          { label: "1M", value: "1M" },
        ],
      },
      {
        name: "imgSrc",
        label: "Image Asset",
        type: "select",
        options: [
          { label: "Sobo Logo", value: "sobo" },
          { label: "Dashboard Graphic", value: "dash" },
          { label: "Hero Graphic", value: "hero" },
          { label: "Initials Fallback", value: "initials" },
        ],
      },
      {
        name: "alt",
        label: "Alt / Name Label",
        type: "text",
        placeholder: "e.g. John Doe",
      },
    ],
    renderPreview: (values, helpers) => previews.avatar?.(values, helpers),
    getCode: (values) => {
      if (values.mode === "group") {
        return `<AvatarGroup\n  avatars={[img1, img2, img3]}\n  badgeText="${values.badgeText}"\n  size={${values.size}}\n  overlap={10}\n/>`;
      }
      const shapeProp =
        values.shape && values.shape !== "circle"
          ? `\n  shape="${values.shape}"`
          : "";
      const statusProp =
        values.status && values.status !== "none"
          ? `\n  status="${values.status}"`
          : "";
      const srcVal = values.imgSrc === "initials" ? `""` : `profileImg`;
      return `<Avatar\n  src={${srcVal}}\n  alt="${values.alt || "John Doe"}"\n  size={${values.size}}\n  borderWidth={${values.borderWidth}}\n  borderColor="${values.borderColor}"${shapeProp}${statusProp}\n/>`;
    },
  },

  // 12. Accordion
  {
    id: "accordion",
    category: "display",
    title: "Accordion Component",
    subtitle:
      "Smooth expandable content panels with single or multiple simultaneous expansion and 2 display versions",
    icon: "File",
    defaultValues: {
      version: "v1",
      allowMultiple: false,
    },
    fields: [
      {
        name: "version",
        label: "Accordion Version",
        type: "select",
        options: [
          { label: "v1 (Numbered Circle)", value: "v1" },
          { label: "v2 (Clean / No Number)", value: "v2" },
        ],
      },
      {
        name: "allowMultiple",
        label: "Accordion Multi-Open",
        type: "select",
        options: BOOLEAN_OPTIONS,
      },
    ],
    renderPreview: (values, helpers) => previews.accordion?.(values, helpers),
    getCode: (values) =>
      `<Accordion\n  version="${values.version || "v1"}"\n  allowMultiple={${Boolean(values.allowMultiple)}}\n  items={[\n    { title: "First FAQ Question", content: <div>Details content or custom node</div> },\n    { title: "Second FAQ Question", content: <div>Second answer content</div> },\n    { title: "Third FAQ Question", content: <div>Third panel details</div> }\n  ]}\n/>`,
  },

  // 13. Badge & Tag
  {
    id: "badge",
    category: "display",
    title: "Badge & Tag Component",
    subtitle:
      "Versatile semantic badges, pills, status dots, and tag lists with automatic color mapping",
    icon: "Layers",
    defaultValues: {
      mode: "single",
      text: "Active Member",
      color: "success",
      variant: "filled",
      shape: "pill",
      size: "md",
      icon: "Check",
      removable: false,
    },
    fields: [
      {
        name: "mode",
        label: "Display Mode",
        type: "select",
        options: BADGE_MODE_OPTIONS,
      },
      {
        name: "text",
        label: "Badge Text / Tags (CSV for list)",
        type: "text",
        placeholder: "e.g. Active Member or React, Vite, Tailwind",
      },
      {
        name: "color",
        label: "Color / Theme Preset",
        type: "select",
        options: BADGE_COLOR_OPTIONS,
      },
      {
        name: "variant",
        label: "Variant Style",
        type: "select",
        options: BADGE_VARIANT_OPTIONS,
      },
      {
        name: "shape",
        label: "Badge Shape",
        type: "select",
        options: BADGE_SHAPE_OPTIONS,
      },
      {
        name: "size",
        label: "Badge Size",
        type: "select",
        options: BADGE_SIZE_OPTIONS,
      },
      {
        name: "icon",
        label: "Icon Prefix",
        type: "select",
        options: BADGE_ICON_OPTIONS,
      },
      {
        name: "removable",
        label: "Removable (Show X)",
        type: "select",
        options: BOOLEAN_OPTIONS,
      },
    ],
    renderPreview: (values, helpers) => previews.badge?.(values, helpers),
    getCode: (values) => {
      if (values.mode === "list") {
        const tags = values.text
          ? values.text.split(",").map((s) => s.trim()).filter(Boolean)
          : ["Frontend", "Performance", "React 19"];
        return `import { BadgeList } from "src/components/common/Badge";\n\n<BadgeList\n  items={${JSON.stringify(tags)}}\n  color="${values.color || "primary"}"\n  shape="${values.shape || "rounded"}"\n  size="${values.size || "md"}"\n/>`;
      }
      const iconProp = values.icon ? `\n  icon="${values.icon}"` : "";
      const varProp = values.variant && values.variant !== "filled" ? `\n  variant="${values.variant}"` : "";
      const shapeProp = values.shape && values.shape !== "pill" ? `\n  shape="${values.shape}"` : "";
      const sizeProp = values.size && values.size !== "md" ? `\n  size="${values.size}"` : "";
      const remProp = (values.removable === true || values.removable === "true") ? `\n  onRemove={() => handleRemove()}` : "";
      return `import Badge from "src/components/common/Badge";\n\n<Badge\n  text="${values.text || "Active Member"}"\n  color="${values.color || "primary"}"${varProp}${shapeProp}${sizeProp}${iconProp}${remProp}\n/>`;
    },
  },

  // 13. Magnify
  {
    id: "magnify",
    category: "display",
    title: "Magnify / Image Zoom Component",
    subtitle:
      "Interactive image magnification with hover zoom, configurable scale factor, and flexible flyout or inside lens positioning",
    icon: "Search",
    defaultValues: {
      imgSrc: "dash",
      zoomPosition: "right",
      zoomScale: "2.5",
      zoomSize: "300",
      objectFit: "cover",
    },
    fields: [
      {
        name: "imgSrc",
        label: "Image Source",
        type: "select",
        options: MAGNIFY_IMG_OPTIONS,
      },
      {
        name: "zoomPosition",
        label: "Zoom Position",
        type: "select",
        options: MAGNIFY_POSITION_OPTIONS,
      },
      {
        name: "zoomScale",
        label: "Magnification Scale",
        type: "select",
        options: MAGNIFY_SCALE_OPTIONS,
      },
      {
        name: "zoomSize",
        label: "Zoom Window Size",
        type: "select",
        options: MAGNIFY_SIZE_OPTIONS,
      },
      {
        name: "objectFit",
        label: "Object Fit",
        type: "select",
        options: [
          { label: "Cover", value: "cover" },
          { label: "Contain", value: "contain" },
        ],
      },
    ],
    renderPreview: (values, helpers) => previews.magnify?.(values, helpers),
    getCode: (values) => {
      const imgVar =
        values.imgSrc === "hero"
          ? "heroImg"
          : values.imgSrc === "sobo"
            ? "soboLogo"
            : "dashImg";
      return `import Magnify from "src/components/common/Magnify";\nimport ${imgVar} from "src/assets/${imgVar}.png";\n\n<Magnify\n  src={${imgVar}}\n  alt="Product Visual"\n  width="260px"\n  height="200px"\n  zoomWidth={${values.zoomSize || 300}}\n  zoomHeight={${values.zoomSize || 300}}\n  zoomScale={${values.zoomScale || 2.5}}\n  zoomPosition="${values.zoomPosition || "right"}"\n  objectFit="${values.objectFit || "cover"}"\n  borderRadius="8px"\n/>`;
    },
  },

  // 14. Table
  {
    id: "table",
    category: "tables",
    title: "Table Component",
    subtitle:
      "Full-featured data grid demonstration with search query, responsive columns, and pagination",
    icon: "Grid",
    defaultValues: {
      title: "Common UI Inventory",
      searchPlaceholder: "Search members, roles, skills...",
    },
    fields: [
      {
        name: "title",
        label: "Table Title",
        type: "text",
        placeholder: "Enter table title",
      },
      {
        name: "searchPlaceholder",
        label: "Search Placeholder",
        type: "text",
        placeholder: "Search members, roles, skills...",
      },
    ],
    renderPreview: (values, helpers) => previews.table?.(values, helpers),
    getCode: (values) =>
      `<Table\n  title="${values?.title || "Common UI Inventory"}"\n  subtitle="Enterprise directory with live search, selection, expand/collapse details, and pagination"\n  data={paginatedData}\n  columns={columns}\n  totalItems={data.length}\n  itemsPerPage={5}\n  page={page}\n  onPageChange={setPage}\n  searchQuery={searchQuery}\n  onSearchChange={setSearchQuery}\n  searchPlaceholder="${values?.searchPlaceholder || "Search members, roles, skills..."}"\n  itemName="records"\n  collapsible={true}\n  minWidth="1050px"\n  onView={(row) => console.log("view", row)}\n  onEdit={(row) => console.log("edit", row)}\n  onDelete={(row) => console.log("delete", row)}\n/>`,
  },

  // 15. Icon Library
  {
    id: "icon",
    category: "icons",
    title: "Icon Component & Full Icon Library",
    subtitle: `Complete SVG vector icon system with ${ALL_ICONS.length} built-in icons, customizable size, stroke width, and colors. Click any icon to copy its JSX snippet.`,
    icon: "Sparkles",
    defaultValues: {
      size: "24",
      strokeWidth: "2",
      color: "#1e74db",
      search: "",
    },
    fields: [
      {
        name: "size",
        label: "Icon Display Size",
        type: "select",
        options: ICON_SIZE_OPTIONS,
      },
      {
        name: "strokeWidth",
        label: "Stroke Width",
        type: "select",
        options: ICON_STROKE_OPTIONS,
      },
      {
        name: "color",
        label: "Icon Color",
        type: "select",
        options: ICON_COLOR_OPTIONS,
      },
      {
        name: "search",
        label: "Filter By Name",
        type: "text",
        placeholder: "e.g. arrow, user, search...",
      },
    ],
    renderPreview: (values, helpers) => previews.icon?.(values, helpers),
    getCode: (values) =>
      `import Icon, { ALL_ICONS } from "src/components/common/Icon";\n\n// Basic Usage\n<Icon\n  name="Sparkles"\n  width="${values?.size || "24"}"\n  height="${values?.size || "24"}"\n  stroke="${values?.color || "#1e74db"}"\n  strokeWidth="${values?.strokeWidth || "2"}"\n/>\n\n// Total Available Icons: ${ALL_ICONS.length}\n// Access all icon names programmatically: ALL_ICONS`,
  },
];
