// import Header from "@/app/components/schedular/components/layout/Header";
// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <div className="flex h-screen flex-col ">
//         <Header />
//         <div className="grow overflow-y-auto ">{children}</div>
//       </div>
//     </>
//   );
// }

import LayoutWrapper from "@/app/components/schedular/components/layout/Layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutWrapper>{children}</LayoutWrapper>
      {/* <>{children}</> */}
    </>
  );
}
