"use client";

import React, { useEffect, useState, useMemo } from "react";
import ModalComponent from "@components/admin/components/ui/ModalComponent";
import TablePage, {
  TablePageProps,
} from "@components/admin/components/layout/TablePage";
import { useGetUsersQuery } from "@/lib/admin/store/services/user.service";
import { User } from "@/lib/admin/store/services/user.service";

const UserPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: allUsers,
    isLoading,
    isError,
  } = useGetUsersQuery({ page, limit });

  // Table columns configuration
  const tableColumns = useMemo(
    () => [
      {
        label: "User ID",
        accessorKey: "id",
        cell: (row: User) => <span>{row.id}</span>,
      },
      {
        label: "Name",
        accessorKey: "firstName",
        cell: (row: User) => (
          <span>
            {row.firstName} {row.lastName}
          </span>
        ),
      },
      {
        label: "Email",
        accessorKey: "email",
        cell: (row: User) => <span>{row.email || "N/A"}</span>,
      },
      {
        label: "Phone",
        accessorKey: "phone",
        cell: (row: User) => <span>{row.phone || "N/A"}</span>,
      },
      {
        label: "Created At",
        accessorKey: "createdAt",
        cell: (row: User) => (
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
      pageCount: allUsers?.length ?? 1,
      setPagination: setPagination,
      data: allUsers ?? [],
    }),
    [allUsers, tableColumns, pageIndex, pageSize]
  );

  // Header options
  const HeaderOptions = useMemo(
    () => ({
      title: "Users",
      addTitle: "New User",
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
      {/* Modal for creating/editing a user */}
      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          titles={{ title: "Create User" }}
          fullWidth={true}
        >
          {/* Add your user form here */}
          <div>
            <h2>Create User</h2>
            {/* Form fields for name, email, phone, etc. */}
          </div>
        </ModalComponent>
      )}

      {/* Table for displaying users */}
      <TablePage TableOptions={TableOptions} HeaderOptions={HeaderOptions} />
    </>
  );
};

export default UserPage;
