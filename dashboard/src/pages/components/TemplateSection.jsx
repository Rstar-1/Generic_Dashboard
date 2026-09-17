import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";

// 🧩 Components from common folder
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Breadcrumb from "../../components/common/Breadcrumb";
import Steps from "../../components/common/Steps";
import Avatar, { AvatarGroup } from "../../components/common/Avatar";
import Modal, { CrudModal, DeleteModal, MODAL_WIDTHS } from "../../components/common/Modal";
import Skeleton, { SKELETON_VARIANTS, SKELETON_THEMES, SKELETON_ANIMATIONS } from "../../components/common/Skeleton";
import Accordion from "../../components/common/Accordion";
import Tab from "../../components/common/Tab";
import Pagination from "../../components/common/Pagination";
import Table from "../../components/common/Table";
import Image from "../../components/common/Image";
import Toast, { showToast, TYPES } from "../../components/common/Toast";
import Dropdown from "../../components/common/Dropdown";
import Tooltip, { TOOLTIP_POSITIONS, TOOLTIP_THEMES } from "../../components/common/Tooltip";
import Fields from "../../components/forms/Fields";

// 🖼️ Asset references
import dashImg from "../../assets/dashimg.png";
import soboLogo from "../../assets/sobo_logo.webp";
import heroImg from "../../assets/hero.png";

// Sidebar categories
const SIDEBAR_ITEMS = [
    { name: "All Components", icon: "Grid", count: 13, color: "#1e74db" },
    { name: "Buttons & Actions", icon: "Edit", count: 1, color: "#10b981" },
    { name: "Navigation & Tabs", icon: "Layers", count: 4, color: "#3b82f6" },
    { name: "Feedback & Overlays", icon: "Check", count: 5, color: "#f59e0b" },
    { name: "Data Display", icon: "Users", count: 2, color: "#8b5cf6" },
    { name: "Data Tables", icon: "Dashboard", count: 1, color: "#ec4899" },
];

const TABS = [
    { name: "All Components", value: "all" }
];

const SIDEBAR_TO_TAB = {
    "All Components": "all",
    "Buttons & Actions": "actions",
    "Navigation & Tabs": "navigation",
    "Feedback & Overlays": "overlays",
    "Data Display": "display",
    "Data Tables": "tables",
};

// Common Options
const BUTTON_VERSION_OPTIONS = [
    { label: "v0 (Mini)", value: "v0" },
    { label: "v1 (Default)", value: "v1" },
    { label: "v2 (Compact/Pill)", value: "v2" },
    { label: "v3 (Full Width)", value: "v3" },
    { label: "icon (Icon)", value: "icon" },
    { label: "none (Unstyled)", value: "none" },
];

