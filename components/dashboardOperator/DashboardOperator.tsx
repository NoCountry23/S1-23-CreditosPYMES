"use client";
import { useState } from "react";
import MyRequestsAssigned from "./MyRequestsAssigned";
import NavigationTabs from "./NavigationTabs";
import RequestsUnassigned from "./RequestsUnassigned";

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests-unassigned");
  return (
    <>
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="px-6 py-8">
        {activeTab === "requests-unassigned" && <RequestsUnassigned />}
        {activeTab === "my-requests-assigned" && <MyRequestsAssigned />}
      </main>
    </>
  );
};

export default OperatorDashboard;
