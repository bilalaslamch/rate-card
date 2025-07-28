"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "./custom-select";
import { RadioGroup } from "./radio-group";
import { MapPin, Briefcase, TrendingUp } from "lucide-react";

const regions = [
  "Eastern Europe",
  "Western Europe",
  "North America",
  "Asia Pacific",
  "Middle East",
  "Africa",
];

const roles = [
  "Developer",
  { label: "Full Stack Developer", badge: "NEW" },
  "Backend Developer",
  "Database Developer",
  "Django Stack Developer",
  "Flutter Firebase",
  "Frontend Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "UI/UX Designer",
];

const seniorities = [
  { value: "junior", label: "Junior", rate: 8500 },
  { value: "intermediate", label: "Intermediate", rate: 13835 },
  { value: "advanced", label: "Advanced", rate: 18500 },
  { value: "expert", label: "Expert", rate: 25000 },
];

export function CustomResourceCalculator() {
  const [region, setRegion] = useState("Eastern Europe");
  const [role, setRole] = useState("Backend Developer");
  const [seniority, setSeniority] = useState("intermediate");

  const selectedSeniority = seniorities.find((s) => s.value === seniority);
  const monthlyRate = selectedSeniority?.rate || 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Custom Resource Calculator
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400">
          Select region, role, and seniority for tailored pricing.
        </p>
        <div className="bg-gray-300 h-[1px]" />
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Region
            </div>
            <CustomSelect
              value={region}
              onValueChange={setRegion}
              options={regions}
              placeholder="Select region"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Briefcase className="h-4 w-4" />
              Role
            </div>
            <CustomSelect
              value={role}
              onValueChange={setRole}
              options={roles}
              placeholder="Select role"
              searchable
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Seniority
            </div>
            <RadioGroup
              value={seniority}
              onValueChange={setSeniority}
              options={seniorities.map((s) => ({
                value: s.value,
                label: s.label,
              }))}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-end py-8 border-t-[1px] border-t-gray-300]">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Monthly Rate:
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            AED {monthlyRate.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
