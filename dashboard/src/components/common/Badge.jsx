import React from "react";

import Icon from "./Icon";

import { getFirstValue, isColorCode } from "../../utils";

export const getBadgeTheme = (val) => {
    switch (String(val || "").trim().toLowerCase()) {
        case "approved":
        case "active":
            return {
                bg: "rgba(75, 181, 67, 0.12)",
                color: "var(--successtext)",
                border: "var(--success)",
                dot: "var(--success)",
            };

        case "rejected":
        case "failed":
        case "inactive":
        case "deleted":
            return {
                bg: "rgba(194, 27, 27, 0.12)",
                color: "var(--danger)",
                border: "var(--danger)",
                dot: "var(--danger)",
            };

        case "pending":
            return {
                bg: "rgba(251, 87, 17, 0.12)",
                color: "var(--warningtext)",
                border: "var(--warning)",
                dot: "var(--warning)",
            };

        default:
            return {
                bg: "var(--forth)",
                color: "var(--primary)",
                border: "var(--tertiary)",
                dot: "var(--primary)",
            };
    }
};

export const getShapeClass = (shape) => {
    switch (shape) {
        case "rounded":
            return "rounded-5";
        case "circle":
            return "rounded-full";
        case "pill":
        default:
            return "rounded-20";
    }
};

export const getSizeClass = (size) => {
    switch (size) {
        case "sm":
            return "px-10 py-4 mini-text";
        case "lg":
            return "px-17 py-6 small-text";
        case "md":
        default:
            return "px-16 py-7 mini-text";
    }
};

export const Badge = React.memo(({
    text = "",
    children,
    color,
    theme,
    bg,
    textColor,
    borderColor,
    shape = "pill",
    variant = "filled",
    size = "md",
    icon,
    iconPosition = "left",
    iconSize = 12,
    iconColor,
    iconClassName = "",
    dot,
    capitalize = true,
    className = "",
    style = {},
    onClick,
    ...props
}) => {
    const label = (text !== undefined && text !== null && text !== "") ? text : (children ?? "");
    const resolvedTheme = getBadgeTheme(getFirstValue([color, theme, label]));
    const effectiveVariant = (dot || variant === "status" || variant === "dot") ? "status" : variant;
    const sizeClass = getSizeClass(size);
    const shapeClass = getShapeClass(shape);

    switch (effectiveVariant) {
        case "status": {
            const dotColor = typeof dot === "string" ? dot : (resolvedTheme.dot || textColor || resolvedTheme.color);
            const statusTextColor = textColor || resolvedTheme.color;
            return (
                <div
                    onClick={onClick}
                    className={`flex items-center gap-6 ${onClick ? "cursor-pointer" : ""} ${className}`}
                    style={style}
                    {...props}
                >
                    <span
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: dotColor,
                            boxShadow: `0 0 6px ${dotColor}`,
                            flexShrink: 0,
                        }}
                    />
                    <p
                        className={`${capitalize ? "capitalize" : ""} mini-text font-500`}
                        style={{ color: statusTextColor }}
                    >
                        {label}
                    </p>
                </div>
            );
        }

        case "outline":
        case "filled":
        default: {
            const isOutline = effectiveVariant === "outline";
            const finalBg = bg || (isOutline ? "transparent" : resolvedTheme.bg);
            const finalColor = textColor || resolvedTheme.color;
            const finalBorder = borderColor || (isOutline ? getFirstValue([resolvedTheme.border, finalColor]) : "transparent");

            const bgClass = !isColorCode(finalBg) && String(finalBg).startsWith("bg-") ? finalBg : "";
            const textClass = !isColorCode(finalColor) && String(finalColor).startsWith("text-") ? finalColor : "";

            const inlineStyle = {
                display: "inline-flex",
                alignItems: "center",
                gap: icon ? 6 : 4,
                backgroundColor: bgClass ? undefined : finalBg,
                color: textClass ? undefined : finalColor,
                border: finalBorder !== "transparent" ? `1px solid ${finalBorder}` : undefined,
                lineHeight: 1,
                ...style,
            };

            return (
                <p
                    onClick={onClick}
                    className={`${shapeClass} ${sizeClass} ${bgClass} ${textClass} ${capitalize ? "capitalize" : ""} font-500 ${onClick ? "cursor-pointer hover:opacity-90" : ""} ${className}`}
                    style={inlineStyle}
                    {...props}
                >
                    {icon && iconPosition === "left" && (
                        <Icon name={icon} width={iconSize} height={iconSize} strokeWidth="2.5" stroke={iconColor || "currentColor"} className={iconClassName} />
                    )}
                    <span>{label}</span>
                    {icon && iconPosition === "right" && (
                        <Icon name={icon} width={iconSize} height={iconSize} strokeWidth="2.5" stroke={iconColor || "currentColor"} className={iconClassName} />
                    )}
                </p>
            );
        }
    }
});
Badge.displayName = "Badge";

