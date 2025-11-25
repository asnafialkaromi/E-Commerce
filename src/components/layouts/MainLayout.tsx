import { Outlet } from "react-router";
import NavBar from "../layouts/NavBar";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
