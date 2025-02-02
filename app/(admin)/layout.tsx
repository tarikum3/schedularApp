import Header from "@/app/components/admin/components/layout/Header";
import StoreProvider from "@components/admin/storeProvider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import SessionWrapper from "@/app/components/common/SessionWrapper";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
                <AppRouterCacheProvider>

                
      <StoreProvider>
      <SessionWrapper>
        <Header />
        <div
          id="main-content"
          className=" flex flex-col relative overflow-y-auto pt-[80px] lg:ml-[270px]"
        >
          {children}
        </div></SessionWrapper>
      </StoreProvider>
      </AppRouterCacheProvider>
    </div>
  );
}
