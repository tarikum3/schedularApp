"use client";

//import CustomersByTime from "@/app/components/admin/components/dashboard/overview/CustomersByTime";
import CustomersOverMonths from "@/app/components/admin/components/dashboard/overview/CustomersOverMonths";
export default function OverView() {
  return (
    <>
      <div className=" flex flex-col   h-full w-full   p-4 mb-5 gap-14   text-primary">
        <CustomersOverMonths />
      </div>
    </>
  );
}
