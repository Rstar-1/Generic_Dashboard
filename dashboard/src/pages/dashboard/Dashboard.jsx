import React from "react";
import Chart from "react-apexcharts";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import Image from "../../components/common/Image";
import Icon from "../../components/common/Icon";
import Accordion from "../../components/common/Accordion";
import { showToast } from "../../components/common/Toast";
import DashImg from "../../assets/dashimg.png";

/* ==========================================================================
   CHART CONFIGURATIONS & REUSABLE CHART COMPONENT
   ========================================================================== */
const GenericChart = ({ type, categories, series, colors, height, options }) => {
    const mergedOptions = {
        ...options,
        chart: { ...options?.chart, type },
        colors: colors || options?.colors,
        ...(categories
            ? {
                labels: categories,
                xaxis: { ...options?.xaxis, categories }
            }
            : {})
    };
    return <Chart type={type} series={series} height={options?.chart?.height || height} options={mergedOptions} />;
};
GenericChart.displayName = "GenericChart";

const DONUT_CHART_OPTIONS = {
    chart: { height: 300, offsetY: 0, fontFamily: "Poppins, sans-serif" },
    stroke: { show: true, width: 5, colors: ["var(--white, #fff)"] },
    grid: { padding: { top: 10, bottom: -100 } },
    plotOptions: {
        pie: {
            startAngle: -105,
            endAngle: 105,
            offsetY: 0,
            donut: {
                size: "70%",
                labels: {
                    show: true,
                    name: { offsetY: -45, color: "var(--gray)" },
                    value: { fontSize: "35px", fontWeight: 600, offsetY: -20, color: "var(--dark)" },
                    total: { show: true, label: "Total Sales", color: "var(--gray)", offsetY: 5 }
                }
            }
        }
    },
    legend: {
        show: true,
        position: "bottom",
        offsetY: -125,
        fontSize: "13px",
        itemMargin: {
            horizontal: 3,
            vertical: 2
        },
        markers: {
            width: 6,
            height: 6,
            radius: 8
        },
        labels: { colors: "var(--dark)" }
    },
    dataLabels: { enabled: false }
};

const SPARKLINE_BAR_OPTIONS = {
    chart: { type: "bar", toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { borderRadius: 3, columnWidth: "65%", distributed: true } },
    dataLabels: { enabled: false },
    xaxis: {
        categories: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        offsetY: -9,
        labels: {
            show: true,
            axisBorder: { show: false },
            axisTicks: { show: false },
            style: { colors: "var(--gray)", fontSize: "12px" }
        }
    },
    grid: { padding: { bottom: 20 } },
    colors: ["var(--tertiary)", "var(--tertiary)", "var(--tertiary)", "var(--tertiary)", "#7c69ef", "var(--tertiary)", "var(--tertiary)"],
    tooltip: { enabled: true }
};

/* ==========================================================================
   STATIC MOCK DATA
   ========================================================================== */
const STATIC_DATA = {
    profile: {
        role: "Administrator",
        formattedSales: "₹489K"
    },
    totalSales: 489000,
    totalOrders: 1248,
    totalRevenue: 865400,
    orderManagementData: [185, 320, 243, 500],
    weeklyEarningsData: [35, 50, 42, 68, 95, 60, 40],
    weeklyTotal: 84250,
    formattedWeeklyTotal: "₹84.3K",
    leadsWeeklyData: [45, 58, 52, 78, 92, 64, 80],
    totalLeadsCount: 4200,
    formattedLeadsCount: "4k",
    yearlyRevenueData: [45000, 78000, 62000, 95000, 110000, 145000, 130000, 175000, 160000, 195000, 220000, 265000],
    topProducts: [
        { id: 1, name: "Heavy Duty PVC Strip Curtains", category: "Industrial", price: 4500, stock: 120 },
        { id: 2, name: "Polar Grade Cold Room Curtains", category: "Commercial", price: 6200, stock: 85 },
        { id: 3, name: "Anti-Insect Yellow Strip Rolls", category: "Safety", price: 3800, stock: 210 },
        { id: 4, name: "Welding Screen Amber Shield", category: "Specialty", price: 7400, stock: 45 },
        { id: 5, name: "Standard Ribbed Clear Strips", category: "Standard", price: 2900, stock: 350 }
    ],
    dashboardCounts: [
        { title: "Total Users", value: "12", prefix: "", change: "+12.5%", isPositive: true, icon: "Trending" },
        { title: "Total Leads", value: "1,248", prefix: "", change: "+8.2%", isPositive: true, icon: "Bag" },
    ],
    earningsBreakdown: [
        { label: "Earnings", value: "₹84,250", color: "var(--primary)" },
        { label: "Profit", value: "₹50,550", color: "var(--info)" },
        { label: "Expense", value: "₹33,700", color: "var(--danger)" }
    ]
};

