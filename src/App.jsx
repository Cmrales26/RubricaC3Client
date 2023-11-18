import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";
import { StorePrivider } from "./context/StoreContext.jsx";
import Products from "./pages/Products";
import Store from "./pages/Store";
import MyProducts from "./pages/MyProducts";
import CreateProducts from "./pages/CreateProducts.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Purchaseform from "./pages/Purchaseform.jsx";
import EditPurchaseform from "./pages/EditPurchaseform.jsx";
import NotFound from "./components/NotFound.jsx";
const App = () => {
  return (
    <AuthProvider>
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>

          <Route element={<ProtectedRoute />}>
            {/* Administrador */}
            <Route
              path="/products"
              element={
                <ProductsProvider>
                  <Products />
                </ProductsProvider>
              }
            ></Route>
            <Route
              path="/create/products"
              element={
                <ProductsProvider>
                  <CreateProducts />
                </ProductsProvider>
              }
            ></Route>
            <Route
              path="/products/:code"
              element={
                <ProductsProvider>
                  <CreateProducts />
                </ProductsProvider>
              }
            ></Route>

            {/* User */}
            <Route
              path="/buy"
              element={
                <StorePrivider>
                  <ProductsProvider>
                    <Store />
                  </ProductsProvider>
                </StorePrivider>
              }
            ></Route>

            <Route
              path="/mybuys"
              element={
                <StorePrivider>
                  <MyProducts />
                </StorePrivider>
              }
            ></Route>
            <Route
              path="/buy/:code"
              element={
                <StorePrivider>
                  <Purchaseform />
                </StorePrivider>
              }
            ></Route>
            <Route
              path="/buy/edit/:code"
              element={
                <StorePrivider>
                  <EditPurchaseform />
                </StorePrivider>
              }
            ></Route>
          </Route>
          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </AuthProvider>
  );
};

export default App;
