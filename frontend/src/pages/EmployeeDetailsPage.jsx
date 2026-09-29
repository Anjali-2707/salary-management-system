import {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  deleteEmployee,
  getEmployeeById,
} from "../services/employeeService";

function EmployeeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [
    deleteDialogOpen,
    setDeleteDialogOpen,
  ] = useState(false);

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
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadEmployee();

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError("");

      await deleteEmployee(id);

      navigate("/employees");
    } catch (error) {
      setError(error.message);
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifycontent: "center",
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error && !employee) {
    return (
      <Stack spacing={2}>
        <Alert severity="error">
          {error}
        </Alert>

        <Box>
          <Button
            component={Link}
            to="/employees"
            startIcon={<ArrowBackIcon />}
          >
            Back to Employees
          </Button>
        </Box>
      </Stack>
    );
  }

  if (!employee) {
    return (
      <Alert severity="warning">
        Employee not found.
      </Alert>
    );
  }

  return (
    <>
      <Stack
        spacing={3}
        sx={{
          maxWidth: 900,
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

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifycontent="space-between"
            alignitems={{
              xs: "stretch",
              sm: "center",
            }}
            spacing={2}
          >
            <Box>
              <Typography
                variant="h1"
                gutterBottom
              >
                {employee.first_name}{" "}
                {employee.last_name}
              </Typography>

              <Typography color="text.secondary">
                {employee.employee_id}
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1}
            >
              <Button
                component={Link}
                to={`/employees/${employee.id}/edit`}
                variant="contained"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>

              <Button
                type="button"
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() =>
                  setDeleteDialogOpen(true)
                }
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Box>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        <Paper
          variant="outlined"
          sx={{
            p: 3,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 2,
            }}
          >
            Employee Information
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
              gap: 3,
            }}
          >
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Employee ID
              </Typography>

              <Typography>
                {employee.employee_id}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Email
              </Typography>

              <Typography>
                {employee.email}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Department
              </Typography>

              <Typography>
                {employee.department}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Designation
              </Typography>

              <Typography>
                {employee.designation}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Country
              </Typography>

              <Typography>
                {employee.country}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Joining Date
              </Typography>

              <Typography>
                {employee.joining_date}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Currency
              </Typography>

              <Typography>
                {employee.currency}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Annual Salary
              </Typography>

              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                {employee.currency}{" "}
                {employee.annual_salary.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Stack>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          if (!deleting) {
            setDeleteDialogOpen(false);
          }
        }}
      >
        <DialogTitle>
          Delete employee?
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            {employee.first_name}{" "}
            {employee.last_name}?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDeleteDialogOpen(false)
            }
            disabled={deleting}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting
              ? "Deleting..."
              : "Delete Employee"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeeDetailsPage;