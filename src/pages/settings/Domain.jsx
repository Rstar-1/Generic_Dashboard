import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";

export default function DomainSettings() {
  return (
    <MainLayout title="Domain Settings">
      <div className="p-20">
        <h3>Domain Settings</h3>
        <p className="text-secondary">Manage custom domain configurations and SSL certificates.</p>
      </div>
    </MainLayout>
  );
}
