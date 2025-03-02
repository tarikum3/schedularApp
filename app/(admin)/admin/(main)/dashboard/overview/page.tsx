import OverViewPage from "@/app/components/admin/components/dashboard/overview/OverViewPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OverView",
};

export default async function Page() {
  return (
    <>
      <OverViewPage />
    </>
  );
}
