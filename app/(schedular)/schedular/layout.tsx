import LayoutWrapper from "@/app/components/schedular/components/layout/Layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <>{children}</>
    </>
  );
}
