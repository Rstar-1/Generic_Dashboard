import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import { rolesTableColumns, TABS, ROLE_ACCESS_CONFIG, getPermissionsForPages } from "../../utils/apiData";
import { useRoles } from "../../feature/roleSlice";

export { ROLE_ACCESS_CONFIG };

const Role = () => {
  const { roles, total, loading, getRoles, addRole, editRole, removeRole, bulkRemoveRoles } = useRoles();

  const transformPayload = React.useCallback((formData, { basePayload }) => {
    const payload = { ...basePayload };
    if (Array.isArray(payload.pages)) {
      if (payload.pages.includes("Full_Access")) {
        payload.pages = ["Full_Access"];
        payload.permissions = ["Full_Access"];
      } else {
        const allowed = new Set(getPermissionsForPages(payload.pages));
        const perms = Array.isArray(payload.permissions) ? payload.permissions.filter((p) => allowed.has(p)) : [];
        payload.permissions = perms.length ? perms : Array.from(allowed);
      }
    }
    return payload;
  }, []);

  return (
    <MainLayout
      entityName="Role"
      itemName="role"
      headerTitle="Role Permissions & RBAC"
      headerSub="Define security profiles, granular permissions, privilege hierarchies, and user assignments"
      headerIcon="Shield"
      tabs={TABS.roles || TABS}
      tableTitle="Access Roles & Policies"
      columns={rolesTableColumns}
      data={roles}
      total={total}
      loading={loading}
      onFetch={getRoles}
      onAdd={addRole}
      onEdit={editRole}
      onDelete={removeRole}
      onBulkDelete={bulkRemoveRoles}
      transformPayload={transformPayload}
    />
  );
};

export default React.memo(Role);
