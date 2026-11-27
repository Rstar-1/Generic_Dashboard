import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import { getLeadFormFields } from "../../components/forms/sections/CrudForm";
import { leadsSidebarData, leadsTableColumns, TABS } from "../../utils/apiData";
import { useLeads } from "../../feature/leadSlice";
import { useUsers } from "../../feature/userSlice";

const Leads = () => {
    const {
        leads,
        total,
        counts,
        loading,
        getLeads,
        addLead,
        editLead,
        removeLead,
        bulkRemoveLeads,
    } = useLeads();

    const { users, getUsers } = useUsers();

    React.useEffect(() => {
        getUsers?.({ limit: 100, isDeleted: false });
    }, [getUsers]);

    const vendorOptions = React.useMemo(() => {
        const list = Array.isArray(users) ? users : [];
        return list
            .filter((u) => {
                if (!u || u.isDeleted) return false;
                const roleStr = String(
                    u.role || u.rolename || u.roleId?.rolename || u.roleId?.name || ""
                ).toLowerCase().trim();
                return roleStr === "vendor" || roleStr.includes("vendor");
            })
            .map((u) => ({
                label: `${u.fullname || u.name || u.email || u.id} (${u.id || ""})`,
                value: String(u._id || u.id),
            }));
    }, [users]);

    return (
        <MainLayout
            entityName="Lead"
            itemName="leads"
            headerTitle="Leads Overview"
            headerSub="Track prospective client inquiries, qualification severities, and pipeline conversions"
            headerIcon="Box"
            sidebarData={leadsSidebarData}
            sidebarCounts={counts || { all: total }}
            tabs={TABS.leads || TABS}
            columns={leadsTableColumns}
            data={leads}
            total={total}
            loading={loading}
            getFormFields={getLeadFormFields}
            vendorOptions={vendorOptions}
            onFetch={getLeads}
            onAdd={addLead}
            onEdit={editLead}
            onDelete={removeLead}
            onBulkDelete={bulkRemoveLeads}
        />
    );
};

export default React.memo(Leads);
