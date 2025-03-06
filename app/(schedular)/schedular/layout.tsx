import LayoutWrapper from "@/app/components/schedular/components/layout/Layout";
import Header from "@/app/components/schedular/components/layout/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <>{children}</>
    </>
  );
}
