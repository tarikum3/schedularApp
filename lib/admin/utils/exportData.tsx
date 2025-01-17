import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

// Export data function
export const exportData = (data: any[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blobData = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  FileSaver.saveAs(blobData, `${fileName}.xlsx`);
};



export const exportDataNew = (
  data: any[],
  headers: string[],
  fileName: string
) => {
  if (data.length === 0) return;

  // Map data to match the custom headers order
  const dataWithHeaders = [
    headers,
    ...data.map((item) => headers.map((header) => item[header])),
  ];

  // Create worksheet from the data with headers
  const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);

  // Style the headers
  headers.forEach((header, index) => {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
    if (!worksheet[cellAddress]) worksheet[cellAddress] = { t: "s", v: header };
    worksheet[cellAddress].s = { font: { bold: true } };
  });

  // Create workbook and append the worksheet
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };

  // Write workbook to binary array
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Create blob object from the binary array
  const blobData = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  // Save the blob as an Excel file
  FileSaver.saveAs(blobData, `${fileName}.xlsx`);
};


export const getNestedValue = (obj: any, key: string) => {
  return key.split('.').reduce((acc, part) => acc?.[part], obj);
};
export const sortData = (
  data: any[],
  key: string,
  order: 'asc' | 'desc' = 'asc'
) => {
  // Utility function to get the nested value
  const getNestedValue = (obj: any, key: string) => {
    return key.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = getNestedValue(a, key);
    const bValue = getNestedValue(b, key);

    const isANullish = aValue === null || aValue === undefined || aValue === "";
    const isBNullish = bValue === null || bValue === undefined || bValue === "";

    // Push nullish values to the end of the list
    if (isANullish && !isBNullish) return 1;
    if (!isANullish && isBNullish) return -1;
    if (isANullish && isBNullish) return 0;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const aLower = aValue.toLowerCase();
      const bLower = bValue.toLowerCase();

      if (aLower < bLower) return order === 'asc' ? -1 : 1;
      if (aLower > bLower) return order === 'asc' ? 1 : -1;
      return 0;
    } else {
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    }
  });

  return sortedData;
};
export const formatDurationFromHours=(totalHours: number | string | null | undefined)=> {
  // Return null for null or undefined input
  if (totalHours === null || totalHours === undefined) {
      return null;
  }

  // Convert the input to a number
  const hoursNumber = typeof totalHours === 'string' ? parseFloat(totalHours) : totalHours;

  // Check for NaN after conversion
  if (isNaN(hoursNumber)) {
      return null;
  }

  const days = Math.floor(hoursNumber / 24);
  const hours = Math.floor(hoursNumber % 24);
  const minutes = Math.round((hoursNumber - Math.floor(hoursNumber)) * 60);

  let result = '';
  if (days > 0) {
      result += `${days} day${days > 1 ? 's' : ''} `;
  }
  if (hours > 0) {
      result += `${hours} h `;
  }
  result += `${minutes} minute${minutes !== 1 ? 's' : ''}`;

  return result.trim();
}