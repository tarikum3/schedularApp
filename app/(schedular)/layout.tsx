import StoreProvider from "@components/schedular/storeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import SessionWrapper from "@/app/components/common/SessionWrapper";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppRouterCacheProvider>
        <StoreProvider>
          <SessionWrapper>{children}</SessionWrapper>
        </StoreProvider>
      </AppRouterCacheProvider>
    </div>
  );
}
