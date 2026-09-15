import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";

// 🧩 Components from common folder
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Breadcrumb from "../../components/common/Breadcrumb";
import Steps from "../../components/common/Steps";
import Avatar, { AvatarGroup } from "../../components/common/Avatar";
import Dropdown from "../../components/common/Dropdown";
import Modal from "../../components/common/Modal";
import Skeleton from "../../components/common/Skeleton";
import Accordion from "../../components/common/Accordion";
import Tab from "../../components/common/Tab";
import Pagination from "../../components/common/Pagination";
import Table from "../../components/common/Table";
import Image from "../../components/common/Image";
import { showToast } from "../../components/common/Toast";

// 📝 Form controls for playground settings
import Fields from "../../components/forms/Fields";

// 🖼️ Asset references
import dashImg from "../../assets/dashimg.png";
import soboLogo from "../../assets/sobo_logo.webp";
import heroImg from "../../assets/hero.png";

// Sidebar categories for Common Components Showcase
const SIDEBAR_ITEMS = [
    { name: "All Components", icon: "Grid", count: 15, color: "#1e74db" },
    { name: "Buttons & Actions", icon: "Edit", count: 8, color: "#10b981" },
    { name: "Navigation & Tabs", icon: "Layers", count: 4, color: "#3b82f6" },
    { name: "Feedback & Overlays", icon: "Check", count: 4, color: "#f59e0b" },
    { name: "Data Display", icon: "Users", count: 4, color: "#8b5cf6" },
    { name: "Data Tables", icon: "Dashboard", count: 1, color: "#ec4899" },
];

// Tabs matching FieldSection pattern
const TABS = [
    { name: "All Components", value: "all" },
    { name: "Buttons & Actions", value: "actions" },
    { name: "Navigation & Tabs", value: "navigation" },
    { name: "Feedback & Overlays", value: "overlays" },
    { name: "Data Display", value: "display" },
    { name: "Data Tables", value: "tables" },
];

const SIDEBAR_TO_TAB = {
    "All Components": "all",
    "Buttons & Actions": "actions",
    "Navigation & Tabs": "navigation",
    "Feedback & Overlays": "overlays",
    "Data Display": "display",
    "Data Tables": "tables",
};

// Initial Playground Settings
const INITIAL_SETTINGS = {
    buttonVersion: "v2",
    stepIndex: 2,
    allowMultipleAccordion: false,
    showSkeleton: false,
};

// Memoized Section Card Wrapper matching FieldSection.jsx
const SectionCard = memo(({ title, subtitle, icon, count, children, rightAction }) => (
    <div className="bg-white rounded-8 bord p-20 mb-16 shadow-sm">
        <div className="flex items-center justify-between pb-12 mb-16 bordb">
            <div className="flex items-center gap-10">
                <div className="bg-forth p-8 rounded-5 text-primary flex items-center justify-center">
                    <Icon name={icon} width="18" height="18" />
                </div>
                <div>
                    <h3 className="para-text font-600 text-dark">{title}</h3>
                    {subtitle && <p className="mini-text text-gray mt-2">{subtitle}</p>}
                </div>
            </div>
            <div className="flex items-center gap-8">
                {rightAction}
                {count !== undefined && (
                    <span className="mini-text font-600 px-8 py-2 rounded-20 bg-forth text-primary">
                        {count} UI Items
                    </span>
                )}
            </div>
        </div>
        {children}
    </div>
));
SectionCard.displayName = "SectionCard";

