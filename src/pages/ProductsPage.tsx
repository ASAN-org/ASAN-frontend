import {
  Box,
  Typography,
  useMediaQuery,
  Pagination,
  Stack,
} from "@mui/material";
import Filter from "./../components/Filter";
import SortDropdown from "./../components/SortDropdown";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState(defaultSort);

  // Debug: Log the category and subCategory values
  console.log("ProductsPage received:", {
    category,
    subCategory,
    itemsPerPage,
    defaultSort,
  });

  // Find related products for the current category/subCategory
  const allRelatedProducts = mockProducts.filter(
    (p) =>
      p.category.toLowerCase() === category.toLowerCase() &&
      (subCategory
        ? p.subCategory.toLowerCase() === subCategory.toLowerCase()
        : true)
  );

  // Sort products based on current sort option
  const sortedProducts = useMemo(() => {
    const products = [...allRelatedProducts];

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

  console.log("Found related products:", allRelatedProducts.length);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (sortKey: string) => {
    setCurrentSort(sortKey);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  return (
    <Box display={isMobile ? "block" : "flex"} gap={4} p={2}>
      <Box flexShrink={0}>
        <Filter
          category={category}
          subCategory={subCategory}
          sortOptions={sortOptions}
          currentSort={currentSort}
          onSortChange={handleSortChange}
        />
      </Box>
      <Box flex={1}>
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
              Related Products ({allRelatedProducts.length})
            </Typography>

            <SortDropdown
              sortOptions={sortOptions}
              currentSort={currentSort}
              onSortChange={handleSortChange}
            />
          </Box>
        )}

        {/* Mobile: Title only */}
        {isMobile && (
          <Typography variant="h5" mb={3} mt={2} fontWeight={600}>
            Related Products ({allRelatedProducts.length})
          </Typography>
        )}

        {relatedProducts.length > 0 ? (
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
                  sx={{
                    background: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      borderColor: "#2196f3",
                    },
                    position: "relative",
                  }}
                >
                  {/* Product Image */}
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "100%", // 1:1 aspect ratio
                      backgroundColor: "#f8f9fa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
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
                        sx={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          backgroundColor: "#ff4444",
                          color: "white",
                          borderRadius: "12px",
                          px: 1,
                          py: 0.5,
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
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
                        sx={{
                          backgroundColor: "#f0f8ff",
                          color: "#1976d2",
                          px: 1,
                          py: 0.5,
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
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
            sx={{
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              border: "2px dashed #e0e0e0",
            }}
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
