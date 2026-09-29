import {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

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
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      controller.abort();
    };
  }, []);

  const formatAmount = (value) => {
    return Number(value).toLocaleString();
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

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (!summary) {
    return (
      <Alert severity="warning">
        Salary summary is unavailable.
      </Alert>
    );
  }

  return (
    <Stack spacing={4}>
      <Box>
        <Typography
          variant="h1"
          gutterBottom
        >
          Salary Dashboard
        </Typography>

        <Typography color="text.secondary">
          Overview of employee compensation across
          the organization.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        <Card>
          <CardContent>
            <Typography
              color="text.secondary"
              gutterBottom
            >
              Total Employees
            </Typography>

            <Typography variant="h4">
              {summary.totalEmployees.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        {summary.salaryByCurrency.map(
          (item) => (
            <Card key={item.currency}>
              <CardContent>
                <Stack
                  direction="row"
                  justifycontent="space-between"
                  alignitems="center"
                  sx={{ mb: 1 }}
                >
                  <Typography
                    color="text.secondary"
                  >
                    Average Salary
                  </Typography>

                  <Chip
                    label={item.currency}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Stack>

                <Typography
                  variant="h5"
                  sx={{ mb: 1 }}
                >
                  {item.currency}{" "}
                  {formatAmount(
                    item.averageSalary
                  )}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {item.employeeCount.toLocaleString()}{" "}
                  employees
                </Typography>
              </CardContent>
            </Card>
          )
        )}
      </Box>

      <Box>
        <Typography
          variant="h2"
          gutterBottom
        >
          Salary Summary by Currency
        </Typography>

        <TableContainer
          component={Paper}
          variant="outlined"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Currency
                </TableCell>

                <TableCell align="right">
                  Employees
                </TableCell>

                <TableCell align="right">
                  Total Payroll
                </TableCell>

                <TableCell align="right">
                  Average
                </TableCell>

                <TableCell align="right">
                  Minimum
                </TableCell>

                <TableCell align="right">
                  Maximum
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {summary.salaryByCurrency.map(
                (item) => (
                  <TableRow
                    key={item.currency}
                    hover
                  >
                    <TableCell>
                      <Chip
                        label={item.currency}
                        size="small"
                      />
                    </TableCell>

                    <TableCell align="right">
                      {item.employeeCount.toLocaleString()}
                    </TableCell>

                    <TableCell align="right">
                      {item.currency}{" "}
                      {formatAmount(
                        item.totalPayroll
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {item.currency}{" "}
                      {formatAmount(
                        item.averageSalary
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {item.currency}{" "}
                      {formatAmount(
                        item.minimumSalary
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {item.currency}{" "}
                      {formatAmount(
                        item.maximumSalary
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Typography
          variant="h2"
          gutterBottom
        >
          Salary by Department
        </Typography>

        <TableContainer
          component={Paper}
          variant="outlined"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Department
                </TableCell>

                <TableCell>
                  Currency
                </TableCell>

                <TableCell align="right">
                  Employees
                </TableCell>

                <TableCell align="right">
                  Total Payroll
                </TableCell>

                <TableCell align="right">
                  Average Salary
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {departmentSummary.map(
                (item) => (
                  <TableRow
                    key={`${item.department}-${item.currency}`}
                    hover
                  >
                    <TableCell>
                      {item.department}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={item.currency}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell align="right">
                      {item.employeeCount.toLocaleString()}
                    </TableCell>

                    <TableCell align="right">
                      {item.currency}{" "}
                      {formatAmount(
                        item.totalPayroll
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {item.currency}{" "}
                      {formatAmount(
                        item.averageSalary
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Typography
          variant="h2"
          gutterBottom
        >
          Salary by Country
        </Typography>

        <TableContainer
          component={Paper}
          variant="outlined"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Country
                </TableCell>

                <TableCell>
                  Currency
                </TableCell>

                <TableCell align="right">
                  Employees
                </TableCell>

                <TableCell align="right">
                  Total Payroll
                </TableCell>

                <TableCell align="right">
                  Average Salary
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {countrySummary.map(
                (item) => (
                  <TableRow
                    key={`${item.country}-${item.currency}`}
                    hover
                  >
                    <TableCell>
                      {item.country}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={item.currency}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell align="right">
                      {item.employeeCount.toLocaleString()}
                    </TableCell>

                    <TableCell align="right">
                      {item.currency}{" "}
                      {formatAmount(
                        item.totalPayroll
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {item.currency}{" "}
                      {formatAmount(
                        item.averageSalary
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}

export default DashboardPage;