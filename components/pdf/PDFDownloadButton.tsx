import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { generateFileName } from "@/utils/pdfUtils";
import { ICustomResourcePDF, ISwatTeamPDF } from "@/common";

interface PDFDownloadButtonProps<T extends ISwatTeamPDF | ICustomResourcePDF> {
  PDFComponent: React.ComponentType<{ data: T }>;
  data: T;
  type: "custom" | "swat";
  className?: string;
}

export function PDFDownloadButton<T extends ISwatTeamPDF | ICustomResourcePDF>({
  PDFComponent,
  data,
  type,
  className = "",
}: PDFDownloadButtonProps<T>) {
  const fileName = generateFileName(type, data); // cast needed unless you improve `generateFileName`'s type logic
  console.log("file name is ", fileName);
  return (
    <PDFDownloadLink
      document={<PDFComponent data={data} />}
      fileName={fileName}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`}
    >
      {({ loading }) => (
        <>
          <Download className="h-4 w-4" />
          {loading ? "Generating PDF..." : "Download PDF"}
        </>
      )}
    </PDFDownloadLink>
  );
}
