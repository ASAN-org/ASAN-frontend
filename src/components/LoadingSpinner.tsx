import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  size = "medium",
  fullScreen = false,
}) => {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        ...(fullScreen && {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          zIndex: 9999,
        }),
      }}
    >
      <CircularProgress size={getSize()} />
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "'Anjoman-FaNum-Medium'" }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
