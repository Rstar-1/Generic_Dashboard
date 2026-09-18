import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Image from "../../components/common/Image";
import Modal from "../../components/common/Modal";
import { showToast } from "../../components/common/Toast";
import { resolveImagePath } from "../../utils/imageResolver";

import {
    SIDEBAR_ITEMS,
    TABS,
    SIDEBAR_TO_TAB,
    SECTIONS_DATA,
    generateSectionCode,
    generateItemCode,
} from "./data/section";

const ComponentCodeModal = memo(({ isOpen, onClose, title, code, onCopy }) => {
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

// Memoized Section Card Container with Copy Code Action
const SectionCard = memo(({ title, subtitle, badge, onCopyCode, children }) => (
    <div className="bg-white rounded-5 p-16 mb-14">
        <div className="flex items-center justify-between bordb pb-10">
            <div>
                <h3 className="headmini-text font-600 text-dark">{title}</h3>
                {subtitle && <p className="mini-text text-gray">{subtitle}</p>}
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
                <p className="mini-text font-500 px-14 py-7 rounded-30 bg-forth text-gray">
                    {badge}
                </p>
            </div>
        </div>
        <div className="py-14">
            {children}
        </div>
    </div>
));
SectionCard.displayName = "SectionCard";

// Enhanced Image Card with Hover Elevation, Copy Action & Modal Preview
const SectionImageCard = memo(({ item, onPreview, onCopyCode }) => (
    <div
        className="relative overflow-hidden cursor-pointer bg-dark p-12 rounded-5"
        onClick={() => onPreview?.(item)}
    >
        <Image
            src={resolveImagePath(item.image)}
            alt={item.title || "Section preview"}
            className="w-full h-200 object-contain flex"
        />
        <div className="absolute top-0 right-0 m-10 flex items-center gap-6">
            {onCopyCode && (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        onCopyCode(item);
                    }}
                    className="p-4 rounded-4 bg-white text-dark hover-text-primary cursor-pointer transition-all flex items-center justify-center shadow-sm"
                    title="View & Copy Variant Code"
                >
                    <Icon name="CopyLink" width="13" height="13" stroke="currentColor" />
                </div>
            )}
            <p className="mini-text font-600 px-8 py-4 rounded-20 bg-white text-dark">
                {item.badge}
            </p>
        </div>
    </div>
));
SectionImageCard.displayName = "SectionImageCard";

// Main Section Component
const Section = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Sections");
    const [previewItem, setPreviewItem] = useState(null);
    const [codeModal, setCodeModal] = useState({ isOpen: false, title: "", code: "" });

    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        const mappedTab = SIDEBAR_TO_TAB[name];
        if (mappedTab) setActiveTab(mappedTab);
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        const foundEntry = Object.entries(SIDEBAR_TO_TAB).find(([, val]) => val === tabValue);
        if (foundEntry) setSelectedCategory(foundEntry[0]);
    }, []);

    const handlePreview = useCallback((item) => {
        setPreviewItem(item);
    }, []);

    // Code Modal handlers
    const handleOpenSectionCode = useCallback((section) => {
        const code = generateSectionCode(section);
        setCodeModal({
            isOpen: true,
            title: `${section.title} JSX Code`,
            code,
        });
    }, []);

    const handleOpenItemCode = useCallback((item, section) => {
        const code = generateItemCode(item, section);
        setCodeModal({
            isOpen: true,
            title: `${section.title || "Section"} (${item.badge || "Variant"}) Code`,
            code,
        });
    }, []);

    const handleCopyCode = useCallback(() => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(codeModal.code);
            showToast("Section JSX code copied to clipboard!", "success");
        }
    }, [codeModal.code]);

    // Filter master array by activeTab
    const filteredSections = useMemo(() => {
        return SECTIONS_DATA.filter((sec) => activeTab === "all" || sec.type === activeTab);
    }, [activeTab]);

    return (
        <MainLayout
            sidebarTitle="Section Groups"
            sidebarItems={SIDEBAR_ITEMS}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Layers" width="18" height="18" />}
            headerTitle="UI Sections Library"
            headerSub="Explore, preview, and configure modular UI layout sections for responsive modern applications"
            quickAction=""
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            filterInputs=""
            onTabChange={handleTabChange}
        >
            {filteredSections.map((section) => (
                <SectionCard
                    key={section.type}
                    title={section.title}
                    subtitle={section.subtitle}
                    badge={`${section.items.length} ${section.items.length > 1 ? "Variants" : "Variant"}`}
                    onCopyCode={() => handleOpenSectionCode(section)}
                >
                    <div className="grid-cols-3 gap-12">
                        {section.items.map((item, idx) => (
                            <SectionImageCard
                                key={idx}
                                item={item}
                                onPreview={handlePreview}
                                onCopyCode={() => handleOpenItemCode(item, section)}
                            />
                        ))}
                    </div>
                </SectionCard>
            ))}

            {/* Section Image Preview Modal */}
            {previewItem && (
                <Modal
                    isOpen={Boolean(previewItem)}
                    onClose={() => setPreviewItem(null)}
                    title="Section Preview"
                    size="md"
                >
                    <div className="bg-dark px-12 rounded-10">
                        <Image
                            src={resolveImagePath(previewItem.image)}
                            alt={previewItem.title || "Section preview"}
                            className="w-full h-250 object-contain"
                        />
                    </div>
                </Modal>
            )}

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

export default memo(Section);
