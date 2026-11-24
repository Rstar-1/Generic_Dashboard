import React from "react";

import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Icon from "../../components/common/Icon";
import FilterForm from "../../components/forms/sections/FilterForm";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import FormBuilder from "../../components/forms/FormBuilder";
import { getRoleFormFields, sanitizeCrudFormData } from "../../components/forms/sections/CrudForm";
import { showToast } from "../../components/common/Toast";

import { rolesTableColumns, STATUS_OPTIONS, TABS } from "../../utils/apiData";
import { useRoles } from "../../feature/roleSlice";
import { useCurrentUser } from "../../utils";

const ITEMS_PER_PAGE = 5;

const DEFAULT_ROLE_OPTIONS = [
  { label: "All Roles", value: "all" },
  { label: "Customer", value: "customer" },
  { label: "Admin", value: "admin" },
  { label: "Accountant", value: "accountant" },
  { label: "Manager", value: "manager" },
  { label: "Product", value: "product" },
];



export const ROLE_ACCESS_CONFIG = [
  {
    page: "Full_Access",
    label: "Full Access",
    permissions: ["Full_Access"],
  },
  {
    page: "Dashboard",
    label: "Dashboard",
    permissions: ["view_dashboard"],
  },
  {
    page: "Profile",
    label: "Profile",
    permissions: ["view_profile"],
  },
  {
    page: "Products Category",
    label: "Products Category",
    permissions: [
      "view_product_categories",
      "edit_product_categories",
      "trash_product_categories",
    ],
  },
  {
    page: "Blogs Category",
    label: "Blogs Category",
    permissions: [
      "view_blog_categories",
      "edit_blog_categories",
      "trash_blog_categories",
    ],
  },
  {
    page: "Products",
    label: "Products",
    permissions: [
      "view_products",
      "edit_products",
      "trash_products",
    ],
  },
  {
    page: "Blogs",
    label: "Blogs",
    permissions: [
      "view_blogs",
      "edit_blogs",
      "trash_blogs",
    ],
  },
  {
    page: "SEO",
    label: "SEO",
    permissions: [
      "view_seo",
      "edit_seo",
      "trash_seo",
    ],
  },
  {
    page: "System Users",
    label: "System Users",
    permissions: [
      "view_systemuser",
      "edit_systemuser",
      "trash_systemuser",
    ],
  },
  {
    page: "Roles",
    label: "Roles",
    permissions: [
      "view_roles",
      "edit_roles",
      "trash_roles",
    ],
  },
];

