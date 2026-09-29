import {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import {
  Link,
} from "react-router-dom";

import {
  getEmployees,
  getEmployeeFilterOptions,
} from "../services/employeeService";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [sortBy, setSortBy] =
    useState("employeeId");

  const [sortOrder, setSortOrder] =
    useState("asc");

  const [
    filterOptions,
    setFilterOptions,
  ] = useState({
    departments: [],
    countries: [],
  });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const limit = 20;

  useEffect(() => {
    const controller =
      new AbortController();

    const loadFilterOptions = async () => {
      try {
        const data =
          await getEmployeeFilterOptions({
            signal: controller.signal,
          });

        setFilterOptions(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      }
    };

    loadFilterOptions();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller =
      new AbortController();

    const loadEmployees = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getEmployees({
            page,
            limit,
            search,
            department,
            country,
            sortBy,
            sortOrder,
            signal: controller.signal,
          });

        setEmployees(data.employees);
        setPagination(data.pagination);
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

    loadEmployees();

    return () => {
      controller.abort();
    };
  }, [
    page,
    search,
    department,
    country,
    sortBy,
    sortOrder,
  ]);

  const handleSearch = (event) => {
    event.preventDefault();

    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setDepartment("");
    setCountry("");
    setPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((currentOrder) =>
        currentOrder === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }

    setPage(1);
  };

  const handlePreviousPage = () => {
    setPage(
      (currentPage) =>
        currentPage - 1
    );
  };

  const handleNextPage = () => {
    setPage(
      (currentPage) =>
        currentPage + 1
    );
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems={{
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
            Employees
          </Typography>

          <Typography color="text.secondary">
            Search, review and manage employee
            compensation records.
          </Typography>
        </Box>

        <Button
          component={Link}
          to="/employees/new"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Employee
        </Button>
      </Stack>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSearch}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={2}
          >
            <TextField
              label="Search employees"
              placeholder="ID, name, or email"
              value={searchInput}
              onChange={(event) =>
                setSearchInput(
                  event.target.value
                )
              }
              fullWidth
              size="small"
            />

            <FormControl
              size="small"
              sx={{
                minWidth: 200,
              }}
            >
              <InputLabel>
                Department
              </InputLabel>

              <Select
                value={department}
                label="Department"
                onChange={(event) => {
                  setDepartment(
                    event.target.value
                  );

                  setPage(1);
                }}
              >
                <MenuItem value="">
                  All Departments
                </MenuItem>

                {filterOptions.departments.map(
                  (departmentOption) => (
                    <MenuItem
                      key={departmentOption}
                      value={departmentOption}
                    >
                      {departmentOption}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{
                minWidth: 190,
              }}
            >
              <InputLabel>
                Country
              </InputLabel>

              <Select
                value={country}
                label="Country"
                onChange={(event) => {
                  setCountry(
                    event.target.value
                  );

                  setPage(1);
                }}
              >
                <MenuItem value="">
                  All Countries
                </MenuItem>

                {filterOptions.countries.map(
                  (countryOption) => (
                    <MenuItem
                      key={countryOption}
                      value={countryOption}
                    >
                      {countryOption}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>

            {(search ||
              department ||
              country) && (
              <Button
                type="button"
                variant="outlined"
                onClick={
                  handleClearFilters
                }
                startIcon={<ClearIcon />}
              >
                Clear
              </Button>
            )}
          </Stack>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      {pagination && (
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {pagination.total.toLocaleString()}{" "}
          employees found
        </Typography>
      )}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress />
        </Box>
      ) : employees.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 6,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">
            No employees found
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
            }}
          >
            Try changing your search or
            filters.
          </Typography>
        </Paper>
      ) : (
        <>
          <TableContainer
            component={Paper}
            variant="outlined"
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={
                        sortBy ===
                        "employeeId"
                      }
                      direction={
                        sortBy ===
                        "employeeId"
                          ? sortOrder
                          : "asc"
                      }
                      onClick={() =>
                        handleSort(
                          "employeeId"
                        )
                      }
                    >
                      Employee ID
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={
                        sortBy ===
                        "firstName"
                      }
                      direction={
                        sortBy ===
                        "firstName"
                          ? sortOrder
                          : "asc"
                      }
                      onClick={() =>
                        handleSort(
                          "firstName"
                        )
                      }
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={
                        sortBy ===
                        "department"
                      }
                      direction={
                        sortBy ===
                        "department"
                          ? sortOrder
                          : "asc"
                      }
                      onClick={() =>
                        handleSort(
                          "department"
                        )
                      }
                    >
                      Department
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    Designation
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={
                        sortBy ===
                        "country"
                      }
                      direction={
                        sortBy ===
                        "country"
                          ? sortOrder
                          : "asc"
                      }
                      onClick={() =>
                        handleSort(
                          "country"
                        )
                      }
                    >
                      Country
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    <TableSortLabel
                      active={
                        sortBy ===
                        "annualSalary"
                      }
                      direction={
                        sortBy ===
                        "annualSalary"
                          ? sortOrder
                          : "asc"
                      }
                      onClick={() =>
                        handleSort(
                          "annualSalary"
                        )
                      }
                    >
                      Salary
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {employees.map(
                  (employee) => (
                    <TableRow
                      key={employee.id}
                      hover
                    >
                      <TableCell>
                        {
                          employee.employee_id
                        }
                      </TableCell>

                      <TableCell>
                        <Typography
                          fontWeight={500}
                        >
                          {
                            employee.first_name
                          }{" "}
                          {
                            employee.last_name
                          }
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {employee.email}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {
                          employee.department
                        }
                      </TableCell>

                      <TableCell>
                        {
                          employee.designation
                        }
                      </TableCell>

                      <TableCell>
                        {employee.country}
                      </TableCell>

                      <TableCell
                        align="right"
                      >
                        {employee.currency}{" "}
                        {employee.annual_salary.toLocaleString()}
                      </TableCell>

                      <TableCell
                        align="right"
                      >
                        <Button
                          component={Link}
                          to={`/employees/${employee.id}`}
                          size="small"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {pagination && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                variant="outlined"
                onClick={
                  handlePreviousPage
                }
                disabled={page === 1}
              >
                Previous
              </Button>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Page {pagination.page} of{" "}
                {pagination.totalPages}
              </Typography>

              <Button
                variant="outlined"
                onClick={handleNextPage}
                disabled={
                  page ===
                  pagination.totalPages
                }
              >
                Next
              </Button>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
}

export default EmployeesPage;