// 1. Buttons & Action Triggers Card
const ActionsCard = memo(({ settings }) => {
    return (
        <SectionCard
            title="Buttons & Action Triggers"
            subtitle="Extensible button elements featuring semantic color schemes, icon prefixes, and outlined borders"
            icon="Edit"
            count={8}
        >
            <div className="grid-cols-1 gap-16">
                <div>
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">Brand Variations & Semantic Colors</h5>
                    <div className="flex items-center gap-8 flex-wrap">
                        <Button
                            text="Primary Action"
                            version={settings.buttonVersion}
                            bg="primary"
                            color="white"
                            icon="Plus"
                            iconWidth="14"
                            iconHeight="14"
                            onClick={() => showToast("Primary button clicked!", "success")}
                        />
                        <Button
                            text="Success Confirm"
                            version={settings.buttonVersion}
                            bg="success"
                            color="white"
                            icon="Check"
                            iconWidth="14"
                            iconHeight="14"
                            onClick={() => showToast("Success button clicked!", "success")}
                        />
                        <Button
                            text="Delete Resource"
                            version={settings.buttonVersion}
                            bg="danger"
                            color="white"
                            icon="Trash"
                            iconWidth="14"
                            iconHeight="14"
                            onClick={() => showToast("Danger button clicked!", "danger")}
                        />
                        <Button
                            text="Download Report"
                            version={settings.buttonVersion}
                            variant="outline"
                            bg="dark"
                            icon="Download"
                            iconWidth="14"
                            iconHeight="14"
                            onClick={() => showToast("Download initiated!", "info")}
                        />
                        <Button
                            text="Reset Cache"
                            version={settings.buttonVersion}
                            bg="forth"
                            color="dark"
                            border="tertiary"
                            icon="Rotate"
                            iconWidth="14"
                            iconHeight="14"
                            onClick={() => showToast("Cache reset to default", "warning")}
                        />
                        <Button
                            text="Disabled State"
                            version={settings.buttonVersion}
                            disabled={true}
                            bg="forth"
                            color="gray"
                            icon="Lock"
                            iconWidth="14"
                            iconHeight="14"
                        />
                    </div>
                </div>

                <div className="bordt pt-16">
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">Icon Buttons & Compact Versions</h5>
                    <div className="flex items-center gap-12 flex-wrap">
                        <Button
                            version="icon"
                            bg="primary"
                            color="white"
                            icon="Settings"
                            onClick={() => showToast("Settings opened", "info")}
                            title="Open Settings"
                        />
                        <Button
                            version="icon"
                            bg="light-primary"
                            color="primary"
                            icon="Eye"
                            onClick={() => showToast("Inspect mode active", "info")}
                            title="Inspect Element"
                        />
                        <Button
                            version="icon"
                            bg="light-danger"
                            color="danger"
                            icon="Trash"
                            onClick={() => showToast("Item deleted", "danger")}
                            title="Delete"
                        />
                        <Button
                            version="icon"
                            bg="forth"
                            color="dark"
                            icon="Copy"
                            onClick={() => showToast("Link copied to clipboard", "success")}
                            title="Copy link"
                        />
                        <Button
                            version="v3"
                            text="Compact v3"
                            bg="primary"
                            color="white"
                            onClick={() => showToast("v3 Button triggered", "info")}
                        />
                    </div>
                </div>
            </div>
        </SectionCard>
    );
});
ActionsCard.displayName = "ActionsCard";

