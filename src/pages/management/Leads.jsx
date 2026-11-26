import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import { getLeadFormFields } from "../../components/forms/sections/CrudForm";
import { leadsSidebarData, leadsTableColumns, TABS } from "../../utils/apiData";
import { useLeads } from "../../feature/leadSlice";
import { useProducts } from "../../feature/productSlice";

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

    const { products, getProducts } = useProducts();

    React.useEffect(() => {
        if (!products || products.length === 0) {
            getProducts?.({ limit: 100, isDeleted: false });
        }
    }, [products, getProducts]);

    const productOptions = React.useMemo(() => {
        const list = Array.isArray(products) ? products : [];
        return list
            .filter((p) => !p.isDeleted)
            .map((p) => ({
                label: `${p.productName || p.name || p.id} (${p.id || ""})`,
                value: String(p._id || p.id),
            }));
    }, [products]);

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
            tableTitle="Lead Inquiries & Prospects"
            columns={leadsTableColumns}
            data={leads}
            total={total}
            loading={loading}
            productOptions={productOptions}
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
