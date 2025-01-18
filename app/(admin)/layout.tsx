
import Header from '@components/admin/layout/Header';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header/>
    <div
    id="main-content"
    className=" flex flex-col relative overflow-y-auto pt-[80px] lg:ml-[270px]"
  >
    {children}
  </div></div>
  );
}
