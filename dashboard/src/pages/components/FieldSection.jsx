import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Fields from "../../components/forms/Fields";
import Icon from "../../components/common/Icon";

// Initial state for all form fields
const INITIAL_FORM_DATA = {
    fullName: "Alex Morgan",
    userAge: 28,
    emailAddress: "alex.morgan@example.com",
    phoneNumber: "+1 (555) 234-5678",
    accountPassword: "Password123!",
    websiteUrl: "https://example.com",
    bioNotes: "Senior UI/UX Engineer specialized in scalable design systems, modular dashboard architectures, and high-performance component state rendering.",
    selectedCategory: "design",
    assignedTags: ["react", "ui_ux"],
    preferredContact: "email",
    notifyChannels: ["email", "push"],
    isAccountActive: true,
    launchDate: "2026-09-15",
    campaignDateRange: { fromDate: "2026-09-01", toDate: "2026-09-25" },
    brandColor: "#1e74db",
    avatarFile: null,
    projectFiles: [],
    orderQuantity: 3,
    productRating: 5,
    verificationCode: "749201",
    priceBudget: 45000,
};

// Initial state for playground settings
const INITIAL_SETTINGS = {
    version: "v3",
    outline: false,
    disabled: false,
    showErrors: false,
};

// Sidebar Categories
const SIDEBAR_ITEMS = [
    { name: "All Fields", icon: "Grid", count: 22, color: "#1e74db" },
    { name: "Basic Inputs", icon: "Edit", count: 8, color: "#10b981" },
    { name: "Selections", icon: "Check", count: 5, color: "#f59e0b" },
    { name: "Pickers", icon: "Calendar", count: 3, color: "#8b5cf6" },
    { name: "File Uploads", icon: "Upload", count: 2, color: "#ec4899" },
    { name: "Interactive", icon: "Settings", count: 4, color: "#6366f1" },
];

// Tabs
const TABS = [
    { name: "All Fields", value: "all" }
];

// Mapping sidebar item name to tab value
const SIDEBAR_TO_TAB = {
    "All Fields": "all",
    "Basic Inputs": "basic",
    "Selections": "selections",
    "Pickers": "pickers",
    "File Uploads": "uploads",
    "Interactive": "interactive",
};

// Master Form Fields Data Array with `type` flag
const FIELD_SECTIONS_DATA = [
    {
        type: "basic",
        title: "Text & Numeric Inputs",
        subtitle: "Standard textual inputs with validation, icons, and specialized formatting",
        icon: "Edit",
        fields: [
            { name: "fullName", type: "text", label: "Name", placeholder: "Enter name", required: true },
            { name: "fullName", type: "text", label: "Full Name", placeholder: "Enter full name", icon: "Users", iconPosition: "left", required: true },
            { name: "userAge", type: "number", label: "Age", placeholder: "e.g. 28" },
            { name: "emailAddress", type: "email", label: "Email Address", placeholder: "user@example.com", icon: "Mail", iconPosition: "left", required: true },
            { name: "phoneNumber", type: "tel", label: "Phone Number", placeholder: "+1 (555) 000-0000", icon: "Phone", iconPosition: "left" },
            { name: "accountPassword", type: "password", label: "Account Password", placeholder: "Enter password" },
            { name: "websiteUrl", type: "url", label: "Website or Portfolio URL", placeholder: "https://example.com" },
            { name: "bioNotes", type: "textarea", label: "Professional Bio / Notes", placeholder: "Tell us a little about your background...", style: { width: "95%" } },
        ],
    },
    {
        type: "selections",
        title: "Dropdowns, Toggles & Choices",
        subtitle: "Single and multi-select dropdowns, radio lists, checkboxes and switches",
        icon: "Check",
        fields: [
            {
                name: "selectedCategory",
                type: "select",
                label: "Primary Discipline (Single Select)",
                options: [
                    { label: "UI / UX Design", value: "design" },
                    { label: "Frontend Engineering", value: "frontend" },
                    { label: "Backend Architecture", value: "backend" },
                    { label: "DevOps & Cloud", value: "devops" },
                ],
            },
            {
                name: "assignedTags",
                type: "multiselect",
                label: "Skill Tags (Multi-Select)",
                options: [
                    { label: "React", value: "react" },
                    { label: "TypeScript", value: "ts" },
                    { label: "UI/UX Design", value: "ui_ux" },
                    { label: "Tailwind / CSS", value: "css" },
                    { label: "Next.js", value: "next" },
                ],
            },
            {
                name: "preferredContact",
                type: "radio",
                label: "Preferred Communication Method",
                options: [
                    { label: "Email Contact", value: "email" },
                    { label: "Phone Call", value: "phone" },
                    { label: "SMS Messages", value: "sms" },
                ],
            },
            {
                name: "notifyChannels",
                type: "checkbox",
                label: "Notification Channels",
                options: [
                    { label: "Email Notifications", value: "email" },
                    { label: "Weekly Digest", value: "digest" },
                ],
            },
            {
                name: "isAccountActive",
                type: "switch",
                label: "Toggle Switch",
            },
        ],
    },
    {
        type: "pickers",
        title: "Date & Color Pickers",
        subtitle: "Interactive calendar date selection, date range spans and hex color pickers",
        icon: "Calendar",
        fields: [
            { name: "launchDate", type: "datepicker", label: "Project Launch Date" },
            { name: "campaignDateRange", type: "range-datepicker", label: "Campaign Date Span (From ➔ To)" },
            { name: "brandColor", type: "color", label: "Brand Theme Color", gridClass: "grid-full" },
        ],
    },
    {
        type: "uploads",
        title: "File & Media Uploaders",
        subtitle: "Standard file input and full multi-file drag-and-drop dropzones",
        icon: "Upload",
        fields: [
            { name: "avatarFile", type: "file", label: "Profile Avatar (Single File Upload)" },
            { name: "projectFiles", type: "dragfile", label: "Project Documentation & Media Assets (Drag & Drop Zone)" },
        ],
    },
    {
        type: "interactive",
        title: "Interactive & Specialized Controls",
        subtitle: "Counters, star ratings, OTP pins and dynamic range sliders",
        icon: "Settings",
        fields: [
            { name: "orderQuantity", type: "quantity", label: "Order Quantity Stepper", min: 1, max: 50, step: 1 },
            { name: "productRating", type: "rating", label: "Product Satisfaction Rating" },
            { name: "verificationCode", type: "otp", label: "6-Digit Verification Code (OTP)", otpCount: 6 },
            { name: "priceBudget", type: "slider", label: "Budget Range Allocation", min: 5000, max: 100000, step: 1000 },
        ],
    },
];

