import React from "react";
import { Box, Backdrop, CircularProgress, Typography } from "@mui/material";

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
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
              color: "white",
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
