"use client";

import { useState } from "react";
import { Header } from "./header";
import { TabNavigation } from "./tab-navigation";
import { CustomResourceCalculator } from "./custom-resource-calculator";
import { SwatTeamCalculator } from "./swat-team-calculator";
import { SoundProvider } from "./sound-provider";
import { ThemeProvider } from "./theme-provider";

export function Calculator() {
  const [activeTab, setActiveTab] = useState<"shared" | "custom">("custom");

  return (
    <ThemeProvider>
      <SoundProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          <div className="max-w-6xl mx-auto px-0 md:px-10 lg:px-20 py-6">
            <Header />
            <div className="mt-6">
              <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
              <div className="mt-8">
                {activeTab === "custom" ? (
                  <CustomResourceCalculator />
                ) : (
                  <SwatTeamCalculator />
                )}
              </div>
            </div>
            <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
              Rate Card for Hub71 - 2025
            </div>
          </div>
        </div>
      </SoundProvider>
    </ThemeProvider>
  );
}
