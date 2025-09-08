import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Link,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Divider,
  Avatar,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { mockProducts } from "../types/mockProducts";
import { formatUrlSegment, normalizeCategoryName } from "../utils/urlUtils";
import ProductSlider from "../components/ProductSlider";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Product } from "../types/Product";
import { useCart } from "../contexts/CartContext";
import { AddShoppingCart, ShoppingCart } from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface WebShopData {
  similar_products: {
    enabled: boolean;
    max_items: number;
  };
  reviews_status: boolean;
}

interface ProductDetailProps {
  webshopData: WebShopData;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProductDetail: React.FC<ProductDetailProps> = ({ webshopData }) => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showCartSnackbar, setShowCartSnackbar] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { addToCart, isInCart } = useCart();

  // Simulate loading time for product data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [productId]);

  // Find the product by ID
  const product = mockProducts.find((p) => p.id === productId);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <LoadingSpinner message="Loading product details..." />
        </Box>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
          Product not found
        </Typography>
      </Container>
    );
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    setShowCartSnackbar(true);
  };

  const discountedPrice = product.discount
    ? product.price! - (product.price! * product.discount) / 100
    : product.price;

  // Find related products
  const getRelatedProducts = (currentProduct: Product): Product[] => {
    const relatedProducts = mockProducts
      .filter((p) => p.id !== currentProduct.id) // Exclude current product
      .map((p) => {
        let score = 0;

        // Category match (highest weight)
        if (p.category === currentProduct.category) {
          score += 50;
          // Subcategory match (even higher weight)
          if (p.subCategory === currentProduct.subCategory) {
            score += 30;
          }
        }

        // Brand match
        if (p.brand === currentProduct.brand) {
          score += 25;
        }

        // Price similarity (within 30% range with better scoring)
        if (currentProduct.price && p.price) {
          const priceDiff =
            Math.abs(currentProduct.price - p.price) / currentProduct.price;
          if (priceDiff <= 0.1) {
            score += 20; // Very close price
          } else if (priceDiff <= 0.2) {
            score += 15; // Close price
          } else if (priceDiff <= 0.3) {
            score += 10; // Similar price range
          }
        }

        // Name similarity (check if names have common words)
        const currentWords = currentProduct.name
          .toLowerCase()
          .split(" ")
          .filter((word) => word.length > 2);
        const productWords = p.name
          .toLowerCase()
          .split(" ")
          .filter((word) => word.length > 2);
        const commonWords = currentWords.filter((word) =>
          productWords.some(
            (pWord) => pWord.includes(word) || word.includes(pWord)
          )
        );
        if (commonWords.length >= 2) {
          score += 15; // Multiple common words
        } else if (commonWords.length === 1) {
          score += 8; // One common word
        }

        // Color match
        if (
          p.color &&
          currentProduct.color &&
          p.color === currentProduct.color
        ) {
          score += 8;
        }

        // Material match
        if (
          p.material &&
          currentProduct.material &&
          p.material === currentProduct.material
        ) {
          score += 5;
        }

        // Rating similarity (if both have ratings)
        if (p.rating && currentProduct.rating) {
          const ratingDiff = Math.abs(p.rating - currentProduct.rating);
          if (ratingDiff <= 0.5) {
            score += 5;
          }
        }

        return { ...p, _score: score };
      })
      .filter((p) => p._score > 10) // Only include products with meaningful relation
      .sort((a, b) => (b._score || 0) - (a._score || 0)) // Sort by score
      .slice(0, webshopData.similar_products.max_items) // Limit based on backend setting
      .map(({ _score, ...p }) => p); // Remove score from final result

    return relatedProducts;
  };

  const relatedProducts = getRelatedProducts(product);

  // Mock comments data
  const mockComments = [
    {
      id: 1,
      author: "Ahmad Rezaei",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Excellent product! The quality is outstanding and it arrived exactly as described. Highly recommended!",
      verified: true,
    },
    {
      id: 2,
      author: "Sara Mohammadi",
      rating: 4,
      date: "2024-01-10",
      comment:
        "Good product overall. Fast shipping and good packaging. The only minor issue is the color is slightly different from the photos, but still acceptable.",
      verified: true,
    },
    {
      id: 3,
      author: "Mohammad Karimi",
      rating: 5,
      date: "2024-01-08",
      comment:
        "Perfect! Exactly what I was looking for. The build quality is excellent and it works flawlessly. Will definitely buy from this store again.",
      verified: false,
    },
    {
      id: 4,
      author: "Fatemeh Ahmadi",
      rating: 3,
      date: "2024-01-05",
      comment:
        "The product is okay, but I expected better quality for the price. It works but feels a bit cheap. Customer service was helpful though.",
      verified: true,
    },
    {
      id: 5,
      author: "Ali Hassanpour",
      rating: 5,
      date: "2024-01-03",
      comment:
        "Amazing product! Exceeded my expectations. The design is beautiful and the functionality is perfect. Great value for money!",
      verified: true,
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{ py: isMobile ? 2 : 4, px: isMobile ? 1 : 3 }}
    >
      {/* Material-UI Breadcrumbs */}
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          mb: 3,
          mt: 2,
          "& .MuiBreadcrumbs-ol": {
            flexWrap: "wrap",
          },
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{
            fontFamily: "'Anjoman-FaNum-Medium'",
            fontSize: "0.9rem",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Home
        </Link>
        <Link
          component={RouterLink}
          to={`/${formatUrlSegment(normalizeCategoryName(product.category))}`}
          color="inherit"
          sx={{
            fontFamily: "'Anjoman-FaNum-Medium'",
            fontSize: "0.9rem",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        {product.subCategory && (
          <Link
            component={RouterLink}
            to={`/${formatUrlSegment(
              normalizeCategoryName(product.category)
            )}/${formatUrlSegment(product.subCategory)}`}
            color="inherit"
            sx={{
              fontFamily: "'Anjoman-FaNum-Medium'",
              fontSize: "0.9rem",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {product.subCategory}
          </Link>
        )}
        <Typography
          color="text.primary"
          sx={{
            fontFamily: "'Anjoman-FaNum-Medium'",
            fontSize: "0.9rem",
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.name}
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 2 : 4,
        }}
      >
        {/* Product Images */}
        <Box sx={{ flex: isMobile ? "none" : "0 0 50%" }}>
          <Paper elevation={2} sx={{ p: isMobile ? 1 : 2 }}>
            <Box sx={{ mb: 2 }}>
              <img
                src={product.images?.[selectedImageIndex] || product.imageUrl}
                alt={product.name}
                style={{
                  width: "100%",
                  height: isMobile ? "300px" : "400px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </Box>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <Box
                sx={{
                  display: "flex",
                  gap: isMobile ? 0.5 : 1,
                  flexWrap: "wrap",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    sx={{
                      width: isMobile ? 60 : 80,
                      height: isMobile ? 60 : 80,
                      cursor: "pointer",
                      border:
                        selectedImageIndex === index
                          ? "2px solid primary.main"
                          : "2px solid transparent",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Box>

        {/* Product Info */}
        <Box sx={{ flex: isMobile ? "none" : "0 0 50%" }}>
          <Box>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              sx={(theme) => ({
                fontFamily: "'Anjoman-FaNum-Bold'",
                mb: 2,
                color: theme.palette.text.primary,
                lineHeight: 1.3,
              })}
            >
              {product.name}
            </Typography>

            {/* Rating */}
            {product.rating && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography
                  variant="body2"
                  sx={{ ml: 1, color: "text.secondary" }}
                >
                  ({product.reviewCount} reviews)
                </Typography>
              </Box>
            )}

            {/* Price */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                sx={{
                  fontFamily: "'Anjoman-FaNum-Bold'",
                  color: "error.main",
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? 1 : 2,
                  flexWrap: "wrap",
                }}
              >
                Rp {discountedPrice?.toLocaleString()}
                {product.discount && (
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                      fontFamily: "'Anjoman-FaNum-Medium'",
                    }}
                  >
                    Rp {product.price?.toLocaleString()}
                  </Typography>
                )}
              </Typography>
              {product.discount && (
                <Chip
                  label={`${product.discount}% OFF`}
                  color="error"
                  size="small"
                  sx={{ mt: 1 }}
                />
              )}
            </Box>

            {/* Stock Status */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  color:
                    product.stock && product.stock > 0
                      ? "success.main"
                      : "error.main",
                  fontFamily: "'Anjoman-FaNum-Medium'",
                }}
              >
                {product.stock && product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </Typography>
            </Box>

            {/* Brand and Category */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Brand:</strong> {product.brand}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Category:</strong> {product.category} /{" "}
                {product.subCategory}
              </Typography>
              {product.color && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Color:</strong> {product.color}
                </Typography>
              )}
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: isMobile ? 1 : 2,
                mb: 3,
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <Button
                variant={isInCart(product.id) ? "outlined" : "contained"}
                size={isMobile ? "medium" : "large"}
                disabled={!product.stock || product.stock <= 0}
                onClick={handleAddToCart}
                startIcon={
                  isInCart(product.id) ? <ShoppingCart /> : <AddShoppingCart />
                }
                sx={{
                  fontFamily: "'Anjoman-FaNum-Bold'",
                  px: isMobile ? 2 : 4,
                  ...(isInCart(product.id) && {
                    color: "success.main",
                    borderColor: "success.main",
                    "&:hover": {
                      borderColor: "success.dark",
                      backgroundColor: "success.light",
                      color: "success.dark",
                    },
                  }),
                }}
              >
                {isInCart(product.id) ? "In Cart" : "Add to Cart"}
              </Button>
              <Button
                variant="outlined"
                size={isMobile ? "medium" : "large"}
                sx={{
                  fontFamily: "'Anjoman-FaNum-Medium'",
                  px: isMobile ? 2 : 4,
                }}
              >
                Add to Wishlist
              </Button>
            </Box>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  Tags:
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {product.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Product Details Tabs */}
      <Box sx={{ mt: isMobile ? 4 : 6 }}>
        <Paper elevation={1}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                fontFamily: "'Anjoman-FaNum-Medium'",
                fontSize: isMobile ? "0.8rem" : "inherit",
                minWidth: isMobile ? "auto" : "inherit",
              },
            }}
          >
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label="Features" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                fontSize: isMobile ? "0.9rem" : "inherit",
              }}
            >
              {product.description}
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {product.specifications && (
              <List>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <ListItem key={key} sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: "'Anjoman-FaNum-Medium'",
                              fontWeight: "bold",
                            }}
                          >
                            {key}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "text.secondary" }}
                          >
                            {value}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            {product.features && (
              <List>
                {product.features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{
                            fontFamily: "'Anjoman-FaNum-Medium'",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: "primary.main",
                              mr: 2,
                            }}
                          />
                          {feature}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </TabPanel>
        </Paper>
      </Box>

      {/* Related Products Section */}
      {webshopData.similar_products.enabled && relatedProducts.length > 0 && (
        <Box sx={{ mt: isMobile ? 4 : 6 }}>
          <ProductSlider
            products={relatedProducts}
            title="Related Products"
            showViewAll={false}
          />
        </Box>
      )}

      {/* Reviews/Comments Section */}
      {webshopData.reviews_status && (
        <Box sx={{ mt: isMobile ? 4 : 6 }}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
              Customer Reviews
            </Typography>

            {/* Overall Rating Summary */}
            <Box
              sx={{
                mb: 4,
                p: 2,
                backgroundColor: "background.default",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="h4" sx={{ mr: 2, fontWeight: "bold" }}>
                  {product.rating?.toFixed(1) || "4.2"}
                </Typography>
                <Box>
                  <Rating
                    value={product.rating || 4.2}
                    precision={0.1}
                    readOnly
                    size="large"
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Based on {product.reviewCount || 24} reviews
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Comments List */}
            <Box>
              {mockComments.map((comment, index) => (
                <Box key={comment.id}>
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                        {comment.author.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", mr: 1 }}
                          >
                            {comment.author}
                          </Typography>
                          {comment.verified && (
                            <Chip
                              label="Verified Purchase"
                              size="small"
                              color="success"
                              variant="outlined"
                              sx={{ fontSize: "0.7rem", height: 20 }}
                            />
                          )}
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Rating
                            value={comment.rating}
                            size="small"
                            readOnly
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ ml: 1 }}
                          >
                            {new Date(comment.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                          {comment.comment}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {index < mockComments.length - 1 && (
                    <Divider sx={{ mb: 2 }} />
                  )}
                </Box>
              ))}
            </Box>

            {/* Load More Button */}
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button variant="outlined" size="large">
                Load More Reviews
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Cart Notification Snackbar */}
      <Snackbar
        open={showCartSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowCartSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowCartSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;
