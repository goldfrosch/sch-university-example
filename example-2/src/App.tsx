import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProductPage } from "./pages/Product";
import { Purchase } from "./pages/Purchase";
import { PurchaseList } from "./pages/PurchaseList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<>main</>} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/purchase" element={<Purchase />} />
        <Route path="/purchase/list" element={<PurchaseList />} />
        {/* 
        아래와 같은 방식으로 Nest(둥지) 처럼 묶어서 사용해도 되지만 동일한 도메인이 아닌 경우에는 위처럼
        그냥 풀어서 사용해도 무방하다. (취향과 비지니스 로직 관점 차이)
        <Route
          path="/purchase"
          element={
            <>
              purchase <br />
              <Outlet />
            </>
          }
        >
          <Route index element={<>purchase index</>} />
          <Route path="/purchase/list" element={<>purchase list</>} />
        </Route> */}
        {/* 없는 페이지의 경우 *(asterisk)를 활용해 남은 전체 페이지는 없다라고 표현하는 페이지를 노출시킨다 */}
        <Route path="*" element={<>NOT FOUND</>} />
      </Route>
    </Routes>
  );
}

export default App;
