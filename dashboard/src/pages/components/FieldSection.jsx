import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Fields from "../../components/forms/Fields";
import Button from "../../components/common/Button";
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
    version: "v2",
    outline: false,
    disabled: false,
    showErrors: false,
};

// Sidebar Categories
const SIDEBAR_ITEMS = [
    { name: "All Fields", icon: "Grid", count: 18, color: "#1e74db" },
    { name: "Basic Inputs", icon: "Edit", count: 7, color: "#10b981" },
    { name: "Selections", icon: "Check", count: 5, color: "#f59e0b" },
    { name: "Pickers", icon: "Calendar", count: 3, color: "#8b5cf6" },
    { name: "File Uploads", icon: "Upload", count: 2, color: "#ec4899" },
    { name: "Interactive", icon: "Settings", count: 4, color: "#6366f1" },
];

// Tabs
const TABS = [
    { name: "All Fields", value: "all" },
    { name: "Basic Inputs", value: "basic" },
    { name: "Selections", value: "selections" },
    { name: "Pickers", value: "pickers" },
    { name: "File Uploads", value: "uploads" },
    { name: "Interactive", value: "interactive" },
    { name: "Live JSON", value: "json" },
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

// Memoized Section Card Wrapper
const SectionCard = memo(({ title, subtitle, icon, count, children }) => (
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
            {count !== undefined && (
                <span className="mini-text font-600 px-8 py-2 rounded-20 bg-forth text-primary">
                    {count} Controls
                </span>
            )}
        </div>
        {children}
    </div>
));
SectionCard.displayName = "SectionCard";

// Memoized 1. Basic Inputs Card
const BasicInputsCard = memo(({ formData, onChange, settings }) => (
    <SectionCard
        title="Text & Numeric Inputs"
        subtitle="Standard textual inputs with validation, icons, and specialized formatting"
        icon="Edit"
        count={7}
    >
        <div className="grid-cols-2 gap-16">
            <Fields
                type="text"
                label="Full Name"
                placeholder="Enter full name"
                icon="Users"
                iconPosition="left"
                value={formData.fullName}
                onChange={(val) => onChange("fullName", val)}
                version={settings.version}
                outline={settings.outline}
                disabled={settings.disabled}
                error={settings.showErrors && !formData.fullName ? "Full name is required" : ""}
            />
            <Fields
                type="number"
                label="Age"
                placeholder="e.g. 28"
                value={formData.userAge}
                onChange={(val) => onChange("userAge", val)}
                version={settings.version}
                outline={settings.outline}
                disabled={settings.disabled}
            />
            <Fields
                type="email"
                label="Email Address"
                placeholder="user@example.com"
                icon="Mail"
                iconPosition="left"
                value={formData.emailAddress}
                onChange={(val) => onChange("emailAddress", val)}
                version={settings.version}
                outline={settings.outline}
                disabled={settings.disabled}
                error={settings.showErrors && !formData.emailAddress ? "Email address is required" : ""}
            />
            <Fields
                type="tel"
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                icon="Phone"
                iconPosition="left"
                value={formData.phoneNumber}
                onChange={(val) => onChange("phoneNumber", val)}
                version={settings.version}
                outline={settings.outline}
                disabled={settings.disabled}
            />
            <Fields
                type="password"
                label="Account Password"
                placeholder="Enter password"
                value={formData.accountPassword}
                onChange={(val) => onChange("accountPassword", val)}
                version={settings.version}
                outline={settings.outline}
                disabled={settings.disabled}
            />
            <Fields
                type="url"
                label="Website or Portfolio URL"
                placeholder="https://example.com"
                value={formData.websiteUrl}
                onChange={(val) => onChange("websiteUrl", val)}
                version={settings.version}
                outline={settings.outline}
                disabled={settings.disabled}
            />
            <div className="grid-full">
                <Fields
                    type="textarea"
                    label="Professional Bio / Notes"
                    placeholder="Tell us a little about your background..."
                    value={formData.bioNotes}
                    onChange={(val) => onChange("bioNotes", val)}
                    version={settings.version}
                    outline={settings.outline}
                    disabled={settings.disabled}
                />
            </div>
        </div>
    </SectionCard>
));
BasicInputsCard.displayName = "BasicInputsCard";

// Memoized 2. Selections Card
const SelectionsCard = memo(({ formData, onChange, settings }) => {
    const categoryOptions = useMemo(
        () => [
            { label: "UI / UX Design", value: "design" },
            { label: "Frontend Engineering", value: "frontend" },
            { label: "Backend Architecture", value: "backend" },
            { label: "DevOps & Cloud", value: "devops" },
        ],
        []
    );

    const tagOptions = useMemo(
        () => [
            { label: "React", value: "react" },
            { label: "TypeScript", value: "ts" },
            { label: "UI/UX Design", value: "ui_ux" },
            { label: "Tailwind / CSS", value: "css" },
            { label: "Next.js", value: "next" },
        ],
        []
    );

    const contactOptions = useMemo(
        () => [
            { label: "Email Contact", value: "email" },
            { label: "Phone Call", value: "phone" },
            { label: "SMS Messages", value: "sms" },
        ],
        []
    );

    const channelOptions = useMemo(
        () => [
            { label: "Email Notifications", value: "email" },
            { label: "Push Notifications", value: "push" },
            { label: "Weekly Digest", value: "digest" },
        ],
        []
    );

    return (
        <SectionCard
            title="Dropdowns, Toggles & Choices"
            subtitle="Single and multi-select dropdowns, radio lists, checkboxes and switches"
            icon="Check"
            count={5}
        >
            <div className="grid-cols-2 gap-16">
                <Fields
                    type="select"
                    label="Primary Discipline (Single Select)"
                    options={categoryOptions}
                    value={formData.selectedCategory}
                    onChange={(val) => onChange("selectedCategory", val)}
                    version={settings.version}
                    outline={settings.outline}
                    disabled={settings.disabled}
                />
                <Fields
                    type="multiselect"
                    label="Skill Tags (Multi-Select)"
                    options={tagOptions}
                    value={formData.assignedTags}
                    onChange={(val) => onChange("assignedTags", val)}
                    version={settings.version}
                    outline={settings.outline}
                    disabled={settings.disabled}
                />
                <Fields
                    type="radio"
                    label="Preferred Communication Method"
                    options={contactOptions}
                    value={formData.preferredContact}
                    onChange={(val) => onChange("preferredContact", val)}
                    version={settings.version}
                    disabled={settings.disabled}
                />
                <Fields
                    type="checkbox"
                    label="Notification Channels"
                    options={channelOptions}
                    value={formData.notifyChannels}
                    onChange={(val) => onChange("notifyChannels", val)}
                    version={settings.version}
                    disabled={settings.disabled}
                />
                <div className="grid-full pt-4">
                    <div className="flex items-center justify-between p-12 rounded-5 bg-forth bord">
                        <div>
                            <p className="small-text font-600 text-dark">Account Status Toggle</p>
                            <p className="mini-text text-gray">Toggle account visibility and live production access</p>
                        </div>
                        <Fields
                            type="switch"
                            value={formData.isAccountActive}
                            onChange={(val) => onChange("isAccountActive", val)}
                            disabled={settings.disabled}
                        />
                    </div>
                </div>
            </div>
        </SectionCard>
    );
});
SelectionsCard.displayName = "SelectionsCard";

// Memoized 3. Pickers Card
const PickersCard = memo(({ formData, onChange, settings }) => (
    <SectionCard
        title="Date & Color Pickers"
        subtitle="Interactive calendar date selection, date range spans and hex color pickers"
        icon="Calendar"
        count={3}
    >
        <div className="grid-cols-2 gap-16">
            <Fields
                type="datepicker"
                label="Project Launch Date"
                value={formData.launchDate}
                onChange={(val) => onChange("launchDate", val)}
                version={settings.version}
                outline={settings.outline}
                disabled={settings.disabled}
            />
            <Fields
                type="range-datepicker"
                label="Campaign Date Span (From ➔ To)"
                value={formData.campaignDateRange}
                onChange={(val) => onChange("campaignDateRange", val)}
                version={settings.version}
                outline={settings.outline}
                disabled={settings.disabled}
            />
            <div className="grid-full">
                <Fields
                    type="color"
                    label="Brand Theme Color"
                    value={formData.brandColor}
                    onChange={(val) => onChange("brandColor", val)}
                    version={settings.version}
                    outline={settings.outline}
                    disabled={settings.disabled}
                />
            </div>
        </div>
    </SectionCard>
));
PickersCard.displayName = "PickersCard";

// Memoized 4. Uploads Card
const UploadsCard = memo(({ formData, onChange, settings }) => (
    <SectionCard
        title="File & Media Uploaders"
        subtitle="Standard file input and full multi-file drag-and-drop dropzones"
        icon="Upload"
        count={2}
    >
        <div className="grid-cols-1 gap-16">
            <Fields
                type="file"
                label="Profile Avatar (Single File Upload)"
                value={formData.avatarFile}
                onChange={(val) => onChange("avatarFile", val)}
                version={settings.version}
                outline={settings.outline}
                disabled={settings.disabled}
            />
            <Fields
                type="dragfile"
                label="Project Documentation & Media Assets (Drag & Drop Zone)"
                value={formData.projectFiles}
                onChange={(val) => onChange("projectFiles", val)}
                version={settings.version}
                outline={settings.outline}
                disabled={settings.disabled}
            />
        </div>
    </SectionCard>
));
UploadsCard.displayName = "UploadsCard";

// Memoized 5. Interactive & Special Card
const InteractiveCard = memo(({ formData, onChange, settings }) => (
    <SectionCard
        title="Interactive & Specialized Controls"
        subtitle="Counters, star ratings, OTP pins and dynamic range sliders"
        icon="Settings"
        count={4}
    >
        <div className="grid-cols-2 gap-16">
            <div>
                <label className="mini-text font-500 text-gray mb-6 block">Order Quantity Stepper</label>
                <Fields
                    type="quantity"
                    min={1}
                    max={50}
                    step={1}
                    value={formData.orderQuantity}
                    onChange={(val) => onChange("orderQuantity", val)}
                    version={settings.version}
                    disabled={settings.disabled}
                />
            </div>
            <div>
                <label className="mini-text font-500 text-gray mb-6 block">Product Satisfaction Rating</label>
                <Fields
                    type="rating"
                    value={formData.productRating}
                    onChange={(val) => onChange("productRating", val)}
                    disabled={settings.disabled}
                />
            </div>
            <div className="grid-full">
                <label className="mini-text font-500 text-gray mb-6 block">6-Digit Verification Code (OTP)</label>
                <Fields
                    type="otp"
                    otpCount={6}
                    value={formData.verificationCode}
                    onChange={(val) => onChange("verificationCode", val)}
                    disabled={settings.disabled}
                />
            </div>
            <div className="grid-full">
                <Fields
                    type="slider"
                    label="Budget Range Allocation"
                    min={5000}
                    max={100000}
                    step={1000}
                    value={formData.priceBudget}
                    onChange={(val) => onChange("priceBudget", val)}
                    disabled={settings.disabled}
                />
            </div>
        </div>
    </SectionCard>
));
InteractiveCard.displayName = "InteractiveCard";

// Memoized 6. Live JSON State Card
const LiveJsonCard = memo(({ formData, onCopy, copied }) => (
    <SectionCard
        title="Live Form State JSON"
        subtitle="Real-time synchronized data model capturing all field updates"
        icon="FileText"
    >
        <div className="relative">
            <div className="flex justify-between items-center mb-8">
                <span className="mini-text text-gray">Format: application/json</span>
                <Button
                    text={copied ? "Copied to Clipboard!" : "Copy JSON"}
                    version="v0"
                    bg={copied ? "success" : "primary"}
                    onClick={onCopy}
                />
            </div>
            <pre
                className="p-16 rounded-8 bg-dark text-white mini-text overflow-auto font-mono"
                style={{ maxHeight: 380, lineHeight: 1.6 }}
            >
                {JSON.stringify(formData, null, 2)}
            </pre>
        </div>
    </SectionCard>
));
LiveJsonCard.displayName = "LiveJsonCard";

// Memoized 7. Filter Drawer Inputs
const FilterDrawerContent = memo(({ settings, onSettingChange }) => {
    const versionOptions = useMemo(
        () => [
            { label: "Version 1 (v1)", value: "v1" },
            { label: "Version 2 (v2)", value: "v2" },
            { label: "Version 3 (v3)", value: "v3" },
            { label: "Version 4 (v4)", value: "v4" },
        ],
        []
    );

    return (
        <div className="grid-cols-4 gap-12">
            <Fields
                type="select"
                options={versionOptions}
                value={settings.version}
                onChange={(val) => onSettingChange("version", val)}
            />
        </div>
    );
});
FilterDrawerContent.displayName = "FilterDrawerContent";

// Main FieldSection Component
const FieldSection = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [settings, setSettings] = useState(INITIAL_SETTINGS);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Fields");
    const [copied, setCopied] = useState(false);

    // Field change handler wrapped in useCallback
    const handleFieldChange = useCallback((fieldName, value) => {
        setFormData((prev) => ({ ...prev, [fieldName]: value }));
    }, []);

    // Setting change handler wrapped in useCallback
    const handleSettingChange = useCallback((settingKey, value) => {
        setSettings((prev) => ({ ...prev, [settingKey]: value }));
    }, []);

    // Reset form handler
    const handleResetForm = useCallback(() => {
        setFormData(INITIAL_FORM_DATA);
    }, []);

    // Clear playground filters handler
    const handleClearFilters = useCallback(() => {
        setSettings(INITIAL_SETTINGS);
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

    // Copy JSON handler
    const handleCopyJson = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(formData, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [formData]);

    // Check if active filters exist
    const hasActiveFilters = useMemo(
        () =>
            settings.version !== INITIAL_SETTINGS.version ||
            settings.outline !== INITIAL_SETTINGS.outline ||
            settings.disabled !== INITIAL_SETTINGS.disabled ||
            settings.showErrors !== INITIAL_SETTINGS.showErrors,
        [settings]
    );

    // Filter drawer component
    const filterInputsNode = useMemo(
        () => <FilterDrawerContent settings={settings} onSettingChange={handleSettingChange} />,
        [settings, handleSettingChange]
    );

    // Quick Action Buttons
    const quickActionNode = useMemo(
        () => (
            <div className="flex items-center gap-8">
                <Button
                    text="Reset All"
                    version="v2"
                    bg="white"
                    color="gray"
                    border="tertiary"
                    icon="Rotate"
                    onClick={handleResetForm}
                    title="Reset form fields to original defaults"
                />
                <Button
                    text={copied ? "Copied!" : "Copy JSON"}
                    version="v2"
                    bg="primary"
                    color="white"
                    icon="FileText"
                    onClick={handleCopyJson}
                    title="Copy live JSON state to clipboard"
                />
            </div>
        ),
        [copied, handleResetForm, handleCopyJson]
    );

    return (
        <MainLayout
            sidebarTitle="Categories"
            sidebarItems={SIDEBAR_ITEMS}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="FileText" width="18" height="18" />}
            headerTitle="Form Fields Showcase"
            headerSub="Interactive preview and live playground for all dashboard form input components"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Customize live field styling version, borders, and interaction states"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            {/* 1. Basic Inputs */}
            {(activeTab === "all" || activeTab === "basic") && (
                <BasicInputsCard formData={formData} onChange={handleFieldChange} settings={settings} />
            )}

            {/* 2. Selections & Choices */}
            {(activeTab === "all" || activeTab === "selections") && (
                <SelectionsCard formData={formData} onChange={handleFieldChange} settings={settings} />
            )}

            {/* 3. Pickers & Calendars */}
            {(activeTab === "all" || activeTab === "pickers") && (
                <PickersCard formData={formData} onChange={handleFieldChange} settings={settings} />
            )}

            {/* 4. File Uploads */}
            {(activeTab === "all" || activeTab === "uploads") && (
                <UploadsCard formData={formData} onChange={handleFieldChange} settings={settings} />
            )}

            {/* 5. Interactive & Special */}
            {(activeTab === "all" || activeTab === "interactive") && (
                <InteractiveCard formData={formData} onChange={handleFieldChange} settings={settings} />
            )}

            {/* 6. Live State JSON */}
            {(activeTab === "all" || activeTab === "json") && (
                <LiveJsonCard formData={formData} onCopy={handleCopyJson} copied={copied} />
            )}
        </MainLayout>
    );
};

export default memo(FieldSection);