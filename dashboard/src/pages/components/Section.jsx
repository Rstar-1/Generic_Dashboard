import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import Image from "../../components/common/Image";
import Modal from "../../components/common/Modal";
import { showToast } from "../../components/common/Toast";

// Assets imports
import CROSY from "../../assets/CROSY.png";
import DSBKO from "../../assets/DSBKO.png";
import SPLEDO from "../../assets/SPLEDO.png";
import ENGIN from "../../assets/ENGIN.png";
import NEXTG from "../../assets/NEXTG.png";
import GOLDN from "../../assets/GOLDN.png";
import MEDOX from "../../assets/MEDOX.png";
import SPRIT from "../../assets/SPRIT.png";
import LUMIN from "../../assets/LUMIN.png";
import MANIS from "../../assets/MANIS.png";
import GAPMS from "../../assets/GAPMS.png";
import IMSALE from "../../assets/IMSALE.png";
import KAIOM from "../../assets/KAIOM.png";
import MASKY from "../../assets/MASKY.png";
import VINYLS from "../../assets/VINYLS.png";
import TOFFE from "../../assets/TOFFE.png";

// Sidebar categories for Section groups
const SIDEBAR_ITEMS = [
    { name: "All Sections", icon: "Grid", count: 10, color: "#1e74db" },
    { name: "Hero Banners", icon: "Layers", count: 2, color: "#10b981" },
    { name: "Feature Grids", icon: "Grid", count: 2, color: "#3b82f6" },
    { name: "Metrics & Stats", icon: "Management", count: 2, color: "#f59e0b" },
    { name: "Testimonials", icon: "Users", count: 2, color: "#8b5cf6" },
    { name: "FAQ & Support", icon: "FileText", count: 1, color: "#ec4899" },
    { name: "Call To Action", icon: "Edit", count: 1, color: "#6366f1" },
];

// Tabs
const TABS = [
    { name: "All Sections", value: "all" }
];

const SIDEBAR_TO_TAB = {
    "All Sections": "all",
    "Hero Banners": "hero",
    "Feature Grids": "features",
    "Metrics & Stats": "metrics",
    "Testimonials": "testimonials",
    "FAQ & Support": "faq",
    "Call To Action": "cta",
};

