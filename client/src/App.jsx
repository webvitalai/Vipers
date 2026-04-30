import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";

import Home from "./components/Pages/Home";
import NotFound from "./components/Pages/NotFound";
import Categories from "./components/Pages/Categories";
import Contact from "./components/Pages/Contact";
import About from "./components/Pages/About";
import Cart from "./components/Pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:categoryName" element={<Categories />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;