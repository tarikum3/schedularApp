"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  useCallback,
} from "react";

import ModalComponent from "@components/admin/components/ui/ModalComponent";
import TablePage, {
  TablePageProps,
} from "@components/admin/components/layout/TablePage";
import { useGetProductsQuery } from "@lib/admin/store/services/product";
import {useTranslations} from 'next-intl';
const ProductPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: allProducts } = useGetProductsQuery({ page, limit });
  console.log("allProductssss", allProducts);
  const tableColumns = useMemo(
    () => [
      {
        label: "Name",
        accessorKey: "name",
        cell: (row: any) => <span >{row.name}</span>,
      },
    ],
    []
  );

  const TableOptions = useMemo(
    () => ({
      columns: tableColumns,
      pageIndex: pageIndex,
      pageSize: pageSize,
      pageCount: (allProducts as any)?.totalPages ?? 1,
      setPagination: setPagination,
      data: (allProducts as any)?.data?.products ?? [],
    }),
    [allProducts]
  );
  const HeaderOptions = useMemo(
    () => ({
      title: "Products",
      addTilte: "new product",
      onAdd: () => ({}),
    }),
    [tableColumns]
  );

  useEffect(() => {
    setPage(pageIndex + 1);
    setLimit(pageSize);
  }, [pageIndex, pageSize]);

 
  // const t = useTranslations('HomePage');
  return (
    <>
      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          titles={{ title: "Create Product" }}
          fullWidth={true}
        >
          <></>
        </ModalComponent>
      )}
      
 
{/* <h1 className={`mb-4 text-xl md:text-2xl`}>{t('title')}</h1> */}
      <TablePage
        TableOptions={TableOptions}
        HeaderOptions={HeaderOptions}
      ></TablePage>
    </>
  );
};

export default ProductPage;
