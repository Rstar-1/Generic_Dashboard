import React, { useState, useMemo, useCallback, memo } from "react";
import Chart from "react-apexcharts";
import Container from "../../components/common/Container";
import Image from "../../components/common/Image";
import Icon from "../../components/common/Icon";
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

const REVENUE_CHART_OPTIONS = {
    chart: {
        toolbar: { show: false },
        sparkline: { enabled: false }
    },
    colors: ["#7c69ef"],
    plotOptions: {
        bar: {
            borderRadius: 6,
            columnWidth: "60%",
            distributed: false,
            dataLabels: {
                position: "top"
            }
        }
    },
    dataLabels: {
        enabled: true,
        offsetY: -26,
        style: {
            fontSize: "13px",
            fontWeight: "600",
            colors: ["#5d596c"]
        },
        background: {
            enabled: false
        },
        formatter: (val) => {
            if (!val || val === 0) return "";
            if (val >= 1000000) return `${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
            if (val >= 1000) return `${Math.round(val / 1000)}K`;
            return `${val}`;
        }
    },
    fill: {
        type: "solid",
        opacity: 1
    },
    stroke: {
        show: false
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        tickPlacement: "on",
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
            style: {
                colors: "#a5a3ae",
                fontSize: "12px",
                fontFamily: "Poppins, sans-serif"
            }
        }
    },
    yaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
            style: {
                colors: "#a5a3ae",
                fontSize: "12px",
                fontFamily: "Poppins, sans-serif"
            },
            formatter: (val) => {
                if (val === 0) return "0k";
                if (val >= 1000000) return `${(val / 1000000).toFixed(0)}m`;
                if (val >= 1000) return `${Math.round(val / 1000)}k`;
                return `${val}`;
            }
        }
    },
    grid: {
        show: true,
        borderColor: "#f1f1f2",
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
        padding: { top: 30, right: 10, bottom: 0, left: 10 }
    },
    tooltip: {
        enabled: true,
        y: {
            formatter: (val) => `₹${val.toLocaleString()}`
        }
    },
    states: {
        hover: {
            filter: {
                type: "darken",
                value: 0.9
            }
        }
    },
    responsive: [
        {
            breakpoint: 768,
            options: {
                plotOptions: {
                    bar: { columnWidth: "55%" }
                }
            }
        }
    ]
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
        { title: "Total Sales", value: "4,89,000", prefix: "₹ ", change: "+12.5%", isPositive: true, icon: "TrendingUp" },
        { title: "Total Orders", value: "1,248", prefix: "", change: "+8.2%", isPositive: true, icon: "Orders" },
        { title: "Total Revenue", value: "8,65,400", prefix: "₹ ", change: "+15.3%", isPositive: true, icon: "Analytic" }
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
const CardHeader = memo(({ title }) => (
    <div className="px-14 py-12 bordb" style={{ borderColor: "var(--tertiary)" }}>
        <p className="para-text capitalize text-dark font-500">{title}</p>
    </div>
));
CardHeader.displayName = "CardHeader";

const BestSellerCard = memo(({ role, formattedSales, onViewSales }) => (
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

const OrderManagementCard = memo(({ totalOrders, totalRevenue, series, options }) => (
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

const TopProductsCard = memo(({ products }) => (
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
                            <h4 className="text-dark headmini-text font-500" style={{ maxWidth: "170px" }}>
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

const StatCards = memo(({ stats }) => (
    <div className="grid-cols-3 gap-12">
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

const EarningsReportCard = memo(({ formattedWeeklyTotal, weeklyEarningsData, breakdown }) => (
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

const TotalLeadsCard = memo(({ leadsWeeklyData, formattedLeadsCount }) => (
    <div className="bg-white rounded-5 p-12 h-full flex flex-column justify-between">
        <div>
            <h4 className="text-dark mid-text font-600">Total Leads</h4>
            <p className="text-gray mini-text font-400 mt-1">Last Week</p>
            <div className="mt-8">
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

const YearlyRevenueCard = memo(({ series, options }) => (
    <div className="bg-white rounded-5">
        <CardHeader title="Yearly Revenue Insights" />
        <div className="px-15 pb-10">
            <GenericChart type="bar" series={series} height={380} options={options} />
        </div>
    </div>
));
YearlyRevenueCard.displayName = "YearlyRevenueCard";

/* ==========================================================================
   MAIN DASHBOARD COMPONENT (MEMOIZED)
   ========================================================================== */
const Dashboard = () => {
    const data = STATIC_DATA;

    const handleViewSales = useCallback(() => {
        alert("Viewing sales reports for Administrator");
    }, []);

    const donutOptions = useMemo(() => ({
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

    const yearlyRevenueSeries = useMemo(() => [{ name: "Revenue", data: data.yearlyRevenueData }], [data.yearlyRevenueData]);

    return (
        <Container version="v4" style={{ background: "var(--forth)" }}>
            <div className="flex items-start w-full gap-12">
                {/* Left Column - 30% */}
                <div className="w-30 grid-cols-1 gap-12">
                    <BestSellerCard
                        role={data.profile.role}
                        formattedSales={data.profile.formattedSales}
                        onViewSales={handleViewSales}
                    />
                    <OrderManagementCard
                        totalOrders={data.totalOrders}
                        totalRevenue={data.totalRevenue}
                        series={data.orderManagementData}
                        options={donutOptions}
                    />
                    <TopProductsCard products={data.topProducts} />
                </div>

                {/* Right Column - 70% */}
                <div className="w-70 grid-cols-1 gap-12">
                    {/* Stat Cards Grid */}
                    <StatCards stats={data.dashboardCounts} />

                    {/* Earnings & Leads Middle Row */}
                    <div className="flex items-start w-full gap-12">
                        <div className="w-70">
                            <EarningsReportCard
                                formattedWeeklyTotal={data.formattedWeeklyTotal}
                                weeklyEarningsData={data.weeklyEarningsData}
                                breakdown={data.earningsBreakdown}
                            />
                        </div>

                        <div className="w-30">
                            <TotalLeadsCard
                                leadsWeeklyData={data.leadsWeeklyData}
                                formattedLeadsCount={data.formattedLeadsCount}
                            />
                        </div>
                    </div>

                    {/* Yearly Revenue Insights */}
                    <YearlyRevenueCard series={yearlyRevenueSeries} options={REVENUE_CHART_OPTIONS} />
                </div>
            </div>
        </Container>
    );
};

export default memo(Dashboard);