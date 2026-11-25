import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { canAccessPage, getFirstAllowedRoute, useCurrentUser } from "../utils";

// 🧩 Layout & Loader
import Layout from "../components/layout/Layout";
import Loader from "../components/common/generic/Loader";

// 🛡️ Route Guard
const ProtectedRoute = React.memo(({ page, children }) => {
  const { user, role } = useCurrentUser();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const isLoggedIn = Boolean(token && token !== "null" && token !== "undefined");

  // When user is not logged in, NO route except Dashboard is accessible
  if (!isLoggedIn) {
    if (page === "Dashboard") {
      return children;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // When logged in, verify role access according to allowed pages and permissions
  if (page && !canAccessPage(user || role, page)) {
    const fallback = getFirstAllowedRoute(user || role);
    return <Navigate to={fallback} replace />;
  }

  return children;
});
ProtectedRoute.displayName = "ProtectedRoute";

const IndexRoute = React.memo(() => {
  const { user, role } = useCurrentUser();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const isLoggedIn = Boolean(token && token !== "null" && token !== "undefined");

  if (!isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  const fallback = getFirstAllowedRoute(user || role);
  return <Navigate to={fallback} replace />;
});
IndexRoute.displayName = "IndexRoute";

// 📦 Lazy Pages
const Dashboard = React.lazy(() => import("../pages/dashboard/Dashboard"));

// Settings Pages
const User = React.lazy(() => import("../pages/settings/User"));
const Role = React.lazy(() => import("../pages/settings/Role"));
const Profile = React.lazy(() => import("../pages/settings/Profile"));
const Domain = React.lazy(() => import("../pages/settings/Domain"));

// Category Pages
const CategoryProducts = React.lazy(() => import("../pages/category/Products"));
const CategoryBlogs = React.lazy(() => import("../pages/category/Blogs"));

// Overview Pages
const OverviewProducts = React.lazy(() => import("../pages/overview/Products"));
const OverviewBlogs = React.lazy(() => import("../pages/overview/Blogs"));
const OverviewSeo = React.lazy(() => import("../pages/overview/Seo"));

// Management Pages
const Leads = React.lazy(() => import("../pages/management/Leads"));
const Location = React.lazy(() => import("../pages/management/Location"));

// Campaign Page
const Campaign = React.lazy(() => import("../pages/campaign/Campaign"));

function AppRoutes() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexRoute />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute page="Dashboard">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute page="Profile">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/profile"
            element={
              <ProtectedRoute page="Profile">
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Category Routes */}
          <Route
            path="category/products"
            element={
              <ProtectedRoute page="Products Category">
                <CategoryProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="category/blogs"
            element={
              <ProtectedRoute page="Blogs Category">
                <CategoryBlogs />
              </ProtectedRoute>
            }
          />

          {/* Overview Routes */}
          <Route
            path="overview/products"
            element={
              <ProtectedRoute page="Products">
                <OverviewProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="overview/blogs"
            element={
              <ProtectedRoute page="Blogs">
                <OverviewBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="overview/seo"
            element={
              <ProtectedRoute page="SEO">
                <OverviewSeo />
              </ProtectedRoute>
            }
          />

          {/* Management Routes */}
          <Route
            path="management/leads"
            element={
              <ProtectedRoute page="Leads">
                <Leads />
              </ProtectedRoute>
            }
          />
          <Route
            path="management/location"
            element={
              <ProtectedRoute page="Location">
                <Location />
              </ProtectedRoute>
            }
          />

          {/* Campaign Routes */}
          <Route path="campaign" element={<Navigate to="/campaign/whatsapp" replace />} />
          <Route
            path="campaign/whatsapp"
            element={
              <ProtectedRoute page="Whatsapp Campaign">
                <Campaign />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaign/gmail"
            element={
              <ProtectedRoute page="Gmail Campaign">
                <Campaign />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaign/sms"
            element={
              <ProtectedRoute page="SMS Campaign">
                <Campaign />
              </ProtectedRoute>
            }
          />

          {/* Settings Routes */}
          <Route
            path="settings/users"
            element={
              <ProtectedRoute page="System Users">
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/roles"
            element={
              <ProtectedRoute page="Roles">
                <Role />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/domain"
            element={
              <ProtectedRoute page="Domain">
                <Domain />
              </ProtectedRoute>
            }
          />

          {/* Navigation Aliases / Direct Shortcuts */}
          <Route path="products" element={<Navigate to="/overview/products" replace />} />
          <Route path="blogs" element={<Navigate to="/overview/blogs" replace />} />
          <Route path="seo" element={<Navigate to="/overview/seo" replace />} />
          <Route path="users" element={<Navigate to="/settings/users" replace />} />
          <Route path="roles" element={<Navigate to="/settings/roles" replace />} />
          <Route path="domain" element={<Navigate to="/settings/domain" replace />} />
          <Route path="leads" element={<Navigate to="/management/leads" replace />} />
          <Route path="location" element={<Navigate to="/management/location" replace />} />
          <Route path="category" element={<Navigate to="/category/products" replace />} />
          <Route path="categories" element={<Navigate to="/category/products" replace />} />
          <Route path="overview" element={<Navigate to="/overview/products" replace />} />
        </Route>

        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", padding: "100px 20px" }}>
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>
    </React.Suspense>
  );
}

export default AppRoutes;
