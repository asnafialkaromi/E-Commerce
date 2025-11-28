import { Outlet } from "react-router";
import NavBar from "../layouts/NavBar";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <div className="w-full flex justify-center">
        <Outlet />
      </div>
    </>
  );
}
