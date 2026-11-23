import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import FilterForm from "../../components/forms/sections/FilterForm";
import Modal from "../../components/common/Modal";
import FormBuilder from "../../components/forms/FormBuilder";
import { getUserFormFields, sanitizeCrudFormData } from "../../components/forms/sections/CrudForm";
import { showToast } from "../../components/common/Toast";
import { useCurrentUser, isAdminOrDevAdmin } from "../../utils";
import { usersTableColumns, STATUS_OPTIONS, TABS } from "../../utils/apiData";
import { useUsers } from "../../feature/userSlice";
import { useRoles } from "../../feature/roleSlice";
import { registerApi } from "../../api/authApi";

const ITEMS_PER_PAGE = 5;

const USER_ROLES = [
    { label: "Admin", value: "admin" },
    { label: "Manager", value: "manager" },
    { label: "Accountant", value: "accountant" },
    { label: "Product", value: "product" },
    { label: "Customer", value: "customer" },
];

const ROLE_COLORS = {
    all: "var(--primary)",
    customer: "var(--warning)",
    admin: "var(--success)",
    accountant: "var(--secondary)",
    manager: "var(--info)",
    product: "var(--danger)",
};

const DEFAULT_SIDEBAR_ROLES = [
    { name: "Customer", role: "customer", color: "var(--warning)" },
    { name: "Admin", role: "admin", color: "var(--success)" },
    { name: "Accountant", role: "accountant", color: "var(--secondary)" },
    { name: "Manager", role: "manager", color: "var(--info)" },
    { name: "Product", role: "product", color: "var(--danger)" },
];

