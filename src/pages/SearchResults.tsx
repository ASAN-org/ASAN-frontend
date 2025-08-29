import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Slider,
  FormControl,
  Select,
  MenuItem,
  Chip,
  useTheme,
  useMediaQuery,
  Pagination,
  Stack,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { searchProductsForPage, getPriceRange } from "../utils/searchUtils";
import { mockProducts } from "../types/mockProducts";
import LoadingSpinner from "../components/LoadingSpinner";

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const query = searchParams.get("q") || "";
  const brand = searchParams.get("brand") || "";

  // State for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 12;

  // Get search results
  const searchResults = useMemo(() => {
    if (brand) {
      // Filter by brand
      return mockProducts.filter(
        (product) => product.brand.toLowerCase() === brand.toLowerCase()
      );
    } else if (query) {
      // Search by query
      return searchProductsForPage(query);
    }
    return [];
  }, [query, brand]);

  // Get price range from results
  const { min: minPrice, max: maxPrice } = useMemo(() => {
    return getPriceRange(searchResults);
  }, [searchResults]);

  // Update price range when results change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Filter and sort results
  const filteredAndSortedResults = useMemo(() => {
    let results = [...searchResults];

    // Apply price filter
    results = results.filter((product) => {
      const price = product.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply sorting
    switch (sortBy) {
      case "price_asc":
        results.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price_desc":
        results.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name_asc":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        results.sort(
          (a, b) => parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1])
        );
        break;
      default:
        // Keep original relevance order
        break;
    }

    return results;
  }, [searchResults, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResults = filteredAndSortedResults.slice(startIndex, endIndex);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePriceRangeChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    setIsLoading(true);
    setPriceRange(newValue as [number, number]);
    setCurrentPage(1); // Reset to first page when filter changes
    // Simulate loading time for better UX
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setIsLoading(true);
    setSortBy(event.target.value);
    setCurrentPage(1); // Reset to first page when sort changes
    // Simulate loading time for better UX
    setTimeout(() => setIsLoading(false), 300);
  };

  const getSearchTitle = () => {
    if (brand) {
      return `Products from ${brand}`;
    }
    return `Search results for "${query}"`;
  };

  const getSearchSubtitle = () => {
    const count = filteredAndSortedResults.length;
    if (brand) {
      return `${count} product${count !== 1 ? "s" : ""} found`;
    }
    return `${count} result${count !== 1 ? "s" : ""} found`;
  };

  return (
    <Box
      display={isMobile ? "block" : "flex"}
      gap={4}
      p={2}
      sx={{ overflow: "hidden" }}
    >
      {/* Filters Sidebar */}
      <Box flexShrink={0}>
        <Paper
          elevation={1}
          sx={{ p: 3, position: "sticky", top: 20, minWidth: 250 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Anjoman-FaNum-Bold'",
              mb: 3,
              color: theme.palette.text.primary,
            }}
          >
            Filters
          </Typography>

          {/* Price Range Filter */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "'Anjoman-FaNum-Medium'",
                mb: 2,
                color: "#374151",
              }}
            >
              Price Range
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={minPrice}
              max={maxPrice}
              step={10}
              disabled={isLoading}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Rp {priceRange[0].toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rp {priceRange[1].toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Main Content */}
      <Box flexGrow={1}>
        {/* Desktop: Sort dropdown in header */}
        {!isMobile && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
            gap={2}
          >
            <Box>
              <Typography variant="h5" fontWeight={600}>
                {getSearchTitle()}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mt: 0.5,
                }}
              >
                {getSearchSubtitle()}
              </Typography>
            </Box>

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                disabled={isLoading}
                sx={{
                  fontFamily: "'Anjoman-FaNum-Medium'",
                }}
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="price_asc">Price: Low to High</MenuItem>
                <MenuItem value="price_desc">Price: High to Low</MenuItem>
                <MenuItem value="name_asc">Name: A to Z</MenuItem>
                <MenuItem value="name_desc">Name: Z to A</MenuItem>
                <MenuItem value="newest">Newest First</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Mobile: Title and search query chips */}
        {isMobile && (
          <Box sx={{ mb: 3, mt: 2 }}>
            <Typography variant="h5" fontWeight={600} mb={1}>
              {getSearchTitle()}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2,
              }}
            >
              {getSearchSubtitle()}
            </Typography>

            {/* Search query chips */}
            {(query || brand) && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {query && (
                  <Chip
                    label={`Query: ${query}`}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                )}
                {brand && (
                  <Chip
                    label={`Brand: ${brand}`}
                    color="secondary"
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
            )}
          </Box>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <LoadingSpinner message="Loading search results..." />
          </Box>
        ) : paginatedResults.length > 0 ? (
          <>
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
              }}
              gap={3}
              mb={4}
            >
              {paginatedResults.map((product) => (
                <Box
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  sx={(theme) => ({
                    background: theme.palette.background.paper,
                    borderRadius: "12px",
                    border: `1px solid ${theme.palette.divider}`,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[6],
                      borderColor: theme.palette.primary.main,
                    },
                    position: "relative",
                  })}
                >
                  {/* Product Image */}
                  <Box
                    sx={(theme) => ({
                      position: "relative",
                      paddingTop: "100%", // 1:1 aspect ratio
                      backgroundColor: theme.palette.background.default,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    })}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        height: "80%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                    {product.discount && (
                      <Box
                        sx={(theme) => ({
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          backgroundColor: theme.palette.error.main,
                          color: theme.palette.getContrastText(
                            theme.palette.error.main
                          ),
                          borderRadius: "12px",
                          px: 1,
                          py: 0.5,
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        })}
                      >
                        -{product.discount}%
                      </Box>
                    )}
                  </Box>
                  {/* Product Info */}
                  <Box p={2}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      mb={1}
                      sx={{
                        fontSize: "0.875rem",
                        lineHeight: 1.3,
                        height: "2.6em",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        mb: 1,
                        fontSize: "0.75rem",
                      }}
                    >
                      {product.brand}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      flexDirection="column"
                      gap={1}
                    >
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight={700}
                        sx={{ fontSize: "1rem" }}
                      >
                        Rp {product.price?.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Pagination */}
            {totalPages > 1 && (
              <Stack spacing={2} alignItems="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size={isMobile ? "small" : "medium"}
                  showFirstButton
                  showLastButton
                  disabled={isLoading}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Page {currentPage} of {totalPages} • {itemsPerPage} items per
                  page
                </Typography>
              </Stack>
            )}
          </>
        ) : (
          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              textAlign: "center",
              backgroundColor: theme.palette.background.default,
              borderRadius: "12px",
              border: `2px dashed ${theme.palette.divider}`,
            })}
          >
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search criteria or filters
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchResults;
