import {
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        element={<ProtectedRoute />}
      >
        <Route
          element={<AppLayout />}
        >
          <Route
            path="/"
            element={<DashboardPage />}
          />

          <Route
            path="/employees"
            element={<EmployeesPage />}
          />

          <Route
            path="/employees/new"
            element={<AddEmployeePage />}
          />

          <Route
            path="/employees/:id/edit"
            element={<EditEmployeePage />}
          />

          <Route
            path="/employees/:id"
            element={<EmployeeDetailsPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;