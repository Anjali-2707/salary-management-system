import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
    <Stack
      spacing={3}
      sx={{
        maxWidth: 1000,
        mx: "auto",
      }}
    >
      <Box>
        <Button
          component={Link}
          to="/employees"
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 2,
          }}
        >
          Back to Employees
        </Button>

        <Typography
          variant="h1"
          gutterBottom
        >
          Add Employee
        </Typography>

        <Typography color="text.secondary">
          Create a new employee compensation
          record.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <EmployeeForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        saving={saving}
        submitLabel="Create Employee"
      />
    </Stack>
  );
}

export default AddEmployeePage;