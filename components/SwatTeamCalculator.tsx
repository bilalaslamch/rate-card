"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "./CustomSelect";
import { RadioGroup } from "./RadioGroup";
import { Briefcase, Calendar, TrendingUp } from "lucide-react";
import { RoleRate, ISwatTeamPDF } from "@/common";
import { useSwatTeamRates } from "@/hooks/useSwatTeamRates";
import { PDFDownloadButton } from "./pdf/PDFDownloadButton";
import { EmailModal } from "./ui/EmailModal";
import toast from "react-hot-toast";
import { SwatTeamPDF } from "./pdf/SwatTeamPDF";

interface SwatTeamCalculatorProps {
  data: RoleRate[];
}

export function SwatTeamCalculator({ data }: SwatTeamCalculatorProps) {
  const [role, setRole] = useState("Product Owner");
  const [workload, setWorkload] = useState("3days");
  const [duration, setDuration] = useState("2months");
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const { roles, workloads, durations, calculateDiscountedRate } =
    useSwatTeamRates(data, role);

  const { baseRate, discount, finalRate, selectedWorkload, selectedDuration } =
    calculateDiscountedRate(workload, duration);

  const pdfData: ISwatTeamPDF = {
    role,
    workload,
    duration,
    baseRate,
    discount,
    finalRate,
    selectedWorkload,
    selectedDuration,
  };

  const handleSendEmail = async (email: string, name: string) => {
    setEmailLoading(true);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          type: "swat",
          data: pdfData,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Email sent successfully!");
        setEmailModalOpen(false);
      } else {
        throw new Error(result.message || "Unknown error");
      }
    } catch (error) {
      console.error("error ", error);
      toast.error("Error sending email. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  };

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
                badge: `${w.percentage}%`,
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

        {/* Final Rate Display */}
        <div className="flex flex-col justify-center items-end py-8 border-t-[1px] border-t-gray-300">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Monthly Rate:
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            AED {finalRate.toLocaleString()}
          </div>
        </div>

        {/* PDF Download Button */}
        <div className="flex justify-end pt-4 gap-2">
          <PDFDownloadButton<ISwatTeamPDF>
            PDFComponent={SwatTeamPDF}
            data={pdfData}
            type="swat"
          />
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors border border-blue-300"
            onClick={() => setEmailModalOpen(true)}
            type="button"
          >
            📧 Email Rate Card
          </button>
        </div>
      </CardContent>
      <EmailModal
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onSend={handleSendEmail}
        loading={emailLoading}
      />
    </Card>
  );
}
