import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 🧩 Layout
import Layout from '../components/layout/Layout';
import Loader from '../components/common/generic/Loader';

// 📦 Lazy Pages
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Analytics = lazy(() => import('../pages/analytics/Analytics'));
const Customer = lazy(() => import('../pages/management/Customer'));
const Tasks = lazy(() => import('../pages/management/Tasks'));
const Transaction = lazy(() => import('../pages/management/Transaction'));
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
                    <Route path="management/customers" element={<Customer />} />
                    <Route path="management/tasks" element={<Tasks />} />
                    <Route path="management/transactions" element={<Transaction />} />
                    <Route path="customers" element={<Customer />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="settings/users" element={<User />} />
                    <Route path="settings/roles" element={<Role />} />
                </Route>
                <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '100px 20px' }}>404 - Page Not Found</h2>} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;
