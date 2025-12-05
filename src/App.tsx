import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./components/layouts/MainLayout";
import Auth from "./pages/Auth";
import { Toaster } from "sonner";
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Without layout routes */}
        <Route path="/login" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />

        {/* With layout routes */}
        {/* Public / Main layout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="product/detail/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        {/* Admin layout routes */}
        {/* <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route> */}
      </Routes>
    </>
  );
}

export default App;
