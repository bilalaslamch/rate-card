import { ICustomResourcePDF, ISwatTeamPDF } from "@/common";

export function renderCustomResourceEmail(data: ICustomResourcePDF): string {
  return `
    <div style="font-family: Inter, Arial, sans-serif; background: #f9fafb; padding: 32px; color: #1f2937;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #e5e7eb; padding: 32px;">
        <h1 style="font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 8px;">Custom Resource Calculator</h1>
        <p style="color: #6b7280; margin-bottom: 24px;">Professional rate card for tailored resource pricing</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 24px;" />
        <h2 style="font-size: 18px; font-weight: bold; color: #374151; margin-bottom: 12px;">Selected Parameters</h2>
        <table style="width: 100%; margin-bottom: 24px;">
          <tr>
            <td style="color: #6b7280;">Region</td>
            <td style="font-weight: bold;">${data.region}</td>
            <td style="color: #6b7280;">Role</td>
            <td style="font-weight: bold;">${data.role}</td>
            <td style="color: #6b7280;">Seniority</td>
            <td style="font-weight: bold;">${data.seniority}</td>
          </tr>
        </table>
        <h2 style="font-size: 18px; font-weight: bold; color: #374151; margin-bottom: 12px;">Rate Breakdown</h2>
        <table style="width: 100%; margin-bottom: 24px;">
          <tr>
            <td style="color: #6b7280;">Intermediate Rate</td>
            <td style="font-weight: bold;">AED ${
              data.selectedRate?.intermediate_rate?.toLocaleString() || "-"
            }</td>
            <td style="color: #6b7280;">Advanced Rate</td>
            <td style="font-weight: bold;">AED ${
              data.selectedRate?.advanced_rate?.toLocaleString() || "-"
            }</td>
            <td style="color: #6b7280;">Expert Rate</td>
            <td style="font-weight: bold;">AED ${
              data.selectedRate?.expert_rate?.toLocaleString() || "-"
            }</td>
          </tr>
        </table>
        <div style="margin-top: 32px; text-align: right;">
          <div style="color: #6b7280; font-size: 14px;">Monthly Rate:</div>
          <div style="font-size: 32px; font-weight: bold; color: #2563eb;">AED ${
            data.monthlyRate?.toLocaleString() || "-"
          }</div>
        </div>
        <div style="margin-top: 40px; background: #f3f4f6; border-radius: 8px; padding: 16px;">
          <div style="font-size: 16px; font-weight: bold; color: #1f2937;">Hub71</div>
          <div style="color: #6b7280; font-size: 13px;">Abu Dhabi Global Market, Al Maryah Island, Abu Dhabi, UAE</div>
          <div style="color: #6b7280; font-size: 13px;">Email: info@hub71.ae | Phone: +971 2 694 8000</div>
        </div>
        <div style="margin-top: 24px; text-align: center; color: #9ca3af; font-size: 12px;">
          Rate Card for Hub71 - 2025 | Generated on ${new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  `;
}

export function renderSwatTeamEmail(data: ISwatTeamPDF): string {
  return `
    <div style="font-family: Inter, Arial, sans-serif; background: #f9fafb; padding: 32px; color: #1f2937;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #e5e7eb; padding: 32px;">
        <h1 style="font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 8px;">SWAT Team Calculator</h1>
        <p style="color: #6b7280; margin-bottom: 24px;">Pre-negotiated rates with duration-based discounts</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 24px;" />
        <h2 style="font-size: 18px; font-weight: bold; color: #374151; margin-bottom: 12px;">Selected Parameters</h2>
        <table style="width: 100%; margin-bottom: 24px;">
          <tr>
            <td style="color: #6b7280;">Role</td>
            <td style="font-weight: bold;">${data.role}</td>
            <td style="color: #6b7280;">Workload</td>
            <td style="font-weight: bold;">${data.selectedWorkload?.label}</td>
            <td style="color: #6b7280;">Duration</td>
            <td style="font-weight: bold;">${data.selectedDuration?.label}</td>
          </tr>
        </table>
        <h2 style="font-size: 18px; font-weight: bold; color: #374151; margin-bottom: 12px;">Rate Calculation</h2>
        <table style="width: 100%; margin-bottom: 24px;">
          <tr>
            <td style="color: #6b7280;">Base Rate (Full-time)</td>
            <td style="font-weight: bold;">AED ${
              data.selectedWorkload?.value?.toLocaleString() || 0
            }</td>
            <td style="color: #6b7280;">Workload (${
              data.selectedWorkload?.percentage
            }%)</td>
            <td style="font-weight: bold;">AED ${
              data.baseRate?.toLocaleString() || 0
            }</td>
            <td style="color: #6b7280;">Duration Discount</td>
            <td style="font-weight: bold; color: #dc2626;">${
              data.discount ? `${data.discount}%` : "0%"
            }</td>
          </tr>
        </table>
        <div style="margin-top: 32px; text-align: right;">
          <div style="color: #6b7280; font-size: 14px;">Monthly Rate:</div>
          <div style="font-size: 32px; font-weight: bold; color: #2563eb;">AED ${
            data.finalRate?.toLocaleString() || 0
          }</div>
        </div>
        <div style="margin-top: 40px; background: #f3f4f6; border-radius: 8px; padding: 16px;">
          <div style="font-size: 16px; font-weight: bold; color: #1f2937;">Hub71</div>
          <div style="color: #6b7280; font-size: 13px;">Abu Dhabi Global Market, Al Maryah Island, Abu Dhabi, UAE</div>
          <div style="color: #6b7280; font-size: 13px;">Email: info@hub71.ae | Phone: +971 2 694 8000</div>
        </div>
        <div style="margin-top: 24px; text-align: center; color: #9ca3af; font-size: 12px;">
          Rate Card for Hub71 - 2025 | Generated on ${new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  `;
}