const BUTTON_BG_OPTIONS = [
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

const BUTTON_COLOR_OPTIONS = [
    { label: "White", value: "white" },
    { label: "Dark", value: "dark" },
    { label: "Gray", value: "gray" },
    { label: "Primary", value: "primary" },
    { label: "Secondary", value: "secondary" },
];

const BUTTON_BORDER_OPTIONS = [
    { label: "None", value: "" },
    { label: "Primary", value: "primary" },
    { label: "Secondary", value: "secondary" },
    { label: "Tertiary", value: "tertiary" },
    { label: "Dark", value: "dark" },
];

const BUTTON_ICON_OPTIONS = [
    { label: "None", value: "" },
    { label: "Plus", value: "Plus" },
    { label: "Check", value: "Check" },
    { label: "Trash", value: "Trash" },
    { label: "Download", value: "Download" },
    { label: "Settings", value: "Settings" },
    { label: "Copy", value: "Copy" },
    { label: "Rotate", value: "Rotate" },
    { label: "Heart", value: "Heart" },
    { label: "Edit", value: "Edit" },
];

const BOOLEAN_OPTIONS = [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
];

const TOAST_TYPE_OPTIONS = Object.keys(TYPES || {}).map((key) => ({
    label: TYPES[key].title,
    value: key,
}));

const STEPS_VERSION_OPTIONS = [
    { label: "Version 1", value: "v1" },
    { label: "Version 2", value: "v2" },
];

const MODAL_SIZE_OPTIONS = Object.keys(MODAL_WIDTHS || {}).map((key) => ({
    label: `${key.toUpperCase()} (${MODAL_WIDTHS[key]})`,
    value: key,
}));

const DROPDOWN_ALIGN_OPTIONS = [
    { label: "Left Aligned", value: "left" },
    { label: "Right Aligned", value: "right" },
    { label: "Centered", value: "center" },
    { label: "Full Width", value: "full" },
];

const DROPDOWN_WIDTH_OPTIONS = [
    { label: "180px", value: "180px" },
    { label: "210px (Default)", value: "210px" },
    { label: "250px", value: "250px" },
    { label: "300px", value: "300px" },
];

// Sample static data for components
const STEP_LABELS = ["Define Project", "Configure Theme", "Import Components", "Final Launch"];
const BREADCRUMB_ITEMS = [
    { label: "Workspace", path: "/dashboard", icon: "Home" },
    { label: "Component Library", path: "/components/fields", icon: "Layers" },
    { label: "Common Showcase", icon: "Grid" },
];
const ACCORDION_ITEMS = [
    {
        title: "How does generic dashboard state management work?",
        content: "State is decoupled using localized React hooks with React.memo, useCallback, and useMemo guards to prevent unnecessary tree re-renders across high-frequency interactions.",
    },
    {
        title: "Can Accordion items allow multiple simultaneous expansions?",
        content: "Yes! By passing the allowMultiple={true} prop to Accordion, users can open as many collapse panels as needed simultaneously.",
    }
];
const SAMPLE_COLUMNS = [
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

const SAMPLE_DATA = [
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
        notes: "Principal architect driving multi-region Kubernetes migration and zero-trust security.",
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
        notes: "Lead frontend engineer maintaining design system components and accessibility standards.",
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
        notes: "Senior visual designer leading component tokens, glassmorphic themes, and user journeys.",
    },
    {
        id: "USR-004",
        name: "Marcus Vance",
        email: "m.vance@enterprise.org",
        avatar: soboLogo,
        role: "Manager",
        category: "Management",
        tags: ["Agile", "Scrum", "Roadmap"],
        status: "Active",
        score: 89,
        createdAt: "2026-03-01",
        department: "Operations",
        phone: "+1 (555) 678-1234",
        location: "Austin, TX",
        notes: "Product manager coordinating cross-functional releases across web and mobile platforms.",
    },
    {
        id: "USR-005",
        name: "Liam Chen",
        email: "liam.chen@cloudbase.net",
        avatar: dashImg,
        role: "DevOps",
        category: "Infrastructure",
        tags: ["Terraform", "AWS", "Docker"],
        status: "Active",
        score: 94,
        createdAt: "2026-03-12",
        department: "DevOps",
        phone: "+1 (555) 890-4321",
        location: "Vancouver, CA",
        notes: "Site reliability engineer automating deployment pipelines and container orchestration.",
    },
    {
        id: "USR-006",
        name: "Chloe Dubois",
        email: "chloe.d@luxetech.fr",
        avatar: heroImg,
        role: "Analyst",
        category: "Analytics",
        tags: ["Python", "SQL", "Tableau"],
        status: "Active",
        score: 84,
        createdAt: "2026-03-22",
        department: "Data Science",
        phone: "+33 1 42 68 55 00",
        location: "Paris, FR",
        notes: "Data analyst building real-time dashboard telemetry and customer retention models.",
    },
    {
        id: "USR-007",
        name: "David Kim",
        email: "david.kim@seoultech.kr",
        avatar: soboLogo,
        role: "Engineer",
        category: "Development",
        tags: ["Go", "gRPC", "Microservices"],
        status: "Pending",
        score: 78,
        createdAt: "2026-04-05",
        department: "Backend Eng",
        phone: "+82 2 3456 7890",
        location: "Seoul, KR",
        notes: "Backend specialist implementing low-latency order matching and event streaming.",
    },
    {
        id: "USR-008",
        name: "Sophia Martinez",
        email: "s.martinez@mediahub.es",
        avatar: dashImg,
        role: "Designer",
        category: "Product Design",
        tags: ["Illustrator", "Animations", "UI"],
        status: "Active",
        score: 91,
        createdAt: "2026-04-18",
        department: "UX / UI",
        phone: "+34 91 123 4567",
        location: "Madrid, ES",
        notes: "Creative designer focused on micro-interactions, motion design, and brand consistency.",
    },
    {
        id: "USR-009",
        name: "James Wilson",
        email: "j.wilson@systech.com",
        avatar: heroImg,
        role: "Support",
        category: "Customer Success",
        tags: ["Zendesk", "Jira", "Relations"],
        status: "Active",
        score: 87,
        createdAt: "2026-05-02",
        department: "Support",
        phone: "+1 (555) 321-9876",
        location: "Chicago, IL",
        notes: "Customer success manager delivering top-tier enterprise onboarding and issue resolution.",
    },
    {
        id: "USR-010",
        name: "Amina Al-Mansoor",
        email: "amina.m@gulftech.ae",
        avatar: soboLogo,
        role: "Admin",
        category: "Leadership",
        tags: ["Strategy", "Executive", "FinOps"],
        status: "Active",
        score: 99,
        createdAt: "2026-05-14",
        department: "Executive",
        phone: "+971 4 321 0000",
        location: "Dubai, UAE",
        notes: "Executive VP overseeing technology investment, strategic alliances, and expansion.",
    },
    {
        id: "USR-011",
        name: "Lucas Meyer",
        email: "lucas.meyer@berlinsoft.de",
        avatar: dashImg,
        role: "Engineer",
        category: "Development",
        tags: ["Rust", "Wasm", "Performance"],
        status: "Active",
        score: 96,
        createdAt: "2026-05-28",
        department: "Core Platform",
        phone: "+49 30 123456",
        location: "Berlin, DE",
        notes: "Systems engineer porting computationally intensive rendering algorithms to WebAssembly.",
    },
    {
        id: "USR-012",
        name: "Olivia Taylor",
        email: "olivia.t@creativepulse.com",
        avatar: heroImg,
        role: "Marketing",
        category: "Growth",
        tags: ["SEO", "Content", "Growth"],
        status: "Pending",
        score: 72,
        createdAt: "2026-06-08",
        department: "Growth",
        phone: "+1 (555) 789-0123",
        location: "New York, NY",
        notes: "Growth marketer scaling developer community awareness and product tutorials.",
    },
    {
        id: "USR-013",
        name: "Vikram Patel",
        email: "vikram.p@indiatrends.in",
        avatar: soboLogo,
        role: "Engineer",
        category: "Development",
        tags: ["Node.js", "GraphQL", "MongoDB"],
        status: "Active",
        score: 93,
        createdAt: "2026-06-19",
        department: "Backend Eng",
        phone: "+91 22 2345 6789",
        location: "Mumbai, IN",
        notes: "Senior backend developer building resilient GraphQL APIs and cached microservices.",
    },
    {
        id: "USR-014",
        name: "Emma Watson",
        email: "emma.w@oxfordlabs.co.uk",
        avatar: dashImg,
        role: "Analyst",
        category: "Analytics",
        tags: ["Data Viz", "PowerBI", "R"],
        status: "Active",
        score: 86,
        createdAt: "2026-07-01",
        department: "Data Science",
        phone: "+44 1865 234567",
        location: "Oxford, UK",
        notes: "Business intelligence analyst tracking real-time KPI metrics and usage anomalies.",
    },
    {
        id: "USR-015",
        name: "Noah Becker",
        email: "noah.b@munichauto.de",
        avatar: heroImg,
        role: "DevOps",
        category: "Infrastructure",
        tags: ["Ansible", "Linux", "CI/CD"],
        status: "Inactive",
        score: 65,
        createdAt: "2026-07-15",
        department: "DevOps",
        phone: "+49 89 987654",
        location: "Munich, DE",
        notes: "Infrastructure engineer managing automated server provisioning and security patching.",
    },
    {
        id: "USR-016",
        name: "Mia Takahashi",
        email: "mia.t@tokyonext.jp",
        avatar: soboLogo,
        role: "Designer",
        category: "Product Design",
        tags: ["Design System", "Tokens", "Mobile"],
        status: "Active",
        score: 95,
        createdAt: "2026-07-29",
        department: "UX / UI",
        phone: "+81 3 5555 0123",
        location: "Tokyo, JP",
        notes: "Lead product designer focusing on internationalization and mobile adaptive components.",
    },
    {
        id: "USR-017",
        name: "Ethan Wright",
        email: "ethan.w@austintech.io",
        avatar: dashImg,
        role: "QA",
        category: "Quality Assurance",
        tags: ["Playwright", "Cypress", "Jest"],
        status: "Active",
        score: 90,
        createdAt: "2026-08-11",
        department: "QA / Testing",
        phone: "+1 (555) 654-3210",
        location: "Austin, TX",
        notes: "Automation test engineer managing end-to-end regression suites and CI test gates.",
    },
    {
        id: "USR-018",
        name: "Zara Larsson",
        email: "zara.l@nordiccloud.se",
        avatar: heroImg,
        role: "Security",
        category: "Security",
        tags: ["PenTesting", "IAM", "SOC2"],
        status: "Active",
        score: 97,
        createdAt: "2026-08-20",
        department: "SecOps",
        phone: "+46 8 123 4567",
        location: "Stockholm, SE",
        notes: "Information security lead overseeing compliance certifications, audits, and pen testing.",
    },
    {
        id: "USR-019",
        name: "Benjamin Scott",
        email: "ben.scott@melbournedev.au",
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
        notes: "Full-stack developer implementing client portals and responsive table views.",
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
        notes: "Technical program manager delivering multi-tenant cloud dashboard infrastructure.",
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
        notes: "Customer support specialist resolving integration questions and database queries.",
    },
];

// Section Card Wrapper
const SectionCard = memo(({ title, subtitle, icon, count, children }) => (
    <div className="bg-white rounded-5 p-16 mb-14">
        <div className="flex items-center justify-between bordb pb-10">
            <div className="flex items-center gap-5">
                <div className="bg-forth icon-lg rounded-5">
                    <Icon name={icon} width="18" height="18" stroke="var(--primary)" strokeWidth="2" />
                </div>
                <div>
                    <h3 className="headmini-text font-600 text-dark">{title}</h3>
                    {subtitle && <p className="mini-text text-gray">{subtitle}</p>}
                </div>
            </div>
            {count !== undefined && (
                <p className="mini-text font-500 px-14 py-7 rounded-30 bg-light-primary text-primary">
                    {count} UI Items
                </p>
            )}
        </div>
        <div className="pt-14">
            {children}
        </div>
    </div>
));
SectionCard.displayName = "SectionCard";

// Reusable Component Configurator Grid
export const ControlFieldsGrid = memo(({ fields, values, onChange, className = "w-full grid-cols-4 gap-12" }) => (
    <div className={className}>
        {fields.map((field) => (
            <Fields
                key={field.name}
                type={field.type || "select"}
                label={field.label}
                options={field.options}
                placeholder={field.placeholder}
                value={field.type === "select" && typeof values[field.name] === "boolean" ? String(values[field.name]) : values[field.name] ?? ""}
                onChange={(val) => {
                    const parsedVal = field.options && (val === "true" || val === "false") ? val === "true" : val;
                    onChange(field.name, parsedVal);
                }}
            />
        ))}
    </div>
));
ControlFieldsGrid.displayName = "ControlFieldsGrid";

// Reusable Code Preview & Copy Modal
export const ComponentCodeModal = memo(({ isOpen, onClose, title, code, onCopy }) => {
    if (!isOpen) return null;
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="md"
            footer={
                <div className="flex items-center gap-12">
                    <Button
                        text="Close"
                        version="v2"
                        bg="tertiary"
                        color="dark"
                        onClick={onClose}
                        className="font-500"
                    />
                    <Button
                        text="Copy Code"
                        version="v2"
                        bg="primary"
                        color="white"
                        onClick={onCopy}
                        className="font-500"
                    />
                </div>
            }
        >
            <div className="relative bg-dark px-16 py-2 rounded-5">
                <pre className="mini-text text-white" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    <code>{code}</code>
                </pre>
            </div>
        </Modal>
    );
});
ComponentCodeModal.displayName = "ComponentCodeModal";

