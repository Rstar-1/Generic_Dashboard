import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { canAccessPage, useCurrentUser } from '../utils';

// 🧩 Layout
import Layout from '../components/layout/Layout';
import Loader from '../components/common/generic/Loader';

// 🛡️ Route Guard
const ProtectedRoute = React.memo(({ page, children }) => {
    const { role } = useCurrentUser();
    if (!canAccessPage(role, page)) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
});
ProtectedRoute.displayName = "ProtectedRoute";

// 📦 Lazy Pages
const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard'));
const Analytics = React.lazy(() => import('../pages/analytics/Analytics'));

// Category Pages
const CategoryProducts = React.lazy(() => import('../pages/category/Products'));
const CategoryBlogs = React.lazy(() => import('../pages/category/Blogs'));

// Overview Pages
const OverviewProducts = React.lazy(() => import('../pages/overview/Products'));
const OverviewBlogs = React.lazy(() => import('../pages/overview/Blogs'));
const OverviewCms = React.lazy(() => import('../pages/overview/Cms'));
const OverviewSeo = React.lazy(() => import('../pages/overview/Seo'));

// Management Pages
const Customer = React.lazy(() => import('../pages/management/Customer'));
const Leads = React.lazy(() => import('../pages/management/Leads'));

// Order & Payment Pages
const Orders = React.lazy(() => import('../pages/orderandpayment/Orders'));
const Transaction = React.lazy(() => import('../pages/orderandpayment/Transaction'));

// Settings Pages
const User = React.lazy(() => import('../pages/settings/User'));
const Role = React.lazy(() => import('../pages/settings/Role'));

function AppRoutes() {
    return (
        <React.Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<ProtectedRoute page="Dashboard"><Dashboard /></ProtectedRoute>} />
                    <Route path="analytics" element={<ProtectedRoute page="Analytics"><Analytics /></ProtectedRoute>} />

                    {/* Category Routes */}
                    <Route path="category/products" element={<ProtectedRoute page="Products Category"><CategoryProducts /></ProtectedRoute>} />
                    <Route path="category/blogs" element={<ProtectedRoute page="Blogs Category"><CategoryBlogs /></ProtectedRoute>} />

                    {/* Overview Routes */}
                    <Route path="overview/products" element={<ProtectedRoute page="Products"><OverviewProducts /></ProtectedRoute>} />
                    <Route path="overview/blogs" element={<ProtectedRoute page="Blogs"><OverviewBlogs /></ProtectedRoute>} />
                    <Route path="overview/cms" element={<ProtectedRoute page="CMS"><OverviewCms /></ProtectedRoute>} />
                    <Route path="overview/seo" element={<ProtectedRoute page="SEO"><OverviewSeo /></ProtectedRoute>} />

                    {/* Management Routes */}
                    <Route path="management/customers" element={<ProtectedRoute page="Customers"><Customer /></ProtectedRoute>} />
                    <Route path="management/leads" element={<ProtectedRoute page="Leads"><Leads /></ProtectedRoute>} />

                    {/* Order & Payment Routes */}
                    <Route path="management/order" element={<ProtectedRoute page="Orders"><Orders /></ProtectedRoute>} />
                    <Route path="management/transactions" element={<ProtectedRoute page="Transactions"><Transaction /></ProtectedRoute>} />

                    {/* Settings Routes */}
                    <Route path="settings/users" element={<ProtectedRoute page="System Users"><User /></ProtectedRoute>} />
                    <Route path="settings/roles" element={<ProtectedRoute page="Roles"><Role /></ProtectedRoute>} />
                </Route>
                <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '100px 20px' }}>404 - Page Not Found</h2>} />
            </Routes>
        </React.Suspense>
    );
}

export default AppRoutes;
