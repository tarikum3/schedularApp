import { FC } from "react";

import NavWrapper from "@/app/components/common/NavWrapper";
import { Suspense } from "react";
import CartWrapper from "@/app/components/cart/CartWrapper";
import UserView from "@/app/components/common/UserView";
//const Navbar: FC<NavbarProps> = ({ links }) =>{
const Navbar: FC = async () => {
  return (
    <NavWrapper>
      <Suspense>
        <CartWrapper />
      </Suspense>
      <Suspense>
        <UserView />
      </Suspense>
    </NavWrapper>
  );
};
export default Navbar;