// Interactive Modal Demo Preview Helper
const ModalDemoPreview = memo(({ values }) => {
    const [activeModal, setActiveModal] = useState(null);

    const sampleCrudFields = useMemo(
        () => [
            { name: "title", label: "Task / Module Title", type: "text", placeholder: "e.g. Navigation Refactor", required: true },
            { name: "category", label: "Category", type: "select", options: [{ label: "Action", value: "action" }, { label: "Overlay", value: "overlay" }, { label: "Navigation", value: "navigation" }] },
            { name: "status", label: "Status Flag", type: "select", options: [{ label: "Active", value: "active" }, { label: "Pending", value: "pending" }] },
        ],
        []
    );

    const handleDelete = useCallback(
        () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    showToast("Item deleted successfully via DeleteModal!", "danger");
                    resolve();
                }, 800);
            }),
        []
    );

    return (
        <div className="flex flex-wrap items-center justify-center gap-12 w-full py-8">
            <Button
                text="Open Standard Modal"
                version="v2"
                bg="primary"
                color="white"
                icon="Layers"
                onClick={() => setActiveModal("standard")}
            />
            <Button
                text="Open CrudModal"
                version="v2"
                bg="secondary"
                color="white"
                icon="Edit"
                onClick={() => setActiveModal("crud")}
            />
            <Button
                text="Open DeleteModal"
                version="v2"
                bg="danger"
                color="white"
                icon="Trash"
                onClick={() => setActiveModal("delete")}
            />

            {/* 1. Standard Modal */}
            {activeModal === "standard" && (
                <Modal
                    isOpen={true}
                    onClose={() => setActiveModal(null)}
                    title={values.title || "Interactive Modal Dialog"}
                    size={values.size}
                    type={values.type}
                    placement={values.placement}
                    footer={
                        <div className="flex items-center justify-end gap-8 w-full">
                            <Button text="Cancel" version="v2" bg="tertiary" color="dark" onClick={() => setActiveModal(null)} />
                            <Button text="Confirm" version="v2" bg="primary" color="white" onClick={() => { showToast("Modal action confirmed!", "success"); setActiveModal(null); }} />
                        </div>
                    }
                >
                    <div className="py-8">
                        <p className="small-text text-gray mb-12">
                            Standard Modal dialog with accessible backdrop, customizable header, body, and action footer.
                        </p>
                        <div className="p-12 rounded-5 bg-light-primary text-primary mini-text font-500">
                            ✓ Type: {values.type} • Size: {values.size} ({MODAL_WIDTHS[values.size] || values.size}) • Placement: {values.placement}
                        </div>
                    </div>
                </Modal>
            )}

            {/* 2. CrudModal */}
            {activeModal === "crud" && (
                <CrudModal
                    isOpen={true}
                    onClose={() => setActiveModal(null)}
                    title={values.title ? `${values.title} (CRUD)` : "Create / Edit Record"}
                    size={values.size}
                    type={values.type}
                    placement={values.placement}
                    fields={sampleCrudFields}
                    onSubmit={() => {
                        showToast("CrudModal data submitted!", "success");
                        setActiveModal(null);
                    }}
                />
            )}

            {/* 3. DeleteModal */}
            {activeModal === "delete" && (
                <DeleteModal
                    isOpen={true}
                    onClose={() => setActiveModal(null)}
                    onDelete={handleDelete}
                    title="Delete Record Confirmation"
                    message="Are you sure you want to permanently delete this entry? This action cannot be undone."
                />
            )}
        </div>
    );
});
ModalDemoPreview.displayName = "ModalDemoPreview";

