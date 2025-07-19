import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Rating,
  Divider,
  Button,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import { mockProducts } from "../types/mockProducts";
import Breadcrumb from "../components/Breadcrumb";
import type { Product } from "../types/Product";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  // Find the product by ID
  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
          Product not found
        </Typography>
      </Container>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const discountedPrice = product.discount
    ? product.price! - (product.price! * product.discount) / 100
    : product.price;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumb
        category={product.category}
        subCategory={product.subCategory}
        productName={product.name}
      />

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <img
                src={product.images?.[selectedImageIndex] || product.imageUrl}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </Box>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    sx={{
                      width: 80,
                      height: 80,
                      cursor: "pointer",
                      border:
                        selectedImageIndex === index
                          ? "2px solid #1976d2"
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
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Anjoman-FaNum-Bold'",
                mb: 2,
                color: "#1e293b",
              }}
            >
              {product.name}
            </Typography>

            {/* Rating */}
            {product.rating && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ ml: 1, color: "#64748b" }}>
                  ({product.reviewCount} reviews)
                </Typography>
              </Box>
            )}

            {/* Price */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Anjoman-FaNum-Bold'",
                  color: "#dc2626",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                Rp {discountedPrice?.toLocaleString()}
                {product.discount && (
                  <Typography
                    variant="h5"
                    sx={{
                      textDecoration: "line-through",
                      color: "#64748b",
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
                    product.stock && product.stock > 0 ? "#059669" : "#dc2626",
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
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                disabled={!product.stock || product.stock <= 0}
                sx={{
                  fontFamily: "'Anjoman-FaNum-Bold'",
                  px: 4,
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  fontFamily: "'Anjoman-FaNum-Medium'",
                  px: 4,
                }}
              >
                Add to Wishlist
              </Button>
            </Box>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, color: "#64748b" }}>
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
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Paper elevation={1}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                fontFamily: "'Anjoman-FaNum-Medium'",
              },
            }}
          >
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label="Features" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
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
                          <Typography variant="body1" sx={{ color: "#64748b" }}>
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
                              backgroundColor: "#1976d2",
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
    </Container>
  );
};

export default ProductDetail;
