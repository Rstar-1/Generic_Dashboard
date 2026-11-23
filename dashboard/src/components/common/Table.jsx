import React from 'react';

import Image from "./Image";
import Skeleton from "./Skeleton";
import Button from "./Button";
import Fields from "../forms/Fields";
import Pagination from "./Pagination";
import Badge, { BadgeList } from "./Badge";

import {
    resolveImagePath,
    formatDate,
    getFirstValue,
    getNestedValue,
    canPerformAction,
    getCurrentRole,
    hasPermission,
    useCurrentUser,
    isAdminOrDevAdmin
} from '../../utils';
import { AVATAR_PALETTE } from '../../utils/apiData';

export { formatDate, Badge, BadgeList };

const ActionButtons = React.memo(({ row, rowIdx, col, onEdit, onDelete, onView, actions, editTitle, deleteTitle, viewTitle, entity, currentRole }) => {
    const activeRole = currentRole || getCurrentRole() || "admin";
    const activeEntity = col.entity || entity || (typeof window !== "undefined" ? window.location?.pathname : "");

    const rowActions = col.actions || actions;

    const allowedActions = React.useMemo(() => {
        if (Array.isArray(rowActions) && rowActions.length > 0) {
            return rowActions.filter((act) => {
                if (!act) return false;
                if (act.permission) return hasPermission(activeRole, act.permission);
                if (act.action) return canPerformAction(activeRole, act.action, activeEntity);
                return true;
            });
        }

        const editFn = col.onEdit || onEdit;
        const deleteFn = col.onDelete || onDelete;
        const viewFn = col.onView || onView;
        if (!editFn && !deleteFn && !viewFn) return [];

        const list = [];
        const canView = col.canView !== undefined ? col.canView : (viewFn ? true : canPerformAction(activeRole, "view", activeEntity));
        const canEdit = col.canEdit !== undefined ? col.canEdit : canPerformAction(activeRole, "edit", activeEntity);
        const canDelete = col.canDelete !== undefined ? col.canDelete : canPerformAction(activeRole, "delete", activeEntity);

        if (viewFn && canView) {
            list.push({
                icon: "Eye",
                bg: "light-info",
                color: "info",
                title: col.viewTitle || viewTitle || "View",
                onClick: (r, idx) => viewFn(r || row, idx ?? rowIdx),
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
    }, [col, actions, rowActions, onEdit, onDelete, onView, activeRole, activeEntity, row, rowIdx, viewTitle, editTitle, deleteTitle]);

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
    const isOnlyImage =
        col.onlyImage === true ||
        col.imageOnly === true ||
        col.ui === "image" ||
        col.ui === "img" ||
        (!isCreatorCol && (col.accessor === "image" || String(col.header || "").toLowerCase().includes("image")));

    const isImageAccessor =
        col.accessor === "image" ||
        col.accessor === "img" ||
        col.accessor === "avatar" ||
        col.accessor === "thumbnail" ||
        isOnlyImage;

    const name = getFirstValue(
        [rawVal, obj, !isCreatorCol ? row : null],
        ["fullname", "name", "username", col.nameKey, "createdByName", "pageName", "sectionName", "title"]
    );
    const subText = getFirstValue(
        [obj, !isCreatorCol ? row : null],
        [col.subKey, col.emailKey, "mobile", "phone", "email", "sub", "path", "sku", "author"]
    );

    let rawImg = "";
    if (isCreatorCol) {
        rawImg = getFirstValue(obj, [col.imageKey, "avatar", "image", "profileImage", "photo", "avatarUrl", "profileImg", "url", "src"]);
        if (!rawImg) {
            rawImg = getFirstValue(row, ["avatar", "image", "profileImage", "creatorImage", "authorImage"]);
        }
        if (!rawImg && ((name && name.toLowerCase().includes("raj")) || (subText && String(subText).includes("8779030638")))) {
            rawImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80";
        }
        if (!rawImg) {
            rawImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80";
        }
    } else if (isImageAccessor) {
        rawImg = (typeof rawVal === "string" && rawVal.trim())
            ? rawVal.trim()
            : (getFirstValue([rawVal, obj, row], [col.imageKey, "image", "avatar", "thumbnail", "url", "src"]) || (Array.isArray(row?.images) ? row.images[0] : ""));
    } else {
        rawImg = getFirstValue([obj, row], [col.imageKey, "avatar", "image", "thumbnail", "profileImage", "url", "src"]) || (Array.isArray(row?.images) ? row.images[0] : "");
    }

    if (rawImg && typeof rawImg === "object") {
        rawImg = rawImg.url || rawImg.path || rawImg.src || rawImg.preview || "";
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
            ) : isCreatorCol ? (
                <img
                    src="/images/avatar-default.svg"
                    alt={name || "User Avatar"}
                    className="rounded-5 object-cover bg-forth"
                    style={imgStyle}
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
                {subText && <p className="text-gray mini-text font-500 line-clamp1">{subText}</p>}
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
    actions,
    editTitle,
    deleteTitle,
    viewTitle,
    itemName,
    currentRole
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
                actions={actions}
                editTitle={editTitle}
                deleteTitle={deleteTitle}
                viewTitle={viewTitle}
                entity={col.entity || itemName}
                currentRole={currentRole}
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
    collapsible = false,
    maxVisibleColumns = 5,
    minWidth = "1100px",
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

    const { user: currentUser, role: userRole } = useCurrentUser();
    const isAdmin = React.useMemo(() => isAdminOrDevAdmin(userRole || currentUser), [userRole, currentUser]);

    // For non-admin roles, only items where isActive is true are shown (admin and dev admin see both true & false)
    const displayData = React.useMemo(() => {
        if (isAdmin || !Array.isArray(data)) return data || [];
        return (data || []).filter((row) => {
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
    }, [data, isAdmin]);

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
        actions,
        editTitle,
        deleteTitle,
        viewTitle,
        itemName,
        currentRole: userRole
    }), [onEdit, onDelete, onView, actions, editTitle, deleteTitle, viewTitle, itemName, userRole]);

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

            {loading ? (
                <Skeleton variant="array-text" count={5} style={{ marginTop: "12px" }} />
            ) : (
                <div className="table-w rounded-5 mt-12 bordl bordr" style={{ overflowX: "auto" }}>
                    <table className="w-full responsive-table-el" style={{ borderCollapse: "collapse", minWidth }}>
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

            {onPageChange && (isAdmin ? totalItems : displayData.length) > itemsPerPage && (
                <Pagination
                    page={page}
                    totalItems={isAdmin ? totalItems : displayData.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                    itemName={itemName}
                />
            )}
        </>
    );
};

export default React.memo(Table);