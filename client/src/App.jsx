import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./components";
import { ArrowBack } from "./components";
import { Main } from "./pages/main/main";
import { ProductPage } from "./pages/product-page/product-page";
import { CartPage } from "./pages/cart/cart-page";
import { AdminPanel } from "./pages/admin-panel-pages/admin-panel-pages";
import { Authorization } from "./pages/authorization/authorization";
import { Register } from "./pages/register/register";
import { ProtectedRoute } from "./components/protected-route/protected-route";
import { ROLEID } from "./constants/role-id";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/actions/auth-async";

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--width-desktop);
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 150px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding-top: 120px;
  }

  @media (max-width: 480px) {
    padding-top: 100px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: min(100%, var(--width-desktop));
  padding: 0 clamp(var(--spacing-xs), 3vw, var(--spacing-lg));
  box-sizing: border-box;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <AppColumn>
      <Header />

      <ArrowBack />
      <Content>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute access={[ROLEID.ADMIN]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>Ошибка</div>} />
        </Routes>
      </Content>
    </AppColumn>
  );
}

export default App;
