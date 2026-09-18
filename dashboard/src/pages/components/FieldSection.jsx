import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Fields from "../../components/forms/Fields";
import Icon from "../../components/common/Icon";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { showToast } from "../../components/common/Toast";
import { resolveImagePath, soboLogo } from "../../utils/imageResolver";

import {
    INITIAL_FORM_DATA,
    INITIAL_SETTINGS,
    SIDEBAR_ITEMS,
    TABS,
    SIDEBAR_TO_TAB,
    FIELD_SECTIONS_DATA,
    PLAYGROUND_CONTROL_FIELDS,
    generateFieldCode,
    generateSectionCode,
} from "./data/field";

// Reusable Code Preview & Copy Modal (consistent with TemplateSection.jsx)
const ComponentCodeModal = memo(({ isOpen, onClose, title, code, onCopy }) => {
    if (!isOpen) return null;
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title='Preview'
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
            <div className="relative bg-dark px-16 py-2 rounded-5  overflow-auto h-250">
                <pre className="mini-text text-white" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    <code>{code}</code>
                </pre>
            </div>
        </Modal>
    );
});
ComponentCodeModal.displayName = "ComponentCodeModal";

// Memoized Section Card Wrapper with Copy Code Action
const SectionCard = memo(({ title, subtitle, icon, count, onCopyCode, children }) => (
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
            <div className="flex items-center gap-8">
                {onCopyCode && (
                    <div
                        onClick={onCopyCode}
                        className="cursor-pointer flex items-center gap-5 py-4 px-10 rounded-5 bg-light-primary text-primary hover-bg-primary hover-text-white transition-all font-500 mini-text"
                        title="View & Copy Section Code"
                    >
                        <Icon name="CopyLink" width="14" height="14" stroke="currentColor" />
                        <span>Copy Code</span>
                    </div>
                )}
                {count !== undefined && (
                    <p className="mini-text font-500 px-14 py-7 rounded-30 bg-forth text-gray">
                        {count} Controls
                    </p>
                )}
            </div>
        </div>
        <div className="py-14">
            {children}
        </div>
    </div>
));
SectionCard.displayName = "SectionCard";

// Memoized Filter Drawer Content for MainLayout filterInputs
const FilterDrawerContent = memo(({ settings, onSettingChange }) => (
    <div className="grid-cols-4 gap-12">
        {PLAYGROUND_CONTROL_FIELDS.map((ctrl) => (
            <Fields
                key={ctrl.name}
                type={ctrl.type}
                label={ctrl.label}
                options={ctrl.options}
                value={settings[ctrl.name]}
                onChange={(val) => {
                    const parsedVal =
                        val === "true" || val === true
                            ? true
                            : val === "false" || val === false
                                ? false
                                : val;
                    onSettingChange(ctrl.name, parsedVal);
                }}
            />
        ))}
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

// Main FieldSection Component
const FieldSection = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [settings, setSettings] = useState(INITIAL_SETTINGS);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Fields");
    const [codeModal, setCodeModal] = useState({ isOpen: false, title: "", code: "" });

    // Field change handler
    const handleFieldChange = useCallback((fieldName, value) => {
        setFormData((prev) => {
            const next = { ...prev, [fieldName]: value };
            if (fieldName === "avatarFile") {
                if (value && value.length > 0 && value[0] instanceof Blob) {
                    next.avatarPreview = URL.createObjectURL(value[0]);
                } else {
                    next.avatarPreview = resolveImagePath(soboLogo);
                }
            }
            return next;
        });
    }, []);

    // Playground settings change handler
    const handleSettingChange = useCallback((key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleResetSettings = useCallback(() => {
        setSettings(INITIAL_SETTINGS);
        showToast("Settings reset to defaults!", "info");
    }, []);

    // Code Modal openers
    const handleOpenSectionCode = useCallback((section) => {
        const code = generateSectionCode(section, settings, formData);
        setCodeModal({
            isOpen: true,
            title: `${section.title} JSX Code`,
            code,
        });
    }, [settings, formData]);

    const handleOpenFieldCode = useCallback((field) => {
        const code = generateFieldCode(field, settings, formData[field.name]);
        setCodeModal({
            isOpen: true,
            title: `<Fields type="${field.type}" /> Code`,
            code,
        });
    }, [settings, formData]);

    const handleCopyCode = useCallback(() => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(codeModal.code);
            showToast("Field JSX code copied to clipboard!", "success");
        }
    }, [codeModal.code]);

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

    const hasActiveFilters = useMemo(() => {
        return (
            settings.version !== INITIAL_SETTINGS.version ||
            settings.outline !== INITIAL_SETTINGS.outline ||
            settings.disabled !== INITIAL_SETTINGS.disabled ||
            settings.showErrors !== INITIAL_SETTINGS.showErrors
        );
    }, [settings]);

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                settings={settings}
                onSettingChange={handleSettingChange}
            />
        ),
        [settings, handleSettingChange]
    );

    return (
        <MainLayout
            sidebarTitle="Categories"
            sidebarItems={SIDEBAR_ITEMS}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Clipboard" width="18" height="18" />}
            headerTitle="Form Fields Showcase"
            headerSub="Interactive preview and live playground for all dashboard form input components"
            quickAction=""
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Toggle field versions (v1 default, v2 pill, v3 soft, v4 underline), outline borders, and validation states"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleResetSettings}
            defaultShowFilters={false}
        >
            {/* Sections List */}
            {visibleSections.map((section) => (
                <SectionCard
                    key={section.type}
                    title={section.title}
                    subtitle={section.subtitle}
                    icon={section.icon}
                    count={section.fields.length}
                    onCopyCode={() => handleOpenSectionCode(section)}
                >
                    <div className="grid-cols-3 items-start gap-12">
                        {section.fields.map((field, idx) => (
                            <div key={`${field.name}-${idx}`} className={field.gridClass || ""}>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="mini-text font-500 text-gray">
                                        {field.label}
                                        {field.required && <span className="text-danger ml-2">*</span>}
                                    </label>
                                    <div
                                        onClick={() => handleOpenFieldCode(field)}
                                        className="cursor-pointer text-gray hover-text-primary p-2 transition-all flex items-center"
                                        title={`View & Copy JSX for ${field.label || field.name}`}
                                    >
                                        <Icon name="CopyLink" width="13" height="13" stroke="currentColor" />
                                    </div>
                                </div>
                                <Fields
                                    type={field.type}
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

            {/* JSX Code Modal */}
            <ComponentCodeModal
                isOpen={codeModal.isOpen}
                onClose={() => setCodeModal((prev) => ({ ...prev, isOpen: false }))}
                title={codeModal.title}
                code={codeModal.code}
                onCopy={handleCopyCode}
            />
        </MainLayout>
    );
};

export default memo(FieldSection);