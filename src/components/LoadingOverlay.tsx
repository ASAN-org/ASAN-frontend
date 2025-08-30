import React from "react";
import {
  Box,
  Backdrop,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";

interface LoadingOverlayProps {
  open: boolean;
  message?: string;
  size?: "small" | "medium" | "large";
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  open,
  message = "Loading...",
  size = "medium",
}) => {
  const theme = useTheme();
  const getSize = () => {
    switch (size) {
      case "small":
        return 24;
      case "large":
        return 48;
      default:
        return 32;
    }
  };

  return (
    <Backdrop
      sx={{
        color:
          theme.palette.mode === "dark" ? theme.palette.text.primary : "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(0, 0, 0, 0.5)",
      }}
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={getSize()} color="inherit" />
        {message && (
          <Typography
            variant="body2"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.primary
                  : "white",
              fontFamily: "'Anjoman-FaNum-Medium'",
              textAlign: "center",
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Backdrop>
  );
};

export default LoadingOverlay;
