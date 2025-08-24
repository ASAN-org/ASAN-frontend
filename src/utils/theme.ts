import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // Dark mode palette overrides
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            primary: {
              main: "#90caf9",
            },
            secondary: {
              main: "#f48fb1",
            },
            text: {
              primary: "#fff",
              secondary: "rgba(255,255,255,0.7)",
            },
          }
        : {
            // Light mode palette overrides
            background: {
              default: "#f5f5f5",
              paper: "#fff",
            },
            primary: {
              main: "#1976d2",
            },
            secondary: {
              main: "#9c27b0",
            },
            text: {
              primary: "#1e293b",
              secondary: "#64748b",
            },
          }),
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: "background-color 0.2s",
          },
        },
      },
    },
  });
