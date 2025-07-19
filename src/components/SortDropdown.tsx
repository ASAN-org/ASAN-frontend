import {
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  useMediaQuery,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LoadingSpinner from "./LoadingSpinner";

interface SortOption {
  key: string;
  label: string;
  order: number;
}

interface SortDropdownProps {
  sortOptions: SortOption[];
  currentSort: string;
  onSortChange: (sortKey: string) => void;
  isLoading?: boolean;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOptions,
  currentSort,
  onSortChange,
  isLoading = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const currentSortOption =
    sortOptions.find((option) => option.key === currentSort) || sortOptions[0];

  const handleSortChange = (sortKey: string) => {
    if (isLoading) return; // Prevent sorting while loading
    onSortChange(sortKey);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  if (isMobile) {
    return (
      <>
        <Button
          variant="outlined"
          onClick={handleOpen}
          disabled={isLoading}
          startIcon={isLoading ? <LoadingSpinner size="small" /> : <SortIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            borderColor: "#e0e0e0",
            color: "#333",
            textTransform: "none",
            borderRadius: "8px",
            px: 2,
            py: 1,
          }}
        >
          {isLoading ? "Sorting..." : `Sort: ${currentSortOption.label}`}
        </Button>

        {open && (
          <Paper
            elevation={4}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 2000,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              sx={{ borderBottom: "1px solid #f0f0f0" }}
            >
              <Typography variant="h6" fontWeight={600}>
                Sort Products
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box flex={1} overflow="auto" p={2}>
              <List sx={{ p: 0 }}>
                {sortOptions.map((option, index) => (
                  <Box key={option.key}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handleSortChange(option.key)}
                        sx={{
                          borderRadius: "8px",
                          mb: 1,
                          backgroundColor:
                            currentSort === option.key
                              ? "#f0f8ff"
                              : "transparent",
                          border:
                            currentSort === option.key
                              ? "1px solid #2196f3"
                              : "1px solid transparent",
                          "&:hover": {
                            backgroundColor:
                              currentSort === option.key
                                ? "#e3f2fd"
                                : "#f5f5f5",
                          },
                        }}
                      >
                        <ListItemText
                          primary={option.label}
                          primaryTypographyProps={{
                            fontWeight: currentSort === option.key ? 600 : 400,
                            color:
                              currentSort === option.key
                                ? "#2196f3"
                                : "inherit",
                          }}
                        />
                        {currentSort === option.key && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: "#2196f3",
                            }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                    {index < sortOptions.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </Box>
                ))}
              </List>
            </Box>

            <Box
              p={2}
              sx={{
                borderTop: "1px solid #f0f0f0",
                backgroundColor: "background.paper",
              }}
            >
              <Button
                variant="contained"
                fullWidth
                onClick={() => setOpen(false)}
                sx={{ borderRadius: "8px" }}
              >
                Close
              </Button>
            </Box>
          </Paper>
        )}
      </>
    );
  }

  // Desktop version
  return (
    <Box sx={{ position: "relative" }}>
      <Button
        variant="outlined"
        onClick={handleOpen}
        disabled={isLoading}
        startIcon={isLoading ? <LoadingSpinner size="small" /> : <SortIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          borderColor: "#e0e0e0",
          color: "#333",
          textTransform: "none",
          borderRadius: "8px",
          px: 2,
          py: 1,
          minWidth: 200,
        }}
      >
        {isLoading ? "Sorting..." : `Sort: ${currentSortOption.label}`}
      </Button>

      {open && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            zIndex: 1000,
          }}
        >
          <List sx={{ p: 0 }}>
            {sortOptions.map((option, index) => (
              <Box key={option.key}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleSortChange(option.key)}
                    sx={{
                      px: 2,
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <ListItemText
                      primary={option.label}
                      primaryTypographyProps={{
                        fontWeight: currentSort === option.key ? 600 : 400,
                        color:
                          currentSort === option.key ? "#2196f3" : "inherit",
                      }}
                    />
                    {currentSort === option.key && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#2196f3",
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
                {index < sortOptions.length - 1 && <Divider sx={{ mx: 2 }} />}
              </Box>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SortDropdown;
