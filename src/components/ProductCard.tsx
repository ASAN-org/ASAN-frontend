import React from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Product";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={(theme) => ({
        height: 240, // Reduced height since we removed the button
        width: 180,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.3s ease",
        mt: 1,
        mb: 1,
        cursor: "pointer",
        boxShadow: theme.shadows[1],
        "&:hover": {
          boxShadow: theme.shadows[6],
          transform: "translateY(-2px)",
        },
      })}
    >
      {/* Image Section */}
      <Box
        sx={(theme) => ({
          height: 120,
          width: "100%",
          backgroundColor: theme.palette.background.default,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        })}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            objectFit: "contain",
          }}
        />
        {/* Discount Badge */}
        {product.discount && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: theme.palette.error.main,
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

      {/* Info Section */}
      <CardContent
        sx={{
          flexGrow: 1,
          px: 1.2,
          pt: 1,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              fontFamily: "'Anjoman-FaNum-Bold'",
              lineHeight: 1.3,
              mb: 0.5,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              fontFamily: "'Anjoman-FaNum-Medium'",
              fontSize: "0.85rem",
            })}
          >
            {product.brand}
          </Typography>
        </Box>

        {/* Price Section */}
        <Box sx={{ mt: 1 }}>
          {product.discount ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography
                sx={{
                  fontFamily: "'Anjoman-FaNum-Bold'",
                  fontSize: "1rem",
                  color: "error.main",
                }}
              >
                Rp{" "}
                {Math.round(
                  (product.price || 0) * (1 - product.discount / 100)
                )}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Anjoman-FaNum-Medium'",
                  fontSize: "0.8rem",
                  textDecoration: "line-through",
                  color: "text.secondary",
                }}
              >
                Rp {product.price}
              </Typography>
            </Box>
          ) : (
            <Typography
              sx={{
                fontFamily: "'Anjoman-FaNum-Bold'",
                fontSize: "1rem",
                mb: 1,
              }}
            >
              Rp {product.price}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
