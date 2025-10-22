import MainLayout from "@/layouts/MainLayout";
import DetailPage from "@/pages/Detail";
import HomePage from "@/pages/Home";
import { HashRouter, Route, Routes } from "react-router";

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/detail"
            element={<DetailPage />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;
