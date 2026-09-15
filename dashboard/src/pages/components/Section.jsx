import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";

// Sidebar categories for Section groups
const SIDEBAR_ITEMS = [
    { name: "All Sections", icon: "Grid", count: 6, color: "#1e74db" },
    { name: "Hero Banners", icon: "Layers", count: 2, color: "#10b981" },
    { name: "Feature Grids", icon: "Grid", count: 2, color: "#3b82f6" },
    { name: "Metrics & Stats", icon: "Management", count: 2, color: "#f59e0b" },
    { name: "Testimonials", icon: "Users", count: 2, color: "#8b5cf6" },
    { name: "FAQ & Support", icon: "FileText", count: 1, color: "#ec4899" },
    { name: "Call To Action", icon: "Edit", count: 1, color: "#6366f1" },
];

// Tabs
const TABS = [
    { name: "All Sections", value: "all" },
    { name: "Hero Banners", value: "hero" },
    { name: "Feature Grids", value: "features" },
    { name: "Metrics & Stats", value: "metrics" },
    { name: "Testimonials", value: "testimonials" },
    { name: "FAQ & Support", value: "faq" },
    { name: "Call To Action", value: "cta" },
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

// Memoized Section Card Container
const SectionCardWrapper = memo(({ title, subtitle, badge, children }) => (
    <div className="bg-white rounded-8 bord p-20 mb-16 shadow-sm">
        <div className="flex items-center justify-between pb-12 mb-16 bordb">
            <div>
                <div className="flex items-center gap-8">
                    <h3 className="para-text font-600 text-dark">{title}</h3>
                    {badge && (
                        <span className="mini-text font-600 px-8 py-2 rounded-20 bg-forth text-primary">
                            {badge}
                        </span>
                    )}
                </div>
                {subtitle && <p className="mini-text text-gray mt-2">{subtitle}</p>}
            </div>
        </div>
        {children}
    </div>
));
SectionCardWrapper.displayName = "SectionCardWrapper";

// 1. Memoized Hero Section Block
const HeroSectionBlock = memo(() => (
    <SectionCardWrapper
        title="Hero Banner Section"
        subtitle="High-impact header banner with headline, call-to-action triggers, and live trust metrics"
        badge="Hero Variant A"
    >
        <div
            className="rounded-8 p-32 text-center relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
                color: "#ffffff",
            }}
        >
            <div className="flex justify-center mb-12">
                <span className="mini-text font-600 px-12 py-4 rounded-20 bg-primary text-white uppercase tracking-wider">
                    Next-Gen Architecture 2026
                </span>
            </div>
            <h1 className="head-text font-600 text-white mb-12" style={{ maxWidth: 720, margin: "0 auto 12px" }}>
                Build Scalable Enterprise Dashboards with Modular UI Systems
            </h1>
            <p className="small-text text-gray mb-24" style={{ maxWidth: 580, margin: "0 auto 24px", color: "#94a3b8" }}>
                Empower your engineering team with production-ready layout components, memoized state handling, and accessible UI controls.
            </p>
            <div className="flex items-center justify-center gap-12 mb-28">
                <Button text="Get Started Free" version="v2" bg="primary" color="white" />
                <Button text="Live Documentation" version="v2" bg="white" color="dark" border="white" />
            </div>

            {/* Metrics Trust Row */}
            <div
                className="grid-cols-3 gap-16 pt-20 bordt"
                style={{ borderColor: "rgba(255, 255, 255, 0.1)", maxWidth: 640, margin: "0 auto" }}
            >
                <div>
                    <h4 className="headmini-text text-white font-600">99.99%</h4>
                    <p className="mini-text text-gray" style={{ color: "#94a3b8" }}>Uptime SLA Guarantee</p>
                </div>
                <div>
                    <h4 className="headmini-text text-white font-600">250,000+</h4>
                    <p className="mini-text text-gray" style={{ color: "#94a3b8" }}>Active Enterprise Users</p>
                </div>
                <div>
                    <h4 className="headmini-text text-white font-600">4.9 / 5.0</h4>
                    <p className="mini-text text-gray" style={{ color: "#94a3b8" }}>Developer Satisfaction</p>
                </div>
            </div>
        </div>
    </SectionCardWrapper>
));
HeroSectionBlock.displayName = "HeroSectionBlock";

