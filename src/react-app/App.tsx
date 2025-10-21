import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import ProductPage from "@/react-app/pages/ProductPage";
import { CartProvider } from "@/react-app/contexts/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