const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const User = () => {
    const { user: currentUser, role: authRole, isAdminOrDevAdmin: isUserAdminOrDevAdmin } = useCurrentUser();

    // Check if the logged-in user is an Admin or Dev Admin
    const isPrivilegedUser = React.useMemo(() => {
        const roleStr = String(authRole || currentUser?.role || currentUser?.rolename || "").toLowerCase().trim();
        return Boolean(
            isUserAdminOrDevAdmin ||
            isAdminOrDevAdmin(authRole || currentUser) ||
            roleStr === "admin" ||
            roleStr === "dev admin" ||
            roleStr === "devadmin" ||
            roleStr === "dev-admin" ||
            roleStr.includes("admin")
        );
    }, [authRole, currentUser, isUserAdminOrDevAdmin]);

    // Current login user role identifiers
    const loggedInUserRoleName = React.useMemo(() => {
        return String(currentUser?.rolename || currentUser?.role || currentUser?.roleId?.rolename || authRole || "").trim();
    }, [currentUser, authRole]);

    const loggedInUserRoleKey = React.useMemo(() => {
        return loggedInUserRoleName.toLowerCase();
    }, [loggedInUserRoleName]);

    const loggedInUserRoleId = React.useMemo(() => {
        return currentUser?.roleId?._id || currentUser?.roleId || null;
    }, [currentUser]);

    const loggedInRole = React.useMemo(() => loggedInUserRoleKey || "admin", [loggedInUserRoleKey]);

    const { users, total, loading, getUsers, editUser, removeUser } = useUsers();
    const { roles, getRoles, fetchRoles: fetchRolesList } = useRoles();

    React.useEffect(() => {
        const loader = fetchRolesList || getRoles;
        loader?.({ isDeleted: false, limit: 100 });
    }, [fetchRolesList, getRoles]);

    const dynamicRoleOptions = React.useMemo(() => {
        // Non-admin users can only assign their own role
        if (!isPrivilegedUser && loggedInUserRoleKey) {
            const displayName = loggedInUserRoleName.charAt(0).toUpperCase() + loggedInUserRoleName.slice(1);
            return [
                {
                    label: displayName,
                    value: loggedInUserRoleKey,
                },
            ];
        }

        const list = [];
        const seen = new Set();
        (roles || []).forEach((r) => {
            if (r.isDeleted) return;
            const name = String(r.rolename || r.role || r.name || "").trim();
            const val = name.toLowerCase();
            if (val && !seen.has(val)) {
                seen.add(val);
                list.push({
                    label: name.charAt(0).toUpperCase() + name.slice(1),
                    value: val,
                });
            }
        });
        if (list.length > 0) return list;
        return USER_ROLES;
    }, [roles, isPrivilegedUser, loggedInUserRoleKey, loggedInUserRoleName]);

    const [activeTab, setActiveTab] = React.useState("all");
    const [selectedRoleFilter, setSelectedRoleFilter] = React.useState(() => {
        if (!isPrivilegedUser && loggedInUserRoleKey) {
            return loggedInUserRoleKey;
        }
        return "all";
    });
    const [selectedCategory, setSelectedCategory] = React.useState(() => {
        if (!isPrivilegedUser && loggedInUserRoleName) {
            return `${loggedInUserRoleName.charAt(0).toUpperCase() + loggedInUserRoleName.slice(1)} Users`;
        }
        return "All Users";
    });
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedUserIds, setSelectedUserIds] = React.useState([]);

    React.useEffect(() => {
        if (!isPrivilegedUser && loggedInUserRoleKey) {
            setSelectedRoleFilter(loggedInUserRoleKey);
            setSelectedCategory(`${loggedInUserRoleName.charAt(0).toUpperCase() + loggedInUserRoleName.slice(1)} Users`);
        }
    }, [isPrivilegedUser, loggedInUserRoleKey, loggedInUserRoleName]);

    const allUsersTotalRef = React.useRef(0);
    React.useEffect(() => {
        if (selectedRoleFilter === "all" && activeTab === "all" && total > 0) {
            allUsersTotalRef.current = total;
        }
    }, [selectedRoleFilter, activeTab, total]);

    // Modal state for Add / Edit user
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState(null);

    // Dynamic sidebar items derived directly from roleSlice API roles
    const sidebarItems = React.useMemo(() => {
        // Non-admin / non-dev-admin user: show ONLY their own role
        if (!isPrivilegedUser && loggedInUserRoleKey) {
            const displayName = loggedInUserRoleName ? (loggedInUserRoleName.charAt(0).toUpperCase() + loggedInUserRoleName.slice(1)) : "User";
            return [
                {
                    name: `${displayName} Users`,
                    role: loggedInUserRoleKey,
                    color: ROLE_COLORS[loggedInUserRoleKey] || "var(--primary)",
                    icon: "Users",
                    count: total || users?.length || 0,
                },
            ];
        }

        const counts = (users || []).reduce((acc, u) => {
            const roleKey = u.role?.toLowerCase();
            if (roleKey) acc[roleKey] = (acc[roleKey] || 0) + 1;
            return acc;
        }, {});

        const allCount = (selectedRoleFilter === "all" && activeTab === "all" ? total : allUsersTotalRef.current) || total || users.length || 0;
        const allItem = {
            name: "All Users",
            role: "all",
            color: "var(--primary)",
            icon: "Users",
            count: allCount,
        };

        const list = [allItem];
        const seen = new Set();

        (roles || []).forEach((r) => {
            if (r.isDeleted) return;
            const rName = String(r.rolename || r.name || r.role || "").trim();
            const rKey = rName.toLowerCase();
            if (!rKey || seen.has(rKey)) return;
            seen.add(rKey);

            const displayName = rName.charAt(0).toUpperCase() + rName.slice(1);
            const assignedCount = (r.usersassigned !== undefined && r.usersassigned > 0)
                ? r.usersassigned
                : (r.count !== undefined && r.count > 0 ? r.count : (counts[rKey] || 0));

            list.push({
                name: displayName,
                role: rKey,
                color: ROLE_COLORS[rKey] || "var(--primary)",
                icon: "Users",
                count: assignedCount,
            });
        });

        if (list.length === 1) {
            DEFAULT_SIDEBAR_ROLES.forEach((dr) => {
                list.push({
                    ...dr,
                    icon: "Users",
                    count: counts[dr.role] || 0,
                });
            });
        }

        return list;
    }, [users, total, roles, selectedRoleFilter, activeTab, isPrivilegedUser, loggedInUserRoleKey, loggedInUserRoleName]);

    // Backend paginated user fetching
    const fetchUserData = React.useCallback(() => {
        const params = {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            isDeleted: activeTab === "trash" ? true : false,
        };

        // For all roles except Admin & Dev Admin: always pass login user's role filter in API
        if (!isPrivilegedUser && loggedInUserRoleKey) {
            const matchedRoleDoc = (roles || []).find(
                (r) =>
                    String(r.rolename || r.role || r.name || "").toLowerCase().trim() === loggedInUserRoleKey ||
                    String(r._id) === String(loggedInUserRoleId)
            );
            if (matchedRoleDoc?._id || loggedInUserRoleId) {
                params.roleId = matchedRoleDoc?._id || loggedInUserRoleId;
            }
            params.role = matchedRoleDoc?.rolename || matchedRoleDoc?.name || loggedInUserRoleName || loggedInUserRoleKey;
        } else if (selectedRoleFilter && selectedRoleFilter !== "all") {
            const target = selectedRoleFilter.toLowerCase().trim();
            const matchedRoleDoc = (roles || []).find(
                (r) => String(r.rolename || r.role || r.name || "").toLowerCase().trim() === target
            );
            if (matchedRoleDoc?._id) {
                params.roleId = matchedRoleDoc._id;
            }
            if (matchedRoleDoc?.rolename || matchedRoleDoc?.name) {
                params.role = matchedRoleDoc.rolename || matchedRoleDoc.name;
            } else {
                params.role = target;
            }
        }

        const trimmedSearch = searchQuery.trim();
        if (trimmedSearch) {
            params.search = trimmedSearch;
        }

        if (statusFilter !== "all") {
            params.isActive = statusFilter === "Active";
        }

        getUsers(params);
    }, [
        currentPage,
        activeTab,
        isPrivilegedUser,
        loggedInUserRoleKey,
        loggedInUserRoleName,
        loggedInUserRoleId,
        selectedRoleFilter,
        roles,
        searchQuery,
        statusFilter,
        getUsers,
    ]);

    React.useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    // Base visible users pool: filtered by selected role filter
    const visibleUsersPool = React.useMemo(() => {
        if (!users) return [];

        let list = users;

        // If NOT admin or dev admin, enforce showing ONLY users with the logged-in user's role
        if (!isPrivilegedUser && loggedInUserRoleKey) {
            const matchedRoleDoc = (roles || []).find(
                (r) =>
                    String(r.rolename || r.role || r.name || "").toLowerCase().trim() === loggedInUserRoleKey ||
                    String(r._id) === String(loggedInUserRoleId)
            );
            const targetId = String(matchedRoleDoc?._id || loggedInUserRoleId || "").trim();

            return list.filter((u) => {
                const uRole = String(u.role || u.rolename || u.roleId?.rolename || "").toLowerCase().trim();
                const uRoleId = String(u.roleId?._id || u.roleId || "").trim();

                return (
                    uRole === loggedInUserRoleKey ||
                    (targetId && uRoleId === targetId)
                );
            });
        }

        if (selectedRoleFilter && selectedRoleFilter !== "all") {
            const target = selectedRoleFilter.toLowerCase().trim();
            const matchedRoleDoc = (roles || []).find(
                (r) => String(r.rolename || r.role || r.name || "").toLowerCase().trim() === target
            );
            const targetId = String(matchedRoleDoc?._id || "").trim();
            const targetCode = String(matchedRoleDoc?.id || "").toLowerCase().trim();

            return list.filter((u) => {
                const uRole = String(u.role || u.rolename || "").toLowerCase().trim();
                const uRoleId = String(u.roleId?._id || u.roleId || "").trim();

                return (
                    uRole === target ||
                    (targetId && uRoleId === targetId) ||
                    (targetCode && uRole === targetCode)
                );
            });
        }

        return list;
    }, [users, isPrivilegedUser, loggedInUserRoleKey, loggedInUserRoleId, selectedRoleFilter, roles]);

    const handleSidebarItemClick = React.useCallback((itemOrName) => {
        if (!isPrivilegedUser) return;

        const name = typeof itemOrName === "string" ? itemOrName : (itemOrName?.name || "");
        const role = typeof itemOrName === "object" && itemOrName?.role ? itemOrName.role : null;

        const matchedItem = (sidebarItems || []).find(
            (i) =>
                i.name?.toLowerCase() === name?.toLowerCase() ||
                (role && i.role?.toLowerCase() === role?.toLowerCase()) ||
                i.role?.toLowerCase() === name?.toLowerCase()
        );

        const targetCategory = matchedItem ? matchedItem.name : (name || "All Users");
        const targetRole = matchedItem?.role || (targetCategory.toLowerCase() === "all users" ? "all" : targetCategory.toLowerCase());

        setSelectedCategory(targetCategory);
        setSelectedRoleFilter(targetRole);
        setCurrentPage(1);
        setSelectedUserIds([]);
    }, [sidebarItems, isPrivilegedUser]);

    const handleTabChange = React.useCallback((tabValue) => {
        const next = typeof tabValue === "string" ? tabValue : (tabValue?.value || "all");
        setActiveTab(next);
        setCurrentPage(1);
        setSelectedUserIds([]);
        if (next === "trash") {
            setSelectedCategory("Trash");
        } else if (!isPrivilegedUser && loggedInUserRoleName) {
            setSelectedCategory(`${loggedInUserRoleName.charAt(0).toUpperCase() + loggedInUserRoleName.slice(1)} Users`);
        } else {
            const item = (sidebarItems || []).find((i) => i.role === selectedRoleFilter);
            setSelectedCategory(item ? item.name : "All Users");
        }
    }, [sidebarItems, selectedRoleFilter, isPrivilegedUser, loggedInUserRoleName]);

    const handleClearFilters = React.useCallback(() => {
        setStatusFilter("all");
        setSearchQuery("");
        if (isPrivilegedUser) {
            setSelectedRoleFilter("all");
            setSelectedCategory("All Users");
        } else {
            setSelectedRoleFilter(loggedInUserRoleKey);
            setSelectedCategory(`${loggedInUserRoleName.charAt(0).toUpperCase() + loggedInUserRoleName.slice(1)} Users`);
        }
        setActiveTab("all");
        setCurrentPage(1);
        setSelectedUserIds([]);
        showToast("User filters reset", "info");
    }, [isPrivilegedUser, loggedInUserRoleKey, loggedInUserRoleName]);

    const handleViewUser = React.useCallback((row) => {
        showToast(`Operator Profile: ${row.fullname || row.name} | Role: ${row.role} | Email: ${row.email}`, "info");
    }, []);

    const handleOpenAddModal = React.useCallback(() => {
        setEditingUser(null);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = React.useCallback(() => {
        setIsModalOpen(false);
        setEditingUser(null);
    }, []);

    const handleEditUser = React.useCallback((row) => {
        setEditingUser(row);
        setIsModalOpen(true);
    }, []);

    const handleDeleteUser = React.useCallback(
        async (row) => {
            const userId = row.id || row._id;
            try {
                await removeUser(userId).unwrap();
                const isTrash = activeTab === "trash" || row.isDeleted;
                showToast(`User "${row.fullname || row.name}" ${isTrash ? "permanently deleted!" : "moved to trash!"}`, "success");
                setSelectedUserIds((prev) => prev.filter((id) => id !== userId && id !== row.id && id !== row._id));
                fetchUserData();
            } catch (err) {
                showToast(err?.message || "Failed to delete user", "danger");
            }
        },
        [activeTab, removeUser, fetchUserData]
    );

    const handleBulkDelete = React.useCallback(async () => {
        if (!selectedUserIds.length) return;
        try {
            await Promise.all(selectedUserIds.map((id) => removeUser(id).unwrap()));
            showToast(`${selectedUserIds.length} user(s) removed successfully!`, "success");
            setSelectedUserIds([]);
            fetchUserData();
        } catch (err) {
            showToast(err?.message || "Failed to delete selected users", "danger");
        }
    }, [selectedUserIds, removeUser, fetchUserData]);

    // Checkbox selection handlers
    const isAllSelected = React.useMemo(() => {
        if (!visibleUsersPool.length) return false;
        return visibleUsersPool.every((u) => {
            const id = u.id || u._id;
            return selectedUserIds.includes(id) || (u._id && selectedUserIds.includes(u._id));
        });
    }, [visibleUsersPool, selectedUserIds]);

    const handleSelectAll = React.useCallback((checked) => {
        const next = typeof checked === "boolean" ? checked : !isAllSelected;
        if (next) {
            const allIds = visibleUsersPool.map((u) => u.id || u._id);
            setSelectedUserIds(allIds);
        } else {
            setSelectedUserIds([]);
        }
    }, [visibleUsersPool, isAllSelected]);

    const handleSelectRow = React.useCallback((id, row) => {
        const targetId = row?.id || id;
        setSelectedUserIds((prev) => {
            const exists = prev.includes(targetId) || (row?._id && prev.includes(row._id));
            if (exists) {
                return prev.filter((x) => x !== targetId && x !== row?._id);
            }
            return [...prev, targetId];
        });
    }, []);

    // Form fields configuration for Add / Edit User Modal via generic CrudForm helper
    const formFields = React.useMemo(
        () => getUserFormFields({ editingUser, roleOptions: dynamicRoleOptions, userRole: authRole || loggedInRole }),
        [editingUser, dynamicRoleOptions, authRole, loggedInRole]
    );

    const handleFormSubmit = React.useCallback(async (formData) => {
        if (!formData.fullname?.trim()) {
            showToast("Full name is required", "warning");
            return;
        }

        let imageVal = "";
        const rawImg = formData.image;
        if (Array.isArray(rawImg)) {
            if (rawImg.length > 0) {
                const first = rawImg[0];
                if (first instanceof File || first instanceof Blob) {
                    try {
                        imageVal = await fileToBase64(first);
                    } catch {
                        imageVal = first.name || "";
                    }
                } else if (typeof first === "string") {
                    imageVal = first.trim();
                }
            } else {
                imageVal = "";
            }
        } else if (rawImg instanceof File || rawImg instanceof Blob) {
            try {
                imageVal = await fileToBase64(rawImg);
            } catch {
                imageVal = rawImg.name || "";
            }
        } else if (typeof rawImg === "string") {
            imageVal = rawImg.trim();
        } else if (editingUser?.image) {
            imageVal = editingUser.image;
        }

        const matchedRole = (roles || []).find(
            (r) => String(r.rolename || r.role || r.name).toLowerCase() === String(formData.role).toLowerCase()
        );

        const payload = {
            fullname: formData.fullname.trim(),
            email: formData.email?.trim().toLowerCase(),
            mobile: formData.mobile?.trim(),
            image: imageVal,
            role: matchedRole?.rolename?.toLowerCase() || formData.role || "customer",
            roleId: matchedRole?._id || undefined,
            isActive: sanitizeCrudFormData(formData, { userRole: authRole || loggedInRole, isEditing: Boolean(editingUser) }).isActive,
        };

        if (formData.password) {
            payload.password = formData.password;
        }

        try {
            if (editingUser) {
                await editUser(editingUser.id || editingUser._id, payload).unwrap();
                showToast(`User "${payload.fullname}" updated successfully!`, "success");
            } else {
                await registerApi({
                    ...payload,
                    isOtpVerified: true,
                });
                showToast(`User "${payload.fullname}" created successfully!`, "success");
            }
            setIsModalOpen(false);
            setEditingUser(null);
            fetchUserData();
        } catch (err) {
            showToast(err?.message || "Failed to save user", "danger");
        }
    }, [editingUser, editUser, fetchUserData, roles]);

    const filterInputsNode = React.useMemo(
        () => (
            <FilterForm
                fields={[
                    {
                        type: "select",
                        label: "Account Status Filter",
                        options: STATUS_OPTIONS,
                        value: statusFilter,
                        onChange: (v) => {
                            setStatusFilter(typeof v === "string" ? v : (v?.value || "all"));
                            setCurrentPage(1);
                            setSelectedUserIds([]);
                        },
                    },
                ]}
            />
        ),
        [statusFilter]
    );

    const quickActionNode = React.useMemo(
        () => (
            <div className="flex items-center gap-8">
                {selectedUserIds.length > 0 && (
                    <Button
                        text={`Delete (${selectedUserIds.length})`}
                        version="v2"
                        bg="danger"
                        color="white"
                        icon="Trash"
                        onClick={handleBulkDelete}
                    />
                )}
                <Button
                    text="Add Users"
                    version="v2"
                    bg="primary"
                    variant="outline"
                    border="primary"
                    color="white"
                    icon="File"
                    onClick={handleOpenAddModal}
                />
            </div>
        ),
        [selectedUserIds, handleBulkDelete, handleOpenAddModal]
    );

    const tableSubtitle = React.useMemo(() => {
        if (activeTab === "trash") {
            return "Deactivated system users in trash";
        }
        if (!isPrivilegedUser && loggedInUserRoleName) {
            return `Authenticated platform operators for ${loggedInUserRoleName} role`;
        }
        if (selectedRoleFilter && selectedRoleFilter !== "all") {
            const displayName = selectedCategory || (selectedRoleFilter.charAt(0).toUpperCase() + selectedRoleFilter.slice(1));
            return `Authenticated platform operators for ${displayName} role`;
        }
        return "Authenticated platform operators, administrators, and vendor partners";
    }, [isPrivilegedUser, loggedInUserRoleName, selectedRoleFilter, selectedCategory, activeTab]);

    return (
        <MainLayout
            sidebarTitle="Roles"
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Users" width="18" height="18" />}
            headerTitle="System Users"
            headerSub="Manage authorized platform operators, credential assignments, active sessions, and access roles"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS.users || TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter system users by role, active status, or keyword search"
            filterInputs={filterInputsNode}
            hasActiveFilters={statusFilter !== "all" || Boolean(searchQuery) || (isPrivilegedUser && selectedRoleFilter !== "all")}
            onClearAllFilters={handleClearFilters}
        >
            <div className="bg-white p-14 rounded-10">
                <Table
                    title="User Directory"
                    subtitle={tableSubtitle}
                    data={visibleUsersPool}
                    columns={usersTableColumns}
                    totalItems={selectedRoleFilter !== "all" && visibleUsersPool.length < total ? visibleUsersPool.length : total}
                    itemsPerPage={ITEMS_PER_PAGE}
                    page={currentPage}
                    onPageChange={(p) => {
                        setCurrentPage(p);
                        setSelectedUserIds([]);
                    }}
                    searchQuery={searchQuery}
                    onSearchChange={(v) => {
                        setSearchQuery(typeof v === "string" ? v : (v?.target?.value ?? ""));
                        setCurrentPage(1);
                        setSelectedUserIds([]);
                    }}
                    searchPlaceholder="Search users by name, email, role, or phone..."
                    itemName="users"
                    collapsible={true}
                    maxVisibleColumns={6}
                    minWidth="1050px"
                    loading={loading}
                    selectedRows={selectedUserIds}
                    onSelectRow={handleSelectRow}
                    onSelectAll={handleSelectAll}
                    onView={handleViewUser}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                    viewTitle="View User Profile"
                    editTitle="Edit Credentials"
                    deleteTitle={activeTab === "trash" ? "Permanently Delete User" : "Deactivate User"}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingUser ? `Edit User: ${editingUser.fullname || editingUser.name}` : "Add New User"}
                size="sm"
                type="sidebar"
                placement="right"
                footer={null}
            >
                <FormBuilder
                    key={editingUser ? (editingUser.id || editingUser._id) : "new-user"}
                    fields={formFields}
                    submitType="json"
                    onSubmit={handleFormSubmit}
                    submitText={editingUser ? "Update User" : "Submit & Save User"}
                    col="1"
                />
            </Modal>
        </MainLayout>
    );
};

export default React.memo(User);