// 2. Memoized Features Grid Block
const FeaturesGridBlock = memo(() => {
    const features = useMemo(
        () => [
            {
                icon: "Layers",
                color: "#1e74db",
                title: "Atomic Design System",
                desc: "Every component is meticulously isolated, typed, and structured according to standard design tokens.",
            },
            {
                icon: "Settings",
                color: "#10b981",
                title: "Optimized Memoization",
                desc: "Harness React.memo and useCallback primitives to prevent cascading renders across deep UI trees.",
            },
            {
                icon: "Management",
                color: "#f59e0b",
                title: "Role-Based Security",
                desc: "Built-in permission boundaries, granular route controls, and role-based data view filters.",
            },
        ],
        []
    );

    return (
        <SectionCardWrapper
            title="Feature Grid Section"
            subtitle="Multi-column value proposition blocks with icons, typography, and hover elevation"
            badge="3-Column Grid"
        >
            <div className="grid-cols-3 gap-16">
                {features.map((item, idx) => (
                    <div
                        key={idx}
                        className="p-20 rounded-8 bg-forth bord transition hover-shadow"
                        style={{ borderLeft: `4px solid ${item.color}` }}
                    >
                        <div
                            className="flex items-center justify-center rounded-5 mb-12"
                            style={{ backgroundColor: `${item.color}15`, width: 36, height: 36, color: item.color }}
                        >
                            <Icon name={item.icon} width="20" height="20" />
                        </div>
                        <h4 className="small-text font-600 text-dark mb-6">{item.title}</h4>
                        <p className="mini-text text-gray" style={{ lineHeight: 1.6 }}>
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </SectionCardWrapper>
    );
});
FeaturesGridBlock.displayName = "FeaturesGridBlock";

// 3. Memoized Metrics & Stats Block
const MetricsStatsBlock = memo(() => {
    const metrics = useMemo(
        () => [
            { label: "Total Gross Revenue", value: "₹48.6 Lakhs", change: "+24.8%", isUp: true, color: "#10b981" },
            { label: "Active Subscriptions", value: "14,290", change: "+12.4%", isUp: true, color: "#1e74db" },
            { label: "Lead Conversion Rate", value: "38.2%", change: "+5.1%", isUp: true, color: "#8b5cf6" },
            { label: "Avg. Resolution Time", value: "1.4 hrs", change: "-18.5%", isUp: true, color: "#f59e0b" },
        ],
        []
    );

    return (
        <SectionCardWrapper
            title="Metrics & Statistics Section"
            subtitle="Telemetry KPI overview counters with comparative growth indicators"
            badge="4-Column KPI"
        >
            <div className="grid-cols-4 gap-16">
                {metrics.map((stat, idx) => (
                    <div key={idx} className="p-16 rounded-8 bg-forth bord">
                        <p className="mini-text text-gray mb-4">{stat.label}</p>
                        <h3 className="mid-text font-600 text-dark mb-8">{stat.value}</h3>
                        <div className="flex items-center gap-6">
                            <span
                                className="mini-text font-600 px-6 py-2 rounded-5"
                                style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
                            >
                                {stat.change}
                            </span>
                            <span className="mini-text text-gray">vs previous month</span>
                        </div>
                    </div>
                ))}
            </div>
        </SectionCardWrapper>
    );
});
MetricsStatsBlock.displayName = "MetricsStatsBlock";

// 4. Memoized Testimonials Block
const TestimonialsBlock = memo(() => {
    const reviews = useMemo(
        () => [
            {
                quote: "The modular layout and memoized state architecture transformed our dashboard render times from seconds to single-digit milliseconds.",
                author: "Priya Sharma",
                role: "VP of Engineering, CloudScale",
                rating: 5,
                initials: "PS",
                color: "#1e74db",
            },
            {
                quote: "Everything from form fields to collapsible sidebars is plug-and-play. It saved our engineering team weeks of boilerplate development.",
                author: "Devon Vance",
                role: "Product Lead, FinMatrix",
                rating: 5,
                initials: "DV",
                color: "#10b981",
            },
        ],
        []
    );

    return (
        <SectionCardWrapper
            title="Customer Testimonials Section"
            subtitle="Social proof quotes, ratings, author avatars, and attribution badges"
            badge="Social Proof"
        >
            <div className="grid-cols-2 gap-16">
                {reviews.map((rev, idx) => (
                    <div key={idx} className="p-20 rounded-8 bg-forth bord flex flex-column justify-between">
                        <div>
                            <div className="flex gap-4 mb-10 text-warning" style={{ color: "#f59e0b" }}>
                                {Array.from({ length: rev.rating }).map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>
                            <p className="small-text text-dark font-500 mb-16" style={{ lineHeight: 1.6 }}>
                                "{rev.quote}"
                            </p>
                        </div>
                        <div className="flex items-center gap-12 pt-12 bordt">
                            <div
                                className="flex items-center justify-center rounded-full text-white font-600 mini-text"
                                style={{ width: 38, height: 38, backgroundColor: rev.color }}
                            >
                                {rev.initials}
                            </div>
                            <div>
                                <h4 className="small-text font-600 text-dark">{rev.author}</h4>
                                <p className="mini-text text-gray">{rev.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionCardWrapper>
    );
});
TestimonialsBlock.displayName = "TestimonialsBlock";

// 5. Memoized FAQ Block
const FaqBlock = memo(() => {
    const [openIdx, setOpenIdx] = useState(0);

    const questions = useMemo(
        () => [
            {
                q: "How does MainLayout optimize rendering speed?",
                a: "MainLayout wraps all key segments (CategoryItem, MainLayoutSidebar, MainLayoutHeader) in React.memo and handles event callbacks via useCallback, preventing recursive DOM reconciliation during state changes.",
            },
            {
                q: "Can I customize sidebar items and active filter drawers?",
                a: "Yes! MainLayout accepts customizable sidebarItems, tabs, filterInputs, and custom quick actions, providing complete flexibility for diverse pages.",
            },
            {
                q: "Does MainLayout support responsive mobile devices?",
                a: "Absolutely. The layout system is fully responsive with fluid width transitions, collapsible navigation drawers, and auto-adapting grids.",
            },
        ],
        []
    );

    const handleToggle = useCallback((idx) => {
        setOpenIdx((prev) => (prev === idx ? -1 : idx));
    }, []);

    return (
        <SectionCardWrapper
            title="Frequently Asked Questions (FAQ)"
            subtitle="Collapsible question-and-answer accordions for user support"
            badge="Accordion List"
        >
            <div className="grid-cols-1 gap-8">
                {questions.map((item, idx) => {
                    const isOpen = openIdx === idx;
                    return (
                        <div key={idx} className="rounded-8 bg-forth bord p-16 cursor-pointer" onClick={() => handleToggle(idx)}>
                            <div className="flex items-center justify-between">
                                <h4 className="small-text font-600 text-dark">{item.q}</h4>
                                <span className="small-text font-600 text-gray">{isOpen ? "−" : "+"}</span>
                            </div>
                            {isOpen && (
                                <p className="mini-text text-gray mt-8 pt-8 bordt" style={{ lineHeight: 1.6 }}>
                                    {item.a}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </SectionCardWrapper>
    );
});
FaqBlock.displayName = "FaqBlock";

// 6. Memoized Call to Action Block
const CallToActionBlock = memo(() => (
    <SectionCardWrapper
        title="Call To Action (CTA) Banner"
        subtitle="High-conversion lead capture form with headline, input, and immediate submission"
        badge="Lead Capture"
    >
        <div
            className="p-28 rounded-8 text-center"
            style={{
                background: "linear-gradient(135deg, #1e40af 0%, #1e74db 100%)",
                color: "#ffffff",
            }}
        >
            <h3 className="mid-text font-600 text-white mb-8">Ready to Accelerate Your Dashboard Development?</h3>
            <p className="small-text mb-20" style={{ color: "#dbeafe", maxWidth: 500, margin: "0 auto 20px" }}>
                Join thousands of engineers building high-performance web applications with our modular components.
            </p>
            <div className="flex items-center justify-center gap-8" style={{ maxWidth: 440, margin: "0 auto" }}>
                <input
                    type="email"
                    placeholder="Enter your work email"
                    className="p-10 rounded-5 border-0 mini-text text-dark flex-1"
                    style={{ outline: "none" }}
                />
                <Button text="Subscribe" version="v2" bg="dark" color="white" />
            </div>
        </div>
    </SectionCardWrapper>
));
CallToActionBlock.displayName = "CallToActionBlock";

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
    const [copied, setCopied] = useState(false);

    // Handlers wrapped in useCallback
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

    const handleCopyBlueprint = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify({ sectionTab: activeTab, category: selectedCategory }, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [activeTab, selectedCategory]);

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

    const quickActionNode = useMemo(
        () => (
            <div className="flex items-center gap-8">
                <Button
                    text={copied ? "Copied!" : "Copy Blueprint"}
                    version="v2"
                    bg="primary"
                    color="white"
                    icon="Layers"
                    onClick={handleCopyBlueprint}
                    title="Copy section schema to clipboard"
                />
            </div>
        ),
        [copied, handleCopyBlueprint]
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
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Customize section display settings and keyword filters"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            {/* 1. Hero Banners */}
            {(activeTab === "all" || activeTab === "hero") && <HeroSectionBlock />}

            {/* 2. Feature Grids */}
            {(activeTab === "all" || activeTab === "features") && <FeaturesGridBlock />}

            {/* 3. Metrics & Stats */}
            {(activeTab === "all" || activeTab === "metrics") && <MetricsStatsBlock />}

            {/* 4. Testimonials */}
            {(activeTab === "all" || activeTab === "testimonials") && <TestimonialsBlock />}

            {/* 5. FAQ & Support */}
            {(activeTab === "all" || activeTab === "faq") && <FaqBlock />}

            {/* 6. Call To Action */}
            {(activeTab === "all" || activeTab === "cta") && <CallToActionBlock />}
        </MainLayout>
    );
};

export default memo(Section);
