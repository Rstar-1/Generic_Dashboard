import React, { createContext, useContext, memo } from 'react';
import Container from "./Container";

const SkeletonContext = createContext(null);

const THEMES = {
    light: { bg: "#e2e8f0", grad: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)" },
    dark: { bg: "#1e293b", grad: "linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)" },
    adaptive: { bg: "rgba(0,0,0,0.08)", grad: "linear-gradient(90deg, rgba(0,0,0,0.08) 25%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.08) 75%)" },
    translucent: { bg: "rgba(255,255,255,0.2)", grad: "linear-gradient(90deg, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 75%)" }
};

const S = memo(function S({ theme, animation, ...props }) {
    const ctx = useContext(SkeletonContext);
    return (
        <Skeleton
            theme={theme || (ctx ? ctx.theme : undefined)}
            animation={animation || (ctx ? ctx.animation : undefined)}
            {...props}
        />
    );
});

// Inject keyframes globally once (safe for SSR)
if (typeof document !== "undefined" && !document.getElementById("skeleton-styles")) {
    const style = document.createElement("style");
    style.id = "skeleton-styles";
    style.textContent = `
    @keyframes sk-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    @keyframes sk-pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
  `;
    document.head.appendChild(style);
}

const Skeleton = memo(({
    variant = "rect", // "rect" | "circle" | "text" | "card" | "blog" | "section-header" | "card-grid" | "articles" | "promo" | "reviews" | "product-detail" | "hero" | "browse-category" | "why-choose" | "review-section" | "table" | "form"
    width,
    height,
    borderRadius,
    count,
    className = "",
    theme = "light", // "light" | "dark" | "adaptive"
    animation = "shimmer", // "shimmer" | "pulse" | "none"
    style = {},
    columns = [],
    ...props
}) => {
    const itemCount = count !== undefined ? count : (variant === "card-grid" || variant === "articles" ? 4 : 1);
    const active = THEMES[theme] || THEMES.light;

    const baseStyle = {
        display: "inline-block",
        position: "relative",
        overflow: "hidden",
        verticalAlign: "middle",
        backgroundColor: animation === "shimmer" ? "transparent" : active.bg,
        backgroundImage: animation === "shimmer" ? active.grad : "none",
        backgroundSize: animation === "shimmer" ? "200% 100%" : "auto",
        animation: animation === "shimmer" ? "sk-shimmer 1.5s infinite linear" : animation === "pulse" ? "sk-pulse 1.5s infinite ease-in-out" : "none",
    };

    const getStyle = () => {
        switch (variant) {
            case "circle":
                return { borderRadius: "50%", width: width || "40px", height: height || "40px" };
            case "text":
                return { borderRadius: borderRadius || "4px", width: width || "100%", height: height || "16px", margin: "8px 0" };
            default: // "rect"
                return { borderRadius: borderRadius || "6px", width: width || "100%", height: height || "150px" };
        }
    };

    const renderContent = () => {
        // Hero Section Skeleton
        if (variant === "hero") {
            return (
                <div className={`py-40 w-full ${className}`} style={{ minHeight: '500px', ...style }}>
                    <div className="grid-cols-2 sm-grid-cols-1 gap-12 items-center w-full overflow-hidden">
                        <div className="w-full pr-12 sm-pr-1 flex flex-column gap-12">
                            <S variant="rect" width="180px" height="34px" borderRadius="20px" theme="dark" />
                            <S variant="rect" width="80%" height="48px" borderRadius="4px" theme="dark" />
                            <S variant="text" width="90%" count={2} theme="dark" />
                            <div className="grid-cols-2 sm-grid-cols-1 gap-12 mt-30">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <div key={idx} className="flex items-center gap-12 mb-16">
                                        <S variant="circle" width="40px" height="40px" theme="dark" />
                                        <div className="flex-grow flex flex-column gap-6">
                                            <S variant="text" width="50%" height="14px" theme="dark" style={{ margin: 0 }} />
                                            <S variant="text" width="80%" height="10px" theme="dark" style={{ margin: 0 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-12 mt-20">
                                <S variant="rect" width="120px" height="40px" borderRadius="4px" theme="dark" />
                                <S variant="rect" width="150px" height="40px" borderRadius="4px" theme="dark" />
                            </div>
                        </div>
                        <div className="w-full pl-12 sm-pl-1 sm-mt-10">
                            <S variant="rect" height="500px" borderRadius="5px" theme="dark" />
                        </div>
                    </div>
                </div>
            );
        }

        // Where To Buy / Marketing Hero Section Skeleton
        if (variant === "where") {
            return (
                <div className={`grid-cols-2 sm-grid-cols-1 gap-12 items-center w-full py-30 ${className}`} style={{ minHeight: '450px', ...style }}>
                    <div className="relative grid-cols-1 gap-12 pr-12 sm-pr-1">
                        <S variant="rect" width="85%" height="70px" borderRadius="6px" theme="dark" />
                        <S variant="rect" width="90%" height="40px" borderRadius="4px" theme="dark" />
                        <div className="flex items-center gap-12 mt-20">
                            <S variant="rect" width="150px" height="42px" borderRadius="8px" theme="dark" />
                            <S variant="rect" width="160px" height="42px" borderRadius="8px" theme="dark" />
                        </div>
                    </div>
                    <div className="w-full">
                        <S variant="rect" width="100%" height="450px" borderRadius="6px" theme="dark" />
                    </div>
                </div>
            );
        }

        // Browse Category Section Skeleton
        if (variant === "browse-category") {
            return (
                <div className={`w-full py-30 ${className}`} style={{ minHeight: '180px', ...style }}>
                    <div className="grid-cols-6 md-grid-cols-4 sm-grid-cols-2 gap-12">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <div key={idx} className="px-10 py-20 bg-white rounded-10 text-center flex flex-column items-center gap-12">
                                <S variant="circle" width="80px" height="80px" />
                                <S variant="text" width="60%" height="12px" style={{ margin: 0 }} />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Why Choose Section Skeleton
        if (variant === "why-choose") {
            return (
                <div className={`grid-cols-2 sm-grid-cols-1 gap-12 items-center py-50 sm-py-40 w-full ${className}`} style={{ minHeight: '600px', ...style }}>
                    <div className="pr-15 sm-pr-1 flex flex-column gap-16">
                        <S variant="rect" width="80px" height="24px" borderRadius="5px" />
                        <S variant="rect" width="90%" height="36px" borderRadius="5px" />
                        <S variant="text" count={2} />
                        <div className="flex flex-column gap-12 mt-10">
                            {Array.from({ length: 2 }).map((_, idx) => (
                                <div key={idx} className="flex gap-12 items-center">
                                    <S variant="circle" width="50px" height="50px" />
                                    <div className="flex-grow flex flex-column gap-6">
                                        <S variant="text" width="40%" height="16px" />
                                        <S variant="text" width="90%" height="12px" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pl-15 sm-pl-1 sm-mt-10">
                        <div className="grid-cols-2 gap-12">
                            <S variant="rect" height="300px" borderRadius="5px" />
                            <S variant="rect" height="300px" borderRadius="5px" />
                        </div>
                    </div>
                </div>
            );
        }

        // Review Section Skeleton
        if (variant === "review-section") {
            return (
                <div className={`w-full py-40 ${className}`} style={{ minHeight: '280px', ...style }}>
                    <div className="flex md-flex-column sm-grid-cols-1 items-center gap-16">
                        <div className="w-20 md-w-full sm-w-full px-10 flex flex-column gap-8">
                            <S variant="rect" width="140px" height="28px" borderRadius="4px" />
                            <S variant="text" width="80px" height="12px" />
                        </div>
                        <div className="desktop-vertical-divider md-hidden" />
                        <div className="w-20 md-w-full sm-w-full px-10 flex flex-column gap-8">
                            <S variant="rect" width="100px" height="42px" borderRadius="4px" />
                            <S variant="rect" width="80px" height="12px" />
                        </div>
                        <div className="desktop-vertical-divider md-hidden" />
                        <div className="grid-cols-3 md-grid-cols-1 sm-grid-cols-1 gap-12 w-70 md-w-full sm-w-full px-10">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <div key={idx}>
                                    <div className="flex items-center gap-12 mb-10">
                                        <S variant="circle" width="45px" height="45px" />
                                        <div className="flex-grow flex flex-column gap-6">
                                            <S variant="text" width="60%" height="14px" />
                                            <S variant="text" width="40%" height="10px" />
                                        </div>
                                    </div>
                                    <S variant="text" count={2} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full my-24" style={{ height: '1px', backgroundColor: '#ececec' }} />
                    <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="flex items-center justify-center sm-justify-start gap-12">
                                <S variant="rect" width="80px" height="24px" borderRadius="4px" />
                                <S variant="rect" width="50px" height="16px" borderRadius="4px" />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Section Header Skeleton
        if (variant === "section-header") {
            return (
                <div className={`flex justify-between items-center mb-10 ${className}`} style={style}>
                    <S variant="rect" width={width || "200px"} height="32px" borderRadius="4px" />
                    <S variant="rect" width="80px" height="20px" borderRadius="4px" />
                </div>
            );
        }

        // Card Grid Skeleton
        if (variant === "card-grid") {
            const hasGridCols = className && (className.includes('grid-cols') || className.includes('grid-'));
            const finalClassName = hasGridCols ? className : `grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12 ${className}`;
            return (
                <div className={finalClassName} style={style}>
                    <S variant="card" count={itemCount} />
                </div>
            );
        }

        // Articles Section Skeleton
        if (variant === "articles") {
            return (
                <div className={`pt-30 pb-20 w-full ${className}`} style={{ minHeight: '500px', ...style }}>
                    <S variant="section-header" width="220px" />
                    <S variant="card-grid" count={itemCount} />
                </div>
            );
        }

        // Promo Banner Skeleton
        if (variant === "promo") {
            return (
                <div className={`w-full py-40 ${className}`} style={{ minHeight: '300px', ...style }}>
                    <div className="flex sm-grid-cols-1 items-center justify-between p-40 sm-p-20 gap-12 relative overflow-hidden rounded-5" style={{ background: 'linear-gradient(135deg, #020712 0%, #081026 100%)' }}>
                        <div className="w-60 sm-w-full pr-12 sm-pr-1 flex flex-column gap-12">
                            <S variant="rect" width="180px" height="24px" borderRadius="20px" theme="dark" />
                            <S variant="rect" width="70%" height="36px" borderRadius="4px" theme="dark" />
                            <S variant="text" width="90%" theme="dark" />
                            <S variant="rect" width="160px" height="40px" borderRadius="4px" theme="dark" />
                        </div>
                        <div className="relative flex items-center justify-center w-40 sm-w-full sm-mt-10 pl-12 sm-pl-1">
                            <S variant="rect" height="250px" borderRadius="5px" theme="dark" />
                        </div>
                    </div>
                    <div className="grid-cols-4 sm-grid-cols-1 md-grid-cols-2 gap-12 mt-20">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="flex items-center gap-12 rounded-5 border-ec p-14">
                                <S variant="rect" width="48px" height="48px" borderRadius="5px" />
                                <div className="flex-grow flex flex-column gap-6">
                                    <S variant="text" width="60%" height="14px" />
                                    <S variant="text" width="40%" height="10px" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Product Reviews Skeleton
        if (variant === "reviews") {
            return (
                <div className={`py-40 w-full ${className}`} style={style}>
                    <S variant="section-header" width="200px" />
                    <div className="grid-cols-2 md-grid-cols-1 gap-12 mt-12">
                        {Array.from({ length: count || 2 }).map((_, idx) => (
                            <div key={idx} className="border-ec p-15 rounded-5 flex flex-column gap-12">
                                <div className="flex items-center gap-12">
                                    <S variant="circle" width="40px" height="40px" />
                                    <div className="flex-grow flex flex-column gap-6">
                                        <S variant="text" width="120px" height="14px" style={{ margin: 0 }} />
                                        <S variant="text" width="80px" height="10px" style={{ margin: 0 }} />
                                    </div>
                                </div>
                                <S variant="text" count={2} />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Product Detail Skeleton
        if (variant === "product-detail") {
            return (
                <div className={`py-50 w-full ${className}`} style={style}>
                    <div className='flex sm-grid-cols-1 items-start gap-12'>
                        <div className='w-75 sm-w-full pr-5 sm-pr-1'>
                            <div className='grid-cols-2 sm-grid-cols-1 gap-12'>
                                <div className='pr-10 sm-pr-1'>
                                    <S variant="rect" width="100%" height="450px" borderRadius="5px" />
                                    <div className='grid-cols-4 gap-9 mt-12'>
                                        {Array.from({ length: 4 }).map((_, idx) => (
                                            <S key={idx} variant="rect" width="100%" height="100px" borderRadius="5px" />
                                        ))}
                                    </div>
                                </div>
                                <div className='pl-10 sm-pl-1 flex flex-column gap-12'>
                                    <S variant="rect" width="80%" height="32px" borderRadius="4px" />
                                    <S variant="rect" width="30%" height="16px" borderRadius="4px" />
                                    <div className="flex items-center gap-8">
                                        <S variant="rect" width="60px" height="24px" borderRadius="4px" />
                                        <S variant="rect" width="100px" height="16px" borderRadius="4px" />
                                    </div>
                                    <S variant="rect" width="150px" height="20px" borderRadius="4px" />
                                    <S variant="rect" width="45%" height="36px" borderRadius="4px" />
                                    <S variant="rect" width="120px" height="28px" borderRadius="4px" />
                                    <S variant="text" count={3} />
                                    <div className='grid-cols-2 gap-12 mt-12'>
                                        {Array.from({ length: 4 }).map((_, idx) => (
                                            <div key={idx} className='flex items-center gap-12 bg-forth p-12 rounded-5'>
                                                <S variant="rect" width="40px" height="40px" borderRadius="5px" />
                                                <div className="flex-grow flex flex-column gap-6">
                                                    <S variant="text" width="60%" />
                                                    <S variant="text" width="40%" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='grid-cols-2 gap-12 mt-12'>
                                        <S variant="rect" height="45px" borderRadius="5px" />
                                        <S variant="rect" height="45px" borderRadius="5px" />
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white mt-12 p-15 border-ec rounded-5'>
                                <div className="flex gap-12 mb-20 border-b pb-12">
                                    <S variant="rect" width="150px" height="32px" borderRadius="4px" />
                                    <S variant="rect" width="120px" height="32px" borderRadius="4px" />
                                    <S variant="rect" width="160px" height="32px" borderRadius="4px" />
                                </div>
                                <div className='grid-cols-2 sm-grid-cols-1 gap-12'>
                                    <div className='bg-tertiary p-16 rounded-5 flex flex-column gap-12'>
                                        {Array.from({ length: 5 }).map((_, idx) => (
                                            <div key={idx} className="flex justify-between border-b pb-8">
                                                <S variant="text" width="30%" />
                                                <S variant="text" width="40%" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-column gap-12">
                                        <S variant="rect" width="150px" height="24px" borderRadius="4px" />
                                        {Array.from({ length: 6 }).map((_, idx) => (
                                            <div key={idx} className="flex items-center gap-8">
                                                <S variant="circle" width="12px" height="12px" />
                                                <S variant="text" width="80%" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-25 sm-w-full grid-cols-1 gap-12 pl-5 sm-pl-1'>
                            <div className='border-ec p-15 rounded-5 flex flex-column gap-12'>
                                <S variant="rect" width="120px" height="24px" borderRadius="4px" />
                                <S variant="rect" width="100%" height="40px" borderRadius="4px" />
                                <S variant="rect" width="100%" height="40px" borderRadius="4px" />
                                <S variant="rect" width="100%" height="40px" borderRadius="4px" />
                                <S variant="rect" width="100%" height="100px" borderRadius="4px" />
                                <S variant="rect" width="100%" height="45px" borderRadius="4px" />
                            </div>
                            <div className='border-ec p-15 rounded-5 flex flex-column gap-12'>
                                <div className='flex items-center gap-10'>
                                    <S variant="rect" width="40px" height="40px" borderRadius="5px" />
                                    <div className="flex-grow flex flex-column gap-6">
                                        <S variant="text" width="70%" />
                                        <S variant="text" width="50%" />
                                    </div>
                                </div>
                                <S variant="rect" width="120px" height="16px" />
                                <div className="flex flex-column gap-8 py-8 border-t border-b">
                                    <S variant="text" width="60%" />
                                    <S variant="text" width="80%" />
                                    <S variant="text" width="50%" />
                                </div>
                                <S variant="rect" width="100%" height="36px" borderRadius="4px" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (variant === "card") {
            const cardBg = theme === "dark" ? "#0f172a" : theme === "light" ? "#ffffff" : "rgba(255,255,255,0.05)";
            return (
                <>
                    {Array.from({ length: itemCount }).map((_, idx) => (
                        <div
                            key={idx}
                            className={`rounded-5 ${className}`}
                            style={{
                                background: cardBg,
                                boxShadow: theme === "light" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none",
                                width: width || "100%",
                                height: height || "auto",
                                ...style
                            }}
                        >
                            <S variant="rect" height="180px" borderRadius="6px" />
                            <S variant="text" width="30%" height="12px" />
                            <S variant="text" width="85%" height="20px" />
                            <div className="flex flex-column gap-6">
                                <S variant="text" width="100%" height="12px" style={{ margin: 0 }} />
                                <S variant="text" width="60%" height="12px" style={{ margin: 0 }} />
                            </div>
                            <div className="flex justify-between items-center mt-8">
                                <S variant="text" width="25%" height="16px" style={{ margin: 0 }} />
                                <S variant="rect" width="60px" height="28px" borderRadius="4px" />
                            </div>
                        </div>
                    ))}
                </>
            );
        }

        if (variant === "blog") {
            const cardBg = theme === "dark" ? "#0f172a" : theme === "light" ? "#ffffff" : "rgba(255,255,255,0.05)";
            return (
                <>
                    {Array.from({ length: itemCount }).map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-full flex sm-grid-cols-1 rounded-5 overflow-hidden mb-20 ${className}`}
                            style={{
                                background: cardBg,
                                boxShadow: theme === "light" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none",
                                width: width || "100%",
                                height: height || "auto",
                                ...style
                            }}
                        >
                            <div className="w-40 sm-w-full" style={{ flexShrink: 0 }}>
                                <S variant="rect" height="250px" borderRadius="0px" />
                            </div>
                            <div className="w-60 sm-w-full" style={{ padding: "20px", flexGrow: 1 }}>
                                <S variant="text" width="25%" height="12px" />
                                <S variant="text" width="85%" height="24px" />
                                <div className="flex flex-column gap-6 my-10">
                                    <S variant="text" width="100%" height="12px" style={{ margin: 0 }} />
                                    <S variant="text" width="70%" height="12px" style={{ margin: 0 }} />
                                </div>
                                <div className="flex items-center gap-10 mt-15 pt-8" style={{ borderTop: "1px solid #ececec" }}>
                                    <S variant="circle" width="32px" height="32px" />
                                    <div className="flex-grow flex flex-column gap-4">
                                        <S variant="text" width="40%" height="12px" style={{ margin: 0 }} />
                                        <S variant="text" width="25%" height="10px" style={{ margin: 0 }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            );
        }

        if (variant === "banner") {
            return (
                <Container
                    className={`relative ${className}`}
                    style={{
                        background: "linear-gradient(135deg, #0d1525ff 0%, #030610ff 100%)",
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        ...style
                    }}
                >
                    <div className="w-full py-90">
                        <div className="flex items-center gap-8 mb-12">
                            <span
                                className="bg-warning"
                                style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    flexShrink: 0
                                }}
                            />
                            <S variant="rect" width="120px" height="14px" borderRadius="4px" theme="dark" style={{ display: 'inline-block', verticalAlign: 'middle', margin: 0 }} />
                        </div>

                        <S variant="rect" width="280px" height="28px" borderRadius="4px" theme="dark" style={{ display: 'inline-block', verticalAlign: 'middle', margin: 0 }} />

                        <div className="mt-15 flex items-center gap-8">
                            <S variant="rect" width="60px" height="14px" borderRadius="4px" theme="dark" style={{ margin: 0 }} />
                            <span className="text-white opacity-40">/</span>
                            <S variant="rect" width="80px" height="14px" borderRadius="4px" theme="dark" style={{ margin: 0 }} />
                            <span className="text-white opacity-40">/</span>
                            <S variant="rect" width="100px" height="14px" borderRadius="4px" theme="dark" style={{ margin: 0 }} />
                        </div>
                    </div>
                </Container>
            );
        }

        if (variant === "table") {
            const cols = columns.length > 0 ? columns : Array.from({ length: 5 }).map((_, idx) => ({ id: idx }));
            return (
                <div className={`table-w rounded-5 bordl bordr`} style={{ overflowX: "auto", ...style }}>
                    <table className={`w-full ${className}`} style={{ borderCollapse: "collapse", minWidth: props.minWidth || "1100px" }}>
                        <thead>
                            <tr>
                                {cols.map((col, idx) => (
                                    <th key={idx} className="bg-primary p-14 capitalize" style={col.style}>
                                        <div className="flex items-center" style={{ height: "16px" }}>
                                            <S variant="rect" width="60px" height="12px" borderRadius="3px" theme="translucent" style={{ margin: 0 }} />
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: count || 5 }).map((_, rIdx) => (
                                <tr key={rIdx}>
                                    {cols.map((col, cIdx) => {
                                        if (col.accessor === "checkbox") {
                                            return (
                                                <td key={cIdx} className="p-14 bordb" style={{ verticalAlign: "middle" }}>
                                                    <S variant="rect" width="18px" height="18px" borderRadius="3px" theme="adaptive" />
                                                </td>
                                            );
                                        }
                                        if (col.ui === "profile") {
                                            const imgSize = col.imgStyle?.width || "40px";
                                            return (
                                                <td key={cIdx} className="p-14 bordb" style={{ verticalAlign: "middle" }}>
                                                    <div className="flex items-center gap-12">
                                                        <S variant="rect" width={imgSize} height={imgSize} borderRadius="5px" theme="adaptive" />
                                                        <div className="flex-grow flex flex-column gap-6">
                                                            <S variant="text" width="70%" height="14px" theme="adaptive" style={{ margin: 0 }} />
                                                            <S variant="text" width="40%" height="10px" theme="adaptive" style={{ margin: 0 }} />
                                                        </div>
                                                    </div>
                                                </td>
                                            );
                                        }
                                        if (col.accessor === "actions" || col.header?.toLowerCase() === "action") {
                                            return (
                                                <td key={cIdx} className="p-14 bordb" style={{ verticalAlign: "middle" }}>
                                                    <S variant="rect" width="60px" height="28px" borderRadius="4px" theme="adaptive" />
                                                </td>
                                            );
                                        }
                                        const widths = ["60%", "45%", "80%", "50%"];
                                        const w = widths[cIdx % widths.length];
                                        return (
                                            <td key={cIdx} className="p-14 bordb" style={{ verticalAlign: "middle" }}>
                                                <S variant="text" theme="adaptive" height="14px" width={w} style={{ margin: 0 }} />
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (variant === "order") {
            return (
                <Container>
                    <div className="grid-cols-1 gap-10 w-full py-30">
                        <div className="border-ec p-20 rounded-10 bg-white flex flex-column gap-20">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-10">
                                    <S variant="rect" width="160px" height="24px" borderRadius="4px" />
                                    <S variant="rect" width="80px" height="20px" borderRadius="12px" />
                                </div>
                                <S variant="rect" width="140px" height="36px" borderRadius="6px" />
                            </div>
                            <S variant="text" width="200px" height="12px" style={{ margin: 0 }} />

                            {/* Stepper Timeline */}
                            <div className="grid-cols-4 sm-grid-cols-2 gap-12 my-20">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <div key={idx} className="flex flex-column items-center text-center gap-8">
                                        <S variant="circle" width="48px" height="48px" />
                                        <S variant="text" width="90px" height="14px" style={{ margin: 0 }} />
                                        <S variant="text" width="110px" height="10px" style={{ margin: 0 }} />
                                    </div>
                                ))}
                            </div>

                            {/* Alert banner */}
                            <S variant="rect" width="100%" height="45px" borderRadius="8px" />
                        </div>

                        {/* Bottom Row: Details & Summary */}
                        <div className="flex w-full sm-grid-cols-1 gap-12">
                            <div className="border-ec p-20 rounded-10 bg-white grid-cols-1 gap-12 w-70">
                                <S variant="rect" width="120px" height="20px" borderRadius="4px" />
                                <div className="flex gap-12 items-start p-12 border-ec rounded-8">
                                    <S variant="rect" width="80px" height="80px" borderRadius="6px" />
                                    <div className="grid-cols-1 gap-8">
                                        <div className="flex justify-between items-center gap-6 ">
                                            <S variant="rect" width="180px" height="18px" borderRadius="4px" />
                                            <S variant="rect" width="60px" height="18px" borderRadius="4px" />
                                        </div>
                                        <S variant="rect" width="120px" height="16px" borderRadius="10px" />
                                        <S variant="text" width="220px" height="12px" style={{ margin: 0 }} />
                                    </div>
                                </div>
                                <div className="flex justify-center mt-10">
                                    <S variant="rect" width="130px" height="36px" borderRadius="6px" />
                                </div>
                            </div>

                            {/* Right Summary */}
                            <div className="border-ec p-20 rounded-10 bg-white grid-cols-1 gap-12 w-30">
                                {Array.from({ length: 3 }).map((_, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <S variant="text" width="70px" height="14px" style={{ margin: 0 }} />
                                        <S variant="text" width="50px" height="14px" style={{ margin: 0 }} />
                                    </div>
                                ))}
                                <div style={{ height: "1px", backgroundColor: "#ececec" }} />
                                <div className="flex justify-between items-center">
                                    <S variant="text" width="90px" height="16px" style={{ margin: 0 }} />
                                    <S variant="text" width="70px" height="18px" style={{ margin: 0 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            );
        }

        if (variant === "cart") {
            const cartCols = [
                { header: "Item", accessor: "name", ui: "profile", imgStyle: { width: "60px", height: "60px" }, style: { width: "35%" } },
                { header: "Category", accessor: "category", style: { width: "20%" } },
                { header: "Quantity", accessor: "quantity", style: { width: "20%" } },
                { header: "Action", accessor: "id", style: { width: "10%" } }
            ];

            return (
                <Container>
                    <style>{`
          .cart-mobile-cards {
            display: none;
          }
          .cart-desktop-table {
            display: block;
          }
          @media (max-width: 768px) {
            .cart-mobile-cards {
              display: flex;
              flex-direction: column;
            }
            .cart-desktop-table {
              display: none;
            }
          }
        `}</style>
                    <div className="py-30 w-full flex sm-grid-cols-1 gap-12 items-start">
                        {/* Left Column: Cart items table / items */}
                        <div className="w-70 md-w-full sm-w-full pr-8 sm-pr-1 flex flex-column gap-12">
                            <div className="flex justify-between items-center">
                                <S variant="rect" width="160px" height="24px" borderRadius="4px" />
                                <S variant="rect" width="90px" height="32px" borderRadius="4px" />
                            </div>

                            {/* Desktop Table Skeleton */}
                            <div className="cart-desktop-table mt-10">
                                <S variant="table" columns={cartCols} count={count || 3} />
                            </div>

                            {/* Mobile Cards Skeleton */}
                            <div className="cart-mobile-cards gap-12 mt-10">
                                {Array.from({ length: count || 3 }).map((_, idx) => (
                                    <div key={idx} className="bg-white border-ec p-10 rounded-5 flex gap-12 items-start relative">
                                        <S variant="rect" width="80px" height="80px" borderRadius="5px" style={{ flexShrink: 0 }} />
                                        <div className="flex-grow pr-30">
                                            <S variant="rect" width="75%" height="18px" borderRadius="4px" />
                                            <div className="flex items-center gap-6 mt-6">
                                                <S variant="rect" width="60px" height="18px" borderRadius="10px" />
                                            </div>
                                            <div className="flex gap-12 items-center mt-10">
                                                <div className="flex flex-column gap-4">
                                                    <S variant="rect" width="40px" height="12px" borderRadius="3px" />
                                                    <S variant="rect" width="55px" height="10px" borderRadius="3px" />
                                                </div>
                                                <S variant="rect" width="80px" height="28px" borderRadius="4px" />
                                            </div>
                                        </div>
                                        <div className="absolute top-0 right-0 m-8">
                                            <S variant="rect" width="28px" height="28px" borderRadius="4px" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Note box skeleton */}
                            <S variant="rect" width="100%" height="60px" borderRadius="5px" />
                        </div>

                        {/* Right Column: Order Summary Skeleton */}
                        <div className="w-30 md-w-full sm-w-full pl-8 sm-pl-1">
                            <div className="bg-white border-ec p-12 rounded-5 flex flex-column gap-12">
                                <S variant="rect" width="60%" height="20px" borderRadius="4px" />
                                <S variant="text" width="85%" height="12px" style={{ margin: 0 }} />

                                <div className="grid-cols-1 gap-12 pt-12 bordh mt-4">
                                    {/* Mock item rows */}
                                    <div className="flex justify-between items-center">
                                        <S variant="text" width="50%" height="12px" style={{ margin: 0 }} />
                                        <S variant="text" width="20%" height="12px" style={{ margin: 0 }} />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <S variant="text" width="45%" height="12px" style={{ margin: 0 }} />
                                        <S variant="text" width="18%" height="12px" style={{ margin: 0 }} />
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <S variant="text" width="25%" height="12px" style={{ margin: 0 }} />
                                        <S variant="text" width="15%" height="12px" style={{ margin: 0 }} />
                                    </div>
                                    <div className="flex justify-between items-center bordb pb-10">
                                        <S variant="text" width="30%" height="12px" style={{ margin: 0 }} />
                                        <S variant="text" width="35%" height="12px" style={{ margin: 0 }} />
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <S variant="text" width="35%" height="14px" style={{ margin: 0 }} />
                                        <S variant="text" width="30%" height="14px" style={{ margin: 0 }} />
                                    </div>
                                    <div className="mt-8">
                                        <S variant="rect" width="100%" height="40px" borderRadius="4px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            );
        }

        // Generic Form Skeleton
        if (variant === "form") {
            return (
                <div className={`bg-white border-ec p-20 rounded-5 ${className}`} style={style}>
                    <S variant="text" width="60%" height="24px" />
                    <S variant="rect" height="40px" style={{ marginTop: '12px' }} />
                    <S variant="rect" height="40px" style={{ marginTop: '12px' }} />
                    <S variant="rect" height="40px" style={{ marginTop: '12px' }} />
                    <S variant="rect" height="100px" style={{ marginTop: '12px' }} />
                    <S variant="rect" height="42px" style={{ marginTop: '16px' }} />
                </div>
            );
        }

        return (
            <>
                {Array.from({ length: itemCount }).map((_, idx) => (
                    <div
                        key={idx}
                        className={`skeleton-element ${className}`}
                        style={{ ...baseStyle, ...getStyle(), ...style }}
                        {...props}
                    />
                ))}
            </>
        );
    };

    return (
        <SkeletonContext.Provider value={{ theme, animation }}>
            {renderContent()}
        </SkeletonContext.Provider>
    );
});

Skeleton.displayName = "Skeleton";

export default Skeleton;
