import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./components/layouts/MainLayout";
import Auth from "./pages/Auth";
import { Toaster } from "sonner";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        {/* Without layout routes */}
        <Route path="/login" element={<Auth />} />

        {/* With layout routes */}
        {/* Public / Main layout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="search" element={<SearchResults />} />
        </Route>

        {/* Admin layout routes */}
        {/* <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route> */}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
