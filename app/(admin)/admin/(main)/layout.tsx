import LayoutWrapper from "@/app/components/admin/components/layout/Layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutWrapper>{children}</LayoutWrapper>
      {/* <div
              id="main-content"
              className=" flex flex-col relative overflow-y-auto pt-[80px] lg:ml-[270px]"
            > */}
      {/* {children} */}
      {/* </div> */}
    </>
  );
}
