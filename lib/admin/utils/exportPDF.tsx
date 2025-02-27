//@ts-nocheck
"use client";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { dateFormat, dateFormatDays } from "./dayjs";
import { Logo } from "@/app/components";

export const exportPDF = ({
  title,
  headers,
  data,
  startDate,
  endDate,
}: any) => {
  const unit = "pt";
  const size = "A7"; // Use A1, A2, A3 or A4
  const orientation = "landscape"; // portrait or landscape

  const doc = new jsPDF("l", "mm", "a4");

  doc.setFontSize(10);

  // Set the color for the date range text
  doc.setTextColor(17, 24, 39); // RGB color values for text

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const drawBackgroundImage = (pageNumber: number) => {
    doc.setPage(pageNumber);
    // doc.addImage(Logo, "PNG", 30, 10, 150, 30); // Adjust the position and size as needed
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  const dateRange = `from: ${formattedStartDate} to ${formattedEndDate}`;
  doc.text(startDate ? dateRange : "", 10, 50);
  //doc.addImage(Logo, "PNG", 30, 10, 150, 30);
  const columnStyles: { [key: number]: any } = {};
  headers.forEach((header: string, index: number) => {
    columnStyles[index] = {
      cellWidth: "auto",
      minCellWidth: 20,
      maxCellWidth: 50,
    };
  });
  // const columnStyles = {
  //   0: { cellWidth: "auto", minCellWidth: 20, maxCellWidth: 40 },
  //   1: { cellWidth: "auto", minCellWidth: 20, maxCellWidth: 40 },

  // };
  let content = {
    startY: 80,
    head: headers,
    body: data,
    theme: "grid",
    margin: { top: 50, bottom: 30 },
    tableLineColor: [229, 231, 235],
    tableLineWidth: 0.1,
    styles: {
      lineColor: [229, 231, 235],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [209, 213, 219],
      fontSize: 10,
      halign: "center",
      textColor: [31, 41, 55],
    },
    footStyles: {
      fillColor: [255, 255, 255],
      fontSize: 15,
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
      textColor: [44, 46, 46],
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255],
    },
    // columnStyles: {
    //   email: {
    //     fontStyle: "bold",
    //   },
    //   id: {
    //     halign: "right",

    //   },
    // },

    columnStyles: columnStyles,
    didDrawPage: (data) => {
      // Add the logo on each page
      //  doc.addImage(Logo, "PNG", 30, 10, 150, 30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7); // Adjust the font size as needed

      // Add the "Powered By:" text
      doc.text("Powered By: TM", 210, 200);
    },
  };

  // doc.setFontSize(10);
  //doc.text('Powered By : ', 40, 350);

  doc.setTextColor(17, 24, 39);
  // doc.addImage('/assets/nedaj-logo.png', 'PNG', 30, 10, 150, 30);
  // styles: { overflow: 'linebreak' },
  doc.autoTable({
    startY: 60,
    head: [
      [
        {
          content: title,
          colSpan: 5,
          styles: {
            halign: "center",
            fillColor: [255, 255, 255],
            textColor: [44, 46, 46],
            fontSize: 20,
            // overflow: "linebreak",
          },
        },
      ],
    ],
    theme: "grid",
  });

  doc.autoTable(content);

  // Open the generated PDF in a new window
  const string = doc.output("bloburl");
  const x = window.open();
  if (x) {
    x.document.open();
    x.document.write(
      `<iframe src="${string}" frameborder="0" width="100%" height="100%"></iframe>`
    );
    x.document.close();
  }
};
