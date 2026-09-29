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

import LogoutIcon from "@mui/icons-material/Logout";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

function AppLayout() {
  const location = useLocation();

  const isDashboard =
    location.pathname === "/";

  const isEmployees =
    location.pathname.startsWith(
      "/employees"
    );

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

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
          <Typography
            variant="body2"
            sx={{
              mx: 2,
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            {user?.name}
          </Typography>

          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
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