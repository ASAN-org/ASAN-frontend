import {
  Box,
  Typography,
  useMediaQuery,
  Pagination,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Filter from "./../components/Filter";
import SortDropdown from "./../components/SortDropdown";
import LoadingSpinner from "./../components/LoadingSpinner";
import { mockProducts } from "../types/mockProducts";
import { useTheme } from "@mui/material/styles";
import { useState, useMemo } from "react";

type ProductsPageProps = {
  category: string;
  subCategory?: string;
  itemsPerPage: number;
  sortOptions: Array<{ key: string; label: string; order: number }>;
  defaultSort: string;
};

const ProductsPage: React.FC<ProductsPageProps> = ({
  category,
  subCategory,
  itemsPerPage,
  sortOptions,
  defaultSort,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState(defaultSort);
  const [isLoading, setIsLoading] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: number[] | string[] | boolean;
  }>({});

  // Find related products for the current category/subCategory
  const allRelatedProducts = mockProducts.filter(
    (p) =>
      p.category.toLowerCase() === category.toLowerCase() &&
      (subCategory
        ? p.subCategory.toLowerCase() === subCategory.toLowerCase()
        : true)
  );

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    let products = [...allRelatedProducts];

    // Apply each filter
    Object.entries(appliedFilters).forEach(([filterName, filterValue]) => {
      if (
        filterValue === undefined ||
        (Array.isArray(filterValue) && filterValue.length === 0) ||
        filterValue === false
      ) {
        return; // Skip empty or false filters
      }

      products = products.filter((product) => {
        // Handle range filters (price, etc.)
        if (Array.isArray(filterValue) && filterValue.length === 2) {
          const [min, max] = filterValue as number[];
          // Map filter names to product fields
          let productValue = 0;
          if (filterName.toLowerCase().includes("price")) {
            productValue = product.price || 0;
          } else if (filterName.toLowerCase().includes("weight")) {
            productValue = parseInt(product.weight?.replace("g", "") || "0");
          }
          return productValue >= min && productValue <= max;
        }

        // Handle checklist filters (brand, color, etc.)
        if (Array.isArray(filterValue) && filterValue.length > 0) {
          const filterValues = filterValue as string[];

          // Map filter names to product fields
          let productValue: unknown = undefined;
          if (filterName.toLowerCase().includes("color")) {
            productValue = product.color;
          } else if (filterName.toLowerCase().includes("brand")) {
            productValue = product.brand;
          } else if (filterName.toLowerCase().includes("material")) {
            productValue = product.material;
          } else if (
            filterName.toLowerCase().includes("memory") ||
            filterName.toLowerCase().includes("storage")
          ) {
            // Check specifications for memory/storage
            productValue = product.specifications?.["Internal Memory"];
          } else if (filterName.toLowerCase().includes("5g")) {
            // Check specifications for 5G support
            productValue = product.specifications?.["Supports 5G"];
          } else if (filterName.toLowerCase().includes("processor")) {
            // Check specifications for processor
            productValue = product.specifications?.Processor;
          } else if (filterName.toLowerCase().includes("connection")) {
            // Check specifications for connection type
            productValue = product.specifications?.["Connection Type"];
          } else {
            // Try direct field access
            productValue = product[filterName as keyof typeof product];
          }

          if (typeof productValue === "string") {
            return filterValues.includes(productValue);
          }
          // Handle array properties like tags or features
          if (Array.isArray(productValue)) {
            return filterValues.some((value) => productValue.includes(value));
          }
          // Handle boolean features
          if (typeof productValue === "boolean") {
            return filterValues.includes(productValue ? "Yes" : "No");
          }
          // Handle string boolean values (Yes/No)
          if (
            typeof productValue === "string" &&
            (productValue === "Yes" || productValue === "No")
          ) {
            return filterValues.includes(productValue);
          }
        }

        // Handle boolean filters
        if (typeof filterValue === "boolean") {
          let productValue: unknown = undefined;
          if (filterName.toLowerCase().includes("5g")) {
            productValue = product.specifications?.["Supports 5G"] === "Yes";
          } else {
            productValue = product[filterName as keyof typeof product];
          }
          return Boolean(productValue) === filterValue;
        }

        return true;
      });
    });

    return products;
  }, [allRelatedProducts, appliedFilters]);

  // Sort products based on current sort option
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (currentSort) {
      case "price_asc":
        return products.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price_desc":
        return products.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "newest":
        return products.sort(
          (a, b) => parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1])
        );
      case "popular":
      default:
        // For popular, we'll use a simple algorithm based on discount and price
        return products.sort((a, b) => {
          const aScore = (a.discount || 0) * 10 + (a.price || 0);
          const bScore = (b.discount || 0) * 10 + (b.price || 0);
          return bScore - aScore;
        });
    }
  }, [allRelatedProducts, currentSort]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const relatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (sortKey: string) => {
    setIsLoading(true);
    setCurrentSort(sortKey);
    setCurrentPage(1); // Reset to first page when sorting changes
    // Simulate loading time for better UX
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleApplyFilters = (filters: {
    [key: string]: number[] | string[] | boolean;
  }) => {
    setIsLoading(true);
    setAppliedFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
    // Simulate loading time for better UX
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleClearFilters = () => {
    setIsLoading(true);
    setAppliedFilters({});
    setCurrentPage(1); // Reset to first page when filters change
    // Simulate loading time for better UX
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <Box
      display={isMobile ? "block" : "flex"}
      gap={4}
      p={2}
      sx={{ overflow: "hidden" }}
    >
      <Box flexShrink={0}>
        <Filter
          category={category}
          subCategory={subCategory}
          sortOptions={sortOptions}
          currentSort={currentSort}
          onSortChange={handleSortChange}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
          appliedFilters={appliedFilters}
        />
      </Box>
      <Box flex={1} sx={{ overflow: "hidden" }}>
        {/* Desktop: Sort dropdown in header */}
        {!isMobile && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
            gap={2}
          >
            <Typography variant="h5" fontWeight={600}>
              Related Products ({filteredProducts.length})
            </Typography>

            <SortDropdown
              sortOptions={sortOptions}
              currentSort={currentSort}
              onSortChange={handleSortChange}
              isLoading={isLoading}
            />
          </Box>
        )}

        {/* Mobile: Title only */}
        {isMobile && (
          <Typography variant="h5" mb={3} mt={2} fontWeight={600}>
            Related Products ({filteredProducts.length})
          </Typography>
        )}

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <LoadingSpinner message="Loading products..." />
          </Box>
        ) : relatedProducts.length > 0 ? (
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
              {relatedProducts.map((product) => (
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
                    >
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight={700}
                        sx={{ fontSize: "1rem" }}
                      >
                        ${product.price}
                      </Typography>
                      <Box
                        sx={(theme) => ({
                          backgroundColor: theme.palette.action.selected,
                          color: theme.palette.primary.main,
                          px: 1,
                          py: 0.5,
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        })}
                      >
                        View
                      </Box>
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
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="300px"
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
              borderRadius: "12px",
              border: `2px dashed ${theme.palette.divider}`,
            })}
          >
            <Typography variant="h6" color="text.secondary">
              No products found for this category
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductsPage;
