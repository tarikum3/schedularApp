import { Footer } from "@/app/components/common";
import Navbar from "@/app/components/common/Navbar";
import ModalUI from "@/app/components/common/ModalUI";

import { ManagedUIContext } from "@/app/components/context";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = async ({ children }) => {
  return (
    <SessionProvider>
      <ManagedUIContext>
        <div className="h-full max-w-[2460px] bg-primary-100 mx-auto transition-colors duration-150">
          <Navbar />

          <Suspense>
            <main className="fit">{children}</main>
            <Suspense>
              <Footer />
            </Suspense>
          </Suspense>
          <Suspense>
            <ModalUI />
          </Suspense>
        </div>
      </ManagedUIContext>
    </SessionProvider>
  );
};

export default Layout;