// Interactive Dropdown Demo Preview Helper (referenced from Header.jsx)
const DropdownDemoPreview = memo(({ values }) => {
    const [isOpen, setIsOpen] = useState(false);

    const userMenuItems = useMemo(
        () => [
            { label: "My Profile", icon: "Users", className: "" },
            { label: "Logout", icon: "Logout", className: "text-danger" },
        ],
        []
    );

    const guestMenuItems = useMemo(
        () => [
            { label: "Login", icon: "Users", className: "" },
            { label: "Register", icon: "Users", className: "" },
        ],
        []
    );

    const isLoggedIn = values.isLoggedIn !== "false";
    const items = isLoggedIn ? userMenuItems : guestMenuItems;

    return (
        <div className="py-20 h-200">
            <div
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <div
                    className="border-tertiary rounded-5 bg-white p-8 flex items-center justify-center cursor-pointer text-gray hover-text-dark"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <Icon
                        name="Users"
                        width="14"
                        height="14"
                        stroke={isLoggedIn ? "#f25c2b" : "currentColor"}
                        strokeWidth="2.5"
                    />
                </div>

                {isOpen && (
                    <Dropdown
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        align={values.align || "right"}
                        minWidth={values.minWidth || "200px"}
                        className="b-shadow rounded-5"
                    >
                        <div className="p-12 bordb flex items-center gap-12">
                            {isLoggedIn ? (
                                <>
                                    <div
                                        className="rounded-full bg-light-primary text-primary flex items-center justify-center font-600"
                                        style={{ width: 32, height: 32, backgroundColor: "#eff6ff" }}
                                    >
                                        A
                                    </div>
                                    <div>
                                        <h4 className="font-600 text-dark headmini-text capitalize">Admin User</h4>
                                        <p className="text-gray mini-text">admin@example.com</p>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <h4 className="font-600 text-dark headmini-text capitalize">Welcome Guest</h4>
                                    <p className="text-gray mini-text">Manage your account</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            {items.map((item, idx) => (
                                <p
                                    key={idx}
                                    className={`drop-item rounded-5 mini-text cursor-pointer p-10 flex items-center gap-8 hover-bg-light ${item.className || ""}`}
                                    style={{ margin: 0, padding: "8px 10px", fontSize: "12px" }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        showToast(`Action: ${item.label}`, item.className?.includes("danger") ? "danger" : "info");
                                    }}
                                >
                                    {item.icon && <Icon name={item.icon} width="14" height="14" stroke="currentColor" />}
                                    <span>{item.label}</span>
                                </p>
                            ))}
                        </div>
                    </Dropdown>
                )}
            </div>
        </div>
    );
});
DropdownDemoPreview.displayName = "DropdownDemoPreview";

// Interactive Tooltip Demo Preview Helper
const TooltipDemoPreview = memo(({ values }) => {
    return (
        <div className="flex items-center justify-center py-30">
            <Tooltip
                text={values.text || "Tooltip Message"}
                position={values.position || "top"}
                theme={values.theme || "dark"}
            >
                <Button
                    text={`Hover Me (${(values.position || "top").toUpperCase()})`}
                    version="v2"
                    bg="forth"
                    color="dark"
                    border="tertiary"
                    icon="Info"
                />
            </Tooltip>
        </div>
    );
});
TooltipDemoPreview.displayName = "TooltipDemoPreview";

// Interactive Table Grid Preview Helper
const TableLiveGrid = memo(({ values }) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return SAMPLE_DATA;
        return SAMPLE_DATA.filter(
            (item) =>
                item.name?.toLowerCase().includes(q) ||
                item.email?.toLowerCase().includes(q) ||
                item.role?.toLowerCase().includes(q) ||
                item.department?.toLowerCase().includes(q) ||
                (Array.isArray(item.tags) && item.tags.some((t) => t.toLowerCase().includes(q)))
        );
    }, [search]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage);
    }, [filtered, page, itemsPerPage]);

    const handleSearch = useCallback((val) => {
        setSearch(val);
        setPage(1);
    }, []);

    return (
        <div className="w-full bg-white p-16 rounded-5">
            <Table
                title={values?.title || "Common UI Inventory"}
                subtitle="Reusable presentation components and enterprise directory with live search, selection, expand/collapse details, and pagination"
                data={paginatedData}
                columns={SAMPLE_COLUMNS}
                totalItems={filtered.length}
                itemsPerPage={itemsPerPage}
                page={page}
                onPageChange={setPage}
                searchQuery={search}
                onSearchChange={handleSearch}
                searchPlaceholder={values?.searchPlaceholder || "Search members, roles, skills..."}
                itemName="records"
                collapsible={true}
                minWidth="1050px"
                onView={(row) => showToast(`Viewing profile: ${row.name}`, "info")}
                onEdit={(row) => showToast(`Editing record: ${row.name}`, "info")}
                onDelete={(row) => showToast(`Deleted: ${row.name}`, "danger")}
                viewTitle="Inspect Profile"
                editTitle="Edit Record"
                deleteTitle="Delete Record"
            />
        </div>
    );
});
TableLiveGrid.displayName = "TableLiveGrid";

