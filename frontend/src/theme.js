import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563eb",
    },

    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily:
      '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },

    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 8,
  },
});

export default theme;