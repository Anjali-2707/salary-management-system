import { useEffect, useState } from "react";

import {
  getEmployees,
} from "../services/employeeService";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 20;

  useEffect(() => {
    const controller = new AbortController();

    const loadEmployees = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getEmployees({
          page,
          limit,
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
  }, [page]);

  const handlePreviousPage = () => {
    setPage((currentPage) => currentPage - 1);
  };

  const handleNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

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

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <>
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

          {pagination && (
            <div>
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                Previous
              </button>

              <span>
                {" "}
                Page {pagination.page} of{" "}
                {pagination.totalPages}{" "}
              </span>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={
                  page === pagination.totalPages
                }
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EmployeesPage;