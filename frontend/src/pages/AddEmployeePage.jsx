import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

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

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="employeeId">
            Employee ID
          </label>

          <input
            id="employeeId"
            name="employeeId"
            type="text"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="firstName">
            First Name
          </label>

          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">
            Last Name
          </label>

          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="department">
            Department
          </label>

          <input
            id="department"
            name="department"
            type="text"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="designation">
            Designation
          </label>

          <input
            id="designation"
            name="designation"
            type="text"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="country">
            Country
          </label>

          <input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="currency">
            Currency
          </label>

          <input
            id="currency"
            name="currency"
            type="text"
            value={formData.currency}
            onChange={handleChange}
            placeholder="INR"
            required
          />
        </div>

        <div>
          <label htmlFor="annualSalary">
            Annual Salary
          </label>

          <input
            id="annualSalary"
            name="annualSalary"
            type="number"
            min="0"
            value={formData.annualSalary}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="joiningDate">
            Joining Date
          </label>

          <input
            id="joiningDate"
            name="joiningDate"
            type="date"
            value={formData.joiningDate}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Create Employee"}
        </button>
      </form>
    </div>
  );
}

export default AddEmployeePage;