/* ==========================================================================
   MEMOIZED SECTIONS
   ========================================================================== */
const CardHeader = React.memo(({ title }) => (
    <div className="px-14 py-12 bordb" style={{ borderColor: "var(--tertiary)" }}>
        <p className="para-text capitalize text-dark font-500">{title}</p>
    </div>
));
CardHeader.displayName = "CardHeader";

const BestSellerCard = React.memo(({ role, formattedSales, onViewSales }) => (
    <div className="bg-secondary px-20 py-10 rounded-5">
        <div className="flex items-center">
            <div className="w-65">
                <h2 className="title-text font-600 text-white capitalize">{role}</h2>
                <p className="small-text font-400 text-white">Best seller of the month</p>
                <h3 className="title-text font-600 text-white pt-10">{formattedSales}</h3>
                <button
                    type="button"
                    onClick={onViewSales}
                    className="bg-white mini-text px-16 py-4 rounded-5 text-secondary border-0 mt-4 cursor-pointer font-600 transition-all hover-opacity"
                >
                    View Sales
                </button>
            </div>
            <div className="w-35">
                <Image src={DashImg} alt="Dash-Profile" className="object-contain w-full flex h-150" />
            </div>
        </div>
    </div>
));
BestSellerCard.displayName = "BestSellerCard";

const OrderManagementCard = React.memo(({ totalOrders, totalRevenue, series, options }) => (
    <div className="bg-white rounded-5 h-350">
        <CardHeader title="Order Management" />
        {totalOrders > 0 ? (
            <GenericChart
                type="donut"
                height={230}
                categories={["Pending", "Confirmed", "Shipped", "Delivered"]}
                series={series}
                colors={["var(--warning)", "var(--primary)", "var(--secondary)", "var(--success)"]}
                options={options}
            />
        ) : (
            <div className="flex items-center justify-center" style={{ height: "230px" }}>
                <p className="mini-text text-gray">No orders to display status ratio</p>
            </div>
        )}
    </div>
));
OrderManagementCard.displayName = "OrderManagementCard";

const TopProductsCard = React.memo(({ products }) => (
    <div className="bg-white rounded-5">
        <CardHeader title="Top Products" />
        <div className="py-14 px-16 grid-cols-1 gap-10">
            {products.length > 0 ? (
                products?.slice(0, 4)?.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border-b pb-3"
                        style={{ borderColor: "var(--tertiary)" }}
                    >
                        <div className="w-80">
                            <h4 className="text-dark headmini-text font-500">
                                {item.name}
                            </h4>
                            <p className="mini-text text-gray font-400">{item.category}</p>
                        </div>
                        <div className="text-right w-20">
                            <p className="text-success small-text font-600">₹{item.price.toLocaleString()}</p>
                            <p className="mini-text text-gray">Stock: {item.stock}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="py-20 text-center">
                    <p className="mini-text text-gray">No products in catalog</p>
                </div>
            )}
        </div>
    </div>
));
TopProductsCard.displayName = "TopProductsCard";

const StatCards = React.memo(({ stats }) => (
    <div className="grid-cols-2 gap-12">
        {stats.map((item, index) => (
            <div key={index} className="px-15 py-10 rounded-5 bg-white">
                <div className="flex items-center justify-between bordb pb-3" style={{ borderColor: "var(--tertiary)" }}>
                    <div>
                        <p className="small-text text-gray font-500">{item.title}</p>
                        <h2 className="title-text text-dark font-600">
                            {item.prefix}{item.value}
                        </h2>
                    </div>
                    <div>
                        <Icon name={item.icon} width="24" height="24" className="text-primary" />
                    </div>
                </div>
                <p className="text-gray small-text font-500 mt-5">
                    <span className={item.isPositive ? "text-success font-600" : "text-danger font-600"}>
                        {item.change}
                    </span>{" "}
                    than last week
                </p>
            </div>
        ))}
    </div>
));
StatCards.displayName = "StatCards";

