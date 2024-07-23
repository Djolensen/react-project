import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Cart, Login, Product, Products, User } from "./pages";

import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<Products />} />
          {/* /product/2 */}
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to={"/products"} replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
