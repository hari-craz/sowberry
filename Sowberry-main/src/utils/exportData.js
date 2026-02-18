import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Export table data as a styled PDF.
 * @param {{ title: string, columns: string[], rows: (string|number)[][], fileName?: string }} opts
 */
export const exportToPDF = ({ title, columns, rows, fileName }) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header bar
  doc.setFillColor(201, 100, 66); // #c96442 primary
  doc.rect(0, 0, pageWidth, 28, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('Sowberry', 14, 12);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(title, 14, 22);

  // Metadata
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - 14, 36, { align: 'right' });
  doc.text(`Total Records: ${rows.length}`, pageWidth - 14, 42, { align: 'right' });

  // Table
  autoTable(doc, {
    startY: 48,
    head: [columns],
    body: rows,
    theme: 'grid',
    headStyles: {
      fillColor: [201, 100, 66],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [60, 60, 60],
      cellPadding: 4,
    },
    alternateRowStyles: {
      fillColor: [252, 248, 244], // cream tint
    },
    styles: {
      lineColor: [220, 220, 220],
      lineWidth: 0.3,
      overflow: 'linebreak',
    },
    margin: { left: 14, right: 14 },
    didDrawPage: (data) => {
      // Footer on every page
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(7);
      doc.setTextColor(180, 180, 180);
      doc.text(`Page ${data.pageNumber} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    },
  });

  doc.save(`${fileName || title.replace(/\s+/g, '_')}.pdf`);
};

/**
 * Export table data as an Excel (.xlsx) file.
 * @param {{ title: string, columns: string[], rows: (string|number)[][], fileName?: string, sheetName?: string }} opts
 */
export const exportToExcel = ({ title, columns, rows, fileName, sheetName }) => {
  const worksheetData = [columns, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Auto-size columns
  const colWidths = columns.map((col, i) => {
    const maxLen = Math.max(
      col.length,
      ...rows.map(r => String(r[i] ?? '').length)
    );
    return { wch: Math.min(maxLen + 4, 50) };
  });
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || 'Data');

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${fileName || title.replace(/\s+/g, '_')}.xlsx`);
};