// Master Section Data with `type` flag
const SECTIONS_DATA = [
    {
        type: "hero",
        title: "Hero Banner Section",
        subtitle: "High-impact header banner layouts with live headlines, CTA triggers, and live metrics",
        items: [
            {
                image: CROSY,
                badge: "Variant A",
            },
            {
                image: DSBKO,
                badge: "Variant B",
            },
            {
                image: SPLEDO,
                badge: "Variant C",
            },
            {
                image: ENGIN,
                badge: "Variant D",
            },
            {
                image: NEXTG,
                badge: "Variant E",
            },
            {
                image: GOLDN,
                badge: "Variant F",
            },
            {
                image: MEDOX,
                badge: "Variant G",
            },
            {
                image: SPRIT,
                badge: "Variant H",
            },
            {
                image: LUMIN,
                badge: "Variant I",
            },
            {
                image: MANIS,
                badge: "Variant J",
            },
            {
                image: GAPMS,
                badge: "Variant K",
            },
            {
                image: IMSALE,
                badge: "Variant L",
            },
            {
                image: KAIOM,
                badge: "Variant M",
            },
            {
                image: MASKY,
                badge: "Variant N",
            },
            {
                image: VINYLS,
                badge: "Variant O",
            },
            {
                image: TOFFE,
                badge: "Variant P",
            }
        ],
    },
    {
        type: "features",
        title: "Feature Grid Section",
        subtitle: "Multi-column value proposition blocks with icons, typography, and visual showcases",
        items: [
            {
                image: SPLEDO,
                title: "Hardware & Tech Showcase Grid",
                desc: "High-tech feature grid with dark aesthetic, retro console styling, and interactive product highlights.",
                badge: "Variant A",
                tag: "Tech Showcase",
                specs: "Multi-Card • Elevation",
            },
            {
                image: ENGIN,
                title: "Industrial & Services Grid",
                desc: "Structured corporate feature showcase with bold angled dividers and quick contact actions.",
                badge: "Variant B",
                tag: "Corporate Grid",
                specs: "Asymmetric • Actionable",
            },
        ],
    },
    {
        type: "metrics",
        title: "Metrics & Statistics Section",
        subtitle: "Telemetry KPI overview counters with comparative growth indicators and telemetry data",
        items: [
            {
                image: NEXTG,
                title: "Live KPI & Metric Counter Row",
                desc: "Clean horizontal telemetry bar displaying verified numbers, growth rates, and customer milestone counts.",
                badge: "Variant A",
                tag: "Metric Counters",
                specs: "4-Column KPIs • Live Data",
            },
            {
                image: GOLDN,
                title: "Industrial Capacity & Stats Showcase",
                desc: "Comprehensive performance overview with key operational metrics, capability indicators, and highlights.",
                badge: "Variant B",
                tag: "Performance KPIs",
                specs: "Feature KPIs • High Impact",
            },
        ],
    },
    {
        type: "testimonials",
        title: "Customer Testimonials Section",
        subtitle: "Social proof quotes, client ratings, author avatars, and attribution badges",
        items: [
            {
                image: MEDOX,
                title: "Agency Social Proof & Reviews",
                desc: "Client review cards featuring client avatars, verified testimonials, star ratings, and company tags.",
                badge: "Variant A",
                tag: "Social Proof",
                specs: "Customer Quotes • 5 Stars",
            },
            {
                image: SPRIT,
                title: "Modern Feedback & Case Study Showcase",
                desc: "Dynamic feedback cards with vibrant gradient backgrounds and verified enterprise client quotes.",
                badge: "Variant B",
                tag: "Case Studies",
                specs: "Rich Gradient • Client Avatars",
            },
        ],
    },
    {
        type: "faq",
        title: "FAQ & Support Section",
        subtitle: "Collapsible question-and-answer knowledge base for user support",
        items: [
            {
                image: LUMIN,
                title: "Technical Support & FAQ Hub",
                desc: "Searchable technical help center section with collapsible answers, service categories, and direct contact.",
                badge: "Variant A",
                tag: "Knowledge Base",
                specs: "Collapsible • Support Hub",
            },
        ],
    },
    {
        type: "cta",
        title: "Call To Action (CTA) Banner",
        subtitle: "High-conversion lead capture form with headline, search/input, and immediate submission",
        items: [
            {
                image: MANIS,
                title: "Discovery Platform & Lead Capture CTA",
                desc: "Full-width high-conversion lead generation banner with integrated search input, filter pills, and action triggers.",
                badge: "Variant A",
                tag: "High Conversion",
                specs: "Lead Capture • Interactive",
            },
        ],
    },
];

// Memoized Section Card Container (Kept as it is)
const SectionCard = memo(({ title, subtitle, badge, children }) => (
    <div className="bg-white rounded-5 p-16 mb-14">
        <div className="flex items-center justify-between bordb pb-10">
            <div>
                <h3 className="headmini-text font-600 text-dark">{title}</h3>
                {subtitle && <p className="mini-text text-gray">{subtitle}</p>}
            </div>
            <p className="mini-text font-500 px-14 py-7 rounded-30 bg-light-primary text-primary">
                {badge}
            </p>
        </div>
        <div className="py-14">
            {children}
        </div>
    </div>
));
SectionCard.displayName = "SectionCard";

