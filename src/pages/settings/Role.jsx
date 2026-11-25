import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import { rolesTableColumns, TABS, ROLE_ACCESS_CONFIG } from "../../utils/apiData";
import { useRoles } from "../../feature/roleSlice";

export { ROLE_ACCESS_CONFIG };

const Role = () => {
  const { roles, total, loading, getRoles, addRole, editRole, removeRole, bulkRemoveRoles } = useRoles();

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
    />
  );
};

export default React.memo(Role);