// 2. Navigation, Stepper, Tabs & Pagination Card
const NavigationCard = memo(({ settings, onStepChange }) => {
    const [demoTab, setDemoTab] = useState("all");
    const [page, setPage] = useState(1);

    const demoTabs = useMemo(
        () => [
            { name: "Active Modules", value: "all", count: 18, icon: <Icon name="Layers" width="14" height="14" /> },
            { name: "Pending Review", value: "pending", count: 5, icon: <Icon name="Clock" width="14" height="14" /> },
            { name: "Archived", value: "archived", count: 0, icon: <Icon name="Box" width="14" height="14" /> },
        ],
        []
    );

    const stepLabels = useMemo(
        () => ["Define Project", "Configure Theme", "Import Components", "Final Launch"],
        []
    );

    return (
        <SectionCard
            title="Navigation, Steppers & Pagination"
            subtitle="Wayfinding controls, workflow phase indicators, segmented tabs, and data pagers"
            icon="Layers"
            count={4}
        >
            <div className="grid-cols-1 gap-20">
                {/* Breadcrumb Showcase */}
                <div>
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">1. Interactive Breadcrumbs</h5>
                    <div className="p-12 rounded-8" style={{ background: "#0f172a" }}>
                        <Breadcrumb
                            items={[
                                { label: "Workspace", path: "/dashboard" },
                                { label: "Component Library", path: "/components/fields" },
                                { label: "Common Components Showcase" },
                            ]}
                        />
                    </div>
                </div>

                {/* Steps Stepper Showcase */}
                <div className="bordt pt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h5 className="mini-text text-gray font-600 uppercase">2. Stepper Progress Tracker</h5>
                        <div className="flex items-center gap-6">
                            <Button
                                text="Prev Step"
                                version="v2"
                                bg="white"
                                color="dark"
                                border="tertiary"
                                disabled={settings.stepIndex <= 1}
                                onClick={() => onStepChange(Math.max(1, settings.stepIndex - 1))}
                            />
                            <Button
                                text="Next Step"
                                version="v2"
                                bg="primary"
                                color="white"
                                disabled={settings.stepIndex >= stepLabels.length}
                                onClick={() => onStepChange(Math.min(stepLabels.length, settings.stepIndex + 1))}
                            />
                        </div>
                    </div>
                    <div className="bg-forth p-16 rounded-8 bord">
                        <Steps currentStep={settings.stepIndex} steps={stepLabels} />
                    </div>
                </div>

                {/* Tabs Showcase */}
                <div className="bordt pt-16">
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">3. Segmented Tab Switchers</h5>
                    <div className="p-12 bg-white rounded-8 bord mb-12">
                        <Tab tabs={demoTabs} activeTab={demoTab} onChange={setDemoTab} version="1" />
                    </div>
                    <div className="p-12 bg-forth rounded-8 bord">
                        <Tab tabs={demoTabs} activeTab={demoTab} onChange={setDemoTab} version="2" />
                    </div>
                </div>

                {/* Pagination Showcase */}
                <div className="bordt pt-16">
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">4. Data Pagination Controller</h5>
                    <div className="p-10 bg-forth rounded-8 bord">
                        <Pagination
                            page={page}
                            totalItems={95}
                            itemsPerPage={10}
                            onPageChange={setPage}
                            itemName="modules"
                        />
                    </div>
                </div>
            </div>
        </SectionCard>
    );
});
NavigationCard.displayName = "NavigationCard";