// Enhanced Image Card with Hover Elevation & Modal Action
const SectionImageCard = memo(({ item, onPreview }) => (
    <div
        className="relative overflow-hidden cursor-pointer bg-dark p-12 rounded-5"
        onClick={() => onPreview?.(item)}
    >
        <Image
            src={item.image}
            alt={item.title}
            className="w-full h-200 object-contain flex"
        />
        <div className="absolute top-0 right-0 m-10">
            <p className="mini-text font-600 px-8 py-4 rounded-20 bg-white text-dark">
                {item.badge}
            </p>
        </div>
    </div>
));
SectionImageCard.displayName = "SectionImageCard";

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ density, setDensity, search, setSearch }) => {
    const densityOptions = useMemo(
        () => [
            { label: "Comfortable Spacing", value: "comfortable" },
            { label: "Compact Density", value: "compact" },
        ],
        []
    );

    return (
        <div className="grid-cols-3 gap-12">
            <Fields
                type="text"
                label="Search Sections"
                placeholder="Filter by keyword..."
                value={search}
                onChange={setSearch}
            />
            <Fields
                type="select"
                label="Layout Density"
                options={densityOptions}
                value={density}
                onChange={setDensity}
            />
        </div>
    );
});
FilterDrawerContent.displayName = "FilterDrawerContent";

// Main Section Component
const Section = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Sections");
    const [density, setDensity] = useState("comfortable");
    const [search, setSearch] = useState("");
    const [previewItem, setPreviewItem] = useState(null);

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

    const handleClearFilters = useCallback(() => {
        setDensity("comfortable");
        setSearch("");
    }, []);

    const handlePreview = useCallback((item) => {
        setPreviewItem(item);
    }, []);

    // Filter master array by activeTab and search keyword
    const filteredSections = useMemo(() => {
        const q = search.toLowerCase().trim();
        return SECTIONS_DATA
            .filter((sec) => activeTab === "all" || sec.type === activeTab)
            .map((sec) => {
                if (!q) return sec;
                const matchedItems = sec.items.filter((item) =>
                    item.title.toLowerCase().includes(q) ||
                    item.desc.toLowerCase().includes(q) ||
                    item.tag.toLowerCase().includes(q) ||
                    item.badge.toLowerCase().includes(q)
                );
                return { ...sec, items: matchedItems };
            })
            .filter((sec) => sec.items.length > 0);
    }, [activeTab, search]);

    const hasActiveFilters = useMemo(
        () => density !== "comfortable" || search !== "",
        [density, search]
    );

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                density={density}
                setDensity={setDensity}
                search={search}
                setSearch={setSearch}
            />
        ),
        [density, search]
    );

    return (
        <MainLayout
            sidebarTitle="Section Groups"
            sidebarItems={SIDEBAR_ITEMS}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Layers" width="18" height="18" />}
            headerTitle="UI Sections Library"
            headerSub="Explore, preview, and configure modular UI layout sections for responsive modern applications"
            quickAction=''
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Customize section display settings and keyword filters"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            {filteredSections.length === 0 ? (
                <div className="bg-white rounded-5 p-32 text-center bord">
                    <p className="text-gray small-text">No sections found matching "{search}".</p>
                </div>
            ) : (
                filteredSections.map((section) => (
                    <SectionCard
                        key={section.type}
                        title={section.title}
                        subtitle={section.subtitle}
                        badge={`${section.items.length} ${section.items.length > 1 ? "Variants" : "Variant"}`}
                    >
                        <div className="grid-cols-3 gap-12">
                            {section.items.map((item, idx) => (
                                <SectionImageCard key={idx} item={item} onPreview={handlePreview} />
                            ))}
                        </div>
                    </SectionCard>
                ))
            )}

            {previewItem && (
                <Modal
                    isOpen={Boolean(previewItem)}
                    onClose={() => setPreviewItem(null)}
                    title='Section Preview'
                    size="md"
                >
                    <div className="bg-dark px-12 rounded-10">
                        <Image
                            src={previewItem.image}
                            alt={previewItem.title}
                            className="w-full h-250 object-contain"
                        />
                    </div>
                </Modal>
            )}
        </MainLayout>
    );
};

export default memo(Section);
