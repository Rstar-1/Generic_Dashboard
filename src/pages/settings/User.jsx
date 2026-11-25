import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import { usersTableColumns, TABS } from "../../utils/apiData";
import { useUsers } from "../../feature/userSlice";

const User = () => {
  const { users, total, loading, getUsers, editUser, removeUser, bulkRemoveUsers } = useUsers();

  return (
    <MainLayout
      entityName="User"
      itemName="users"
      headerTitle="System Users"
      headerSub="Manage authorized platform operators, credential assignments, active sessions, and access roles"
      headerIcon="Users"
      tabs={TABS.users || TABS}
      tableTitle="User Directory"
      columns={usersTableColumns}
      data={users}
      total={total}
      loading={loading}
      onFetch={getUsers}
      onEdit={editUser}
      onDelete={removeUser}
      onBulkDelete={bulkRemoveUsers}
    />
  );
};

export default React.memo(User);