const Role = () => {
  const { user: currentUser, isAdmin } = useCurrentUser();
  const { roles, total, loading, getRoles, addRole, editRole, removeRole, bulkRemoveRoles } = useRoles();

  const [activeTab, setActiveTab] = React.useState("all");

  // Restrict trash tab to admin role only
  const visibleTabs = React.useMemo(() => {
    const raw = TABS.roles || TABS;
    return isAdmin ? raw : raw.filter((t) => (t?.value || "").toLowerCase() !== "trash");
  }, [isAdmin]);

  React.useEffect(() => {
    if (!isAdmin && activeTab === "trash") {
      setActiveTab("all");
    }
  }, [isAdmin, activeTab]);

  const [roleFilter, setRoleFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [permissionFilter, setPermissionFilter] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedRoleIds, setSelectedRoleIds] = React.useState([]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingRole, setEditingRole] = React.useState(null);

  // Fetch roles using backend pagination query parameters
  const fetchRoleData = React.useCallback(() => {
    const params = {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      isDeleted: activeTab === "trash" ? true : false,
    };

    const trimmedSearch = searchQuery.trim();
    if (trimmedSearch) {
      params.search = trimmedSearch;
    } else if (roleFilter !== "all") {
      params.search = roleFilter;
    }

    if (statusFilter !== "all") {
      params.isActive = statusFilter === "Active";
    }

    getRoles(params);
  }, [currentPage, activeTab, searchQuery, roleFilter, statusFilter, getRoles]);

  React.useEffect(() => {
    fetchRoleData();
  }, [fetchRoleData]);

  const handleClearFilters = React.useCallback(() => {
    setActiveTab("all");
    setRoleFilter("all");
    setStatusFilter("all");
    setPermissionFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
    setSelectedRoleIds([]);
    showToast("Role filters reset", "info");
  }, []);

  const handleViewRole = React.useCallback(() => { }, []);

  const handleEditRole = React.useCallback((row) => {
    setEditingRole(row);
    setIsModalOpen(true);
  }, []);

  const handleDeleteRole = React.useCallback(
    async (row) => {
      const roleId = row.id || row._id;
      try {
        await removeRole(roleId).unwrap();
        const isTrash = activeTab === "trash" || row.isDeleted;
        showToast(`Role "${row.rolename || row.name}" ${isTrash ? "permanently deleted!" : "moved to trash!"}`, "success");
        setSelectedRoleIds((prev) => prev.filter((id) => id !== roleId && id !== row._id && id !== row.id));
        fetchRoleData();
      } catch (err) {
        showToast(err?.message || "Failed to delete role", "danger");
      }
    },
    [activeTab, removeRole, fetchRoleData]
  );

  const handleBulkDelete = React.useCallback(async () => {
    if (!selectedRoleIds.length) return;
    try {
      await bulkRemoveRoles({ ids: selectedRoleIds }).unwrap();
      showToast(`${selectedRoleIds.length} role(s) deleted successfully!`, "success");
      setSelectedRoleIds([]);
      fetchRoleData();
    } catch (err) {
      showToast(err?.message || "Failed to bulk delete roles", "danger");
    }
  }, [selectedRoleIds, bulkRemoveRoles, fetchRoleData]);

  // Header Checkbox "Select All" handling
  const isAllSelected = React.useMemo(() => {
    if (!roles.length) return false;
    return roles.every((r) => {
      const id = r.id || r._id;
      return selectedRoleIds.includes(id) || (r._id && selectedRoleIds.includes(r._id));
    });
  }, [roles, selectedRoleIds]);

  const handleSelectAll = React.useCallback((checked) => {
    const shouldSelect = typeof checked === "boolean" ? checked : !isAllSelected;
    if (shouldSelect) {
      const allIds = roles.map((r) => r.id || r._id);
      setSelectedRoleIds(allIds);
    } else {
      setSelectedRoleIds([]);
    }
  }, [roles, isAllSelected]);

  const handleSelectRow = React.useCallback((id, row) => {
    const targetId = row?.id || id;
    setSelectedRoleIds((prev) => {
      const exists = prev.includes(targetId) || (row?._id && prev.includes(row._id));
      if (exists) {
        return prev.filter((x) => x !== targetId && x !== row?._id);
      }
      return [...prev, targetId];
    });
  }, []);

  // Filter displayed roles by permission capability if selected
  const displayedRoles = React.useMemo(() => {
    if (permissionFilter === "all") return roles;
    return (roles || []).filter((r) =>
      Array.isArray(r.permissions) && r.permissions.includes(permissionFilter)
    );
  }, [roles, permissionFilter]);

  // Dynamic dropdown options
  const dynamicRoleOptions = React.useMemo(() => {
    const map = new Map(DEFAULT_ROLE_OPTIONS.map((o) => [o.value, o.label]));
    (roles || []).forEach((r) => {
      const val = String(r.rolename || r.role || r.name || "").toLowerCase().trim();
      const label = r.rolename || r.name || r.role;
      if (val && !map.has(val)) map.set(val, label.charAt(0).toUpperCase() + label.slice(1));
    });
    return Array.from(map.entries()).map(([value, label]) => ({ label, value }));
  }, [roles]);

  const permissionOptions = React.useMemo(() => {
    const list = [];
    ROLE_ACCESS_CONFIG.forEach((item) => {
      (item.permissions || []).forEach((perm) => {
        if (perm && !list.some((o) => o.value === perm)) {
          list.push({ label: perm, value: perm });
        }
      });
    });
    return list;
  }, []);

  const pageOptions = React.useMemo(() => {
    return ROLE_ACCESS_CONFIG.map((item) => ({
      label: item.label || item.page,
      value: item.page,
    }));
  }, []);

  const [roleFormValues, setRoleFormValues] = React.useState({
    rolename: "",
    pages: ["Full_Access"],
    permissions: ["Full_Access"],
    isActive: true,
  });

  React.useEffect(() => {
    if (isModalOpen) {
      if (editingRole) {
        setRoleFormValues({
          rolename: editingRole.rolename || editingRole.name || "",
          pages: Array.isArray(editingRole.pages) && editingRole.pages.length ? editingRole.pages : ["Full_Access"],
          permissions: Array.isArray(editingRole.permissions) && editingRole.permissions.length ? editingRole.permissions : ["Full_Access"],
          isActive: editingRole.isActive !== undefined ? Boolean(editingRole.isActive) : true,
        });
      } else {
        setRoleFormValues({
          rolename: "",
          pages: ["Full_Access"],
          permissions: ["Full_Access"],
          isActive: true,
        });
      }
    }
  }, [isModalOpen, editingRole]);

  const handleRoleFormChange = React.useCallback((name, value) => {
    if (name === "pages") {
      const selectedPages = Array.isArray(value) ? value : [value].filter(Boolean);
      let mappedPerms = [];
      if (selectedPages.includes("Full_Access")) {
        mappedPerms = ["Full_Access"];
      } else {
        const permSet = new Set();
        selectedPages.forEach((p) => {
          const cfg = ROLE_ACCESS_CONFIG.find((item) => item.page === p);
          if (cfg?.permissions) {
            cfg.permissions.forEach((perm) => permSet.add(perm));
          }
        });
        mappedPerms = Array.from(permSet);
      }

      setRoleFormValues((prev) => ({
        ...prev,
        pages: selectedPages,
        permissions: mappedPerms,
      }));
    } else {
      setRoleFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  // Form fields for Add / Edit Role Modal via generic CrudForm helper
  const formFields = React.useMemo(
    () => getRoleFormFields({ editingRole, permissionOptions, pageOptions, userRole: currentUser }),
    [editingRole, permissionOptions, pageOptions, currentUser]
  );

  const handleFormSubmit = React.useCallback(async (formData) => {
    if (!formData.rolename?.trim()) {
      showToast("Role name is required", "warning");
      return;
    }

    const payload = {
      rolename: formData.rolename.trim(),
      permissions: Array.isArray(formData.permissions) ? formData.permissions : [formData.permissions].filter(Boolean),
      pages: Array.isArray(formData.pages) ? formData.pages : [formData.pages].filter(Boolean),
      isActive: sanitizeCrudFormData(formData, { userRole: currentUser, isEditing: Boolean(editingRole) }).isActive,
      ...(editingRole ? { isDeleted: Boolean(editingRole.isDeleted) } : { isDeleted: false }),
    };

    try {
      if (editingRole) {
        await editRole(editingRole.id || editingRole._id, payload).unwrap();
        showToast(`Role "${payload.rolename}" updated successfully!`, "success");
      } else {
        await addRole(payload).unwrap();
        showToast(`Role "${payload.rolename}" created successfully!`, "success");
      }
      setIsModalOpen(false);
      setEditingRole(null);
      fetchRoleData();
    } catch (err) {
      showToast(err?.message || "Failed to save role", "danger");
    }
  }, [editingRole, editRole, addRole, fetchRoleData, currentUser]);

  const filterInputsNode = React.useMemo(() => (
    <FilterForm
      fields={[
        {
          type: "select",
          label: "Role Filter",
          options: dynamicRoleOptions,
          value: roleFilter,
          onChange: (v) => {
            setRoleFilter(typeof v === "string" ? v : v?.value || "all");
            setCurrentPage(1);
            setSelectedRoleIds([]);
          },
        },
        {
          type: "select",
          label: "Role Status",
          options: STATUS_OPTIONS,
          value: statusFilter,
          onChange: (v) => {
            setStatusFilter(typeof v === "string" ? v : v?.value || "all");
            setCurrentPage(1);
            setSelectedRoleIds([]);
          },
        },
        {
          type: "select",
          label: "Required Permission Capability",
          options: [{ label: "All Permissions", value: "all" }, ...permissionOptions],
          value: permissionFilter,
          onChange: (v) => {
            setPermissionFilter(typeof v === "string" ? v : v?.value || "all");
            setCurrentPage(1);
            setSelectedRoleIds([]);
          },
        },
      ]}
    />
  ), [dynamicRoleOptions, roleFilter, statusFilter, permissionOptions, permissionFilter]);

  const quickActionNode = React.useMemo(() => (
    <div className="flex items-center gap-8">
      {selectedRoleIds.length > 0 && (
        <Button
          text={`Delete (${selectedRoleIds.length})`}
          version="v2"
          bg="danger"
          color="white"
          icon="Trash"
          onClick={handleBulkDelete}
        />
      )}
      <Button
        text="Add Role"
        version="v2"
        bg="primary"
        variant="outline"
        border="primary"
        color="white"
        icon="File"
        onClick={() => { setEditingRole(null); setIsModalOpen(true); }}
      />
    </div>
  ), [selectedRoleIds, handleBulkDelete]);

  return (
    <MainLayout
      showSidebar={false}
      headerIcon={<Icon name="Shield" width="18" height="18" />}
      headerTitle="Role Permissions & RBAC"
      headerSub="Define security profiles, granular permissions, privilege hierarchies, and user assignments"
      quickAction={quickActionNode}
      showTabControls={true}
      tabs={visibleTabs}
      activeTab={activeTab}
      onTabChange={(v) => {
        const tab = typeof v === "string" ? v : (v?.value || "all");
        setActiveTab(tab);
        setCurrentPage(1);
        setSelectedRoleIds([]);
      }}
      filterDescription="Filter role profiles by customer role, permission privilege, status, or keyword search"
      filterInputs={filterInputsNode}
      hasActiveFilters={activeTab !== "all" || roleFilter !== "all" || statusFilter !== "all" || permissionFilter !== "all" || Boolean(searchQuery)}
      onClearAllFilters={handleClearFilters}
    >
      <div className="bg-white p-14 rounded-10">
        <Table
          title="Access Roles & Policies"
          subtitle={activeTab === "trash" ? "Revoked security roles in trash" : "Role-based access control matrix with permission grants and assigned operators"}
          data={displayedRoles}
          columns={rolesTableColumns}
          totalItems={total}
          itemsPerPage={ITEMS_PER_PAGE}
          page={currentPage}
          onPageChange={(p) => {
            setCurrentPage(p);
            setSelectedRoleIds([]);
          }}
          searchQuery={searchQuery}
          onSearchChange={(v) => {
            setSearchQuery(typeof v === "string" ? v : (v?.target?.value ?? ""));
            setCurrentPage(1);
            setSelectedRoleIds([]);
          }}
          searchPlaceholder="Search roles by title, description, or permissions..."
          itemName="roles"
          collapsible={true}
          maxVisibleColumns={5}
          minWidth="1050px"
          loading={loading}
          selectedRows={selectedRoleIds}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          onView={handleViewRole}
          onEdit={handleEditRole}
          onDelete={handleDeleteRole}
          viewTitle="Inspect Policy"
          editTitle="Edit Permissions"
          deleteTitle={activeTab === "trash" ? "Permanently Delete Role" : "Delete Role"}
          emptyAction={
            <Button
              text="Add Role"
              version="v2"
              bg="primary"
              variant="outline"
              border="primary"
              color="white"
              icon="File"
              onClick={() => { setEditingRole(null); setIsModalOpen(true); }}
            />
          }
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingRole(null); }}
        title={editingRole ? `Edit Role: ${editingRole.rolename}` : "Add New Role"}
        size="sm"
        type="sidebar"
        placement="right"
        footer={null}
      >
        <FormBuilder
          key={editingRole ? (editingRole.id || editingRole._id) : "new-role"}
          fields={formFields}
          values={roleFormValues}
          onChange={handleRoleFormChange}
          submitType="json"
          onSubmit={handleFormSubmit}
          submitText={editingRole ? "Update Role" : "Submit & Save Role"}
          col="1"
        />
      </Modal>
    </MainLayout>
  );
};

export default React.memo(Role);
