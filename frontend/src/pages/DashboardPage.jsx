import {
  useEffect,
  useState,
} from "react";

import {
  getSalarySummary,
  getDepartmentSalarySummary,
  getCountrySalarySummary,
} from "../services/analyticsService";

function DashboardPage() {
  const [summary, setSummary] = useState(null);

  const [
    departmentSummary,
    setDepartmentSummary,
  ] = useState([]);

  const [
    countrySummary,
    setCountrySummary,
  ] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          summaryData,
          departmentData,
          countryData,
        ] = await Promise.all([
          getSalarySummary({
            signal: controller.signal,
          }),

          getDepartmentSalarySummary({
            signal: controller.signal,
          }),

          getCountrySalarySummary({
            signal: controller.signal,
          }),
        ]);

        setSummary(summaryData);

        setDepartmentSummary(
          departmentData.departments
        );

        setCountrySummary(
          countryData.countries
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Salary Dashboard</h1>

      <p>
        Total Employees: {summary.totalEmployees}
      </p>

      <h2>Salary Summary by Currency</h2>

      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Employees</th>
            <th>Total Payroll</th>
            <th>Average Salary</th>
            <th>Minimum Salary</th>
            <th>Maximum Salary</th>
          </tr>
        </thead>

        <tbody>
          {summary.salaryByCurrency.map(
            (item) => (
              <tr key={item.currency}>
                <td>{item.currency}</td>

                <td>
                  {item.employeeCount}
                </td>

                <td>
                  {item.currency}{" "}
                  {item.totalPayroll.toLocaleString()}
                </td>

                <td>
                  {item.currency}{" "}
                  {item.averageSalary.toLocaleString()}
                </td>

                <td>
                  {item.currency}{" "}
                  {item.minimumSalary.toLocaleString()}
                </td>

                <td>
                  {item.currency}{" "}
                  {item.maximumSalary.toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <h2>Salary by Department</h2>

      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Currency</th>
            <th>Employees</th>
            <th>Total Payroll</th>
            <th>Average Salary</th>
          </tr>
        </thead>

        <tbody>
          {departmentSummary.map((item) => (
            <tr
              key={`${item.department}-${item.currency}`}
            >
              <td>{item.department}</td>

              <td>{item.currency}</td>

              <td>{item.employeeCount}</td>

              <td>
                {item.currency}{" "}
                {item.totalPayroll.toLocaleString()}
              </td>

              <td>
                {item.currency}{" "}
                {item.averageSalary.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Salary by Country</h2>

      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Currency</th>
            <th>Employees</th>
            <th>Total Payroll</th>
            <th>Average Salary</th>
          </tr>
        </thead>

        <tbody>
          {countrySummary.map((item) => (
            <tr
              key={`${item.country}-${item.currency}`}
            >
              <td>{item.country}</td>

              <td>{item.currency}</td>

              <td>{item.employeeCount}</td>

              <td>
                {item.currency}{" "}
                {item.totalPayroll.toLocaleString()}
              </td>

              <td>
                {item.currency}{" "}
                {item.averageSalary.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardPage;