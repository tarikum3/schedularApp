import { Suspense } from "react";
import OverView from "@/app/components/admin/components/dashboard/Overview";
import Profile from "@/app/components/admin/components/profile/Profile";
import Login from "@/app/components/auth/LoginView";
export default async function Page() {
  // await new Promise((resolve) => setTimeout(resolve, 9000)); //  seconds delay
  return (
    <>
      {/* <ProductPage /> */}
      {/* <Profile /> */}
      {/* <CreateProduct /> */}

      <div className="flex flex-col text-primary">
        {/* Wrap CustomersOverMonths in Suspense with a fallback */}
        <Suspense>
          <Profile />
        </Suspense>
      </div>
    </>
  );
}
