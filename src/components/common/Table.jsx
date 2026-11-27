import React from 'react';

import Image from "./Image";
import Skeleton from "./Skeleton";
import Button from "./Button";
import Fields from "../forms/Fields";
import Pagination from "./Pagination";
import Badge, { BadgeList } from "./Badge";
import Modal from "./Modal";
import Icon from "./Icon";

import {
    resolveImagePath,
    formatDate,
    getFirstValue,
    getNestedValue,
    canPerformAction,
    getCurrentRole,
    getCurrentUser,
    hasPermission,
    useCurrentUser,
    isAdminOrDevAdmin,
    isFullAccess,
} from '../../utils';
import { AVATAR_PALETTE } from '../../utils/apiData';

export { formatDate, Badge, BadgeList };

const ActionButtons = React.memo(({ row, rowIdx, col, onEdit, onDelete, onView, onViewClick, actions, editTitle, deleteTitle, viewTitle, entity, currentRole, allowAllRoleActions, showActionsForAllRoles }) => {
    const activeRole = currentRole || (typeof getCurrentUser === "function" ? getCurrentUser() : null) || getCurrentRole() || "guest";
    const activeEntity = col.entity || entity || (typeof window !== "undefined" ? window.location?.pathname : "");

    const rowActions = col.actions || actions;

    const allowedActions = React.useMemo(() => {
        const isBypass = Boolean(
            allowAllRoleActions ||
            showActionsForAllRoles ||
            col?.allowAllRoleActions ||
            col?.showActionsForAllRoles ||
            (activeRole && (isAdminOrDevAdmin(activeRole) || isFullAccess(activeRole?.permissions || activeRole?.pages || activeRole)))
        );

        if (Array.isArray(rowActions) && rowActions.length > 0) {
            return rowActions.filter((act) => {
                if (!act) return false;
                if (isBypass) return true;
                if (act.permission) return hasPermission(activeRole, act.permission);
                if (act.action) return canPerformAction(activeRole, act.action, activeEntity);
                return true;
            });
        }

        const editFn = col.onEdit || onEdit;
        const deleteFn = col.onDelete || onDelete;
        const viewFn = col.onView || onView;
        const hasView = Boolean(viewFn || onViewClick);
        if (!editFn && !deleteFn && !hasView) return [];

        const list = [];
        const canView = col.canView !== undefined
            ? Boolean(col.canView)
            : (isBypass ? Boolean(hasView) : (Boolean(hasView) && canPerformAction(activeRole, "view", activeEntity)));
        const canEdit = col.canEdit !== undefined
            ? Boolean(col.canEdit)
            : (isBypass ? Boolean(editFn) : (Boolean(editFn) && canPerformAction(activeRole, "edit", activeEntity)));
        const canDelete = col.canDelete !== undefined
            ? Boolean(col.canDelete)
            : (isBypass ? Boolean(deleteFn) : (Boolean(deleteFn) && canPerformAction(activeRole, "delete", activeEntity)));

        if (canView) {
            list.push({
                icon: "Eye",
                bg: "light-info",
                color: "info",
                title: col.viewTitle || viewTitle || "View Info",
                onClick: (r, idx) => {
                    const target = r || row;
                    if (onViewClick) onViewClick(target, idx ?? rowIdx);
                    if (viewFn) viewFn(target, idx ?? rowIdx);
                },
            });
        }
        if (editFn && canEdit) {
            list.push({
                icon: "Edit",
                bg: "light-primary",
                color: "primary",
                title: col.editTitle || editTitle || "Edit",
                onClick: (r, idx) => editFn(r || row, idx ?? rowIdx),
            });
        }
        if (deleteFn && canDelete) {
            list.push({
                icon: "Trash",
                bg: "light-danger",
                color: "danger",
                title: col.deleteTitle || deleteTitle || "Delete",
                onClick: (r, idx) => deleteFn(r || row, idx ?? rowIdx),
            });
        }
        return list;
    }, [col, actions, rowActions, onEdit, onDelete, onView, onViewClick, activeRole, activeEntity, row, rowIdx, viewTitle, editTitle, deleteTitle, allowAllRoleActions, showActionsForAllRoles]);

    if (!allowedActions.length) {
        return <span className="mini-text text-gray" style={{ display: "inline-block", minWidth: "20px", textAlign: "center" }}>-</span>;
    }

    return (
        <div className="flex items-center gap-8">
            {allowedActions.map((act, i) => (
                <Button
                    key={i}
                    type="button"
                    version="icon"
                    icon={act.icon}
                    bg={act.bg}
                    color={act.color}
                    onClick={() => act.onClick ? act.onClick(row, rowIdx) : undefined}
                    title={act.title}
                />
            ))}
        </div>
    );
});
ActionButtons.displayName = "ActionButtons";



const getDeterministicColor = (str) => {
    if (!str || typeof str !== "string") return AVATAR_PALETTE[0];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
};