// Master List of Component Showcases mapped in an array
const TEMPLATE_COMPONENTS_DATA = [
    // 1. Button
    {
        id: "button",
        category: "actions",
        title: "Button Component",
        subtitle: "Extensible interactive buttons with semantic colors, outline styles, and icon prefixes",
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
            { name: "text", label: "Label", type: "text", placeholder: "Enter label" },
            { name: "version", label: "Version", type: "select", options: BUTTON_VERSION_OPTIONS },
            { name: "variant", label: "Variant", type: "select", options: [{ label: "Filled", value: "filled" }, { label: "Outline", value: "outline" }] },
            { name: "bg", label: "Background", type: "select", options: BUTTON_BG_OPTIONS },
            { name: "color", label: "Color", type: "select", options: BUTTON_COLOR_OPTIONS },
            { name: "border", label: "Border", type: "select", options: BUTTON_BORDER_OPTIONS },
            { name: "icon", label: "Icon", type: "select", options: BUTTON_ICON_OPTIONS },
            { name: "disabled", label: "Disabled", type: "select", options: [{ label: "Active", value: "false" }, { label: "Disabled", value: "true" }] },
        ],
        renderPreview: (values) => (
            <Button
                version={values.version}
                variant={values.variant}
                text={values.text}
                bg={values.bg}
                color={values.color}
                border={values.border}
                disabled={values.disabled === true || values.disabled === "true"}
                icon={values.icon}
                iconWidth="14"
                iconHeight="14"
                onClick={() => showToast(`${values.text || "Interactive"} button clicked!`, "success")}
            />
        ),
        getCode: (values) => {
            const props = [];
            if (values.text) props.push(`text="${values.text}"`);
            if (values.version) props.push(`version="${values.version}"`);
            if (values.variant && values.variant !== "filled") props.push(`variant="${values.variant}"`);
            if (values.bg) props.push(`bg="${values.bg}"`);
            if (values.color) props.push(`color="${values.color}"`);
            if (values.border) props.push(`border="${values.border}"`);
            if (values.disabled === true || values.disabled === "true") props.push(`disabled={true}`);
            if (values.icon) props.push(`icon="${values.icon}"\n  iconWidth="14"\n  iconHeight="14"`);
            props.push(`onClick={() => console.log("clicked")}`);
            return `<Button\n  ${props.join("\n  ")}\n/>`;
        },
    },

    // 2. Tab
    {
        id: "tab",
        category: "navigation",
        title: "Tab Component",
        subtitle: "Segmented switchers with underline (v1), pill (v2), and minimal (v3) styling",
        icon: "Layers",
        defaultValues: {
            version: "v1",
            activeTab: "all",
            showCount: true,
            showIcon: true,
        },
        fields: [
            { name: "version", label: "Tab Version", type: "select", options: [{ label: "v1 (Underline)", value: "v1" }, { label: "v2 (Pill)", value: "v2" }, { label: "v3 (Minimal)", value: "v3" }] },
            { name: "activeTab", label: "Active Tab", type: "select", options: [{ label: "Active Modules", value: "all" }, { label: "Pending Review", value: "pending" }, { label: "Archived", value: "archived" }] },
            { name: "showCount", label: "Show Count Badge", type: "select", options: BOOLEAN_OPTIONS },
            { name: "showIcon", label: "Show Tab Icon", type: "select", options: BOOLEAN_OPTIONS },
        ],
        renderPreview: (values, { onValueChange }) => {
            const showCount = values.showCount === true || values.showCount === "true";
            const showIcon = values.showIcon === true || values.showIcon === "true";
            const tabs = [
                { name: "Active Modules", value: "all", count: showCount ? 18 : null, icon: showIcon ? "Layers" : null },
                { name: "Pending Review", value: "pending", count: showCount ? 5 : null, icon: showIcon ? "Clock" : null },
                { name: "Archived", value: "archived", count: showCount ? 0 : null, icon: showIcon ? "Box" : null },
            ];
            return (
                <div className="w-full">
                    <Tab
                        tabs={tabs}
                        activeTab={values.activeTab}
                        onChange={(val) => onValueChange("activeTab", val)}
                        version={values.version || "v1"}
                    />
                </div>
            );
        },
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
        renderPreview: (values, { onValueChange }) => (
            <div className="w-full">
                <Steps
                    version={values.version}
                    currentStep={Number(values.currentStep)}
                    steps={STEP_LABELS}
                    onChange={(step) => onValueChange?.("currentStep", String(step))}
                />
            </div>
        ),
        getCode: (values) => (
            `<Steps\n  version="${values.version}"\n  currentStep={${values.currentStep}}\n  steps={["Define Project", "Configure Theme", "Import Components", "Final Launch"]}\n  onChange={(step) => setCurrentStep(step)}\n/>`
        ),
    },

    // 4. Breadcrumb
    {
        id: "breadcrumb",
        category: "navigation",
        title: "Breadcrumb Component",
        subtitle: "Hierarchical wayfinding trail supporting path navigation, custom icons, and route syncing",
        icon: "Layers",
        defaultValues: {
            showIcon: true,
            separator: "ChevronRight",
            theme: "dark",
        },
        fields: [
            { name: "showIcon", label: "Show Item Icons", type: "select", options: BOOLEAN_OPTIONS },
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
        renderPreview: (values) => {
            const isDark = values.theme === "dark";
            return (
                <div
                    className="w-full p-16 rounded-5 flex items-center"
                    style={{ background: isDark ? "#0f172a" : "var(--forth)" }}
                >
                    <Breadcrumb
                        items={BREADCRUMB_ITEMS}
                        showIcon={values.showIcon === true || values.showIcon === "true"}
                        separator={values.separator || "ChevronRight"}
                        color={isDark ? "white" : "dark"}
                    />
                </div>
            );
        },
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
        subtitle: "Accessible page navigator with range calculation, jump links, and total item indicators",
        icon: "Grid",
        defaultValues: {
            page: 1,
            totalItems: "95",
            itemsPerPage: "10",
            itemName: "modules",
        },
        fields: [
            { name: "itemsPerPage", label: "Items Per Page", type: "select", options: [{ label: "5 Items", value: "5" }, { label: "10 Items", value: "10" }, { label: "20 Items", value: "20" }] },
            { name: "totalItems", label: "Total Items Count", type: "select", options: [{ label: "25 Items", value: "25" }, { label: "50 Items", value: "50" }, { label: "95 Items", value: "95" }] },
            { name: "itemName", label: "Item Unit Label", type: "text", placeholder: "e.g. modules" },
        ],
        renderPreview: (values, { onValueChange }) => (
            <div className="w-full flex justify-center">
                <Pagination
                    page={Number(values.page) || 1}
                    totalItems={Number(values.totalItems) || 95}
                    itemsPerPage={Number(values.itemsPerPage) || 10}
                    onPageChange={(p) => onValueChange("page", p)}
                    itemName={values.itemName || "items"}
                />
            </div>
        ),
        getCode: (values) => (
            `import Pagination from "src/components/common/Pagination";\n\n<Pagination\n  page={${values.page || 1}}\n  totalItems={${values.totalItems}}\n  itemsPerPage={${values.itemsPerPage}}\n  onPageChange={(page) => setPage(page)}\n  itemName="${values.itemName || "items"}"\n/>`
        ),
    },

    // 6. Modal
    {
        id: "modal",
        category: "overlays",
        title: "Modal Component",
        subtitle: "Modal dialogs, CrudModal with form fields, and DeleteModal confirmation with drawer placement",
        icon: "Shield",
        defaultValues: {
            title: "Interactive Modal Dialog",
            size: "md",
            type: "modal",
            placement: "right",
        },
        fields: [
            { name: "title", label: "Modal Title", type: "text", placeholder: "Enter title" },
            { name: "size", label: "Dialog Size", type: "select", options: MODAL_SIZE_OPTIONS },
            { name: "type", label: "Dialog Type", type: "select", options: [{ label: "Modal (Centered)", value: "modal" }, { label: "Sidebar (Drawer)", value: "sidebar" }] },
            { name: "placement", label: "Drawer Placement", type: "select", options: [{ label: "Right Drawer", value: "right" }, { label: "Left Drawer", value: "left" }] },
        ],
        renderPreview: (values) => <ModalDemoPreview values={values} />,
        getCode: (values) => (
            `import Modal, { CrudModal, DeleteModal } from "src/components/common/Modal";\n\n// 1. Standard Modal Dialog:\n<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="${values.title}"\n  size="${values.size}"\n  type="${values.type}"\n  placement="${values.placement}"\n  footer={\n    <div className="flex items-center justify-end gap-8">\n      <Button text="Cancel" version="v2" bg="tertiary" color="dark" onClick={() => setIsOpen(false)} />\n      <Button text="Confirm" version="v2" bg="primary" color="white" onClick={handleConfirm} />\n    </div>\n  }\n>\n  <p>Modal body content.</p>\n</Modal>\n\n// 2. Form CrudModal:\n<CrudModal\n  isOpen={isCrudOpen}\n  onClose={() => setIsCrudOpen(false)}\n  title="Create / Edit Record"\n  fields={formFields}\n  onSubmit={(data) => handleSave(data)}\n  size="${values.size}"\n/>\n\n// 3. Delete Confirmation Modal:\n<DeleteModal\n  isOpen={isDeleteOpen}\n  onClose={() => setIsDeleteOpen(false)}\n  onDelete={async () => handleDelete()}\n  title="Delete Confirmation"\n  message="Are you sure you want to delete this item?"\n/>`
        ),
    },

    // 7. Toast
    {
        id: "toast",
        category: "overlays",
        title: "Toast Component",
        subtitle: "Visual notification cards with left accent borders, colored circular icons, and floating trigger",
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
            { name: "title", label: "Toast Title", type: "text", placeholder: "e.g. Success" },
            { name: "message", label: "Toast Message", type: "text", placeholder: "Enter notification message" },
        ],
        renderPreview: (values) => (
            <div className="flex items-center justify-center w-full">
                <Button
                    text={`Trigger Floating ${(TYPES[values.type]?.title || values.type).toUpperCase()} Toast`}
                    version="v2"
                    bg={values.type === "error" ? "danger" : values.type}
                    color="white"
                    icon="Bell"
                    onClick={() =>
                        showToast({
                            title: values.title || TYPES[values.type]?.title,
                            message: values.message,
                            type: values.type,
                        })
                    }
                />
            </div>
        ),
        getCode: (values) => (
            `import Toast, { showToast } from "src/components/common/Toast";\n\n// 1. Inlined React Component:\n<Toast\n  type="${values.type}"\n  title="${values.title || TYPES[values.type]?.title || "Success"}"\n  message="${values.message}"\n  onClose={() => handleClose()}\n/>\n\n// 2. Imperative Floating Notification:\nshowToast({\n  title: "${values.title || TYPES[values.type]?.title || "Success"}",\n  message: "${values.message}",\n  type: "${values.type}",\n});`
        ),
    },

    // 8. Skeleton
    {
        id: "skeleton",
        category: "overlays",
        title: "Skeleton Component",
        subtitle: "Placeholder loading states supporting 21 UI layout variants with shimmer and pulse animations",
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
            { name: "variant", label: "Skeleton Variant", type: "select", options: SKELETON_VARIANTS },
            { name: "theme", label: "Skeleton Theme", type: "select", options: SKELETON_THEMES },
            { name: "animation", label: "Animation Style", type: "select", options: SKELETON_ANIMATIONS },
            { name: "count", label: "Item / Line Count", type: "select", options: [{ label: "1 Item", value: 1 }, { label: "2 Items", value: 2 }, { label: "3 Items", value: 3 }, { label: "4 Items", value: 4 }] },
        ],
        renderPreview: (values) => (
            <div className="w-full">
                <Skeleton
                    key={`${values.variant}-${values.theme}-${values.animation}`}
                    variant={values.variant}
                    theme={values.theme}
                    animation={values.animation}
                    count={Number(values.count) || 4}
                    width={values.variant === "circle" ? "54px" : undefined}
                    height={values.variant === "circle" ? "54px" : (values.variant === "rect" ? (values.height || "60px") : undefined)}
                    borderRadius={values.borderRadius || "6px"}
                    className="w-full"
                />
            </div>
        ),
        getCode: (values) => {
            const extraProps = [];
            if (["text", "card", "card-grid", "reviews", "hero"].includes(values.variant)) {
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
            const extraStr = extraProps.length ? `\n  ${extraProps.join("\n  ")}` : "";
            return `import Skeleton from "src/components/common/Skeleton";\n\n<Skeleton\n  variant="${values.variant}"\n  theme="${values.theme}"\n  animation="${values.animation}"${extraStr}\n  className="w-full"\n/>`;
        },
    },

    // 9. Dropdown
    {
        id: "dropdown",
        category: "overlays",
        title: "Dropdown Component",
        subtitle: "Contextual popup menus with alignment, click-outside detection, keyboard shortcuts, and action items",
        icon: "ChevronDown",
        defaultValues: {
            align: "right",
            minWidth: "200px",
            isLoggedIn: "true",
        },
        fields: [
            { name: "align", label: "Menu Alignment", type: "select", options: DROPDOWN_ALIGN_OPTIONS },
            { name: "minWidth", label: "Minimum Width", type: "select", options: DROPDOWN_WIDTH_OPTIONS },
            { name: "isLoggedIn", label: "User Session State", type: "select", options: [{ label: "Logged In (Admin)", value: "true" }, { label: "Guest Mode", value: "false" }] },
        ],
        renderPreview: (values) => <DropdownDemoPreview values={values} />,
        getCode: (values) => (
            `import Dropdown from "src/components/common/Dropdown";\n\nconst [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);\n\n<div\n  className="relative"\n  onMouseEnter={() => setIsUserDropdownOpen(true)}\n  onMouseLeave={() => setIsUserDropdownOpen(false)}\n>\n  <div\n    className="border-tertiary rounded-5 bg-white p-8 flex items-center justify-center cursor-pointer text-gray hover-text-dark"\n    onClick={() => setIsUserDropdownOpen((prev) => !prev)}\n  >\n    <Icon name="Users" width="14" height="14" stroke="${values.isLoggedIn === "true" ? "#f25c2b" : "currentColor"}" strokeWidth="2.5" />\n  </div>\n\n  {isUserDropdownOpen && (\n    <Dropdown\n      isOpen={isUserDropdownOpen}\n      onClose={() => setIsUserDropdownOpen(false)}\n      align="${values.align || "right"}"\n      minWidth="${values.minWidth || "200px"}"\n      className="b-shadow rounded-5"\n    >\n      <div className="p-12 bordb flex items-center gap-12">\n        <div\n          className="rounded-full bg-light-primary text-primary flex items-center justify-center font-600"\n          style={{ width: 32, height: 32, backgroundColor: "#eff6ff" }}\n        >\n          A\n        </div>\n        <div>\n          <h4 className="font-600 text-dark headmini-text capitalize">Admin User</h4>\n          <p className="text-gray mini-text">admin@example.com</p>\n        </div>\n      </div>\n\n      <div className="p-4">\n        <p className="drop-item rounded-5 mini-text cursor-pointer p-10 flex items-center gap-8 hover-bg-light" onClick={() => navigate("/profile")}>\n          <Icon name="Users" width="14" height="14" />\n          <span>My Profile</span>\n        </p>\n        <p className="drop-item rounded-5 mini-text cursor-pointer p-10 flex items-center gap-8 hover-bg-light text-danger" onClick={handleLogout}>\n          <Icon name="Logout" width="14" height="14" />\n          <span>Logout</span>\n        </p>\n      </div>\n    </Dropdown>\n  )}\n</div>`
        ),
    },

    // 10. Tooltip
    {
        id: "tooltip",
        category: "overlays",
        title: "Tooltip Component",
        subtitle: "Hover tooltips supporting 4 directional positions, theme styling, and instant accessibility",
        icon: "Info",
        defaultValues: {
            position: "top",
            theme: "dark",
            text: "Helpful contextual tooltip message",
        },
        fields: [
            { name: "position", label: "Tooltip Position", type: "select", options: TOOLTIP_POSITIONS },
            { name: "theme", label: "Color Theme", type: "select", options: TOOLTIP_THEMES },
            { name: "text", label: "Tooltip Text", type: "text", placeholder: "Helpful contextual tooltip message" },
        ],
        renderPreview: (values) => <TooltipDemoPreview values={values} />,
        getCode: (values) => (
            `import Tooltip from "src/components/common/Tooltip";\n\n<Tooltip\n  text="${values.text || "Helpful contextual tooltip message"}"\n  position="${values.position || "top"}"\n  theme="${values.theme || "dark"}"\n>\n  <Button text="Hover Me" icon="Info" />\n</Tooltip>`
        ),
    },

    // 11. Avatar
    {
        id: "avatar",
        category: "display",
        title: "Avatar Component",
        subtitle: "Circular profile images with initials fallback, status indicators, custom borders, and avatar group stacks",
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
            { name: "mode", label: "Display Mode", type: "select", options: [{ label: "Single Avatar", value: "single" }, { label: "Avatar Group Stack", value: "group" }] },
            { name: "size", label: "Avatar Size", type: "select", options: [{ label: "32px (Mini)", value: "32" }, { label: "42px (Small)", value: "42" }, { label: "48px (Medium)", value: "48" }, { label: "56px (Large)", value: "56" }, { label: "64px (X-Large)", value: "64" }] },
            { name: "shape", label: "Avatar Shape", type: "select", options: [{ label: "Circle", value: "circle" }, { label: "Rounded", value: "rounded" }, { label: "Square", value: "square" }] },
            { name: "status", label: "Status Dot", type: "select", options: [{ label: "Online (Green)", value: "online" }, { label: "Busy (Red)", value: "busy" }, { label: "Away (Amber)", value: "away" }, { label: "Offline (Gray)", value: "offline" }, { label: "None", value: "none" }] },
            { name: "borderWidth", label: "Border Width", type: "select", options: [{ label: "0px (None)", value: "0" }, { label: "1px", value: "1" }, { label: "2px", value: "2" }, { label: "3px", value: "3" }, { label: "4px", value: "4" }] },
            { name: "borderColor", label: "Border Color", type: "select", options: [{ label: "Primary Blue (#1e74db)", value: "#1e74db" }, { label: "Success Green (#10b981)", value: "#10b981" }, { label: "Warning Amber (#f59e0b)", value: "#f59e0b" }, { label: "Dark Slate (#0f1623)", value: "#0f1623" }, { label: "Pink (#ec4899)", value: "#ec4899" }] },
            { name: "badgeText", label: "Group Badge Text", type: "select", options: [{ label: "+3", value: "+3" }, { label: "+5", value: "+5" }, { label: "+12", value: "+12" }, { label: "1M", value: "1M" }] },
            { name: "imgSrc", label: "Image Asset", type: "select", options: [{ label: "Sobo Logo", value: "sobo" }, { label: "Dashboard Graphic", value: "dash" }, { label: "Hero Graphic", value: "hero" }, { label: "Initials Fallback", value: "initials" }] },
            { name: "alt", label: "Alt / Name Label", type: "text", placeholder: "e.g. John Doe" },
        ],
        renderPreview: (values) => {
            const img = values.imgSrc === "initials" ? "" : values.imgSrc === "dash" ? dashImg : values.imgSrc === "hero" ? heroImg : soboLogo;
            if (values.mode === "group") {
                return (
                    <AvatarGroup
                        avatars={[dashImg, soboLogo, heroImg]}
                        badgeText={values.badgeText}
                        size={Number(values.size) || 42}
                        overlap={10}
                    />
                );
            }
            return (
                <Avatar
                    src={img}
                    size={Number(values.size) || 48}
                    shape={values.shape || "circle"}
                    status={values.status}
                    borderWidth={Number(values.borderWidth) || 0}
                    borderColor={values.borderColor}
                    alt={values.alt || "John Doe"}
                />
            );
        },
        getCode: (values) => {
            if (values.mode === "group") {
                return `<AvatarGroup\n  avatars={[img1, img2, img3]}\n  badgeText="${values.badgeText}"\n  size={${values.size}}\n  overlap={10}\n/>`;
            }
            const shapeProp = values.shape && values.shape !== "circle" ? `\n  shape="${values.shape}"` : "";
            const statusProp = values.status && values.status !== "none" ? `\n  status="${values.status}"` : "";
            const srcVal = values.imgSrc === "initials" ? `""` : `profileImg`;
            return `<Avatar\n  src={${srcVal}}\n  alt="${values.alt || "John Doe"}"\n  size={${values.size}}\n  borderWidth={${values.borderWidth}}\n  borderColor="${values.borderColor}"${shapeProp}${statusProp}\n/>`;
        },
    },

    // 10. Accordion
    {
        id: "accordion",
        category: "display",
        title: "Accordion Component",
        subtitle: "Smooth expandable content panels with single or multiple simultaneous expansion and 2 display versions",
        icon: "FileText",
        defaultValues: {
            version: "v1",
            allowMultiple: false,
        },
        fields: [
            { name: "version", label: "Accordion Version", type: "select", options: [{ label: "v1 (Numbered Circle)", value: "v1" }, { label: "v2 (Clean / No Number)", value: "v2" }] },
            { name: "allowMultiple", label: "Accordion Multi-Open", type: "select", options: BOOLEAN_OPTIONS },
        ],
        renderPreview: (values) => {
            return (
                <div className="w-full px-8 max-h-[220px] overflow-y-auto">
                    <Accordion
                        key={`${values.version || "v1"}-${values.allowMultiple}`}
                        items={ACCORDION_ITEMS}
                        version={values.version || "v1"}
                        allowMultiple={values.allowMultiple === true || values.allowMultiple === "true"}
                    />
                </div>
            );
        },
        getCode: (values) => {
            return `<Accordion\n  version="${values.version || "v1"}"\n  allowMultiple={${Boolean(values.allowMultiple)}}\n  items={[\n    { title: "First FAQ Question", content: <div>Details content or custom node</div> },\n    { title: "Second FAQ Question", content: <div>Second answer content</div> },\n    { title: "Third FAQ Question", content: <div>Third panel details</div> }\n  ]}\n/>`;
        },
    },

    // 11. Table
    {
        id: "table",
        category: "tables",
        title: "Table Component",
        subtitle: "Full-featured data grid demonstration with search query, responsive columns, and pagination",
        icon: "Dashboard",
        defaultValues: {
            title: "Common UI Inventory",
            searchPlaceholder: "Search members, roles, skills...",
        },
        fields: [
            { name: "title", label: "Table Title", type: "text", placeholder: "Enter table title" },
            { name: "searchPlaceholder", label: "Search Placeholder", type: "text", placeholder: "Search members, roles, skills..." },
        ],
        renderPreview: (values) => (
            <div className="w-full">
                <TableLiveGrid values={values} />
            </div>
        ),
        getCode: (values) => (
            `<Table\n  title="${values?.title || "Common UI Inventory"}"\n  subtitle="Enterprise directory with live search, selection, expand/collapse details, and pagination"\n  data={paginatedData}\n  columns={columns}\n  totalItems={data.length}\n  itemsPerPage={5}\n  page={page}\n  onPageChange={setPage}\n  searchQuery={searchQuery}\n  onSearchChange={setSearchQuery}\n  searchPlaceholder="${values?.searchPlaceholder || "Search members, roles, skills..."}"\n  itemName="records"\n  collapsible={true}\n  minWidth="1050px"\n  onView={(row) => console.log("view", row)}\n  onEdit={(row) => console.log("edit", row)}\n  onDelete={(row) => console.log("delete", row)}\n/>`
        ),
    },
];

