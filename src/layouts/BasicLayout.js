import BasicMenu from "../components/menus/BasicMenu";
import CartComponent from "../components/menus/CartComponent";
// im
const BasicLayout = ({children}) => {
  return (
    <>
      {/* 기존 헤더 대신 BasicMenu*/ }
      <BasicMenu></BasicMenu>

      {/* 상당 여백 my-5 제거 */}
      <div className="bg-white w-full flex flex-col space-y-1 my-5 md:flex-row md:space-x-4 md:space-y-0">
        {/* 상단 여백 py-40 변경  flex 제거 */}
        <main className="bg-sky-300 md:w-4/5 lg:w-3/4 px-5 py-5">
          {children}
        </main>

        {/* 상단 여백 py-40 제거 */}
        <aside className="bg-green-300 md:w-1/5 lg:w-1/4 px-5 py-5">
          <CartComponent />
        </aside>
      </div>
    </>
  );
}
export default BasicLayout;