import { resolveImagePath, soboLogo } from "../../../utils/imageResolver";

// 📋 Initial state for all form fields
export const INITIAL_FORM_DATA = {
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
    avatarPreview: resolveImagePath(soboLogo),
    projectFiles: [],
    orderQuantity: 3,
    productRating: 5,
    verificationCode: "749201",
    priceBudget: 45000,
};

// ⚙️ Initial state for playground settings
export const INITIAL_SETTINGS = {
    version: "v4",
    outline: false,
    disabled: false,
    showErrors: false,
};

// 🎨 Version styling options
export const VERSION_OPTIONS = [
    { label: "v1 (Standard Rounded 8px)", value: "v1" },
    { label: "v2 (Pill / Compact 30px)", value: "v2" },
    { label: "v3 (Soft Rounded / 5px)", value: "v3" },
    { label: "v4 (Underline / Line 0px)", value: "v4" },
    { label: "v0 (Compact Height 32px)", value: "v0" },
];

// Boolean Toggle Options
export const BOOLEAN_OPTIONS = [
    { label: "True", value: true },
    { label: "False", value: false },
];

// 🎛️ Playground Configurator Fields
export const PLAYGROUND_CONTROL_FIELDS = [
    {
        name: "version",
        label: "Field Version (v1 - v4)",
        type: "select",
        options: VERSION_OPTIONS,
    },
    {
        name: "outline",
        label: "Outline Border",
        type: "select",
        options: BOOLEAN_OPTIONS,
    },
    {
        name: "disabled",
        label: "Disabled State",
        type: "select",
        options: BOOLEAN_OPTIONS,
    },
    {
        name: "showErrors",
        label: "Show Error Validation",
        type: "select",
        options: BOOLEAN_OPTIONS,
    },
];

// 📁 Sidebar Navigation Categories
export const SIDEBAR_ITEMS = [
    { name: "All Fields", icon: "Grid", count: 22, color: "#1e74db" },
    { name: "Basic Inputs", icon: "Edit", count: 8, color: "#10b981" },
    { name: "Selections", icon: "Check", count: 5, color: "#f59e0b" },
    { name: "Pickers", icon: "Calendar", count: 3, color: "#8b5cf6" },
    { name: "File Uploads", icon: "Upload", count: 2, color: "#ec4899" },
    { name: "Interactive", icon: "Settings", count: 4, color: "#6366f1" },
];

// 📑 Tabs
export const TABS = [
    { name: "All Fields", value: "all" }
];

// 🗺️ Mapping Sidebar Categories to Tabs
export const SIDEBAR_TO_TAB = {
    "All Fields": "all",
    "Basic Inputs": "basic",
    "Selections": "selections",
    "Pickers": "pickers",
    "File Uploads": "uploads",
    "Interactive": "interactive",
};

// 🧩 Master Form Fields Data Array with `type` flag
export const FIELD_SECTIONS_DATA = [
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

/**
 * Generate JSX snippet for an individual field
 */
export const generateFieldCode = (field, settings = {}, value) => {
    const props = [];
    props.push(`type="${field.type}"`);
    if (field.label) props.push(`label="${field.label}"`);
    if (field.placeholder) props.push(`placeholder="${field.placeholder}"`);
    if (field.icon) {
        props.push(`icon="${field.icon}"`);
        if (field.iconPosition) props.push(`iconPosition="${field.iconPosition}"`);
    }
    if (field.required) props.push(`required={true}`);
    if (field.min !== undefined) props.push(`min={${field.min}}`);
    if (field.max !== undefined) props.push(`max={${field.max}}`);
    if (field.step !== undefined) props.push(`step={${field.step}}`);
    if (field.otpCount !== undefined) props.push(`otpCount={${field.otpCount}}`);
    if (field.options) {
        props.push(`options={${JSON.stringify(field.options, null, 2)}}`);
    }
    if (settings.version) props.push(`version="${settings.version}"`);
    if (settings.outline) props.push(`outline={true}`);
    if (settings.disabled) props.push(`disabled={true}`);

    const valDisplay = typeof value === "object"
        ? (value === null ? "null" : JSON.stringify(value))
        : typeof value === "boolean"
            ? `{${value}}`
            : typeof value === "number"
                ? `{${value}}`
                : `"${value || ""}"`;

    props.push(`value={${valDisplay}}`);
    props.push(`onChange={(val) => handleFieldChange("${field.name}", val)}`);

    return `<Fields\n  ${props.join("\n  ")}\n/>`;
};

/**
 * Generate JSX snippet for an entire section of fields
 */
export const generateSectionCode = (section, settings = {}, formData = {}) => {
    const imports = `import React, { useState } from "react";\nimport Fields from "src/components/forms/Fields";\n\n`;
    const fieldsList = (section.fields || [])
        .map((field) => `  // ${field.label || field.name}\n  ${generateFieldCode(field, settings, formData[field.name]).split("\n").join("\n  ")}`)
        .join("\n\n");

    return `${imports}/**\n * ${section.title}\n * ${section.subtitle}\n */\n<div className="grid-cols-3 gap-12">\n${fieldsList}\n</div>`;
};
