import React, { useState, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Loader from "../common/generic/Loader";

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const location = useLocation();

    return (
        <>
            <div className="w-full flex">
                <div
                    className={isCollapsed ? "w-5 bordr" : "w-20 bordr"}
                    style={{ transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)" }}
                >
                    <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                </div>
                <div
                    className={(isCollapsed ? "w-95" : "w-80") + " h-100 overflow-auto"}
                    style={{ transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)" }}
                >
                    <Header />
                    <div key={location.key} className="">
                        <Suspense fallback={<Loader />}>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;