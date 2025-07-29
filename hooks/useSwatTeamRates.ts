import { useMemo } from "react";
import { Duration, RoleRate, Workload } from "@/common";



const workloads: Workload[] = [
  { value: "2days", label: "2 days / week", percentage: 40 },
  { value: "3days", label: "3 days / week", percentage: 60 },
  { value: "4days", label: "4 days / week", percentage: 80 },
  { value: "fulltime", label: "Full-time", percentage: 100 },
];

const durations: Duration[] = [
  { value: "1month", label: "1 month", discount: 0 },
  { value: "2months", label: "2 months", discount: -5 },
  { value: "3months", label: "3 months", discount: -10 },
];

export function useSwatTeamRates(
  data: RoleRate[] | null,
  selectedRole: string
) {
  const roles = useMemo(() => {
    if (!data) return [];
    const unique = Array.from(new Set(data.map((item) => item.roles.name)));
    return unique.map((name) => ({ label: name, value: name }));
  }, [data]);

  const calculateDiscountedRate = (
    workloadValue: string,
    durationValue: string
  ) => {
    const selectedWorkload = workloads.find((w) => w.value === workloadValue);
    const selectedDuration = durations.find((d) => d.value === durationValue);
    const roleData = data?.find((item) => item.roles.name === selectedRole);

    const baseIntermediate = roleData?.intermediate_rate || 0;
    const percentage = selectedWorkload?.percentage || 0;
    const discount = selectedDuration?.discount || 0;

    const baseRate = Math.round((baseIntermediate * percentage) / 100);
    const finalRate = Math.round(baseRate * (1 + discount / 100));

    return {
      baseRate,
      discount,
      finalRate,
      selectedWorkload,
      selectedDuration,
    };
  };

  return {
    roles,
    workloads,
    durations,
    calculateDiscountedRate,
  };
}
