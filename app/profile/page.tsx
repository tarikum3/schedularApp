"use client";

//import { Layout } from "@components/common";
//import { useGetCustomerQuery } from "@framework/services/customer";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  return (
    <div className="mx-auto max-w-7xl px-6 w-full pt-8">
      <h1 className="pb-6 text-3xl font-bold tracking-tight text-primary-900">
        My Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        {session?.user && (
          <div className="flex flex-col divide-y divide-primary-300 lg:col-span-2">
            {/* Full Name */}
            <div className="flex items-center justify-between py-5">
              <span className="text-lg font-medium text-primary-500">
                Full Name
              </span>
              <span className="text-primary-900 font-semibold">
                {(session?.user as any)?.firstName}{" "}
                {(session?.user as any)?.lastName}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between py-5">
              <span className="text-lg font-medium text-primary-500">
                Email
              </span>
              <span className="text-primary-900 font-semibold">
                {(session?.user as any)?.email}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//Profile.Layout = Layout;
