import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ICustomResourcePDF } from "@/common";

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

interface CustomResourcePDFProps {
  data: ICustomResourcePDF;
}

export function CustomResourcePDF({ data }: CustomResourcePDFProps) {
  const { region, role, seniority, monthlyRate, selectedRate } = data;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Custom Resource Calculator</Text>
          <Text style={styles.subtitle}>
            Professional rate card for tailored resource pricing
          </Text>
        </View>

        {/* Parameters Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Parameters</Text>
          <View style={styles.grid}>
            <View style={styles.column}>
              <Text style={styles.label}>Region</Text>
              <Text style={styles.value}>{region}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Role</Text>
              <Text style={styles.value}>{role}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Seniority Level</Text>
              <Text style={styles.value}>{seniority}</Text>
            </View>
          </View>
        </View>

        {/* Rate Details */}
        {selectedRate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rate Breakdown</Text>
            <View style={styles.grid}>
              <View style={styles.column}>
                <Text style={styles.label}>Intermediate Rate</Text>
                <Text style={styles.value}>
                  AED {selectedRate.intermediate_rate?.toLocaleString()}
                </Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Advanced Rate</Text>
                <Text style={styles.value}>
                  AED {selectedRate.advanced_rate?.toLocaleString()}
                </Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Expert Rate</Text>
                <Text style={styles.value}>
                  AED {selectedRate.expert_rate?.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Final Rate */}
        <View style={styles.rateSection}>
          <Text style={styles.rateLabel}>Monthly Rate</Text>
          <Text style={styles.rateValue}>
            AED {monthlyRate ? monthlyRate.toLocaleString() : "0"}
          </Text>
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
