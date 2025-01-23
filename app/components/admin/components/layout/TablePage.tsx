'use client';


import { CircularProgress } from '@mui/material';
import CustomTable,{CustomTableProps} from '@components/admin/components/ui/CustomTable';
interface Props {
  title: string;
  description: string;
  TableOptions?:CustomTableProps;
}

const TablePage = ({ title, TableOptions  }: Props) => {
 

  return (
    <section className="min-h-[calc(100vh-163px)] table-section dark:text-white">
 

      <div className="px-5 pt-[50px]">
        <h2 className="font-[700] text-2xl text-[#2C2E7B]">{title}</h2>
      </div>
      <div className="full-width">
        {TableOptions ? <CustomTable {...TableOptions}/> : <CircularProgress />}
      </div>
    </section>
  );
};

export default TablePage;
