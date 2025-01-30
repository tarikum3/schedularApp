//import Header from "@/app/components/admin/components/layout/Header";
import StoreProvider from "@components/admin/storeProvider";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <StoreProvider>
        {/* <Header /> */}
        <div
          className=" flex flex-col relative overflow-y-auto pt-[80px] lg:ml-[270px]"
        >
          {children}
        </div>
      </StoreProvider>
    </div>
  );
}
