import {
  useEffect,
  useState,
} from "react";

import {
  getSalarySummary,
} from "../services/analyticsService";

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadSummary = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSalarySummary({
          signal: controller.signal,
        });

        setSummary(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadSummary();

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
    </div>
  );
}

export default DashboardPage;