import AuthLayout from "@/app/components/schedular/components/auth/AuthLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthLayout>{children}</AuthLayout>
    </>
  );
}
