"use client";
import { useState } from "react";
import NavigationTabs from "./NavigationTabs";
import Overview from "./Overview";
import Loans from "./Loans";
import Payments from "./Payments";
import Documents from "./Documents";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const activeLoan = {
    totalAmount: 500000,
    remainingBalance: 380000,
    monthlyPayment: 28500,
    nextPaymentDate: "2025-11-15",
    interestRate: 45,
    term: 24,
    monthsPaid: 6,
    monthsRemaining: 18,
  };

  return (
    <>
      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="px-6 py-8">
        {activeTab === "overview" && <Overview activeLoan={activeLoan} />}

        {activeTab === "loans" && <Loans activeLoan={activeLoan} />}

        {activeTab === "payments" && <Payments />}

        {activeTab === "documents" && <Documents />}
      </main>
    </>
  );
};

export default Dashboard;
