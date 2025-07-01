import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

export default function SearchBox() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <Box
        display="flex"
        alignItems="center"
        sx={{
          flex: open ? "1 1 120px" : "0 0 32px",
          minWidth: 0,
          maxWidth: open ? "100%" : 32,
          transition: "flex 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {open ? (
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              minWidth: 0,
              boxShadow: 3,
              transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, minWidth: 0 }}
              placeholder="search the product name or brand"
              inputProps={{ "aria-label": "search the product name or brand" }}
              autoFocus
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="close search"
              onClick={() => setOpen(false)}
            >
              <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>&times;</span>
            </IconButton>
          </Paper>
        ) : (
          <IconButton aria-label="open search" onClick={() => setOpen(true)}>
            <SearchIcon />
          </IconButton>
        )}
      </Box>
    );
  }

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", sm: 400 },
        minWidth: 100,
        maxWidth: 300,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="search the product name or brand"
        inputProps={{ "aria-label": "search the product name or brand" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
