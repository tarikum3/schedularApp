import AnalyticsPage from "@/app/components/admin/components/dashboard/Analytics/AnalyticsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
};

export default async function Page() {
  return (
    <>
      <AnalyticsPage />
    </>
  );
}
