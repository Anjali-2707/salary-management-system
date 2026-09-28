import { Link, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <header>
        <h2>Salary Management</h2>

        <nav>
          <Link to="/">Dashboard</Link>

          {" | "}

          <Link to="/employees">Employees</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;