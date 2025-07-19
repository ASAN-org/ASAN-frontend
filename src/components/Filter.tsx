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
import SortDropdown from "./SortDropdown";
import LoadingSpinner from "./LoadingSpinner";

type FilterProps = {
  category: string;
  subCategory?: string;
  sortOptions?: Array<{ key: string; label: string; order: number }>;
  currentSort?: string;
  onSortChange?: (sortKey: string) => void;
  onApplyFilters?: (filters: { [key: string]: number[] | string[] | boolean }) => void;
  onClearFilters?: () => void;
  appliedFilters?: { [key: string]: number[] | string[] | boolean };
};

const Filter: React.FC<FilterProps> = ({ 
  category, 
  subCategory, 
  sortOptions = [],
  currentSort = "popular",
  onSortChange = () => {},
  onApplyFilters = () => {},
  onClearFilters = () => {},
  appliedFilters = {}
}) => {
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

    // Use applied filters if available, otherwise initialize with defaults
    const initialStates: { [key: string]: number[] | string[] | boolean } = {};
    categoryFilters.forEach((filter) => {
      if (appliedFilters[filter.label] !== undefined) {
        // Use applied filter value
        initialStates[filter.label] = appliedFilters[filter.label];
      } else {
        // Initialize with default values
        if (filter.type === "range") {
          initialStates[filter.label] = [filter.min || 0, filter.max || 1000000];
        } else if (filter.type === "checklist") {
          initialStates[filter.label] = [];
        } else if (filter.type === "toggle") {
          initialStates[filter.label] = false;
        }
      }
    });
    setFilterStates(initialStates);
  }, [categoryFilters, category, subCategory, appliedFilters]);

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
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <LoadingSpinner message="Loading filters..." />
      </Box>
    );
  }

  const handleFilterChange = (
    filterLabel: string,
    value: number[] | string[] | boolean
  ) => {
    updateFilterState(filterLabel, value);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filterStates);
    if (isMobile) {
      setOpen(false);
    }
  };

  const handleClearFilters = () => {
    const clearedStates: { [key: string]: number[] | string[] | boolean } = {};
    categoryFilters.forEach((filter) => {
      if (filter.type === "range") {
        clearedStates[filter.label] = [filter.min || 0, filter.max || 1000000];
      } else if (filter.type === "checklist") {
        clearedStates[filter.label] = [];
      } else if (filter.type === "toggle") {
        clearedStates[filter.label] = false;
      }
    });
    setFilterStates(clearedStates);
    onClearFilters();
  };

  if (isMobile) {
    return (
      <>
        <Box display="flex" gap={1} alignItems="center">
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <FilterListIcon />
          </IconButton>
          {sortOptions.length > 0 && (
            <SortDropdown
              sortOptions={sortOptions}
              currentSort={currentSort}
              onSortChange={onSortChange}
              isLoading={loading}
            />
          )}
        </Box>
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
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  //fullWidth
                  onClick={handleClearFilters}
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
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          //fullWidth
          onClick={handleClearFilters}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default Filter;
