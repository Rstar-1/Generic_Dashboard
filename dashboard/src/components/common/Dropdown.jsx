import React, { useEffect, useRef, useCallback } from "react";

const Dropdown = React.memo(
  ({
    isOpen,
    onClose,
    children,
    className = "",
    style = {},
    align = "left",
    minWidth = "210px",
    padding = "0",
    ...props
  }) => {
    const dropdownRef = useRef(null);

    const handleClickOutside = useCallback(
      (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          onClose?.();
        }
      },
      [onClose]
    );

    useEffect(() => {
      if (!isOpen || !onClose) return;

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, onClose, handleClickOutside]);

    if (!isOpen) return null;

    const alignStyle =
      align === "full"
        ? { left: 0, right: 0, width: "100%" }
        : align === "center"
        ? { left: "50%", transform: "translateX(-50%)", minWidth }
        : { [align]: 0, minWidth };

    return (
      <div
        ref={dropdownRef}
        className={`bg-white ${className}`}
        style={{
          position: "absolute",
          top: "100%",
          ...alignStyle,
          padding,
          zIndex: 1000,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
