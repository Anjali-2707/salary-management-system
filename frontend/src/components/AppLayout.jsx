import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";

function AppLayout() {
  const location = useLocation();

  const isDashboard =
    location.pathname === "/";

  const isEmployees =
    location.pathname.startsWith(
      "/employees"
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <AppBar
        position="static"
        elevation={1}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
            }}
          >
            Salary Management
          </Typography>

          <Button
            component={Link}
            to="/"
            color="inherit"
            variant={
              isDashboard
                ? "outlined"
                : "text"
            }
            sx={{
              mr: 1,
              borderColor: isDashboard
                ? "rgba(255,255,255,0.7)"
                : undefined,
            }}
          >
            Dashboard
          </Button>

          <Button
            component={Link}
            to="/employees"
            color="inherit"
            variant={
              isEmployees
                ? "outlined"
                : "text"
            }
            sx={{
              borderColor: isEmployees
                ? "rgba(255,255,255,0.7)"
                : undefined,
            }}
          >
            Employees
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="xl"
        sx={{
          py: 4,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}

export default AppLayout;