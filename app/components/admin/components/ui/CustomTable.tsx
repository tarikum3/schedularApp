// "use client";
// import { TableSortLabel } from "@mui/material";
// import React, { useState, useEffect, useCallback } from "react";

// import { exportPDF } from "@/lib/admin/utils/exportPDF";
// import {
//   exportData,
//   sortData,
//   getNestedValue,
// } from "@/lib/admin/utils/exportData";

// import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
// import Print from "@mui/icons-material/Print";

// import DateRangeComponent, {
//   DateRangeValue,
// } from "@components/admin/components/ui/CustomDateRange";
// import { IconButton, Tooltip } from "@mui/material";

// import { startOfDay, endOfDay, subDays } from "date-fns";
// import { dateFormatDays } from "@/lib/admin/utils/dayjs";

// import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
// import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
// import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
// import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
// type Columns = {
//   label: string;
//   accessorKey: string;
//   cell?: (...args: any) => any;
// }[];
// export interface CustomTableProps {
//   data: any[];
//   onOptionChange?: (...args: any) => any;
//   onTableDateRangeChange?: (...args: any) => any;
//   options?: { label: string; value: string }[];
//   columns: Columns;
//   pageCount?: number;
//   pageIndex?: number;
//   pageSize?: number;
//   setPagination?: React.Dispatch<
//     React.SetStateAction<{ pageIndex: number; pageSize: number }>
//   >;
// }

// const CustomTable: React.FC<CustomTableProps> = ({
//   data,
//   onOptionChange,
//   pageIndex,
//   pageSize,
//   pageCount,
//   setPagination,
//   onTableDateRangeChange,
//   options,
//   columns,
// }) => {
//   const [selectedRange, setSelectedRange] = useState<string>("today");
//   const [tableCol, setTableCol] = useState<Columns | null>();
//   const [tableData, setTableData] = useState<any[]>([]);
//   const [order, setOrder] = useState<"asc" | "desc">("asc");
//   const [orderBy, setOrderBy] = useState<string>("");
//   const [dateRangeModal, setDateRangeModal] = useState(false);
//   const [dateRange, setDateRange] = useState<any>({});

//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [tableDropdownOptions, setTableDropdownOptions] = useState("");

//   const handlePageChange = (newPageIndex: number) => {
//     if (setPagination) {
//       setPagination((prev) => ({ ...prev, pageIndex: newPageIndex }));
//     }
//   };

//   const handlePageSizeChange = (newPageSize: number) => {
//     if (setPagination && newPageSize > 0) {
//       setPagination({ pageIndex: 0, pageSize: newPageSize });
//     }
//   };

//   const handleChangeRange = (range: string) => {
//     setSelectedRange(range);
//     // Implement logic to fetch data for selected range if needed
//     if (onOptionChange) {
//       onOptionChange(range);
//     }
//   };
//   const handleRequestSort = (property: string) => {
//     const isAsc = orderBy === property && order === "asc";

//     setOrder((prev) => {
//       return prev == "desc" ? "asc" : "desc";
//     });
//     setOrderBy(property);
//     let isAscB = isAsc ? false : true;
//     //sortData(property, isAscB);
//   };
//   const handleOnDateRangeToggle = useCallback((value?: boolean) => {
//     setDateRangeModal(value ?? false);
//   }, []);

//   const generatePDF = () => {
//     const headersCl = columns.map((item: any) => item.label);
//     const headers = columns.map((item: any) => item.accessorKey);
//     const filteredData = tableData.map((item: any) => {
//       return headers.reduce((acc, value, key) => {
//         const Value = getNestedValue(item, value);
//         // acc[key] = customer[value];
//         acc[key] = Value;
//         return acc;
//       }, {});
//     });

//     exportPDF({
//       title: "table data",
//       headers: [headersCl],
//       data: filteredData,
//       startDate: dateRange?.startDate ? new Date(dateRange?.startDate) : null,
//       endDate: dateRange?.endDate ? new Date(dateRange?.endDate) : null,
//     });
//   };

//   const handleExportPDF = () => {
//     generatePDF();
//   };

//   const handleExportExcel = () => {
//     // const data = formatData(tableCustomerData);
//     const headers = columns.map((item: any) => item.accessorKey);

//     const headersCl = columns.map((item: any) => item.label);
//     const filteredData = tableData.map((item: any) => {
//       return headers.reduce((acc, value, key) => {
//         const Value = getNestedValue(item, value);
//         // acc[key] = customer[value];
//         acc[headersCl[key]] = Value;
//         return acc;
//       }, {});
//     });

