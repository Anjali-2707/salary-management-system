import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getEmployeeById,
  deleteEmployee
} from "../services/employeeService";

function EmployeeDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadEmployee = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getEmployeeById(
          id,
          {
            signal: controller.signal,
          }
        );

        setEmployee(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return <p>Loading employee...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>

        <Link to="/employees">
          Back to Employees
        </Link>
      </div>
    );
  }

  if (!employee) {
    return <p>Employee not found.</p>;
  }

  const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmed) {
    return;
  }

  try {
    setDeleting(true);
    setError("");

    await deleteEmployee(id);

    navigate("/employees");
  } catch (error) {
    setError(error.message);
    setDeleting(false);
  }
};

  return (
    <div>
      <Link to="/employees">
        ← Back to Employees
      </Link>

      <h1>
        {employee.first_name}{" "}
        {employee.last_name}
      </h1>

      <Link to={`/employees/${employee.id}/edit`}>
        Edit Employee
      </Link>

      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        >
        {deleting
            ? "Deleting..."
            : "Delete Employee"}
      </button>

      <p>
        <strong>Employee ID:</strong>{" "}
        {employee.employee_id}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {employee.email}
      </p>

      <p>
        <strong>Department:</strong>{" "}
        {employee.department}
      </p>

      <p>
        <strong>Designation:</strong>{" "}
        {employee.designation}
      </p>

      <p>
        <strong>Country:</strong>{" "}
        {employee.country}
      </p>

      <p>
        <strong>Currency:</strong>{" "}
        {employee.currency}
      </p>

      <p>
        <strong>Annual Salary:</strong>{" "}
        {employee.currency}{" "}
        {employee.annual_salary.toLocaleString()}
      </p>

      <p>
        <strong>Joining Date:</strong>{" "}
        {employee.joining_date}
      </p>
    </div>
  );
}

export default EmployeeDetailsPage;