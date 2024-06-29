"use client";

//import { Layout } from "@components/common";
//import { useGetCustomerQuery } from "@framework/services/customer";
import { useSession } from "next-auth/react";
export default function Profile() {
  //  const { data } = useGetCustomerQuery();
  const { data: session, status } = useSession();
  return (
    <div className="mx-auto max-w-7xl px-6 w-full pt-4">
      <h1 className="pt-1 pb-4 text-2xl leading-7 font-bold tracking-wide">
        My Profile
      </h1>
      <div className="grid grid-cols-4">
        {session?.user && (
          <div className="flex flex-col divide-primary-2 divide-y">
            <div className="flex flex-row items-center space-x-4 py-4">
              <span className="text-lg font-medium text-secondary-300 flex-1">
                Full Name
              </span>
              <span>
                {(session?.user as any)?.firstName}{" "}
                {(session?.user as any)?.lastName}
              </span>
            </div>
            <div className="flex flex-row items-center space-x-4 py-4">
              <span className="text-lg font-medium text-secondary-300 flex-1">
                Email
              </span>
              <span>{(session?.user as any)?.email}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//Profile.Layout = Layout;
