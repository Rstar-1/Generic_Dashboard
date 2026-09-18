import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";

// 🧩 Components from common folder
import Button from "../../components/common/Button";
import Icon, { ALL_ICONS } from "../../components/common/Icon";
import Breadcrumb from "../../components/common/Breadcrumb";
import Steps from "../../components/common/Steps";
import Avatar, { AvatarGroup } from "../../components/common/Avatar";
import Modal, { CrudModal, DeleteModal, MODAL_WIDTHS } from "../../components/common/Modal";
import Skeleton from "../../components/common/Skeleton";
import Accordion from "../../components/common/Accordion";
import Tab from "../../components/common/Tab";
import Pagination from "../../components/common/Pagination";
import Table from "../../components/common/Table";
import Toast, { showToast, TYPES } from "../../components/common/Toast";
import Dropdown from "../../components/common/Dropdown";
import Tooltip from "../../components/common/Tooltip";
import Magnify from "../../components/common/Magnify";
import Badge, { BadgeList } from "../../components/common/Badge";
import Fields from "../../components/forms/Fields";

import { resolveImagePath, dashImg, soboLogo, hero as heroImg } from "../../utils/imageResolver";

import {
    SIDEBAR_ITEMS,
    TABS,
    SIDEBAR_TO_TAB,
    STEP_LABELS,
    BREADCRUMB_ITEMS,
    ACCORDION_ITEMS,
    SAMPLE_COLUMNS,
    SAMPLE_DATA,
    getTemplateComponentsData,
} from "./data/template";

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

// Interactive Head & Para Tags Typography Preview Helper
const HeadTypographyPreview = memo(({ values }) => {
    const Tag = values.tag || "h2";
    const isPara = Tag === "p";
    const fontSizeClass = values.fontSizeClass || (isPara ? "para-text" : "head-text");
    const fontWeight = values.fontWeight || (isPara ? "font-400" : "font-600");
    const color = values.color || "text-dark";
    const defaultText = isPara
        ? "A versatile dashboard built with clean architecture, modular components, and accessible design systems."
        : "Empowering Modern Digital Dashboards";
    const text = values.text || defaultText;

    return (
        <Tag className={`${fontSizeClass} ${fontWeight} ${color}`}>
            {text}
        </Tag>
    );
});
HeadTypographyPreview.displayName = "HeadTypographyPreview";

// Interactive Para Tags Typography Specimen Table Data
const PARA_SPECIMENS = [
    { cls: "headpara-text", desktop: "20px (LH: 30px)", mobile: "20px (LH: 28px)", sample: "Lead introductory paragraph text designed for impactful hero summaries and key highlights." },
    { cls: "midpara-text", desktop: "18px", mobile: "15px (LH: 21px)", sample: "Medium body paragraph for extended reading comfort across editorial cards and descriptions." },
    { cls: "para-text", desktop: "16px (LH: 22px)", mobile: "16px", sample: "Standard body paragraph for general dashboard descriptions, content blocks, and interface text." },
    { cls: "small-text", desktop: "13px (LH: 26px)", mobile: "13px (LH: 26px)", sample: "Secondary supporting copy, form field instructions, table notes, and contextual captions." },
    { cls: "mini-text", desktop: "11.5px (LH: 16px)", mobile: "11.5px (LH: 16px)", sample: "Micro metadata, timestamps, badge labels, and compact table cell details." },
];

