import {
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import AddEmployeePage from "./pages/AddEmployeePage";

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

        <Route
          path="/employees/:id"
          element={<EmployeeDetailsPage />}
        />

        <Route
          path="/employees/new"
          element={<AddEmployeePage />}
        />
      </Route>
    </Routes>
  );
}

export default App;