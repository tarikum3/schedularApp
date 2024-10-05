import { notFound } from "next/navigation";
import { auth } from "@/auth";
export const dynamic = "force-dynamic";
export default async function Profile() {
  const session = await auth();
  console.log("sessionserver", session);
  if (!session?.user) return notFound();
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
