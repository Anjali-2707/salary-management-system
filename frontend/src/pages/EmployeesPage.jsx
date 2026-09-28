import { useEffect, useState } from "react";

import {
  getEmployees,
} from "../services/employeeService";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadEmployees = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getEmployees({
          page: 1,
          limit: 20,
          signal: controller.signal,
        });

        setEmployees(data.employees);
        setPagination(data.pagination);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Employees</h1>

      {pagination && (
        <p>
          Total Employees: {pagination.total}
        </p>
      )}

      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Country</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.employee_id}</td>

              <td>
                {employee.first_name}{" "}
                {employee.last_name}
              </td>

              <td>{employee.department}</td>

              <td>{employee.designation}</td>

              <td>{employee.country}</td>

              <td>
                {employee.currency}{" "}
                {employee.annual_salary.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesPage;