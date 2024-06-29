"use client";

import dynamic from "next/dynamic";
import LoginView from "@/app/components/auth/LoginView";
import { useUI } from "@/app/components/context";

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    {/* <LoadingDots /> */}
    Loading...
  </div>
);

const dynamicProps = {
  loading: Loading,
};

const SignUpView = dynamic(() => import("@/app/components/auth/SignUpView"), {
  ...dynamicProps,
  ssr: false,
});

// const ForgotPassword = dynamic(
//   () => import("@components/auth/ForgotPassword"),
//   {
//     ...dynamicProps,
//   }
// );

const Modal = dynamic(() => import("@/app/components/Modal"), {
  ...dynamicProps,
  ssr: false,
});

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? (
    <Modal onClose={closeModal}>
      {modalView === "LOGIN_VIEW" && <LoginView />}
      {modalView === "SIGNUP_VIEW" && <SignUpView />}
      {/* {modalView === "FORGOT_VIEW" && <ForgotPassword />} */}
    </Modal>
  ) : null;
};
export default ModalUI;