// Memoized Section Card Wrapper
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
                    {count} Controls
                </p>
            )}
        </div>
        <div className="py-14">
            {children}
        </div>
    </div>
));
SectionCard.displayName = "SectionCard";

// Main FieldSection Component
const FieldSection = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [settings] = useState(INITIAL_SETTINGS);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Fields");

    // Field change handler
    const handleFieldChange = useCallback((fieldName, value) => {
        setFormData((prev) => ({ ...prev, [fieldName]: value }));
    }, []);

    // Sidebar item click handler
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        const mappedTab = SIDEBAR_TO_TAB[name];
        if (mappedTab) setActiveTab(mappedTab);
    }, []);

    // Tab change handler
    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        const foundEntry = Object.entries(SIDEBAR_TO_TAB).find(([, val]) => val === tabValue);
        if (foundEntry) setSelectedCategory(foundEntry[0]);
    }, []);

    // Filtered sections according to activeTab
    const visibleSections = useMemo(() => {
        return FIELD_SECTIONS_DATA.filter(
            (sec) => activeTab === "all" || sec.type === activeTab
        );
    }, [activeTab]);

    return (
        <MainLayout
            sidebarTitle="Categories"
            sidebarItems={SIDEBAR_ITEMS}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Inventory" width="18" height="18" />}
            headerTitle="Form Fields Showcase"
            headerSub="Interactive preview and live playground for all dashboard form input components"
            quickAction=""
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            filterInputs=''
            onTabChange={handleTabChange}
        >
            {visibleSections.map((section) => (
                <SectionCard
                    key={section.type}
                    title={section.title}
                    subtitle={section.subtitle}
                    icon={section.icon}
                    count={section.fields.length}
                >
                    <div className="grid-cols-3 items-start gap-12">
                        {section.fields.map((field, idx) => (
                            <div key={`${field.name}-${idx}`} className={field.gridClass || ""}>
                                <Fields
                                    type={field.type}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    icon={field.icon}
                                    iconPosition={field.iconPosition}
                                    options={field.options}
                                    min={field.min}
                                    max={field.max}
                                    step={field.step}
                                    otpCount={field.otpCount}
                                    value={formData[field.name]}
                                    onChange={(val) => handleFieldChange(field.name, val)}
                                    version={settings.version}
                                    outline={settings.outline}
                                    disabled={settings.disabled}
                                    error={settings.showErrors && field.required && !formData[field.name] ? `${field.label} is required` : ""}
                                    style={field.style}
                                />
                            </div>
                        ))}
                    </div>
                </SectionCard>
            ))}
        </MainLayout>
    );
};

export default memo(FieldSection);