//     exportData(filteredData, headersCl, "table data");
//   };

//   const handleDateRangeChange = useCallback((value: DateRangeValue) => {
//     setDateRange(value);
//   }, []);
//   useEffect(() => {
//     if (data && data?.length >= 0) {
//       setTableData(() => {
//         if (orderBy) {
//           const sortedData = sortData(data, orderBy, order);
//           return sortedData;
//         }
//         return data;
//       });
//     }
//   }, [data, order, orderBy]);

//   useEffect(() => {
//     setTableCol(columns);
//   }, [columns]);

//   useEffect(() => {
//     const todayStart = startOfDay(new Date());
//     const todayEnd = endOfDay(new Date());
//     const last7DaysStart = startOfDay(subDays(todayStart, 7));

//     const last30DaysStart = startOfDay(subDays(todayStart, 30));
//     let startDate = dateFormatDays(todayStart, "YYYY-MM-DD");
//     let endDate = dateFormatDays(todayEnd, "YYYY-MM-DD");
//     if (tableDropdownOptions == "last7days") {
//       startDate = dateFormatDays(last7DaysStart, "YYYY-MM-DD");
//       endDate = dateFormatDays(todayEnd, "YYYY-MM-DD");
//     }
//     if (tableDropdownOptions == "lastMonth") {
//       startDate = dateFormatDays(last30DaysStart, "YYYY-MM-DD");
//       endDate = dateFormatDays(todayEnd, "YYYY-MM-DD");
//     }
//     setFromDate(startDate);
//     setToDate(endDate);
//   }, [tableDropdownOptions]);
//   useEffect(() => {
//     if (dateRange?.startDate && dateRange?.endDate) {
//       setToDate(dateRange?.endDate);
//       setFromDate(dateRange?.startDate);
//     } else {
//       setToDate("");
//       setFromDate("");
//     }
//   }, [dateRange]);
//   useEffect(() => {
//     if (onTableDateRangeChange) {
//       onTableDateRangeChange({ startDate: fromDate, endDate: toDate });
//     }
//   }, [toDate, fromDate]);

