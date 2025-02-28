"use client";

import React, { useEffect, useState, useMemo } from "react";
import ModalComponent from "@components/admin/components/ui/ModalComponent";
import TablePage, {
  TablePageProps,
} from "@components/admin/components/layout/TablePage";
import { useGetOrdersQuery } from "@/lib/admin/store/services/order.service";
import { Order } from "@/lib/admin/store/services/order.service";

const OrderPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: allOrders,
    isLoading,
    isError,
  } = useGetOrdersQuery({ page, limit });

  // Table columns configuration
  const tableColumns = useMemo(
    () => [
      {
        label: "Order ID",
        accessorKey: "id",
        cell: (row: Order) => <span>{row.id}</span>,
      },
      {
        label: "Customer",
        accessorKey: "userId",
        cell: (row: Order) => (
          <span>
            {row.firstName} {row.lastName}
          </span>
        ),
      },
      {
        label: "Email",
        accessorKey: "email",
        cell: (row: Order) => <span>{row.email || "N/A"}</span>,
      },
      {
        label: "Total Price",
        accessorKey: "totalPrice",
        cell: (row: Order) => <span>${row.totalPrice.toFixed(2)}</span>,
      },
      {
        label: "Status",
        accessorKey: "status",
        cell: (row: Order) => <span>{row.status}</span>,
      },
      {
        label: "Created At",
        accessorKey: "createdAt",
        cell: (row: Order) => (
          <span>{new Date(row.createdAt).toLocaleDateString()}</span>
        ),
      },
    ],
    []
  );

  const TableOptions = useMemo(
    () => ({
      columns: tableColumns,
      pageIndex: pageIndex,
      pageSize: pageSize,
      pageCount: allOrders?.length ?? 1,
      setPagination: setPagination,
      data: allOrders ?? [],
    }),
    [allOrders, tableColumns, pageIndex, pageSize]
  );

  // Header options
  const HeaderOptions = useMemo(
    () => ({
      title: "Orders",
      addTitle: "New Order",
      onAdd: () => setModalOpen(true),
    }),
    []
  );

  // Update page and limit when pagination changes
  useEffect(() => {
    setPage(pageIndex + 1);
    setLimit(pageSize);
  }, [pageIndex, pageSize]);

  return (
    <>
      {/* Modal for creating/editing an order */}
      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          titles={{ title: "Create Order" }}
          fullWidth={true}
        >
          {/* Add your order form here */}
          <div>
            <h2>Create Order</h2>
            {/* Form fields for customer, items, total price, etc. */}
          </div>
        </ModalComponent>
      )}

      {/* Table for displaying orders */}
      <TablePage TableOptions={TableOptions} HeaderOptions={HeaderOptions} />
    </>
  );
};

export default OrderPage;
