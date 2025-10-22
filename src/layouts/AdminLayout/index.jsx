import { Outlet } from "react-router";
import styles from "./AdminLayout.scss";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function AdminLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
