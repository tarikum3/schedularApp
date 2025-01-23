'use client';

import React, { useEffect, useState ,useMemo,createContext,useCallback} from "react";
import { CircularProgress } from '@mui/material';
import CustomTable,{CustomTableProps} from '@components/admin/components/ui/CustomTable';
import PageHeader,{PageHeaderProps} from '@components/admin/components/layout/PageHeader';
import ModalComponent from "@components/admin/components/ui/ModalComponent";
import TablePage,{TablePageProps} from '@components/admin/components/layout/TablePage';
const ProductPage = () => {
 
    const [modalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
   
    const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
    });

    const tableColumns= useMemo(
        () =>[{label:"Name",accessorKey:"name"},],[]);

        const tableProps= useMemo(
            () =>({columns:tableColumns,            
                pageIndex:pageIndex,
                pageSize:pageSize,
                 pageCount:1, 
                 setPagination:setPagination,
                data:[]
                }),[tableColumns]);  



  return (
 <>
           {modalOpen && (
      <ModalComponent
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
        titles={{ title:"Create Product"  }}
        
        fullWidth={true}
      >
<></>
      </ModalComponent>)}
 <TablePage TableOptions={tableProps} 
// HeaderOptions={}
 ></TablePage>
 </>
  );
};

export default ProductPage;