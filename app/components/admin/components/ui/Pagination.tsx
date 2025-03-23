"use client";
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

interface PaginationProps {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  onPageChange: (newPageIndex: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  pageCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
      <Tooltip title="First Page">
        <IconButton
          onClick={() => onPageChange(0)}
          disabled={pageIndex === 0}
          className="border border-primary-300 rounded p-1 hover:bg-primary-400"
        >
          <KeyboardDoubleArrowLeftOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Previous Page">
        <IconButton
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="border border-primary-300 rounded p-1 hover:bg-primary-400"
        >
          <NavigateBeforeOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Next Page">
        <IconButton
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={pageIndex >= pageCount - 1}
          className="border border-primary-300 rounded p-1 hover:bg-primary-400"
        >
          <KeyboardArrowRightOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Last Page">
        <IconButton
          onClick={() => onPageChange(pageCount - 1)}
          disabled={pageIndex >= pageCount - 1}
          className="border border-primary-300 rounded p-1 hover:bg-primary-400"
        >
          <KeyboardDoubleArrowRightOutlinedIcon />
        </IconButton>
      </Tooltip>
      <span className="flex items-center gap-1">
        <span>Page</span>
        <strong>
          {pageIndex + 1} of {pageCount}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        <span>Set page size:</span>
        <input
          type="number"
          defaultValue={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-primary-300 rounded p-1 w-16 bg-white"
        />
      </span>
    </div>
  );
};

export default Pagination;
