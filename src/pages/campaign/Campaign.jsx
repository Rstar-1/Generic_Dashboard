import React from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "../../components/layout/sections/MainLayout";

export default function CampaignPage() {
  const location = useLocation();
  const channel = location.pathname.split("/")[2] || "Overview";
  const channelTitle = channel.charAt(0).toUpperCase() + channel.slice(1);

  return (
    <MainLayout title={`${channelTitle} Campaign`}>
      <div className="p-20">
        <h3>{channelTitle} Campaign</h3>
        <p className="text-secondary">Configure templates, recipients, and broadcast marketing messages.</p>
      </div>
    </MainLayout>
  );
}
