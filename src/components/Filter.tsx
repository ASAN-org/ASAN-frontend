import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
  Paper,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { createSubcategoryUrl } from "../utils/urlUtils";
import { useCategoryData } from "../hooks/useCategoryData";
import DynamicFilter from "./DynamicFilter";

type FilterProps = {
  category: string;
  subCategory?: string;
};

const Filter: React.FC<FilterProps> = ({ category, subCategory }) => {
  const { findCategoryByName, getFiltersForCategory, loading } =
    useCategoryData();
  const filteredCategory = findCategoryByName(category);

  // Get the original category name for navigation
  const originalCategoryName = filteredCategory?.name || category;

  // Get filters for this category/subcategory
  // Only show filters if we're on a subcategory page (subCategory exists)
  const categoryFilters = subCategory
    ? getFiltersForCategory(category, subCategory)
    : [];

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false); // for mobile filter dialog

  // Filter states
  const [filterStates, setFilterStates] = useState<{
    [key: string]: number[] | string[] | boolean;
  }>({});

  // Track current category to avoid re-initializing
  const currentCategoryRef = useRef<string>("");

  // Initialize filter states
  useEffect(() => {
    const categoryKey = `${category}-${subCategory || ""}`;

    // Only initialize if we're on a different category
    if (currentCategoryRef.current === categoryKey) return;

    currentCategoryRef.current = categoryKey;

    const initialStates: { [key: string]: number[] | string[] | boolean } = {};
    categoryFilters.forEach((filter) => {
      if (filter.type === "range") {
        initialStates[filter.label] = [filter.min || 0, filter.max || 1000000];
      } else if (filter.type === "checklist") {
        initialStates[filter.label] = [];
      } else if (filter.type === "toggle") {
        initialStates[filter.label] = false;
      }
    });
    setFilterStates(initialStates);
  }, [categoryFilters, category, subCategory]);

  // Update filter state
  const updateFilterState = (
    filterLabel: string,
    value: number[] | string[] | boolean
  ) => {
    setFilterStates((prev) => ({
      ...prev,
      [filterLabel]: value,
    }));
  };

  if (loading) {
    return <div>Loading filters...</div>;
  }

  const handleFilterChange = (
    filterLabel: string,
    value: number[] | string[] | boolean
  ) => {
    updateFilterState(filterLabel, value);
  };

  if (isMobile) {
    return (
      <>
        <IconButton color="primary" onClick={() => setOpen(true)}>
          <FilterListIcon />
        </IconButton>
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
              justifyContent="flex-end"
              p={2}
              sx={{ borderBottom: "1px solid #f0f0f0" }}
            >
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            {/* Filter content below */}
            <Box
              flex={1}
              overflow="auto"
              p={2}
              sx={{
                pb: 4, // Add bottom padding to ensure content doesn't get cut off
                "& .MuiAccordion-root": {
                  boxShadow: "none",
                },
                "& .MuiAccordionDetails-root": {
                  pt: 1,
                  pb: 1,
                },
              }}
            >
              {/* Subcategories */}
              {!subCategory && (
                <Box>
                  <Accordion sx={{ boxShadow: "none" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">Sub Categories</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {filteredCategory ? (
                        <Box display={"flex"} flexDirection={"column"}>
                          {filteredCategory.children.map((subCat) => (
                            <Button
                              key={subCat}
                              onClick={() => {
                                setOpen(false);
                                navigate(
                                  createSubcategoryUrl(
                                    originalCategoryName,
                                    subCat
                                  )
                                );
                              }}
                              sx={{ justifyContent: "flex-start" }}
                            >
                              {subCat}
                            </Button>
                          ))}
                        </Box>
                      ) : (
                        <Typography>No subcategories found</Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                  <Divider sx={{ color: "#f0f0f0", margin: "0.5rem" }} />
                </Box>
              )}

              {/* Dynamic Filters - Only show if we have filters */}
              {categoryFilters.length > 0 && (
                <DynamicFilter
                  filters={categoryFilters}
                  onFilterChange={handleFilterChange}
                  filterStates={filterStates}
                />
              )}

              {/* Action Buttons */}
              <Box
                mt={3}
                display="flex"
                gap={2}
                sx={{
                  position: "sticky",
                  bottom: 0,
                  backgroundColor: "background.paper",
                  pt: 2,
                  pb: 2,
                  borderTop: "1px solid #f0f0f0",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    /* TODO: Apply filter logic */
                  }}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  //fullWidth
                  onClick={() => {
                    /* TODO: Clear filter logic */
                  }}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </>
    );
  }

  // Desktop: show as usual
  return (
    <Box
      width={"15rem"}
      padding={"1rem"}
      borderRadius={"0.2rem"}
      sx={{ border: "solid #f0f0f0 1px" }}
    >
      {!subCategory && (
        <Box>
          <Accordion sx={{ boxShadow: "none" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Sub Categories</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {filteredCategory ? (
                <Box display={"flex"} flexDirection={"column"}>
                  {filteredCategory.children.map((subCat) => (
                    <Button
                      key={subCat}
                      onClick={() =>
                        navigate(
                          createSubcategoryUrl(originalCategoryName, subCat)
                        )
                      }
                      sx={{ justifyContent: "flex-start" }}
                    >
                      {subCat}
                    </Button>
                  ))}
                </Box>
              ) : (
                <Typography>No subcategories found</Typography>
              )}
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ color: "#f0f0f0", margin: "0.5rem" }} />
        </Box>
      )}

      {/* Dynamic Filters - Only show if we have filters */}
      {categoryFilters.length > 0 && (
        <DynamicFilter
          filters={categoryFilters}
          onFilterChange={handleFilterChange}
          filterStates={filterStates}
        />
      )}

      {/* Action Buttons */}
      <Box mt={3} display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            /* TODO: Apply filter logic */
          }}
        >
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          //fullWidth
          onClick={() => {
            /* TODO: Clear filter logic */
          }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default Filter;