//   return (
//     <div className="container mx-auto p-4 w-full ">
//       {/* Header Section */}
//       <div className="flex flex-wrap justify-between gap-2 py-2">
//         <div className="flex flex-wrap items-center gap-2">
//           {onTableDateRangeChange && (
//             <DateRangeComponent
//               open={dateRangeModal}
//               onChange={handleDateRangeChange}
//               toggle={handleOnDateRangeToggle}
//             />
//           )}
//         </div>
//         <div className="flex items-center gap-2">
//           <Tooltip title="Export">
//             <IconButton
//               onClick={handleExportExcel}
//               className="bg-primary-300 hover:bg-primary-400 text-primary-800"
//             >
//               <GetAppOutlinedIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Print">
//             <IconButton
//               onClick={handleExportPDF}
//               className="bg-primary-300 hover:bg-primary-400 text-primary-800"
//             >
//               <Print />
//             </IconButton>
//           </Tooltip>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto bg-primary-0 shadow-md rounded-md border border-primary-200 dark:bg-primary-100">
//         <table className="min-w-full table-auto">
//           {/* Table Head */}
//           <thead className="bg-primary-300  text-primary-800">
//             <tr>
//               {tableCol?.map((col) => (
//                 <th
//                   key={col.accessorKey}
//                   className="px-4 py-2 text-left border-b border-primary-200"
//                 >
//                   <TableSortLabel
//                     active={orderBy === col.accessorKey}
//                     direction={orderBy === col.accessorKey ? order : "asc"}
//                     onClick={() => handleRequestSort(col.accessorKey)}
//                   >
//                     {col.label}
//                   </TableSortLabel>
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {tableData?.map((row, index) => (
//               <tr
//                 key={index}
//                 className="text-primary-500 hover:bg-primary-200 "
//               >
//                 {tableCol?.map((col) => (
//                   <td
//                     key={col.accessorKey}
//                     className="px-4 py-2 border-b border-primary-200"
//                   >
//                     {/* Mobile view label */}
//                     <span className="block sm:hidden font-semibold">
//                       {col.label}:
//                     </span>
//                     {col.cell
//                       ? col.cell(row)
//                       : getNestedValue(row, col.accessorKey) || ""}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Section */}
//       {tableData?.length > 0 && pageCount && (pageIndex || pageIndex === 0) && (
//         <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
//           <IconButton
//             onClick={() => handlePageChange(0)}
//             disabled={pageIndex === 0}
//             className="border border-primary-300 rounded p-1 hover:bg-primary-400"
//           >
//             <KeyboardDoubleArrowLeftOutlinedIcon />
//           </IconButton>
//           <IconButton
//             onClick={() => handlePageChange(pageIndex - 1)}
//             disabled={pageIndex === 0}
//             className="border border-primary-300 rounded p-1 hover:bg-primary-400"
//           >
//             <NavigateBeforeOutlinedIcon />
//           </IconButton>
//           <IconButton
//             onClick={() => handlePageChange(pageIndex + 1)}
//             disabled={pageIndex >= pageCount - 1}
//             className="border border-primary-300 rounded p-1 hover:bg-primary-400"
//           >
//             <KeyboardArrowRightOutlinedIcon />
//           </IconButton>
//           <IconButton
//             onClick={() => handlePageChange(pageCount - 1)}
//             disabled={pageIndex >= pageCount - 1}
//             className="border border-primary-300 rounded p-1 hover:bg-primary-400"
//           >
//             <KeyboardDoubleArrowRightOutlinedIcon />
//           </IconButton>
//           <span className="flex items-center gap-1">
//             <span>Page</span>
//             <strong>
//               {pageIndex + 1} of {pageCount}
//             </strong>
//           </span>
//           <span className="flex items-center gap-1">
//             <span>Set page size:</span>
//             <input
//               type="number"
//               defaultValue={pageSize}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="border border-primary-300 rounded p-1 w-16 bg-white"
//             />
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomTable;

"use client";
import { TableSortLabel } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";

import { exportPDF } from "@/lib/admin/utils/exportPDF";
import {
  exportData,
  sortData,
  getNestedValue,
} from "@/lib/admin/utils/exportData";

import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import Print from "@mui/icons-material/Print";

import DateRangeComponent, {
  DateRangeValue,
} from "@components/admin/components/ui/CustomDateRange";
import { IconButton, Tooltip } from "@mui/material";

import { startOfDay, endOfDay, subDays } from "date-fns";
import { dateFormatDays } from "@/lib/admin/utils/dayjs";

import Pagination from "./Pagination"; // Import the Pagination component

type Columns = {
  label: string;
  accessorKey: string;
  cell?: (...args: any) => any;
}[];
export interface CustomTableProps {
  data: any[];
  onOptionChange?: (...args: any) => any;
  onTableDateRangeChange?: (...args: any) => any;
  options?: { label: string; value: string }[];
  columns: Columns;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  setPagination?: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  onOptionChange,
  pageIndex,
  pageSize,
  pageCount,
  setPagination,
  onTableDateRangeChange,
  options,
  columns,
}) => {
  const [selectedRange, setSelectedRange] = useState<string>("today");
  const [tableCol, setTableCol] = useState<Columns | null>();
  const [tableData, setTableData] = useState<any[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [dateRangeModal, setDateRangeModal] = useState(false);
  const [dateRange, setDateRange] = useState<any>({});

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tableDropdownOptions, setTableDropdownOptions] = useState("");

  const handlePageChange = (newPageIndex: number) => {
    if (setPagination) {
      setPagination((prev) => ({ ...prev, pageIndex: newPageIndex }));
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (setPagination && newPageSize > 0) {
      setPagination({ pageIndex: 0, pageSize: newPageSize });
    }
  };

  const handleChangeRange = (range: string) => {
    setSelectedRange(range);
    // Implement logic to fetch data for selected range if needed
    if (onOptionChange) {
      onOptionChange(range);
    }
  };
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";

    setOrder((prev) => {
      return prev == "desc" ? "asc" : "desc";
    });
    setOrderBy(property);
    let isAscB = isAsc ? false : true;
    //sortData(property, isAscB);
  };
  const handleOnDateRangeToggle = useCallback((value?: boolean) => {
    setDateRangeModal(value ?? false);
  }, []);

  const generatePDF = () => {
    const headersCl = columns.map((item: any) => item.label);
    const headers = columns.map((item: any) => item.accessorKey);
    const filteredData = tableData.map((item: any) => {
      return headers.reduce((acc, value, key) => {
        const Value = getNestedValue(item, value);
        // acc[key] = customer[value];
        acc[key] = Value;
        return acc;
      }, {});
    });

    exportPDF({
      title: "table data",
      headers: [headersCl],
      data: filteredData,
      startDate: dateRange?.startDate ? new Date(dateRange?.startDate) : null,
      endDate: dateRange?.endDate ? new Date(dateRange?.endDate) : null,
    });
  };

  const handleExportPDF = () => {
    generatePDF();
  };

  const handleExportExcel = () => {
    // const data = formatData(tableCustomerData);
    const headers = columns.map((item: any) => item.accessorKey);

    const headersCl = columns.map((item: any) => item.label);
    const filteredData = tableData.map((item: any) => {
      return headers.reduce((acc, value, key) => {
        const Value = getNestedValue(item, value);
        // acc[key] = customer[value];
        acc[headersCl[key]] = Value;
        return acc;
      }, {});
    });

    exportData(filteredData, headersCl, "table data");
  };

  const handleDateRangeChange = useCallback((value: DateRangeValue) => {
    setDateRange(value);
  }, []);
  useEffect(() => {
    if (data && data?.length >= 0) {
      setTableData(() => {
        if (orderBy) {
          const sortedData = sortData(data, orderBy, order);
          return sortedData;
        }
        return data;
      });
    }
  }, [data, order, orderBy]);

  useEffect(() => {
    setTableCol(columns);
  }, [columns]);

  useEffect(() => {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
    const last7DaysStart = startOfDay(subDays(todayStart, 7));

    const last30DaysStart = startOfDay(subDays(todayStart, 30));
    let startDate = dateFormatDays(todayStart, "YYYY-MM-DD");
    let endDate = dateFormatDays(todayEnd, "YYYY-MM-DD");
    if (tableDropdownOptions == "last7days") {
      startDate = dateFormatDays(last7DaysStart, "YYYY-MM-DD");
      endDate = dateFormatDays(todayEnd, "YYYY-MM-DD");
    }
    if (tableDropdownOptions == "lastMonth") {
      startDate = dateFormatDays(last30DaysStart, "YYYY-MM-DD");
      endDate = dateFormatDays(todayEnd, "YYYY-MM-DD");
    }
    setFromDate(startDate);
    setToDate(endDate);
  }, [tableDropdownOptions]);
  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      setToDate(dateRange?.endDate);
      setFromDate(dateRange?.startDate);
    } else {
      setToDate("");
      setFromDate("");
    }
  }, [dateRange]);
  useEffect(() => {
    if (onTableDateRangeChange) {
      onTableDateRangeChange({ startDate: fromDate, endDate: toDate });
    }
  }, [toDate, fromDate]);

  return (
    <div className="container mx-auto p-4 w-full ">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between gap-2 py-2">
        <div className="flex flex-wrap items-center gap-2">
          {onTableDateRangeChange && (
            <DateRangeComponent
              open={dateRangeModal}
              onChange={handleDateRangeChange}
              toggle={handleOnDateRangeToggle}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <Tooltip title="Export">
            <IconButton
              onClick={handleExportExcel}
              className="bg-primary-300 hover:bg-primary-400 text-primary-800"
            >
              <GetAppOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton
              onClick={handleExportPDF}
              className="bg-primary-300 hover:bg-primary-400 text-primary-800"
            >
              <Print />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-primary-0 shadow-md rounded-md border border-primary-200 dark:bg-primary-100">
        <table className="min-w-full table-auto">
          {/* Table Head */}
          <thead className="bg-primary-300  text-primary-800">
            <tr>
              {tableCol?.map((col) => (
                <th
                  key={col.accessorKey}
                  className="px-4 py-2 text-left border-b border-primary-200"
                >
                  <TableSortLabel
                    active={orderBy === col.accessorKey}
                    direction={orderBy === col.accessorKey ? order : "asc"}
                    onClick={() => handleRequestSort(col.accessorKey)}
                  >
                    {col.label}
                  </TableSortLabel>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tableData?.map((row, index) => (
              <tr
                key={index}
                className="text-primary-500 hover:bg-primary-200 "
              >
                {tableCol?.map((col) => (
                  <td
                    key={col.accessorKey}
                    className="px-4 py-2 border-b border-primary-200"
                  >
                    {/* Mobile view label */}
                    <span className="block sm:hidden font-semibold">
                      {col.label}:
                    </span>
                    {col.cell
                      ? col.cell(row)
                      : getNestedValue(row, col.accessorKey) || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {tableData?.length > 0 && pageCount && (pageIndex || pageIndex === 0) && (
        <Pagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize || 10}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};

export default CustomTable;
