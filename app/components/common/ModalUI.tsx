"use client";

import dynamic from "next/dynamic";
//import LoginView from "@/app/components/auth/LoginView";
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
const LoginView = dynamic(() => import("@/app/components/auth/LoginView"), {
  ...dynamicProps,
  ssr: false,
});
const SignUpView = dynamic(() => import("@/app/components/auth/SignUpView"), {
  ...dynamicProps,
  ssr: false,
});
const ForgotPasswordView = dynamic(
  () => import("@/app/components/auth/ForgotPassword"),
  {
    ...dynamicProps,
    ssr: false,
  }
);
const ResetPasswordView = dynamic(
  () => import("@/app/components/auth/ResetPassword"),
  {
    ...dynamicProps,
    ssr: false,
  }
);
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
      {modalView === "RESET_VIEW" && <ResetPasswordView />}
      {modalView === "FORGOT_VIEW" && <ForgotPasswordView />}
      {/* {modalView === "FORGOT_VIEW" && <ForgotPassword />} */}
    </Modal>
  ) : null;
};
export default ModalUI;
