import { Footer } from "@/app/components/common";
import Navbar from "@/app/components/common/NavbarNew";
import ModalUI from "@/app/components/common/ModalUI";
//import { Provider } from "react-redux";
//import { store } from "@framework/store/store";
import { ManagedUIContext } from "@/app/components/context";
import { SessionProvider } from "next-auth/react";
interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    //  <Provider store={store}>
    <SessionProvider>
      <ManagedUIContext>
        <div className="h-full max-w-[2460px] bg-primary mx-auto transition-colors duration-150">
          <Navbar />
          <main className="fit">{children}</main>

          <Footer />
          <ModalUI />
        </div>
      </ManagedUIContext>
    </SessionProvider>
    // </Provider>
  );
};

export default Layout;
