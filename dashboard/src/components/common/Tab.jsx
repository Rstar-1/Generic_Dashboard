import React, { memo, useMemo, useState, useCallback } from "react";

const TabItem = memo(
  ({ name, count, icon, tag, active, v2, version, value, onSelect }) => {
    const [hovered, setHovered] = useState(false);
    const v3 = version === "3" || version === "v3";

    const handleClick = useCallback(() => {
      onSelect?.(value);
    }, [onSelect, value]);

    if (v3) {
      return (
        <div
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="cursor-pointer px-16 py-6 rounded-20"
          style={{
            backgroundColor: active
              ? "var(--primary)"
              : hovered
              ? "rgba(255, 255, 255, 0.07)"
              : "rgba(255, 255, 255, 0.03)",
            transition: "all 0.2s ease",
          }}
        >
          <p
            className="mini-text font-400"
            style={{
              color: active ? "var(--white)" : "var(--gray)",
            }}
          >
            {name}
          </p>
        </div>
      );
    }

    const itemClass = v2
      ? `px-16 py-5 rounded-20 cursor-pointer flex items-center gap-8 ${
          active
            ? "bg-primary text-white font-600"
            : hovered
            ? "text-white font-500"
            : "text-gray font-500"
        }`
      : `px-20 py-9 cursor-pointer flex items-center gap-8 flex-shrink-0 transition ${
          active
            ? "bg-white text-primary font-600"
            : `rounded-5 ${
                hovered ? "bg-forth text-dark font-500" : "text-gray font-500"
              }`
        }`;

    return (
      <div
        className={itemClass}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flexShrink: 0,
          ...(active && !v2
            ? { borderBottom: "1px solid var(--primary)" }
            : {}),
        }}
      >
        {icon && (
          <span className="flex items-center justify-center">{icon}</span>
        )}
        <p className="small-text">{name}</p>

        {count != null && (
          <p
            className={`px-${v2 ? "8" : "9"} py-${v2 ? "2" : "3"} rounded-20 mini-text ${
              !v2 && active
                ? "bg-primary text-white font-600"
                : !v2
                ? "bg-tertiary text-gray"
                : ""
            }`}
            style={
              v2
                ? {
                    backgroundColor: active
                      ? "rgba(255,255,255,.25)"
                      : "rgba(255,255,255,.08)",
                    color: "var(--white)",
                  }
                : undefined
            }
          >
            {count}
          </p>
        )}
      </div>
    );
  }
);

TabItem.displayName = "TabItem";

const Tab = memo(
  ({
    tabs = [],
    activeTab,
    onChange,
    version = "1",
    className = "",
    style = {},
  }) => {
    const v2 = version === "2" || version === "v2";
    const v3 = version === "3" || version === "v3";

    const normalizedTabs = useMemo(
      () =>
        tabs.map((tab, idx) => {
          const object = typeof tab === "object" && tab !== null;
          const indexNum = String(idx + 1).padStart(2, "0");

          return {
            name: object ? tab.name || tab.label : tab,
            count: object ? tab.count : null,
            icon: object ? tab.icon : null,
            tag: object
              ? tab.tag || tab.node || `${indexNum} / NODE`
              : `${indexNum} / NODE`,
            value: object ? tab.value || tab.name || tab.label : tab,
          };
        }),
      [tabs]
    );

    const handleSelect = useCallback(
      (val) => {
        onChange?.(val);
      },
      [onChange]
    );

    return (
      <div
        className={`tabs-container flex items-center ${
          v2
            ? "gap-6 p-4 rounded-30 w-max max-w-full"
            : v3
            ? "gap-12 w-full max-w-full"
            : "bordb gap-8 w-full"
        } ${className}`}
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          ...style,
        }}
      >
        {normalizedTabs.map((tab) => (
          <TabItem
            key={tab.value}
            {...tab}
            v2={v2}
            version={version}
            active={activeTab === tab.value}
            onSelect={handleSelect}
          />
        ))}
      </div>
    );
  }
);

Tab.displayName = "Tab";

export default Tab;