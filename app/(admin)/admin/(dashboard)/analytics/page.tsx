import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
};
//import ProductPage from "@/app/components/admin/components/Product/ProductPage";
//import Overview from "@/app/components/admin/components/dashboard/Overview";
export default async function Page() {
  // await new Promise((resolve) => setTimeout(resolve, 9000)); //  seconds delay
  return (
    <>
      <div className="flex flex-col text-primary">
        <Suspense>{/* <Overview /> */}</Suspense>
      </div>
    </>
  );
}
