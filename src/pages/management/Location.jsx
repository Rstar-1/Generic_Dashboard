import React from "react";
import MainLayout from "../../components/layout/sections/MainLayout";

export default function LocationPage() {
  return (
    <MainLayout title="Location Management">
      <div className="p-20">
        <h3>Location Management</h3>
        <p className="text-secondary">Manage store locations, pickup points, and delivery coverage.</p>
      </div>
    </MainLayout>
  );
}
