import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 🧩 Layout
import Layout from '../components/layout/Layout';
import Loader from '../components/common/generic/Loader';

// 📦 Lazy Pages
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Analytics = lazy(() => import('../pages/analytics/Analytics'));

// Category Pages
const CategoryProducts = lazy(() => import('../pages/category/Products'));
const CategoryBlogs = lazy(() => import('../pages/category/Blogs'));

// Overview Pages
const OverviewProducts = lazy(() => import('../pages/overview/Products'));
const OverviewBlogs = lazy(() => import('../pages/overview/Blogs'));
const OverviewCms = lazy(() => import('../pages/overview/Cms'));
const OverviewSeo = lazy(() => import('../pages/overview/Seo'));

// Management Pages
const Customer = lazy(() => import('../pages/management/Customer'));
const Tasks = lazy(() => import('../pages/management/Tasks'));
const Leads = lazy(() => import('../pages/management/Leads'));

// Order & Payment Pages
const Orders = lazy(() => import('../pages/orderandpayment/Orders'));
const Transaction = lazy(() => import('../pages/orderandpayment/Transaction'));

// Settings Pages
const User = lazy(() => import('../pages/settings/User'));
const Role = lazy(() => import('../pages/settings/Role'));

function AppRoutes() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="analytics" element={<Analytics />} />

                    {/* Category Routes */}
                    <Route path="category/products" element={<CategoryProducts />} />
                    <Route path="category/blogs" element={<CategoryBlogs />} />

                    {/* Overview Routes */}
                    <Route path="overview/products" element={<OverviewProducts />} />
                    <Route path="overview/blogs" element={<OverviewBlogs />} />
                    <Route path="overview/cms" element={<OverviewCms />} />
                    <Route path="overview/seo" element={<OverviewSeo />} />

                    {/* Management Routes */}
                    <Route path="management/customers" element={<Customer />} />
                    <Route path="customers" element={<Customer />} />
                    <Route path="management/tasks" element={<Tasks />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="management/leads" element={<Leads />} />
                    <Route path="leads" element={<Leads />} />

                    {/* Order & Payment Routes */}
                    <Route path="management/order" element={<Orders />} />
                    <Route path="management/orders" element={<Orders />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="order" element={<Orders />} />
                    <Route path="management/transactions" element={<Transaction />} />
                    <Route path="transactions" element={<Transaction />} />

                    {/* Settings Routes */}
                    <Route path="settings/users" element={<User />} />
                    <Route path="users" element={<User />} />
                    <Route path="settings/roles" element={<Role />} />
                    <Route path="roles" element={<Role />} />
                </Route>
                <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '100px 20px' }}>404 - Page Not Found</h2>} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;
