import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ISwatTeamPDF } from "@/common";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 30,
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    flex: 1,
    marginRight: 20,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "bold",
  },
  calculationSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
  },
  calculationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  calculationLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  calculationValue: {
    fontSize: 12,
    color: "#1f2937",
    fontWeight: "bold",
  },
  discountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  discountLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  discountValue: {
    fontSize: 12,
    color: "#dc2626",
    fontWeight: "bold",
  },
  rateSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: "1px solid #e5e7eb",
    alignItems: "flex-end",
  },
  rateLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 5,
  },
  rateValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    color: "#9ca3af",
  },
  companyInfo: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
  },
  companyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
  },
  companyText: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 5,
  },
});

interface SwatTeamPDFProps {
  data: ISwatTeamPDF;
}

export function SwatTeamPDF({ data }: SwatTeamPDFProps) {
  const {
    role,
    baseRate,
    discount,
    finalRate,
    selectedWorkload,
    selectedDuration,
  } = data;

  console.log("dewdew", role);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SWAT Team Calculator</Text>
          <Text style={styles.subtitle}>
            Pre-negotiated rates with duration-based discounts
          </Text>
        </View>

        {/* Parameters Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Parameters</Text>
          <View style={styles.grid}>
            <View style={styles.column}>
              <Text style={styles.label}>Role</Text>
              <Text style={styles.value}>{role}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Workload</Text>
              <Text style={styles.value}>{selectedWorkload?.label}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{selectedDuration?.label}</Text>
            </View>
          </View>
        </View>

        {/* Calculation Details */}
        <View style={styles.calculationSection}>
          <Text style={styles.sectionTitle}>Rate Calculation</Text>

          <View style={styles.calculationRow}>
            <Text style={styles.calculationLabel}>Base Rate (Full-time)</Text>
            <Text style={styles.calculationValue}>
              AED {selectedWorkload?.value?.toLocaleString() || 0}
            </Text>
          </View>

          <View style={styles.calculationRow}>
            <Text style={styles.calculationLabel}>
              Workload ({selectedWorkload?.percentage}%)
            </Text>
            <Text style={styles.calculationValue}>
              AED {baseRate.toLocaleString()}
            </Text>
          </View>

          {discount !== 0 && (
            <View style={styles.discountRow}>
              <Text style={styles.discountLabel}>
                Duration Discount ({selectedDuration?.discount}%)
              </Text>
              <Text style={styles.discountValue}>
                -AED{" "}
                {Math.round(
                  (baseRate * Math.abs(discount)) / 100
                ).toLocaleString()}
              </Text>
            </View>
          )}
        </View>

        {/* Final Rate */}
        <View style={styles.rateSection}>
          <Text style={styles.rateLabel}>Monthly Rate</Text>
          <Text style={styles.rateValue}>AED {finalRate.toLocaleString()}</Text>
        </View>

        {/* Company Information */}
        <View style={styles.companyInfo}>
          <Text style={styles.companyTitle}>Hub71</Text>
          <Text style={styles.companyText}>Abu Dhabi Global Market</Text>
          <Text style={styles.companyText}>
            Al Maryah Island, Abu Dhabi, UAE
          </Text>
          <Text style={styles.companyText}>Email: info@hub71.ae</Text>
          <Text style={styles.companyText}>Phone: +971 2 694 8000</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Rate Card for Hub71 - 2025 | Generated on{" "}
          {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
}