export const BadgeList = React.memo(({
    items = [],
    color = "primary",
    shape = "rounded",
    size = "md",
    gap = 4,
    limit = 3,
    max,
    expandable = true,
    className = "",
    renderItem,
    onItemClick,
    ...props
}) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const list = React.useMemo(() => {
        if (Array.isArray(items)) return items;
        if (typeof items === "string" && items.includes(",")) {
            return items.split(",").map((s) => s.trim()).filter(Boolean);
        }
        return items !== undefined && items !== null && items !== "" ? [items] : [];
    }, [items]);

    const effectiveLimit = typeof max === "number" ? max : limit;
    const hasLimit = typeof effectiveLimit === "number" && effectiveLimit > 0 && list.length > effectiveLimit;
    const visibleList = hasLimit && !isExpanded ? list.slice(0, effectiveLimit) : list;
    const remainingCount = list.length - effectiveLimit;

    const remainingLabels = React.useMemo(() => {
        if (!hasLimit) return [];
        return list.slice(effectiveLimit).map((it) => {
            if (typeof it === "object" && it !== null) {
                return getFirstValue(it, ["label", "name", "title", "text", "tag", "permission", "slug", "id"]);
            }
            return String(it ?? "");
        }).filter(Boolean);
    }, [hasLimit, list, effectiveLimit]);

    const handleToggle = React.useCallback((e) => {
        e?.stopPropagation?.();
        setIsExpanded((prev) => !prev);
    }, []);

    if (!list.length) return null;

    return (
        <div className={`flex items-center gap-${gap} flex-wrap ${className}`} {...props}>
            {visibleList.map((item, idx) => {
                if (renderItem) return renderItem(item, idx);
                const label = typeof item === "object" && item !== null
                    ? getFirstValue(item, ["label", "name", "title", "text", "tag", "permission", "slug", "id"])
                    : item;
                const itemColor = typeof item === "object" && item !== null ? (item.color || item.badgeColor || color) : color;
                const itemShape = typeof item === "object" && item !== null ? item.shape || shape : shape;
                const itemIcon = typeof item === "object" && item !== null ? item.icon : undefined;

                return (
                    <Badge
                        key={idx}
                        text={label}
                        color={itemColor}
                        shape={itemShape}
                        size={size}
                        icon={itemIcon}
                        onClick={onItemClick ? () => onItemClick(item, idx) : undefined}
                    />
                );
            })}

            {hasLimit && (
                expandable ? (
                    <p
                        role="button"
                        tabIndex={0}
                        onClick={handleToggle}
                        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleToggle(e)}
                        title={!isExpanded ? remainingLabels.join(", ") : "Click to collapse"}
                        className="cursor-pointer text-gray mini-text font-500"
                    >
                        {isExpanded ? "Show less" : `+${remainingCount} More`}
                    </p>
                ) : (
                    <Badge
                        text={`+${remainingCount} More`}
                        color="light-primary"
                        shape={shape}
                        size={size}
                        title={remainingLabels.join(", ")}
                    />
                )
            )}
        </div>
    );
});
BadgeList.displayName = "BadgeList";

export default Badge;