const EarningsReportCard = React.memo(({ formattedWeeklyTotal, weeklyEarningsData, breakdown }) => (
    <div className="bg-white rounded-5 p-14">
        <h3 className="mid-text text-dark font-600">Earning Reports</h3>
        <p className="mini-text text-gray font-400">Weekly Earnings Overview</p>
        <div className="flex gap-12 items-end mt-10">
            <div className="w-50">
                <div className="flex items-center gap-12">
                    <h2 className="large-text text-dark font-600">{formattedWeeklyTotal}</h2>
                    <span className="bg-light-success text-success mini-text font-600 px-8 py-2 rounded-5">+0.0%</span>
                </div>
                <p className="text-gray font-500 mini-text mt-8">You informed of this week compared to last week</p>
            </div>
            <div className="w-50">
                <Chart options={SPARKLINE_BAR_OPTIONS} series={[{ data: weeklyEarningsData }]} type="bar" height={150} />
            </div>
        </div>
        <div className="grid-cols-3 gap-10 items-center mt-12">
            {breakdown.map((item, i) => (
                <div className="bg-forth p-10 rounded-5" key={i} style={{ flex: 1 }}>
                    <p className="text-gray mini-text font-400">{item.label}</p>
                    <h3 className="headmini-text text-dark font-600 pt-4">{item.value}</h3>
                </div>
            ))}
        </div>
    </div>
));
EarningsReportCard.displayName = "EarningsReportCard";

const TotalLeadsCard = React.memo(({ leadsWeeklyData, formattedLeadsCount }) => (
    <div className="bg-white rounded-5 p-12 h-full justify-between">
        <div>
            <h4 className="text-dark mid-text font-600">Total Leads</h4>
            <p className="text-gray mini-text font-400 mt-1">Last Week</p>
            <div className="mt-8 w-90">
                <Chart options={SPARKLINE_BAR_OPTIONS} series={[{ data: leadsWeeklyData }]} type="bar" height={180} />
            </div>
        </div>
        <div className="flex items-end justify-between border-t pt-8 mt-6" style={{ borderColor: "var(--tertiary)" }}>
            <div>
                <p className="text-dark mini-text font-600">{formattedLeadsCount}</p>
                <p className="text-gray mini-text font-500">Leads Overview</p>
            </div>
            <p className="text-success mini-text font-500">+0.0%</p>
        </div>
    </div>
));
TotalLeadsCard.displayName = "TotalLeadsCard";

