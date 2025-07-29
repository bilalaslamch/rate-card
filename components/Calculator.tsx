"use client";

import { useState } from "react";
import { useCustomResourceRates } from "@/hooks/useCustomResourceRates";
import toast from "react-hot-toast";
import CalculatorSkelton from "./skeleton/CalculatorSkeleton";
import { Header } from "./Header";
import { CustomResourceCalculator } from "./CustomResourceCalculator";
import { SwatTeamCalculator } from "./SwatTeamCalculator";
import { TabNavigation } from "./TabNavigation";

export function Calculator() {
  const { data, loading, error } = useCustomResourceRates();
  const [activeTab, setActiveTab] = useState<"shared" | "custom">("custom");

  if (loading) {
    return <CalculatorSkelton />;
  }

  if (error) {
    toast.error(error);
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <div className="max-w-6xl mx-auto px-0 md:px-10 lg:px-20 py-6">
          <Header />
          <div className="mt-6">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="min-h-screen flex items-center justify-center">
              No data found.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-0 md:px-10 lg:px-20 py-6">
        <Header />
        <div className="mt-6">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="mt-8">
            {activeTab === "custom" ? (
              <CustomResourceCalculator data={data} />
            ) : (
              <SwatTeamCalculator data={data} />
            )}
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Rate Card for Hub71 - 2025
        </div>
      </div>
    </div>
  );
}
