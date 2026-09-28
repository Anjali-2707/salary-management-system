import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";

import {
  createEmployee,
} from "../services/employeeService";

function AddEmployeePage() {
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

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

      const employee = await createEmployee({
        ...formData,
        annualSalary: Number(
          formData.annualSalary
        ),
      });

      navigate(
        `/employees/${employee.id}`
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Link to="/employees">
        ← Back to Employees
      </Link>

      <h1>Add Employee</h1>

      {error && (
        <p>Error: {error}</p>
      )}

      <EmployeeForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        saving={saving}
        submitLabel="Create Employee"
      />
    </div>
  );
}

export default AddEmployeePage;