"use client";
import { TableSortLabel } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";

import { exportPDFNew } from "@/lib/admin/utils/exportPDF";
import {
  exportDataNew,
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

import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
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

  const tableOptions = [
    { label: "Today", value: "today" },
    { label: "Last 7 Days", value: "last7days" },
    { label: "Last 30 Days", value: "lastMonth" },
  ];

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

    exportPDFNew({
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

    exportDataNew(filteredData, headersCl, "table data");
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
    <div className="container mx-auto p-4 w-full  text-primary   ">
      <div className="flex w-full   justify-between gap-2 py-2 ">
        <div className="flex w-full flex-wrap  justify-start gap-2  ">
          <span className="flex">
            {onTableDateRangeChange && (
              <DateRangeComponent
                open={dateRangeModal}
                onChange={handleDateRangeChange}
                toggle={handleOnDateRangeToggle}
              />
            )}
          </span>
        </div>
        <div className="flex  flex-none gap-2  ">
          <Tooltip title="export ">
            <span className="flex items-center justify-center pr-1 ">
              <IconButton
                //  onClick={handleTemplateDownload}

                onClick={handleExportExcel}
              >
                <GetAppOutlinedIcon />
              </IconButton>{" "}
            </span>
          </Tooltip>
          <Tooltip title="print ">
            <span className="flex items-center justify-center pr-1 ">
              <IconButton
                //  onClick={handleTemplateDownload}
                onClick={handleExportPDF}
              >
                <Print />
              </IconButton>{" "}
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="overflow-x-auto min-h-40 max-h-60 overflow-y-auto ">
        <table className="min-w-full bg-white border border-gray-200">
          {/* Table Head for larger screens */}
          <thead className="hidden sm:table-header-group">
            <tr className="bg-gray-100">
              {tableCol?.map((col) => (
                <th
                  key={col.accessorKey}
                  className="border-b border-gray-200 px-4 py-2 lg:px-6"
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
                className="block sm:table-row border-b sm:border-none"
              >
                {tableCol?.map((col) => (
                  <td
                    key={col.accessorKey}
                    className="block sm:table-cell border-b border-gray-200 sm:border-none px-4 py-2 lg:px-6"
                  >
                    {/* Show label for stacked layout on small screens */}
                    <span className="block sm:hidden font-bold">
                      {col.label}:
                    </span>

                    {col.cell
                      ? col.cell(row)
                      : getNestedValue(row, col.accessorKey) !== undefined &&
                        getNestedValue(row, col.accessorKey) !== null
                      ? getNestedValue(row, col.accessorKey).toString()
                      : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tableData?.length > 0 && pageCount && (pageIndex || pageIndex === 0) && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-4 p-1">
          <IconButton
            size="large"
            className="border rounded p-1"
            onClick={() => handlePageChange(0)}
            disabled={pageIndex === 0}
          >
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </IconButton>
          <IconButton
            className="border rounded p-1"
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <NavigateBeforeOutlinedIcon />
          </IconButton>
          <IconButton
            className="border rounded p-1"
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={pageIndex >= pageCount - 1}
          >
            <KeyboardArrowRightOutlinedIcon />
          </IconButton>
          <IconButton
            className="border rounded p-1"
            onClick={() => handlePageChange(pageCount - 1)}
            disabled={pageIndex >= pageCount - 1}
          >
            <KeyboardDoubleArrowRightOutlinedIcon />
          </IconButton>

          <span className="flex items-center gap-1">
            <div className="text-[#2C2E7B]">Page</div>
            <strong className="text-[#2C2E7B] whitespace-nowrap">
              {pageIndex + 1} of {pageCount}
            </strong>
          </span>

          <span className="flex text-[#2C2E7B] items-center gap-1">
            Set page size:
          </span>
          <input
            type="number"
            // value={pageSize}
            defaultValue={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="border p-1 text-[#2C2E7B] rounded w-16 bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default CustomTable;
