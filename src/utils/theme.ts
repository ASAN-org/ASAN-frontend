import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // Dark mode palette overrides
            background: {
              default: "#0a0a0a",
              paper: "#1a1a1a",
            },
            primary: {
              main: "#90caf9",
              light: "#b3e5fc",
              dark: "#42a5f5",
            },
            secondary: {
              main: "#f48fb1",
              light: "#f8bbd9",
              dark: "#ec407a",
            },
            text: {
              primary: "#ffffff",
              secondary: "rgba(255,255,255,0.7)",
            },
            divider: "rgba(255,255,255,0.12)",
            action: {
              hover: "rgba(255,255,255,0.08)",
              selected: "rgba(255,255,255,0.16)",
            },
          }
        : {
            // Light mode palette overrides
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            primary: {
              main: "#1976d2",
              light: "#42a5f5",
              dark: "#1565c0",
            },
            secondary: {
              main: "#9c27b0",
              light: "#ba68c8",
              dark: "#7b1fa2",
            },
            text: {
              primary: "#1e293b",
              secondary: "#64748b",
            },
            divider: "rgba(0,0,0,0.12)",
            action: {
              hover: "rgba(0,0,0,0.04)",
              selected: "rgba(0,0,0,0.08)",
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
            transition: "background-color 0.2s, box-shadow 0.2s",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: "all 0.2s ease",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            transition: "all 0.2s ease",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            transition: "all 0.2s ease",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            transition: "all 0.2s ease",
          },
        },
      },
    },
  });
