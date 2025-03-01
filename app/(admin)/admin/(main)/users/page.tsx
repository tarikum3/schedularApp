import UserPage from "@/app/components/admin/components/user/UserPage";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Users",
};

export default async function Page() {
  return (
    <>
      <UserPage />
    </>
  );
}
