import React from "react";
import Icon from "./Icon";

const VERSION_CLASSES = {
  v0: "px-16 py-4 sm-px-12 sm-py-4 mini-text",
  v1: "px-20 py-9 para-text",
  v2: "px-19 py-8 sm-px-10 sm-py-7 small-text",
  v3: "w-full py-9 sm-py-12 small-text",
  icon: "p-8",
  none: "",
};

const isColorCode = (str) =>
  typeof str === "string" && (str.startsWith("#") || str.startsWith("rgb"));

const Button = React.memo(
  ({
    text = "",
    children,
    version = "v1",
    bg = "primary",
    color = "white",
    className = "",
    style = {},
    onClick = () => {},
    type = "button",
    disabled = false,
    variant = "filled",
    icon = "",
    iconWidth = "16",
    iconHeight = "16",
    iconStrokeWidth = "2.5",
    iconPosition = "left",
    iconFill,
    iconStroke,
    ...props
  }) => {
    const isOutline = variant === "outline";
    const isHexBg = isColorCode(bg);
    const isHexColor = isColorCode(color);

    const borderClass = isOutline ? (isHexBg ? "" : `border-${bg}`) : "border-0";
    const bgClass = isOutline ? "bg-transparent" : isHexBg ? "" : `bg-${bg}`;
    const textClass = isOutline
      ? isHexBg
        ? ""
        : `text-${bg}`
      : isHexColor
      ? ""
      : `text-${color}`;
    const versionClass = VERSION_CLASSES[version] || "w-full py-7 small-text";

    const defaultStroke =
      iconStroke || style.color || (isOutline ? "currentColor" : color);

    const iconElement = icon && (
      <Icon
        name={icon}
        width={iconWidth}
        height={iconHeight}
        strokeWidth={iconStrokeWidth}
        stroke={defaultStroke}
        fill={iconFill}
      />
    );

    const content = children || text;

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${versionClass} rounded-5 ${borderClass} ${bgClass} ${textClass} ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${className}`}
        style={{ ...style, ...(disabled ? { cursor: "not-allowed" } : {}) }}
        {...props}
      >
        {icon ? (
          content ? (
            <span className="flex items-center justify-center gap-8 w-full">
              {iconPosition !== "right" && iconElement}
              <span>{content}</span>
              {iconPosition === "right" && iconElement}
            </span>
          ) : (
            iconElement
          )
        ) : (
          content
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;