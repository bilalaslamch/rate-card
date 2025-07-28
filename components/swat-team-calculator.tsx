"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "./custom-select";
import { RadioGroup } from "./radio-group";
import { Briefcase, Clock, Calendar, TrendingUp } from "lucide-react";

const roles = [
  "Product Owner",
  "Scrum Master",
  "Business Analyst",
  "Project Manager",
  "Solution Architect",
  "Technical Lead",
];

const workloads = [
  { value: "2days", label: "2 days / week", percentage: "40.0%", rate: 3500 },
  { value: "3days", label: "3 days / week", percentage: "60.0%", rate: 5250 },
  { value: "4days", label: "4 days / week", percentage: "80.0%", rate: 7000 },
  { value: "fulltime", label: "Full-time", percentage: "100.0%", rate: 8750 },
];

const durations = [
  { value: "1month", label: "1 month", discount: 0 },
  { value: "2months", label: "2 months", discount: -5 },
  { value: "3months", label: "3 months", discount: -10 },
];

export function SwatTeamCalculator() {
  const [role, setRole] = useState("Product Owner");
  const [workload, setWorkload] = useState("3days");
  const [duration, setDuration] = useState("2months");

  const selectedWorkload = workloads.find((w) => w.value === workload);
  const selectedDuration = durations.find((d) => d.value === duration);

  const baseRate = selectedWorkload?.rate || 0;
  const discount = selectedDuration?.discount || 0;
  const finalRate = Math.round(baseRate * (1 + discount / 100));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          SWAT Team Calculator
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400">
          Pre-negotiated 20% discount. Base: Middle East - Advanced.
        </p>
        <div className="bg-gray-300 h-[1px]" />
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Workload
            </div>
            <RadioGroup
              value={workload}
              onValueChange={setWorkload}
              options={workloads.map((w) => ({
                value: w.value,
                label: w.label,
                badge: w.percentage,
              }))}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Duration
            </div>
            <RadioGroup
              value={duration}
              onValueChange={setDuration}
              options={durations.map((d) => ({
                value: d.value,
                label: d.label,
                badge: d.discount !== 0 ? `${d.discount}%` : undefined,
                badgeColor: d.discount < 0 ? "red" : undefined,
              }))}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-end py-8 border-t-[1px] border-t-gray-300]">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Monthly Rate:
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            AED {finalRate.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
