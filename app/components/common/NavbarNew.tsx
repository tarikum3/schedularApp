import { FC } from "react";

import NavWrapper from "@/app/components/common/NavWrapper";
import { Suspense } from "react";
import CartWrapper from "@/app/components/cart/CartWrapper";
import UserView from "@/app/components/common/UserView";
//const Navbar: FC<NavbarProps> = ({ links }) =>{
const Navbar: FC = () => {
  return (
    <NavWrapper>
      <Suspense
      // fallback={<div className="text-red-300 font-bold">cartLOaing</div>}
      >
        <CartWrapper />
      </Suspense>
      <Suspense
      // fallback={<div className="text-red-300 font-bold">userLOaing</div>}
      >
        <UserView />
      </Suspense>

      {/* <CartWrapper />
      <UserView /> */}
    </NavWrapper>
  );
};
export default Navbar;
