import React from 'react';

export const THEMES = {
    light: { bg: "#e2e8f0", grad: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)" },
    dark: { bg: "#1e293b", grad: "linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)" },
    adaptive: { bg: "rgba(0,0,0,0.08)", grad: "linear-gradient(90deg, rgba(0,0,0,0.08) 25%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.08) 75%)" },
    translucent: { bg: "rgba(255,255,255,0.2)", grad: "linear-gradient(90deg, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 75%)" },
};

export const SKELETON_VARIANTS = [
    { label: "Text", value: "text" },
    { label: "Array Text", value: "array-text" },
    { label: "Image", value: "image" },
    { label: "Circle", value: "circle" },
    { label: "Card", value: "card" },
    { label: "Array Card", value: "array-card" },
];

export const SKELETON_THEMES = [
    { label: "Light Theme", value: "light" },
    { label: "Dark Theme", value: "dark" },
    { label: "Adaptive", value: "adaptive" },
    { label: "Translucent", value: "translucent" },
];

export const SKELETON_ANIMATIONS = [
    { label: "Shimmer", value: "shimmer" },
    { label: "Pulse", value: "pulse" },
    { label: "None", value: "none" },
];

const SkeletonContext = React.createContext(null);

const BaseSkeleton = React.memo(({ width, height, borderRadius, style = {}, className = "", theme, animation, ...props }) => {
    const ctx = React.useContext(SkeletonContext);
    const activeTheme = theme || ctx?.theme || "light";
    const activeAnim = animation || ctx?.animation || "shimmer";
    const active = THEMES[activeTheme] || THEMES.light;

    const baseStyle = {
        display: "inline-block",
        position: "relative",
        overflow: "hidden",
        verticalAlign: "middle",
        width: width || "100%",
        height: height || "16px",
        borderRadius: borderRadius || "4px",
        backgroundColor: activeAnim === "shimmer" ? "transparent" : active.bg,
        backgroundImage: activeAnim === "shimmer" ? active.grad : "none",
        backgroundSize: activeAnim === "shimmer" ? "200% 100%" : "auto",
        animation:
            activeAnim === "shimmer"
                ? "sk-shimmer 1.5s infinite linear"
                : activeAnim === "pulse"
                    ? "sk-pulse 1.5s infinite ease-in-out"
                    : "none",
        ...style,
    };

    return <div className={`skeleton-element ${className}`} style={baseStyle} {...props} />;
});

BaseSkeleton.displayName = "BaseSkeleton";

const Skeleton = React.memo(
    ({
        variant = "text",
        width,
        height,
        borderRadius,
        count,
        className = "",
        theme = "light",
        animation = "shimmer",
        style = {},
        imageHeight,
        ...props
    }) => {
        const renderContent = () => {
            switch (variant) {
                // 1. Text (Single line)
                case "text":
                    return (
                        <BaseSkeleton
                            width={width || "100%"}
                            height={height || "16px"}
                            borderRadius={borderRadius || "4px"}
                            className={className}
                            theme={theme}
                            animation={animation}
                            style={{ margin: "4px 0", ...style }}
                            {...props}
                        />
                    );

                // 2. Array Text (Multiple text lines)
                case "array-text":
                case "array_text":
                case "arrayText":
                case "table": {
                    const lineCount = count !== undefined ? Number(count) : 4;
                    return (
                        <div className={`flex flex-column gap-8 ${className}`} style={style}>
                            {Array.from({ length: lineCount }).map((_, idx) => (
                                <BaseSkeleton
                                    key={idx}
                                    width={width || ["100%", "92%", "96%", "65%"][idx % 4]}
                                    height={height || "14px"}
                                    borderRadius={borderRadius || "4px"}
                                    theme={theme}
                                    animation={animation}
                                    style={{ margin: 0 }}
                                />
                            ))}
                        </div>
                    );
                }

                // 3. Image (Rectangle/Image placeholder)
                case "image":
                case "rect":
                case "banner":
                    return (
                        <BaseSkeleton
                            width={width || "100%"}
                            height={height || "200px"}
                            borderRadius={borderRadius || "8px"}
                            className={className}
                            theme={theme}
                            animation={animation}
                            style={style}
                            {...props}
                        />
                    );

                // 4. Circle (Avatar/Badge)
                case "circle":
                    return (
                        <BaseSkeleton
                            width={width || "40px"}
                            height={height || width || "40px"}
                            borderRadius="50%"
                            className={className}
                            theme={theme}
                            animation={animation}
                            style={style}
                            {...props}
                        />
                    );

                // 5. Card (Single product/content card)
                case "card": {
                    const cardBg =
                        theme === "dark"
                            ? "#0f172a"
                            : theme === "light"
                                ? "#ffffff"
                                : "rgba(255,255,255,0.05)";
                    return (
                        <div
                            className={`rounded-5 p-12 border-ec ${className}`}
                            style={{
                                background: cardBg,
                                width: width || "100%",
                                height: height || "auto",
                                ...style,
                            }}
                        >
                            <BaseSkeleton
                                height={imageHeight || height || "180px"}
                                borderRadius="6px"
                                theme={theme}
                                animation={animation}
                            />
                            <div className="mt-12 flex flex-column gap-8">
                                <BaseSkeleton width="35%" height="12px" theme={theme} animation={animation} />
                                <BaseSkeleton width="85%" height="18px" theme={theme} animation={animation} />
                                <div className="flex flex-column gap-4 mt-4">
                                    <BaseSkeleton width="100%" height="12px" theme={theme} animation={animation} />
                                    <BaseSkeleton width="65%" height="12px" theme={theme} animation={animation} />
                                </div>
                                <div className="flex justify-between items-center mt-10">
                                    <BaseSkeleton width="30%" height="16px" theme={theme} animation={animation} />
                                    <BaseSkeleton
                                        width="70px"
                                        height="28px"
                                        borderRadius="4px"
                                        theme={theme}
                                        animation={animation}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                }

                // 6. Array Card (Card Grid/List)
                case "array-card":
                case "array_card":
                case "arrayCard":
                case "card-grid": {
                    const cardCount = count !== undefined ? Number(count) : 4;
                    const gridClass = className.includes("grid-")
                        ? className
                        : `grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-16 ${className}`;
                    return (
                        <div className={gridClass} style={style}>
                            {Array.from({ length: cardCount }).map((_, idx) => (
                                <Skeleton
                                    key={idx}
                                    variant="card"
                                    theme={theme}
                                    animation={animation}
                                    imageHeight={imageHeight}
                                />
                            ))}
                        </div>
                    );
                }

                default:
                    return (
                        <BaseSkeleton
                            width={width || "100%"}
                            height={height || "16px"}
                            borderRadius={borderRadius || "4px"}
                            className={className}
                            theme={theme}
                            animation={animation}
                            style={style}
                            {...props}
                        />
                    );
            }
        };

        return (
            <SkeletonContext.Provider value={{ theme, animation }}>
                {renderContent()}
            </SkeletonContext.Provider>
        );
    }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
