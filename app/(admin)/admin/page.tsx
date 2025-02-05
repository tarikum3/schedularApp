// import { ProductCreationForm } from "@components/admin/components/ui/mui/DynamicForm";
//import ProductPage from "@components/admin/components/Product/ProductPage";
//import OverView from "@components/admin/components/dashboard/overview";
import CreateProduct from "@components/admin/components/Product/CreateProduct";
// import Calendar from "@components/schedular/Calendar";
export default async function Page() {
  return (
    <main>
      {/* <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1> */}
      {/* <ProductPage /> */}
      {/* <OverView /> */}
      <CreateProduct />
    </main>
  );
}
