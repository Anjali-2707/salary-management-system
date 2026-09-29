import {
  Box,
  Button,
  Paper,
  TextField,
} from "@mui/material";

function EmployeeForm({
  formData,
  onChange,
  onSubmit,
  saving,
  submitLabel,
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
      }}
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
          gap: 2,
        }}
      >
        <TextField
          label="Employee ID"
          name="employeeId"
          value={formData.employeeId}
          onChange={onChange}
          required
          fullWidth
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
          fullWidth
        />

        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          required
          fullWidth
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          required
          fullWidth
        />

        <TextField
          label="Department"
          name="department"
          value={formData.department}
          onChange={onChange}
          required
          fullWidth
        />

        <TextField
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={onChange}
          required
          fullWidth
        />

        <TextField
          label="Country"
          name="country"
          value={formData.country}
          onChange={onChange}
          required
          fullWidth
        />

        <TextField
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={onChange}
          placeholder="INR"
          required
          fullWidth
        />

        <TextField
          label="Annual Salary"
          name="annualSalary"
          type="number"
          value={formData.annualSalary}
          onChange={onChange}
          inputProps={{
            min: 0,
          }}
          required
          fullWidth
        />

        <TextField
          label="Joining Date"
          name="joiningDate"
          type="date"
          value={formData.joiningDate}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
          fullWidth
        />

        <Box
          sx={{
            gridColumn: {
              xs: "1",
              md: "1 / -1",
            },
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : submitLabel}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default EmployeeForm;