// Memoized Profile Cell
const ProfileCell = React.memo(({ col, row }) => {
    const rawVal = getNestedValue(row, col.accessor);
    const obj = (rawVal && typeof rawVal === "object") ? rawVal : {};
    const isCreatorCol =
        col.accessor === "createdby" ||
        col.accessor === "createdBy" ||
        col.accessor === "creator" ||
        col.accessor === "author" ||
        col.header === "Created By" ||
        col.header === "Author";
    const isVendorCol =
        col.accessor === "vendorBy" ||
        col.accessor === "VendorBy" ||
        col.header === "Vendor";

    if (isVendorCol && (!rawVal || (!obj._id && !obj.id && !obj.fullname && !obj.name && !obj.email && !obj.mobile))) {
        return <span className="text-gray mini-text font-400">—</span>;
    }

    const isOnlyImage =
        col.onlyImage === true ||
        col.imageOnly === true ||
        col.ui === "image" ||
        col.ui === "img" ||
        (!isCreatorCol && !isVendorCol && (col.accessor === "image" || String(col.header || "").toLowerCase().includes("image")));

    const isImageAccessor =
        col.accessor === "image" ||
        col.accessor === "img" ||
        col.accessor === "avatar" ||
        col.accessor === "thumbnail" ||
        isOnlyImage;

    const name = getFirstValue(
        [rawVal, obj, !isCreatorCol && !isVendorCol ? row : null],
        ["fullname", "name", "username", col.nameKey, "createdByName", "pageName", "sectionName", "title"]
    );
    const subText = getFirstValue(
        [obj, !isCreatorCol && !isVendorCol ? row : null],
        [col.subKey, col.emailKey, "mobile", "phone", "email", "sub", "path", "sku", "author"]
    );

    let rawImg = "";
    if (isCreatorCol) {
        rawImg = getFirstValue(obj, [col.imageKey, "avatar", "image", "profileImage", "photo", "avatarUrl", "profileImg", "url", "src"]);
        if (!rawImg) {
            rawImg = getFirstValue(row, ["creatorImage", "authorImage", "creatorAvatar", "authorAvatar"]);
        }
    } else if (isImageAccessor) {
        rawImg = (typeof rawVal === "string" && rawVal.trim())
            ? rawVal.trim()
            : (getFirstValue([rawVal, obj, row], [col.imageKey, "image", "avatar", "thumbnail", "url", "src"]) || (Array.isArray(row?.images) ? row.images[0] : ""));
    } else {
        rawImg = getFirstValue([obj, row], [col.imageKey, "avatar", "image", "thumbnail", "profileImage", "url", "src"]) || (Array.isArray(row?.images) ? row.images[0] : "");
    }

    if (Array.isArray(rawImg)) {
        rawImg = rawImg[0] || "";
    }
    if (rawImg && typeof rawImg === "object") {
        rawImg = rawImg.url || rawImg.path || rawImg.src || rawImg.preview || rawImg.secure_url || "";
    }
    if (typeof rawImg === "string") {
        rawImg = rawImg.trim();
    }

    const imgUrl = resolveImagePath(rawImg);
    const [imgError, setImgError] = React.useState(false);

    React.useEffect(() => {
        setImgError(false);
    }, [imgUrl]);

    const favColor = getFirstValue(row, [col.colorKey, "favoriteColor"]) || getDeterministicColor(String(name || row?._id || row?.id || col.header || ""));
    const imgStyle = { width: "40px", height: "40px", flexShrink: 0, ...col.imgStyle, ...col.imageStyle };
    const initialLetter = (name ? String(name).trim().charAt(0) : (col.header ? String(col.header).trim().charAt(0) : "?")).toUpperCase() || "?";

    const showImage = Boolean(imgUrl) && !imgError;

    if (!name && !subText && !showImage) {
        return <span className="text-gray mini-text font-400">—</span>;
    }

    if (isOnlyImage) {
        return (
            <div className={`flex items-center ${col.className?.includes("justify-center") || col.className?.includes("text-center") ? "justify-center" : ""}`}>
                {showImage ? (
                    <Image
                        src={imgUrl}
                        alt={name || col.header || "Product Image"}
                        className="rounded-5 object-cover bg-forth"
                        style={imgStyle}
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div
                        style={{ background: favColor, ...imgStyle }}
                        className="flex items-center justify-center rounded-5"
                    >
                        <p className="headpara-text text-white font-500 line-clamp1">
                            {initialLetter}
                        </p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-12">
            {showImage ? (
                <Image
                    src={imgUrl}
                    alt={name}
                    className="rounded-5 object-cover bg-forth"
                    style={imgStyle}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={() => setImgError(true)}
                />
            ) : (
                <div style={{ background: favColor, ...imgStyle }} className="flex items-center justify-center rounded-5">
                    <p className="headpara-text text-white font-500">
                        {initialLetter}
                    </p>
                </div>
            )}
            <div>
                <h5 className="text-dark headmini-text font-500 capitalize line-clamp1">{name}</h5>
                {subText && subText !== "—" && subText !== "-" && (
                    <p className="text-gray mini-text font-500 line-clamp1">{subText}</p>
                )}
            </div>
        </div>
    );
});
ProfileCell.displayName = "ProfileCell";

// Memoized Cell Renderer
const TableCell = React.memo(({
    col,
    row,
    rowIdx,
    isSelected,
    onToggleSelect,
    onEdit,
    onDelete,
    onView,
    onViewClick,
    actions,
    editTitle,
    deleteTitle,
    viewTitle,
    itemName,
    entity,
    currentRole,
    userRole,
    allowAllRoleActions,
    showActionsForAllRoles,
}) => {
    const rowId = row._id || row.id || rowIdx;
    const cellValue = col.accessor ? getNestedValue(row, col.accessor) : undefined;

    if (col.render) return col.render(row, rowIdx);

    // Form field types integrated with Fields.jsx
    if (col.accessor === "checkbox" || col.ui === "checkbox") {
        return (
            <div className="flex items-center justify-center">
                <input
                    type="checkbox"
                    checked={Boolean(isSelected)}
                    onChange={() => onToggleSelect?.(rowId, row)}
                    className="cursor-pointer"
                    aria-label={`Select row ${rowId}`}
                />
            </div>
        );
    }

    if (col.ui === "switch") {
        return (
            <Fields
                type="switch"
                value={Boolean(cellValue)}
                onChange={(val) => col.onChange?.(row, val, rowIdx)}
            />
        );
    }

    if (col.ui === "rating") {
        return (
            <Fields
                type="rating"
                value={Number(cellValue) || 0}
                onChange={(val) => col.onChange?.(row, val, rowIdx)}
                disabled={!col.onChange}
            />
        );
    }

    if (col.ui === "select") {
        return (
            <Fields
                type="select"
                value={cellValue}
                options={col.options || []}
                onChange={(val) => col.onChange?.(row, val, rowIdx)}
            />
        );
    }

    if (col.ui === "input" || col.ui === "editable") {
        return (
            <Fields
                type={col.inputType || "input"}
                value={cellValue || ""}
                placeholder={col.placeholder}
                onChange={(val) => col.onChange?.(row, val, rowIdx)}
            />
        );
    }

    // Date columns
    if (
        (col.ui === "date" && col.accessor !== "isDeleted" && col.header !== "Deleted") ||
        col.header === "Created" ||
        col.header === "Updated" ||
        col.header === "Created Date" ||
        col.header === "Updated Date" ||
        col.accessor === "createdAt" ||
        col.accessor === "updatedAt" ||
        col.accessor === "createdDate" ||
        col.accessor === "updatedDate"
    ) {
        const defaultCreated = getFirstValue(row, ["createdAt", "createdDate", "date"], "2026-08-09");
        const defaultUpdated = getFirstValue(row, ["updatedAt", "updatedDate", "lastActive"], "2026-08-13");
        const rawDate = cellValue !== undefined && cellValue !== null && cellValue !== ""
            ? cellValue
            : (col.header === "Created" || col.header === "Created Date" ? defaultCreated : defaultUpdated);
        return <p className="text-gray mini-text font-500" style={{ margin: 0 }}>{formatDate(rawDate, col.dateFormat || col.format) || "-"}</p>;
    }

    // Actions
    if ((col.accessor === "actions" || col.ui === "actions" || col.header === "Actions") && !React.isValidElement(cellValue)) {
        return (
            <ActionButtons
                row={row}
                rowIdx={rowIdx}
                col={col}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
                onViewClick={onViewClick}
                actions={actions}
                editTitle={editTitle}
                deleteTitle={deleteTitle}
                viewTitle={viewTitle}
                entity={col.entity || entity || itemName}
                currentRole={currentRole || userRole}
                allowAllRoleActions={allowAllRoleActions}
                showActionsForAllRoles={showActionsForAllRoles}
            />
        );
    }

    // Formatted UI representations
    if (col.ui && !React.isValidElement(cellValue)) {
        switch (col.ui) {
            case "code":
                return (
                    <span className="font-mono text-primary mini-text px-8 py-2 rounded-4 font-500" style={{ background: "#eff6ff" }}>
                        {cellValue !== undefined && cellValue !== null && cellValue !== "" ? String(cellValue) : "-"}
                    </span>
                );
            case "lead-category": {
                const cat = String(cellValue || "enquiry").toLowerCase().trim();
                const config = {
                    product: { label: "Product", bg: "#f5f3ff", color: "#7c3aed", border: "#ddd6fe" },
                    enquiry: { label: "Enquiry", bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
                    manual: { label: "Manual", bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
                }[cat] || { label: cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "Enquiry", bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" };

                return (
                    <span
                        className="px-8 py-2 rounded-20 mini-text font-600 inline-flex items-center gap-4"
                        style={{
                            backgroundColor: config.bg,
                            color: config.color,
                            border: `1px solid ${config.border}`,
                        }}
                    >
                        {config.label}
                    </span>
                );
            }
            case "score-pill": {
                const score = Number(cellValue) || 0;
                const color = score >= 80 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";
                const bg = score >= 80 ? "#ecfdf5" : score >= 50 ? "#fffbeb" : "#fef2f2";
                return (
                    <span className="mini-text font-600 px-8 py-4 rounded-20" style={{ background: bg, color, display: "inline-flex" }}>
                        {score ? `${score}%` : "-"}
                    </span>
                );
            }
            case "severity": {
                if (!cellValue || cellValue === "-" || cellValue === "none") {
                    return <span className="text-gray mini-text">-</span>;
                }
                const sev = String(cellValue || "low").toLowerCase().trim();
                const config = {
                    high: { label: "High", bg: "#fef2f2", color: "#ef4444", border: "#fecaca" },
                    medium: { label: "Medium", bg: "#fffbeb", color: "#f59e0b", border: "#fde68a" },
                    low: { label: "Low", bg: "#ecfdf5", color: "#10b981", border: "#a7f3d0" },
                }[sev] || { label: "Low", bg: "#ecfdf5", color: "#10b981", border: "#a7f3d0" };

                return (
                    <span
                        className="px-8 py-2 rounded-20 mini-text font-600 inline-flex items-center gap-4"
                        style={{
                            backgroundColor: config.bg,
                            color: config.color,
                            border: `1px solid ${config.border}`,
                        }}
                    >
                        <span
                            className="rounded-full inline-block"
                            style={{ width: 6, height: 6, backgroundColor: config.color }}
                        />
                        {config.label}
                    </span>
                );
            }
            case "image":
            case "img":
            case "profile":
                return <ProfileCell col={col} row={row} />;
            case "badge-list":
            case "arr-badge":
                return (
                    <BadgeList
                        items={cellValue}
                        color={col.badgeColor || "primary"}
                        shape={col.badgeShape || "rounded"}
                        size="sm"
                        limit={col.limit ?? col.max ?? 3}
                        expandable={col.expandable ?? true}
                    />
                );
            case "status": {
                const lower = String(cellValue || "").toLowerCase();
                let displayLabel;
                if (col.accessor === "isDeleted" || col.header === "Deleted") {
                    displayLabel = cellValue === true || lower === "true" || lower === "deleted" ? "Deleted" : "Active";
                } else {
                    const isActive = typeof cellValue === "boolean" ? cellValue : ["active", "approved", "published", "true"].includes(lower);
                    const isPending = ["pending", "review", "processing"].includes(lower);
                    displayLabel = cellValue && typeof cellValue === "string"
                        ? cellValue
                        : (isActive ? "Active" : isPending ? "Pending" : "Inactive");
                }
                return (
                    <Badge
                        variant="status"
                        text={displayLabel}
                        className="small-text font-500"
                    />
                );
            }
            case "badge":
                return (
                    <Badge
                        text={cellValue}
                        bg={col.badgeBg}
                        textColor={col.badgeColor}
                        shape={col.badgeShape || "pill"}
                        size="sm"
                    />
                );
            case "icon-badge": {
                const valStr = String(cellValue || "").toLowerCase();
                const isPrivate = ["private", "protected", "closed"].includes(valStr);
                const isRating = col.accessor === "rating" || col.icon === "Star" || col.iconName === "Star";
                const iconName = col.icon || col.iconName || (isRating ? "Star" : isPrivate ? "Lock" : "Unlock");
                const defaultTheme = isRating ? "warning" : isPrivate ? "danger" : "primary";
                return (
                    <Badge
                        text={cellValue}
                        icon={iconName}
                        theme={defaultTheme}
                        bg={col.badgeBg}
                        textColor={col.badgeColor}
                        shape={col.badgeShape || "pill"}
                    />
                );
            }
            case "text":
            case "desc":
                return (
                    <p
                        className={`text-gray mini-text ${col.ui === "desc" ? "line-clamp1" : ""}`}
                        title={col.ui === "desc" ? (cellValue || "") : undefined}
                        style={{ margin: 0 }}
                    >
                        {cellValue || "-"}
                    </p>
                );
            default:
                break;
        }
    }

    if (Array.isArray(cellValue)) {
        return (
            <BadgeList
                items={cellValue}
                color={col.badgeColor || "primary"}
                shape={col.badgeShape || "rounded"}
                size="sm"
                limit={col.limit ?? col.max ?? 3}
                expandable={col.expandable ?? true}
            />
        );
    }

    return (
        <p className="text-gray mini-text" style={{ margin: 0 }}>
            {cellValue !== undefined && cellValue !== null && cellValue !== "" ? String(cellValue) : "-"}
        </p>
    );
});
TableCell.displayName = "TableCell";

// Memoized Collapsed Details View
const TableExpandedDetails = React.memo(({
    row,
    rowIdx,
    collapsedColumns,
    displayHeadersCount,
    actionProps,
}) => (
    <tr>
        <td colSpan={displayHeadersCount} className="">
            <div className="bg-white p-12" style={{ borderLeft: "4px solid var(--primary)" }}>
                <div className="grid-cols-4 gap-12">
                    {collapsedColumns.map((col, cIdx) => (
                        <div key={col.accessor || cIdx} className="p-12 rounded-5 border-ec">
                            <span className="mini-text text-gray font-600 uppercase block mb-6">{col.header}</span>
                            <div className="mini-text text-dark font-500">
                                <TableCell
                                    col={col}
                                    row={row}
                                    rowIdx={rowIdx}
                                    {...actionProps}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </td>
    </tr>
));
TableExpandedDetails.displayName = "TableExpandedDetails";

// Memoized Table Row Component
const TableRow = React.memo(({
    row,
    rowIdx,
    displayHeaders,
    collapsedColumns,
    isExpanded,
    onToggleExpand,
    isSelected,
    onToggleSelect,
    actionProps,
}) => {
    const rowId = row._id || row.id || rowIdx;

    return (
        <React.Fragment>
            <tr className={isExpanded ? "bg-light-primary-subtle" : ""}>
                {displayHeaders.map((col, colIdx) => {
                    if (col.accessor === "_expand") {
                        return (
                            <td key={colIdx} className="p-10 text-center bordb" style={{ verticalAlign: "middle" }}>
                                <Button
                                    icon="ChevronDown"
                                    version="icon"
                                    bg='tertiary'
                                    color='gray'
                                    onClick={() => onToggleExpand(rowId)}
                                    className='rounded-5'
                                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                                    title={isExpanded ? "Collapse Details" : "Expand Details"}
                                />
                            </td>
                        );
                    }

                    return (
                        <td
                            key={colIdx}
                            style={{ verticalAlign: "middle", ...col.style }}
                            className={`p-10 text-dark bordb ${col.className || ""}`}
                        >
                            <TableCell
                                col={col}
                                row={row}
                                rowIdx={rowIdx}
                                isSelected={isSelected}
                                onToggleSelect={onToggleSelect}
                                {...actionProps}
                            />
                        </td>
                    );
                })}
            </tr>
            {collapsedColumns.length > 0 && isExpanded && (
                <TableExpandedDetails
                    row={row}
                    rowIdx={rowIdx}
                    collapsedColumns={collapsedColumns}
                    displayHeadersCount={displayHeaders.length}
                    actionProps={actionProps}
                />
            )}
        </React.Fragment>
    );
});
TableRow.displayName = "TableRow";

// Memoized Table Header Component
const TableHeader = React.memo(({ displayHeaders, isAllSelected, onToggleSelectAll }) => (
    <thead>
        <tr>
            {displayHeaders.map((col, idx) => {
                const isCheckbox = col.accessor === "checkbox" || col.ui === "checkbox";
                return (
                    <th
                        key={idx}
                        style={col.style}
                        className={`bg-primary p-10 capitalize ${col.className || ""}`}
                    >
                        {isCheckbox ? (
                            <div className="flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={Boolean(isAllSelected)}
                                    onChange={(e) => onToggleSelectAll?.(e.target.checked)}
                                    className="cursor-pointer"
                                    aria-label="Select all rows"
                                />
                            </div>
                        ) : (
                            <p className={`mini-text text-white font-500 ${col.className?.includes("text-center") ? "text-center" : col.className?.includes("text-right") ? "text-right" : "text-left"}`}>
                                {col.header}
                            </p>
                        )}
                    </th>
                );
            })}
        </tr>
    </thead>
));
TableHeader.displayName = "TableHeader";

// Built-in Universal Detail / Info Modal Component for Table Rows across all pages
const TableInfoModal = React.memo(({ isOpen, onClose, row, columns = [], title = "Record Details", onEdit }) => {
    if (!row) return null;

    const heroImage =
        row.image ||
        (Array.isArray(row.images) ? row.images[0] : "") ||
        row.avatar ||
        row.profileImage ||
        row.thumbnail ||
        "";
    const resolvedHeroImg = resolveImagePath(heroImage);

    const mainTitle =
        row.productName ||
        row.name ||
        row.title ||
        row.fullname ||
        row.rolename ||
        row.categoryName ||
        row.blogName ||
        row.pageName ||
        row.id ||
        title;

    const itemCode = row.id || row._id || "";
    const categoryName = row.category || row.categoryName || (row.categoryId?.categoryName) || "";
    const roleName = row.role || row.rolename || "";
    const severity = row.severity || "";
    const isActive = row.isActive !== undefined ? Boolean(row.isActive) : (row.status !== "Inactive");
    const isDeleted = Boolean(row.isDeleted);

    // Creator data
    const creator = row.createdby || row.createdBy;
    const creatorName =
        (typeof creator === "object" ? (creator.fullname || creator.name || creator.email) : creator) || "System Admin";
    const creatorAvatar = typeof creator === "object" ? (creator.avatar || creator.image || "") : "";
    const creatorMobile = typeof creator === "object" ? (creator.mobile || creator.phone || "") : "";

    // Specific domain attributes
    const hasPrice = row.price !== undefined && row.price !== null && row.price !== "";
    const priceFormatted = hasPrice ? `₹${Number(row.price).toLocaleString("en-IN")}` : "";
    const hasStock = row.totalStock !== undefined || row.stock !== undefined;
    const stockVal = `${row.totalStock ?? row.stock ?? 0} ${row.unit || "Pcs"}`;

    // All column attributes mapping
    const displayedColFields = columns.filter(
        (c) => c && c.accessor && c.accessor !== "checkbox" && c.accessor !== "actions" && c.accessor !== "_expand"
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Info: ${mainTitle}`}
            size="md"
            type="sidebar"
            placement="right"
            footer={null}
        >
            <div className="gap-12 grid-cols-1">
                {/* 1. HERO HEADER CARD */}
                <div
                    className="p-14 rounded-8 flex items-start justify-between gap-12"
                    style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                >
                    <div className="flex items-center gap-12">
                        {resolvedHeroImg ? (
                            <Image
                                src={resolvedHeroImg}
                                alt={mainTitle}
                                className="rounded-8 object-cover bg-white"
                                style={{ width: "64px", height: "64px", border: "1px solid #e2e8f0", flexShrink: 0 }}
                            />
                        ) : (
                            <div
                                className="rounded-8 flex items-center justify-center text-white font-600 font-18"
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    backgroundColor: getDeterministicColor(String(mainTitle || itemCode)),
                                    flexShrink: 0,
                                }}
                            >
                                {String(mainTitle || "?").charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-8 flex-wrap">
                                <h3 className="font-600 font-16 text-dark" style={{ margin: 0 }}>
                                    {mainTitle}
                                </h3>
                                {itemCode && (
                                    <span
                                        className="font-mono mini-text px-6 py-2 rounded-4 font-600"
                                        style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}
                                    >
                                        {itemCode}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-6 mt-6 flex-wrap">
                                <span
                                    className="px-8 py-2 rounded-20 mini-text font-600 inline-flex items-center gap-4"
                                    style={{
                                        backgroundColor: isDeleted ? "#fee2e2" : isActive ? "#ecfdf5" : "#fef2f2",
                                        color: isDeleted ? "#b91c1c" : isActive ? "#10b981" : "#ef4444",
                                        border: `1px solid ${isDeleted ? "#fca5a5" : isActive ? "#a7f3d0" : "#fecaca"}`,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "6px",
                                            height: "6px",
                                            borderRadius: "50%",
                                            backgroundColor: isDeleted ? "#b91c1c" : isActive ? "#10b981" : "#ef4444",
                                        }}
                                    />
                                    {isDeleted ? "Trash / Deleted" : isActive ? "Active" : "Inactive"}
                                </span>

                                {categoryName && (
                                    <span
                                        className="px-8 py-2 rounded-20 mini-text font-500"
                                        style={{ backgroundColor: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1" }}
                                    >
                                        {categoryName}
                                    </span>
                                )}

                                {roleName && (
                                    <span
                                        className="px-8 py-2 rounded-20 mini-text font-600"
                                        style={{ backgroundColor: "#e0e7ff", color: "#4338ca", border: "1px solid #c7d2fe" }}
                                    >
                                        Role: {roleName}
                                    </span>
                                )}

                                {severity && (
                                    <span
                                        className="px-8 py-2 rounded-20 mini-text font-600 capitalize"
                                        style={{
                                            backgroundColor: severity === "high" ? "#fee2e2" : severity === "medium" ? "#fef3c7" : "#ecfdf5",
                                            color: severity === "high" ? "#b91c1c" : severity === "medium" ? "#b45309" : "#047857",
                                        }}
                                    >
                                        Severity: {severity}
                                    </span>
                                )}

                                {row.isTrending && (
                                    <span
                                        className="px-8 py-2 rounded-20 mini-text font-600"
                                        style={{ backgroundColor: "#fef3c7", color: "#b45309", border: "1px solid #fde68a" }}
                                    >
                                        ★ Trending
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {hasPrice && (
                        <div className="text-right" style={{ flexShrink: 0 }}>
                            <div className="font-700 font-18 text-primary" style={{ color: "#2563eb" }}>
                                {priceFormatted}
                            </div>
                            <div className="mini-text text-gray mt-2">
                                {hasStock ? `Stock: ${stockVal}` : (row.currency || "INR")}
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. CREATOR & AUDIT TIMESTAMPS */}
                <div
                    className="p-12 rounded-8 flex items-center justify-between gap-12 flex-wrap"
                    style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
                >
                    <div className="flex items-center gap-10">
                        {resolveImagePath(creatorAvatar) ? (
                            <Image
                                src={resolveImagePath(creatorAvatar)}
                                alt={creatorName}
                                className="rounded-full object-cover"
                                style={{ width: "36px", height: "36px", border: "1px solid #e2e8f0" }}
                            />
                        ) : (
                            <div
                                className="rounded-full flex items-center justify-center text-white font-600 font-14"
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    backgroundColor: getDeterministicColor(String(creatorName)),
                                }}
                            >
                                {String(creatorName || "A").charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <div className="mini-text text-gray font-400">Created By</div>
                            <div className="small-text font-600 text-dark">
                                {creatorName}
                                {creatorMobile ? (
                                    <span className="font-400 text-gray ml-6 font-mono" style={{ fontSize: "11px" }}>
                                        ({creatorMobile})
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-16 text-right">
                        {row.createdAt && (
                            <div>
                                <div className="mini-text text-gray">Created Date</div>
                                <div className="mini-text font-600 text-dark font-mono">
                                    {formatDate(row.createdAt)}
                                </div>
                            </div>
                        )}
                        {row.updatedAt && (
                            <div>
                                <div className="mini-text text-gray">Last Updated</div>
                                <div className="mini-text font-600 text-dark font-mono">
                                    {formatDate(row.updatedAt)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. DESCRIPTIONS / TEXT CONTENT */}
                {(row.shortDesc || row.description || row.quote || row.comment) && (
                    <div className="flex flex-col gap-10" style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", background: "#fff" }}>
                        <div className="font-600 text-dark font-13" style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "6px" }}>
                            Description & Content
                        </div>
                        {row.shortDesc && (
                            <div className="p-8 rounded-6 font-12" style={{ background: "#f8fafc", color: "#334155", borderLeft: "3px solid #3b82f6" }}>
                                <span className="font-600 text-dark">Summary: </span>
                                {row.shortDesc}
                            </div>
                        )}
                        {row.description && (
                            <div className="font-12 text-secondary" style={{ lineHeight: "1.6", whiteSpace: "pre-line" }}>
                                {row.description}
                            </div>
                        )}
                        {row.quote && (
                            <blockquote className="p-8 font-12 italic text-gray" style={{ borderLeft: "3px solid #94a3b8", background: "#f8fafc", margin: 0 }}>
                                "{row.quote}"
                            </blockquote>
                        )}
                        {row.comment && (
                            <div className="p-8 rounded-6 font-12" style={{ background: "#fefce8", border: "1px solid #fef08a", color: "#854d0e" }}>
                                <span className="font-600">Comment: </span>
                                {row.comment}
                                {row.rating && (
                                    <span className="ml-8 font-600 text-primary">
                                        ({"★".repeat(Math.min(5, Math.max(1, Math.round(Number(row.rating)))))} {row.rating}/5)
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* 4. GALLERY IMAGES PREVIEW */}
                {Array.isArray(row.images) && row.images.length > 0 && (
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", background: "#fff" }}>
                        <div className="font-600 text-dark font-13 mb-8">
                            Gallery Images ({row.images.length})
                        </div>
                        <div className="flex items-center gap-10 flex-wrap">
                            {row.images.map((imgItem, idx) => {
                                const resolved = resolveImagePath(imgItem);
                                if (!resolved) return null;
                                return (
                                    <div key={idx} style={{ position: "relative" }}>
                                        <Image
                                            src={resolved}
                                            alt={`Gallery ${idx + 1}`}
                                            className="rounded-6 object-cover"
                                            style={{ width: "80px", height: "80px", border: "1px solid #e2e8f0" }}
                                        />
                                        <span
                                            className="font-mono text-white rounded-full font-600"
                                            style={{
                                                position: "absolute",
                                                bottom: "4px",
                                                right: "4px",
                                                background: "rgba(0,0,0,0.6)",
                                                fontSize: "9px",
                                                padding: "1px 5px",
                                            }}
                                        >
                                            #{idx + 1}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 5. SPECIFICATIONS / ATTRIBUTES */}
                {Array.isArray(row.specifications) && row.specifications.length > 0 && (
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", background: "#fff" }}>
                        <div className="font-600 text-dark font-13 mb-8">
                            Product Specifications
                        </div>
                        <div className="grid-cols-2 gap-8" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                            {row.specifications.map((spec, sIdx) => (
                                <div
                                    key={sIdx}
                                    className="p-8 rounded-6 flex justify-between gap-8 mini-text"
                                    style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}
                                >
                                    <span className="font-500 text-gray">{spec.name}:</span>
                                    <span className="font-600 text-dark">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 6. PERMISSIONS & PAGES (FOR ROLES) */}
                {Array.isArray(row.permissions) && row.permissions.length > 0 && (
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", background: "#fff" }}>
                        <div className="font-600 text-dark font-13 mb-8">
                            Assigned Permissions ({row.permissions.length})
                        </div>
                        <div className="flex flex-wrap gap-6">
                            {row.permissions.map((p, pIdx) => (
                                <span
                                    key={pIdx}
                                    className="px-8 py-3 rounded-4 font-mono mini-text font-500"
                                    style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #e2e8f0" }}
                                >
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {Array.isArray(row.pages) && row.pages.length > 0 && (
                    <div className='p-15 rounded-5 border-ec'>
                        <h4 className="font-600 mid-text text-dark mb-8">
                            Accessible Pages ({row.pages.length})
                        </h4>
                        <div className="flex flex-wrap gap-6">
                            {row.pages.map((pg, pgIdx) => (
                                <p
                                    key={pgIdx}
                                    className="px-8 py-3 rounded-5 mini-text font-500"
                                    style={{ background: "#e0f2fe", color: "#0369a1", border: "1px solid #bae6fd" }}
                                >
                                    {pg}
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                {/* 7. ALL FIELDS & ATTRIBUTES INSPECTOR */}
                <div className='p-15 rounded-5 border-ec'>
                    <div className="grid-cols-1 gap-6">
                        {displayedColFields.map((c, cIdx) => {
                            const val = getNestedValue(row, c.accessor);
                            if (val === undefined || val === null || val === "") return null;
                            if (c.accessor === "image" || c.accessor === "avatar" || c.accessor === "images") return null;

                            let displayVal = "";
                            if (typeof val === "boolean") {
                                displayVal = val ? "Yes / True" : "No / False";
                            } else if (Array.isArray(val)) {
                                displayVal = val.join(", ");
                            } else if (typeof val === "object") {
                                displayVal = val.name || val.title || val.categoryName || val.rolename || JSON.stringify(val);
                            } else if (c.ui === "date" || c.accessor.toLowerCase().includes("date") || c.accessor === "createdAt" || c.accessor === "updatedAt") {
                                displayVal = formatDate(val);
                            } else {
                                displayVal = String(val);
                            }

                            return (
                                <div
                                    key={cIdx}
                                    className="grid-cols-2 items-center justify-between p-8 rounded-5"
                                    style={{ background: cIdx % 2 === 0 ? "#f8fafc" : "#ffffff" }}
                                >
                                    <p className="font-400 small-text text-gray">{c.header}:</p>
                                    <p className="font-500 small-text text-dark line-clamp1 text-right" title={displayVal}>
                                        {displayVal}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Modal>
    );
});
TableInfoModal.displayName = "TableInfoModal";

const Table = ({
    title,
    subtitle,
    headerSub,
    data = [],
    columns = [],
    totalItems = 0,
    itemsPerPage = 10,
    page = 1,
    onPageChange,
    searchQuery = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    searchDebounceMs = 500,
    showControls = true,
    itemName = "items",
    loading = false,
    emptyAction = null,
    collapsible = false,
    maxVisibleColumns = 5,
    minWidth = "1100px",
    showInactive = true,
    allowInactive = true,
    allowAllRoleActions = false,
    showActionsForAllRoles = false,
    entity,
    currentRole,
    userRole: propUserRole,
    onEdit,
    onDelete,
    onView,
    actions,
    editTitle,
    deleteTitle,
    viewTitle,
    selectedRows,
    onSelectRow,
    onSelectAll,
}) => {
    const [expandedRowId, setExpandedRowId] = React.useState(null);
    const [internalSelectedRowIds, setInternalSelectedRowIds] = React.useState(() => new Set());
    const [infoModalRow, setInfoModalRow] = React.useState(null);

    const toggleRow = React.useCallback((id) => {
        setExpandedRowId((prev) => (prev === id ? null : id));
    }, []);

    const subText = subtitle || headerSub;

    // Check if collapsing is active
    const hasExplicitCollapsed = React.useMemo(() => columns.some((col) => col.collapsed !== undefined), [columns]);
    const shouldCollapse = collapsible || hasExplicitCollapsed || (columns.filter(c => c.accessor !== "checkbox" && c.accessor !== "actions").length > maxVisibleColumns && collapsible !== false);

    const [displayHeaders, collapsedColumns] = React.useMemo(() => {
        let main = columns;
        let collapsed = [];
        if (shouldCollapse) {
            if (hasExplicitCollapsed) {
                main = columns.filter(c => !c.collapsed);
                collapsed = columns.filter(c => c.collapsed);
            } else {
                const chk = columns.find((c) => c.accessor === "checkbox" || c.ui === "checkbox");
                const acts = columns.find((c) => c.accessor === "actions" || c.ui === "actions");
                const dataCols = columns.filter((c) => c !== chk && c !== acts);
                main = [
                    ...(chk ? [chk] : []),
                    ...dataCols.slice(0, maxVisibleColumns),
                    ...(acts ? [acts] : [])
                ];
                collapsed = dataCols.slice(maxVisibleColumns);
            }
        }
        if (collapsed.length > 0) {
            const actionsIdx = main.findIndex(c => c.accessor === "actions" || c.ui === "actions");
            const expandCol = { header: "Details", accessor: "_expand", style: { width: "70px" }, className: "text-center" };
            main = [...main];
            if (actionsIdx !== -1) {
                main.splice(actionsIdx, 0, expandCol);
            } else {
                main.push(expandCol);
            }
        }
        return [main, collapsed];
    }, [columns, shouldCollapse, hasExplicitCollapsed, maxVisibleColumns]);

    // Checkbox selection handlers
    const isRowSelected = React.useCallback((rowId, row) => {
        if (selectedRows !== undefined) {
            if (Array.isArray(selectedRows)) {
                return (
                    selectedRows.includes(rowId) ||
                    (row?.id && selectedRows.includes(row.id)) ||
                    (row?._id && selectedRows.includes(row._id))
                );
            }
            if (selectedRows instanceof Set) {
                return (
                    selectedRows.has(rowId) ||
                    (row?.id && selectedRows.has(row.id)) ||
                    (row?._id && selectedRows.has(row._id))
                );
            }
            return Boolean(selectedRows);
        }
        return (
            internalSelectedRowIds.has(rowId) ||
            (row?.id && internalSelectedRowIds.has(row.id)) ||
            (row?._id && internalSelectedRowIds.has(row._id)) ||
            Boolean(row?.checked || row?.isSelected)
        );
    }, [selectedRows, internalSelectedRowIds]);

    const handleSelectRow = React.useCallback((rowId, row) => {
        if (onSelectRow) {
            onSelectRow(rowId, row);
        } else {
            setInternalSelectedRowIds((prev) => {
                const next = new Set(prev);
                if (next.has(rowId)) next.delete(rowId);
                else next.add(rowId);
                return next;
            });
        }
    }, [onSelectRow]);

    const { user: hookUser, role: hookRole } = useCurrentUser();
    const effectiveRole = currentRole || propUserRole || hookUser || hookRole;
    const isAdmin = React.useMemo(() => isAdminOrDevAdmin(effectiveRole), [effectiveRole]);

    // Show table data for all roles (including active & inactive records when showInactive is true)
    const displayData = React.useMemo(() => {
        if (!Array.isArray(data)) return [];
        if (showInactive && allowInactive) return data;
        if (isAdmin) return data;
        return data.filter((row) => {
            if (!row || typeof row !== "object") return false;
            if (row.isActive !== undefined) {
                return row.isActive === true || row.isActive === "true";
            }
            if (row.status !== undefined) {
                const s = String(row.status).toLowerCase();
                return s !== "inactive" && s !== "draft" && s !== "disabled";
            }
            return true;
        });
    }, [data, isAdmin, showInactive, allowInactive]);

    const isAllSelected = React.useMemo(() => {
        if (!displayData.length) return false;
        return displayData.every((row, idx) => isRowSelected(row._id || row.id || idx, row));
    }, [displayData, isRowSelected]);

    const handleSelectAll = React.useCallback((checked) => {
        const nextChecked = typeof checked === "boolean" ? checked : !isAllSelected;
        const allIds = displayData.map((r, i) => r.id || r._id || i);
        if (onSelectAll) {
            onSelectAll(nextChecked, allIds, displayData);
        } else if (onSelectRow && selectedRows !== undefined) {
            allIds.forEach((id) => {
                const selected = isRowSelected(id);
                if (nextChecked && !selected) onSelectRow(id);
                if (!nextChecked && selected) onSelectRow(id);
            });
        } else {
            setInternalSelectedRowIds(nextChecked ? new Set(allIds) : new Set());
        }
    }, [displayData, onSelectAll, isAllSelected, onSelectRow, selectedRows, isRowSelected]);

    // Search with Debouncing, AbortController, ClearTimeout & useDeferredValue
    const [searchTerm, setSearchTerm] = React.useState(searchQuery);
    const deferredSearch = React.useDeferredValue(searchTerm);
    const debounceTimerRef = React.useRef(null);
    const abortControllerRef = React.useRef(null);
    const lastQueryRef = React.useRef(searchQuery);

    // Sync external query prop changes (e.g. parent reset/clear filters)
    React.useEffect(() => {
        setSearchTerm(searchQuery || "");
        lastQueryRef.current = searchQuery || "";
    }, [searchQuery]);

    // Cleanup timer & abort pending requests on unmount
    React.useEffect(() => {
        return () => {
            if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
            abortControllerRef.current?.abort();
        };
    }, []);

    // Dispatch search query with AbortController and Request Cancellation
    const triggerSearch = React.useCallback((query) => {
        if (!onSearchChange) return;
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

        const val = typeof query === "string" ? query : "";
        if (val === lastQueryRef.current) return;
        lastQueryRef.current = val;

        // Abort previous pending search request
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        onSearchChange(val, controller.signal);
    }, [onSearchChange]);

    // Debounced search handler: resets timer on every keystroke, waits until typing stops
    const handleSearch = React.useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.target?.value ?? "");
        setSearchTerm(next);

        if (!onSearchChange) return;

        // Clear existing debounce timer on each keystroke
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

        // Immediate search when input is emptied
        if (!next.trim()) {
            triggerSearch("");
            return;
        }

        // Debounce: trigger search only after user stops typing for searchDebounceMs
        debounceTimerRef.current = setTimeout(() => {
            triggerSearch(next);
        }, searchDebounceMs);
    }, [onSearchChange, triggerSearch, searchDebounceMs]);

    // Instant search on Enter key
    const handleSearchKeyDown = React.useCallback((e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            triggerSearch(searchTerm);
        }
    }, [triggerSearch, searchTerm]);

    const actionProps = React.useMemo(() => ({
        onEdit,
        onDelete,
        onView,
        onViewClick: (r) => setInfoModalRow(r),
        actions,
        editTitle,
        deleteTitle,
        viewTitle,
        itemName,
        entity: entity || itemName,
        currentRole: effectiveRole,
        allowAllRoleActions,
        showActionsForAllRoles,
    }), [onEdit, onDelete, onView, actions, editTitle, deleteTitle, viewTitle, itemName, entity, effectiveRole, allowAllRoleActions, showActionsForAllRoles]);

    return (
        <>
            <style>{`
                @media (max-width: 768px) {
                    .responsive-table-el {
                        min-width: max-content !important;
                    }
                    .responsive-table-el th,
                    .responsive-table-el td {
                        white-space: nowrap !important;
                    }
                }
            `}</style>
            {(title || (showControls && onSearchChange)) && (
                <div className="flex items-center justify-between mb-8">
                    {title ? (
                        <div className="w-70">
                            <h2 className="headmini-text text-dark font-500">{title}</h2>
                            {subText && <p className="text-gray font-400 mini-text">{subText}</p>}
                        </div>
                    ) : <div />}
                    {showControls && onSearchChange && (
                        <div className="w-30">
                            <Fields
                                type="input"
                                icon="Search"
                                iconPosition="right"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={handleSearch}
                                onKeyDown={handleSearchKeyDown}
                            />
                        </div>
                    )}
                </div>
            )}

            {loading && (!displayData || displayData.length === 0) ? (
                <Skeleton variant="array-text" count={5} style={{ marginTop: "12px" }} />
            ) : (
                <div className="table-w rounded-5 mt-12 bordl bordr" style={{ overflowX: "auto", position: "relative" }}>
                    {loading && (
                        <div style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "3px",
                            background: "linear-gradient(90deg, transparent, #2563eb, transparent)",
                            backgroundSize: "200% 100%",
                            animation: "tableLoadingProgress 1.4s infinite ease-in-out",
                            zIndex: 20,
                        }}>
                            <style>{`
                                @keyframes tableLoadingProgress {
                                    0% { background-position: -200% 0; }
                                    100% { background-position: 200% 0; }
                                }
                            `}</style>
                        </div>
                    )}
                    <table className="w-full responsive-table-el" style={{ borderCollapse: "collapse", minWidth, opacity: loading ? 0.75 : 1, transition: "opacity 0.2s ease" }}>
                        <TableHeader
                            displayHeaders={displayHeaders}
                            isAllSelected={isAllSelected}
                            onToggleSelectAll={handleSelectAll}
                        />
                        <tbody>
                            {displayData.length === 0 ? (
                                <tr>
                                    <td colSpan={displayHeaders.length}>
                                        <div className="py-40 text-center bordb">
                                            <p className="head-text text-gray">🔍</p>
                                            <p className="text-gray small-text mt-7">No data found .</p>
                                            {emptyAction && <div className="mt-14 flex justify-center">{emptyAction}</div>}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                displayData.map((row, rowIdx) => {
                                    const rowId = row._id || row.id || rowIdx;
                                    return (
                                        <TableRow
                                            key={rowId}
                                            row={row}
                                            rowIdx={rowIdx}
                                            displayHeaders={displayHeaders}
                                            collapsedColumns={collapsedColumns}
                                            isExpanded={expandedRowId === rowId}
                                            onToggleExpand={toggleRow}
                                            isSelected={isRowSelected(rowId, row)}
                                            onToggleSelect={handleSelectRow}
                                            actionProps={actionProps}
                                        />
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {onPageChange && (totalItems || displayData.length) > itemsPerPage && (
                <Pagination
                    page={page}
                    totalItems={totalItems || displayData.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                    itemName={itemName}
                />
            )}

            {/* Built-in Universal Detail / Info Modal Component for Table Rows across all pages */}
            {infoModalRow && (
                <TableInfoModal
                    isOpen={Boolean(infoModalRow)}
                    onClose={() => setInfoModalRow(null)}
                    row={infoModalRow}
                    columns={columns}
                    title={title || itemName}
                    onEdit={onEdit}
                />
            )}
        </>
    );
};

export default React.memo(Table);