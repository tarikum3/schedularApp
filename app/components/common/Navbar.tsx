import { FC } from "react";

import NavWrapper from "@/app/components/common/NavWrapper";
import { Suspense } from "react";
import CartWrapper from "@/app/components/cart/CartWrapper";
import UserView from "@/app/components/common/UserView";
import { Bag ,UserIcon} from "@/app/components/icons";
//const Navbar: FC<NavbarProps> = ({ links }) =>{
 
const Navbar: FC = async () => {
  return (
    <NavWrapper>
      <Suspense fallback={<Bag className="w-6 h-6" />}>
        <CartWrapper />
      </Suspense>
      <Suspense fallback={<UserIcon className="size-6" />}>
        <UserView />
      </Suspense>
    </NavWrapper>
  );
};
export default Navbar;
