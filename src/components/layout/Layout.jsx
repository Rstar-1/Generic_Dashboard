import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Loader from "../common/generic/Loader";

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const location = useLocation();

    return (
        <div className="w-full flex overflow-hidden" style={{ height: "100vh" }}>
            {/* Smooth Collapsible Sidebar Container */}
            <aside
                className="bordr bg-white h-100 overflow-hidden relative flex flex-column"
                style={{
                    width: isCollapsed ? "72px" : "250px",
                    minWidth: isCollapsed ? "72px" : "250px",
                    maxWidth: isCollapsed ? "72px" : "250px",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    willChange: "width",
                    zIndex: 20,
                }}
            >
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            </aside>

            {/* Main Page Area */}
            <div
                className="w-full h-100 overflow-auto"
                style={{
                    minWidth: 0,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <Header />
                <main key={location.key} className="overflow-auto">
                    <React.Suspense fallback={<Loader />}>
                        <Outlet />
                    </React.Suspense>
                </main>
            </div>
        </div>
    );
};

export default Layout;