// Unified, reusable component playground block
const ComponentPlayground = memo(({ config }) => {
    const [values, setValues] = useState(config.defaultValues);
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

    const handleChange = useCallback((key, val) => {
        setValues((prev) => ({ ...prev, [key]: val }));
    }, []);

    const code = useMemo(() => config.getCode(values), [values, config]);

    const handleCopy = useCallback(() => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code);
            showToast(`${config.title} code copied to clipboard!`, "success");
        }
    }, [code, config.title]);

    return (
        <SectionCard
            title={config.title}
            subtitle={config.subtitle}
            icon={config.icon}
        >
            <div className="w-full">
                <div className="bg-forth flex items-center justify-center h-full rounded-5 relative p-20 mb-10 overflow-x-auto">
                    {config.renderPreview(values, { onValueChange: handleChange })}
                    <div
                        onClick={() => setIsCodeModalOpen(true)}
                        className="absolute top-0 right-0 m-8 cursor-pointer flex items-center justify-center p-4 rounded-4"
                        title="View & Copy Code"
                    >
                        <Icon name="CopyLink" width="18" height="18" className="text-primary" />
                    </div>
                </div>

                <ControlFieldsGrid
                    fields={config.fields}
                    values={values}
                    onChange={handleChange}
                />

                {config.extraContent && config.extraContent(values)}

                <ComponentCodeModal
                    isOpen={isCodeModalOpen}
                    onClose={() => setIsCodeModalOpen(false)}
                    title={`${config.title} JSX Code`}
                    code={code}
                    onCopy={handleCopy}
                />
            </div>
        </SectionCard>
    );
});
ComponentPlayground.displayName = "ComponentPlayground";

// Main TemplateSection Component
const TemplateSection = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Components");

    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        const mappedTab = SIDEBAR_TO_TAB[name] || "all";
        setActiveTab(mappedTab);
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        const foundEntry = Object.entries(SIDEBAR_TO_TAB).find(([, val]) => val === tabValue);
        if (foundEntry) setSelectedCategory(foundEntry[0]);
        else setSelectedCategory("All Components");
    }, []);

    // Filter components by activeTab
    const visibleComponents = useMemo(() => {
        if (activeTab === "all") return TEMPLATE_COMPONENTS_DATA;
        return TEMPLATE_COMPONENTS_DATA.filter((comp) => comp.category === activeTab);
    }, [activeTab]);

    return (
        <MainLayout
            sidebarTitle="Component Types"
            sidebarItems={SIDEBAR_ITEMS}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Layers" width="18" height="18" />}
            headerTitle="Common Components Showcase"
            headerSub="Comprehensive live design system catalog of all UI building blocks in src/components/common"
            quickAction=""
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            filterInputs=""
            onTabChange={handleTabChange}
        >
            {visibleComponents.map((comp) => (
                <ComponentPlayground key={comp.id} config={comp} />
            ))}
        </MainLayout>
    );
};

export default memo(TemplateSection);
