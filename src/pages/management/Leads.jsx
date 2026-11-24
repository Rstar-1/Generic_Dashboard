import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";

export default function LeadsPage() {
  return (
    <MainLayout title="Leads Management">
      <div className="p-20">
        <h3>Leads Management</h3>
        <p className="text-secondary">Track, update status, and manage incoming customer leads.</p>
      </div>
    </MainLayout>
  );
}
