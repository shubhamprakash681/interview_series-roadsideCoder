import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Categories, Home, Product, Products } from "./pages";
import UIContextProvider from "./context/UI/UIContextProvoder.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UIContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<Product />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:category" element={<Categories />} />

            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UIContextProvider>
  </StrictMode>
);
