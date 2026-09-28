import { useEffect, useState } from "react";

import {
  getEmployees,
  getEmployeeFilterOptions,
} from "../services/employeeService";
import { Link } from "react-router-dom";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("");
    const [country, setCountry] = useState("");

    const [sortBy, setSortBy] = useState("employeeId");
    const [sortOrder, setSortOrder] = useState("asc");

    const [filterOptions, setFilterOptions] = useState({
    departments: [],
    countries: [],
    });

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
            search,
            department,
            country,
            sortBy,
            sortOrder,
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
  }, [page, search, department, country, sortBy, sortOrder]);

  useEffect(() => {
  const controller = new AbortController();

  const loadFilterOptions = async () => {
    try {
      const data =
        await getEmployeeFilterOptions({
          signal: controller.signal,
        });

      setFilterOptions(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    }
  };

  loadFilterOptions();

  return () => {
    controller.abort();
  };
}, []);

    const handleSort = (field) => {
  if (sortBy === field) {
    setSortOrder((currentOrder) =>
      currentOrder === "asc" ? "desc" : "asc"
    );
  } else {
    setSortBy(field);
    setSortOrder("asc");
  }

  setPage(1);
};

  const handleSearch = (event) => {
    event.preventDefault();

    setPage(1);
    setSearch(searchInput.trim());
  };

  const getSortIndicator = (field) => {
  if (sortBy !== field) {
    return "";
  }

  return sortOrder === "asc" ? " ↑" : " ↓";
};

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setDepartment("");
    setCountry("");
    setPage(1);
    };

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

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by ID, name, or email"
          value={searchInput}
          onChange={(event) =>
            setSearchInput(event.target.value)
          }
        />

        <button type="submit">
          Search
        </button>

        {(search || department || country) && (
          <button
            type="button"
            onClick={handleClearFilters}
          >
            Clear
          </button>
        )}
      </form>
      <select
        value={department}
        onChange={(event) => {
            setDepartment(event.target.value);
            setPage(1);
        }}
        >
        <option value="">
            All Departments
        </option>

        {filterOptions.departments.map(
            (departmentOption) => (
            <option
                key={departmentOption}
                value={departmentOption}
            >
                {departmentOption}
            </option>
            )
        )}
        </select>

        <select
        value={country}
        onChange={(event) => {
            setCountry(event.target.value);
            setPage(1);
        }}
        >
        <option value="">
            All Countries
        </option>

        {filterOptions.countries.map(
            (countryOption) => (
            <option
                key={countryOption}
                value={countryOption}
            >
                {countryOption}
            </option>
            )
        )}
        </select>

      {pagination && (
        <p>
          Total Employees: {pagination.total}
        </p>
      )}

      {loading ? (
        <p>Loading employees...</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <>
          <table>
            <thead>
  <tr>
    <th>
      <button
        type="button"
        onClick={() => handleSort("employeeId")}
      >
        Employee ID
        {getSortIndicator("employeeId")}
      </button>
    </th>

    <th>
      <button
        type="button"
        onClick={() => handleSort("firstName")}
      >
        Name
        {getSortIndicator("firstName")}
      </button>
    </th>

    <th>
      <button
        type="button"
        onClick={() => handleSort("department")}
      >
        Department
        {getSortIndicator("department")}
      </button>
    </th>

    <th>
      Designation
    </th>

    <th>
      <button
        type="button"
        onClick={() => handleSort("country")}
      >
        Country
        {getSortIndicator("country")}
      </button>
    </th>

    <th>
      <button
        type="button"
        onClick={() => handleSort("annualSalary")}
      >
        Salary
        {getSortIndicator("annualSalary")}
      </button>
    </th>
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
                  <td>
                    <Link to={`/employees/${employee.id}`}>
                        View
                    </Link>
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