import {
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/employees"
          element={<EmployeesPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;