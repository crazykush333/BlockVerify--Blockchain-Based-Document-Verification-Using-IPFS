import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Props {
  selector: string; // CSS selector of element to capture
}

export default function PdfExportButton({ selector }: Props) {
  const handleExport = async () => {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;

    pdf.addImage(imgData, 'PNG', (pageWidth - imgWidth) / 2, 20, imgWidth, imgHeight);
    pdf.save('fraud_report.pdf');
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
    >
      Export PDF
    </button>
  );
}