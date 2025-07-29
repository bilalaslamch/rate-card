import { ICustomResourcePDF, ISwatTeamPDF } from "@/common";

export function generateFileName(
  type: "custom" | "swat",
  data: ISwatTeamPDF | ICustomResourcePDF
): string {
  const timestamp = new Date().toISOString().split("T")[0];

  if (type === "custom") {
    const customData = data as ICustomResourcePDF;

    const region =
      customData.region?.replace(/[^a-zA-Z0-9]/g, "_") || "unknown";
    const role = customData.role?.replace(/[^a-zA-Z0-9]/g, "_") || "unknown";
    const seniority =
      customData.seniority?.replace(/[^a-zA-Z0-9]/g, "_") || "unknown";

    return `Hub71_Custom_Resource_${region}_${role}_${seniority}_${timestamp}.pdf`;
  } else {
    const swatData = data as ISwatTeamPDF;

    const role = swatData.role?.replace(/[^a-zA-Z0-9]/g, "_") || "unknown";
    const workload =
      swatData.workload?.replace(/[^a-zA-Z0-9]/g, "_") || "unknown";
    const duration =
      swatData.duration?.replace(/[^a-zA-Z0-9]/g, "_") || "unknown";

    return `Hub71_SWAT_Team_${role}_${workload}_${duration}_${timestamp}.pdf`;
  }
}