// Interactive Para Tags Typography Preview Helper
const ParaTypographyPreview = memo(({ values }) => {
    const fontSizeClass = values.fontSizeClass || "para-text";
    const fontWeight = values.fontWeight || "font-400";
    const color = values.color || "text-dark";
    const text = values.text || "A versatile dashboard built with clean architecture, modular components, and accessible design systems.";

    return (
        <div className="w-full">
            {/* Live Interactive Specimen */}
            <div className="bg-white p-20 rounded-5 bordb mb-16">
                <div className="flex flex-wrap items-center gap-8 mb-12">
                    <span className="mini-text font-600 px-10 py-4 rounded-30 bg-light-primary text-primary">
                        Tag: &lt;p&gt;
                    </span>
                    <span className="mini-text font-600 px-10 py-4 rounded-30 bg-forth text-dark">
                        .{fontSizeClass}
                    </span>
                    <span className="mini-text text-gray">
                        {fontWeight} • {color}
                    </span>
                </div>
                <div className="overflow-x-auto py-8">
                    <p className={`${fontSizeClass} ${fontWeight} ${color}`}>
                        {text}
                    </p>
                </div>
            </div>

            {/* Complete Para Tags Font Size Specimen Table */}
            <div className="bg-white rounded-5 p-16">
                <h4 className="headmini-text font-600 text-dark mb-10">
                    Standard Para Tag Font Sizes Hierarchy
                </h4>
                <div className="grid-cols-1 gap-8">
                    {PARA_SPECIMENS.map((spec) => {
                        const isCurrent = fontSizeClass === spec.cls;
                        return (
                            <div
                                key={spec.cls}
                                className={`p-12 rounded-5 border flex flex-col md:flex-row md:items-center justify-between gap-12 ${isCurrent ? "border-primary bg-light-primary" : "border-ec bg-white"
                                    }`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-8 mb-4">
                                        <span className="mini-text font-600 text-primary">
                                            .{spec.cls}
                                        </span>
                                        <span className="mini-text text-gray">
                                            &lt;p&gt;
                                        </span>
                                        <span className="mini-text text-gray">
                                            • Desktop: {spec.desktop} • Mobile (≤640px): {spec.mobile}
                                        </span>
                                    </div>
                                    <p className={`${spec.cls} font-400 text-dark`}>
                                        {spec.sample}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});
ParaTypographyPreview.displayName = "ParaTypographyPreview";

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
                                    style={{ margin: 0, padding: "8px 10px" }}
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

// Interactive Magnify Preview Helper
const MagnifyDemoPreview = memo(({ values }) => {
    const rawSrc = values.imgSrc === "hero" ? heroImg : values.imgSrc === "sobo" ? soboLogo : dashImg;
    const imgSrc = resolveImagePath(rawSrc);
    const scale = Number(values.zoomScale) || 2.5;
    const zoomSize = Number(values.zoomSize) || 300;
    const position = values.zoomPosition || "right";

    return (
        <div className="flex items-center justify-center w-full relative">
            <Magnify
                src={imgSrc}
                alt="Demo magnify image"
                width="260px"
                height="200px"
                zoomWidth={zoomSize}
                zoomHeight={zoomSize}
                zoomScale={scale}
                zoomPosition={position}
                objectFit={values.objectFit || "cover"}
                borderRadius="8px"
            />
        </div>
    );
});
MagnifyDemoPreview.displayName = "MagnifyDemoPreview";

// Interactive Icon Library Preview Helper
const IconGalleryPreview = memo(({ values }) => {
    const [search, setSearch] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("Sparkles");
    const [copiedIcon, setCopiedIcon] = useState(null);

    const size = values.size || "24";
    const strokeWidth = values.strokeWidth || "2";
    const stroke = values.color || "#1e74db";

    const activeQuery = (search || values.search || "").toLowerCase().trim();

    const filteredIcons = useMemo(() => {
        if (!activeQuery) return ALL_ICONS;
        return ALL_ICONS.filter((name) => name.toLowerCase().includes(activeQuery));
    }, [activeQuery]);

    const handleCopy = useCallback((name) => {
        setSelectedIcon(name);
        setCopiedIcon(name);
        const snippet = `<Icon name="${name}" width="${size}" height="${size}" stroke="${stroke}" strokeWidth="${strokeWidth}" />`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(snippet);
            showToast(`Copied <Icon name="${name}" /> to clipboard!`, "success");
        }
        setTimeout(() => setCopiedIcon((curr) => (curr === name ? null : curr)), 1800);
    }, [size, stroke, strokeWidth]);

    return (
        <div className="w-full">
            <div className="overflow-y-auto h-350">
                {filteredIcons.length === 0 ? (
                    <div className="py-40 text-center">
                        <div className="head-text text-gray mb-6">🔍</div>
                        <h4 className="headmini-text font-600 text-dark">No icons found</h4>
                        <p className="mini-text text-gray mt-4">
                            No icon matches &quot;{search}&quot;. Try searching for &quot;home&quot;, &quot;user&quot;, &quot;arrow&quot;, or &quot;settings&quot;.
                        </p>
                    </div>
                ) : (
                    <div className="grid-cols-8 gap-12">
                        {filteredIcons.map((iconName) => {
                            const isSelected = selectedIcon === iconName;
                            const isJustCopied = copiedIcon === iconName;

                            return (
                                <div
                                    key={iconName}
                                    onClick={() => handleCopy(iconName)}
                                    title={`Click to copy: <Icon name="${iconName}" />`}
                                    className={`p-10 rounded-5 cursor-pointer border ${isSelected
                                        ? "border-primary bg-light-primary"
                                        : "border-ec bg-white"
                                        }`}
                                    style={{
                                        transition: "all 0.15s ease-in-out",
                                    }}
                                >
                                    <div className="flex items-center justify-center" style={{ height: "50px" }}>
                                        <Icon
                                            name={iconName}
                                            width={size}
                                            height={size}
                                            stroke={stroke}
                                            strokeWidth={strokeWidth}
                                        />
                                    </div>
                                    <p
                                        className={`mini-text text-center w-full pb-5 ${isSelected ? "text-primary font-500" : "text-dark font-500"
                                            }`}
                                    >
                                        {isJustCopied ? "✓ Copied!" : iconName}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
});
IconGalleryPreview.displayName = "IconGalleryPreview";

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

// Unified, reusable component playground block
const ComponentPlayground = memo(({ config }) => {
    const [values, setValues] = useState(config.defaultValues);
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

    const handleChange = useCallback((key, val) => {
        setValues((prev) => {
            const next = { ...prev, [key]: val };
            if (key === "tag") {
                if (val === "p") {
                    const paraValues = ["largepara-text", "headpara-text", "midpara-text", "para-text", "small-text", "mini-text"];
                    if (!paraValues.includes(prev.fontSizeClass)) {
                        next.fontSizeClass = "para-text";
                    }
                    if (prev.fontWeight === "font-600") {
                        next.fontWeight = "font-400";
                    }
                } else if (val === "h2") {
                    const headValues = ["largehead-text", "large-text", "head-text", "title-text", "mid-text", "headmini-text"];
                    if (!headValues.includes(prev.fontSizeClass)) {
                        next.fontSizeClass = "head-text";
                    }
                    if (prev.fontWeight === "font-400") {
                        next.fontWeight = "font-600";
                    }
                }
            }
            return next;
        });
    }, []);

    const activeFields = useMemo(() => {
        if (typeof config.getFields === "function") {
            return config.getFields(values);
        }
        return config.fields;
    }, [config, values]);

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
                    fields={activeFields}
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

    // Live preview render map
    const previews = useMemo(() => ({
        "head-text": (values) => <HeadTypographyPreview values={values} />,
        "para-text": (values) => <ParaTypographyPreview values={values} />,
        button: (values) => (
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
        tab: (values, { onValueChange }) => {
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
        steps: (values, { onValueChange }) => (
            <div className="w-full">
                <Steps
                    version={values.version}
                    currentStep={Number(values.currentStep)}
                    steps={STEP_LABELS}
                    onChange={(step) => onValueChange?.("currentStep", String(step))}
                />
            </div>
        ),
        breadcrumb: (values) => {
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
        pagination: (values, { onValueChange }) => (
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
        modal: (values) => <ModalDemoPreview values={values} />,
        toast: (values) => (
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
        skeleton: (values) => (
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
        dropdown: (values) => <DropdownDemoPreview values={values} />,
        tooltip: (values) => <TooltipDemoPreview values={values} />,
        avatar: (values) => {
            const rawImg = values.imgSrc === "initials" ? "" : values.imgSrc === "dash" ? dashImg : values.imgSrc === "hero" ? heroImg : soboLogo;
            const img = resolveImagePath(rawImg);
            if (values.mode === "group") {
                return (
                    <AvatarGroup
                        avatars={[resolveImagePath(dashImg), resolveImagePath(soboLogo), resolveImagePath(heroImg)]}
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
        accordion: (values) => (
            <div className="w-full px-8 max-h-[220px] overflow-y-auto">
                <Accordion
                    key={`${values.version || "v1"}-${values.allowMultiple}`}
                    items={ACCORDION_ITEMS}
                    version={values.version || "v1"}
                    allowMultiple={values.allowMultiple === true || values.allowMultiple === "true"}
                />
            </div>
        ),
        badge: (values) => {
            if (values.mode === "list") {
                const sampleTags = values.text
                    ? values.text.split(",").map((s) => s.trim()).filter(Boolean)
                    : ["Frontend", "Performance", "React 19", "Design System"];
                return (
                    <BadgeList
                        items={sampleTags}
                        color={values.color}
                        shape={values.shape}
                        size={values.size}
                    />
                );
            }
            const isRemovable = values.removable === true || values.removable === "true";
            return (
                <div className="flex flex-wrap items-center justify-center gap-12 py-10">
                    <Badge
                        text={values.text || "Active Member"}
                        color={values.color}
                        variant={values.variant}
                        shape={values.shape}
                        size={values.size}
                        icon={values.icon || undefined}
                        onRemove={isRemovable ? () => showToast(`Removed badge: ${values.text || "Active Member"}`, "info") : undefined}
                        onClick={() => showToast(`Badge clicked: ${values.text || "Active Member"}`, "info")}
                    />
                </div>
            );
        },
        magnify: (values) => <MagnifyDemoPreview values={values} />,
        table: (values) => (
            <div className="w-full">
                <TableLiveGrid values={values} />
            </div>
        ),
        icon: (values) => <IconGalleryPreview values={values} />,
    }), []);

    // Master components list
    const templateComponents = useMemo(() => getTemplateComponentsData(previews), [previews]);

    // Filter components by activeTab
    const visibleComponents = useMemo(() => {
        if (activeTab === "all") return templateComponents;
        return templateComponents.filter((comp) => comp.category === activeTab);
    }, [activeTab, templateComponents]);

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
