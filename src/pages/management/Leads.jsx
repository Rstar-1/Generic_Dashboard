import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import { getLeadFormFields } from "../../components/forms/sections/CrudForm";
import { leadsSidebarData, leadsTableColumns, TABS } from "../../utils/apiData";
import { useLeads } from "../../feature/leadSlice";

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
            onFetch={getLeads}
            onAdd={addLead}
            onEdit={editLead}
            onDelete={removeLead}
            onBulkDelete={bulkRemoveLeads}
        />
    );
};

export default React.memo(Leads);
