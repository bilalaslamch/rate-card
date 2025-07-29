"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "./CustomSelect";
import { RadioGroup } from "./RadioGroup";
import { MapPin, Briefcase, TrendingUp } from "lucide-react";
import { ICustomResourcePDF, RoleRate } from "@/common";
import { PDFDownloadButton } from "./pdf/PDFDownloadButton";
import { CustomResourcePDF } from "./pdf/CustomResourcePDF";
import { EmailModal } from "./ui/EmailModal";
import toast from "react-hot-toast";

interface CustomResourceCalculatorProps {
  data: RoleRate[];
}

export function CustomResourceCalculator({
  data,
}: CustomResourceCalculatorProps) {
  const regions = useMemo(() => {
    const unique = Array.from(new Set(data.map((item) => item.regions.name)));
    return unique.map((name) => ({ label: name, value: name }));
  }, [data]);

  const roles = useMemo(() => {
    const unique = Array.from(new Set(data.map((item) => item.roles.name)));
    return unique.map((name) => ({ label: name, value: name }));
  }, [data]);

  const [region, setRegion] = useState(regions[0]?.value || "");
  const [role, setRole] = useState(roles[0]?.value || "");
  const [seniority, setSeniority] = useState("intermediate");
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const seniorities = [
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "expert", label: "Expert" },
  ];

  const selectedRate = data.find(
    (item) => item.roles.name === role && item.regions.name === region
  );

  const monthlyRate =
    seniority === "intermediate"
      ? selectedRate?.intermediate_rate
      : seniority === "advanced"
      ? selectedRate?.advanced_rate
      : selectedRate?.expert_rate || 0;

  const pdfData: ICustomResourcePDF = {
    role,
    region,
    seniority,
    monthlyRate,
    selectedRate,
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
          type: "custom",
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
          Custom Resource Calculator
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400">
          Select region, role, and seniority for tailored pricing.
        </p>
        <div className="bg-gray-300 h-[1px]" />
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Region Select */}
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

          {/* Role Select */}
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

          {/* Seniority Radio */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Seniority
            </div>
            <RadioGroup
              value={seniority}
              onValueChange={setSeniority}
              options={seniorities}
            />
          </div>
        </div>

        {/* Rate Display */}
        <div className="flex flex-col justify-center items-end py-8 border-t-[1px] border-t-gray-300]">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Monthly Rate:
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            AED {monthlyRate ? monthlyRate.toLocaleString() : "0"}
          </div>
        </div>

        {/* PDF Download Button */}
        <div className="flex justify-end pt-4 gap-2">
          <PDFDownloadButton<ICustomResourcePDF>
            PDFComponent={CustomResourcePDF}
            data={pdfData}
            type="custom"
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
