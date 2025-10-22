import { Outlet } from "react-router";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import types from "./MainLayout.module.scss";

function MainLayout() {
  return (
    <div className={types.wrapper}>
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
