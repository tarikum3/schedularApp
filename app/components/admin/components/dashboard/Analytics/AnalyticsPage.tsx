"use client";

import React, { Suspense } from "react";

import CustomersAnalytics from "@/app/components/admin/components/dashboard/Analytics/CustomersAnalytics";
import SalesOverMonths from "@/app/components/admin/components/dashboard/Analytics/SalesOverMonths";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-10 text-primary">
      {/* Wrap CustomersOverMonths in Suspense with a fallback */}
      <Suspense>
        <CustomersAnalytics />
      </Suspense>
      <Suspense>
        <SalesOverMonths />
      </Suspense>
    </div>
  );
}