const EarningCard = React.memo(() => {
    const series = React.useMemo(
        () => [
            {
                name: "Qualified Leads",
                data: [26, 80, 41, 65, 54, 46, 70, 46, 65, 20, 46, 62],
            },
        ],
        []
    );

    const options = React.useMemo(() => {
        const addTopBorders = (chart) => {
            try {
                const el = chart?.el;
                if (!el) return;
                const bars = el.querySelectorAll(".apexcharts-bar-area");
                const existingCaps = el.querySelectorAll(".custom-bar-top-cap");
                existingCaps.forEach((c) => c.remove());

                bars.forEach((bar, index) => {
                    const bbox = bar.getBBox();
                    if (!bbox || bbox.width === 0) return;
                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("class", "custom-bar-top-cap");
                    line.setAttribute("x1", bbox.x);
                    line.setAttribute("y1", bbox.y);
                    line.setAttribute("x2", bbox.x + bbox.width);
                    line.setAttribute("y2", bbox.y);
                    line.setAttribute("stroke", index === 6 ? "#ff5200" : "#cbd5e1");
                    line.setAttribute("stroke-width", "2.5");
                    line.setAttribute("stroke-linecap", "butt");
                    line.style.pointerEvents = "none";
                    bar.parentNode.appendChild(line);
                });
            } catch (e) {
                // Safe fallback
            }
        };

        return {
            chart: {
                type: "bar",
                height: 220,
                toolbar: { show: false },
                fontFamily: "inherit",
                events: {
                    mounted: (chart) => setTimeout(() => addTopBorders(chart), 20),
                    updated: (chart) => setTimeout(() => addTopBorders(chart), 20),
                    animationEnd: (chart) => setTimeout(() => addTopBorders(chart), 10),
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: "100%",
                    borderRadius: 0,
                    distributed: true,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    type: "vertical",
                    shadeIntensity: 0,
                    opacityFrom: 0.28,
                    opacityTo: 0.02,
                    stops: [0, 100],
                },
            },
            colors: [
                "#94a3b8", "#94a3b8", "#94a3b8", "#94a3b8", "#94a3b8", "#94a3b8",
                "#ff5200",
                "#94a3b8", "#94a3b8", "#94a3b8", "#94a3b8", "#94a3b8",
            ],
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            grid: {
                borderColor: "#f1f5f9",
                strokeDashArray: 3,
                yaxis: { lines: { show: true } },
                xaxis: { lines: { show: false } },
                padding: { top: 10, right: 8, bottom: 0, left: 8 },
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: {
                    style: {
                        colors: [
                            "#9ca3af", "#9ca3af", "#9ca3af", "#9ca3af", "#9ca3af", "#9ca3af",
                            "#4b5563",
                            "#9ca3af", "#9ca3af", "#9ca3af", "#9ca3af", "#9ca3af",
                        ],
                        fontSize: "11px",
                        fontWeight: [400, 400, 400, 400, 400, 400, 600, 400, 400, 400, 400, 400],
                    },
                },
            },
            yaxis: {
                min: 0,
                max: 100,
                tickAmount: 5,
                labels: {
                    formatter: (val) => `${Math.round(val)}k`,
                    style: {
                        colors: "#9ca3af",
                        fontSize: "11px",
                    },
                },
            },
            tooltip: {
                theme: "light",
                y: {
                    formatter: (val) => `${val}k Leads`,
                },
            },
            annotations: {
                points: [
                    {
                        x: "Jul",
                        y: 70,
                        marker: { size: 0 },
                        label: {
                            borderColor: "transparent",
                            borderWidth: 0,
                            style: {
                                color: "#ff5200",
                                background: "transparent",
                                fontSize: "11px",
                                fontWeight: 600,
                                padding: { left: 0, right: 0, top: 0, bottom: 0 },
                            },
                            offsetY: -6,
                            text: "76.3k",
                        },
                    },
                ],
            },
        };
    }, []);

    return (
        <div className="bg-white rounded-10 p-20">
            <div className="flex items-center gap-10 bordb pb-15">
                <div className="icon-lg bg-tertiary rounded-5">
                    <Icon name="Trending" width="20" height="20" stroke="var(--dark)" />
                </div>
                <div>
                    <h4 className="mid-text font-600 text-dark">Inbound Lead Generation</h4>
                    <p className="mini-text font-400 text-gray">SEO + Meta Ads Multi-Touch Pipeline</p>
                </div>
            </div>
            <Chart options={options} series={series} type="bar" height={250} />
        </div>
    );
});
EarningCard.displayName = "EarningCard";

const BalanceCard = React.memo(({ onAction }) => (
    <div className="bg-white rounded-10 p-20 relative">
        <div className="flex items-center gap-10 bordb pb-15">
            <div className="icon-lg bg-tertiary rounded-5">
                <Icon name="Rocket" width="20" height="20" stroke="var(--dark)" />
            </div>
            <div>
                <h4 className="mid-text font-600 text-dark">Ashmita Digital Marketing Suite</h4>
                <p className="mini-text font-400 text-gray">Website Performance & Inbound Lead Engine</p>
            </div>
        </div>
        <p className="small-text font-400 text-gray py-16">
            Empower your website with Ashmita digital marketing intelligence. We seamlessly combine advanced technical SEO, high-intent Meta ad campaigns, and Microsoft Clarity behavioral heatmaps to maximize inbound leads while ensuring 100% GDPR and CCPA privacy compliance.
        </p>
        <div className="flex items-center gap-10">
            <Button
                version="v2"
                bg="#18181b"
                color="white"
                icon="Search"
                iconWidth="14"
                iconHeight="14"
                onClick={() => onAction?.("SEO Audit")}
                text="SEO Audit"
                className="rounded-30 flex-1 font-500 shadow-sm"
            />
            <Button
                version="v2"
                bg="forth"
                color="dark"
                icon="Meta"
                iconWidth="14"
                iconHeight="14"
                onClick={() => onAction?.("Meta Ads")}
                text="Meta Ads"
                className="rounded-30 flex-1 font-500"
            />
            <Button
                version="v2"
                bg="forth"
                color="dark"
                icon="ShieldCheck"
                iconWidth="14"
                iconHeight="14"
                onClick={() => onAction?.("Clarity & Privacy")}
                text="Clarity & Privacy"
                className="rounded-30 flex-1 font-500"
            />
        </div>
    </div>
));
BalanceCard.displayName = "BalanceCard";

