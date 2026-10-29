import React, { useState, useMemo, useCallback, useEffect, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Fields from "../../components/forms/Fields";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import { showToast } from "../../components/common/Toast";
import {
    customersTableColumns,
    analyticsTableColumns,
    customersData,
    tasksData,
    transactionsData,
    usersData,
    rolesData,
    analyticsSidebarData,
    analyticsData,
} from "../../utils/apiData";

// Map entity columns to form field definitions
const getColumnFieldConfig = (col, category) => {
    const acc = col.accessor;
    const header = col.header || acc;
    const ui = col.ui || "text";

    if (acc === "checkbox" || acc === "actions" || ui === "checkbox" || ui === "actions") {
        return null;
    }

    if (ui === "status") {
        let options = [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
        ];
        if (category === "Tasks") {
            options = [
                { label: "Active", value: "Active" },
                { label: "Pending", value: "Pending" },
                { label: "Failed", value: "Failed" },
            ];
        } else if (category === "Transaction") {
            options = [
                { label: "Completed", value: "Completed" },
                { label: "Pending", value: "Pending" },
                { label: "Failed", value: "Failed" },
            ];
        }
        return {
            name: acc,
            label: header,
            type: "select",
            options,
            placeholder: `Select ${header}`,
        };
    }

    if (ui === "date") {
        return {
            name: acc,
            label: header,
            type: "datepicker",
            placeholder: `Select ${header} date`,
        };
    }

    if (acc === "role") {
        return {
            name: acc,
            label: header,
            type: "select",
            options: [
                { label: "Administrator (Admin)", value: "admin" },
                { label: "Customer", value: "customer" },
                { label: "Accountant", value: "accountant" },
                { label: "Manager", value: "manager" },
                { label: "Product", value: "product" },
            ],
            placeholder: "Select Role",
        };
    }

    if (acc === "priority") {
        return {
            name: acc,
            label: header,
            type: "select",
            options: [
                { label: "High Priority", value: "High" },
                { label: "Medium Priority", value: "Medium" },
                { label: "Low Priority", value: "Low" },
            ],
            placeholder: "Select Priority",
        };
    }

    if (acc === "method") {
        return {
            name: acc,
            label: header,
            type: "select",
            options: [
                { label: "Cash On Delivery", value: "Cash On Delivery" },
                { label: "Credit Card", value: "Credit Card" },
                { label: "Wire Transfer", value: "Wire Transfer" },
                { label: "UPI / NetBanking", value: "UPI / NetBanking" },
                { label: "Debit Card", value: "Debit Card" },
            ],
            placeholder: "Select Payment Method",
        };
    }

    if (acc === "type" && category === "Customers") {
        return {
            name: acc,
            label: header,
            type: "select",
            options: [
                { label: "Manufacture", value: "Manufacture" },
                { label: "Trader", value: "Trader" },
                { label: "Retailer", value: "Retailer" },
                { label: "Wholeseller", value: "Wholeseller" },
                { label: "Stockist", value: "Stockist" },
                { label: "Vendor", value: "Vendor" },
            ],
            placeholder: "Select Seller Type",
        };
    }

    if (acc === "email") {
        return {
            name: acc,
            label: header,
            type: "email",
            placeholder: "e.g. contact@example.com",
        };
    }

    if (acc === "ordersCount" || acc === "usersCount") {
        return {
            name: acc,
            label: header,
            type: "number",
            placeholder: `Enter ${header}`,
        };
    }

    if (acc === "code") {
        return {
            name: acc,
            label: header,
            type: "text",
            placeholder: `Enter ${header}`,
        };
    }

    return {
        name: acc,
        label: header,
        type: "text",
        placeholder: `Enter ${header}`,
    };
};

const Analytics = () => {
    const [activeCategory, setActiveCategory] = useState("Customers");
    const [formData, setFormData] = useState(analyticsData);
    const [jsonText, setJsonText] = useState("");
    const [jsonError, setJsonError] = useState(null);
    const [isEditingJson, setIsEditingJson] = useState(false);

    // Sidebar items with dynamic counts derived from apiData
    const sidebarItems = useMemo(() => {
        const counts = {
            Customers: customersData.length,
            Tasks: tasksData.length,
            Transaction: transactionsData.length,
            Users: usersData.length,
            Roles: rolesData.length,
        };
        return analyticsSidebarData.items.map((item) => ({
            ...item,
            count: counts[item.name] ?? 0,
        }));
    }, []);

    // Active table columns for selected category
    const activeColumns = useMemo(() => {
        return analyticsTableColumns[activeCategory] || customersTableColumns;
    }, [activeCategory]);

    // Form fields mapped directly from TABLE COLUMNS DATA
    const fieldConfigs = useMemo(() => {
        return activeColumns
            .map((col) => getColumnFieldConfig(col, activeCategory))
            .filter(Boolean);
    }, [activeColumns, activeCategory]);

    const activeFormData = useMemo(() => {
        return formData[activeCategory] || {};
    }, [formData, activeCategory]);

    // Synchronize JSON editor text when in JSON mode
    useEffect(() => {
        if (!isEditingJson) {
            setJsonText(JSON.stringify(formData[activeCategory] || {}, null, 2));
            setJsonError(null);
        }
    }, [formData, activeCategory, isEditingJson]);

    // Reset editing state upon category switch
    useEffect(() => {
        setIsEditingJson(false);
        setJsonText(JSON.stringify(formData[activeCategory] || {}, null, 2));
        setJsonError(null);
    }, [activeCategory]);

    const handleFieldChange = useCallback((fieldName, val) => {
        const nextValue = typeof val === "object" && val !== null && "value" in val ? val.value : val;
        setFormData((prev) => ({
            ...prev,
            [activeCategory]: {
                ...prev[activeCategory],
                [fieldName]: nextValue,
            },
        }));
    }, [activeCategory]);

    // JSON Editor handlers
    const handleJsonChange = useCallback((e) => {
        const raw = e.target.value;
        setJsonText(raw);
        setIsEditingJson(true);
        try {
            const parsed = JSON.parse(raw);
            setJsonError(null);
            setFormData((prev) => ({
                ...prev,
                [activeCategory]: parsed,
            }));
        } catch (err) {
            setJsonError(err.message);
        }
    }, [activeCategory]);

    const handleJsonBlur = useCallback(() => {
        setIsEditingJson(false);
        try {
            const parsed = JSON.parse(jsonText);
            setJsonText(JSON.stringify(parsed, null, 2));
            setJsonError(null);
        } catch {
            // Keep current text if syntax is incomplete
        }
    }, [jsonText]);

    const handleReset = useCallback(() => {
        setIsEditingJson(false);
        const defaultData = analyticsData[activeCategory] || {};
        setFormData((prev) => ({
            ...prev,
            [activeCategory]: defaultData,
        }));
        setJsonText(JSON.stringify(defaultData, null, 2));
        setJsonError(null);
        showToast(`${activeCategory} form reset to default`, "info");
    }, [activeCategory]);

    const handleCopy = useCallback(() => {
        navigator.clipboard?.writeText(jsonText);
        showToast(`${activeCategory} JSON copied to clipboard!`, "success");
    }, [jsonText, activeCategory]);

    const quickActionNode = useMemo(() => (
        <div className="flex items-center gap-8">
            <Button
                text="Reset to Initial"
                version="v2"
                bg="white"
                border="secondary"
                color="secondary"
                icon="Refresh"
                onClick={handleReset}
            />
            <Button
                text="Copy JSON"
                version="v2"
                bg="primary"
                color="white"
                icon="File"
                onClick={handleCopy}
            />
        </div>
    ), [handleReset, handleCopy]);

    return (
        <MainLayout
            sidebarTitle={analyticsSidebarData.title || "Data Models & Entities"}
            sidebarItems={sidebarItems}
            selectedSidebarItem={activeCategory}
            onSidebarItemClick={setActiveCategory}
            headerIcon={<Icon name="CMS" width="18" height="18" />}
            headerTitle="Entity Field Configuration"
            headerSub={`Dynamic form fields generated from TABLE COLUMNS DATA for ${activeCategory}`}
            quickAction={quickActionNode}
            showTabControls={false}
            showSidebar={true}
        >
            <div className="flex w-full justify-between gap-12">
                <div className="w-30">
                    <div className="bg-white rounded-5 p-12 overflow-auto" style={{ height: '456px' }}>
                        <h4 className="headmini-text text-dark font-600 bordb pb-8">
                            {`${activeCategory} Fields`}
                        </h4>

                        <div className="grid-cols-1 gap-12 mt-10">
                            {fieldConfigs.map((field) => (
                                <div key={field.name} className="flex flex-column">
                                    <Fields
                                        type={field.type}
                                        label={field.label}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        options={field.options}
                                        value={activeFormData[field.name] ?? ""}
                                        onChange={(val) => handleFieldChange(field.name, val)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-70">
                    <div className="bg-white rounded-5 p-12">
                        <div className="relative rounded-5 overflow-hidden">
                            <textarea
                                value={jsonText}
                                onChange={handleJsonChange}
                                onBlur={handleJsonBlur}
                                spellCheck={false}
                                className="w-full small-text font-200 p-12"
                                style={{
                                    backgroundColor: "#0f172a",
                                    color: "#fff",
                                    minHeight: "430px",
                                    border: "none",
                                    outline: "none",
                                    resize: "vertical",
                                    boxSizing: "border-box",
                                    display: "block",
                                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                    fontSize: "12.5px",
                                    lineHeight: "1.5",
                                }}
                            />
                        </div>

                        <div className="flex items-center justify-between mt-12">
                            <h4 className="headmini-text text-dark font-600">
                                {`${activeCategory} JSON Editor`}
                            </h4>
                            {jsonError ? (
                                <p className="mini-text text-danger font-500">
                                    Syntax Error
                                </p>
                            ) : (
                                <p className="mini-text text-success font-500">
                                    Valid JSON
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default memo(Analytics);
