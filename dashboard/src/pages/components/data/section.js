// 🖼️ Assets resolved via imageResolver
import {
    resolveImagePath,
    CROSY,
    DSBKO,
    SPLEDO,
    ENGIN,
    NEXTG,
    GOLDN,
    MEDOX,
    SPRIT,
    LUMIN,
    MANIS,
    GAPMS,
    IMSALE,
    KAIOM,
    MASKY,
    VINYLS,
    TOFFE,
} from "../../../utils/imageResolver";

// 📁 Sidebar categories for Section groups
export const SIDEBAR_ITEMS = [
    { name: "All Sections", icon: "Grid", count: 10, color: "#1e74db" },
    { name: "Hero Banners", icon: "Layers", count: 2, color: "#10b981" },
    { name: "Feature Grids", icon: "Grid", count: 2, color: "#3b82f6" },
    { name: "Metrics & Stats", icon: "Management", count: 2, color: "#f59e0b" },
    { name: "Testimonials", icon: "Users", count: 2, color: "#8b5cf6" },
    { name: "FAQ & Support", icon: "Support", count: 1, color: "#ec4899" },
    { name: "Call To Action", icon: "Edit", count: 1, color: "#6366f1" },
];

// 📑 Tabs
export const TABS = [
    { name: "All Sections", value: "all" }
];

// 🗺️ Sidebar to Tab Mapping
export const SIDEBAR_TO_TAB = {
    "All Sections": "all",
    "Hero Banners": "hero",
    "Feature Grids": "features",
    "Metrics & Stats": "metrics",
    "Testimonials": "testimonials",
    "FAQ & Support": "faq",
    "Call To Action": "cta",
};

// 🧩 Master Section Data with `type` flag
export const SECTIONS_DATA = [
    {
        type: "hero",
        title: "Hero Banner Section",
        subtitle: "High-impact header banner layouts with live headlines, CTA triggers, and live metrics",
        items: [
            { image: CROSY, badge: "Variant A" },
            { image: DSBKO, badge: "Variant B" },
            { image: SPLEDO, badge: "Variant C" },
            { image: ENGIN, badge: "Variant D" },
            { image: NEXTG, badge: "Variant E" },
            { image: GOLDN, badge: "Variant F" },
            { image: MEDOX, badge: "Variant G" },
            { image: SPRIT, badge: "Variant H" },
            { image: LUMIN, badge: "Variant I" },
            { image: MANIS, badge: "Variant J" },
            { image: GAPMS, badge: "Variant K" },
            { image: IMSALE, badge: "Variant L" },
            { image: KAIOM, badge: "Variant M" },
            { image: MASKY, badge: "Variant N" },
            { image: VINYLS, badge: "Variant O" },
            { image: TOFFE, badge: "Variant P" },
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

/**
 * Generate JSX snippet for an entire section
 */
export const generateSectionCode = (section) => {
    const imports = `import React from "react";\nimport Image from "src/components/common/Image";\nimport { resolveImagePath } from "src/utils/imageResolver";\n\n`;
    const items = (section.items || [])
        .map((item, idx) => `  {/* ${item.title || `${section.title} (${item.badge || idx + 1})`} */}\n  <div className="relative bg-dark p-12 rounded-5 overflow-hidden">\n    <Image\n      src={resolveImagePath("${item.image}")}\n      alt="${item.title || section.title}"\n      className="w-full h-200 object-contain flex"\n    />\n    <div className="absolute top-0 right-0 m-10">\n      <p className="mini-text font-600 px-8 py-4 rounded-20 bg-white text-dark">\n        ${item.badge}\n      </p>\n    </div>\n  </div>`)
        .join("\n\n");

    const componentName = (section.type || "custom").charAt(0).toUpperCase() + (section.type || "custom").slice(1) + "Section";
    return `${imports}/**\n * ${section.title}\n * ${section.subtitle}\n */\nexport default function ${componentName}() {\n  return (\n    <div className="grid-cols-3 gap-12">\n${items}\n    </div>\n  );\n}`;
};

/**
 * Generate JSX snippet for an individual section variant card
 */
export const generateItemCode = (item, section = {}) => {
    const imports = `import React from "react";\nimport Image from "src/components/common/Image";\nimport { resolveImagePath } from "src/utils/imageResolver";\n\n`;
    return `${imports}{/* ${section.title || "Section"} - ${item.badge || "Variant"} */}\n<div className="relative bg-dark p-12 rounded-5 overflow-hidden cursor-pointer">\n  <Image\n    src={resolveImagePath("${item.image}")}\n    alt="${item.title || "Section preview"}"\n    className="w-full h-200 object-contain flex"\n  />\n  <div className="absolute top-0 right-0 m-10">\n    <p className="mini-text font-600 px-8 py-4 rounded-20 bg-white text-dark">\n      ${item.badge}\n    </p>\n  </div>\n</div>`;
};