// 3. Feedback, Overlays & Dialogs Card
const OverlaysCard = memo(({ settings }) => {
    const [modalSize, setModalSize] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleToast = useCallback((type, message) => {
        showToast(message, type);
    }, []);

    return (
        <SectionCard
            title="Feedback, Overlays & Dialogs"
            subtitle="Interactive modal dialogues, contextual dropdown popovers, system alerts, and skeleton loaders"
            icon="Check"
            count={4}
        >
            <div className="grid-cols-1 gap-20">
                {/* Modal Showcase */}
                <div>
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">1. Interactive Modal Dialogs</h5>
                    <div className="flex items-center gap-8 flex-wrap">
                        <Button
                            text="Open Small Modal"
                            version="v2"
                            bg="primary"
                            color="white"
                            onClick={() => setModalSize("sm")}
                        />
                        <Button
                            text="Open Medium Modal"
                            version="v2"
                            bg="white"
                            color="dark"
                            border="tertiary"
                            onClick={() => setModalSize("md")}
                        />
                        <Button
                            text="Open Large Modal"
                            version="v2"
                            bg="forth"
                            color="dark"
                            onClick={() => setModalSize("lg")}
                        />
                    </div>
                </div>

                {/* Dropdown Popover Showcase */}
                <div className="bordt pt-16">
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">2. Contextual Dropdown Popover</h5>
                    <div className="relative inline-block">
                        <Button
                            text="Options Menu ▾"
                            version="v2"
                            bg="white"
                            color="dark"
                            border="tertiary"
                            icon="Settings"
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                        />
                        <Dropdown
                            isOpen={isDropdownOpen}
                            onClose={() => setIsDropdownOpen(false)}
                            align="left"
                            minWidth="200px"
                            className="rounded-8 shadow-md bord p-6"
                        >
                            <div
                                className="p-8 cursor-pointer mini-text text-dark font-500 hover-primary flex items-center gap-8 rounded-5"
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    showToast("User profile opened", "info");
                                }}
                            >
                                <Icon name="Users" width="14" height="14" /> Operator Profile
                            </div>
                            <div
                                className="p-8 cursor-pointer mini-text text-dark font-500 hover-primary flex items-center gap-8 rounded-5"
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    showToast("Configuration exported", "success");
                                }}
                            >
                                <Icon name="FileText" width="14" height="14" /> Export Configuration
                            </div>
                            <div
                                className="p-8 cursor-pointer mini-text text-danger font-500 hover-primary flex items-center gap-8 rounded-5"
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    showToast("Session disconnected", "danger");
                                }}
                            >
                                <Icon name="Trash" width="14" height="14" /> Terminate Session
                            </div>
                        </Dropdown>
                    </div>
                </div>

                {/* Toasts Trigger Showcase */}
                <div className="bordt pt-16">
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">3. Toast Notification Alerts</h5>
                    <div className="flex items-center gap-8 flex-wrap">
                        <Button
                            text="Success Toast"
                            version="v2"
                            bg="success"
                            color="white"
                            onClick={() => handleToast("success", "Operation completed with zero warnings!")}
                        />
                        <Button
                            text="Danger Toast"
                            version="v2"
                            bg="danger"
                            color="white"
                            onClick={() => handleToast("danger", "Network error: Connection timed out")}
                        />
                        <Button
                            text="Warning Toast"
                            version="v2"
                            bg="warning"
                            color="white"
                            onClick={() => handleToast("warning", "Database migration in progress...")}
                        />
                        <Button
                            text="Info Toast"
                            version="v2"
                            bg="primary"
                            color="white"
                            onClick={() => handleToast("info", "New security patches deployed")}
                        />
                    </div>
                </div>

                {/* Skeleton Loader Showcase */}
                <div className="bordt pt-16">
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">4. Skeleton Shimmer Placeholder</h5>
                    <div className="p-16 bg-forth rounded-8 bord">
                        <div className="flex items-center gap-12 mb-12">
                            <Skeleton variant="circle" width="48px" height="48px" />
                            <div className="flex-1">
                                <Skeleton variant="text" count={2} className="w-full mb-4" />
                            </div>
                        </div>
                        <Skeleton variant="rect" height="60px" borderRadius="6px" className="w-full" />
                    </div>
                </div>
            </div>

            {/* Modal Dialog Instance */}
            <Modal
                isOpen={Boolean(modalSize)}
                onClose={() => setModalSize(null)}
                title={`Interactive Modal Dialog (${modalSize?.toUpperCase()})`}
                size={modalSize || "md"}
                footer={
                    <div className="flex items-center justify-end gap-8 w-full">
                        <Button
                            text="Dismiss"
                            version="v2"
                            bg="white"
                            color="gray"
                            border="tertiary"
                            onClick={() => setModalSize(null)}
                        />
                        <Button
                            text="Confirm Changes"
                            version="v2"
                            bg="primary"
                            color="white"
                            onClick={() => {
                                showToast("Modal action confirmed!", "success");
                                setModalSize(null);
                            }}
                        />
                    </div>
                }
            >
                <div className="py-8">
                    <p className="small-text text-gray mb-12" style={{ lineHeight: 1.6 }}>
                        This is a live instance of the reusable <code>Modal</code> component from the{" "}
                        <code>components/common</code> folder. It supports animated backdrops, dynamic widths (
                        <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>full</code>), esc-key
                        dismissal, and custom footer slots.
                    </p>
                    <div className="p-12 rounded-5 bg-light-primary text-primary mini-text font-500">
                        ✓ Fully accessible with focus traps and keyboard navigation.
                    </div>
                </div>
            </Modal>
        </SectionCard>
    );
});
OverlaysCard.displayName = "OverlaysCard";

