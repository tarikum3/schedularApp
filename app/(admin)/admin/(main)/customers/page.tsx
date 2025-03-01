import OrderPage from "@/app/components/admin/components/Order/OrderPage";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Orders",
};

export default async function Page() {
  return (
    <>
      <>
        <OrderPage />
      </>
    </>
  );
}