const GROWTH_COMPLIANCE_ITEMS = [
    {
        id: "seo",
        title: <span className="text-white font-500">1. Technical SEO & Search Visibility</span>,
        content: (
            <p className="mini-text text-white opacity-80 font-400">
                Automated schema markup, real-time canonical validation, and XML sitemap synchronization ensuring search engines index high-value commercial landing pages instantly.
            </p>
        ),
    },
    {
        id: "meta-ads",
        title: <span className="text-white font-500">2. Meta Conversion Tracking & Retargeting</span>,
        content: (
            <p className="mini-text text-white opacity-80 font-400">
                Server-side Conversions API (CAPI) pipeline connected to high-intent customer acquisition ad sets across Meta networks with live ROAS optimization.
            </p>
        ),
    },
    {
        id: "privacy",
        title: <span className="text-white font-500">3. Privacy Compliance & User Behavior Audits</span>,
        content: (
            <p className="mini-text text-white opacity-80 font-400">
                Full adherence to GDPR, CCPA, and global privacy standards paired with Microsoft Clarity heatmaps to diagnose user friction points without collecting PII.
            </p>
        ),
    },
];

const SavingsGoalsCard = React.memo(({ accordionItems = GROWTH_COMPLIANCE_ITEMS }) => (
    <div className="rounded-10 p-20 bg-dark">
        <div className="flex items-center gap-10 bordb pb-15" style={{ borderColor: "rgba(255, 255, 255, 0.12)" }}>
            <div className="icon-lg bg-white rounded-5">
                <Icon name="ShieldCheck" width="20" height="20" stroke="var(--dark)" />
            </div>
            <div>
                <h4 className="mid-text font-600 text-white">Growth & Compliance Pillars</h4>
                <p className="mini-text font-400 text-white text-muted">Ashmita Marketing Tool Integration</p>
            </div>
        </div>
        <Accordion
            items={accordionItems || GROWTH_COMPLIANCE_ITEMS}
            version="v2"
            allowMultiple={false}
            defaultOpenIndex={0}
            itemClassName=""
        />
    </div>
));
SavingsGoalsCard.displayName = "SavingsGoalsCard";

/* ==========================================================================
   MAIN DASHBOARD COMPONENT (MEMOIZED)
   ========================================================================== */
const Dashboard = () => {
    const data = STATIC_DATA;

    const handleViewSales = React.useCallback(() => {
        alert("Viewing sales reports for Administrator");
    }, []);

    const handleSuiteAction = React.useCallback((action) => {
        showToast(`Action: ${action}`, "info");
    }, []);

    const accordionItems = React.useMemo(() => GROWTH_COMPLIANCE_ITEMS, []);

    const donutOptions = React.useMemo(() => ({
        ...DONUT_CHART_OPTIONS,
        plotOptions: {
            ...DONUT_CHART_OPTIONS.plotOptions,
            pie: {
                ...DONUT_CHART_OPTIONS.plotOptions.pie,
                donut: {
                    ...DONUT_CHART_OPTIONS.plotOptions.pie.donut,
                    labels: {
                        ...DONUT_CHART_OPTIONS.plotOptions.pie.donut.labels,
                        value: {
                            ...DONUT_CHART_OPTIONS.plotOptions.pie.donut.labels.value,
                            formatter: (val) => (val !== undefined ? val.toLocaleString() : "")
                        },
                        total: {
                            ...DONUT_CHART_OPTIONS.plotOptions.pie.donut.labels.total,
                            formatter: () => `₹${data.totalRevenue.toLocaleString()}`
                        }
                    }
                }
            }
        }
    }), [data.totalRevenue]);

    return (
        <Container version="v4" style={{ background: "var(--forth)" }}>
            <div className="flex items-start w-full gap-12">
                {/* Left Column - 30% */}
                <div className="w-55 grid-cols-1 gap-12">
                    <BalanceCard onAction={handleSuiteAction} />
                    <EarningCard />
                </div>

                {/* Right Column - 70% */}
                <div className="w-45 grid-cols-1 gap-12">
                    <StatCards stats={data.dashboardCounts} />
                    <SavingsGoalsCard accordionItems={accordionItems} />
                </div>
            </div>
        </Container>
    );
};

export default React.memo(Dashboard);