// 4. Data Display, Avatars & Accordions Card
const DisplayCard = memo(({ settings }) => {
    const accordionItems = useMemo(
        () => [
            {
                title: "How does the generic dashboard state management work?",
                content:
                    "State is decoupled using localized React hooks with React.memo, useCallback, and useMemo guards to prevent unnecessary tree re-renders across high-frequency interactions.",
            },
            {
                title: "Can Accordion items allow multiple simultaneous expansions?",
                content:
                    "Yes! By passing the allowMultiple={true} prop to the Accordion component, users can open as many collapse panels as needed simultaneously.",
            },
            {
                title: "Are Avatar components compatible with custom fallback initials?",
                content:
                    "When an image URL is unavailable or encounters a network error, Avatar gracefully renders the entity's initials backed by a curated color palette.",
            },
        ],
        []
    );

    const commonIcons = [
        "Dashboard",
        "Users",
        "Shield",
        "Clipboard",
        "CMS",
        "Box",
        "Layers",
        "Settings",
        "Mail",
        "Phone",
        "Search",
        "Bell",
        "FileText",
        "Check",
        "Plus",
        "Trash",
    ];

    return (
        <SectionCard
            title="Data Display, Avatars & Accordion"
            subtitle="Expandable accordions, profile avatar badges, avatar groups, and vector icon collections"
            icon="Users"
            count={4}
        >
            <div className="grid-cols-1 gap-20">
                {/* Accordion Showcase */}
                <div>
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">1. Smooth Collapsible Accordion</h5>
                    <div className="bg-white rounded-8 bord p-16">
                        <Accordion
                            items={accordionItems}
                            allowMultiple={settings.allowMultipleAccordion}
                        />
                    </div>
                </div>

                {/* Avatar & AvatarGroup Showcase */}
                <div className="bordt pt-16">
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">2. Individual Avatars & AvatarGroup</h5>
                    <div className="flex items-center gap-24 flex-wrap">
                        <div className="flex items-center gap-12">
                            <Avatar src={dashImg} size={32} borderColor="#3b82f6" />
                            <Avatar src={soboLogo} size={42} borderColor="#10b981" />
                            <Avatar src={heroImg} size={52} borderColor="#f59e0b" />
                        </div>
                        <div className="flex items-center gap-10 bordl pl-20">
                            <span className="mini-text text-gray font-500">Group Stack:</span>
                            <AvatarGroup
                                avatars={[dashImg, soboLogo, heroImg]}
                                badgeText="+5"
                                size={38}
                                overlap={-10}
                            />
                        </div>
                    </div>
                </div>

                {/* Icon Grid Showcase */}
                <div className="bordt pt-16">
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">3. Vector Icon Library Preview</h5>
                    <div className="grid-cols-8 gap-8">
                        {commonIcons.map((iconName) => (
                            <div
                                key={iconName}
                                className="bg-forth p-12 rounded-8 bord flex flex-column items-center justify-center gap-6 cursor-pointer hover-shadow transition"
                                onClick={() => showToast(`Icon selected: <Icon name="${iconName}" />`, "info")}
                                title={`Click to copy: ${iconName}`}
                            >
                                <Icon name={iconName} width="18" height="18" className="text-primary" />
                                <span className="mini-text text-gray font-500" style={{ fontSize: "10px" }}>
                                    {iconName}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Component Showcase */}
                <div className="bordt pt-16">
                    <h5 className="mini-text text-gray font-600 uppercase mb-8">4. Responsive Image Component</h5>
                    <div className="flex items-center gap-16">
                        <Image
                            src={heroImg}
                            alt="Sample hero banner"
                            className="rounded-8 bord object-cover shadow-sm"
                            style={{ width: "160px", height: "90px" }}
                        />
                        <div>
                            <h5 className="small-text font-600 text-dark">Image Component Features</h5>
                            <p className="mini-text text-gray" style={{ maxWidth: 450 }}>
                                Integrates automatic error fallback handling, lazy loading placeholders, and clean
                                responsive border formatting.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </SectionCard>
    );
});
DisplayCard.displayName = "DisplayCard";

// 5. Data Tables Card
const TableCard = memo(() => {
    const [tableSearch, setTableSearch] = useState("");
    const [tablePage, setTablePage] = useState(1);

    const sampleColumns = useMemo(
        () => [
            {
                header: "Component Name",
                accessor: "name",
                ui: "profile",
                imageKey: "preview",
                subKey: "folder",
                style: { minWidth: "200px" },
            },
            {
                header: "Category",
                accessor: "category",
                ui: "badge",
                style: { minWidth: "120px" },
            },
            {
                header: "Capabilities",
                accessor: "capabilities",
                ui: "badge-list",
                style: { minWidth: "250px" },
            },
            {
                header: "Status",
                accessor: "status",
                ui: "status",
                style: { minWidth: "100px" },
            },
            {
                header: "Actions",
                accessor: "actions",
                ui: "actions",
                style: { minWidth: "100px", textAlign: "right" },
            },
        ],
        []
    );

    const sampleData = useMemo(
        () => [
            {
                id: "CMP-01",
                name: "Button",
                folder: "src/components/common/Button.jsx",
                preview: soboLogo,
                category: "Action",
                capabilities: ["v1/v2/v3", "outline", "icons", "disabled"],
                status: "Active",
            },
            {
                id: "CMP-02",
                name: "Modal",
                folder: "src/components/common/Modal.jsx",
                preview: dashImg,
                category: "Overlay",
                capabilities: ["sm/md/lg/xl", "custom-header", "footer-slot"],
                status: "Active",
            },
            {
                id: "CMP-03",
                name: "Table",
                folder: "src/components/common/Table.jsx",
                preview: heroImg,
                category: "Data",
                capabilities: ["sorting", "pagination", "search", "collapsible"],
                status: "Active",
            },
            {
                id: "CMP-04",
                name: "Accordion",
                folder: "src/components/common/Accordion.jsx",
                preview: soboLogo,
                category: "Display",
                capabilities: ["smooth-collapse", "multi-panel", "numbering"],
                status: "Active",
            },
            {
                id: "CMP-05",
                name: "Breadcrumb",
                folder: "src/components/common/Breadcrumb.jsx",
                preview: dashImg,
                category: "Navigation",
                capabilities: ["nav-links", "route-sync", "accessible"],
                status: "Active",
            },
        ],
        []
    );

    const filteredData = useMemo(() => {
        const q = tableSearch.toLowerCase().trim();
        if (!q) return sampleData;
        return sampleData.filter(
            (item) =>
                item.name.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q) ||
                item.folder.toLowerCase().includes(q)
        );
    }, [sampleData, tableSearch]);

    return (
        <SectionCard
            title="Common Table System"
            subtitle="Full-featured data grid demonstration with search query, responsive columns, and row action triggers"
            icon="Dashboard"
            count={1}
        >
            <Table
                title="Common UI Inventory"
                subtitle="Reusable presentation components located in src/components/common"
                data={filteredData}
                columns={sampleColumns}
                totalItems={filteredData.length}
                itemsPerPage={5}
                page={tablePage}
                onPageChange={setTablePage}
                searchQuery={tableSearch}
                onSearchChange={setTableSearch}
                searchPlaceholder="Search components..."
                itemName="components"
                collapsible={true}
                maxVisibleColumns={5}
                minWidth="950px"
                onView={(row) => showToast(`Inspecting: ${row.name}`, "info")}
                onEdit={(row) => showToast(`Editing props: ${row.name}`, "info")}
                onDelete={(row) => showToast(`Archived: ${row.name}`, "danger")}
                viewTitle="Inspect Component"
                editTitle="Edit Configuration"
                deleteTitle="Archive Component"
            />
        </SectionCard>
    );
});
TableCard.displayName = "TableCard";

// Filter Drawer Content for Playground Configuration
const FilterDrawerContent = memo(({ settings, onSettingChange }) => {
    const buttonVersionOptions = useMemo(
        () => [
            { label: "Version 1 (Default)", value: "v1" },
            { label: "Version 2 (Pill)", value: "v2" },
            { label: "Version 3 (Compact)", value: "v3" },
        ],
        []
    );

    const stepOptions = useMemo(
        () => [
            { label: "Step 1 — Define Project", value: 1 },
            { label: "Step 2 — Configure Theme", value: 2 },
            { label: "Step 3 — Import Components", value: 3 },
            { label: "Step 4 — Final Launch", value: 4 },
        ],
        []
    );

    return (
        <div className="grid-cols-3 gap-16">
            <Fields
                type="select"
                label="Button Styling Version"
                options={buttonVersionOptions}
                value={settings.buttonVersion}
                onChange={(val) => onSettingChange("buttonVersion", val)}
            />
            <Fields
                type="select"
                label="Workflow Stepper Index"
                options={stepOptions}
                value={settings.stepIndex}
                onChange={(val) => onSettingChange("stepIndex", Number(val))}
            />
            <div className="flex items-center justify-between p-12 bg-white rounded-5 bord">
                <span className="mini-text text-gray font-500">Allow Multiple Accordion Panels</span>
                <Fields
                    type="switch"
                    value={settings.allowMultipleAccordion}
                    onChange={(val) => onSettingChange("allowMultipleAccordion", val)}
                />
            </div>
        </div>
    );
});
FilterDrawerContent.displayName = "FilterDrawerContent";

// Main TemplateSection Component
const TemplateSection = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Components");
    const [settings, setSettings] = useState(INITIAL_SETTINGS);

    const handleSettingChange = useCallback((key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    }, []);

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

    const handleClearFilters = useCallback(() => {
        setSettings(INITIAL_SETTINGS);
        showToast("Playground settings reset to original defaults", "info");
    }, []);

    const handleExportRegistry = useCallback(() => {
        const payload = {
            componentsCount: 15,
            categories: SIDEBAR_ITEMS.map((item) => item.name),
            settings,
            exportedAt: new Date().toISOString(),
        };
        navigator.clipboard?.writeText(JSON.stringify(payload, null, 2));
        showToast("Common components schema copied to clipboard!", "success");
    }, [settings]);

    const hasActiveFilters = useMemo(
        () =>
            settings.buttonVersion !== INITIAL_SETTINGS.buttonVersion ||
            settings.stepIndex !== INITIAL_SETTINGS.stepIndex ||
            settings.allowMultipleAccordion !== INITIAL_SETTINGS.allowMultipleAccordion,
        [settings]
    );

    const filterInputsNode = useMemo(
        () => <FilterDrawerContent settings={settings} onSettingChange={handleSettingChange} />,
        [settings, handleSettingChange]
    );

    const quickActionNode = useMemo(
        () => (
            <div className="flex items-center gap-8">
                <Button
                    text="Reset State"
                    version="v2"
                    bg="white"
                    color="gray"
                    border="tertiary"
                    icon="Rotate"
                    onClick={handleClearFilters}
                    title="Reset playground options"
                />
                <Button
                    text="Export Registry"
                    version="v2"
                    bg="primary"
                    color="white"
                    icon="FileText"
                    onClick={handleExportRegistry}
                    title="Export components metadata"
                />
            </div>
        ),
        [handleClearFilters, handleExportRegistry]
    );

    return (
        <MainLayout
            sidebarTitle="Component Types"
            sidebarItems={SIDEBAR_ITEMS}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Layers" width="18" height="18" />}
            headerTitle="Common Components Showcase"
            headerSub="Comprehensive live design system catalog of all UI building blocks in src/components/common"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Configure interactive component versions, stepper index, and panel behaviors"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            {/* 1. Buttons & Actions */}
            {(activeTab === "all" || activeTab === "actions") && (
                <ActionsCard settings={settings} />
            )}

            {/* 2. Navigation, Stepper, Tabs & Pagination */}
            {(activeTab === "all" || activeTab === "navigation") && (
                <NavigationCard
                    settings={settings}
                    onStepChange={(step) => handleSettingChange("stepIndex", step)}
                />
            )}

            {/* 3. Feedback, Overlays & Dialogs */}
            {(activeTab === "all" || activeTab === "overlays") && (
                <OverlaysCard settings={settings} />
            )}

            {/* 4. Data Display, Avatars & Accordion */}
            {(activeTab === "all" || activeTab === "display") && (
                <DisplayCard settings={settings} />
            )}

            {/* 5. Data Tables System */}
            {(activeTab === "all" || activeTab === "tables") && (
                <TableCard />
            )}
        </MainLayout>
    );
};

export default memo(TemplateSection);
