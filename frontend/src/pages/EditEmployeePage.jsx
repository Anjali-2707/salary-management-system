import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";

import {
  getEmployeeById,
  updateEmployee,
} from "../services/employeeService";

function EditEmployeePage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    designation: "",
    country: "",
    currency: "",
    annualSalary: "",
    joiningDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadEmployee = async () => {
      try {
        setLoading(true);
        setError("");

        const employee =
          await getEmployeeById(
            id,
            {
              signal: controller.signal,
            }
          );

        setFormData({
          employeeId: employee.employee_id,
          firstName: employee.first_name,
          lastName: employee.last_name,
          email: employee.email,
          department: employee.department,
          designation: employee.designation,
          country: employee.country,
          currency: employee.currency,
          annualSalary: employee.annual_salary,
          joiningDate: employee.joining_date,
        });
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

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updateEmployee(
        id,
        {
          ...formData,
          annualSalary: Number(
            formData.annualSalary
          ),
        }
      );

      navigate(`/employees/${id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading employee...</p>;
  }

  return (
    <div>
      <Link to={`/employees/${id}`}>
        ← Back to Employee
      </Link>

      <h1>Edit Employee</h1>

      {error && (
        <p>Error: {error}</p>
      )}

      <EmployeeForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        saving={saving}
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditEmployeePage;