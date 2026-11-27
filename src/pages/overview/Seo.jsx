import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import { seoSidebarData, seoTableColumns, TABS } from "../../utils/apiData";
import { useSeo } from "../../feature/seoSlice";

const Seo = () => {
    const {
        seos,
        total,
        counts,
        loading,
        getSeoList,
        createSeo,
        updateSeo,
        deleteSeo,
        bulkDeleteSeo,
    } = useSeo();

    return (
        <MainLayout
            entityName="SEO"
            itemName="pages"
            headerTitle="SEO Configuration"
            headerSub="Manage canonical URLs, meta tags, OpenGraph schemas, and indexing directives"
            headerIcon="Globe"
            sidebarData={seoSidebarData}
            sidebarCounts={counts || { all: total }}
            tabs={TABS.seo || TABS}
            tableTitle="Search Engine Index"
            formCols='2'
            modalSize='lg'
            columns={seoTableColumns}
            data={seos}
            total={total}
            loading={loading}
            onFetch={getSeoList}
            onAdd={createSeo}
            onEdit={updateSeo}
            onDelete={deleteSeo}
            onBulkDelete={bulkDeleteSeo}
        />
    );
};

export default React.memo(Seo);
