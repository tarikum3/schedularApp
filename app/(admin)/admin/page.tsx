// import { Suspense } from "react";
// import OverView from "@/app/components/admin/components/dashboard/Overview";

export default async function Page() {
  // await new Promise((resolve) => setTimeout(resolve, 9000)); //  seconds delay
  return (
    <>
      {/* <ProductPage /> */}
      {/* <OverView /> */}
      {/* <CreateProduct /> */}

      <div className="flex flex-col text-primary">
        {/* Wrap CustomersOverMonths in Suspense with a fallback */}
        {/* <Suspense>
          <OverView />
        </Suspense> */}
      </div>
    </>
  );
}
