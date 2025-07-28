"use client";

import { Users, FileText, CalculatorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSound } from "./sound-provider";

interface TabNavigationProps {
  activeTab: "shared" | "custom";
  onTabChange: (tab: "shared" | "custom") => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const { playClickSound } = useSound();

  const handleTabClick = (tab: "shared" | "custom") => {
    playClickSound();
    onTabChange(tab);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        variant={activeTab === "shared" ? "default" : "outline"}
        onClick={() => handleTabClick("shared")}
        className="flex items-center gap-2 px-6 py-3 rounded-full"
      >
        <Users className="h-4 w-4" />
        Shared Hub71 SWAT Team
      </Button>
      <Button
        variant={activeTab === "custom" ? "default" : "outline"}
        onClick={() => handleTabClick("custom")}
        className="flex items-center gap-2 px-6 py-3 rounded-full"
      >
        <CalculatorIcon className="h-4 w-4" />
        Custom Resources
      </Button>
    </div>
  );
}
